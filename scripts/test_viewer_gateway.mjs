// Synthetic accepted releases exercise the actual browser/gateway seam. These
// tests do not claim PDF rendering, visual acceptance or communication quality.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { fixture, writeRelease } from "../publisher/static-server/test/fixtures.mjs";

if (!process.env.DECKS_TEST_SKILL_ROOT) throw new Error("Set DECKS_TEST_SKILL_ROOT to a complete prepared Deck Studio package");
const producer = resolve(process.env.DECKS_TEST_SKILL_ROOT);
const { chromium } = await import(pathToFileURL(join(producer, "scripts/browser_runtime.mjs")));

async function selected(f, id) {
  const release = writeRelease(f.libraryRoot, id);
  const response = await f.api(`decks/${id}/publish`, { release_id: "r1" });
  assert.equal(response.status, 200, response.text);
  return release;
}

async function currentSlide(page, number) {
  await page.waitForFunction(expected => {
    const child = document.querySelector("[data-deck-frame]")?.contentWindow;
    return child?.WebSlidesStudio?.current() === expected - 1 && location.hash === `#slide-${expected}`;
  }, number);
}

async function assertViewerBounds(page, viewport) {
  const bounds = await page.evaluate(() => {
    const rect = selector => {
      const { x, y, width, height, right, bottom } = document.querySelector(selector).getBoundingClientRect();
      return { x, y, width, height, right, bottom };
    };
    return { bar: rect(".viewer-bar"), frame: rect("[data-deck-frame]"), link: rect("[data-viewer-return]"),
      scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth };
  });
  assert.ok(bounds.bar.height > 0);
  assert.ok(bounds.link.width > 0 && bounds.link.height > 0);
  assert.ok(bounds.link.x >= 0 && bounds.link.right <= viewport.width + 1, "return link stays in the viewport");
  assert.ok(bounds.frame.y >= bounds.bar.bottom - 1, "the library bar must not overlay the slide frame");
  assert.ok(bounds.frame.width > 0 && bounds.frame.height > 0);
  assert.ok(bounds.frame.x >= 0 && bounds.frame.right <= viewport.width + 1);
  assert.ok(bounds.frame.bottom <= viewport.height + 1);
  assert.equal(bounds.scrollWidth, bounds.clientWidth, "no horizontal viewport overflow");
}

