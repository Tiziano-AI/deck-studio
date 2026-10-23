import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, renameSync, symlinkSync, writeFileSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { request as httpRequest } from "node:http";
import { createGateway } from "../src/server.mjs";
import { initializePolicy, PolicyStore } from "../src/policy.mjs";
import { fixture, writeRelease } from "./fixtures.mjs";

const resourcePaths = ["", "deck.html", "deck.pdf", "cover.png", "assets/deck.css", "assets/font.woff2"];

async function seed(f) {
  for (const id of ["alpha", "beta", "gamma"]) {
    writeRelease(f.libraryRoot, id);
    assert.equal((await f.api(`decks/${id}/publish`, { release_id: "r1" })).status, 200);
  }
  writeFileSync(join(f.libraryRoot, "catalog.json"), JSON.stringify({ private: "full catalog" }));
  const north = (await f.api("keys", { label: "North", scope: "collection" })).json.data;
  const south = (await f.api("keys", { label: "South", scope: "collection" })).json.data;
  const owner = (await f.api("keys", { label: "Owner", scope: "all" })).json.data;
  await f.api("decks/alpha/public", { public: true });
  await f.api("decks/beta/grant", { key_id: north.key_id });
  await f.api("decks/gamma/grant", { key_id: north.key_id });
  await f.api("decks/gamma/grant", { key_id: south.key_id });
  return { north, south, owner };
}

function titles(text, included, excluded = []) {
  for (const id of included) assert.match(text, new RegExp(`Title-${id}`));
  for (const id of excluded) assert.doesNotMatch(text, new RegExp(`Title-${id}`));
  assert.doesNotMatch(text, /Backstage-only|do-not-show-viewers/);
}

test("anonymous, North, South, owner and management have distinct real HTTP access", async t => {
  const f = await fixture(t);
  const { north, south, owner } = await seed(f);
  const anonymous = await f.request("/");
  assert.equal(anonymous.status, 200);
  titles(anonymous.text, ["alpha"], ["beta", "gamma"]);
  assert.equal(anonymous.headers.get("cache-control"), "no-store");
  assert.equal((await f.request("/collection")).status, 401);
  const sessions = {};
  for (const [name, key] of Object.entries({ north, south, owner })) {
    const session = await f.login(key.secret);
    assert.equal(session.status, 303);
    assert.match(session.headers.get("set-cookie"), /HttpOnly; SameSite=Lax/);
    assert.doesNotMatch(session.headers.get("set-cookie"), new RegExp(key.secret));
    sessions[name] = session.cookie;
  }
  titles((await f.request("/collection", { cookie: sessions.north })).text, ["beta", "gamma"], ["alpha"]);
  titles((await f.request("/collection", { cookie: sessions.south })).text, ["gamma"], ["alpha", "beta"]);
  titles((await f.request("/collection", { cookie: sessions.owner })).text, ["alpha", "beta", "gamma"]);
  titles((await f.request("/", { cookie: sessions.north })).text, ["alpha"], ["beta", "gamma"]);

  for (const leaf of resourcePaths) {
    const path = `/decks/beta/r1/${leaf}`;
    const hidden = await f.request(path);
    assert.equal(hidden.status, 401);
    assert.doesNotMatch(hidden.text, /Title-beta|Backstage-only/);
    assert.equal((await f.request(path, { cookie: sessions.north })).status, 200, leaf);
    assert.equal((await f.request(path, { cookie: sessions.south })).status, 403, leaf);
    assert.equal((await f.request(path, { cookie: sessions.owner })).status, 200, leaf);
    assert.equal((await f.request(`/decks/alpha/r1/${leaf}`)).status, 200, leaf);
  }
  for (const path of ["/catalog.json", "/decks/beta/r1/deck-manifest.json", "/decks/beta/r1/proof/report.json"]) {
    for (const cookie of [undefined, ...Object.values(sessions)]) assert.equal((await f.request(path, { cookie })).status, 404, path);
    assert.equal((await f.request(path, { headers: { authorization: `Bearer ${f.managementToken}` } })).status, 200, path);
  }
  for (const cookie of Object.values(sessions)) assert.equal((await f.request("/api/v1/keys", { cookie })).status, 401);
  assert.equal((await f.api("keys", undefined, north.secret)).status, 401);
  assert.equal((await f.login(f.managementToken)).status, 401);
  await f.api("decks/alpha/grant", { key_id: north.key_id });
  titles((await f.request("/collection", { cookie: sessions.north })).text, ["alpha", "beta", "gamma"]);
  const listing = await f.api("keys");
  assert.equal(listing.json.data.complete, true);
  assert.doesNotMatch(listing.text, /"secret"|"verifier"/);
  for (const key of [north, south, owner]) assert.ok(!listing.text.includes(key.secret));
  assert.equal(readFileSync(f.policyPath).includes(Buffer.from(north.secret)), false);
});

