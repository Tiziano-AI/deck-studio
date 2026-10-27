#!/usr/bin/env node
/** Prepare this skill's render dependencies; the host owns plugin installation. */
import { spawnSync } from "node:child_process";
import { accessSync, constants, existsSync, lstatSync, readFileSync, readdirSync, realpathSync, unlinkSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptPath = realpathSync(fileURLToPath(import.meta.url));
const { browserVersion } = await import(pathToFileURL(join(dirname(scriptPath), "browser_contract.mjs")));
const skillRoot = resolve(dirname(scriptPath), "..");
const installCommands = [
  ["npm", ["ci", "--ignore-scripts", "--omit=dev", "--workspaces=false", "--no-audit", "--no-fund"]],
  [process.execPath, ["scripts/install_browser.mjs"]],
];

function inside(root, path) {
  const value = relative(root, path);
  return value !== ".." && !value.startsWith(`..${sep}`) && !isAbsolute(value);
}

export function requireSupportedNode(version = process.versions.node) {
  const parts = /^(\d+)\.(\d+)\.(\d+)$/.exec(version)?.slice(1).map(Number);
  // Security fixes have a separate floor on each supported release line.
  // A numerically newer major (for example 26.0.0) can still be vulnerable.
  const floor = parts && { 24: [22, 1], 26: [12, 1] }[parts[0]];
  if (!floor || parts[1] < floor[0] || (parts[1] === floor[0] && parts[2] < floor[1])) {
    throw new Error(`Node.js >=24.22.1 <25 or >=26.12.1 <27 is required (found ${version})`);
  }
}

export function packageConfiguration(root) {
  const manifest = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  const lock = JSON.parse(readFileSync(join(root, "package-lock.json"), "utf8"));
  const locked = lock.packages?.[""];
  if (manifest.name !== "@tiziano-ai/deck-studio" || !existsSync(join(root, "SKILL.md"))) {
    throw new Error("Not a Deck Studio skill package");
  }
  const dependencies = (value) => JSON.stringify(Object.entries(value ?? {}).sort(([left], [right]) => left.localeCompare(right)));
  if (!locked || locked.name !== manifest.name || locked.version !== manifest.version ||
      dependencies(locked.dependencies) !== dependencies(manifest.dependencies)) {
    throw new Error("package.json and package-lock.json disagree; restore the package's matching lockfile");
  }
  for (const [name, version] of Object.entries(manifest.dependencies ?? {})) {
    if (!/^\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(version) || lock.packages[`node_modules/${name}`]?.version !== version) {
      throw new Error(`Dependency must have an exact matching lock: ${name}`);
    }
  }
  requireSupportedNode();
  const modules = join(root, "node_modules");
  let entry;
  try { entry = lstatSync(modules); } catch (error) { if (error.code !== "ENOENT") throw error; }
  if (entry) {
    if (!entry.isDirectory() || entry.isSymbolicLink()) {
      throw new Error("node_modules must be a package-owned directory, not a symlink or file");
    }
  }
  return { manifest, lock };
}

export function bundledSkillFiles(root) {
  const modules = join(root, "node_modules");
  if (!existsSync(modules)) return [];
  if (lstatSync(modules).isSymbolicLink()) throw new Error("Refusing a symlinked node_modules directory");
  const files = [];
  function visit(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      // Do not traverse dependency links into somebody else's package tree.
      if (entry.isDirectory()) visit(path);
      else if (entry.name === "SKILL.md") files.push(relative(root, path));
    }
  }
  visit(modules);
  return files.sort();
}

export function pruneBundledSkillFiles(root) {
  const files = bundledSkillFiles(root);
  for (const path of files) unlinkSync(join(root, path));
  return files;
}

export function installRuntime(root, run = spawnSync) {
  packageConfiguration(root);
  const removed = new Set();
  for (const [command, args] of installCommands) {
    let result;
    try {
      result = run(command, args, {
        cwd: root, env: { ...process.env, PLAYWRIGHT_BROWSERS_PATH: "0" },
        encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 16 * 1024 * 1024,
      });
      if (result.stdout) process.stderr.write(result.stdout);
      if (result.stderr) process.stderr.write(result.stderr);
    } finally {
      // Even a partial npm/browser failure must not leak extra discoverable skills.
      for (const path of pruneBundledSkillFiles(root)) removed.add(path);
    }
    if (result.error || result.status !== 0) {
      throw new Error(`${command} ${args.join(" ")} failed: ${result.error?.message ?? `exit ${result.status ?? result.signal}`}. The package may have partial runtime dependencies; correct the error and rerun --install.`);
    }
  }
  return [...removed].sort();
}

