import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fixture, writeRelease } from "./fixtures.mjs";
import { DECK_CSP } from "../../../skills/deck-studio/scripts/delivery_profile.mjs";

async function publish(f, id, options = {}) {
  const release = writeRelease(f.libraryRoot, id, "r1", options);
  const selected = await f.api(`decks/${id}/publish`, { release_id: "r1" });
  assert.equal(selected.status, 200, selected.text);
  return release;
}

function returnTarget(text) {
  const tag = text.match(/<iframe\b[^>]*\bdata-deck-frame[^>]*>/)?.[0];
  assert.ok(tag, "the hosted presentation carries its return context into the existing controls");
  return /\bdata-return-to="([^"]+)"/.exec(tag)?.[1];
}

test("canonical audience URLs wrap an unchanged deck and preserve the entry collection", async t => {
  const f = await fixture(t);
  const release = await publish(f, "viewer", { title: 'A <b>deck</b> & "direction"' });
  assert.equal((await f.api("decks/viewer/public", { public: true })).status, 200);
  const key = (await f.api("keys", { label: "Readers", scope: "collection" })).json.data;
  await f.api("decks/viewer/grant", { key_id: key.key_id });
  const session = await f.login(key.secret);
  assert.equal(session.status, 303);

  const viewer = await f.request("/decks/viewer/r1/");
  assert.equal(viewer.status, 200);
  assert.doesNotMatch(viewer.text, /<header\b|viewer-bar|data-viewer-reveal|data-viewer-fullscreen|gallery-client|gallery\.css|data-viewer-return/);
  assert.match(viewer.text, /href="\/ui\/viewer\.css"/);
  assert.match(viewer.text, /src="\/ui\/viewer-client\.mjs"/);
  assert.match(viewer.text, /<iframe\b[^>]*\bdata-deck-frame/);
  assert.match(viewer.text, /\bdata-deck-src="\/decks\/viewer\/r1\/deck\.html"/);
  assert.match(viewer.text, /<title>A &lt;b&gt;deck&lt;\/b&gt; &amp; &quot;direction&quot; · Decks<\/title>/);
  assert.match(viewer.text, /\btitle="A &lt;b&gt;deck&lt;\/b&gt; &amp; &quot;direction&quot;"/);
  assert.doesNotMatch(viewer.text, /A <b>deck<\/b>/);
  assert.equal(returnTarget(viewer.text), "/");
  assert.match(viewer.text, /data-return-label="Back to public decks \(B\)"/);
  assert.equal(viewer.headers.get("cache-control"), "no-store");
  const directives = new Map(viewer.headers.get("content-security-policy").split(";").map(value => {
    const [name, ...sources] = value.trim().split(/\s+/);
    return [name, sources.join(" ")];
  }));
  assert.equal(directives.get("frame-src") ?? directives.get("child-src") ?? directives.get("default-src"), "'self'",
    "the wrapper may frame same-origin presentation resources only");
  assert.doesNotMatch(viewer.headers.get("content-security-policy"), /unsafe-inline|unsafe-eval/);

  const keyed = await f.request("/decks/viewer/r1/", { cookie: session.cookie });
  assert.equal(returnTarget(keyed.text), "/collection");
  assert.match(keyed.text, /data-return-label="Back to collection \(B\)"/);
  for (const [query, expected] of [["/", "/"], ["/collection", "/collection"]]) {
    const response = await f.request(`/decks/viewer/r1/?return_to=${encodeURIComponent(query)}`, { cookie: session.cookie });
    assert.equal(response.status, 200);
    assert.equal(returnTarget(response.text), expected);
  }
  for (const query of ["https://evil.invalid/", "//evil.invalid/", "/collection?other=1", "/collection#other", "/decks/viewer/r1/", "/collection/", "\\evil.invalid", " /", "/%2fexample.invalid"]) {
    const response = await f.request(`/decks/viewer/r1/?return_to=${encodeURIComponent(query)}`, { cookie: session.cookie });
    assert.equal(response.status, 200, query);
    assert.equal(returnTarget(response.text), "/collection", query);
    assert.ok(!response.text.includes("evil.invalid"), "untrusted return destinations must not be emitted");
  }

  const publicGallery = await f.request("/", { cookie: session.cookie });
  assert.match(publicGallery.text, /href="\/decks\/viewer\/r1\/\?return_to=(?:%2F|\/)"/);
  const collection = await f.request("/collection", { cookie: session.cookie });
  assert.match(collection.text, /href="\/decks\/viewer\/r1\/"/);
  assert.doesNotMatch(collection.text, /\/decks\/viewer\/r1\/\?return_to=/);

  const acceptedHtml = readFileSync(join(release.directory, "deck.html"), "utf8");
  const raw = await f.request("/decks/viewer/r1/deck.html");
  assert.equal(raw.status, 200);
  assert.equal(raw.text, acceptedHtml, "the viewer must not inject controls into immutable artifact bytes");
  assert.equal(raw.headers.get("content-security-policy"), DECK_CSP);
  assert.doesNotMatch(raw.text, /data-viewer-return|viewer-bar|data-deck-frame/);
  const backstage = await f.request("/decks/viewer/r1/", { headers: { authorization: `Bearer ${f.managementToken}` } });
  assert.equal(backstage.text, acceptedHtml, "management keeps its exact raw artifact path");
  const head = await f.request("/decks/viewer/r1/", { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.equal(head.text, "");
});

test("viewer, frame and dependencies share live audience policy without exposing hidden releases", async t => {
  const f = await fixture(t);
  await publish(f, "private");
  writeRelease(f.libraryRoot, "private", "hidden");
  const allowed = (await f.api("keys", { label: "Allowed", scope: "collection" })).json.data;
  const other = (await f.api("keys", { label: "Other", scope: "collection" })).json.data;
  await f.api("decks/private/grant", { key_id: allowed.key_id });
  const member = await f.login(allowed.secret);
  const outsider = await f.login(other.secret);
  const paths = ["", "deck.html", "assets/deck.js", "assets/deck.css"];
  for (const leaf of paths) {
    const path = `/decks/private/r1/${leaf}`;
    assert.equal((await f.request(path)).status, 401, path);
    const denied = await f.request(path, { cookie: outsider.cookie });
    assert.equal(denied.status, 403, path);
    assert.doesNotMatch(denied.text, /Title-private|data-return-label/);
    assert.equal((await f.request(path, { cookie: member.cookie })).status, 200, path);
    assert.equal((await f.request(`/decks/private/hidden/${leaf}`, { cookie: member.cookie })).status, 404, leaf);
  }
  for (const leaf of ["deck-manifest.json", "proof/report.json", "proof/visual-review.json"]) {
    assert.equal((await f.request(`/decks/private/r1/${leaf}`, { cookie: member.cookie })).status, 404, leaf);
  }
  await f.api("decks/private/revoke", { key_id: allowed.key_id });
  for (const leaf of paths) assert.equal((await f.request(`/decks/private/r1/${leaf}`, { cookie: member.cookie })).status, 403, leaf);
  await f.api("decks/private/grant", { key_id: allowed.key_id });
  await f.api(`keys/${allowed.key_id}/revoke`, {});
  for (const leaf of paths) assert.equal((await f.request(`/decks/private/r1/${leaf}`, { cookie: member.cookie })).status, 401, leaf);
});

test("same-size HTML tampering fails before a hosted viewer or its title is emitted", async t => {
  const f = await fixture(t);
  const release = await publish(f, "integrity", { title: "DO-NOT-LEAK-AFTER-TAMPER" });
  await f.api("decks/integrity/public", { public: true });
  assert.equal((await f.request("/decks/integrity/r1/")).status, 200);
  const path = join(release.directory, "deck.html");
  const original = readFileSync(path);
  const changed = Buffer.from(original);
  const offset = changed.indexOf(Buffer.from("DO-NOT-LEAK-AFTER-TAMPER"));
  assert.ok(offset >= 0);
  changed[offset] = "X".charCodeAt(0);
  assert.equal(changed.length, original.length);
  writeFileSync(path, changed);
  for (const leaf of ["", "deck.html"]) {
    const denied = await f.request(`/decks/integrity/r1/${leaf}`);
    assert.equal(denied.status, 503, leaf);
    assert.doesNotMatch(denied.text, /DO-NOT-LEAK-AFTER-TAMPER|data-deck-frame|data-return-label|viewer-bar/);
  }
});
