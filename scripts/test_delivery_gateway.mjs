// Actual producer/browser join. Reviews remain explicitly synthetic: these
// assertions qualify delivery and admission, not communication or visual taste.
// Run with DECKS_TEST_SKILL_ROOT pointing at the complete prepared producer.
import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { fixture, writeRelease, fileIdentity } from "../publisher/static-server/test/fixtures.mjs";
import { PolicyStore } from "../publisher/static-server/src/policy.mjs";
import { DECK_CSP, LIBRARY_DELIVERY } from "../skills/deck-studio/scripts/delivery_profile.mjs";

if (!process.env.DECKS_TEST_SKILL_ROOT) throw new Error("Set DECKS_TEST_SKILL_ROOT to a complete prepared Deck Studio package");
const producer = resolve(process.env.DECKS_TEST_SKILL_ROOT);
const { chromium } = await import(pathToFileURL(join(producer, "scripts/browser_runtime.mjs")));
const { observeErrors, prepareDeck, captureSlide } = await import(pathToFileURL(join(producer, "scripts/capture_runtime.mjs")));
const { LIBRARY_DELIVERY: producerProfile } = await import(pathToFileURL(join(producer, "scripts/delivery_profile.mjs")));
assert.deepEqual(producerProfile, LIBRARY_DELIVERY, "prepared producer and gateway must load the same delivery owner");
const execute = promisify(execFile);
const admission = fileURLToPath(new URL("../skills/deck-studio/scripts/release_admission.py", import.meta.url));

async function assertValidLocalRelease(release) {
  const result = await execute("python3", ["-B", "-E", "-s", admission, release.directory, "--target", "local"]);
  assert.equal(JSON.parse(result.stdout).ok, true, "negative library case must otherwise pass complete admission");
}

async function refreshManifest(release) {
  const artifacts = [];
  async function visit(directory, prefix = "") {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = prefix + entry.name;
      if (entry.isDirectory()) await visit(join(directory, entry.name), `${path}/`);
      else if (path !== "deck-manifest.json") artifacts.push(fileIdentity(path, await readFile(join(directory, entry.name))));
    }
  }
  await visit(release.directory);
  release.manifest.artifacts = artifacts.sort((a, b) => a.path.localeCompare(b.path));
  await writeFile(join(release.directory, "deck-manifest.json"), JSON.stringify(release.manifest));
}

async function bindSyntheticReview(release) {
  const reviewPath = join(release.directory, "proof/visual-review.json");
  const review = JSON.parse(await readFile(reviewPath));
  review.render_report_sha256 = fileIdentity("proof/report.json", await readFile(join(release.directory, "proof/report.json"))).sha256;
  review.inspected_viewports = ["desktop", "phone"];
  // writeRelease already labels this record as synthetic, including every
  // substantive judgment. Real rendering does not turn it into a real review.
  assert.equal(review.synthetic, true);
  await writeFile(reviewPath, JSON.stringify(review));
  await refreshManifest(release);
}

