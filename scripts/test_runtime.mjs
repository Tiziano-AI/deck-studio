// Run: DECKS_TEST_SKILL_ROOT="$HOME/.agents/skills/deck-studio" node --test scripts/test_runtime.mjs
// The explicit root supplies the complete producer under test, including its
// runtime, capture code, scripts, dependencies and package-local Chromium.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, rm, mkdir, symlink } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const installed = process.env.DECKS_TEST_SKILL_ROOT;
if (!installed) throw new Error("Set DECKS_TEST_SKILL_ROOT to an installed Deck Studio package with Chromium");
const producer = resolve(installed);
const { chromium } = await import(pathToFileURL(join(producer, "scripts/browser_runtime.mjs")));
const { createStaticServer, observeErrors, prepareDeck, captureSlide } = await import(pathToFileURL(join(producer, "scripts/capture_runtime.mjs")));
const { sourceCapture } = await import(pathToFileURL(join(producer, "scripts/proof_identity.mjs")));
const { LIBRARY_DELIVERY, DECK_CSP, presentationType } = await import(pathToFileURL(join(producer, "scripts/delivery_profile.mjs")));
const css = await readFile(join(producer, "runtime/deck-stage.css"), "utf8");
const js = await readFile(join(producer, "runtime/deck-stage.js"), "utf8");