test("native PPTX downloads preserve exact bytes and the selected deck's audience policy", async t => {
  const f = await fixture(t);
  const native = writeRelease(f.libraryRoot, "native", "r1", { native: true });
  writeRelease(f.libraryRoot, "unselected-native", "r1", { native: true });
  writeRelease(f.libraryRoot, "without-native", "r1", { native: false });
  assert.equal((await f.api("decks/native/publish", { release_id: "r1" })).status, 200);
  const incomplete = await f.api("decks/without-native/publish", { release_id: "r1" });
  assert.equal(incomplete.status, 409);
  assert.equal(incomplete.json.error.code, "release_not_admitted");
  const allowed = (await f.api("keys", { label: "Native assigned", scope: "collection" })).json.data;
  const wrong = (await f.api("keys", { label: "Not assigned", scope: "collection" })).json.data;
  await f.api("decks/native/grant", { key_id: allowed.key_id });
  const member = await f.login(allowed.secret);
  const outsider = await f.login(wrong.secret);
  const path = "/decks/native/r1/deck.pptx";
  assert.equal((await f.request(path)).status, 401);
  assert.equal((await f.request(path, { cookie: outsider.cookie })).status, 403);
  const download = await fetch(`${f.base}${path}`, { headers: { cookie: member.cookie }, redirect: "manual" });
  assert.equal(download.status, 200);
  assert.equal(download.headers.get("content-type"), "application/vnd.openxmlformats-officedocument.presentationml.presentation");
  assert.equal(download.headers.get("content-disposition"), 'attachment; filename="deck.pptx"');
  assert.deepEqual(Buffer.from(await download.arrayBuffer()), readFileSync(join(native.directory, "deck.pptx")));
  const gallery = await f.request("/collection", { cookie: member.cookie });
  assert.match(gallery.text, /href="\/decks\/native\/r1\/deck.pptx" download/);
  for (const cookie of [undefined, member.cookie, outsider.cookie]) {
    for (const leaf of ["proof/pptx-report.json", "proof/pptx-visual-review.json", "proof/pptx/slide-01.png"]) {
      assert.equal((await f.request(`/decks/native/r1/${leaf}`, { cookie })).status, 404, leaf);
    }
    for (const source of ["author.mjs", "SOURCE.md"]) {
      assert.ok([401, 403, 404].includes((await f.request(`/decks/native/r1/${source}`, { cookie })).status));
    }
    assert.equal((await f.request("/decks/unselected-native/r1/deck.pptx", { cookie })).status, 404);
  }
  await f.api("decks/native/public", { public: true });
  assert.equal((await f.request(path)).status, 200);
  const publicGallery = await f.request("/");
  assert.match(publicGallery.text, /\/decks\/native\/r1\/deck.pptx/);
  assert.doesNotMatch(publicGallery.text, /\/decks\/without-native\/r1\/deck.pptx/);
  assert.equal((await f.request("/decks/without-native/r1/deck.pptx")).status, 404);
  writeRelease(f.libraryRoot, "native", "r2", { native: true });
  assert.equal((await f.api("decks/native/publish", { release_id: "r2" })).status, 200);
  for (const cookie of [undefined, member.cookie]) assert.equal((await f.request(path, { cookie })).status, 404);
  await f.api("decks/native/public", { public: false });
  assert.equal((await f.request("/decks/native/r2/deck.pptx")).status, 401);
  await f.api("decks/native/revoke", { key_id: allowed.key_id });
  assert.equal((await f.request("/decks/native/r2/deck.pptx", { cookie: member.cookie })).status, 403);
  const current = join(f.libraryRoot, "decks/native/r2/deck.pptx");
  const changed = readFileSync(current);
  changed[changed.length - 1] ^= 1;
  writeFileSync(current, changed);
  assert.equal((await f.request("/decks/native/r2/deck.pptx", { headers: { authorization: `Bearer ${f.managementToken}` } })).status, 503);
});

