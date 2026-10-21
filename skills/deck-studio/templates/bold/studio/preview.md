# Studio Preview Card

Use this card for an optional title-slide preview when visual fit is unresolved; it is not a required stage. The user or agent may select a system within the brief.

## Files

- Full design doc: `design.md`
- Preview card: `preview.md`

## Selection Metadata

- Slug: `studio`
- Tagline: Black canvas with electric-yellow type; high-voltage design studio aesthetic.
- Mood: electric, bold, graphic, design-led, high-contrast
- Tone: graphic, loud, modern, intentional
- Formality: medium
- Density: low
- Scheme: dark
- Best for: Anything that should feel electric and design-led: studio credentials, creative agency pitches, brand showcases, art-direction reviews, fashion / sneaker brand work. Also a striking unexpected choice for tech, research, or business decks where the speaker wants the deck to *be* a brand statement.
- Avoid for: Contexts that should feel quiet or institutional — the black-and-electric-yellow palette is the loudest in the library.

## Visual Snapshot

A "Boring Studios" agency presentation system — type-as-graphic-mass in the spirit of contemporary design-studio decks (Pentagram, Anti, Order). Heavy display runs in Barlow 900, with a 700/500/400 ladder for subheads and prose, with type so heavy at display scale that it stops being type and starts being a shape. The palette is two-color: near-black field (#1C1C1C), acid yellow type (#F5D200), and the same yellow as a full slide background. IBM Plex Mono carries every footer metadata, slide counter, and three-column lockup. No drop shadows, no rounded corners, no accent colors — the headline IS the design, and the only chromatic decision per slide is dark-yellow-on-near-black or near-black-on-acid-yellow.

Studio is a type-as-graphic-mass presentation system, drawing on contemporary design-studio posters and decks. Barlow 900 display forms behave almost as graphic shapes; 700 supports subheads, 500 lead text and 400 sustained body. IBM Plex Mono gives actual metadata a quieter spec-sheet voice. Large typographic mass is the identity, not a requirement to set all content in 900 or reduce a title to one word.

## Preview Ingredients

- Palette: near-black #1C1C1C; near-black-alt #242422; acid-yellow #F5D200; acid-yellow-alt #F0CC00; border-dark #2E2E2C
- Typography: Barlow; IBM Plex Mono
- Signature move: Binary palette — {colors.near-black} field with {colors.acid-yellow} type, or {colors.acid-yellow} field with {colors.near-black} type. No third color.
- Signature move: Barlow 900 display, 700 subheads, 500 leads and 400 body; IBM Plex Mono for actual metadata.
- Signature move: Headlines run massive — cover display at 230.4px, statements at 144px, section headers at 92.16px.
- Signature move: Tight negative letter-spacing on all display type (-0.01 to -0.03em); uppercase when source meaning and script permit.
- Signature move: Flat: no drop shadows, no rounded corners, no gradients, no accent colors beyond the yellow/dark binary.

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
