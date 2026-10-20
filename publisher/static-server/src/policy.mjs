import { createHash, randomBytes } from "node:crypto";
import { closeSync, existsSync, lstatSync, mkdirSync, openSync, realpathSync, statSync } from "node:fs";
import { basename, dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { DatabaseSync } from "node:sqlite";

export class GatewayError extends Error {
  constructor(code, message, status = 400) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export function identifier(value, name = "id") {
  if (typeof value !== "string" || !/^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/.test(value)) {
    throw new GatewayError("invalid_input", `${name} must be a single alphanumeric, hyphen or underscore identifier.`);
  }
  return value;
}

export function verifier(value) {
  return createHash("sha256").update(value).digest("hex");
}

function secret(prefix) {
  return `${prefix}_${randomBytes(32).toString("base64url")}`;
}

function isWithin(parent, child) {
  const path = relative(parent, child);
  return path === "" || (!path.startsWith(`..${sep}`) && path !== ".." && !isAbsolute(path));
}

function projectedRealPath(path) {
  if (existsSync(path)) return realpathSync(path);
  return resolve(projectedRealPath(dirname(path)), basename(path));
}

export function policyLocation(path, libraryRoot) {
  if (!path || !libraryRoot || path === ":memory:" || !isAbsolute(path) || !isAbsolute(libraryRoot)) {
    throw new GatewayError("configuration", "Absolute policy and library paths are required.", 503);
  }
  const target = resolve(path);
  const library = projectedRealPath(resolve(libraryRoot));
  if (isWithin(library, projectedRealPath(target))) {
    throw new GatewayError("configuration", "Policy storage must be outside the artifact library.", 503);
  }
  return target;
}

const SCHEMA = `
  CREATE TABLE decks (
    deck_id TEXT PRIMARY KEY,
    release_id TEXT NOT NULL,
    is_public INTEGER NOT NULL DEFAULT 0 CHECK(is_public IN (0,1))
  ) STRICT;
  CREATE TABLE viewing_keys (
    key_id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    scope TEXT NOT NULL CHECK(scope IN ('collection','all')),
    verifier TEXT NOT NULL UNIQUE,
    created_at INTEGER NOT NULL,
    revoked_at INTEGER
  ) STRICT;
  CREATE TABLE assignments (
    key_id TEXT NOT NULL REFERENCES viewing_keys(key_id),
    deck_id TEXT NOT NULL REFERENCES decks(deck_id),
    PRIMARY KEY(key_id, deck_id)
  ) STRICT;
  CREATE TABLE sessions (
    verifier TEXT PRIMARY KEY,
    key_id TEXT REFERENCES viewing_keys(key_id),
    expires_at INTEGER NOT NULL
  ) STRICT;
  CREATE INDEX sessions_expiry ON sessions(expires_at);
  PRAGMA user_version=1;
`;

export function initializePolicy(path, libraryRoot) {
  const target = policyLocation(path, libraryRoot);
  mkdirSync(dirname(target), { recursive: true, mode: 0o700 });
  let fd;
  try {
    fd = openSync(target, "wx", 0o600);
  } catch (error) {
    if (error.code === "EEXIST") throw new GatewayError("conflict", "Policy already exists; initialization never replaces it.", 409);
    throw error;
  } finally {
    if (fd !== undefined) closeSync(fd);
  }
  const db = new DatabaseSync(target, { timeout: 1000 });
  try {
    db.exec(`BEGIN IMMEDIATE; ${SCHEMA} COMMIT;`);
  } finally {
    db.close();
  }
  return { policy_path: target, schema_version: 1, decks: 0, keys: 0 };
}

export class PolicyStore {
  constructor(path, libraryRoot, { now = () => Date.now() } = {}) {
    this.path = policyLocation(path, libraryRoot);
    this.now = now;
    // Never let SQLite's default create-on-open silently erase a missing policy.
    if (!existsSync(this.path) || !lstatSync(this.path).isFile()) {
      throw new GatewayError("policy_unavailable", "Policy is missing; initialize it explicitly before starting the gateway.", 503);
    }
    const info = statSync(this.path);
    this.identity = { dev: info.dev, ino: info.ino };
    try {
      this.db = new DatabaseSync(this.path, { timeout: 1000 });
      this.assertAvailable();
      this.db.prepare("SELECT deck_id, release_id, is_public FROM decks LIMIT 1").get();
      this.db.prepare("SELECT key_id, verifier, scope, revoked_at FROM viewing_keys LIMIT 1").get();
      this.db.prepare("SELECT key_id, deck_id FROM assignments LIMIT 1").get();
      this.db.prepare("SELECT verifier, key_id, expires_at FROM sessions LIMIT 1").get();
      // Opening SQLite and taking its write lock can both succeed read-only.
      // Assigning the existing version still writes a page and exercises its
      // journal, then rollback preserves every policy byte and domain row.
      this.db.exec("BEGIN IMMEDIATE");
      try { this.db.exec("PRAGMA user_version=1"); }
      finally { this.db.exec("ROLLBACK"); }
    } catch {
      try { this.db?.close(); } catch { /* Keep storage failures controlled. */ }
      throw new GatewayError("policy_unavailable", "Policy is unreadable, unwritable, corrupt or has an unsupported schema.", 503);
    }
  }

  close() { this.db.close(); }

  assertAvailable() {
    try {
      const info = lstatSync(this.path);
      if (!info.isFile() || info.dev !== this.identity.dev || info.ino !== this.identity.ino) throw new Error("replaced");
      const version = this.db.prepare("PRAGMA user_version").get().user_version;
      const check = this.db.prepare("PRAGMA quick_check").get();
      if (version !== 1 || Object.values(check)[0] !== "ok") throw new Error("corrupt");
    } catch {
      throw new GatewayError("policy_unavailable", "Policy is unavailable; requests are denied until its owner restores it.", 503);
    }
  }

  transaction(action) {
    this.assertAvailable();
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const result = action();
      this.db.exec("COMMIT");
      return result;
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
  }

  listKeys() {
    return this.db.prepare(`SELECT key_id, label, scope, created_at, revoked_at FROM viewing_keys ORDER BY created_at, key_id`).all();
  }

  key(id, { active = false } = {}) {
    identifier(id, "key_id");
    const key = this.db.prepare("SELECT key_id, label, scope, created_at, revoked_at FROM viewing_keys WHERE key_id=?").get(id);
    if (!key || (active && key.revoked_at !== null)) throw new GatewayError("not_found", "Active viewing key not found.", 404);
    return key;
  }

  issueKey(label, scope) {
    if (typeof label !== "string" || !label.trim() || label.length > 120 || /[\x00-\x1f\x7f]/.test(label)) {
      throw new GatewayError("invalid_input", "A non-empty key label of at most 120 characters is required.");
    }
    if (!["collection", "all"].includes(scope)) throw new GatewayError("invalid_input", "Key scope must be collection or all.");
    const keyId = `key_${randomBytes(12).toString("hex")}`;
    const value = secret("dv");
    this.db.prepare("INSERT INTO viewing_keys VALUES(?,?,?,?,?,NULL)").run(keyId, label.trim(), scope, verifier(value), this.now());
    return { ...this.key(keyId), secret: value, secret_disclosure: "creation_only" };
  }

  rotateKey(id) {
    this.key(id, { active: true });
    const value = secret("dv");
    this.db.prepare("UPDATE viewing_keys SET verifier=? WHERE key_id=?").run(verifier(value), id);
    this.db.prepare("DELETE FROM sessions WHERE key_id=?").run(id);
    return { ...this.key(id), secret: value, secret_disclosure: "creation_only" };
  }

  revokeKey(id) {
    this.key(id);
    this.db.prepare("UPDATE viewing_keys SET revoked_at=COALESCE(revoked_at,?) WHERE key_id=?").run(this.now(), id);
    this.db.prepare("DELETE FROM sessions WHERE key_id=?").run(id);
    return this.key(id);
  }

  authenticate(value) {
    if (typeof value !== "string" || !/^dv_[A-Za-z0-9_-]{43}$/.test(value)) return null;
    return this.db.prepare("SELECT key_id, label, scope FROM viewing_keys WHERE verifier=? AND revoked_at IS NULL").get(verifier(value)) ?? null;
  }

  createSession(keyId = null) {
    const value = secret("ds");
    this.db.prepare("DELETE FROM sessions WHERE expires_at<=?").run(this.now());
    if (this.db.prepare("SELECT count(*) AS count FROM sessions").get().count >= 20000) {
      throw new GatewayError("rate_limited", "Session capacity reached; retry after existing sessions expire.", 429);
    }
    const lifetime = keyId === null ? 10 * 60 * 1000 : 12 * 60 * 60 * 1000;
    this.db.prepare("INSERT INTO sessions VALUES(?,?,?)").run(verifier(value), keyId, this.now() + lifetime);
    return value;
  }

  session(value) {
    if (typeof value !== "string" || !/^ds_[A-Za-z0-9_-]{43}$/.test(value)) return null;
    const row = this.db.prepare(`SELECT sessions.key_id, label, scope, revoked_at FROM sessions
      LEFT JOIN viewing_keys USING(key_id) WHERE sessions.verifier=? AND expires_at>?`).get(verifier(value), this.now());
    if (!row || (row.key_id && row.revoked_at !== null)) return null;
    return row;
  }

  deleteSession(value) {
    if (value) this.db.prepare("DELETE FROM sessions WHERE verifier=?").run(verifier(value));
  }

  decks() {
    return this.db.prepare("SELECT deck_id, release_id, is_public FROM decks ORDER BY deck_id").all().map(row => ({ ...row, is_public: Boolean(row.is_public) }));
  }

  deck(id) {
    identifier(id, "deck_id");
    const row = this.db.prepare("SELECT deck_id, release_id, is_public FROM decks WHERE deck_id=?").get(id);
    return row ? { ...row, is_public: Boolean(row.is_public) } : null;
  }

  publish(deckId, releaseId) {
    identifier(deckId, "deck_id");
    identifier(releaseId, "release_id");
    // A new deck is private and unassigned. Selecting another release preserves policy.
    this.db.prepare(`INSERT INTO decks(deck_id,release_id) VALUES(?,?) ON CONFLICT(deck_id) DO UPDATE SET release_id=excluded.release_id`).run(deckId, releaseId);
    return this.effective(deckId);
  }

  requireDeck(deckId) {
    const deck = this.deck(deckId);
    if (!deck) throw new GatewayError("not_found", "Published deck not found.", 404);
    return deck;
  }

  setPublic(deckId, value) {
    this.requireDeck(deckId);
    if (typeof value !== "boolean") throw new GatewayError("invalid_input", "public must be a boolean.");
    this.db.prepare("UPDATE decks SET is_public=? WHERE deck_id=?").run(Number(value), deckId);
    return this.effective(deckId);
  }

  assign(deckId, keyId, grant) {
    this.requireDeck(deckId);
    const key = this.key(keyId, { active: grant });
    if (grant && key.scope !== "collection") throw new GatewayError("invalid_input", "Owner viewing keys already read all published decks; assignments are for collections.");
    if (grant) this.db.prepare("INSERT OR IGNORE INTO assignments VALUES(?,?)").run(keyId, deckId);
    else this.db.prepare("DELETE FROM assignments WHERE key_id=? AND deck_id=?").run(keyId, deckId);
    return this.effective(deckId);
  }

  assigned(deckId, keyId) {
    return Boolean(keyId && this.db.prepare("SELECT 1 FROM assignments WHERE key_id=? AND deck_id=?").get(keyId, deckId));
  }

  canRead(deck, session) {
    return Boolean(deck && (deck.is_public || session?.scope === "all" || this.assigned(deck.deck_id, session?.key_id)));
  }

  collection(session) {
    if (!session?.key_id) return [];
    return this.decks().filter(deck => session.scope === "all" || this.assigned(deck.deck_id, session.key_id));
  }

  effective(deckId) {
    const deck = this.requireDeck(deckId);
    const keys = this.db.prepare(`SELECT key_id, label, scope FROM viewing_keys WHERE revoked_at IS NULL AND
      (scope='all' OR key_id IN (SELECT key_id FROM assignments WHERE deck_id=?)) ORDER BY key_id`).all(deckId);
    return { ...deck, keys };
  }
}