test("real viewers retain slide navigation and a direct, accessible return to the correct gallery", async t => {
  const f = await fixture(t);
  const publicRelease = await selected(f, "public");
  await selected(f, "private");
  writeRelease(f.libraryRoot, "private", "hidden");
  await f.api("decks/public/public", { public: true });
  const key = (await f.api("keys", { label: "Team", scope: "collection" })).json.data;
  const wrong = (await f.api("keys", { label: "Wrong team", scope: "collection" })).json.data;
  await f.api("decks/private/grant", { key_id: key.key_id });
  await f.api("decks/public/grant", { key_id: key.key_id });
  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());

  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(f.base);
    await page.getByRole("link", { name: "Open Title-public", exact: true }).click();
    await currentSlide(page, 1);
    assert.equal(new URL(await page.locator("[data-deck-frame]").getAttribute("src")).pathname, "/decks/public/r1/deck.html");
    assert.equal(await page.locator("[data-viewer-return]").getAttribute("href"), "/");
    assert.equal(await page.getByRole("link", { name: "Back to public decks", exact: true }).count(), 1);
    await assertViewerBounds(page, viewport);
    assert.equal(await page.locator("[data-deck-frame]").evaluate(frame => document.activeElement === frame), true,
      "the initial keyboard target must be the presentation");
    await page.keyboard.press("ArrowRight");
    await currentSlide(page, 2);
    await page.keyboard.press("End");
    await currentSlide(page, 3);
    await page.reload();
    await currentSlide(page, 3);
    await page.keyboard.press("Home");
    await currentSlide(page, 1);
    await page.keyboard.press("ArrowRight");
    await currentSlide(page, 2);
    await page.keyboard.press("Escape");
    await currentSlide(page, 2);
    assert.match(page.url(), /\/decks\/public\/r1\//, "Escape does not unexpectedly leave the presentation");

    // Shift+Tab exits the initially focused frame to the visible preceding link;
    // a slide change must not pull focus back from the library's navigation.
    await page.keyboard.press("Shift+Tab");
    await page.waitForFunction(() => document.activeElement?.matches("[data-viewer-return]"));
    const frame = page.frames().find(candidate => candidate !== page.mainFrame());
    await frame.evaluate(() => WebSlidesStudio.goTo(2));
    await currentSlide(page, 3);
    assert.equal(await page.locator("[data-viewer-return]").evaluate(link => document.activeElement === link), true);
    await page.keyboard.press("Enter");
    await page.waitForURL(`${f.base}/`);
    assert.equal(await page.getByRole("heading", { name: "Public decks.", exact: true }).count(), 1);
    assert.deepEqual(errors, []);
    await context.close();
  }

  const session = await f.login(key.secret);
  const keyed = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await keyed.addCookies([{ name: "decks_session", value: session.cookie.split("=").slice(1).join("="), url: f.base }]);
  const page = await keyed.newPage();
  await page.goto(`${f.base}/collection`);
  await page.getByRole("link", { name: "Open Title-private", exact: true }).click();
  await currentSlide(page, 1);
  assert.equal(await page.locator("[data-viewer-return]").getAttribute("href"), "/collection");
  await page.keyboard.press("End");
  await currentSlide(page, 3);
  await page.getByRole("link", { name: "Back to collection", exact: true }).click();
  await page.waitForURL(`${f.base}/collection`);
  assert.equal(await page.getByRole("heading", { name: "Your collection.", exact: true }).count(), 1);

  // A copied deep link restores its slide without an arrival-history assumption.
  await page.goto(`${f.base}/decks/private/r1/#slide-2`);
  await currentSlide(page, 2);
  await page.reload();
  await currentSlide(page, 2);
  await page.getByRole("link", { name: "Back to collection", exact: true }).click();
  await page.waitForURL(`${f.base}/collection`);
  // Navigation chosen while the frame is loading remains the user's focus;
  // a late child load must not steal it to make keyboard slide navigation work.
  let releaseFrame;
  let reportFrameRequest;
  const frameHeld = new Promise(resolve => { reportFrameRequest = resolve; });
  const frameReleased = new Promise(resolve => { releaseFrame = resolve; });
  await page.route(`${f.base}/decks/private/r1/deck.html*`, async route => {
    reportFrameRequest();
    await frameReleased;
    await route.continue();
  });
  await page.goto(`${f.base}/decks/private/r1/`, { waitUntil: "domcontentloaded" });
  await frameHeld;
  await page.locator("[data-viewer-return]").focus();
  releaseFrame();
  await currentSlide(page, 1);
  assert.equal(await page.locator("[data-viewer-return]").evaluate(link => document.activeElement === link), true);
  await page.unroute(`${f.base}/decks/private/r1/deck.html*`);
  // An authenticated reader who starts in the public gallery returns there,
  // rather than being silently redirected to the keyed collection.
  await page.goto(f.base);
  await page.getByRole("link", { name: "Open Title-public", exact: true }).click();
  await currentSlide(page, 1);
  await page.getByRole("link", { name: "Back to public decks", exact: true }).click();
  await page.waitForURL(`${f.base}/`);

  const raw = await page.request.get(`${f.base}/decks/public/r1/deck.html`);
  assert.equal(await raw.text(), readFileSync(join(publicRelease.directory, "deck.html"), "utf8"));
  assert.doesNotMatch(await raw.text(), /data-viewer-return|viewer-bar/);
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
  const browser = await chromium.launch({ headless: true });
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
    const frame = page.frames().find(candidate => candidate !== page.mainFrame());
    await frame.evaluate(() => {
      const nav = document.createElement("nav");
      nav.style.cssText = "position:fixed;top:20px;left:20px;z-index:100;display:flex;gap:16px;background:white;padding:16px;font:18px sans-serif";
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
  // A frame can still become inaccessible through author scripts or a denied
  // response. Its load handler must leave the library's return control usable.
  for (const destination of ["/", "https://evidence.invalid/framed"]) {
    await page.locator("[data-deck-frame]").evaluate((frame, destination) => new Promise(resolve => {
      frame.addEventListener("load", resolve, { once: true });
      frame.src = destination;
    }), destination);
    assert.deepEqual(errors, [], "denied or cross-origin frames must not throw an unhandled SecurityError in the viewer");
    assert.equal(new URL(page.url()).pathname, "/decks/links/r1/");
  }
  await page.getByRole("link", { name: "Back to public decks", exact: true }).click();
  await page.waitForURL(`${f.base}/`);
});
