import test from "node:test";
import assert from "node:assert/strict";
import { fixture, writeRelease } from "./fixtures.mjs";

test("keyed collection headings and document titles use only the authenticated key label", async t => {
  const f = await fixture(t, { site: { title: "Library & Co" } });
  const north = (await f.api("keys", { label: 'North <Research> & "Planning"', scope: "collection" })).json.data;
  const south = (await f.api("keys", { label: "South's collection.", scope: "collection" })).json.data;
  const owner = (await f.api("keys", { label: "Library owner", scope: "all" })).json.data;
  for (const [key, escaped] of [[north, "North &lt;Research&gt; &amp; &quot;Planning&quot;"],
    [south, "South&#39;s collection."], [owner, "Library owner"]]) {
    const login = await f.login(key.secret);
    assert.equal(login.status, 303);
    assert.equal(login.headers.get("location"), "/collection");
    const response = await f.request("/collection?label=Untrusted%20name&collection=Injected", { cookie: login.cookie });
    assert.equal(response.status, 200);
    assert.ok(response.text.includes(`<h1 id="gallery-title">${escaped}</h1>`));
    assert.ok(response.text.includes(`<title>${escaped} · Library &amp; Co</title>`));
    assert.doesNotMatch(response.text, /Untrusted name|Injected|<Research>/);
    assert.match(response.text, /No decks in this collection\./);
    assert.ok(!response.text.includes(key.secret));
    const publicPage = await f.request("/", { cookie: login.cookie });
    assert.match(publicPage.text, /<h1 id="gallery-title">Public decks\.<\/h1>/);
    assert.match(publicPage.text, /<title>Public decks · Library &amp; Co<\/title>/);
    assert.ok(!publicPage.text.includes(escaped), "private collection labels do not name the public gallery");
  }
  const denied = await f.request("/collection?label=North");
  assert.equal(denied.status, 401);
  assert.doesNotMatch(denied.text, /North|Research|South|Library owner/);
});

test("named single-deck collections retain automatic login routing and remain reachable as a collection", async t => {
  const f = await fixture(t);
  writeRelease(f.libraryRoot, "single");
  assert.equal((await f.api("decks/single/publish", { release_id: "r1" })).status, 200);
  const key = (await f.api("keys", { label: "One-deck review", scope: "collection" })).json.data;
  assert.equal((await f.api("decks/single/grant", { key_id: key.key_id })).status, 200);
  const automatic = await f.login(key.secret, { returnTo: "" });
  assert.equal(automatic.status, 303);
  assert.equal(automatic.headers.get("location"), "/decks/single/r1/");
  const explicit = await f.login(key.secret, { returnTo: "/collection" });
  assert.equal(explicit.headers.get("location"), "/collection");
  const collection = await f.request("/collection", { cookie: automatic.cookie });
  assert.equal(collection.status, 200);
  assert.match(collection.text, /<h1 id="gallery-title">One-deck review<\/h1>/);
  assert.match(collection.text, /<title>One-deck review · Decks<\/title>/);
  assert.match(collection.text, /href="\/decks\/single\/r1\/"/);
});
