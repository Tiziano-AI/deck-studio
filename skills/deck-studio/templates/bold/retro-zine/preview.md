# Retro Zine Preview Card

Use this card for an optional title-slide preview when visual fit is unresolved; it is not a required stage. The user or agent may select a system within the brief.

## Files

- Full design doc: `design.md`
- Preview card: `preview.md`

## Selection Metadata

- Slug: `retro-zine`
- Tagline: Beige paper with green accent and Bebas Neue + Caveat: a riso-printed zine in HTML form.
- Mood: crafted, lo-fi, underground, warm-retro
- Tone: scrappy, warm, intentional, DIY
- Formality: medium-low
- Density: medium-high
- Scheme: light
- Best for: Anything that should feel printed, lo-fi, and crafted: indie zines and publications, music / arts brands, creator portfolios, small-batch craft launches, community decks. Also a great underdog choice for tech, research, or business decks that want a riso-print warmth instead of digital polish.
- Avoid for: Contexts that demand digital-native polish or fast modern-tech energy — the layered zine aesthetic intentionally feels handmade.

## Visual Snapshot

A risograph-zine editorial system on warm khaki paper with a deep forest-green accent and ink-black structure. Display type runs in Bebas Neue (condensed industrial sans, uppercase, generously tracked); body type runs in Space Grotesk at weight 300–500; handwritten emphasis runs in Caveat. A subtle SVG grain overlay sits over every slide, reinforcing the printed-paper feel. The aesthetic borrows from independent press, mid-century activist posters, and DIY zine culture: slightly rotated stamp marks, masking-tape pieces in collage layouts, drop caps, and offset paper-on-paper shadows. The effect is hand-printed editorial — warm but disciplined, confident but tactile.

Retro Zine is a risograph-zine editorial system on a warm khaki canvas (`{colors.bg}` — #C8B99A) with deep forest-green (`{colors.green}` — #008F4D) as the meaningful accent and ink-black (`{colors.black}` — #1A1A1A) as the structural color. The aesthetic borrows from independent press culture, mid-century activist posters, and DIY zine layouts: condensed industrial display type, hand-script emphasis, slightly rotated stamps, masking-tape collage marks, drop caps, and a print-grain overlay that ties every surface to a printed-paper register.

## Preview Ingredients

- Palette: bg #C8B99A; bg-dark #B8A98A; green #008F4D; green-light #00A85D; black #1A1A1A; white #F4EFE6
- Typography: See full design doc after selection.
- Signature move: Warm khaki paper canvas ({colors.bg}) + deep forest-green accent ({colors.green}) + ink-black structure ({colors.black}).
- Signature move: An SVG grain overlay ({components.grain-overlay}) sits over every slide at 0.07 opacity, reinforcing the printed-paper register.
- Signature move: Condensed tracked Bebas Neue display; readable Space Grotesk body; Caveat for actual sourced notes or bylines.
- Signature move: 3px solid black structural borders divide regions; 2px and 1.5px borders subdivide.
- Signature move: Paper-on-paper offset cards: green slab sits 12px behind a white card via ::before.

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
- Use this system's recipe for this candidate. Read other candidate recipes proportionately when comparison or unresolved fit requires it; do not blend unrelated template signatures or borrow another system's runtime or demo copy.
- Once the user or agent selects this system for the full deck, read its full design doc before generating final slides.
