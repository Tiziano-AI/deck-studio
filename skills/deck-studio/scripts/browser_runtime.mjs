import { spawnSync } from "node:child_process";
import { realpathSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { Browser, computeExecutablePath } from "@puppeteer/browsers";
import { chromium } from "playwright";
import { browserVersion, qualifiedBrowserVersion } from "./browser_contract.mjs";

// setup_runtime.mjs acquires exact official CfT inside this package. Do not use
// Playwright's older bundled build, a personal Chrome or a shared browser cache.
export const browserRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../node_modules/playwright-core/.local-browsers");
export function browserExecutable() {
  const executable = realpathSync(computeExecutablePath({ browser: Browser.CHROME, buildId: browserVersion, cacheDir: browserRoot }));
  const path = relative(browserRoot, executable);
  if (path === ".." || path.startsWith(`..${sep}`) || isAbsolute(path)) throw new Error("Chrome for Testing is not package-local");
  const version = spawnSync(executable, ["--version"], { encoding: "utf8", timeout: 10000 });
  if (version.status !== 0 || !qualifiedBrowserVersion(version.stdout)) throw new Error(`Expected package-owned Chrome for Testing ${browserVersion}; run setup_runtime.mjs --install`);
  return executable;
}
export const launchBrowser = () => chromium.launch({ executablePath: browserExecutable(), headless: true, chromiumSandbox: true });