async function actualRelease(f, deckId, { delivery = "library", fetchData = false } = {}) {
  const release = writeRelease(f.libraryRoot, deckId);
  const dataScript = fetchData
    ? 'fetch("./chart.json?private=never-echo-query").then(r=>r.json()).then(data=>document.querySelector("#result").textContent=String(data.value)).catch(()=>document.querySelector("#result").textContent="BLOCKED")'
    : 'document.querySelector("#inline").textContent=String(7)';
  await writeFile(join(release.directory, "deck.html"), `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Delivery contract fixture</title><link rel="icon" href="data:,"><link rel="stylesheet" href="assets/deck.css"><style>.slide{background:#17293e;color:#fff;padding:140px;font:48px system-ui}h1{font-size:96px}p{font-size:48px}a,button{font-size:32px;color:inherit}button{background:transparent}</style></head><body data-web-slides-studio><div class="deck-viewport"><main class="deck-stage"><section class="slide"><h1>Bound delivery</h1><p>Value: <span id="result">PENDING</span></p><p>Inline: <span id="inline">7</span></p><button type="button" onclick="this.textContent='Details shown'">Show details</button></section><section class="slide"><h1>Relative resources</h1><p>The same bytes at a nested audience path.</p><a href="#slide-3">Open conclusion</a></section><section class="slide"><h1>Conclusion</h1><p>Delivery mechanics, not a visual-quality verdict.</p></section></main></div><script src="assets/deck.js"></script>${fetchData ? "" : '<script type="module" src="assets/chart.mjs"></script>'}<script>${dataScript}</script></body></html>`);
  if (fetchData) await writeFile(join(release.directory, "chart.json"), '{"value":42}');
  else {
    await writeFile(join(release.directory, "assets/chart.mjs"), 'import {value} from "./data.mjs";document.querySelector("#result").textContent=String(value)');
    await writeFile(join(release.directory, "assets/data.mjs"), 'export const value=42;');
  }
  const proof = join(release.directory, "proof");
  for (const args of [
    [join(producer, "scripts/render_qa.mjs"), join(release.directory, "deck.html"), "--out", proof, "--delivery", delivery],
    [join(producer, "scripts/export_pdf.mjs"), join(release.directory, "deck.html"), join(release.directory, "deck.pdf"), "--proof", join(proof, "pdf-report.json"), "--delivery", delivery],
  ]) {
    try { await execute(process.execPath, args, { maxBuffer: 1024 * 1024 }); }
    catch (error) { throw new Error(`Actual ${delivery} producer failed: ${error.stdout ?? ""}`, { cause: error }); }
  }
  const report = JSON.parse(await readFile(join(proof, "report.json")));
  assert.equal(report.ok, true);
  assert.deepEqual(report.delivery_profile, delivery === "library" ? LIBRARY_DELIVERY : undefined);
  await writeFile(join(release.directory, "cover.png"), await readFile(join(proof, "screenshots/desktop-slide-01.png")));
  await bindSyntheticReview(release);
  return release;
}

