# Coral Preview Card

Use this card for an optional title-slide preview when visual fit is unresolved; it is not a required stage. The user or agent may select a system within the brief.

## Files

- Full design doc: `./design.md`
- Preview card: `./preview.md`

## Selection Metadata

- Slug: `coral`
- Tagline: Cream and coral on near-black, set in oversized Bebas Neue.
- Mood: bold, warm, modern, confident
- Tone: graphic, punchy, magazine
- Formality: medium
- Density: medium
- Scheme: mixed
- Best for: Anything that should feel warm-graphic and editorial: fashion, beauty, fitness, F&B, lifestyle brands, agency credentials. Just as strong for a creator portfolio, a manifesto, or a tech / research deck that wants warmth and a single bold accent instead of corporate cool.
- Avoid for: Contexts that should feel quiet or institutional — the coral accent and oversized Bebas Neue commit hard to a confident magazine voice.

## Visual Snapshot

A bold magazine-poster system that runs on three surface registers — coral fire, ink black, and warm cream — animated by Bebas Neue display caps and a constant 45° diagonal hatch pattern. Inter handles body copy; Bebas Neue handles every headline, stat, title, and meta-figure at heavy letter-spacing. The cultural reference is mid-century travel posters, Saul Bass film titles, and modern editorial sport magazines: solid color planes meeting at hard edges, oversized condensed caps as architectural elements, and a single coral hue used both as accent and as full-slide environment.

Coral is a bold magazine-poster system built on three surface registers — coral fire, ink black, and warm cream — that meet at hard edges. The defining structural premise is solid color planes: a single slide will split into a coral half + a cream half + an ink top-section, with each region a flat solid color holding its own self-contained composition. There are no gradient transitions between regions; the meeting point of two colors is the layout. This is the populist counterpart to a more refined editorial system — closer to a sports magazine cover than a literary catalogue.

## Preview Ingredients

- Palette: coral #E85D5D; coral-dark #D44A4A; cream #F5F0E8; cream-dark #E8E0D4; black #1A1A1A; gray #6B6B6B; light-gray #B0B0B0; white #FFFFFF
- Typography: Bebas Neue; Inter
- Signature move: Solid color region splits — coral / ink / cream regions meeting at hard edges.
- Signature move: Accent borders — 4px coral left, 5px coral top, 3px ink top, 4px ink horizontal.
- Signature move: 45° diagonal hatch — a signature 6%-opacity black diagonal repeating pattern overlaid on coral regions, providing texture.
- Signature move: Oversized decorative typography — real section ordinals repeated at 12% opacity, giant quote marks at 35% opacity, sitting behind or beside primary content.
- Signature move: Three-surface system: {colors.coral} (fire), {colors.black} (ink), {colors.cream} (paper) — used as solid regions meeting at hard edges.

## International / CJK Preview Note

- If the preview uses Chinese or other CJK text, keep CJK letter-spacing at 0, loosen line-height, and avoid uppercase transforms on CJK runs.
- Use the full `design.md` CJK section after selection for exact font pairings and script-specific adjustments.

## Preview Rules

- When using this card for a title-slide preview, build exactly one title slide at 1920×1080 with the [shared runtime](../../../references/deck-runtime.md), uniformly scaled without internal phone reflow.
- Compared style previews keep identical semantic content; only visual treatment changes. Empty decoration slots do not authorize invented text, numbers, identities, controls or endorsements.
- Preserve the palette, type roles, surface rhythm, and decorative vocabulary described above.
- Use the user's real title/subtitle/context; do not copy demo slide content.
- The rendered preview must look like a real first slide, not a template-selection card.
- Never place internal workflow text on the slide: no `preview`, `generated from`, `preview.md`, `template`, `preset`, `style option`, `Option A/B/C`, file names, paths, or source-doc labels.
- Never place the template name or slug on the slide itself; mention it only in the chat message.
- Never place user requirement notes such as desired vibe, audience, or internal-use labels on the slide unless the user explicitly wants those exact words in the deck.
- Use only real deck content for visible chrome: deck title, real section title, date, author, company, page number, or genuine content phrases from the user material.
- Do not read `template.html` for preview generation.
- Use this system's recipe for this candidate. Read other candidate recipes proportionately when comparison or unresolved fit requires it; do not blend unrelated template signatures or borrow another system's runtime or demo copy.
- Once the user or agent selects this system for the full deck, read its full design doc before generating final slides.