test("fresh authorization covers assignment removal, key rotation/revocation and public reversal", async t => {
  const f = await fixture(t);
  const { north } = await seed(f);
  const session = await f.login(north.secret);
  await f.api("decks/beta/revoke", { key_id: north.key_id });
  for (const leaf of resourcePaths) assert.equal((await f.request(`/decks/beta/r1/${leaf}`, { cookie: session.cookie })).status, 403);
  await f.api("decks/alpha/public", { public: false });
  assert.equal((await f.request("/decks/alpha/r1/deck.pdf")).status, 401);
  titles((await f.request("/")).text, [], ["alpha", "beta", "gamma"]);
  const rotated = await f.api(`keys/${north.key_id}/rotate`, {});
  assert.equal(rotated.status, 200);
  assert.equal((await f.request("/collection", { cookie: session.cookie })).status, 401);
  assert.equal((await f.login(north.secret)).status, 401);
  const newSession = await f.login(rotated.json.data.secret);
  assert.equal(newSession.status, 303);
  await f.api(`keys/${north.key_id}/revoke`, {});
  for (const leaf of resourcePaths) assert.equal((await f.request(`/decks/gamma/r1/${leaf}`, { cookie: newSession.cookie })).status, 401);
  assert.equal((await f.login(rotated.json.data.secret)).status, 401);
  assert.equal((await f.api(`keys/${north.key_id}/rotate`, {})).status, 404);
});

test("current release selection hides immutable older releases and retains independent policy", async t => {
  const f = await fixture(t);
  const { north, owner } = await seed(f);
  writeRelease(f.libraryRoot, "alpha", "r2");
  writeRelease(f.libraryRoot, "unselected", "r1");
  writeRelease(f.libraryRoot, "legacy", "r1", { schema: 2 });
  const selected = await f.api("decks/alpha/publish", { release_id: "r2" });
  assert.equal(selected.status, 200);
  assert.equal(selected.json.data.is_public, true);
  const session = await f.login(owner.secret);
  for (const cookie of [undefined, session.cookie]) {
    for (const leaf of resourcePaths) assert.equal((await f.request(`/decks/alpha/r1/${leaf}`, { cookie })).status, 404);
    assert.equal((await f.request("/decks/unselected/r1/", { cookie })).status, 404);
  }
  assert.equal((await f.request("/decks/alpha/r2/")).status, 200);
  assert.equal((await f.request("/decks/alpha/r1/", { headers: { authorization: `Bearer ${f.managementToken}` } })).status, 200);
  assert.equal((await f.api("decks/legacy/publish", { release_id: "r1" })).status, 409);
  assert.equal((await f.api("decks/unselected/publish", { release_id: "r1" })).json.data.is_public, false);
  const state = (await f.api("decks/unselected/access")).json.data;
  assert.deepEqual(state.keys.map(key => key.key_id), [owner.key_id]);
  assert.equal((await f.api("decks/beta/access")).json.data.keys.some(key => key.key_id === north.key_id), true);
});