test("actual library capture and audience gateway agree; selection rejects local proof without losing policy", async t => {
  const f = await fixture(t);
  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());

  const good = await actualRelease(f, "relative");
  const selected = await f.api("decks/relative/publish", { release_id: "r1" });
  assert.equal(selected.status, 200, selected.text);
  assert.equal(selected.json.data.is_public, false);
  assert.equal((await f.request("/decks/relative/r1/")).status, 401, "selection alone grants no anonymous audience");
  assert.equal((await f.api("decks/relative/public", { public: true })).status, 200);
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const authorizations = [];
  page.on("request", request => { if (request.headers().authorization) authorizations.push(request.url()); });
  const check = observeErrors(page);
  await prepareDeck(page, `${f.base}/decks/relative/r1/deck.html`, check);
  assert.equal(await page.locator("#result").textContent(), "42");
  assert.equal(await page.locator("#inline").textContent(), "7");
  assert.ok((await captureSlide(page, 0, "qa", check)).length > 0);
  await page.getByRole("button", { name: "Show details" }).click();
  assert.equal(await page.getByRole("button", { name: "Details shown" }).count(), 1);
  await page.locator(".deck-stage").focus();
  await page.keyboard.press("ArrowRight");
  await page.waitForFunction(() => WebSlidesStudio.current() === 1);
  await page.getByRole("link", { name: "Open conclusion" }).click();
  await page.waitForFunction(() => WebSlidesStudio.current() === 2);
  await captureSlide(page, 2, "qa", check);
  assert.deepEqual(authorizations, [], "browser must use the audience path, never the management bypass");
  await page.close();

  const html = await f.request("/decks/relative/r1/deck.html");
  assert.equal(html.headers.get("content-security-policy"), DECK_CSP);
  for (const path of ["assets/chart.mjs", "assets/data.mjs", "assets/deck.css", "deck.pdf"]) {
    const response = await f.request(`/decks/relative/r1/${path}`);
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get("content-security-policy"), DECK_CSP);
  }
  for (const path of ["/assets/chart.mjs", "/decks/relative/r1/proof/report.json", "/decks/relative/r1/deck-manifest.json", "/decks/relative/r1/unknown.bin", "/decks/other/r1/assets/chart.mjs"]) {
    assert.equal((await f.request(path)).status, 404, path);
  }
  // /ui/ is intentionally a fixed site-resource namespace, not an arbitrary
  // bundle path. The test must not infer a generic ban on every root URL.
  const before = (await f.api("decks")).json.data;
  const local = await actualRelease(f, "localfetch", { delivery: "local", fetchData: true });
  await assertValidLocalRelease(local);
  const rejected = await f.api("decks/localfetch/publish", { release_id: "r1" });
  assert.equal(rejected.status, 409, rejected.text);
  assert.equal(rejected.json.error.code, "release_not_admitted");
  assert.deepEqual((await f.api("decks")).json.data, before);

  // Both capture and the live serving path must reject the same caught fetch.
  const failedProof = join(f.directory, "failed-library-capture");
  await assert.rejects(execute(process.execPath, [join(producer, "scripts/render_qa.mjs"), join(local.directory, "deck.html"), "--out", failedProof, "--delivery", "library"]));
  const failed = JSON.parse(await readFile(join(failedProof, "report.json")));
  assert.equal(failed.ok, false);
  assert.ok(failed.errors.some(error => error.includes("csp_connect-src")));
  assert.ok(!JSON.stringify(failed.errors).includes("never-echo-query"));

  const wrong = writeRelease(f.libraryRoot, "wrongprofile");
  for (const name of ["report.json", "pdf-report.json"]) {
    const path = join(wrong.directory, "proof", name);
    const report = JSON.parse(await readFile(path));
    report.delivery_profile = { id: "local", sha256: "0".repeat(64) };
    await writeFile(path, JSON.stringify(report));
  }
  // Keep all hashes coherent: refusal must be about the claimed destination,
  // not an accidentally stale receipt or artifact checksum.
  const reviewPath = join(wrong.directory, "proof/visual-review.json");
  const review = JSON.parse(await readFile(reviewPath));
  review.render_report_sha256 = fileIdentity("proof/report.json", await readFile(join(wrong.directory, "proof/report.json"))).sha256;
  await writeFile(reviewPath, JSON.stringify(review));
  await refreshManifest(wrong);
  await assertValidLocalRelease(wrong);
  const wrongRejected = await f.api("decks/wrongprofile/publish", { release_id: "r1" });
  assert.equal(wrongRejected.status, 409, wrongRejected.text);
  assert.deepEqual((await f.api("decks")).json.data, before);

  // Isolated pre-existing selection ONLY: current admission correctly refused
  // this release above. Seeding old policy tests serving CSP independently; it
  // is neither an admission bypass in the product nor valid new publication.
  await f.stop();
  const legacyPolicy = new PolicyStore(f.policyPath, f.libraryRoot);
  try { legacyPolicy.transaction(() => { legacyPolicy.publish("localfetch", "r1"); legacyPolicy.setPublic("localfetch", true); }); }
  finally { legacyPolicy.close(); }
  await f.start();
  const negative = await browser.newPage();
  const negativeAuth = [];
  negative.on("request", request => { if (request.headers().authorization) negativeAuth.push(request.url()); });
  const negativeCheck = observeErrors(negative);
  await assert.rejects(async () => {
    await prepareDeck(negative, `${f.base}/decks/localfetch/r1/deck.html`, negativeCheck);
    await captureSlide(negative, 0, "qa", negativeCheck);
  });
  await negative.waitForFunction(() => document.querySelector("#result")?.textContent === "BLOCKED");
  assert.throws(negativeCheck, /csp_connect-src/);
  assert.deepEqual(negativeAuth, []);
  assert.equal((await f.request("/decks/localfetch/r1/chart.json")).status, 404, "JSON MIME is independently not audience-readable");
  await negative.close();

  assert.equal((await f.api("decks/relative/public", { public: false })).status, 200);
  assert.equal((await f.request("/decks/relative/r1/assets/chart.mjs")).status, 401, "fresh policy also governs dependent resources");
  assert.equal((await f.api("decks/relative/public", { public: true })).status, 200);
  assert.equal((await f.request("/decks/relative/r1/")).status, 200);
  assert.ok(good.manifest.artifacts.some(row => row.path === "assets/data.mjs"));
});
