#!/usr/bin/env node
/** Execute a trusted local authoring module through PptxGenJS's native API. */
import { spawnSync } from "node:child_process";
import { lstat, mkdir, mkdtemp, readFile, rename, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import pptxgen from "pptxgenjs";

const scripts = dirname(fileURLToPath(import.meta.url));

export async function buildPptx(source, output, { python = process.env.DECK_STUDIO_PYTHON || "python3" } = {}) {
  source = resolve(source);
  output = resolve(output);
  if (!source.endsWith(".mjs") || !output.endsWith(".pptx")) throw new Error("Use an .mjs authoring module and a .pptx output");
  const sourceStat = await lstat(source);
  if (!sourceStat.isFile() || sourceStat.isSymbolicLink()) throw new Error("Authoring source must be a regular local .mjs file");
  try {
    const outputStat = await lstat(output);
    if (!outputStat.isFile() || outputStat.isSymbolicLink()) throw new Error("Refusing to replace a non-regular output file");
  } catch (error) { if (error.code !== "ENOENT") throw error; }
  const { default: build } = await import(pathToFileURL(source).href);
  if (typeof build !== "function") throw new Error("Authoring module must default-export build(presentation, context)");
  const presentation = new pptxgen();
  presentation.layout = "LAYOUT_WIDE";
  presentation.author = "Deck Studio";
  presentation.subject = "Native editable presentation";
  presentation.lang = "en-US";
  await build(presentation, { PptxGenJS: pptxgen, sourceDir: dirname(source) });
  await mkdir(dirname(output), { recursive: true });
  const temporary = await mkdtemp(join(dirname(output), ".deck-studio-pptx-"));
  try {
    const candidate = join(temporary, "candidate.pptx");
    await presentation.writeFile({ fileName: candidate, compression: true });
    const probe = spawnSync(python, [join(scripts, "pptx_inspection.py"), candidate], {
      encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 4 * 1024 * 1024,
    });
    if (probe.error || probe.status !== 0) throw new Error(`Native package inspection failed: ${probe.error?.message || probe.stdout || probe.stderr}`);
    const inspection = JSON.parse(probe.stdout);
    await rename(candidate, output);
    return { ok: true, output, bytes: (await readFile(output)).length, native: inspection };
  } finally { await rm(temporary, { recursive: true, force: true }); }
}

async function main(args) {
  if (args.length === 1 && ["--help", "-h"].includes(args[0])) {
    console.log(`Usage: node build_pptx.mjs <authoring.mjs> <deck.pptx>

The trusted local module default-exports build(presentation, {PptxGenJS, sourceDir}).
Use the standard PptxGenJS API to create editable text, shapes, tables, charts,
images and speaker notes. The module is executable code, not sandboxed input.
The output is structurally inspected and atomically replaces an existing regular
output file. It is not visually accepted until rendered and inspected separately.
No PowerPoint, network access, service or proprietary artifact runtime is needed.
DECK_STUDIO_PYTHON selects the Python 3 executable used for package inspection.`);
    return;
  }
  if (args.length !== 2) throw new Error("Choose an authoring module and PPTX output; use --help");
  console.log(JSON.stringify(await buildPptx(args[0], args[1]), null, 2));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch(error => {
    console.error(JSON.stringify({ ok: false, error: error.message }));
    process.exitCode = 1;
  });
}
