# People's Platform (Block & Bold) Preview Card

Use this card for an optional title-slide preview when visual fit is unresolved; it is not a required stage. The user or agent may select a system within the brief.

## Files

- Full design doc: `./design.md`
- Preview card: `./preview.md`

## Selection Metadata

- Slug: `peoples-platform`
- Tagline: Activist poster energy: blue, orange, red on cream, with Alfa Slab + Caveat Brush.
- Mood: activist, loud, graphic, honest
- Tone: punchy, direct, expressive, warm-bold
- Formality: medium-low
- Density: medium-high
- Scheme: light
- Best for: Anything that should feel honest, loud, and graphic: cultural commentary, manifestos, civic and community decks, design talks, campaign pitches. Excellent for founder-vision moments, mission statements, or any deck — including across industries — that wants protest-poster energy instead of corporate polish.
- Avoid for: Contexts where institutional restraint is the actual goal — the saturated political-poster palette commits hard to expressive energy.

## Visual Snapshot

A WPA-poster-meets-political-campaign presentation system built on four typefaces and a nine-token palette that reduces to three functional roles. Alfa Slab One — a compressed slab serif — does all the heavy lifting at extreme sizes in pure uppercase. Caveat Brush drops in as a handwritten human interrupt: lowercase, slightly rotated, emotionally warm. DM Mono carries all metadata at tight uppercase tracking. The palette is electric cobalt blue, amber orange, and hot red — with red functioning exclusively as a shadow/depth color, never as a surface fill. Every slide gets a paper grain overlay that makes the whole deck feel screen-printed. The aesthetic is loud, confident, and populist — the kind of visual language that belongs on a protest placard, a union newsletter, or a campaign bus.

People's Platform is a WPA-poster-meets-political-campaign slide system — the visual language of conviction, the graphic register of public address. The canvas is warm paper ({colors.paper} — #F5F2EA), a hair warmer than white, and every slide gets a grain texture applied via a CSS pseudo-element that makes the whole deck feel screen-printed rather than rendered.

## Preview Ingredients

- Palette: blue #2C2CDC; blue-deep #1B1BB0; orange #F2A03A; orange-deep #E89321; red #E83A2A; red-deep #B7281C; cream #F4E9D6; paper #F5F2EA
- Typography: Alfa Slab One; Caveat Brush; Archivo Narrow; DM Mono
- Signature move: Paper canvas ({colors.paper} — #F5F2EA) with grain overlay via CSS pseudo-element on every slide.
- Signature move: Stacked double text-shadow: Npx Npx 0 {colors.red}, 2Npx 2Npx 0 {colors.red-deep}. Shadow size scales with font size.
- Signature move: Alfa Slab One for all display and structural type — uppercase, line-height 0.82–1.04, letter-spacing 0.005em.
- Signature move: Red ({colors.red}) functions exclusively as a shadow color — never a surface background.
- Signature move: Heavy 6px ink borders for all major structural divisions (topbars, section headers, column separators, inset frames).

## International / CJK Preview Note

- If the preview uses Chinese or other CJK text, keep CJK letter-spacing at 0, loosen line-height, and avoid uppercase transforms on CJK runs.
- Use the full `design.md` CJK section after selection for exact font pairings and script-specific adjustments.

## Preview Rules

- When using this card for a title-slide preview, build exactly one title slide at 1920x1080 using the [shared deck runtime](../../../references/deck-runtime.md). The complete stage scales; its contents do not reflow on phones.
- Preserve the palette, type roles, surface rhythm, and decorative vocabulary described above.
- Use the user's real title/subtitle/context; do not copy demo slide content.
- The rendered preview must look like a real first slide, not a template-selection card.
- Never place internal workflow text on the slide: no `preview`, `generated from`, `preview.md`, `template`, `preset`, `style option`, `Option A/B/C`, file names, paths, or source-doc labels.
- Never place the template name or slug on the slide itself; mention it only in the chat message.
- Never place user requirement notes such as desired vibe, audience, or internal-use labels on the slide unless the user explicitly wants those exact words in the deck.
- Use only locked deck content for visible chrome. Omit a byline, status, date, kicker or brand slot when no real value is supplied; do not fill it with decorative words or invented facts. Keep the same title, subtitle and qualifications across style previews.
- Do not read `template.html` for preview generation.
- Use this system's recipe for this candidate. Read other candidate recipes proportionately when comparison or unresolved fit requires it; do not blend unrelated template signatures or borrow another system's runtime or demo copy.
- Once the user or agent selects this system for the full deck, read its full design doc before generating final slides.
