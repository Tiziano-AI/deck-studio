# Retro Windows Preview Card

Use this card for an optional title-slide preview when visual fit is unresolved; it is not a required stage. The user or agent may select a system within the brief.

## Files

- Full design doc: `./design.md`
- Preview card: `./preview.md`

## Selection Metadata

- Slug: `retro-windows`
- Tagline: Windows 95 chrome: navy title bars, MS Sans Serif, pixel typography, full nostalgia.
- Mood: nostalgic, retro, geeky, playful
- Tone: winking, nostalgic, geeky, fun
- Formality: low
- Density: medium
- Scheme: light
- Best for: Anything that should feel knowingly nostalgic: retro gaming, Y2K-aesthetic brands, creator portfolios with a 90s vibe, tech-history talks, deliberately tongue-in-cheek decks. A great choice anywhere a playful retro reference is the entire point.
- Avoid for: Decks that need to read as modern, elegant, or institutionally credible — the Win95 chrome will always read as a costume.

## Visual Snapshot

A Windows 95 / 98 desktop-OS aesthetic rendered as a presentation system. Every slide is a window — beveled chrome, navy gradient title bar, MS Sans Serif body type, with chart areas, group boxes, and panels arranged as if they were software UI from 1995. The palette is the original Win9x system colors (gray button-face, navy title bars, white sunken inputs) with retro accent hues (DOS green, brick red, mustard yellow, teal cyan) reserved for status text and chart data. Pixel-font (Press Start 2P) and terminal-font (VT323) appear sparingly for nostalgic punctuation. The effect is half playful nostalgia, half functional dashboard — a deck that reads as a software product running on a CRT monitor.

Retro Windows frames the user's real title in a navy band over beveled gray and white panels. Do not add dummy filenames, status readouts or inert minimize/maximize/close controls. Fewer large panels can preserve the nostalgic composition without inventing content.

## Preview Ingredients

- Palette: bg-gray #C0C0C0; bg-light #D4D0C8; bg-dark #808080; white #FFFFFF; black #000000; text-dark #222222; blue-navy #000080; blue-bright #0000A0
- Typography: MS Sans Serif
- Signature move: Every slide is a {components.win-window} — beveled chrome with navy-gradient title bar and the actual title.
- Signature move: An optional stage-local 3px-period scanline texture can sit at up to 3% opacity; omit it if it hurts reading.
- Signature move: Bevel-based depth: raised ({components.panel-raised}, {components.btn-retro}) and sunken ({components.panel-sunken}, {components.group-box}) — no blurred shadows.
- Signature move: The font stack is MS Sans Serif / Segoe UI / Tahoma fallback, with Press Start 2P and VT323 as nostalgic accents.
- Signature move: Status colors require an established interpretation and a readable text label; they cannot create a status.

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
- Use this system's recipe for this candidate. Read other candidate recipes proportionately when comparison or unresolved fit requires it; do not blend unrelated template signatures or borrow another system's runtime or demo copy.
- Once the user or agent selects this system for the full deck, read its full design doc before generating final slides.
