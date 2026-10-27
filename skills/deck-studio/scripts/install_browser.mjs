// Explicit package-owned acquisition. Render/export commands never import this.
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Browser, install } from "@puppeteer/browsers";
import { browserVersion, browserMetadataSha256, verifyBrowserMetadata } from "./browser_contract.mjs";

await verifyBrowserMetadata();
const cacheDir = resolve(dirname(fileURLToPath(import.meta.url)), "../node_modules/playwright-core/.local-browsers");
const browser = await install({ browser: Browser.CHROME, buildId: browserVersion, cacheDir });
console.log(JSON.stringify({ version: browserVersion, metadataSha256: browserMetadataSha256, executable: browser.executablePath }));
