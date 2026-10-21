# Product Cinema

Starter visual direction: wide film frames, product-light gradients, caption bars, hero visuals as the evidence surface.

Proposed type palette (not bundled or loaded by this starter): Manrope, Cormorant Garamond, IBM Plex Mono.

Intended use: product launches, feature narratives, customer demos, portfolio reveals.

Avoid for: regulatory details, table-first work.

## Starter scope

This is a palette/type starter with one simple cover skeleton. The specialist uses above describe an intended direction, not implemented table, chart, code, cinematic, or evidence layouts. `layouts.md` contains composition prompts to develop against actual content. The skeleton uses system fallbacks until fonts are supplied; it does not prove the proposed type palette.

## Design rules

- Establish the visual thesis, then develop a composition from `layouts.md` against actual locked content.
- Use `tokens.css` as the palette/type seed, but adapt spacing to the content.
- Use the canonical 1920x1080 runtime (`runtime/deck-stage.css` and `runtime/deck-stage.js`), `body[data-web-slides-studio]`, `.deck-viewport`, `.deck-stage`, `.slide`, and the existing `WebSlidesStudio` API. No parallel scaler or viewport-sized internals.
- Use chrome only for hierarchy, source, state, or navigation.
- Recompose or split overloaded content while preserving meaning, qualifications, evidence, sequence, and ask. Do not delete content or change claims or numbers merely for fit. If a semantic revision is needed, reopen that part of the semantic source within the mandate and carry the change through the artifact. Ask only before changing explicitly user-locked meaning or exceeding authority; keep that discussion outside the slide frame.
- Never render this template name or internal selection metadata in the deck.
- Load verified local font assets for each role before judging fit; requested fonts and fallbacks are not equivalent. Check weights, styles, and required glyphs.
- Never invent statistics, quotations, bylines, logos, evidence, or QR destinations. State and navigation chrome must mean something real; do not draw fake controls.
- Keep sources readable and encode status or series distinctions in words or shapes as well as color.