export async function checkRuntime(root) {
  const { manifest, lock } = packageConfiguration(root);
  const bundled = bundledSkillFiles(root);
  if (bundled.length) throw new Error(`Dependency SKILL.md files would be discovered as extra skills; run --install (${bundled.length} found)`);
  const require = createRequire(join(root, "package.json"));
  const modules = join(realpathSync(root), "node_modules");
  const versions = {};
  for (const name of [...Object.keys(manifest.dependencies), "playwright-core"]) {
    // Some upstream packages deliberately do not export package.json. Verify
    // the installed metadata AND the actual resolved executable entry instead.
    if (!existsSync(join(modules, name, "package.json"))) throw new Error(`Dependency is not package-local: ${name}`);
    const packageRoot = realpathSync(join(modules, name));
    const path = realpathSync(join(packageRoot, "package.json"));
    const entry = realpathSync(require.resolve(name));
    if (!inside(modules, path) || !inside(packageRoot, entry)) throw new Error(`Dependency is not package-local: ${name}`);
    const actual = JSON.parse(readFileSync(path, "utf8")).version;
    const expected = lock.packages[`node_modules/${name}`]?.version;
    if (actual !== expected) throw new Error(`Dependency version mismatch: ${name} (${actual}, expected ${expected})`);
    versions[name] = actual;
  }
  const { browserExecutable, launchBrowser } = await import(pathToFileURL(join(root, "scripts/browser_runtime.mjs")));
  const executable = browserExecutable();
  const browserRoot = join(modules, "playwright-core", ".local-browsers");
  if (!inside(browserRoot, executable)) throw new Error("Chromium is not package-local");
  accessSync(executable, constants.X_OK);
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage({ viewport: { width: 320, height: 180 } });
    await page.setContent("<!doctype html><title>Deck Studio runtime check</title><p>Ready</p>");
    await page.screenshot();
  } finally {
    await browser.close();
  }
  const { PDFDocument } = require("pdf-lib");
  const pdf = await PDFDocument.create();
  pdf.addPage([1920, 1080]);
  await pdf.save();
  const PptxGenJS = require("pptxgenjs");
  const native = new PptxGenJS();
  native.addSlide().addText("Deck Studio runtime check", { x: 1, y: 1, w: 8, h: 1 });
  await native.write({ outputType: "nodebuffer" });
  return { ready: true, package: realpathSync(root), versions, chromium: executable,
    probes: { chromium: "rendered", pdf: "created", nativePptx: "created" } };
}

async function main(args) {
  if (args.length === 1 && ["--help", "-h"].includes(args[0])) {
    console.log(`Usage: node setup_runtime.mjs --check | --install

--check    Verify this package's locked local dependencies, launch its Chromium,
           render an in-memory screenshot, and create in-memory PDF and editable
           PPTX files. No downloads. Native render QA separately needs LibreOffice
           and Poppler; check those with python3 scripts/render_pptx.py --check.
--install  Replace this package's node_modules using npm ci (lifecycle scripts off),
           download package-local Chrome for Testing ${browserVersion}, remove dependency SKILL.md files,
           then run the same check. Requires npm and network access.

JSON results go to stdout; install progress goes to stderr. Exit 0 means ready.
Run from any working directory. Does not install skills, edit host configuration,
retire older skills, or touch existing installation recovery state.
Uninstalling the plugin leaves your deck files and hosted library unchanged.`);
    return;
  }
  if (args.length !== 1 || !["--check", "--install"].includes(args[0])) {
    throw new Error("Choose exactly one of --check or --install; use --help for effects and prerequisites");
  }
  const removed = args[0] === "--install" ? installRuntime(skillRoot) : [];
  console.log(JSON.stringify({ ...await checkRuntime(skillRoot), pruned_bundled_skill_files: removed }, null, 2));
}

if (process.argv[1] && realpathSync(process.argv[1]) === scriptPath) {
  main(process.argv.slice(2)).catch((error) => {
    console.log(JSON.stringify({ ready: false, package: skillRoot, error: error.message, next: "Run --help, resolve the reported error, then use --install if setup is needed." }, null, 2));
    process.exitCode = 1;
  });
}
