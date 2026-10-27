// Synthetic accepted releases exercise the actual browser/gateway seam. These
// tests do not claim PDF rendering, visual acceptance or communication quality.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { fixture, fileIdentity, rewriteArtifact, writeRelease } from "../publisher/static-server/test/fixtures.mjs";

if (!process.env.DECKS_TEST_SKILL_ROOT) throw new Error("Set DECKS_TEST_SKILL_ROOT to a complete prepared Deck Studio package");
const producer = resolve(process.env.DECKS_TEST_SKILL_ROOT);
const { launchBrowser } = await import(pathToFileURL(join(producer, "scripts/browser_runtime.mjs")));

async function selected(f, id, { legacyReset = false } = {}) {
  const release = writeRelease(f.libraryRoot, id);
  if (legacyReset) {
    // A previously accepted runtime must gain the home and restart icons without
    // republishing. Rebind this synthetic fixture, never real acceptance proof.
    const path = "assets/deck.js";
    const current = readFileSync(join(release.directory, path), "utf8");
    const legacy = current.replace(/<button\b[^>]*\bdata-action="reset"[^>]*>.*?<\/button>/s,
      '<button class="deck-button" type="button" data-action="reset" aria-label="Reset to first slide">R</button>');
    assert.notEqual(legacy, current, "the fixture must actually exercise the old literal-R control");
    rewriteArtifact(release, path, legacy);
    for (const reportPath of ["proof/report.json", "proof/pdf-report.json"]) {
      const report = JSON.parse(readFileSync(join(release.directory, reportPath), "utf8"));
      report.source.files = report.source.files.map(row => row.path === path ? fileIdentity(path, legacy) : row);
      rewriteArtifact(release, reportPath, JSON.stringify(report));
    }
    const reviewPath = "proof/visual-review.json";
    const review = JSON.parse(readFileSync(join(release.directory, reviewPath), "utf8"));
    review.render_report_sha256 = fileIdentity("proof/report.json", readFileSync(join(release.directory, "proof/report.json"))).sha256;
    rewriteArtifact(release, reviewPath, JSON.stringify(review));
  }
  const response = await f.api(`decks/${id}/publish`, { release_id: "r1" });
  assert.equal(response.status, 200, response.text);
  return release;
}

function deckFrame(page) {
  const frame = page.frames().find(candidate => candidate !== page.mainFrame());
  assert.ok(frame, "the canonical viewer has loaded its presentation frame");
  return frame;
}

async function currentSlide(page, number) {
  await page.waitForFunction(expected => {
    const child = document.querySelector("[data-deck-frame]")?.contentWindow;
    return child?.WebSlidesStudio?.current() === expected - 1 && location.hash === `#slide-${expected}`;
  }, number);
}

async function assertViewerBounds(page, viewport) {
  const bounds = await page.evaluate(() => {
    const element = document.querySelector("[data-deck-frame]");
    const { x, y, width, height, right, bottom } = element.getBoundingClientRect();
    const child = element.contentWindow;
    return { frame: { x, y, width, height, right, bottom }, child: { width: child.innerWidth, height: child.innerHeight },
      scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth };
  });
  assert.deepEqual(bounds.frame, { x: 0, y: 0, width: viewport.width, height: viewport.height,
    right: viewport.width, bottom: viewport.height }, "the presentation fills the viewport without reserved navigation space");
  assert.deepEqual(bounds.child, viewport, "the presentation's own viewport is not reduced by hosted navigation");
  assert.equal(bounds.scrollWidth, bounds.clientWidth, "no horizontal viewport overflow");
  assert.equal(await page.locator("header,.viewer-bar,[data-viewer-reveal],[data-viewer-fullscreen],[data-viewer-return]").count(), 0,
    "the gateway adds no second navigation surface outside the existing slide controls");
  return bounds;
}

async function pillShown(frame, expected) {
  await frame.waitForFunction(expected => {
    const controls = document.querySelector(".deck-controls");
    if (!controls) return false;
    const style = getComputedStyle(controls);
    return expected ? Number(style.opacity) >= .99 && style.pointerEvents !== "none" : Number(style.opacity) <= .01;
  }, expected);
}

async function clickReturn(page, name) {
  const viewport = await page.evaluate(() => ({ width: innerWidth, height: innerHeight }));
  await page.mouse.move(viewport.width / 2, viewport.height / 2);
  const frame = deckFrame(page);
  await pillShown(frame, true);
  await frame.getByRole("link", { name, exact: true }).click();
}

async function unchangedAfterKey(page, key, expectedUrl) {
  await page.keyboard.press(key);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  assert.equal(page.url(), expectedUrl, `${key} must not hijack a browser or presentation action`);
}