async function fixture(t, { extra = "", script = "", slow = false, local = false, count = 8, delivery = "local", assets = {} } = {}) {
  const root = await mkdtemp(join(tmpdir(), "decks-runtime-"));
  await writeFile(join(root, "runtime.css"), css);
  await writeFile(join(root, "runtime.js"), js);
  await writeFile(join(root, "image.svg"), '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="red"/></svg>');
  for (const [path, bytes] of Object.entries(assets)) {
    await mkdir(resolve(root, path, ".."), { recursive: true });
    await writeFile(join(root, path), bytes);
  }
  const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,">${local ? '<link rel="stylesheet" href="runtime.css">' : `<style>${css}</style>`}</head>
    <body data-web-slides-studio><div class="deck-viewport"><main class="deck-stage">
    ${Array.from({ length: count }, (_, index) => `<section class="slide" style="background:rgb(${220-index*15},230,240)"><h1 style="font-size:80px">Slide ${index+1}</h1>
      <a href="#slide-3">Jump to three</a><button onclick="window.buttonHits=(window.buttonHits||0)+1">Native button</button>
      <div contenteditable="true">Edit here</div>${index === 0 ? extra : ""}</section>`).join("")}
    </main></div>${local ? '<script src="runtime.js"></script>' : `<script>${js}</script>`}<script>${script}</script></body></html>`;
  await writeFile(join(root, "deck.html"), html);
  const capture = sourceCapture(root);
  const original = capture.read.bind(capture);
  capture.read = async (file) => {
    if (slow && file.endsWith("image.svg")) await new Promise((done) => setTimeout(done, 900));
    return original(file);
  };
  const { server, url } = await createStaticServer(root, "deck.html", capture, { delivery });
  const browser = await chromium.launch({ headless: true });
  t.after(async () => {
    await browser.close();
    await new Promise((done) => server.close(done));
    await rm(root, { recursive: true, force: true });
  });
  return { browser, url, capture, root };
}

test("public navigation: numeric timers, native controls, hash and history stay coherent", async (t) => {
  const { browser, url } = await fixture(t);
  const page = await browser.newPage();
  await page.goto(url);
  const current = () => page.evaluate(() => WebSlidesStudio.current());
  await page.keyboard.press("4");
  await page.mouse.move(100, 100);
  await page.waitForTimeout(800);
  assert.equal(await current(), 3);
  await page.keyboard.press("7");
  await page.keyboard.press("ArrowLeft");
  await page.waitForTimeout(800);
  assert.equal(await current(), 2, "navigation cancels pending number entry");
  await page.keyboard.press("5");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(800);
  assert.equal(await current(), 2);
  await page.keyboard.press("Control+ArrowRight");
  assert.equal(await current(), 2);
  await page.locator(".slide.active button").focus();
  await page.keyboard.press("Space");
  assert.equal(await page.evaluate(() => window.buttonHits), 1);
  assert.equal(await current(), 2);
  await page.locator(".slide.active [contenteditable]").focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(await current(), 2);
  await page.evaluate(() => { for (const value of [NaN, Infinity, "3", null, 1.5]) WebSlidesStudio.goTo(value); });
  assert.equal(await current(), 2);
  assert.equal(await page.locator(".slide[inert]").count(), 7);
  await page.evaluate(() => { location.hash = "slide-6"; });
  await page.waitForFunction(() => WebSlidesStudio.current() === 5);
  await page.reload();
  assert.equal(await current(), 5);
  await page.keyboard.press("ArrowRight");
  assert.equal(await current(), 6);
  await page.goBack();
  await page.waitForFunction(() => WebSlidesStudio.current() === 5);
  await page.goForward();
  await page.waitForFunction(() => WebSlidesStudio.current() === 6);
  await page.evaluate(() => { location.hash = "invalid"; });
  await page.waitForFunction(() => WebSlidesStudio.current() === 0 && location.hash === "#slide-1");
  await page.locator('.deck-button[data-action="next"]').focus();
  await page.waitForTimeout(1800);
  assert.equal(await page.locator(".deck-controls").evaluate((el) => getComputedStyle(el).opacity), "1");
  await page.keyboard.press("Space");
  assert.equal(await current(), 1);
});

test("duplicate history notifications preserve new number entry; real navigation still cancels it", async (t) => {
  const { browser, url } = await fixture(t);
  const page = await browser.newPage();
  await page.goto(url);
  // Replay the audience-observed order under control: native link popstate,
  // number entry, then the same link's delayed hashchange. Use Enter to make
  // the lost buffer observable without depending on the numeric timer.
  const afterEnter = await page.evaluate(() => {
    const stage = document.querySelector(".deck-stage");
    const key = value => stage.dispatchEvent(new KeyboardEvent("keydown", { key: value, bubbles: true }));
    history.pushState(null, "", "#slide-3");
    window.dispatchEvent(new PopStateEvent("popstate"));
    key("5");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    key("Enter");
    return WebSlidesStudio.current();
  });
  assert.equal(afterEnter, 4);
  // The same duplicate notification must preserve timer-committed input too.
  await page.evaluate(() => {
    WebSlidesStudio.goTo(2);
    document.querySelector(".deck-stage").dispatchEvent(new KeyboardEvent("keydown", { key: "5", bubbles: true }));
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  await page.waitForFunction(() => WebSlidesStudio.current() === 4);
  const afterRealNavigation = await page.evaluate(() => {
    const stage = document.querySelector(".deck-stage");
    const key = value => stage.dispatchEvent(new KeyboardEvent("keydown", { key: value, bubbles: true }));
    key("7");
    history.pushState(null, "", "#slide-2");
    window.dispatchEvent(new PopStateEvent("popstate"));
    key("Enter");
    const historyTarget = WebSlidesStudio.current();
    WebSlidesStudio.goTo(0);
    key("7");
    key("Home");
    key("Enter");
    return [historyTarget, WebSlidesStudio.current()];
  });
  assert.deepEqual(afterRealNavigation, [1, 0], "real history and explicit same-slide navigation still cancel pending input");
});

test("library capture uses nested audience MIME, CSP and backstage exclusions", async (t) => {
  const { url, root } = await fixture(t, { delivery: "library", assets: {
    "chart.json": "{}", "untyped.bin": "private", "proof/page.html": "backstage", "deck-manifest.json": "{}", "clip.mp4": "media", "font.ttf": "font",
  } });
  assert.equal(new URL(url).pathname, "/decks/qa/candidate/");
  const html = await fetch(url);
  assert.equal(html.status, 200);
  assert.equal(html.headers.get("content-security-policy"), DECK_CSP);
  assert.equal(html.headers.get("content-type"), "text/html; charset=utf-8");
  for (const path of ["chart.json", "untyped.bin", "proof/page.html", "deck-manifest.json", ".hidden.png", "../candidate2/deck.html"]) {
    assert.equal((await fetch(new URL(path, url))).status, 404, path);
  }
  assert.equal((await fetch(new URL("/runtime.js", url))).status, 404, "root-relative resources must not accidentally work");
  for (const path of ["clip.mp4", "font.ttf"]) {
    const response = await fetch(new URL(path, url));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), presentationType(path));
    assert.equal(response.headers.get("content-security-policy"), DECK_CSP);
  }
  await symlink(join(root, "image.svg"), join(root, "linked.svg"));
  await symlink(join(root, "proof"), join(root, "linked-proof"));
  for (const path of ["linked.svg", "linked-proof/page.html"]) assert.equal((await fetch(new URL(path, url))).status, 404, path);
});

test("caught fetch succeeds locally but fails library capture without leaking its URL", async (t) => {
  for (const delivery of ["local", "library"]) {
    const { browser, url } = await fixture(t, { delivery, count: 2, assets: { "chart.json": '{"value":42}' },
      script: 'fetch("./chart.json?token=sensitive-test").then(r=>r.json()).then(data=>document.body.dataset.chart=String(data.value)).catch(()=>document.body.dataset.chart="fallback")',
    });
    const page = await browser.newPage();
    const check = observeErrors(page);
    if (delivery === "local") {
      await prepareDeck(page, url, check);
      await captureSlide(page, 0, "qa", check);
      assert.equal(await page.locator("body").getAttribute("data-chart"), "42");
    } else {
      await assert.rejects(async () => {
        await prepareDeck(page, url, check);
        await captureSlide(page, 0, "qa", check);
      });
      await page.waitForFunction(() => document.body.dataset.chart === "fallback");
      assert.throws(check, error => /csp_connect-src/.test(error.message) && !error.message.includes("sensitive-test"));
    }
  }
});

test("library capture binds nested modules and lazy slide resources and observes control-triggered failures", async (t) => {
  const { browser, url, capture } = await fixture(t, { delivery: "library", local: true, count: 2,
    extra: '<script type="module" src="assets/chart.mjs"></script>',
    assets: { "assets/chart.mjs": 'import {value} from "./data.mjs";document.body.dataset.chart=String(value)', "assets/data.mjs": 'export const value=42' },
    script: 'document.querySelector(".deck-stage").addEventListener("webslides:slidechange", e => {if(e.detail.index===1){const image=new Image();image.src="image.svg";image.loading="lazy";e.detail.slide.append(image)}})',
  });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  capture.observe(page, new URL(url).origin);
  const check = observeErrors(page);
  await prepareDeck(page, url, check);
  await captureSlide(page, 0, "qa", check);
  await captureSlide(page, 1, "qa", check);
  assert.equal(await page.locator("body").getAttribute("data-chart"), "42");
  const source = await capture.finish();
  assert.deepEqual(source.files.map(row => row.path), ["assets/chart.mjs", "assets/data.mjs", "deck.html", "image.svg", "runtime.css", "runtime.js"]);
  await page.locator(".slide.active button").evaluate(button => { button.onclick = () => fetch("./chart.json").catch(() => undefined); });
  await page.locator(".slide.active button").click();
  await page.waitForTimeout(50);
  assert.throws(check, /csp_connect-src/);
});

test("library capture rejects root-relative resources and forbidden late slide fetch", async (t) => {
  for (const options of [
    { extra: '<script src="/runtime.js"></script>' },
    { script: 'document.querySelector(".deck-stage").addEventListener("webslides:slidechange", e => {if(e.detail.index===1)fetch("chart.json").catch(()=>{})})' },
  ]) {
    const { browser, url } = await fixture(t, { delivery: "library", count: 2, ...options });
    const page = await browser.newPage();
    const check = observeErrors(page);
    await assert.rejects(async () => {
      await prepareDeck(page, url, check);
      await captureSlide(page, 0, "qa", check);
      await captureSlide(page, 1, "qa", check);
    });
  }
});

test("touch links remain reachable; unobstructed background taps navigate; reduced motion fits stage", async (t) => {
  const { browser, url } = await fixture(t);
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: "reduce" });
  await page.goto(url);
  await page.locator(".slide.active a").tap();
  await page.waitForFunction(() => WebSlidesStudio.current() === 2);
  await page.touchscreen.tap(380, 600);
  assert.equal(await page.evaluate(() => WebSlidesStudio.current()), 3);
  assert.equal(await page.locator(".deck-tapzones").count(), 0);
  const size = await page.locator(".deck-stage").evaluate((el) => ({ width: el.offsetWidth, height: el.offsetHeight, scale: Number(el.dataset.scale) }));
  assert.equal(size.width, 1920);
  assert.equal(size.height, 1080);
  assert.ok(size.scale > 0 && size.scale < 1);
  assert.ok(Number.parseFloat(await page.locator(".slide.active").evaluate((el) => getComputedStyle(el).transitionDuration)) < 0.001);
});

test("shared capture waits for slow images and final transition frames; binds inline/local resources", async (t) => {
  for (const local of [false, true]) {
    const { browser, url, capture } = await fixture(t, { extra: '<img src="image.svg" loading="lazy">', slow: true, local });
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    capture.observe(page, new URL(url).origin);
    const check = observeErrors(page);
    await prepareDeck(page, url, check);
    const frame = await captureSlide(page, 0, "qa", check);
    assert.ok(frame.length > 0);
    assert.equal(await page.locator("img").evaluate((image) => image.naturalWidth), 100);
    await captureSlide(page, 1, "pdf", check);
    assert.equal(await page.locator(".slide.active").evaluate((el) => getComputedStyle(el).opacity), "1");
    const proof = await capture.finish();
    assert.deepEqual(proof.files.map((row) => row.path), local ? ["deck.html", "image.svg", "runtime.css", "runtime.js"] : ["deck.html", "image.svg"]);
  }
});

test("missing images and JavaScript errors cannot produce accepted frames", async (t) => {
  for (const options of [{ extra: '<img src="missing.png">' }, { script: 'setTimeout(() => { throw new Error("broken deck"); }, 100)' }]) {
    const { browser, url } = await fixture(t, options);
    const page = await browser.newPage();
    const check = observeErrors(page);
    await assert.rejects(async () => {
      await prepareDeck(page, url, check);
      await captureSlide(page, 0, "qa", check);
    });
  }
});

test("QA and PDF producers agree on source bytes and invalidate previous success on failure", async (t) => {
  const { root } = await fixture(t, { local: true, count: 2 });
  const proof = join(root, "proof");
  await mkdir(proof);
  const execute = promisify(execFile);
  const renderArgs = [join(producer, "scripts/render_qa.mjs"), join(root, "deck.html"), "--out", proof];
  const pdfArgs = [join(producer, "scripts/export_pdf.mjs"), join(root, "deck.html"), join(root, "deck.pdf"), "--proof", join(proof, "pdf-report.json")];
  try { await execute(process.execPath, renderArgs); }
  catch (error) { throw new Error(`QA failed: ${await readFile(join(proof, "report.json"), "utf8")}`, { cause: error }); }
  await execute(process.execPath, pdfArgs);
  const render = JSON.parse(await readFile(join(proof, "report.json")));
  const pdf = JSON.parse(await readFile(join(proof, "pdf-report.json")));
  assert.equal(render.ok, true);
  assert.equal(pdf.ok, true);
  assert.deepEqual(render.source, pdf.source);
  assert.equal(render.schema_version, 3);
  assert.equal(pdf.schema_version, 2);
  assert.equal(render.delivery_profile, undefined, "local capture must not claim library delivery");
  assert.equal(pdf.delivery_profile, undefined);
  const original = await readFile(join(root, "deck.html"), "utf8");
  await writeFile(join(root, "deck.html"), original.replace("<h1", '<img src="missing.png"><h1'));
  for (const args of [renderArgs, pdfArgs]) await assert.rejects(execute(process.execPath, args));
  for (const name of ["report.json", "pdf-report.json"]) {
    const failed = JSON.parse(await readFile(join(proof, name)));
    assert.equal(failed.ok, false);
    assert.ok(failed.errors.length > 0);
  }
});

test("QA and PDF library CLI bind the actual delivery contract and fail caught fetch", async (t) => {
  const { root } = await fixture(t, { local: true, count: 2 });
  const proof = join(root, "proof");
  const execute = promisify(execFile);
  const renderArgs = [join(producer, "scripts/render_qa.mjs"), join(root, "deck.html"), "--out", proof, "--delivery", "library"];
  const pdfArgs = [join(producer, "scripts/export_pdf.mjs"), join(root, "deck.html"), join(root, "deck.pdf"), "--proof", join(proof, "pdf-report.json"), "--delivery", "library"];
  for (const args of [renderArgs, pdfArgs]) await execute(process.execPath, args);
  const reports = await Promise.all(["report.json", "pdf-report.json"].map(async name => JSON.parse(await readFile(join(proof, name)))));
  for (const report of reports) {
    assert.equal(report.ok, true);
    assert.deepEqual(report.delivery_profile, LIBRARY_DELIVERY);
  }
  assert.deepEqual(reports[0].source, reports[1].source);
  const original = await readFile(join(root, "deck.html"), "utf8");
  await writeFile(join(root, "deck.html"), original.replace("</body>", '<script>fetch("chart.json?secret=never-log-this").catch(()=>document.body.dataset.fallback="true")</script></body>'));
  for (const args of [renderArgs, pdfArgs]) await assert.rejects(execute(process.execPath, args));
  for (const name of ["report.json", "pdf-report.json"]) {
    const bytes = await readFile(join(proof, name), "utf8");
    const report = JSON.parse(bytes);
    assert.equal(report.ok, false);
    assert.deepEqual(report.delivery_profile, LIBRARY_DELIVERY);
    assert.ok(report.errors.some(error => error.includes("csp_connect-src")));
    assert.ok(!bytes.includes("never-log-this"));
  }
});
