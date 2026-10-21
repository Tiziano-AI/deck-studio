# Vellum Preview Card

Use this card for an optional title-slide preview when visual fit is unresolved; it is not a required stage. The user or agent may select a system within the brief.

## Files

- Full design doc: `design.md`
- Preview card: `preview.md`

## Selection Metadata

- Slug: `vellum`
- Tagline: Deep navy canvas with warm-yellow Cormorant serifs and a single dusty teal accent. A quiet, scholarly aesthetic.
- Mood: scholarly, literary, considered, quiet, intellectual
- Tone: literary, considered, patient, intelligent
- Formality: high
- Density: low
- Scheme: dark
- Best for: Anything that should feel scholarly, literary, and quietly intelligent: research synthesis, white papers, academic and policy briefs, advisory deliverables, longform editorial pieces, founder reflections. Equally strong for any deck — including tech, business, or creator work — that wants a calm, considered atmosphere instead of energetic visuals.
- Avoid for: Contexts that need visual heat or pop — the navy + warm-yellow Cormorant aesthetic is intentionally low-tempo.

## Visual Snapshot

An essay-pinned-to-a-wall presentation system — a single monochromatic field of deep periwinkle (#2A3870) with warm chartreuse-yellow type (#E8D85C) floating centered on it, every slide. Italic Cormorant Garamond carries every headline at all sizes — the italic serif is the personality, against the bold colorfield. DM Sans handles body in a quiet supporting role. Courier Prime mono provides the typed annotation voice — appearing as a "pin-note" attribution sitting in the bottom-left corner of every slide. The mood is gallery exhibition wall meets archive folder — quiet, monochromatic, deeply still. One dominant field, three type roles, restrained stillness.

Vellum is a monochromatic essay-on-a-wall presentation system. The visual premise is severe and tender at once: every slide is the same deep periwinkle navy field (`{colors.navy}` — #2A3870), with warm chartreuse-yellow type (`{colors.yellow}` — #E8D85C) floating centered on it. There is no alternate surface. There is no light/dark theme. There is no second background color. The field is the constant; the type and a single small annotation in the bottom-left corner are everything else.

## Preview Ingredients

- Palette: navy #2A3870; navy-alt #343F80; navy-deep #1F2858; navy-mid #34407A; yellow #E8D85C; emphasis-yellow #F5E168; teal #3A7878
- Typography: Cormorant Garamond; DM Sans; Courier Prime
- Signature move: Single monochromatic field — {colors.navy} (deep periwinkle) — on every slide. No light theme, no inversion.
- Signature move: Italic Cormorant Garamond at weight 400 for every headline, every numeral, every featured serif moment.
- Signature move: DM Sans for body and lead paragraphs; Courier Prime mono for chrome labels and the pin-note signature.
- Signature move: Yellow type ({colors.yellow}) is the primary; brighter {colors.emphasis-yellow} is the only <em> color inside headlines.
- Signature move: Dusty teal accents the large quotation ornament and 28px rule; required pin notes, kickers and markers use readable yellow.

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
