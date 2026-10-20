#!/usr/bin/env node
/**
 * Render QA for Deck Studio decks.
 *
 * Input: deck.html and --out proof directory.
 * Output: proof/report.json, proof/contact-sheet.html, and desktop/phone screenshots.
 * Side effects: starts a local HTTP server during the run and writes proof files.
 */

import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { join, resolve, basename, dirname } from "node:path";
import { chromium } from "./browser_runtime.mjs";
import { identity, sourceCapture } from "./proof_identity.mjs";
import { createStaticServer, observeErrors, prepareDeck, captureSlide, safeError } from "./capture_runtime.mjs";
import { LIBRARY_DELIVERY } from "./delivery_profile.mjs";

function usage() {
  console.error("usage: render_qa.mjs <deck.html> --out <proof-dir> [--delivery local|library]");
  process.exit(1);
}

function parseArgs(argv) {
  const deck = argv[2];
  const outFlag = argv.indexOf("--out");
  if (!deck || outFlag === -1 || !argv[outFlag + 1]) usage();
  const deliveryFlag = argv.indexOf("--delivery");
  const delivery = deliveryFlag === -1 ? "local" : argv[deliveryFlag + 1];
  if (!["local", "library"].includes(delivery)) usage();
  return { deck: resolve(deck), outDir: resolve(argv[outFlag + 1]), delivery };
}

