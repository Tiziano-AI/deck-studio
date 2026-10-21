# Blue Professional Preview Card

Use this card for an optional title-slide preview when visual fit is unresolved; it is not a required stage. The user or agent may select a system within the brief.

## Files

- Full design doc: `design.md`
- Preview card: `preview.md`

## Selection Metadata

- Slug: `blue-professional`
- Tagline: Cream paper background with electric cobalt blue accents; clean modern professional.
- Mood: professional, modern, calm, trustworthy
- Tone: clean, considered, polished, neutral
- Formality: medium-high
- Density: medium
- Scheme: light
- Best for: Anything that should feel modern-considered and lightly authoritative: B2B SaaS pitches, consulting deliverables, advisory updates, investor reports. Also a clean, tasteful choice whenever you want to read as professional without going stiff — research synthesis, internal reviews, brand work for service businesses.
- Avoid for: Contexts where the deck should feel hot, playful, or intentionally informal — the cool electric-blue restraint will read as overly polished.

## Visual Snapshot

A restrained, consulting-grade presentation system on a warm cream canvas (#fdfae7) with a single saturated cobalt blue (#1e2bfa) as the only accent color. Display type runs Space Grotesk for headlines and numerical callouts; Inter handles body and chrome. Cards are soft-tinted cobalt at 4% opacity with 1.5px translucent borders and 10-14px rounded corners — quiet, never bordered in solid color. The aesthetic borrows from investment-research reports, McKinsey-grade quarterly briefings, and contemporary financial dashboards — measured, data-dense without feeling crowded, and unmistakably professional. The system is built for executive readability at distance, with strong typographic hierarchy and a single accent color carrying every emphasis moment.

Blue Professional is a consulting-grade presentation system designed for executive briefings, research deliverables, and quarterly reviews. Its foundational visual premise is restraint with one strong commitment: a warm cream canvas ({colors.bg} — #fdfae7) and a single saturated cobalt ({colors.primary} — #1e2bfa) that carries every accent, every metric, every CTA, every eyebrow, every chart fill. There is no secondary brand color, no palette of pastels, no warm/cool pairing — just cream, cobalt, and a tight ladder of muted grays for body text.

## Preview Ingredients

- Palette: bg #FDFAE7; primary #1E2BFA; text #111111; text-muted #6B6B6B; text-light #9A9A9A; positive #059669; negative #DC2626
- Typography: See full design doc after selection.
- Signature move: Warm cream ground ({colors.bg}) on every surface — never pure white, never gray.
- Signature move: Single saturated cobalt ({colors.primary}) as the only accent — used for every eyebrow, metric, CTA, chart fill, and progress indicator.
- Signature move: Space Grotesk (display + chrome) + Inter (body). Preserve these roles; use verified script-appropriate alternatives when the original fonts lack coverage.
- Signature move: Cards are 4% cobalt tints with 1.5px cobalt-at-20% borders and 10-14px rounded corners.
- Signature move: Soft pill-shaped chrome ({components.tag-pill}, {components.cta-button}) with full 100px border-radius.

## International / CJK Preview Note

- If the preview uses Chinese or other CJK text, keep CJK letter-spacing at 0, loosen line-height, and avoid uppercase transforms on CJK runs.
- Use the full `design.md` CJK section after selection for exact font pairings and script-specific adjustments.

## Preview Rules

- When using this card for a title-slide preview, build exactly one title slide at 1920x1080 with the canonical [runtime](../../../runtime/) and [runtime contract](../../../references/deck-runtime.md); do not create another scaler or navigation controller.
- Preserve the palette, type roles, surface rhythm, and decorative vocabulary described above.
- Use the user's real title/subtitle/context; do not copy demo slide content.
- The rendered preview must look like a real first slide, not a template-selection card.
- Never place internal workflow text on the slide: no `preview`, `generated from`, `preview.md`, `template`, `preset`, `style option`, `Option A/B/C`, file names, paths, or source-doc labels.
- Never place the template name or slug on the slide itself; mention it only in the chat message.
- Never place user requirement notes such as desired vibe, audience, or internal-use labels on the slide unless the user explicitly wants those exact words in the deck.
- Use only real deck content for visible chrome: deck title, real section title, date, author, company, page number, or genuine content phrases from the user material.
- Use this system's recipe for this candidate. Read other candidate recipes proportionately when comparison or unresolved fit requires it; do not blend unrelated template signatures or borrow another system's runtime or demo copy.
- Once the user or agent selects this system for the full deck, read its full design doc before generating final slides.
