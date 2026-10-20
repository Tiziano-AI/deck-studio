import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { runCli } from "../src/cli.mjs";
import { fixture, writeRelease } from "./fixtures.mjs";

function childCli(argv, env, input = "") {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [fileURLToPath(new URL("../src/cli.mjs", import.meta.url)), ...argv], { env, stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "", stderr = "";
    child.stdout.on("data", data => { stdout += data; }); child.stderr.on("data", data => { stderr += data; });
    child.on("error", reject);
    child.on("close", code => resolve({ code, stdout, stderr }));
    child.stdin.end(input);
  });
}

test("CLI completes the publish/access job through the real management HTTP surface", async t => {
  const f = await fixture(t);
  writeRelease(f.libraryRoot, "sample");
  const env = { ...process.env, DECKS_URL: f.base, DECKS_MANAGEMENT_TOKEN: f.managementToken };
  const call = argv => runCli(argv, { env });
  const releases = await call(["releases", "list"]);
  assert.equal(releases.ok, true);
  assert.equal(releases.data.complete, true);
  assert.deepEqual(releases.data.issues, []);
  assert.equal(releases.data.releases[0].deck_id, "sample");
  const published = await call(["decks", "publish", "sample", "--release", "r1"]);
  assert.equal(published.data.is_public, false);
  const issued = await call(["keys", "issue", "--label", "North"]);
  assert.equal(issued.ok, true);
  assert.match(issued.data.secret, /^dv_/);
  const keyId = issued.data.key_id;
  await call(["decks", "grant", "sample", "--key", keyId]);
  const inspected = await call(["decks", "access", "sample"]);
  assert.equal(inspected.data.keys[0].key_id, keyId);
  const viewer = await f.login(issued.data.secret);
  assert.equal((await f.request("/decks/sample/r1/", { cookie: viewer.cookie })).status, 200);
  const listed = await childCli(["keys", "list", "--json"], env);
  assert.equal(listed.code, 0);
  const listing = JSON.parse(listed.stdout);
  assert.equal(listing.schema_version, 1);
  assert.equal(listing.data.keys[0].key_id, keyId);
  assert.equal(listed.stdout.includes(issued.data.secret), false);
  assert.equal(listed.stderr.includes(f.managementToken), false);
  assert.equal((await call(["decks", "public", "sample", "--value", "true"])).data.is_public, true);
  await call(["decks", "revoke", "sample", "--key", keyId]);
  assert.deepEqual((await call(["decks", "access", "sample"])).data.keys, []);
  await call(["keys", "revoke", keyId]);
  assert.ok((await call(["keys", "list"])).data.keys[0].revoked_at);
});

test("CLI credentials are env/stdin only, redirects are refused, and usage errors remain machine readable", async t => {
  const f = await fixture(t);
  const env = { ...process.env, DECKS_URL: f.base };
  delete env.DECKS_MANAGEMENT_TOKEN;
  const stdin = await childCli(["keys", "list", "--token-stdin"], env, `${f.managementToken}\n`);
  assert.equal(stdin.code, 0);
  assert.equal(JSON.parse(stdin.stdout).ok, true);
  const blocked = await childCli(["keys", "list", "--token", "never-print-this"], env);
  assert.equal(blocked.code, 2);
  assert.equal(JSON.parse(blocked.stdout).error.code, "usage");
  assert.equal(blocked.stdout.includes("never-print-this"), false);
  await assert.rejects(() => runCli(["keys", "list", "--url", "http://remote.example"], { env }), /HTTPS/);
  await assert.rejects(() => runCli(["keys", "list"], { env: { ...env, DECKS_MANAGEMENT_TOKEN: "" } }), /token/);
  await assert.rejects(() => runCli(["keys", "list", "--url", `https://user:private@example.test`], { env }), /HTTPS/);
  await assert.rejects(() => runCli(["decks", "public", "sample", "--value", "yes"], { env }), /true or false/);
  const rejected = await runCli(["keys", "list"], { env: { ...env, DECKS_MANAGEMENT_TOKEN: "a".repeat(43) } });
  assert.equal(rejected.error.code, "unauthorized");
  assert.equal(rejected.http_status, 401);
});

test("CLI initialization is an explicit empty policy creation and never replaces existing state", async t => {
  const f = await fixture(t);
  const target = join(f.directory, "explicit-policy.sqlite");
  const args = ["policy", "init", "--db", target, "--library-root", f.libraryRoot];
  const first = await childCli(args, process.env);
  assert.equal(first.code, 0);
  const initialized = JSON.parse(first.stdout);
  assert.equal(initialized.data.decks, 0);
  assert.equal(initialized.data.keys, 0);
  const original = readFileSync(target);
  const repeated = await childCli(args, process.env);
  assert.equal(repeated.code, 1);
  assert.equal(JSON.parse(repeated.stdout).error.code, "conflict");
  assert.deepEqual(readFileSync(target), original);
});

test("a lost issue response is outcome-unknown with one surviving key, not an automatic retry", async t => {
  const f = await fixture(t);
  let invocations = 0;
  const result = await runCli(["keys", "issue", "--label", "North"], {
    env: { DECKS_URL: f.base, DECKS_MANAGEMENT_TOKEN: f.managementToken },
    fetcher: async (...args) => { invocations++; const response = await fetch(...args); await response.text(); throw new Error("response lost"); },
  });
  assert.equal(result.ok, false);
  assert.equal(result.error.code, "outcome_unknown");
  assert.equal(result.error.effect, "unknown");
  assert.equal(invocations, 1);
  const listing = await f.api("keys");
  assert.equal(listing.json.data.keys.length, 1);
  const recovery = await f.api(`keys/${listing.json.data.keys[0].key_id}/rotate`, {});
  assert.equal(recovery.status, 200);
  assert.match(recovery.json.data.secret, /^dv_/);
});

test("publication rejects changed bytes without changing the selected release", async t => {
  const f = await fixture(t);
  writeRelease(f.libraryRoot, "sample");
  const next = writeRelease(f.libraryRoot, "sample", "r2");
  await f.api("decks/sample/publish", { release_id: "r1" });
  const original = readFileSync(join(next.directory, "deck.html"));
  const changed = Buffer.from(original);
  changed[changed.length - 1] = "!".charCodeAt(0);
  writeFileSync(join(next.directory, "deck.html"), changed);
  assert.equal((await f.api("decks/sample/publish", { release_id: "r2" })).status, 409);
  assert.equal((await f.api("decks/sample/access")).json.data.release_id, "r1");
  assert.equal((await f.api("decks/sample/public", { public: "true" })).status, 400);
  assert.equal((await f.api("decks/sample/access")).json.data.is_public, false);
});
