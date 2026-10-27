/** Isolated setup effects and native package boundaries; no live skills touched. */
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { bundledSkillFiles, checkRuntime, installRuntime, packageConfiguration, pruneBundledSkillFiles, requireSupportedNode } from "../skills/deck-studio/scripts/setup_runtime.mjs";

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const setup = join(repo, "skills/deck-studio/scripts/setup_runtime.mjs");

function fixture(t) {
  const parent = mkdtempSync(join(tmpdir(), "decks-setup-test-"));
  t.after(() => rmSync(parent, { recursive: true, force: true }));
  const root = join(parent, "skill");
  mkdirSync(root);
  const manifest = { name: "@tiziano-ai/deck-studio", version: "0.1.0", dependencies: { "pdf-lib": "1.17.1", playwright: "1.61.1" } };
  const lock = { lockfileVersion: 3, packages: { "": manifest, "node_modules/pdf-lib": { version: "1.17.1" }, "node_modules/playwright": { version: "1.61.1" }, "node_modules/playwright-core": { version: "1.61.1" } } };
  writeFileSync(join(root, "package.json"), JSON.stringify(manifest));
  writeFileSync(join(root, "package-lock.json"), JSON.stringify(lock));
  writeFileSync(join(root, "SKILL.md"), "source skill");
  return { root, parent, manifest, lock };
}

function dependencySkill(root) {
  const dir = join(root, "node_modules/playwright-core/lib/tools/trace");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "SKILL.md"), "dependency instructions");
  writeFileSync(join(dir, "index.js"), "runtime code");
  return dir;
}

test("the security runtime floor is specific to each supported release line", () => {
  for (const version of ["20.20.2", "22.23.4", "24.21.9", "24.22.0", "24.22.1-rc.1", "25.0.0", "26.0.0", "26.12.0", "26.12.1-rc.1", "27.0.0"]) {
    assert.throws(() => requireSupportedNode(version), /Node.js >=24\.22\.1 <25 or >=26\.12\.1 <27 is required/);
  }
  for (const version of ["24.22.1", "24.22.2", "24.23.0", "26.12.1", "26.12.2", "26.13.0"]) {
    // Security admission is not an exact patch pin or producer qualification.
    assert.doesNotThrow(() => requireSupportedNode(version));
  }
});

test("an unpatched newer-major fixture refuses setup before installing any dependency", (t) => {
  const { root } = fixture(t);
  const descriptor = Object.getOwnPropertyDescriptor(process.versions, "node");
  let called = false;
  try {
    // Exercise the real setup gate on this executable, not an installed old Node.
    Object.defineProperty(process.versions, "node", { ...descriptor, value: "26.12.0" });
    assert.throws(() => installRuntime(root, () => { called = true; }), /found 26\.12\.0/);
  } finally {
    Object.defineProperty(process.versions, "node", descriptor);
  }
  assert.equal(called, false);
  assert.equal(existsSync(join(root, "node_modules")), false);
});

test("configuration requires a matching package lock before any install effect", (t) => {
  const { root, lock } = fixture(t);
  lock.packages["node_modules/playwright"].version = "0.0.0";
  writeFileSync(join(root, "package-lock.json"), JSON.stringify(lock));
  let called = false;
  assert.throws(() => installRuntime(root, () => { called = true; }), /exact matching lock/);
  assert.equal(called, false);
});

test("manifest and lock dependency order is immaterial, version drift is not", (t) => {
  const { root, lock } = fixture(t);
  lock.packages[""].dependencies = { playwright: "1.61.1", "pdf-lib": "1.17.1" };
  writeFileSync(join(root, "package-lock.json"), JSON.stringify(lock));
  assert.equal(packageConfiguration(root).manifest.version, "0.1.0");
  lock.packages[""].version = "0.2.0";
  writeFileSync(join(root, "package-lock.json"), JSON.stringify(lock));
  assert.throws(() => packageConfiguration(root), /disagree/);
});

test("install delegates only locked dependencies and hermetic Chromium to upstream tools", (t) => {
  const { root } = fixture(t);
  const calls = [];
  const removed = installRuntime(root, (command, args, options) => {
    calls.push({ command, args, options });
    if (calls.length === 1) dependencySkill(root);
    return { status: 0, stdout: "", stderr: "" };
  });
  assert.equal(calls.length, 2);
  assert.equal(calls[0].command, "npm");
  assert.deepEqual(calls[0].args, ["ci", "--ignore-scripts", "--omit=dev", "--workspaces=false", "--no-audit", "--no-fund"]);
  assert.equal(calls[1].command, process.execPath);
  assert.deepEqual(calls[1].args, ["node_modules/playwright/cli.js", "install", "chromium"]);
  for (const call of calls) {
    assert.equal(call.options.cwd, root);
    assert.equal(call.options.env.PLAYWRIGHT_BROWSERS_PATH, "0");
    assert.equal(call.options.stdio[0], "ignore");
  }
  assert.equal(removed.length, 1);
  assert.deepEqual(bundledSkillFiles(root), []);
});

