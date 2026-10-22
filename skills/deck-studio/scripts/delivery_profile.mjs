// The complete audience resource contract. Capture and gateway import this owner.
// Changing any byte invalidates new library-bound proof made with its old digest.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { extname } from "node:path";

export const DECK_CSP = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; media-src 'self' blob:; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'self'; form-action 'none'";

const PRESENTATION_TYPES = new Map([
  [".html", "text/html; charset=utf-8"], [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"], [".mjs", "text/javascript; charset=utf-8"],
  [".pdf", "application/pdf"], [".pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
  [".png", "image/png"], [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"], [".svg", "image/svg+xml"], [".webp", "image/webp"],
  [".gif", "image/gif"], [".avif", "image/avif"], [".woff", "font/woff"], [".woff2", "font/woff2"],
  [".ttf", "font/ttf"], [".otf", "font/otf"], [".mp4", "video/mp4"], [".webm", "video/webm"],
  [".mp3", "audio/mpeg"], [".wav", "audio/wav"],
]);

export function artifactPath(value) {
  return typeof value === "string" && value.length <= 1024 && !value.includes("\\") && !value.includes("\0") &&
    !value.startsWith("/") && value.split("/").every(part => part && part !== "." && part !== ".." && !part.startsWith("."));
}

export function presentationType(path) {
  return typeof path === "string" ? PRESENTATION_TYPES.get(extname(path).toLowerCase()) : undefined;
}

export function audienceArtifact(value) {
  return artifactPath(value) && value !== "deck-manifest.json" && value.split("/")[0] !== "proof" &&
    (extname(value).toLowerCase() !== ".pptx" || value === "deck.pptx") && Boolean(presentationType(value));
}

export function presentationBase(deckId, releaseId) {
  if (![deckId, releaseId].every(value => typeof value === "string" && /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/.test(value))) {
    throw new Error("invalid_presentation_identity");
  }
  return `/decks/${deckId}/${releaseId}/`;
}

export const LIBRARY_DELIVERY = Object.freeze({
  id: "decks-library",
  sha256: createHash("sha256").update(readFileSync(new URL(import.meta.url))).digest("hex"),
});