test("sessions and policy persist through restart; missing/corrupt policy never reinitializes", async t => {
  const f = await fixture(t);
  const { north } = await seed(f);
  const session = await f.login(north.secret);
  await f.stop();
  await f.start();
  assert.equal((await f.request("/decks/beta/r1/", { cookie: session.cookie })).status, 200);
  titles((await f.request("/collection", { cookie: session.cookie })).text, ["beta", "gamma"], ["alpha"]);
  renameSync(f.policyPath, `${f.policyPath}.held`);
  assert.equal((await f.request("/")).status, 503);
  assert.equal((await f.request("/decks/alpha/r1/deck.pdf")).status, 503);
  await f.stop();
  assert.throws(() => createGateway({ libraryRoot: f.libraryRoot, policyPath: f.policyPath, managementToken: f.managementToken }), /Policy is missing/);
  writeFileSync(f.policyPath, "not a sqlite policy");
  assert.throws(() => createGateway({ libraryRoot: f.libraryRoot, policyPath: f.policyPath, managementToken: f.managementToken }), /corrupt/);
  assert.throws(() => initializePolicy(f.policyPath, f.libraryRoot), /never replaces/);
  assert.throws(() => initializePolicy(join(f.libraryRoot, "policy.sqlite"), f.libraryRoot), /outside/);
});

test("corruption of an already-open policy fails closed on the next HTTP read", async t => {
  const f = await fixture(t);
  await seed(f);
  assert.equal((await f.request("/decks/alpha/r1/")).status, 200);
  writeFileSync(f.policyPath, "corrupted policy bytes");
  for (const path of ["/", "/healthz", "/decks/alpha/r1/", "/api/v1/keys"]) {
    assert.equal((await f.request(path, { headers: { authorization: `Bearer ${f.managementToken}` } })).status, 503, path);
  }
});

test("browser mutations require origin and CSRF, replace active keys, and invalidate logout server-side", async t => {
  const f = await fixture(t, { loginLimit: 100 });
  const { north, south } = await seed(f);
  const session = await f.login(north.secret, { returnTo: "/decks/beta/r1/" });
  assert.equal(session.headers.get("location"), "/decks/beta/r1/");
  const form = await f.request("/login", { cookie: session.cookie });
  const input = new URLSearchParams({ key: south.secret, csrf: f.csrf(form.text), return_to: "//evil.test" });
  const content = { "content-type": "application/x-www-form-urlencoded" };
  assert.equal((await f.request("/login", { method: "POST", cookie: session.cookie, headers: { ...content, origin: "https://evil.test" }, body: input.toString() })).status, 403);
  assert.equal((await f.request("/login", { method: "POST", cookie: session.cookie, headers: { ...content, origin: f.base }, body: new URLSearchParams({ key: south.secret, csrf: "wrong" }).toString() })).status, 403);
  const switched = await f.login(south.secret, { cookie: session.cookie, returnTo: "/decks/beta/r1/" });
  assert.notEqual(switched.cookie, session.cookie);
  assert.equal((await f.request("/collection", { cookie: session.cookie })).status, 401);
  assert.equal((await f.request("/decks/beta/r1/", { cookie: switched.cookie })).status, 403);
  const collection = await f.request("/collection", { cookie: switched.cookie });
  titles(collection.text, ["gamma"], ["beta"]);
  assert.equal((await f.request("/logout", { cookie: switched.cookie })).status, 405);
  const logout = await f.request("/logout", { method: "POST", cookie: switched.cookie, headers: { ...content, origin: f.base }, body: new URLSearchParams({ csrf: f.csrf(collection.text) }).toString() });
  assert.equal(logout.status, 303);
  assert.match(logout.headers.get("set-cookie"), /Max-Age=0/);
  assert.equal((await f.request("/collection", { cookie: switched.cookie })).status, 401);
  const redirect = await f.login(north.secret, { returnTo: "//evil.test" });
  assert.equal(redirect.headers.get("location"), "/collection");
  assert.equal((await f.request("/api/v1/keys", { headers: { authorization: `Bearer ${f.managementToken}`, origin: f.base } })).status, 401);
});