async function inspectPage(page) {
  return page.evaluate(() => {
    const HARD_MIN_FONT_PX = 11;
    const WARNING_MIN_FONT_PX = 13;
    const DENSITY_WORD_WARNING = 180;
    const DENSITY_CHAR_WARNING = 1200;
    const OVERLAP_WARNING_RATIO = 0.18;
    const SCROLL_TOLERANCE = 2;
    const BOUNDS_TOLERANCE = 2;

    function normalizedText(element) {
      return String(element.textContent ?? "").replace(/\s+/g, " ").trim();
    }

    function hasOwnText(element) {
      return Array.from(element.childNodes).some(
        (node) => node.nodeType === Node.TEXT_NODE && String(node.textContent ?? "").trim().length > 0,
      );
    }

    function describeElement(element, extra = {}) {
      return {
        tag: element.tagName.toLowerCase(),
        className: String(element.className).slice(0, 120),
        text: normalizedText(element).slice(0, 120),
        ...extra,
      };
    }

    function isVisibleElement(element) {
      const style = window.getComputedStyle(element);
      if (style.visibility === "hidden" || style.display === "none" || Number(style.opacity) === 0) return false;
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return false;
      return true;
    }

    function overlapRatio(a, b) {
      const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
      const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
      const overlapArea = width * height;
      if (overlapArea <= 0) return 0;
      const aArea = Math.max(1, a.width * a.height);
      const bArea = Math.max(1, b.width * b.height);
      return overlapArea / Math.min(aArea, bArea);
    }

    const slides = Array.from(document.querySelectorAll(".slide"));
    const active = slides.filter((slide) => slide.classList.contains("active") || slide.classList.contains("visible"));
    const stage = document.querySelector(".deck-stage");
    const stageRect = stage ? stage.getBoundingClientRect() : null;
    const activeSlide = active[0] ?? null;
    const activeRect = activeSlide ? activeSlide.getBoundingClientRect() : null;
    const viewportScroll = {
      documentX: document.documentElement.scrollWidth > window.innerWidth + 1,
      documentY: document.documentElement.scrollHeight > window.innerHeight + 1,
      bodyX: document.body.scrollWidth > window.innerWidth + 1,
      bodyY: document.body.scrollHeight > window.innerHeight + 1,
    };

    const overflowElements = [];
    const clippingElements = [];
    const smallFontElements = [];
    const smallFontWarnings = [];
    const overlapWarnings = [];
    const densityWarnings = [];
    const textCandidates = [];
    let minFontPx = null;
    let visibleText = "";

    if (activeSlide && activeRect) {
      for (const element of Array.from(activeSlide.querySelectorAll("*"))) {
        if (!isVisibleElement(element)) continue;
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const overflows =
          rect.left < activeRect.left - BOUNDS_TOLERANCE ||
          rect.top < activeRect.top - BOUNDS_TOLERANCE ||
          rect.right > activeRect.right + BOUNDS_TOLERANCE ||
          rect.bottom > activeRect.bottom + BOUNDS_TOLERANCE;
        if (overflows) {
          overflowElements.push(describeElement(element));
        }

        const text = normalizedText(element);
        if (text.length > 0) {
          visibleText += `${text} `;
        }

        const clipsY = style.overflowY !== "visible" && style.overflowY !== "unset" && style.overflowY !== "initial";
        const clipsX = style.overflowX !== "visible" && style.overflowX !== "unset" && style.overflowX !== "initial";
        const scrollClipped =
          text.length > 0 &&
          ((clipsY && element.scrollHeight > Math.ceil(element.clientHeight) + SCROLL_TOLERANCE) ||
            (clipsX && element.scrollWidth > Math.ceil(element.clientWidth) + SCROLL_TOLERANCE));
        if (scrollClipped) {
          clippingElements.push(
            describeElement(element, {
              clientWidth: element.clientWidth,
              clientHeight: element.clientHeight,
              scrollWidth: element.scrollWidth,
              scrollHeight: element.scrollHeight,
              overflowX: style.overflowX,
              overflowY: style.overflowY,
            }),
          );
        }

        if (hasOwnText(element)) {
          const fontSize = Number.parseFloat(style.fontSize);
          if (Number.isFinite(fontSize)) {
            minFontPx = minFontPx === null ? fontSize : Math.min(minFontPx, fontSize);
            if (fontSize < HARD_MIN_FONT_PX) {
              smallFontElements.push(describeElement(element, { fontSizePx: fontSize }));
            } else if (fontSize < WARNING_MIN_FONT_PX) {
              smallFontWarnings.push(describeElement(element, { fontSizePx: fontSize }));
            }
          }
          textCandidates.push({ element, rect, text });
        }
      }

      for (let leftIndex = 0; leftIndex < textCandidates.length; leftIndex += 1) {
        const left = textCandidates[leftIndex];
        for (let rightIndex = leftIndex + 1; rightIndex < textCandidates.length; rightIndex += 1) {
          const right = textCandidates[rightIndex];
          if (left.element.contains(right.element) || right.element.contains(left.element)) continue;
          const ratio = overlapRatio(left.rect, right.rect);
          if (ratio > OVERLAP_WARNING_RATIO) {
            overlapWarnings.push({
              ratio: Number(ratio.toFixed(3)),
              a: describeElement(left.element),
              b: describeElement(right.element),
            });
            if (overlapWarnings.length >= 20) break;
          }
        }
        if (overlapWarnings.length >= 20) break;
      }
    }

    const compactText = visibleText.replace(/\s+/g, " ").trim();
    const textWords = compactText ? compactText.split(/\s+/).length : 0;
    if (textWords > DENSITY_WORD_WARNING || compactText.length > DENSITY_CHAR_WARNING) {
      densityWarnings.push({
        textChars: compactText.length,
        textWords,
        reason: "dense slide text requires de visu judgment and may need a split instead of smaller type",
      });
    }

    const fontWarnings = [];
    if (document.fonts) {
      for (const fontFace of Array.from(document.fonts)) {
        if (fontFace.status !== "loaded") {
          fontWarnings.push({
            family: fontFace.family,
            status: fontFace.status,
            weight: fontFace.weight,
            style: fontFace.style,
          });
        }
      }
    }

    const hardFailures = [];
    if (overflowElements.length > 0) hardFailures.push("slide_bounds_overflow");
    if (clippingElements.length > 0) hardFailures.push("internal_clipping");
    if (smallFontElements.length > 0) hardFailures.push("hard_microtype");

    return {
      ready: document.documentElement.dataset.webSlidesReady === "true",
      slideCount: slides.length,
      activeCount: active.length,
      scale: Number(stage?.dataset.scale ?? "0"),
      stageRect,
      activeRect,
      viewportScroll,
      overflowElements,
      clippingElements,
      smallFontElements,
      smallFontWarnings,
      overlapWarnings,
      densityWarnings,
      fontWarnings,
      hardFailures,
      minFontPx,
      textChars: compactText.length,
      textWords,
    };
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildContactSheet(report) {
  const sections = [];
  for (const viewport of report.viewports) {
    const cards = viewport.slides
      .map((slide) => {
        const fileName = `screenshots/${basename(slide.screenshot)}`;
        const failures = slide.probe.hardFailures.length ? slide.probe.hardFailures.join(", ") : "none";
        const warnings =
          slide.probe.smallFontWarnings.length +
          slide.probe.overlapWarnings.length +
          slide.probe.densityWarnings.length +
          slide.probe.fontWarnings.length;
        return `<article class="card ${slide.ok ? "pass" : "fail"}">
  <h3>${escapeHtml(viewport.name)} · slide ${slide.index}</h3>
  <img src="${escapeHtml(fileName)}" alt="${escapeHtml(viewport.name)} slide ${slide.index}">
  <p><strong>ok:</strong> ${slide.ok ? "true" : "false"} · <strong>hard failures:</strong> ${escapeHtml(failures)} · <strong>warnings:</strong> ${warnings}</p>
</article>`;
      })
      .join("\n");
    sections.push(`<section><h2>${escapeHtml(viewport.name)} ${viewport.width}×${viewport.height}</h2><div class="grid">${cards}</div></section>`);
  }
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Deck Studio QA Contact Sheet</title>
  <style>
    body{margin:0;padding:32px;background:#111;color:#eee;font:14px/1.45 system-ui,sans-serif}
    h1,h2{margin:0 0 18px} h2{margin-top:36px}
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:18px}
    .card{border:1px solid #333;background:#1b1b1b;padding:12px}
    .card.fail{border-color:#ff6b6b}.card.pass{border-color:#3a6}
    .card h3{margin:0 0 10px;font-size:14px}
    img{display:block;width:100%;height:auto;background:#000}
    p{margin:10px 0 0;color:#ccc}
  </style>
</head>
<body>
  <h1>Deck Studio QA Contact Sheet</h1>
  ${sections.join("\n")}
</body>
</html>
`;
}

async function run() {
  const { deck, outDir, delivery } = parseArgs(process.argv);
  await mkdir(join(outDir, "screenshots"), { recursive: true });

  const root = dirname(deck);
  const htmlName = basename(deck);
  const capture = sourceCapture(root);
  let server;
  let browser;
  const viewports = [
    { name: "desktop", width: 1920, height: 1080 },
    { name: "phone", width: 390, height: 844 },
  ];
  const report = { schema_version: 3, ok: false, deck: htmlName, viewports: [], errors: ["capture_incomplete"], proof_files: [] };
  if (delivery === "library") report.delivery_profile = LIBRARY_DELIVERY;
  await writeFile(join(outDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);

  try {
    await stat(deck);
    const serving = await createStaticServer(root, htmlName, capture, { delivery });
    server = serving.server;
    const { url } = serving;
    browser = await chromium.launch({ headless: true });
    report.ok = true;
    report.errors = [];
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
      capture.observe(page, new URL(url).origin);
      const checkErrors = observeErrors(page);
      await prepareDeck(page, url, checkErrors);
      const firstProbe = await inspectPage(page);
      const slideCount = firstProbe.slideCount;
      const slides = [];

      for (let index = 0; index < slideCount; index += 1) {
        const frame = await captureSlide(page, index, "qa", checkErrors);
        const probe = await inspectPage(page);
        const fileName = `${viewport.name}-slide-${String(index + 1).padStart(2, "0")}.png`;
        const screenshotPath = join(outDir, "screenshots", fileName);
        await writeFile(screenshotPath, frame);
        const screenshotBytes = (await stat(screenshotPath)).size;
        const slideOk =
          probe.ready &&
          probe.activeCount === 1 &&
          probe.scale > 0 &&
          !Object.values(probe.viewportScroll).some(Boolean) &&
          probe.overflowElements.length === 0 &&
          probe.clippingElements.length === 0 &&
          probe.smallFontElements.length === 0 &&
          screenshotBytes > 0;
        if (!slideOk) report.ok = false;
        const screenshot = `screenshots/${fileName}`;
        report.proof_files.push(identity(screenshot, await readFile(screenshotPath)));
        slides.push({ index: index + 1, ok: slideOk, screenshot, screenshotBytes, probe });
      }

      report.viewports.push({ ...viewport, slideCount, slides });
      await page.close();
    }
    report.source = await capture.finish();
  } catch (error) {
    report.ok = false;
    report.errors.push(safeError(error));
  } finally {
    await browser?.close();
    if (server) await new Promise((done) => server.close(done));
  }

  const contactSheetPath = join(outDir, "contact-sheet.html");
  report.contactSheet = "contact-sheet.html";
  await writeFile(contactSheetPath, buildContactSheet(report));
  report.proof_files.push(identity("contact-sheet.html", await readFile(contactSheetPath)));
  await writeFile(join(outDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ ok: report.ok, report: join(outDir, "report.json") }, null, 2));
  if (!report.ok) process.exit(1);
}

run().catch((error) => {
  console.error(JSON.stringify({ ok: false, error: error.message }, null, 2));
  process.exit(1);
});