test("hosted viewers enhance the existing pill without reducing the viewport or hijacking other input", async t => {
  const f = await fixture(t);
  const publicRelease = await selected(f, "public", { legacyReset: true });
  await selected(f, "private");
  writeRelease(f.libraryRoot, "private", "hidden");
  await f.api("decks/public/public", { public: true });
  const key = (await f.api("keys", { label: "Team", scope: "collection" })).json.data;
  const wrong = (await f.api("keys", { label: "Wrong team", scope: "collection" })).json.data;
  await f.api("decks/private/grant", { key_id: key.key_id });
  await f.api("decks/public/grant", { key_id: key.key_id });
  const browser = await launchBrowser();
  t.after(() => browser.close());

  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(f.base);
    await page.getByRole("link", { name: "Open Title-public", exact: true }).click();
    await currentSlide(page, 1);
    const frame = deckFrame(page);
    assert.equal(new URL(frame.url()).pathname, "/decks/public/r1/deck.html");
    assert.equal(await frame.locator(".deck-controls").count(), 1);
    const home = frame.getByRole("link", { name: "Back to public decks (B)", exact: true });
    assert.equal(await home.count(), 1);
    assert.equal(await home.getAttribute("href"), "/");
    assert.equal(await home.getAttribute("target"), "_top");
    assert.equal(await home.getAttribute("aria-keyshortcuts"), "B");
    assert.equal(await home.locator("svg").count(), 1);
    const reset = frame.getByRole("button", { name: "Reset to first slide", exact: true });
    assert.equal(await reset.locator("svg").count(), 1, "the accepted literal-R runtime is enhanced without republishing");
    assert.equal(await reset.getAttribute("title"), "Reset to first slide (R)");
    assert.equal(await reset.getAttribute("aria-keyshortcuts"), "R");
    assert.equal(await frame.locator(".deck-controls button").count(), 3);
    assert.equal(await frame.getByRole("button", { name: "Previous slide", exact: true }).count(), 1);
    assert.equal(await frame.getByRole("button", { name: "Next slide", exact: true }).count(), 1);
    assert.equal(await frame.locator(".deck-count").textContent(), "01/03");
    assert.equal(await page.locator("[data-deck-frame]").evaluate(element => document.activeElement === element), true,
      "the initial keyboard target is the presentation");
    const initialBounds = await assertViewerBounds(page, viewport);
    await page.keyboard.press("ArrowRight");
    await currentSlide(page, 2);
    await page.keyboard.press("End");
    await currentSlide(page, 3);
    await page.reload();
    await currentSlide(page, 3);
    await page.keyboard.press("r");
    await currentSlide(page, 1);
    const reloadedFrame = deckFrame(page);

    if (viewport.width > 600) {
      const viewerUrl = page.url();
      for (const key of ["Control+b", "Meta+b", "Alt+b", "Shift+b", "Escape"]) await unchangedAfterKey(page, key, viewerUrl);
      await reloadedFrame.evaluate(() => {
        const input = document.createElement("input");
        input.id = "test-input";
        document.body.append(input);
        input.focus();
      });
      await unchangedAfterKey(page, "b", viewerUrl);
      assert.equal(await reloadedFrame.locator("#test-input").inputValue(), "b");
      await reloadedFrame.evaluate(() => {
        document.querySelector("#test-input").remove();
        const stage = document.querySelector(".deck-stage");
        stage.focus();
        stage.dispatchEvent(new KeyboardEvent("keydown", { key: "b", bubbles: true, cancelable: true, isComposing: true }));
      });
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
      assert.equal(page.url(), viewerUrl, "composition must not invoke the return shortcut");
      await reloadedFrame.evaluate(() => document.querySelector(".deck-stage").addEventListener("keydown", event => event.preventDefault(), { once: true }));
      await unchangedAfterKey(page, "b", viewerUrl);
    }

    await reloadedFrame.waitForFunction(() => document.querySelector(".deck-controls").dataset.visible === "false");
    await pillShown(reloadedFrame, false);
    assert.deepEqual(await assertViewerBounds(page, viewport), initialBounds, "auto-hiding the pill never resizes slides");
    await page.keyboard.press("Tab");
    await reloadedFrame.waitForFunction(() => document.querySelector(".deck-controls").contains(document.activeElement));
    await pillShown(reloadedFrame, true);
    await reloadedFrame.waitForFunction(() => document.querySelector(".deck-controls").dataset.visible === "false");
    await pillShown(reloadedFrame, true);
    assert.deepEqual(await assertViewerBounds(page, viewport), initialBounds, "focus keeps the existing pill visible without shifting the viewport");
    for (let index = 0; index < 4; index++) {
      if (await reloadedFrame.locator("[data-viewer-return]").evaluate(link => document.activeElement === link)) break;
      await page.keyboard.press("Tab");
    }
    assert.equal(await reloadedFrame.locator("[data-viewer-return]").evaluate(link => document.activeElement === link), true,
      "the home link is reachable through native tab order in the original pill");
    await page.keyboard.press("Enter");
    await page.waitForURL(`${f.base}/`);
    assert.equal(await page.getByRole("heading", { name: "Public decks.", exact: true }).count(), 1);
    await page.goto(`${f.base}/decks/public/r1/#slide-2`);
    await currentSlide(page, 2);
    await page.keyboard.press("b");
    await page.waitForURL(`${f.base}/`);
    assert.deepEqual(errors, []);
    await context.close();
  }

  const touchViewport = { width: 390, height: 844 };
  const touchContext = await browser.newContext({ viewport: touchViewport, isMobile: true, hasTouch: true });
  const touchPage = await touchContext.newPage();
  await touchPage.goto(`${f.base}/decks/public/r1/`);
  await currentSlide(touchPage, 1);
  const touchFrame = deckFrame(touchPage);
  const touchBounds = await assertViewerBounds(touchPage, touchViewport);
  await pillShown(touchFrame, false);
  await touchPage.touchscreen.tap(195, 422);
  await pillShown(touchFrame, true);
  await currentSlide(touchPage, 1);
  assert.deepEqual(await assertViewerBounds(touchPage, touchViewport), touchBounds);
  const touchHome = touchFrame.getByRole("link", { name: "Back to public decks (B)", exact: true });
  const hitTarget = await touchHome.boundingBox();
  assert.ok(hitTarget.width >= 44 && hitTarget.height >= 44, "the home icon has a usable touch target");
  await touchHome.tap();
  await touchPage.waitForURL(`${f.base}/`);
  await touchContext.close();

  const session = await f.login(key.secret);
  const keyed = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await keyed.addCookies([{ name: "decks_session", value: session.cookie.split("=").slice(1).join("="), url: f.base }]);
  const page = await keyed.newPage();
  await page.goto(`${f.base}/collection`);
  await page.getByRole("link", { name: "Open Title-private", exact: true }).click();
  await currentSlide(page, 1);
  assert.equal(await deckFrame(page).locator("[data-viewer-return]").getAttribute("href"), "/collection");
  await page.keyboard.press("End");
  await currentSlide(page, 3);
  await clickReturn(page, "Back to collection (B)");
  await page.waitForURL(`${f.base}/collection`);
  assert.equal(await page.getByRole("heading", { name: "Team", exact: true }).count(), 1);
  await page.goto(`${f.base}/decks/private/r1/#slide-2`);
  await currentSlide(page, 2);
  await page.reload();
  await currentSlide(page, 2);
  await page.keyboard.press("b");
  await page.waitForURL(`${f.base}/collection`);
  // Public-gallery arrival remains explicit even for an authenticated reader.
  await page.goto(f.base);
  await page.getByRole("link", { name: "Open Title-public", exact: true }).click();
  await currentSlide(page, 1);
  await clickReturn(page, "Back to public decks (B)");
  await page.waitForURL(`${f.base}/`);

  for (const leaf of ["deck.html", "assets/deck.js"]) {
    const raw = await page.request.get(`${f.base}/decks/public/r1/${leaf}`);
    assert.equal(await raw.text(), readFileSync(join(publicRelease.directory, leaf), "utf8"), "hosted enhancement leaves accepted artifact bytes unchanged");
    assert.doesNotMatch(await raw.text(), /data-viewer-return|viewer-bar/);
    if (leaf.endsWith(".js")) assert.match(await raw.text(), /aria-label="Reset to first slide">R<\/button>/);
  }
  assert.equal((await page.goto(`${f.base}/decks/private/hidden/`)).status(), 404);
  assert.equal(await page.locator("[data-deck-frame]").count(), 0);
  await f.api(`keys/${key.key_id}/revoke`, {});
  assert.equal((await page.goto(`${f.base}/decks/private/r1/`)).status(), 401);
  assert.equal(await page.locator("[data-deck-frame]").count(), 0);
  await keyed.close();

  const wrongSession = await f.login(wrong.secret);
  const outsider = await browser.newContext();
  await outsider.addCookies([{ name: "decks_session", value: wrongSession.cookie.split("=").slice(1).join("="), url: f.base }]);
  const denied = await outsider.newPage();
  assert.equal((await denied.goto(`${f.base}/decks/private/r1/`)).status(), 403);
  assert.equal(await denied.locator("[data-deck-frame]").count(), 0);
  await outsider.close();
});