test("only an implicit login opens the sole assigned deck; explicit destinations and collection remain navigable", async t => {
  const f = await fixture(t, { loginLimit: 100 });
  const { north, south } = await seed(f);
  const empty = (await f.api("keys", { label: "Empty", scope: "collection" })).json.data;
  async function implicitLogin(key) {
    const form = await f.request("/login");
    const target = /name="return_to" value="([^"]*)"/.exec(form.text)?.[1];
    assert.equal(target, "", "the form must preserve an absent destination, not materialize /collection");
    const preauth = form.headers.get("set-cookie").split(";", 1)[0];
    const result = await f.request("/login", { method: "POST", cookie: preauth,
      headers: { origin: f.base, "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ key, csrf: f.csrf(form.text), return_to: target }).toString() });
    assert.equal(result.status, 303);
    return { ...result, cookie: result.headers.get("set-cookie").split(";", 1)[0] };
  }
  const single = await implicitLogin(south.secret);
  assert.equal(single.headers.get("location"), "/decks/gamma/r1/");
  titles((await f.request(single.headers.get("location"), { cookie: single.cookie })).text, ["gamma"], ["alpha", "beta"]);
  assert.equal((await implicitLogin(empty.secret)).headers.get("location"), "/collection");
  assert.equal((await implicitLogin(north.secret)).headers.get("location"), "/collection");
  for (const target of ["/collection", "/", "/decks/gamma/r1/"]) {
    const explicit = await f.login(south.secret, { returnTo: target });
    assert.equal(explicit.status, 303);
    assert.equal(explicit.headers.get("location"), target);
  }
  const collection = await f.request("/collection", { cookie: single.cookie });
  assert.equal(collection.status, 200);
  assert.equal(collection.headers.get("location"), null);
  assert.match(collection.text, /action="\/logout"/);
  assert.match(collection.text, /href="\/login(?:\?[^"]*)?">Change key<\/a>/);
});

test("bounded bodies, login throttling and raw traversal cannot be bypassed through forwarding headers", async t => {
  const f = await fixture(t, { loginLimit: 3 });
  assert.equal((await f.request("/login")).status, 200);
  assert.equal((await f.request("/login", { headers: { "x-forwarded-for": "1.1.1.1" } })).status, 200);
  assert.equal((await f.request("/login", { headers: { "x-forwarded-for": "2.2.2.2" } })).status, 200);
  const limited = await f.request("/login", { headers: { "x-forwarded-for": "3.3.3.3" } });
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("retry-after"), "60");
  const tooLarge = await f.request("/api/v1/keys", { method: "POST", headers: { authorization: `Bearer ${f.managementToken}`, "content-type": "application/json" }, body: JSON.stringify({ label: "x".repeat(17000), scope: "collection" }) });
  assert.equal(tooLarge.status, 413);
  for (const path of ["/decks/a/r/%2e%2e/secret", "/decks/a/r/%5c..%5csecret", "/%00", "/%zz"]) {
    const status = await new Promise((resolve, reject) => {
      const request = httpRequest(f.base, { path }, response => { response.resume(); response.on("end", () => resolve(response.statusCode)); });
      request.on("error", reject); request.end();
    });
    assert.equal(status, 403, path);
  }
});

test("every private entrance throttles new preauth sessions, not only the login URL", async t => {
  const f = await fixture(t, { loginLimit: 1 });
  writeRelease(f.libraryRoot, "private");
  await f.api("decks/private/publish", { release_id: "r1" });
  const first = await f.request("/collection");
  assert.equal(first.status, 401);
  assert.ok(first.headers.get("set-cookie"));
  for (const path of ["/collection", "/decks/private/r1/", "/login"]) {
    const blocked = await f.request(path);
    assert.equal(blocked.status, 429, path);
    assert.equal(blocked.headers.get("set-cookie"), null);
  }
  // Reusing the anonymous session reads its form without creating another slot.
  const existing = first.headers.get("set-cookie").split(";", 1)[0];
  assert.equal((await f.request("/collection", { cookie: existing })).status, 401);
});

