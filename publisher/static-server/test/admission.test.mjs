import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, existsSync, mkdirSync, readFileSync, realpathSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { LIBRARY_DELIVERY } from "../../../skills/deck-studio/scripts/delivery_profile.mjs";
import { PolicyStore } from "../src/policy.mjs";
import { fileIdentity, fixture, rewriteArtifact, writeRelease } from "./fixtures.mjs";

const admission = fileURLToPath(new URL("../../../skills/deck-studio/scripts/release_admission.py", import.meta.url));
const python = process.env.DECKS_TEST_PYTHON ?? "python3";
const readJson = (release, path) => JSON.parse(readFileSync(join(release.directory, path), "utf8"));
const writeJson = (release, path, value) => rewriteArtifact(release, path, JSON.stringify(value));
function saveManifest(release) {
  writeFileSync(join(release.directory, "deck-manifest.json"), JSON.stringify(release.manifest));
}
function removeArtifact(release, path) {
  unlinkSync(join(release.directory, path));
  release.manifest.artifacts = release.manifest.artifacts.filter(row => row.path !== path);
  saveManifest(release);
}
function changeReport(release, change) {
  const report = readJson(release, "proof/report.json");
  change(report);
  writeJson(release, "proof/report.json", report);
  const review = readJson(release, "proof/visual-review.json");
  review.render_report_sha256 = fileIdentity("proof/report.json", readFileSync(join(release.directory, "proof/report.json"))).sha256;
  writeJson(release, "proof/visual-review.json", review);
}

async function selectedFixture(t, { native = true } = {}) {
  const f = await fixture(t);
  writeRelease(f.libraryRoot, "sample", "r1");
  assert.equal((await f.api("decks/sample/publish", { release_id: "r1" })).status, 200);
  assert.equal((await f.api("decks/sample/public", { public: true })).status, 200);
  const key = (await f.api("keys", { label: "Retained collection", scope: "collection" })).json.data;
  assert.equal((await f.api("decks/sample/grant", { key_id: key.key_id })).status, 200);
  const session = await f.login(key.secret);
  assert.equal(session.status, 303);
  const before = (await f.api("decks/sample/access")).json.data;
  return { ...f, before, session, next: writeRelease(f.libraryRoot, "sample", "r2", { native }) };
}

async function unchanged(f) {
  assert.deepEqual((await f.api("decks/sample/access")).json.data, f.before);
  assert.equal((await f.request("/decks/sample/r1/")).status, 200);
  assert.equal((await f.request("/decks/sample/r1/", { cookie: f.session.cookie })).status, 200);
  assert.equal((await f.request("/decks/sample/r2/")).status, 404);
}

function executable(f, body) {
  const path = join(f.directory, "admission-python.cjs");
  writeFileSync(path, `#!${process.execPath}\n${body}\n`, { mode: 0o700 });
  return path;
}

const invokeRealAdmission = `
const { spawnSync } = require("node:child_process");
const checked = spawnSync(${JSON.stringify(python)}, process.argv.slice(2), { encoding: "utf8", env: process.env });
if (checked.status !== 0) { process.stdout.write(checked.stdout ?? ""); process.exit(checked.status ?? 1); }
`;