test("ordinary evidence links leave the viewer while slide, popup and download links retain their semantics", async t => {
  const f = await fixture(t);
  await selected(f, "links");
  await f.api("decks/links/public", { public: true });
  const browser = await launchBrowser();
  t.after(() => browser.close());
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
  t.after(() => context.close());
  // Exercise real cross-origin navigation without relying on an external site.
  await context.route("https://evidence.invalid/**", route => route.fulfill({
    contentType: "text/html", body: "<!doctype html><title>Evidence</title><h1>External evidence</h1>",
  }));
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const viewerUrl = `${f.base}/decks/links/r1/`;

  async function openLinkedViewer() {
    await page.goto(viewerUrl);
    await currentSlide(page, 1);
    const frame = deckFrame(page);
    await frame.evaluate(() => {
      const nav = document.createElement("nav");
      nav.style.cssText = "position:fixed;top:120px;left:20px;z-index:100;display:flex;gap:16px;background:white;padding:16px;font:18px sans-serif";
      for (const [id, href, attributes] of [
        ["fragment", "#slide-2", {}],
        ["same-origin", "/", {}],
        ["self", "/", { target: "_self" }],
        ["external", "https://evidence.invalid/source", {}],
        ["blank", "https://evidence.invalid/new-tab", { target: "_blank" }],
        ["modified", "/", {}],
        ["download", "deck.pdf", { download: "evidence.pdf" }],
        ["prevented", "/", {}],
      ]) {
        const link = document.createElement("a");
        link.id = `test-${id}`;
        link.textContent = id;
        link.href = href;
        for (const [key, value] of Object.entries(attributes)) link.setAttribute(key, value);
        if (id === "prevented") link.addEventListener("click", event => {
          event.preventDefault();
          link.dataset.handled = "true";
        });
        nav.append(link);
      }
      document.body.append(nav);
    });
    return frame;
  }

  let frame = await openLinkedViewer();
  await frame.locator("#test-fragment").click();
  await currentSlide(page, 2);
  assert.equal(new URL(frame.url()).pathname, "/decks/links/r1/deck.html");
  await frame.locator("#test-prevented").click();
  assert.equal(await frame.locator("#test-prevented").getAttribute("data-handled"), "true");
  assert.equal(page.url(), `${viewerUrl}#slide-2`, "an author-handled link must not trigger top navigation");

  const explicitPopup = page.waitForEvent("popup");
  await frame.locator("#test-blank").click();
  const externalPage = await explicitPopup;
  await externalPage.waitForURL("https://evidence.invalid/new-tab");
  assert.equal(await externalPage.getByRole("heading", { name: "External evidence" }).count(), 1);
  assert.equal(page.url(), `${viewerUrl}#slide-2`);
  await externalPage.close();

  const modifiedPopup = context.waitForEvent("page");
  await frame.locator("#test-modified").click({ modifiers: [process.platform === "darwin" ? "Meta" : "Control"] });
  const modifiedPage = await modifiedPopup;
  await modifiedPage.waitForURL(`${f.base}/`);
  assert.equal(page.url(), `${viewerUrl}#slide-2`, "modified clicks retain browser new-tab behavior");
  await modifiedPage.close();

  const pendingDownload = page.waitForEvent("download");
  await frame.locator("#test-download").click();
  const download = await pendingDownload;
  assert.equal(download.suggestedFilename(), "evidence.pdf");
  assert.equal(await download.failure(), null);
  assert.equal(page.url(), `${viewerUrl}#slide-2`, "downloads must not navigate the viewer");
  assert.equal(new URL(frame.url()).pathname, "/decks/links/r1/deck.html");

  await frame.locator("#test-same-origin").click();
  await page.waitForURL(`${f.base}/`);
  assert.equal(await page.getByRole("heading", { name: "Public decks.", exact: true }).count(), 1);
  assert.equal(await page.locator("[data-deck-frame]").count(), 0, "same-origin site navigation must not be trapped inside the frame");
  frame = await openLinkedViewer();
  await frame.locator("#test-self").click();
  await page.waitForURL(`${f.base}/`);
  frame = await openLinkedViewer();
  await frame.locator("#test-external").click();
  await page.waitForURL("https://evidence.invalid/source");
  assert.equal(await page.getByRole("heading", { name: "External evidence" }).count(), 1);
  assert.equal(await page.locator("[data-deck-frame]").count(), 0, "ordinary external evidence opens as a top-level page");

  await openLinkedViewer();
  // Denied or cross-origin child loads are no longer active presentations and
  // must not crash the canonical wrapper's same-origin integration handler.
  for (const destination of ["/", "https://evidence.invalid/framed"]) {
    await page.locator("[data-deck-frame]").evaluate((frame, destination) => new Promise(resolve => {
      frame.addEventListener("load", resolve, { once: true });
      frame.src = destination;
    }), destination);
    assert.deepEqual(errors, [], "denied or cross-origin frames must not throw an unhandled SecurityError in the viewer");
    assert.equal(new URL(page.url()).pathname, "/decks/links/r1/");
  }
});