test("artifact allowlist and realpath containment deny loose files and symlink escapes", async t => {
  const f = await fixture(t);
  const { directory, manifest } = writeRelease(f.libraryRoot, "alpha");
  writeFileSync(join(f.directory, "outside.css"), "outside-sensitive");
  assert.equal((await f.api("decks/alpha/publish", { release_id: "r1" })).status, 200);
  await f.api("decks/alpha/public", { public: true });
  // Loose files added after admission still cannot enter the audience allowlist.
  writeFileSync(join(directory, "secret.txt"), "never serve this");
  assert.equal((await f.request("/decks/alpha/r1/secret.txt")).status, 404);
  assert.equal((await f.request("/decks/alpha/r1/assets/not-listed.css")).status, 404);
  unlinkSync(join(directory, "assets", "deck.css"));
  symlinkSync(join(f.directory, "outside.css"), join(directory, "assets", "deck.css"));
  assert.equal((await f.request("/decks/alpha/r1/assets/deck.css")).status, 404);
  assert.equal((await f.api("decks/alpha/publish", { release_id: "r1" })).status, 409);
  const traversal = { ...manifest, artifacts: [...manifest.artifacts, { path: "../outside.css", sha256: "0".repeat(64), bytes: 1 }] };
  writeFileSync(join(directory, "deck-manifest.json"), JSON.stringify(traversal));
  assert.equal((await f.request("/decks/alpha/r1/")).status, 409);
});

test("same-size artifact tampering is denied before bytes are served", async t => {
  const f = await fixture(t);
  const { directory } = writeRelease(f.libraryRoot, "alpha");
  await f.api("decks/alpha/publish", { release_id: "r1" });
  await f.api("decks/alpha/public", { public: true });
  const original = readFileSync(join(directory, "deck.html"));
  const changed = Buffer.from(original);
  changed[changed.length - 1] ^= 1;
  writeFileSync(join(directory, "deck.html"), changed);
  const denied = await f.request("/decks/alpha/r1/");
  assert.equal(denied.status, 503);
  assert.doesNotMatch(denied.text, /Title-alpha/);
});

test("production config requires exact HTTPS origin and sets Secure cookies without trusting forwarded origin", async t => {
  const f = await fixture(t, { production: true, origin: "https://decks.example" });
  // fetch owns Host itself; use an actual proxy-shaped HTTP request instead.
  const login = await new Promise((resolve, reject) => {
    const request = httpRequest(f.base, { path: "/login", headers: { host: "decks.example" } }, response => {
      response.resume(); response.on("end", () => resolve({ status: response.statusCode, cookie: response.headers["set-cookie"][0] }));
    });
    request.on("error", reject); request.end();
  });
  assert.equal(login.status, 200);
  assert.match(login.cookie, /; Secure/);
  assert.equal((await f.request("/login", { headers: { "x-forwarded-host": "decks.example" } })).status, 403);
  const config = { libraryRoot: f.libraryRoot, policyPath: f.policyPath, managementToken: f.managementToken, production: true };
  assert.throws(() => createGateway(config), /DECKS_ORIGIN/);
  assert.throws(() => createGateway({ ...config, origin: "http://decks.example" }), /HTTPS/);
  assert.throws(() => createGateway({ ...config, origin: "https://decks.example/extra" }), /exact origin/);
});

test("expired sessions fail on the next request", async t => {
  let now = 1000000;
  const f = await fixture(t, { now: () => now });
  const { north } = await seed(f);
  const session = await f.login(north.secret);
  now += 13 * 60 * 60 * 1000;
  assert.equal((await f.request("/decks/beta/r1/", { cookie: session.cookie })).status, 401);
  const store = new PolicyStore(f.policyPath, f.libraryRoot, { now: () => now });
  assert.equal(store.session(session.cookie.split("=")[1]), null);
  store.close();
});
