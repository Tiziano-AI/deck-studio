import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { closeSync, constants, fstatSync, lstatSync, openSync, readFileSync, readSync, readdirSync, realpathSync, statSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { GatewayError, identifier } from "./policy.mjs";
import { artifactPath, audienceArtifact, presentationType, presentationBase, LIBRARY_DELIVERY } from "../../../skills/deck-studio/scripts/delivery_profile.mjs";

const ADMISSION = fileURLToPath(new URL("../../../skills/deck-studio/scripts/release_admission.py", import.meta.url));
const PPTX = Object.freeze({ artifact: "deck.pptx", report: "proof/pptx-report.json", review: "proof/pptx-visual-review.json" });

function within(root, path) {
  const rest = relative(root, path);
  return rest === "" || (!rest.startsWith(`..${sep}`) && rest !== ".." && !isAbsolute(rest));
}

function matchesBytes(file, row) {
  if (file.size !== row.bytes) return false;
  const hash = createHash("sha256");
  const buffer = Buffer.allocUnsafe(64 * 1024);
  let position = 0, count;
  while ((count = readSync(file.fd, buffer, 0, buffer.length, position)) > 0) {
    hash.update(buffer.subarray(0, count));
    position += count;
  }
  return position === row.bytes && hash.digest("hex") === row.sha256;
}

export class ArtifactLibrary {
  constructor(root, { admissionPython = "python3", admissionTimeoutMs = 30000 } = {}) {
    if (!root || !isAbsolute(root)) throw new GatewayError("configuration", "DECKS_LIBRARY_ROOT must be an absolute artifact-library path.", 503);
    try {
      this.root = realpathSync(root);
      if (!statSync(this.root).isDirectory()) throw new Error("not directory");
    } catch {
      throw new GatewayError("library_unavailable", "Artifact library is unavailable.", 503);
    }
    if (typeof admissionPython !== "string" || !admissionPython || /[\0\r\n]/.test(admissionPython)) {
      throw new GatewayError("configuration", "DECKS_ADMISSION_PYTHON must name the Python executable.", 503);
    }
    this.admissionPython = admissionPython;
    if (!Number.isInteger(admissionTimeoutMs) || admissionTimeoutMs < 1 || admissionTimeoutMs > 30000) {
      throw new GatewayError("configuration", "Admission timeout must be an integer from 1 to 30000 milliseconds.", 503);
    }
    this.admissionTimeoutMs = admissionTimeoutMs;
    this.admissions = new Set();
  }

  close() { for (const child of this.admissions) child.kill("SIGKILL"); }

  containedFile(relativePath) {
    if (!artifactPath(relativePath)) throw new GatewayError("not_found", "Artifact not found.", 404);
    const path = resolve(this.root, relativePath);
    try {
      // Reject links in every component, including links pointing back inside.
      let current = this.root;
      for (const part of relativePath.split("/")) {
        current = resolve(current, part);
        if (lstatSync(current).isSymbolicLink()) throw new Error("symlink");
      }
      if (!within(this.root, realpathSync(path))) throw new Error("escape");
      const fd = openSync(path, constants.O_RDONLY | constants.O_NOFOLLOW);
      const info = fstatSync(fd);
      if (!info.isFile()) { closeSync(fd); throw new Error("not file"); }
      return { fd, size: info.size, path };
    } catch (cause) {
      const error = new GatewayError("not_found", "Artifact not found.", 404);
      error.unreadable = ["EACCES", "EPERM", "EIO", "EMFILE", "ENFILE"].includes(cause.code);
      throw error;
    }
  }

  read(relativePath, limit = 4 * 1024 * 1024) {
    const file = this.containedFile(relativePath);
    try {
      if (file.size > limit) throw new GatewayError("invalid_release", "Metadata exceeds its supported size.", 409);
      return readFileSync(file.fd);
    } finally { closeSync(file.fd); }
  }

  release(deckId, releaseId) {
    identifier(deckId, "deck_id");
    identifier(releaseId, "release_id");
    const prefix = `decks/${deckId}/${releaseId}`;
    let manifest;
    try { manifest = JSON.parse(this.read(`${prefix}/deck-manifest.json`).toString("utf8")); }
    catch (error) {
      if (error instanceof GatewayError) throw error;
      throw new GatewayError("invalid_release", "Release manifest is invalid.", 409);
    }
    if (![1, 2, 3].includes(manifest.schema_version) || manifest.deck_id !== deckId || manifest.release_id !== releaseId ||
      typeof manifest.title !== "string" || !manifest.title.trim() || !Number.isSafeInteger(manifest.slide_count) || manifest.slide_count < 1 ||
      !Array.isArray(manifest.artifacts) || manifest.artifacts.length > 10000) {
      throw new GatewayError("invalid_release", "Release manifest does not match its identity or artifact schema.", 409);
    }
    const artifacts = new Map();
    for (const row of manifest.artifacts) {
      if (!artifactPath(row.path) || artifacts.has(row.path) || !/^[a-f0-9]{64}$/.test(row.sha256) || !Number.isSafeInteger(row.bytes) || row.bytes < 0) {
        throw new GatewayError("invalid_release", "Release artifact allowlist is invalid.", 409);
      }
      artifacts.set(row.path, row);
    }
    if (!artifacts.has("deck.html") || !artifacts.has("deck.pdf")) throw new GatewayError("invalid_release", "Release requires deck.html and deck.pdf.", 409);
    const hasPptx = artifacts.has("deck.pptx");
    const declaredPptx = manifest.pptx && typeof manifest.pptx === "object" && !Array.isArray(manifest.pptx) &&
      Object.keys(manifest.pptx).length === Object.keys(PPTX).length && Object.entries(PPTX).every(([key, value]) => manifest.pptx[key] === value);
    if ([...artifacts.keys()].some(path => path.toLowerCase().endsWith(".pptx") && path !== "deck.pptx") ||
      ((hasPptx || manifest.pptx !== undefined) && (manifest.schema_version !== 3 || !declaredPptx || !Object.values(PPTX).every(path => artifacts.has(path))))) {
      throw new GatewayError("invalid_release", "Native PPTX requires its complete declared artifact and proof contract.", 409);
    }
    return { manifest, prefix, artifacts };
  }

  async verifyForPublication(deckId, releaseId) {
    const release = this.release(deckId, releaseId);
    if (this.admissions.size >= 2) throw new GatewayError("admission_busy", "Release admission capacity reached; selection is unchanged.", 503);
    const manifestSha256 = createHash("sha256").update(this.read(`${release.prefix}/deck-manifest.json`)).digest("hex");
    const result = await new Promise((accept, reject) => {
      const child = execFile(this.admissionPython, ["-B", "-E", "-s", ADMISSION, resolve(this.root, release.prefix),
        "--target", "library", "--deck-id", deckId, "--release-id", releaseId], {
        cwd: dirname(ADMISSION), env: { PATH: process.env.PATH ?? "/usr/bin:/bin", LANG: "C.UTF-8" },
        timeout: this.admissionTimeoutMs, killSignal: "SIGKILL", maxBuffer: 64 * 1024, windowsHide: true,
      }, (error, stdout) => {
        this.admissions.delete(child);
        let parsed;
        try { parsed = JSON.parse(stdout); } catch { /* A missing/broken helper is not an admission. */ }
        if (error) {
          if (Number.isInteger(error.code) && error.code !== 0 && parsed?.ok === false && typeof parsed.code === "string") {
            reject(new GatewayError("release_not_admitted", "Release failed canonical admission; inspect it with release_admission.py.", 409));
          } else reject(new GatewayError("admission_unavailable", "Canonical admission is unavailable; selection is unchanged.", 503));
        } else if (!parsed || parsed.ok !== true) {
          reject(new GatewayError("admission_unavailable", "Canonical admission returned an invalid result; selection is unchanged.", 503));
        } else accept(parsed);
      });
      this.admissions.add(child);
    });
    if (result.deck_id !== deckId || result.release_id !== releaseId || result.manifest_sha256 !== manifestSha256 ||
        result.delivery_profile?.id !== LIBRARY_DELIVERY.id || result.delivery_profile?.sha256 !== LIBRARY_DELIVERY.sha256) {
      throw new GatewayError("admission_mismatch", "Admission identity differs from the loaded release or delivery profile; selection is unchanged.", 409);
    }
    return { ...release, manifestSha256 };
  }

  recheckPublication(release) {
    if (createHash("sha256").update(this.read(`${release.prefix}/deck-manifest.json`)).digest("hex") !== release.manifestSha256) {
      throw new GatewayError("invalid_release", "Release changed after admission; selection is unchanged.", 409);
    }
    for (const row of release.artifacts.values()) {
      const file = this.containedFile(`${release.prefix}/${row.path}`);
      try {
        if (!matchesBytes(file, row)) throw new GatewayError("invalid_release", "Release artifact bytes differ from their manifest.", 409);
      } finally { closeSync(file.fd); }
    }
  }

  audience(deck) {
    const release = this.release(deck.deck_id, deck.release_id);
    const base = presentationBase(deck.deck_id, deck.release_id);
    const cover = [...release.artifacts.keys()].find(path => /^cover\.(png|webp|jpe?g|avif)$/i.test(path));
    return { deck_id: deck.deck_id, title: release.manifest.title, slide_count: release.manifest.slide_count,
      html: base, pdf: `${base}deck.pdf`, pptx: release.artifacts.has("deck.pptx") ? `${base}deck.pptx` : null,
      cover: cover ? `${base}${cover}` : null };
  }

  openArtifact(deckId, releaseId, path, management = false) {
    const release = this.release(deckId, releaseId);
    if (path === "deck-manifest.json" && management) return { ...this.containedFile(`${release.prefix}/${path}`), contentType: "application/json; charset=utf-8" };
    if (!release.artifacts.has(path) || (!management && !audienceArtifact(path))) throw new GatewayError("not_found", "Artifact not found.", 404);
    const file = this.containedFile(`${release.prefix}/${path}`);
    if (!matchesBytes(file, release.artifacts.get(path))) {
      closeSync(file.fd);
      throw new GatewayError("invalid_release", "Artifact bytes differ from their immutable manifest.", 503);
    }
    return { ...file, contentType: presentationType(path) ?? "application/octet-stream",
      downloadName: path === "deck.pptx" ? "deck.pptx" : null };
  }

  listReleases() {
    const entries = [];
    const issues = [];
    let complete = true;
    let decks;
    try {
      if (!lstatSync(resolve(this.root, "decks")).isDirectory()) throw new Error("unsafe decks root");
      decks = readdirSync(resolve(this.root, "decks"), { withFileTypes: true });
    }
    catch (error) {
      if (error.code === "ENOENT") return { releases: [], issues: [], complete: true };
      return { releases: [], issues: [{ path: "decks", code: "unreadable" }], complete: false };
    }
    for (const deck of decks) {
      if (!deck.isDirectory() || !/^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/.test(deck.name)) {
        issues.push({ path: `decks/${deck.name}`, code: "invalid_candidate" }); continue;
      }
      let releases;
      try { releases = readdirSync(resolve(this.root, "decks", deck.name), { withFileTypes: true }); }
      catch { issues.push({ path: `decks/${deck.name}`, code: "unreadable" }); complete = false; continue; }
      for (const release of releases) {
        const path = `decks/${deck.name}/${release.name}`;
        if (!release.isDirectory() || !/^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/.test(release.name)) {
          issues.push({ path, code: "invalid_candidate" }); continue;
        }
        try {
          const parsed = this.release(deck.name, release.name);
          entries.push({ deck_id: deck.name, release_id: release.name, title: parsed.manifest.title, schema_version: parsed.manifest.schema_version });
        } catch (error) {
          if (error.unreadable) complete = false;
          issues.push({ path, code: error.unreadable ? "unreadable" : error instanceof GatewayError ? error.code : "invalid_candidate" });
        }
      }
    }
    return { releases: entries.sort((a, b) => `${a.deck_id}/${a.release_id}`.localeCompare(`${b.deck_id}/${b.release_id}`)), issues, complete };
  }
}
