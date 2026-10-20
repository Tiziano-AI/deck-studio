// Shared QA/PDF capture: the same resources, final frames and failure rules.
import { createServer } from "node:http";
import { lstat } from "node:fs/promises";
import { extname, join, resolve, relative, sep } from "node:path";
import { audienceArtifact, DECK_CSP, presentationBase, presentationType } from "./delivery_profile.mjs";

const MIME = new Map(Object.entries({
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".webp": "image/webp",
  ".gif": "image/gif", ".avif": "image/avif", ".woff": "font/woff", ".woff2": "font/woff2",
}));

export async function createStaticServer(root, htmlName, capture, { delivery = "local" } = {}) {
  if (!["local", "library"].includes(delivery)) throw new Error("invalid_delivery_destination");
  const library = delivery === "library";
  const base = library ? presentationBase("qa", "candidate") : "/";
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
      if (library && !["GET", "HEAD"].includes(request.method)) {
        response.writeHead(405).end("method not allowed");
        return;
      }
      if (!pathname.startsWith(base)) {
        response.writeHead(404).end("not found");
        return;
      }
      const leaf = pathname.slice(base.length) || "deck.html";
      if (library && !audienceArtifact(leaf)) {
        response.writeHead(404).end("not found");
        return;
      }
      const source = leaf === "deck.html" ? htmlName : leaf;
      const file = resolve(root, source);
      const rel = relative(root, file);
      if (!rel || rel === ".." || rel.startsWith(`..${sep}`)) {
        response.writeHead(403).end("forbidden");
        return;
      }
      if (library) {
        // The audience gateway refuses symlinks, including in parent segments.
        let current = root;
        for (const part of source.split("/")) {
          current = join(current, part);
          if ((await lstat(current)).isSymbolicLink()) throw new Error("symlink_resource");
        }
      }
      const bytes = await capture.read(file);
      response.writeHead(200, {
        "content-type": library ? presentationType(leaf) : (MIME.get(extname(file)) ?? "application/octet-stream"),
        ...(library ? { "content-security-policy": DECK_CSP } : {}),
      });
      response.end(request.method === "HEAD" ? undefined : bytes);
    } catch {
      response.writeHead(404).end("not found");
    }
  });
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolveListen);
  });
  return { server, url: `http://127.0.0.1:${server.address().port}${base}` };
}

// Attach before navigation. Browser favicon discovery is not a deck resource.
export function observeErrors(page) {
  const errors = new Set();
  const relevant = (request) => {
    try { return !new URL(request.url()).pathname.endsWith("/favicon.ico"); }
    catch { return true; }
  };
  // Install in every document before scripts. Keep only directive names, never
  // blocked URLs (which may contain secrets) or raw browser/provider logs.
  const ready = page.exposeFunction("__decksCaptureCspFailure", (directive) => {
    errors.add(`csp_${String(directive).replace(/[^a-z-]/g, "").slice(0, 64) || "violation"}`);
  }).then(() => page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", (event) => {
      void window.__decksCaptureCspFailure(event.effectiveDirective);
    });
  }));
  page.on("pageerror", () => errors.add("page_javascript_error"));
  page.on("console", (message) => {
    const location = message.location().url;
    let favicon = false;
    try { favicon = location && new URL(location).pathname.endsWith("/favicon.ico"); } catch { /* no URL */ }
    if (message.type() === "error" && !favicon) errors.add("browser_console_error");
  });
  page.on("requestfailed", (request) => {
    if (relevant(request)) errors.add(`failed_${request.resourceType()}_request`);
  });
  page.on("response", (response) => {
    if (response.status() >= 400 && relevant(response.request())) {
      errors.add(`http_${response.status()}_${response.request().resourceType()}`);
    }
  });
  const check = () => {
    if (errors.size) throw new Error([...errors].join(", "));
  };
  check.ready = ready;
  return check;
}

export async function prepareDeck(page, url, checkErrors) {
  await checkErrors.ready;
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.documentElement.dataset.webSlidesReady === "true" &&
    typeof window.WebSlidesStudio?.goTo === "function", null, { timeout: 5000 });
  // Eagerly load hidden-slide images too; otherwise a lazy image may never enter
  // the viewport until after its proof has already been captured.
  await page.evaluate(() => { for (const image of document.images) image.loading = "eager"; });
  await page.addStyleTag({ content: ".deck-controls { display: none !important; }" });
  checkErrors();
}

export async function captureSlide(page, index, reason, checkErrors) {
  await page.evaluate(({ index, reason }) => window.WebSlidesStudio.goTo(index, reason), { index, reason });
  await page.waitForLoadState("networkidle", { timeout: 10000 });
  await page.evaluate(async () => {
    let timer;
    try {
      await Promise.race([
        (async () => {
          await document.fonts.ready;
          for (const face of document.fonts) if (face.status === "error") throw new Error("failed_font");
          await Promise.all([...document.images].filter((image) => image.currentSrc || image.src).map(async (image) => {
            await image.decode();
            if (!image.naturalWidth) throw new Error("failed_image");
          }));
          const animations = document.getAnimations().filter((animation) => animation.playState !== "finished");
          if (animations.some((animation) => animation.effect?.getComputedTiming().iterations === Infinity)) {
            throw new Error("continuous_animation_has_no_final_frame");
          }
          await Promise.all(animations.map((animation) => animation.finished.catch(() => undefined)));
        })(),
        new Promise((_, reject) => { timer = setTimeout(() => reject(new Error("render_readiness_timeout")), 10000); }),
      ]);
    } finally { clearTimeout(timer); }
  });
  let previous;
  let matches = 0;
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline) {
    checkErrors();
    await page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))));
    const frame = await page.screenshot({ type: "png", fullPage: false, caret: "hide" });
    matches = previous?.equals(frame) ? matches + 1 : 0;
    if (matches >= 2) {
      checkErrors();
      const valid = await page.evaluate((expected) => {
        const active = [...document.querySelectorAll(".slide")].filter((slide) =>
          slide.classList.contains("active") || slide.classList.contains("visible"));
        return window.WebSlidesStudio.current() === expected && active.length === 1 &&
          Number(getComputedStyle(active[0]).opacity) === 1;
      }, index);
      if (!valid) throw new Error("capture_slide_state_mismatch");
      return frame;
    }
    previous = frame;
    await page.waitForTimeout(100);
  }
  throw new Error("render_frame_did_not_stabilize");
}

export function safeError(error) {
  // Proof artifacts carry diagnostics, never local source paths or browser logs.
  const message = String(error?.message ?? error);
  if (/^[a-z][a-z0-9_-]*(?:, [a-z][a-z0-9_-]*)*$/.test(message)) return message.slice(0, 512);
  if (message.startsWith("source changed during rendering:")) return "source_changed_during_rendering";
  if (message.includes("escapes source root")) return "resource_outside_source";
  if (message.includes("failed_image") || message.includes("EncodingError")) return "failed_image";
  if (message.includes("failed_font")) return "failed_font";
  if (message.includes("continuous_animation_has_no_final_frame")) return "continuous_animation_has_no_final_frame";
  if (message.includes("render_readiness_timeout")) return "render_readiness_timeout";
  return "capture_failed";
}
