# Sakura Chroma Preview Card

Use this card for an optional title-slide preview when visual fit is unresolved; it is not a required stage. The user or agent may select a system within the brief.

## Files

- Full design doc: `design.md`
- Preview card: `preview.md`

## Selection Metadata

- Slug: `sakura-chroma`
- Tagline: Vintage Japanese cassette-package aesthetic: cream paper, diagonal rainbow ribbons, condensed bold type, JIS-style spec checkboxes.
- Mood: retro, playful, kawaii-tech, warm, tactile, product-catalogue
- Tone: playful, confident, warm, tactile, 80s-Japanese-tech
- Formality: low
- Density: medium-high
- Scheme: light
- Best for: Anything that should feel like a vintage Japanese cassette package or a TDK / Sony / Sakura Color product catalogue: indie hardware brand decks, music-label release schedules, analog studio retrospectives, zine and magazine pitches, kawaii-tech product launches, creative-studio annual reports. Equally good for any deck wanting bold colour, condensed display type, and a tactile printed-product personality.
- Avoid for: Decks that need restrained, corporate, or quiet typography — the bold condensed lockups, ribbon stripes, and primary-colour palette are intentionally loud and product-page-y.

## Visual Snapshot

A cassette-package editorial system on warm cream paper with a six-color primary palette and warm-brown ink. Display type runs in Big Shoulders Display (condensed industrial display sans at weight 900); body in Albert Sans; tabular and tag content in JetBrains Mono; Noto Sans JP when genuine Japanese text requires it. The aesthetic borrows from 1970s consumer cassette packaging, Japanese print catalogues, and lo-fi product zines: petal-cluster blob clusters, diagonal multi-color ribbon bands, 32-vertex / 16-tip starburst seals, red rectangular stamps, and tracked uppercase micro-labels. The effect is hand-curated industrial editorial — warm but disciplined, playful but tightly typeset, with the cassette as its visual metaphor.

Sakura Chroma is a cassette-package editorial system that treats every slide as a printed product page from a small Japanese audio-products catalogue. The visual metaphor is total: petal-cluster blob marks, diagonal multi-color ribbon bands, 32-vertex / 16-tip starburst seals, red rectangular stamps, mono-font spec rows, color-coded chips, and equalizer-style bar charts. Everything reads as if pulled from the back-page spread of a 1970s consumer-audio brochure — warm, hand-curated, industrially typeset.

## Preview Ingredients

- Palette: paper #F1E6CB; paper-dk #E5D6B0; ink #3A2516; red #E5392A; pink #E54489; orange #F09131; yellow #F0BC2A; green #3D9F47; blue #3F8BC4
- Typography: See full design doc after selection.
- Signature move: Warm cream paper canvas ({colors.paper}) with warm-brown ink ({colors.ink}) as structure and six primary accent colors.
- Signature move: A 4px-period halftone-dot paper texture ({components.paper-texture}) sits over every slide at 16% opacity. Required.
- Signature move: Big Shoulders Display weight 900 with negative tracking for every display moment; Albert Sans for body; JetBrains Mono for tabular / data; Noto Sans JP only for genuine Japanese text.
- Signature move: Petal-cluster blob marks (4–5 overlapping perfect circles) as the signature decorative element.
- Signature move: Diagonal multi-color ribbon bands (5 stacked colored bars at -22° or +22°) as atmospheric layering.

## International / CJK Preview Note

- If the preview uses Chinese or other CJK text, keep CJK letter-spacing at 0, loosen line-height, and avoid uppercase transforms on CJK runs.
- Before a CJK preview, read the CJK section in `design.md` for candidate fonts and script-specific adjustments. Verify the actual loaded glyphs; these are not automatic metric-equivalent substitutions.

## Preview Rules

- When using this card for a title-slide preview, build exactly one title slide with the shared [deck runtime](../../../references/deck-runtime.md) at 1920×1080; keep the same title, subtitle and other approved visible content across visual alternatives.
- Preserve the palette, type roles, surface rhythm, and decorative vocabulary described above.
- Use the user's real title/subtitle/context; do not copy demo slide content.
- The rendered preview must look like a real first slide, not a template-selection card.
- Never place internal workflow text on the slide: no `preview`, `generated from`, `preview.md`, `template`, `preset`, `style option`, `Option A/B/C`, file names, paths, or source-doc labels.
- Never place the template name or slug on the slide itself; mention it only in the chat message.
- Never place user requirement notes such as desired vibe, audience, or internal-use labels on the slide unless the user explicitly wants those exact words in the deck.
- Visible labels, annotations, bylines, numbers and status marks must come from approved content or actual slide numbering. Leave an optional slot empty rather than inventing words to complete the look.
- Do not read `template.html` for preview generation.
- Use this system's recipe for this candidate. Read other candidate recipes proportionately when comparison or unresolved fit requires it; do not blend unrelated template signatures or borrow another system's runtime or demo copy.
- Once the user or agent selects this system for the full deck, read its full design doc before generating final slides.
