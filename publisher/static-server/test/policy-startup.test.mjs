import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { once } from "node:events";
import { chmodSync, closeSync, existsSync, mkdirSync, mkdtempSync, openSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { createGateway } from "../src/server.mjs";
import { GatewayError, initializePolicy, PolicyStore } from "../src/policy.mjs";

function policyFixture(t, populated) {
  const directory = mkdtempSync(join(tmpdir(), "decks-policy-startup-"));
  const libraryRoot = join(directory, "library");
  const policyPath = join(directory, "policy", "policy.sqlite");
  mkdirSync(libraryRoot);
  initializePolicy(policyPath, libraryRoot);
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  if (populated) {
    const store = new PolicyStore(policyPath, libraryRoot, { now: () => 12345 });
    try {
      store.transaction(() => {
        store.publish("retained", "r7");
        store.setPublic("retained", true);
        const collection = store.issueKey("Retained collection", "collection");
        store.assign("retained", collection.key_id, true);
        store.issueKey("Retained owner", "all");
        store.createSession(collection.key_id);
        store.createSession();
      });
    } finally { store.close(); }
  }
  return { directory, libraryRoot, policyPath, config: { libraryRoot, policyPath, managementToken: randomBytes(32).toString("base64url") } };
}

function snapshot(path) {
  const db = new DatabaseSync(path, { readOnly: true });
  try {
    return { bytes: readFileSync(path), version: db.prepare("PRAGMA user_version").get().user_version,
      decks: db.prepare("SELECT * FROM decks ORDER BY deck_id").all(),
      viewingKeys: db.prepare("SELECT * FROM viewing_keys ORDER BY key_id").all(),
      assignments: db.prepare("SELECT * FROM assignments ORDER BY key_id, deck_id").all(),
      sessions: db.prepare("SELECT * FROM sessions ORDER BY verifier").all() };
  } finally { db.close(); }
}

function policyUnavailable(error) {
  return error instanceof GatewayError && error.code === "policy_unavailable" && error.status === 503 && /unwritable/.test(error.message);
}

function assertActualSqliteWriteDenied(path) {
  const db = new DatabaseSync(path);
  try {
    // This establishes why opening and BEGIN IMMEDIATE are not adequate probes:
    // both succeed under these faults, but an actual page write is denied.
    db.exec("BEGIN IMMEDIATE");
    assert.throws(() => db.exec("PRAGMA user_version=1"), error => error.code === "ERR_SQLITE_ERROR" && (error.errcode & 0xff) === 8);
    db.exec("ROLLBACK");
  } finally { db.close(); }
}

test("startup's rollback-only SQLite write exercises the journal and preserves empty and populated policy", async t => {
  for (const populated of [false, true]) await t.test(populated ? "existing grants, selections and sessions" : "empty policy", async t => {
    const f = policyFixture(t, populated);
    const before = snapshot(f.policyPath);
    const raw = new DatabaseSync(f.policyPath);
    try {
      raw.exec("BEGIN IMMEDIATE");
      assert.equal(existsSync(`${f.policyPath}-journal`), false);
      raw.exec("PRAGMA user_version=1");
      assert.equal(existsSync(`${f.policyPath}-journal`), true, "setting the existing version must reach SQLite's journal, not just its lock");
      raw.exec("ROLLBACK");
    } finally { raw.close(); }
    assert.deepEqual(snapshot(f.policyPath), before);
    const store = new PolicyStore(f.policyPath, f.libraryRoot);
    store.close();
    const server = createGateway(f.config);
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    assert.deepEqual(snapshot(f.policyPath), before, "successful constructor and gateway startup must leave policy bytes and domain state intact");
    assert.deepEqual(readdirSync(join(f.directory, "policy")), ["policy.sqlite"], "the rollback probe must not leave a persistent journal or auxiliary file");
  });
});

test("a readable but read-only database fails startup before serving with its policy intact", { skip: process.getuid?.() === 0 ? "Root bypasses POSIX file permissions; run as the gateway's unprivileged user" : false }, async t => {
  for (const populated of [false, true]) await t.test(populated ? "populated policy" : "empty policy", t => {
    const f = policyFixture(t, populated);
    const before = snapshot(f.policyPath);
    chmodSync(f.policyPath, 0o400);
    try {
      assert.throws(() => { const fd = openSync(f.policyPath, "r+"); closeSync(fd); }, error => ["EACCES", "EPERM", "EROFS"].includes(error.code), "the fault must actually deny an OS write open");
      assertActualSqliteWriteDenied(f.policyPath);
      assert.throws(() => new PolicyStore(f.policyPath, f.libraryRoot), policyUnavailable);
      assert.throws(() => createGateway(f.config), policyUnavailable);
      assert.deepEqual(snapshot(f.policyPath), before);
      assert.deepEqual(readdirSync(join(f.directory, "policy")), ["policy.sqlite"]);
    } finally { chmodSync(f.policyPath, 0o600); }
  });
});

test("a writable database in a read-only parent fails startup when SQLite cannot create its journal", { skip: process.getuid?.() === 0 ? "Root bypasses POSIX directory permissions; run as the gateway's unprivileged user" : false }, async t => {
  for (const populated of [false, true]) await t.test(populated ? "populated policy" : "empty policy", t => {
    const f = policyFixture(t, populated);
    const before = snapshot(f.policyPath);
    const parent = join(f.directory, "policy");
    chmodSync(parent, 0o500);
    try {
      const fd = openSync(f.policyPath, "r+");
      closeSync(fd);
      assert.throws(() => { const fd = openSync(`${f.policyPath}-journal`, "wx"); closeSync(fd); }, error => ["EACCES", "EPERM", "EROFS"].includes(error.code), "the fault must actually deny journal creation, not access to the database file");
      assertActualSqliteWriteDenied(f.policyPath);
      assert.throws(() => new PolicyStore(f.policyPath, f.libraryRoot), policyUnavailable);
      assert.throws(() => createGateway(f.config), policyUnavailable);
      assert.deepEqual(snapshot(f.policyPath), before);
      assert.deepEqual(readdirSync(parent), ["policy.sqlite"]);
    } finally { chmodSync(parent, 0o700); }
  });
});