test("gateway fixture independently passes the standalone canonical admission CLI", async t => {
  const f = await fixture(t);
  const release = writeRelease(f.libraryRoot, "fixture");
  const result = spawnSync(python, ["-B", "-E", "-s", admission, release.directory, "--target", "library", "--deck-id", "fixture", "--release-id", "r1"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  const admitted = JSON.parse(result.stdout);
  assert.equal(admitted.ok, true);
  assert.equal(admitted.manifest_sha256, fileIdentity("deck-manifest.json", readFileSync(join(release.directory, "deck-manifest.json"))).sha256);
  assert.deepEqual(admitted.delivery_profile, LIBRARY_DELIVERY);
  assert.equal(readJson(release, "proof/visual-review.json").synthetic, true);
});

test("current-profile HTML/PDF history stays readable but cannot be newly selected", async t => {
  const f = await fixture(t);
  const release = writeRelease(f.libraryRoot, "historical", "r1", { native: false });
  const check = spawnSync(python, ["-B", "-E", "-s", admission, release.directory, "--target", "library"], { encoding: "utf8" });
  assert.equal(check.status, 1, check.stdout + check.stderr);
  assert.equal(JSON.parse(check.stdout).code, "missing_deliverable");
  assert.equal((await f.api("decks/historical/publish", { release_id: "r1" })).status, 409);
  assert.deepEqual((await f.api("decks")).json.data.decks, []);
  await f.stop();
  // Persisted prior selection is historical state, not new-publication authority.
  const policy = new PolicyStore(f.policyPath, f.libraryRoot);
  try {
    policy.transaction(() => {
      policy.publish("historical", "r1");
      policy.setPublic("historical", true);
    });
  } finally { policy.close(); }
  await f.start();
  assert.equal((await f.request("/decks/historical/r1/")).status, 200);
  assert.equal((await f.request("/decks/historical/r1/deck.pdf")).status, 200);
  assert.equal((await f.request("/decks/historical/r1/deck.pptx")).status, 404);
  const before = (await f.api("decks/historical/access")).json.data;
  assert.equal((await f.api("decks/historical/publish", { release_id: "r1" })).status, 409);
  assert.deepEqual((await f.api("decks/historical/access")).json.data, before);
  assert.equal((await f.request("/decks/historical/r1/")).status, 200);
});

test("persisted pre-PPTX selection serves after restart but old-profile publication and reselection fail", async t => {
  const f = await fixture(t);
  // Actual delivery_profile.mjs bytes at the pre-PPTX owner commit
  // 0837b4a24faf68f515ddb1dfdf9a9146bace7665, not an arbitrary stale digest.
  // Pin the historical identity so this test does not need Git at runtime.
  const previousProfile = { id: "decks-library", sha256: "9411c22b12ab20ca6e102b5797845b59bf437d0dce1396021015852945414e02" };
  assert.notDeepEqual(previousProfile, LIBRARY_DELIVERY);
  const releases = [writeRelease(f.libraryRoot, "sample", "r1", { native: false }), writeRelease(f.libraryRoot, "sample", "r2", { native: false })];
  for (const release of releases) {
    assert.equal(release.manifest.schema_version, 3);
    assert.equal(release.manifest.pptx, undefined);
    assert.ok(!release.manifest.artifacts.some(row => row.path.endsWith(".pptx")));
    changeReport(release, report => { report.delivery_profile = previousProfile; });
    const pdfReport = readJson(release, "proof/pdf-report.json");
    pdfReport.delivery_profile = previousProfile;
    writeJson(release, "proof/pdf-report.json", pdfReport);

    // Rebound report, review and manifest hashes must remain otherwise valid;
    // the new publication refusal must concern the destination profile alone.
    const local = spawnSync(python, ["-B", "-E", "-s", admission, release.directory, "--target", "local"], { encoding: "utf8" });
    assert.equal(local.status, 0, local.stdout + local.stderr);
    assert.equal(JSON.parse(local.stdout).ok, true);
    const library = spawnSync(python, ["-B", "-E", "-s", admission, release.directory, "--target", "library"], { encoding: "utf8" });
    assert.equal(library.status, 1, library.stdout + library.stderr);
    assert.equal(JSON.parse(library.stdout).code, "delivery_profile_mismatch");
  }

  await f.stop();
  // Model already-persisted prior selection, not a bypass for new publication.
  // The current gateway must reopen these real SQLite rows without re-admission.
  const previousPolicy = new PolicyStore(f.policyPath, f.libraryRoot);
  try {
    previousPolicy.transaction(() => {
      previousPolicy.publish("sample", "r1");
      previousPolicy.setPublic("sample", true);
    });
  } finally { previousPolicy.close(); }
  await f.start();
  const before = (await f.api("decks/sample/access")).json.data;
  assert.equal(before.release_id, "r1");
  assert.equal(before.is_public, true);

  async function assertSelectedStillServes() {
    assert.deepEqual((await f.api("decks/sample/access")).json.data, before);
    for (const path of ["deck.html", "deck.pdf", "assets/deck.css", "assets/deck.js"]) {
      const response = await f.request(`/decks/sample/r1/${path}`);
      assert.equal(response.status, 200, path);
      assert.equal(response.text, readFileSync(join(releases[0].directory, path), "utf8"), path);
    }
    assert.equal((await f.request("/decks/sample/r2/")).status, 404);
    const gallery = await f.request("/");
    assert.equal(gallery.status, 200);
    assert.ok(gallery.text.includes("/decks/sample/r1/deck.pdf"));
    assert.ok(!gallery.text.includes("deck.pptx"));
  }
  await assertSelectedStillServes();
  for (const releaseId of ["r1", "r2"]) {
    const rejected = await f.api("decks/sample/publish", { release_id: releaseId });
    assert.equal(rejected.status, 409, rejected.text);
    assert.equal(rejected.json.error.code, "release_not_admitted");
    await assertSelectedStillServes();
  }
});

test("direct HTTP publication checks the complete proof chain even after manifest hashes are refreshed", async t => {
  const cases = {
    "empty title": release => { release.manifest.title = " "; saveManifest(release); },
    "empty audience": release => { release.manifest.audience = " "; saveManifest(release); },
    "empty desired action": release => { release.manifest.desired_action = " "; saveManifest(release); },
    "audience access in manifest": release => { release.manifest.visibility = "public"; saveManifest(release); },
    "missing source lineage": release => { delete release.manifest.source; saveManifest(release); },
    "wrong source generator": release => { release.manifest.source.generator = "other"; saveManifest(release); },
    "abbreviated source commit": release => { release.manifest.source.decks_commit = "abc123"; saveManifest(release); },
    "unbound brief metadata": release => { release.manifest.audience = "A different audience"; saveManifest(release); },
    "missing PDF export proof": release => removeArtifact(release, "proof/pdf-report.json"),
    "failed manifest proof": release => { release.manifest.proof.pdf_export = "fail"; saveManifest(release); },
    "changed source HTML": release => rewriteArtifact(release, "deck.html", readFileSync(join(release.directory, "deck.html"), "utf8").replace("Contract fixture", "Changed contract")),
    "changed screenshot": release => {
      const bytes = readFileSync(join(release.directory, "proof/screenshots/desktop-slide-01.png"));
      bytes[bytes.length - 1] ^= 1;
      rewriteArtifact(release, "proof/screenshots/desktop-slide-01.png", bytes);
    },
    "changed PDF": release => rewriteArtifact(release, "deck.pdf", "%PDF-1.4\nA different synthetic PDF\n%%EOF"),
    "failed visual review": release => { const review = readJson(release, "proof/visual-review.json"); review.taste_judgment = "fail"; writeJson(release, "proof/visual-review.json", review); },
    "render errors with rebound review": release => changeReport(release, report => { report.errors = ["Synthetic capture failure"]; }),
    "incomplete slides with rebound review": release => changeReport(release, report => { report.viewports[0].slides.pop(); }),
    "missing render delivery profile": release => changeReport(release, report => { delete report.delivery_profile; }),
    "stale render delivery profile": release => changeReport(release, report => { report.delivery_profile.sha256 = "0".repeat(64); }),
    "stale PDF delivery profile": release => { const report = readJson(release, "proof/pdf-report.json"); report.delivery_profile.sha256 = "0".repeat(64); writeJson(release, "proof/pdf-report.json", report); },
    "missing local dependency after rebinding source lists": release => {
      removeArtifact(release, "assets/deck.css");
      changeReport(release, report => { report.source.files = report.source.files.filter(row => row.path !== "assets/deck.css"); });
      const pdf = readJson(release, "proof/pdf-report.json");
      pdf.source.files = pdf.source.files.filter(row => row.path !== "assets/deck.css");
      writeJson(release, "proof/pdf-report.json", pdf);
    },
    "malformed report JSON": release => rewriteArtifact(release, "proof/report.json", "{not-json"),
    "duplicate report JSON key": release => rewriteArtifact(release, "proof/report.json", readFileSync(join(release.directory, "proof/report.json"), "utf8").replace('"schema_version":3', '"schema_version":3,"schema_version":3')),
    "duplicate manifest artifact": release => { release.manifest.artifacts.push({ ...release.manifest.artifacts[0] }); saveManifest(release); },
    "unsafe manifest path": release => { release.manifest.artifacts.push({ path: "../outside.css", bytes: 1, sha256: "0".repeat(64) }); saveManifest(release); },
    "symlink evidence": release => {
      const path = join(release.directory, "proof/screenshots/desktop-slide-01.png");
      const target = join(release.directory, "cover.png");
      unlinkSync(path); symlinkSync(target, path);
    },
    "private supplemental review text": release => { const review = readJson(release, "proof/visual-review.json"); review.weakness = "Observed /Users/private/review"; writeJson(release, "proof/visual-review.json", review); },
    "opaque supplemental evidence": release => {
      rewriteArtifact(release, "proof/opaque.bin", "unsupported proof");
      const review = readJson(release, "proof/visual-review.json"); review.evidence.push("proof/opaque.bin"); writeJson(release, "proof/visual-review.json", review);
    },
  };
  for (const [name, mutate] of Object.entries(cases)) await t.test(name, async t => {
    const f = await selectedFixture(t);
    mutate(f.next);
    const rejected = await f.api("decks/sample/publish", { release_id: "r2" });
    assert.equal(rejected.status, 409, rejected.text);
    assert.equal(rejected.json.ok, false);
    await unchanged(f);
  });
});

test("native publication checks its independent proof chain before changing selection", async t => {
  function changeNativeReport(release, change, { rebind = true } = {}) {
    const report = readJson(release, "proof/pptx-report.json");
    change(report);
    writeJson(release, "proof/pptx-report.json", report);
    if (rebind) {
      const review = readJson(release, "proof/pptx-visual-review.json");
      review.report = fileIdentity("proof/pptx-report.json", readFileSync(join(release.directory, "proof/pptx-report.json")));
      writeJson(release, "proof/pptx-visual-review.json", review);
    }
  }
  const cases = {
    "missing native artifact": release => removeArtifact(release, "deck.pptx"),
    "missing render report": release => removeArtifact(release, "proof/pptx-report.json"),
    "missing native review": release => removeArtifact(release, "proof/pptx-visual-review.json"),
    "missing bound frame": release => removeArtifact(release, "proof/pptx/slide-01.png"),
    "changed native bytes": release => rewriteArtifact(release, "deck.pptx", Buffer.concat([readFileSync(join(release.directory, "deck.pptx")), Buffer.from("changed")])),
    "changed native frame": release => rewriteArtifact(release, "proof/pptx/slide-01.png", Buffer.from("changed")),
    "stale review binding": release => changeNativeReport(release, report => { report.notes = "Synthetic revision"; }, { rebind: false }),
    "failed renderer": release => changeNativeReport(release, report => { report.ok = false; }),
    "forged native structure": release => changeNativeReport(release, report => { report.native.totals.tables += 1; }),
    "missing rendered slide": release => changeNativeReport(release, report => { report.slides.pop(); }),
    "wrong frame dimensions": release => changeNativeReport(release, report => { report.slides[0].width += 1; }),
    "wrong inspected slides": release => {
      const review = readJson(release, "proof/pptx-visual-review.json"); review.reviewedSlides = [1, 2]; writeJson(release, "proof/pptx-visual-review.json", review);
    },
    "rejected native review": release => {
      const review = readJson(release, "proof/pptx-visual-review.json"); review.verdict = "rejected"; writeJson(release, "proof/pptx-visual-review.json", review);
    },
    "undeclared native companion": release => { delete release.manifest.pptx; saveManifest(release); },
    "wrong native declaration": release => { release.manifest.pptx.report = "proof/report.json"; saveManifest(release); },
    "arbitrary PPTX asset": release => rewriteArtifact(release, "assets/hidden.pptx", "not an accepted companion"),
  };
  for (const [name, mutate] of Object.entries(cases)) await t.test(name, async t => {
    const f = await selectedFixture(t, { native: true });
    mutate(f.next);
    const rejected = await f.api("decks/sample/publish", { release_id: "r2" });
    assert.equal(rejected.status, 409, rejected.text);
    assert.equal(rejected.json.ok, false);
    await unchanged(f);
  });
});

test("admission process failures fail closed without leaking process diagnostics", async t => {
  const cases = {
    "missing interpreter": f => ({ admissionPython: join(f.directory, "missing-python") }),
    "malformed helper output": f => ({ admissionPython: executable(f, 'process.stdout.write("not-json private-process-marker"); process.stderr.write("private-process-marker");') }),
    "nonzero helper exit": f => ({ admissionPython: executable(f, 'process.stderr.write("private-process-marker"); process.exit(23);') }),
    "output exceeds limit": f => ({ admissionPython: executable(f, 'process.stdout.write("x".repeat(128 * 1024));') }),
    "interrupted helper": f => ({ admissionPython: executable(f, 'process.kill(process.pid, "SIGKILL");') }),
    "blocked helper is killed": f => ({ admissionPython: executable(f, `require("node:fs").writeFileSync(${JSON.stringify(join(f.directory, "blocked.pid"))}, String(process.pid)); setInterval(() => {}, 1000);`), admissionTimeoutMs: 500 }),
  };
  for (const [name, config] of Object.entries(cases)) await t.test(name, async t => {
    const f = await selectedFixture(t);
    await f.stop();
    const overrides = config(f);
    await f.start(overrides);
    const rejected = await f.api("decks/sample/publish", { release_id: "r2" });
    assert.equal(rejected.status, 503, rejected.text);
    assert.equal(rejected.json.error.code, "admission_unavailable");
    assert.ok(!rejected.text.includes(f.managementToken));
    assert.ok(!rejected.text.includes(overrides.admissionPython));
    assert.doesNotMatch(rejected.text, /private-process-marker|ENOENT|SIGKILL|Traceback/);
    if (name === "blocked helper is killed") {
      const pid = Number(readFileSync(join(f.directory, "blocked.pid"), "utf8"));
      assert.throws(() => process.kill(pid, 0), error => error.code === "ESRCH");
    }
    await unchanged(f);
  });
});

test("successful admission must match the requested release, manifest and loaded profile", async t => {
  const cases = {
    "wrong deck": result => { result.deck_id = "other"; },
    "wrong release": result => { result.release_id = "other"; },
    "wrong manifest digest": result => { result.manifest_sha256 = "0".repeat(64); },
    "wrong delivery profile": result => { result.delivery_profile.sha256 = "0".repeat(64); },
  };
  for (const [name, change] of Object.entries(cases)) await t.test(name, async t => {
    const f = await selectedFixture(t);
    await f.stop();
    const admissionPython = executable(f, `${invokeRealAdmission}\nconst result = JSON.parse(checked.stdout); (${change.toString()})(result); process.stdout.write(JSON.stringify(result));`);
    await f.start({ admissionPython });
    const rejected = await f.api("decks/sample/publish", { release_id: "r2" });
    assert.equal(rejected.status, 409, rejected.text);
    assert.equal(rejected.json.error.code, "admission_mismatch");
    await unchanged(f);
  });
});

test("mutation after canonical admission is rechecked before policy selection", async t => {
  for (const kind of ["manifest", "artifact", "symlink"]) await t.test(kind, async t => {
    const f = await selectedFixture(t);
    await f.stop();
    const target = join(f.next.directory, kind === "manifest" ? "deck-manifest.json" : "deck.html");
    const change = kind === "symlink"
      ? `fs.unlinkSync(target); fs.symlinkSync(${JSON.stringify(join(f.next.directory, "cover.svg"))}, target);`
      : `fs.appendFileSync(target, " ");`;
    const admissionPython = executable(f, `${invokeRealAdmission}\nconst fs = require("node:fs"); const target = ${JSON.stringify(target)}; ${change} process.stdout.write(checked.stdout);`);
    await f.start({ admissionPython });
    const rejected = await f.api("decks/sample/publish", { release_id: "r2" });
    assert.equal(rejected.status, kind === "symlink" ? 404 : 409, rejected.text);
    await unchanged(f);
  });
});

test("operator admission configuration cannot be supplied by a management request", async t => {
  const f = await selectedFixture(t);
  for (const body of [
    { release_id: "r2", admissionPython: process.execPath },
    { release_id: "r2", delivery_profile: LIBRARY_DELIVERY },
    { release_id: "r2", manifest_sha256: "0".repeat(64) },
  ]) {
    assert.equal((await f.api("decks/sample/publish", body)).status, 400);
    await unchanged(f);
  }
});

test("admission subprocess receives fixed arguments and no management credentials", async t => {
  const f = await selectedFixture(t);
  await f.stop();
  const observation = join(f.directory, "observed.json");
  const admissionPython = executable(f, `${invokeRealAdmission}\nrequire("node:fs").writeFileSync(${JSON.stringify(observation)}, JSON.stringify({ args: process.argv.slice(2), env: process.env })); process.stdout.write(checked.stdout);`);
  await f.start({ admissionPython });
  assert.equal((await f.api("decks/sample/publish", { release_id: "r2" })).status, 200);
  const observed = JSON.parse(readFileSync(observation, "utf8"));
  assert.deepEqual(observed.args, ["-B", "-E", "-s", admission, realpathSync(f.next.directory), "--target", "library", "--deck-id", "sample", "--release-id", "r2"]);
  // Observe this shim runtime under an independently supplied minimal env.
  // Node/libSystem may insert keys after exec (UV_USE_IO_URING on Linux or
  // __CF_USER_TEXT_ENCODING on macOS); neither is caller-env inheritance.
  const baseline = spawnSync(process.execPath, ["-e", "process.stdout.write(JSON.stringify(process.env))"], {
    encoding: "utf8", env: { PATH: process.env.PATH ?? "/usr/bin:/bin", LANG: "C.UTF-8" },
  });
  assert.equal(baseline.status, 0, baseline.stderr);
  assert.deepEqual(observed.env, JSON.parse(baseline.stdout));
  assert.ok(!JSON.stringify(observed).includes(f.managementToken));
  assert.equal((await f.api("decks/sample/access")).json.data.release_id, "r2");
});

test("concurrent admission is bounded while existing reads and policy operations remain available", async t => {
  const f = await selectedFixture(t);
  await f.stop();
  const started = join(f.directory, "started.pids");
  const permit = join(f.directory, "permit");
  const admissionPython = executable(f, `
const fs = require("node:fs");
fs.appendFileSync(${JSON.stringify(started)}, String(process.pid) + "\\n");
const timer = setInterval(() => {
  if (!fs.existsSync(${JSON.stringify(permit)})) return;
  clearInterval(timer);
  ${invokeRealAdmission}
  process.stdout.write(checked.stdout);
}, 10);
`);
  await f.start({ admissionPython });
  const pending = [f.api("decks/sample/publish", { release_id: "r2" }), f.api("decks/sample/publish", { release_id: "r2" })];
  let outcomes;
  try {
    await new Promise((resolve, reject) => {
      // Directory watch events can be coalesced or omitted even after both
      // children wrote their PIDs. Observe the barrier itself, not its notifier.
      const poll = setInterval(check, 10);
      const timeout = setTimeout(() => {
        clearInterval(poll);
        const observed = existsSync(started) ? readFileSync(started, "utf8") : "missing";
        reject(new Error(`Admission children did not reach the controlled fixture boundary (${JSON.stringify(observed)})`));
      }, 10000);
      function check() {
        if (existsSync(started) && readFileSync(started, "utf8").trim().split("\n").length === 2) {
          clearTimeout(timeout); clearInterval(poll); resolve();
        }
      }
      check();
    });
    const rejected = await f.api("decks/sample/publish", { release_id: "r2" });
    assert.equal(rejected.status, 503);
    assert.equal(rejected.json.error.code, "admission_busy");
    assert.equal((await f.request("/decks/sample/r1/")).status, 200);
    assert.deepEqual((await f.api("decks/sample/access")).json.data, f.before);
    assert.equal((await f.api("keys", { label: "During admission", scope: "collection" })).status, 200);
  } finally {
    writeFileSync(permit, "continue");
    outcomes = await Promise.allSettled(pending);
  }
  assert.ok(outcomes.every(result => result.status === "fulfilled" && result.value.status === 200));
  assert.equal(readFileSync(started, "utf8").trim().split("\n").length, 2);
});

test("release enumeration salvages valid candidates and reports malformed residue without serving staging", async t => {
  const f = await fixture(t);
  writeRelease(f.libraryRoot, "valid", "r1");
  writeRelease(f.libraryRoot, "valid", "r2");
  mkdirSync(join(f.libraryRoot, "decks", "broken", "empty"), { recursive: true });
  mkdirSync(join(f.libraryRoot, "decks", "broken", "malformed"));
  writeFileSync(join(f.libraryRoot, "decks", "broken", "malformed", "deck-manifest.json"), "{");
  symlinkSync(join(f.libraryRoot, "decks", "valid", "r1"), join(f.libraryRoot, "decks", "broken", "linked"));
  const staged = writeRelease(join(f.libraryRoot, ".staging", "attempt"), "staged", "r1");
  const listing = await f.api("releases");
  assert.equal(listing.status, 200);
  assert.equal(listing.json.data.complete, true, "all candidate directories were enumerated, even though some are invalid");
  assert.deepEqual(listing.json.data.releases.map(row => `${row.deck_id}/${row.release_id}`), ["valid/r1", "valid/r2"]);
  assert.deepEqual(listing.json.data.issues.map(row => row.path).sort(), ["decks/broken/empty", "decks/broken/linked", "decks/broken/malformed"]);
  assert.ok(listing.json.data.issues.every(row => typeof row.code === "string"));
  assert.ok(!listing.text.includes(staged.directory));
  assert.equal((await f.request("/.staging/attempt/decks/staged/r1/", { headers: { authorization: `Bearer ${f.managementToken}` } })).status, 404);
  assert.equal((await f.api("decks/valid/publish", { release_id: "r1" })).status, 200);
  rmSync(join(f.libraryRoot, "decks"), { recursive: true });
  writeFileSync(join(f.libraryRoot, "decks"), "not a directory");
  const unavailable = await f.api("releases");
  assert.equal(unavailable.status, 200);
  assert.equal(unavailable.json.data.complete, false);
  assert.deepEqual(unavailable.json.data.releases, []);
  assert.deepEqual(unavailable.json.data.issues, [{ path: "decks", code: "unreadable" }]);
});

test("an unreadable deck subtree marks enumeration incomplete without hiding other releases", async t => {
  const f = await fixture(t);
  writeRelease(f.libraryRoot, "visible");
  writeRelease(f.libraryRoot, "unreadable");
  const target = join(f.libraryRoot, "decks", "unreadable");
  chmodSync(target, 0);
  let listing;
  try { listing = await f.api("releases"); }
  finally { chmodSync(target, 0o700); }
  assert.equal(listing.status, 200);
  assert.deepEqual(listing.json.data.releases.map(row => row.deck_id), ["visible"]);
  assert.equal(listing.json.data.complete, false);
  assert.deepEqual(listing.json.data.issues, [{ path: "decks/unreadable", code: "unreadable" }]);
});

test("an unreadable candidate manifest also marks enumeration incomplete", async t => {
  const f = await fixture(t);
  writeRelease(f.libraryRoot, "visible");
  const release = writeRelease(f.libraryRoot, "unreadable");
  const target = join(release.directory, "deck-manifest.json");
  chmodSync(target, 0);
  let listing;
  try { listing = await f.api("releases"); }
  finally { chmodSync(target, 0o600); }
  assert.equal(listing.status, 200);
  assert.deepEqual(listing.json.data.releases.map(row => row.deck_id), ["visible"]);
  assert.equal(listing.json.data.complete, false);
  assert.deepEqual(listing.json.data.issues, [{ path: "decks/unreadable/r1", code: "unreadable" }]);
});

test("enumeration never follows a symlinked decks root outside the library", async t => {
  const f = await fixture(t);
  const empty = await f.api("releases");
  assert.deepEqual(empty.json.data, { releases: [], issues: [], complete: true });
  const other = join(f.directory, "outside-library");
  writeRelease(other, "outside");
  symlinkSync(join(other, "decks"), join(f.libraryRoot, "decks"));
  const listing = await f.api("releases");
  assert.equal(listing.status, 200);
  assert.deepEqual(listing.json.data, { releases: [], issues: [{ path: "decks", code: "unreadable" }], complete: false });
  assert.doesNotMatch(listing.text, /Title-outside|outside-library/);
});