test("a failed npm run still removes discoverable dependency skills and does not start Chromium install", (t) => {
  const { root } = fixture(t);
  let calls = 0;
  assert.throws(() => installRuntime(root, () => {
    calls++;
    dependencySkill(root);
    return { status: 1, stdout: "", stderr: "" };
  }), /partial runtime dependencies/);
  assert.equal(calls, 1);
  assert.deepEqual(bundledSkillFiles(root), []);
  assert.equal(readFileSync(join(root, "SKILL.md"), "utf8"), "source skill");
});

test("pruning preserves runtime code, the real skill and linked foreign trees", (t) => {
  const { root, parent } = fixture(t);
  const dir = dependencySkill(root);
  const foreign = join(parent, "foreign");
  mkdirSync(foreign);
  writeFileSync(join(foreign, "SKILL.md"), "foreign skill");
  symlinkSync(foreign, join(root, "node_modules/foreign"), "dir");
  assert.equal(pruneBundledSkillFiles(root).length, 1);
  assert.equal(readFileSync(join(dir, "index.js"), "utf8"), "runtime code");
  assert.equal(readFileSync(join(root, "SKILL.md"), "utf8"), "source skill");
  assert.equal(readFileSync(join(foreign, "SKILL.md"), "utf8"), "foreign skill");
});

test("setup rejects a linked runtime root without touching its foreign owner", (t) => {
  const { root, parent } = fixture(t);
  const foreign = join(parent, "foreign");
  mkdirSync(foreign);
  writeFileSync(join(foreign, "keep"), "foreign");
  symlinkSync(foreign, join(root, "node_modules"), "dir");
  assert.throws(() => installRuntime(root, () => assert.fail("must not execute npm")), /not a symlink/);
  assert.equal(readFileSync(join(foreign, "keep"), "utf8"), "foreign");
});

test("check refuses hoisted dependencies rather than borrowing another package's runtime", async (t) => {
  const { root, parent, manifest } = fixture(t);
  const modules = join(parent, "node_modules");
  for (const [name, version] of Object.entries(manifest.dependencies)) {
    mkdirSync(join(modules, name), { recursive: true });
    writeFileSync(join(modules, name, "package.json"), JSON.stringify({ name, version }));
  }
  await assert.rejects(checkRuntime(root), /not package-local/);
  assert.equal(existsSync(join(root, "node_modules")), false);
});

test("CLI help is reachable from another cwd and invalid modes cannot install", () => {
  const help = spawnSync(process.execPath, [setup, "--help"], { cwd: tmpdir(), encoding: "utf8" });
  assert.equal(help.status, 0);
  assert.match(help.stdout, /Does not install skills/);
  const invalid = spawnSync(process.execPath, [setup, "--apply"], { cwd: tmpdir(), encoding: "utf8" });
  assert.equal(invalid.status, 1);
  assert.equal(JSON.parse(invalid.stdout).ready, false);
  assert.match(JSON.parse(invalid.stdout).error, /exactly one/);
});

test("CLI invoked through a symlink still runs instead of silently succeeding", (t) => {
  const { parent } = fixture(t);
  const link = join(parent, "setup.mjs");
  symlinkSync(setup, link);
  for (const options of [[], ["--preserve-symlinks-main"]]) {
    const help = spawnSync(process.execPath, [...options, link, "--help"], { cwd: tmpdir(), encoding: "utf8" });
    assert.equal(help.status, 0);
    assert.match(help.stdout, /Usage: node setup_runtime.mjs/);
  }
});

test("portable and Claude packages expose the same identity and no automatic hooks or MCP", () => {
  const portable = JSON.parse(readFileSync(join(repo, "plugin.json"), "utf8"));
  const claude = JSON.parse(readFileSync(join(repo, ".claude-plugin/plugin.json"), "utf8"));
  const manifest = JSON.parse(readFileSync(join(repo, "package.json"), "utf8"));
  assert.equal(portable.name, "deck-studio");
  assert.equal(portable.version, manifest.version);
  for (const key of ["name", "version", "description", "author", "repository", "license", "keywords"]) assert.deepEqual(claude[key], portable[key]);
  assert.equal(portable.$schema, "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json");
  assert.equal(portable.license, "MIT");
  assert.equal(portable.skills, undefined);
  assert.equal(portable.hooks, undefined);
  assert.equal(portable.mcpServers, undefined);
  assert.equal(claude.hooks, undefined);
  assert.equal(claude.mcpServers, undefined);
  assert.equal(existsSync(join(repo, "skills/deck-studio/SKILL.md")), true);
});
