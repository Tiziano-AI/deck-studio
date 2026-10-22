import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { LIBRARY_DELIVERY, DECK_CSP, artifactPath, audienceArtifact, presentationType, presentationBase } from "../skills/deck-studio/scripts/delivery_profile.mjs";

test("delivery identity binds the complete canonical module bytes", async () => {
  const bytes = await readFile(new URL("../skills/deck-studio/scripts/delivery_profile.mjs", import.meta.url));
  assert.deepEqual(LIBRARY_DELIVERY, { id: "decks-library", sha256: createHash("sha256").update(bytes).digest("hex") });
  assert.equal(Object.isFrozen(LIBRARY_DELIVERY), true);
  assert.ok(DECK_CSP.includes("connect-src 'none'"));
  assert.ok(DECK_CSP.includes("media-src 'self' blob:"));
});

test("audience resource contract preserves typed assets, excludes backstage and rejects invalid paths", () => {
  for (const path of ["deck.html", "deck.pdf", "deck.pptx", "assets/nested/chart.mjs", "cover.PNG", "sound.mp3", "font.otf", "video.webm"]) {
    assert.equal(audienceArtifact(path), true, path);
    assert.ok(presentationType(path));
  }
  for (const path of ["deck-manifest.json", "proof/screenshots/one.png", "chart.json", "download.zip", "assets/unaccepted.pptx", "DECK.PPTX"]) assert.equal(audienceArtifact(path), false, path);
  for (const path of ["", "/deck.html", "../deck.html", "assets/../deck.html", "assets\\deck.html", ".hidden.png", "assets/.secret.png", "deck\0.html", "assets//one.png"]) {
    assert.equal(artifactPath(path), false, path);
    assert.equal(audienceArtifact(path), false, path);
  }
  assert.equal(presentationType("unknown.bin"), undefined, "no permissive fallback for audience resources");
  assert.equal(presentationType("sound.wav"), "audio/wav");
  assert.equal(presentationType("font.TTF"), "font/ttf");
  assert.equal(presentationType("deck.pptx"), "application/vnd.openxmlformats-officedocument.presentationml.presentation");
});

test("presentation base is shared, nested and limited to product identifiers", () => {
  assert.equal(presentationBase("qa", "candidate"), "/decks/qa/candidate/");
  for (const id of ["../bad", "", "bad/slash", ".hidden", "has space"]) assert.throws(() => presentationBase(id, "valid"), /invalid_presentation_identity/);
});
