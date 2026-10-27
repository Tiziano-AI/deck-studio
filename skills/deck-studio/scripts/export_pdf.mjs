#!/usr/bin/env node
/**
 * Screenshot-based PDF export for Deck Studio decks.
 *
 * Input: deck.html, output.pdf, optional --compact and --proof report.json.
 * Output: PDF plus JSON proof report.
 * Side effects: starts a local HTTP server during the run and writes output files.
 */

import { mkdir, stat, writeFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { launchBrowser } from "./browser_runtime.mjs";
import { PDFDocument } from "pdf-lib";
import { identity, sourceCapture } from "./proof_identity.mjs";
import { createStaticServer, observeErrors, prepareDeck, captureSlide, safeError } from "./capture_runtime.mjs";
import { LIBRARY_DELIVERY } from "./delivery_profile.mjs";

function usage() {
  console.error("usage: export_pdf.mjs <deck.html> <output.pdf> [--compact] [--proof report.json] [--delivery local|library]");
  process.exit(1);
}

function parseArgs(argv) {
  const deck = argv[2];
  const pdf = argv[3];
  if (!deck || !pdf) usage();
  const proofIndex = argv.indexOf("--proof");
  if (proofIndex !== -1 && !argv[proofIndex + 1]) usage();
  const deliveryIndex = argv.indexOf("--delivery");
  const delivery = deliveryIndex === -1 ? "local" : argv[deliveryIndex + 1];
  if (!["local", "library"].includes(delivery)) usage();
  return {
    deck: resolve(deck),
    pdf: resolve(pdf),
    compact: argv.includes("--compact"),
    proof: proofIndex === -1 ? null : resolve(argv[proofIndex + 1]),
    delivery,
  };
}

async function run() {
  const args = parseArgs(process.argv);
  await mkdir(dirname(args.pdf), { recursive: true });
  if (args.proof) await mkdir(dirname(args.proof), { recursive: true });

  const viewport = args.compact ? { width: 1280, height: 720 } : { width: 1920, height: 1080 };
  const capture = sourceCapture(dirname(args.deck));
  let server;
  let browser;
  const report = {
    schema_version: 2,
    ok: false,
    deck: basename(args.deck),
    pdf: basename(args.pdf),
    compact: args.compact,
    viewport,
    slideCount: 0,
    pageCount: 0,
    bytes: 0,
    errors: ["capture_incomplete"],
  };
  if (args.delivery === "library") report.delivery_profile = LIBRARY_DELIVERY;
  if (args.proof) await writeFile(args.proof, `${JSON.stringify(report, null, 2)}\n`);

  try {
    await stat(args.deck);
    const serving = await createStaticServer(dirname(args.deck), basename(args.deck), capture, { delivery: args.delivery });
    server = serving.server;
    const { url } = serving;
    browser = await launchBrowser();
    const page = await browser.newPage({ viewport });
    capture.observe(page, new URL(url).origin);
    const checkErrors = observeErrors(page);
    await prepareDeck(page, url, checkErrors);
    report.errors = [];
    const slideCount = await page.evaluate(() => document.querySelectorAll(".slide").length);
    report.slideCount = slideCount;
    if (slideCount < 1) throw new Error("no .slide elements found");

    const pdfDoc = await PDFDocument.create();
    for (let index = 0; index < slideCount; index += 1) {
      const png = await captureSlide(page, index, "pdf", checkErrors);
      const image = await pdfDoc.embedPng(png);
      const pdfPage = pdfDoc.addPage([viewport.width, viewport.height]);
      pdfPage.drawImage(image, { x: 0, y: 0, width: viewport.width, height: viewport.height });
    }

    const bytes = await pdfDoc.save();
    const loaded = await PDFDocument.load(bytes);
    report.pageCount = loaded.getPageCount();
    report.bytes = bytes.length;
    report.source = await capture.finish();
    checkErrors();
    await writeFile(args.pdf, bytes);
    report.artifact = identity(basename(args.pdf), bytes);
    report.ok = report.pageCount === report.slideCount && report.bytes > 0;
  } catch (error) {
    report.ok = false;
    report.errors.push(safeError(error));
  } finally {
    await browser?.close();
    if (server) await new Promise((done) => server.close(done));
  }

  if (args.proof) await writeFile(args.proof, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
  if (!report.ok) process.exit(1);
}

run().catch(async (error) => {
  console.error(JSON.stringify({ ok: false, error: error.message }, null, 2));
  process.exit(1);
});
