import { createHash, randomBytes } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { once } from "node:events";
import { createGateway } from "../src/server.mjs";
import { initializePolicy } from "../src/policy.mjs";
import { LIBRARY_DELIVERY } from "../../../skills/deck-studio/scripts/delivery_profile.mjs";

const runtime = new URL("../../../skills/deck-studio/runtime/", import.meta.url);
const syntheticPng = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLbtAAAAABJRU5ErkJggg==", "base64");
const syntheticReview = "Synthetic contract fixture; no real visual acceptance is claimed.";

export function fileIdentity(path, value) {
  const bytes = Buffer.from(value);
  return { path, bytes: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex") };
}

export function rewriteArtifact(release, path, value) {
  writeFileSync(join(release.directory, path), value);
  const row = fileIdentity(path, value);
  const index = release.manifest.artifacts.findIndex(artifact => artifact.path === path);
  if (index < 0) release.manifest.artifacts.push(row);
  else release.manifest.artifacts[index] = row;
  writeFileSync(join(release.directory, "deck-manifest.json"), JSON.stringify(release.manifest));
}

export function writeRelease(root, deckId, releaseId = "r1", { schema = 3, title = `Title-${deckId}` } = {}) {
  const directory = join(root, "decks", deckId, releaseId);
  mkdirSync(join(directory, "assets"), { recursive: true });
  mkdirSync(join(directory, "proof", "screenshots"), { recursive: true });
  // These deliberately synthetic receipts exercise binding and admission, not
  // actual browser execution, PDF fidelity, or a visual-quality judgment.
  const files = {
    "deck.html": `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><link rel="stylesheet" href="assets/deck.css"></head><body data-web-slides-studio><div class="deck-viewport"><main class="deck-stage"><section class="slide active"><h1>${title}</h1></section><section class="slide"><h2>Contract fixture</h2></section><section class="slide"><h2>Synthetic acceptance only</h2></section></main></div><script src="assets/deck.js"></script></body></html>`,
    "deck.pdf": `%PDF-1.4\nSynthetic ${deckId}/${releaseId}\n%%EOF`,
    "cover.svg": `<svg xmlns="http://www.w3.org/2000/svg"><title>${title}</title></svg>`,
    "cover.png": syntheticPng,
    "assets/deck.css": readFileSync(new URL("deck-stage.css", runtime)),
    "assets/deck.js": readFileSync(new URL("deck-stage.js", runtime)),
    "assets/font.woff2": "synthetic-font",
  };
  const source = { files: ["deck.html", "assets/deck.css", "assets/deck.js"].map(path => fileIdentity(path, files[path])), external_resources: [] };
  const slides = Array.from({ length: 3 }, (_, index) => {
    const screenshot = `screenshots/desktop-slide-${String(index + 1).padStart(2, "0")}.png`;
    files[`proof/${screenshot}`] = syntheticPng;
    return { index: index + 1, ok: true, screenshot };
  });
  files["proof/report.json"] = JSON.stringify({ schema_version: 3, synthetic: true, ok: true, errors: [], source,
    delivery_profile: LIBRARY_DELIVERY, proof_files: slides.map(slide => fileIdentity(slide.screenshot, syntheticPng)),
    viewports: [{ name: "desktop", slideCount: 3, slides }] });
  files["proof/pdf-report.json"] = JSON.stringify({ schema_version: 2, synthetic: true, ok: true, errors: [], source,
    delivery_profile: LIBRARY_DELIVERY, slideCount: 3, pageCount: 3, pdf: "deck.pdf", artifact: fileIdentity("deck.pdf", files["deck.pdf"]) });
  const review = { schema_version: 2, synthetic: true, render_report_sha256: fileIdentity("proof/report.json", files["proof/report.json"]).sha256,
    artifact: "deck.html", status: "pass", inspected_by: "agent", slides_inspected: "all", inspected_viewports: ["desktop"],
    evidence: ["proof/screenshots/desktop-slide-01.png"], failures: [], warnings: [syntheticReview] };
  for (const field of ["content_fidelity", "render_mechanics", "de_visu_inspection", "taste_judgment", "metadata_leak"]) review[field] = "pass";
  for (const field of ["visual_thesis", "template_fit", "density_fit", "weakness", "residual_risk"]) review[field] = syntheticReview;
  files["proof/visual-review.json"] = JSON.stringify(review);
  const artifacts = Object.entries(files).map(([path, value]) => {
    writeFileSync(join(directory, path), value);
    return fileIdentity(path, value);
  });
  const audience = "Backstage-only audience";
  const desiredAction = "Backstage-only action";
  const manifest = { schema_version: schema, deck_id: deckId, release_id: releaseId, title, slide_count: 3, visibility: "unassigned", artifacts,
    proof: { validate_deck: "pass", rendered_qa: "pass", path_leak_scan: "pass", visual_acceptance: "pass", content_fidelity: "pass", pdf_export: "pass" },
    audience, desired_action: desiredAction, source: { generator: "deck-studio", decks_commit: "0".repeat(40),
      brief_sha256: createHash("sha256").update(`${title}\n${audience}\n${desiredAction}\n`).digest("hex"), private_lineage: "do-not-show-viewers" } };
  writeFileSync(join(directory, "deck-manifest.json"), JSON.stringify(manifest));
  return { directory, manifest };
}

export async function fixture(t, options = {}) {
  const directory = mkdtempSync(join(tmpdir(), "decks-gateway-test-"));
  const libraryRoot = join(directory, "library");
  const policyPath = join(directory, "state", "policy.sqlite");
  mkdirSync(libraryRoot);
  const managementToken = randomBytes(32).toString("base64url");
  initializePolicy(policyPath, libraryRoot);
  let server;
  let base;
  async function start(overrides = {}) {
    server = createGateway({ libraryRoot, policyPath, managementToken, ...options, ...overrides });
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    base = `http://127.0.0.1:${server.address().port}`;
  }
  async function stop() {
    if (server?.listening) await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
  t.after(async () => { await stop(); rmSync(directory, { recursive: true, force: true }); });
  await start();
  async function request(path, { method = "GET", headers = {}, body, cookie } = {}) {
    const response = await fetch(`${base}${path}`, { redirect: "manual", method, headers: { ...headers, ...(cookie ? { cookie } : {}) }, body });
    return { status: response.status, headers: response.headers, text: await response.text() };
  }
  async function api(path, input, token = managementToken) {
    const result = await request(`/api/v1/${path}`, { method: input === undefined ? "GET" : "POST",
      headers: { authorization: `Bearer ${token}`, ...(input === undefined ? {} : { "content-type": "application/json" }) },
      ...(input === undefined ? {} : { body: JSON.stringify(input) }) });
    return { ...result, json: JSON.parse(result.text) };
  }
  function csrf(text) { return /name="csrf" value="([^"]+)"/.exec(text)?.[1]; }
  async function login(key, { cookie: oldCookie, returnTo = "/collection" } = {}) {
    const form = await request(`/login?return_to=${encodeURIComponent(returnTo)}`, { cookie: oldCookie });
    const preauth = form.headers.get("set-cookie")?.split(";", 1)[0] ?? oldCookie;
    const result = await request("/login", { method: "POST", cookie: preauth, headers: { origin: base, "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ key, csrf: csrf(form.text), return_to: returnTo }).toString() });
    return { ...result, cookie: result.headers.get("set-cookie")?.split(";", 1)[0], preauth };
  }
  return { directory, libraryRoot, policyPath, managementToken, start, stop, request, api, csrf, login,
    get base() { return base; }, get server() { return server; } };
}
