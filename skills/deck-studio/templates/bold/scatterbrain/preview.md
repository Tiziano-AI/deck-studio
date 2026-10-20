# Scatterbrain Preview Card

Use this card for an optional title-slide preview when visual fit is unresolved; it is not a required stage. The user or agent may select a system within the brief.

## Files

- Full design doc: `design.md`
- Preview card: `preview.md`

## Selection Metadata

- Slug: `scatterbrain`
- Tagline: Post-it inspired: pastel sticky notes, Caveat handwriting, Shrikhand and Zilla Slab type stack.
- Mood: playful, creative, warm, messy-on-purpose, workshop
- Tone: informal, warm, expressive, human
- Formality: low
- Density: high
- Scheme: light
- Best for: Anything that should feel like a designer's whiteboard: brainstorms, workshops, creative-agency credentials, design-thinking sessions, ideation pitches, art-direction reviews. Equally fun for any deck — including tech, research, or business — that wants to read as in-progress thinking rather than polished conclusions.
- Avoid for: Contexts that demand precision and institutional weight — the post-it sticky-note aesthetic intentionally reads as warm and unfinished.

## Visual Snapshot

A Post-it-note-and-cork-board presentation system. Every content block is a colored sticky note on a textured paper or cork surface, layered with red thumbtacks, masking tape, and decorative doodles. Display type runs in Shrikhand (a chunky decorative display serif) on every headline; body type runs in Zilla Slab (a friendly slab serif); handwritten emphasis runs in Caveat. The palette is pastel sticky-note colors (yellow, blue, pink, green, orange, purple) on cream paper / cork / warm gradient backgrounds. The aesthetic borrows from creative-workshop wall art, brainstorming boards, and indie-studio mood boards: scattered slight rotations, multiple background texture variants per slide, pin / tape / drop-shadow combinations. The effect is warmth, play, and tactile creative-process energy.

Scatterbrain is a Post-it-note-and-cork-board presentation system. Every content block is a colored sticky note (`{components.post-it}`) layered onto one of three textured background variants — cork board, desk paper, or warm gradient — with red / blue / green / gold thumbtacks pinning the notes and translucent masking tape sometimes added on top. The visual metaphor is total: the deck is a creative-workshop wall, a brainstorming board, or a thinker's desk, and the content is the cluster of sticky notes pinned across it.

## Preview Ingredients

- Palette: yellow #FFE066; yellow-deep #FFD43B; blue #A5D8FF; blue-deep #74C0FC; pink #FFC9C9; pink-deep #FF9F9F; green #B2F2BB; green-deep #8CE99A
- Typography: See full design doc after selection.
- Signature move: Three textured background variants: cork ({components.bg-cork}), paper ({components.bg-paper}), warm gradient ({components.bg-warm}). Each slide picks one.
- Signature move: A fixed SVG grain overlay at 4% opacity sits above all content, reinforcing the paper register.
- Signature move: Seven sticky-note colors: yellow, blue, pink, green, orange, purple, white-bordered. Each gradient-filled (except orange / purple / white).
- Signature move: Every post-it carries a soft drop shadow + small rotation. Rotations alternate direction across adjacent notes.
- Signature move: Red thumbtacks (and blue / green / gold variants) via ::before. Masking tape via ::after. Often combined on a single note.

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
