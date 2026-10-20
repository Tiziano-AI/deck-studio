// setup_runtime.mjs provisions Chromium inside this package's dependency tree.
// Never borrow a caller's shared browser cache.
process.env.PLAYWRIGHT_BROWSERS_PATH = "0";
export const { chromium } = await import("playwright");
