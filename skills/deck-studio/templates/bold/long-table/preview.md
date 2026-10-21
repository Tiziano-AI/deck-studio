# Long Table Preview Card

Use this card for an optional title-slide preview when visual fit is unresolved; it is not a required stage. The user or agent may select a system within the brief.

## Files

- Full design doc: `./design.md`
- Preview card: `./preview.md`

## Selection Metadata

- Slug: `long-table`
- Tagline: Warm cream and rust-red supper-club aesthetic with bold uppercase grotesk headlines, Fraunces serifs, and pill-shaped outlined buttons.
- Mood: warm, intimate, modern, friendly, small-batch, social, hospitality
- Tone: warm, playful, considered, social, magazine-friendly, modern-editorial
- Formality: medium
- Density: medium
- Scheme: light
- Best for: Anything that should feel like a warm, intimate, modern hospitality / community brand: supper clubs, dinner series, small restaurants, creative-studio events, membership pitches, lifestyle and wine brands. Equally good for any deck wanting a single warm accent colour, mixed-weight typography, and a social-media-aware modern-editorial voice.
- Avoid for: Decks that need corporate polish, technical density, or a cold / minimalist register — the rust-red palette and bold serif mix are intentionally warm and people-facing.

## Visual Snapshot

A warm, single-ink editorial system in the register of a supper-club poster, a small-batch zine, or a Risograph-printed program. The entire system runs in one ink color — a warm rust terracotta (#B53D2A) — on a buttery cream paper ground (#FAF1E2), with a subtle 4px radial-dot texture overlay giving the surface its "printed paper" quality. Display type runs in Bricolage Grotesque at weight 700–800 in uppercase; body and metadata run in Fraunces serif at weight 400–600 with optical-size axis engaged. Pill buttons, outlined edition badges, italic-edition numerals, and dashed/solid 1.5px borders complete the printed-program vocabulary.

Long Table is a single-ink editorial system in the register of a supper-club poster, a Risograph zine, or a small-press dinner program. The foundational premise is monochromatic: every visible mark in the system — every headline, every paragraph, every border, every rule, every pill, every page number — is rendered in a single warm rust terracotta ink ({colors.ink} — #B53D2A) on a buttery cream paper ground ({colors.paper} — #FAF1E2). The only chromatic variation is opacity: the same ink at 100% for primary marks, at 78% for de-emphasized metadata, at 32% for dashed internal dividers, at 10% for the paper-texture dots.

## Preview Ingredients

- Palette: paper #FAF1E2; paper-d #F2E5CF; paper-vd #E8D7B6; ink #B53D2A; ink-dp #8E2D1F; rule #B53D2A
- Typography: Bricolage Grotesque 700/800; Fraunces 400 regular/italic with real 500/600 emphasis
- Signature move: Bricolage Grotesque 700/800 display caps with tight tracking, preserving case-sensitive names and identifiers.
- Signature move: Fraunces 400 italic body and metadata, real 500/600 emphasis where used; roman for info keys and longer reading copy.
- Signature move: One ink color ({colors.ink} — warm rust terracotta) on cream paper ({colors.paper}). Opacity variants are the only color variation.
- Signature move: Bricolage Grotesque weight 700–800 uppercase for every display moment; Fraunces 400–600 italic-default for every body and metadata moment.
- Signature move: Subtle 4px radial-dot paper texture on every slide via .stage::before — invisible at distance, present up close.

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
- Use this system's recipe for this candidate. Read other candidate recipes proportionately when comparison or unresolved fit requires it; do not blend unrelated template signatures or borrow another system's runtime or demo copy.
- Once the user or agent selects this system for the full deck, read its full design doc before generating final slides.
