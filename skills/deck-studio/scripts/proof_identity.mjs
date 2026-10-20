// Record bytes actually served to the renderer, not a later locator snapshot.
import { createHash } from "node:crypto";
import { readFile, realpath } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";

export function identity(path, bytes) {
  return { path, sha256: createHash("sha256").update(bytes).digest("hex"), bytes: bytes.length };
}

export function sourceCapture(root) {
  const realRoot = realpath(root);
  const files = new Map();
  const external = new Set();
  return {
    async read(file) {
      const real = await realpath(file);
      const rel = relative(root, resolve(file));
      const realRelative = relative(await realRoot, real);
      if (!rel || rel.startsWith(`..${sep}`) || rel === ".." || realRelative.startsWith(`..${sep}`) || realRelative === "..") {
        throw new Error("render resource escapes source root");
      }
      const bytes = await readFile(real);
      const row = identity(rel.split(sep).join("/"), bytes);
      if (files.has(row.path) && files.get(row.path).sha256 !== row.sha256) {
        throw new Error(`source changed during rendering: ${row.path}`);
      }
      files.set(row.path, row);
      return bytes;
    },
    observe(page, origin) {
      page.on("request", request => {
        const url = new URL(request.url());
        if (["http:", "https:"].includes(url.protocol) && url.origin !== origin) external.add(url.href);
      });
    },
    async finish() {
      const rows = [...files.values()].sort((a, b) => a.path.localeCompare(b.path));
      for (const row of rows) {
        if (identity(row.path, await this.read(resolve(root, row.path))).sha256 !== row.sha256) {
          throw new Error(`source changed during rendering: ${row.path}`);
        }
      }
      return { files: rows, external_resources: [...external].sort() };
    },
  };
}
