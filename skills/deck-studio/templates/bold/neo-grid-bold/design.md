---
version: alpha
name: Neo-Grid Bold
description: A heavy editorial poster system built on a strict 12-column × 8-row block grid with neon-yellow accents on putty-ecru. Space Grotesk at weight 700 in strict uppercase carries every display moment; JetBrains Mono carries every label and metadata tag. Each slide reads as a magazine spread divided into colored panels — paper-ecru, ink-black, and electric lemon-yellow trading roles across cells. The aesthetic borrows from contemporary editorial print, brutalist annual reports, and the populist-poster end of design week showcases.

colors:
  paper: "#F5F4EF"
  bg: "#ECECE8"
  ink: "#0A0A0A"
  accent-lemon: "#E6FF3D"
  muted: "#8A8A85"
  stage-bg: "#1A1A1A"

color-aliases:
  line: ink
  primary-bg: bg
  card-bg: paper

typography:
  display:
    fontFamily: "Space Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 132px
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: -0.02em
    textTransform: uppercase
  title:
    fontFamily: "Space Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 88px
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: -0.015em
    textTransform: uppercase
  subtitle:
    fontFamily: "Space Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: -0.01em
    textTransform: uppercase
  section-num:
    fontFamily: "Space Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 320px
    fontWeight: 700
    lineHeight: 0.85
    letterSpacing: -0.05em
  stat-num:
    fontFamily: "Space Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 156px
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: -0.03em
  stat-num-lg:
    fontFamily: "Space Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 240px
    fontWeight: 700
    lineHeight: 0.85
    letterSpacing: -0.04em
  stat-num-sm:
    fontFamily: "Space Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 96px
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: -0.03em
  card-headline:
    fontFamily: "Space Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 44px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: -0.01em
    textTransform: uppercase
  card-h3:
    fontFamily: "Space Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.005em
    textTransform: uppercase
  body:
    fontFamily: "Space Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.35
  body-sm:
    fontFamily: "Space Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: 24px
    fontWeight: 400
    letterSpacing: 0.08em
    textTransform: uppercase
  label-sm:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: 16px
    fontWeight: 400
    letterSpacing: 0.08em
    textTransform: uppercase
  label-xs:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: 14px
    fontWeight: 400
    letterSpacing: 0.12em
    textTransform: uppercase
  pagenum:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: 24px
    fontWeight: 400
    letterSpacing: 0.04em

spacing:
  frame-inset: 40px
  grid-gap: 12px
  grid-gap-lg: 18px
  card-pad-sm: "24px 28px"
  card-pad-md: "28px 32px"
  card-pad-lg: "36px 32px"
  card-pad-xl: "40px 44px"

canvas:
  width: 1920px
  height: 1080px

components:
  frame:
    position: "absolute; inset: 40px"
    display: grid
    gridTemplateColumns: "repeat(12, 1fr)"
    gridTemplateRows: "repeat(8, 1fr)"
    gap: "{spacing.grid-gap}"
    description: "The universal slide frame — a 12-column × 8-row CSS grid inset 40px from each slide edge with 12px gaps between cells. Every slide composes its layout by spanning cells inside this frame."
  card:
    background: "{colors.paper}"
    position: relative
    overflow: hidden
    description: "Generic colored panel. Paper is the default fill; .ink switches to black with paper text; .lemon switches to yellow with ink text; .photo switches to deep-black with white text for image regions."
  card-ink:
    background: "{colors.ink}"
    color: "{colors.paper}"
    description: "Inverted card — black background, paper text. Used as a contrast block in any composition."
  card-lemon:
    background: "{colors.accent-lemon}"
    color: "{colors.ink}"
    description: "Yellow accent card — full neon-yellow fill with ink text. The system's loudest signal."
  pagenum:
    position: "absolute; left: 0; bottom: 0"
    background: "{colors.paper}"
    color: "{colors.ink}"
    padding: "14px 22px"
    fontFamily: "JetBrains Mono, monospace"
    fontSize: 24px
    letterSpacing: 0.04em
    description: "Bottom-left page-number tag in the format '01 / 12'. Three variants: default (paper bg), .invert (ink bg), .lemon (yellow bg)."
  corner-mark:
    position: "absolute; top: 22px; right: 22px"
    width: 36px
    height: 36px
    display: "grid 2x2"
    gap: 4px
    description: "Top-right 2x2 block mark — three solid currentColor squares plus one transparent. An abstract structural punctuation mark, not a brand logo."
  blockmark:
    width: 56px
    height: 56px
    display: "grid 2x2"
    gap: 4px
    description: "Larger 2x2 block stamp with diagonal squares filled — used as abstract punctuation on covers and dividers, without implying brand ownership. May be sized 56px, 96px, or larger."
  table-cell:
    padding: "18px 22px"
    borderBottom: "1.5px solid {colors.ink}"
    borderRight: "1.5px solid {colors.ink}"
    fontSize: 24px
    lineHeight: 1.35
    description: "Comparison-matrix cell. Solid hairline ink dividers on bottom and right; last column has no right border."
  table-head-row:
    background: "{colors.ink}"
    color: "{colors.paper}"
    fontFamily: "JetBrains Mono, monospace"
    fontSize: 14px
    letterSpacing: 0.12em
    textTransform: uppercase
    description: "Inverted table header — black row with paper mono uppercase text."
  pill-yes:
    background: "{colors.accent-lemon}"
    color: "{colors.ink}"
    padding: "6px 14px"
    description: "Affirmative pill in a comparison cell — yellow fill, ink text, mono uppercase."
  pill-part:
    background: "{colors.paper}"
    color: "{colors.ink}"
    border: "1.5px solid {colors.ink}"
    description: "Partial-state pill — paper fill, ink border, ink text."
  pill-no:
    background: "{colors.ink}"
    color: "{colors.paper}"
    description: "Negative pill — black fill, paper text."
  arrow:
    width: 64px
    height: 64px
    description: "Inline SVG arrow glyph (right-pointing) at 64px square. Used as a flow indicator between process steps and as an out-of-cell pointer on stat cards."
  highlight-mark:
    background: "{colors.accent-lemon}"
    color: "{colors.ink}"
    padding: "0 6px"
    description: "Inline <mark> element — yellow background swatch wrapping one or more words inside a headline for emphasis."
  bar-fill-ink:
    background: "{colors.ink}"
    description: "Solid black vertical bar for chart series A."
  bar-fill-lemon:
    background: "{colors.accent-lemon}"
    border: "1.5px solid {colors.ink}"
    description: "Yellow vertical bar with ink border for chart series B."
  copyright:
    position: "absolute; left: 22px; bottom: 22px"
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: 16px
    lineHeight: 1.4
    color: "{colors.ink}"
    opacity: 0.85
---

## Composition and runtime

Build this recipe on the fixed **1920×1080** stage using the [shared deck runtime](../../../references/deck-runtime.md). That owner supplies scaling, navigation, active state and delivery behavior; this recipe supplies the slide's visual composition. Slide internals do not reflow on phones.

Choose components from the locked content: a stat needs a supported value, a quote its actual attribution, a label its real referent, and emphasis an established narrative reason. Empty component slots do not authorize new copy. Recompose or split an overfull slide without dropping meaning; change the visual system if it cannot carry the content.

## Overview

Neo-Grid Bold is a **heavy editorial poster system** built on a single structural premise: every slide is a 12-column × 8-row CSS grid inset 40px from the slide edges, with 12px gaps between cells. Composition happens by assigning colored panels to grid spans — `grid-column: 4 / span 5` and `grid-row: 1 / span 5` is how layout is described. The grid is rigid; the visual variety comes from how panels of `{colors.paper}`, `{colors.ink}`, and `{colors.accent-lemon}` are arranged across cells.

The typeface stack is intentionally narrow. **Space Grotesk** at weight 700 carries every display moment in strict uppercase with negative letter-spacing. Body copy runs at weight 400 in mixed case. **JetBrains Mono** at weight 400 carries every label, page number, axis tag, and metadata string — always uppercase with 0.08–0.12em positive tracking. There is no third face. The contrast between heavy Space Grotesk uppercase and JetBrains Mono uppercase is the system's primary typographic rhythm.

The palette has three working colors plus a putty surface. **Paper** (`{colors.paper}` — a warm ecru off-white) is the default panel fill. **Ink** (`{colors.ink}` — a near-black) is the structural color: text on paper, fills for inverted panels, all dividers, all rules. **Accent Lemon** (`{colors.accent-lemon}` — an electric neon-yellow #E6FF3D) is the loud signal — used as panel fill, as a highlight `<mark>` swatch inside headlines, and as the second series in charts. **Putty BG** (`{colors.bg}`) is the slightly cooler ecru that sits behind the 40px slide inset, framing the composition like a passe-partout. **Muted graphite** is present in the token list but rarely used in practice.

Depth is created entirely through **panel adjacency and color contrast**, not shadows. Cards do not carry box-shadows; cards do not have rounded corners; cards do not have borders (except for table cells and pill outlines, which use 1.5px solid ink). The visual weight of a slide is determined by how many cells are filled with `{colors.ink}` vs. `{colors.accent-lemon}` vs. `{colors.paper}`. A composition with three yellow panels reads as much more aggressive than one with a single yellow panel.

**Density philosophy: panel-rich.** Fill the 12×8 field with substantial color regions, sized for the supplied material. Four to eight panels is useful for a multi-fact spread, not a content quota. A short message can occupy two large contrasting panels; an unlettered paper or ink field can be honest negative space. Do not invent a stat, copyright, eyebrow or extra claim to make the grid feel full. A section divider can pair its actual ordinal with one headline panel; if sections are not numbered, let the title occupy that area.

**Key Characteristics:**
- Universal 12-column × 8-row CSS grid (`{components.frame}`) inset 40px from each slide edge, with 12px gaps between cells.
- Three-color panel system: paper ecru (`{colors.paper}`) as default, ink black (`{colors.ink}`) for inverted blocks, accent lemon (`{colors.accent-lemon}`) for signal blocks.
- Space Grotesk weight 700 uppercase with negative letter-spacing for every display element.
- JetBrains Mono uppercase with 0.08–0.12em tracking for every label, page number, axis tag.
- A signature corner-mark and blockmark — small 2×2 block stamps that act as decorative identity tags.
- Inline `<mark>` element that wraps words inside a headline in a neon-yellow swatch — the system's headline emphasis mechanism.
- A persistent page-number tag (`{components.pagenum}`) anchored bottom-left of every slide.
- No rounded corners, no drop shadows, no gradients (apart from photo-region stylized noise textures).
- Stat numerals scale up to 240px and even 320px — type is allowed to dominate entire panels.

## Colors

### Palette

- **Paper** (`{colors.paper}` — #F5F4EF): Warm ecru off-white. The default panel fill, the default text color when inverted, and the canvas of any "neutral" card. Slightly creamier than pure white — chosen so the neon-yellow accent doesn't vibrate against it.
- **BG (Putty)** (`{colors.bg}` — #ECECE8): A cooler ecru that sits behind the 40px slide inset, framing the grid composition like a passe-partout. The 40px border of putty around every slide is the system's universal frame.
- **Ink** (`{colors.ink}` — #0A0A0A): The structural near-black. Used for all text on paper, all inverted panel fills, all dividers, all table cell borders, all pill outlines. Not pure #000 — slightly softer.
- **Accent Lemon** (`{colors.accent-lemon}` — #E6FF3D): Electric neon-yellow. The signal color. Used as a panel fill, as the inline `<mark>` highlight swatch inside headlines, as the second chart series, as the affirmative pill fill, and as page-number variant background. Use primarily as a fill. Lemon text may appear only on ink panels after a contrast check; use ink-on-lemon marks on light panels.
- **Muted** (`{colors.muted}` — #8A8A85): A reserved graphite tone present in the token list but used only at low opacity on photo-region tags. Available for de-emphasized text but rarely deployed.
- **Stage BG** (`{colors.stage-bg}` — #1A1A1A): The viewport background outside the 1920×1080 slide canvas. This is the shared runtime surround color, not part of slide design.

### Defaults

- **Default slide canvas background**: `{colors.bg}` — visible as the 40px putty frame around every grid composition.
- **Default panel fill**: `{colors.paper}`. When in doubt, a panel is paper.
- **Default primary headline color**: `{colors.ink}` on paper or lemon panels; `{colors.paper}` on ink panels.
- **Default body text color**: `{colors.ink}` on paper/lemon; `{colors.paper}` on ink.
- **Default label / metadata color**: `{colors.ink}` on paper, at opacity 0.7–0.85 to mute; `{colors.paper}` on ink, at opacity 0.7–0.85.
- **Default chart series color**: `{colors.ink}` for series A; `{colors.accent-lemon}` for series B (with 1.5px ink border).
- **Default emphasis mechanism inside a headline**: wrap in `<mark>` for a neon-yellow swatch on ink text. This is the system's primary headline-level emphasis.
- **Default affirmative state**: `{colors.accent-lemon}` fill. Default negative state: `{colors.ink}` fill. Default neutral state: `{colors.paper}` fill with `{colors.ink}` border.

Neon yellow is the system's only chromatic accent — never substitute red, blue, or any third color. Yellow attracts attention and therefore can imply emphasis. Assign it according to the locked narrative; do not turn arbitrary panel position into a recommendation or priority.

## Typography

### Font Family

The system uses two web fonts: **Space Grotesk** (weights 400, 500, 700) for all display and body, and **JetBrains Mono** (weights 400, 500) for all labels and metadata. There is no third face — no serif, no italic, no display script. The system's character lives in the weight contrast between Space Grotesk 700 uppercase and Space Grotesk 400 mixed case, plus the structural mono labels in JetBrains Mono.

A specific inline mixing rule: **the `<em>` tag inside a Space Grotesk headline switches color to `{colors.accent-lemon}` on an ink panel and stays upright** (font-style is normalized to non-italic). Em is repurposed as a yellow inline color switch, like the `<mark>` swatch but without the background fill.

A second inline mixing rule: **the `<mark>` element wraps words inside a Space Grotesk headline in a neon-yellow swatch with 0 6px padding**, creating the highlighter-pen emphasis that is a recurring signature of the system.

### Type Scale

| Token | Size | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.section-num}` | 320px | Space Grotesk | 700 | Hero section ordinal in a section-divider panel |
| `{typography.stat-num-lg}` | 240px | Space Grotesk | 700 | Featured large numerical stat |
| `{typography.stat-num}` | 156px | Space Grotesk | 700 | Standard stat numeral |
| `{typography.display}` | 132px | Space Grotesk | 700 | Cover, section, or hero display headline |
| `{typography.stat-num-sm}` | 96px | Space Grotesk | 700 | Compact stat numeral inside a small card |
| `{typography.title}` | 88px | Space Grotesk | 700 | Primary content-slide headline |
| `{typography.subtitle}` | 56px | Space Grotesk | 700 | Secondary headline, region heading |
| `{typography.card-headline}` | 44px | Space Grotesk | 700 | Card title at panel-fill scale |
| `{typography.card-h3}` | 30px | Space Grotesk | 700 | Sub-headline inside a smaller card |
| `{typography.body}` | 28px | Space Grotesk | 400 | Body paragraph inside a feature card |
| `{typography.label}` | 24px | JetBrains Mono | 400 | Standard mono label or kicker |
| `{typography.body-sm}` | 22px | Space Grotesk | 400 | Compact body inside dense cards |
| `{typography.pagenum}` | 24px | JetBrains Mono | 400 | Page-number tag (e.g. "01 / 12") |
| `{typography.label-sm}` | 16px | JetBrains Mono | 400 | Secondary metadata label, copyright text |
| `{typography.label-xs}` | 14px | JetBrains Mono | 400 | Axis labels, table header text, fine print |

### Defaults

- **Default primary section headline**: `{typography.title}` (88px) — the workhorse content-slide headline.
- **Default cover or section-opening display**: `{typography.display}` (132px) for a cover; `{typography.section-num}` (320px) for a section-divider ordinal.
- **Default body paragraph size**: `{typography.body}` (28px). For dense multi-card slides, drop to `{typography.body-sm}` (22px).
- **Default label / metadata size**: `{typography.label}` (24px) for standalone mono tags; `{typography.label-sm}` (16px) for inline metadata.
- **Default stat numeral**: `{typography.stat-num}` (156px). Reach for `{typography.stat-num-lg}` (240px) only when the stat occupies an entire featured panel.
- **Default weight for any display element**: 700. Display in any other weight does not exist in this system.
- **Default weight for body**: 400.

When unsure, reach for `{typography.title}` for the slide's primary text moment and pair it with `{typography.body}` for supporting copy.

### Signature Treatments

These treatments are **non-optional whenever the corresponding element type is used**:

- **Every Space Grotesk display, title, subtitle, card-headline, and stat numeral is uppercase** with negative letter-spacing (-0.005 to -0.05em depending on scale). Mixed-case display does not exist in this system.
- **Body copy is mixed case at weight 400.** Never uppercase body.
- **Every JetBrains Mono element is uppercase** with at least 0.08em positive tracking.
- **The `<mark>` element inside a headline always uses `{colors.accent-lemon}` background with `{colors.ink}` text and 0 6px padding.** The yellow highlighter swatch is the system's headline emphasis signal.
- **On ink panels, `<em>` may use lemon text and stay upright (font-style: normal).** On paper/lemon panels use the ink-on-lemon `<mark>` treatment instead. Italic letterforms are not part of this recipe.
- **Negative letter-spacing scales with size**: smaller headlines use -0.005em to -0.015em; larger displays use -0.02 to -0.05em. The tighter the tracking, the more compressed and brutalist the headline reads — at 320px size, -0.05em is correct.
- **Page numbers are always JetBrains Mono at 24px with 0.04em tracking** in the format `01 / 12` with a single padded zero and slash separator.

### Typography Principles

The rhythm is **heavy uppercase display + light mixed-case body + small uppercase mono label**. Switching any of those three modes breaks the editorial register. Body in uppercase reads as a shouting paragraph. Display in mixed case reads as a different design system. Mono in mixed case reads as code, not editorial metadata.

Italic letterforms are not used. The `<em>` and `<mark>` tags are repurposed as color/highlight switches, not italic emphasis. Underline is not used. Bold inside body text is not used — emphasis is achieved by isolating the headline in its own cell.

## Layout

### Canvas System

Compose on the shared fixed 1920×1080 stage. The 40px putty inset, internal grid and pixel-fixed type remain in stage coordinates; runtime framing outside the stage belongs to the shared runtime.

### The Universal Frame

Every slide carries a `.frame` div positioned `absolute; inset: 40px` with `display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: repeat(8, 1fr); gap: 12px`. This is the structural constant of the system: a 12-column × 8-row grid with 12px gaps, inset 40px from the slide edges. Some slide variants increase the grid gap to 16–18px for breathing room, but the column/row counts and the 40px inset never change.

Composition happens entirely by spanning cells inside this grid. A panel occupying `grid-column: 1 / span 4; grid-row: 1 / span 3` is a 4-cell-wide × 3-row-tall card in the upper-left. The grid is the only layout language — flexbox is used only for internal alignment inside a single cell.

### Padding Inside Cells

Internal padding inside a cell varies with cell size and purpose:
- Compact cards (small stat tiles): 24px × 28px
- Standard cards (feature panels): 28px × 32px
- Large cards (chapter panels): 36px × 32px
- Hero cards (section dividers): 40px × 44px

These are not rigid tokens — they're a practical scale. Choose the padding that gives the card's internal type room to breathe without losing the panel's identity.

### Persistent Chrome

Every slide carries a `{components.pagenum}` tag bottom-left in the format `01 / 12`. Three variants:
- Default: paper background, ink text.
- `.invert`: ink background, paper text.
- `.lemon`: yellow background, ink text.

Some slides use a 2×2 geometric corner mark as abstract punctuation. Use an actual supplied brand mark for identity and only a real copyright string when provided; neither is mandatory.

## Depth and Elevation

### No Shadows, Color-Block Adjacency Only

The system uses **zero box-shadow declarations** on any structural panel. Depth is entirely a function of color adjacency: a paper panel next to an ink panel reads as elevated (paper toward viewer); a yellow panel next to an ink panel reads as the loudest signal in the composition. The 12px grid gap between panels reveals the putty `{colors.bg}` between cells, which acts as a unifying frame color.

### No Gradients (Except Photo Regions)

The only gradients in the system are inside photo-region placeholder textures, where a `radial-gradient` plus a `repeating-linear-gradient` creates a stylized B&W-grain texture as a stand-in for photography. These textures live inside cells classed `.photo` or `.ph`, never on a structural panel.

### Borders on Tables and Pills

- Table cells (`{components.table-cell}`) use 1.5px solid ink dividers on bottom and right edges to create a wireframe grid.
- Comparison pills (`{components.pill-part}`) use a 1.5px solid ink border as the partial-state outline.
- Chart axes use 2px solid ink as the bottom-left wireframe.
- The yellow bar in a bar chart (`{components.bar-fill-lemon}`) carries a 1.5px solid ink border to prevent the bright fill from vibrating against the paper background.

No other elements carry borders. Cards are borderless and rely on fill contrast.

## Shapes and Treatment

### Border Radius

| Value | Use |
|---|---|
| 0px | Every element — cards, pills, tags, page numbers, table cells, chart bars, blockmarks |

The system has **zero border-radius** on any element. Every shape is a strict rectangle or square. The block-stamp and corner-mark glyphs are composed of right-angle squares.

### Border Weights

- **1.5px solid `{colors.ink}`** — used on table cell dividers, pill outlines, and the yellow bar's border. The most common border weight.
- **2px solid `{colors.ink}`** — used on chart axes (left and bottom of the plot area) for slightly stronger wireframe.

No other border weights exist. There are no muted-color borders, no dashed borders (except a very specific `1px dashed rgba(0,0,0,.18)` chart grid line used internally).

### Decorative Element Types

**Block stamp (`{components.blockmark}`)** — A 2×2 grid of small squares with the top-left and bottom-right cells filled (and the other two transparent). An abstract diagonal-fill geometric stamp, not an invented logo or endorsement. Sized from 36px (corner-mark) up to 96px (block stamp on quote slides). May render in ink or accent-lemon.

**Corner mark (`{components.corner-mark}`)** — A 36px × 36px version of the block stamp anchored top-right of a panel. Acts as abstract geometric punctuation.

**Arrow (`{components.arrow}`)** — An inline SVG right-pointing arrow at 64px × 64px (or 24px × 24px for small flow indicators). Used as a flow signal between process steps and as an out-pointing indicator on stat panels.

**Highlight mark (`{components.highlight-mark}`)** — A neon-yellow swatch wrapping one or more words inside a headline via the `<mark>` element. The system's headline emphasis mechanism. Padding is `0 6px` (or `0 8px` at larger sizes).

**Page number (`{components.pagenum}`)** — Bottom-left position-tag in the format `01 / 12` with a colored background. The three background variants (paper, ink, lemon) let the page number adapt to whichever color is most visible against the active slide's dominant panels.

**Photo region** — A cell classed `.photo` with a deep-black background (#111) containing a `.ph` child that renders a stylized B&W noise texture (radial + diagonal stripes). A mono caption belongs here only when it is supplied content. Working image placeholders must become real imagery or be recomposed away before delivery; do not manufacture documentary evidence or placeholder labels.

**Pills (`{components.pill-yes}`, `{components.pill-part}`, `{components.pill-no}`)** — Inline mono uppercase labels in a comparison cell with three color states: yellow fill (affirmative), paper with ink border (partial), ink fill with paper text (negative). All three are 0-radius rectangles, not rounded pills despite the name.

**Section ordinal panel** — A panel containing a 320px Space Grotesk weight-700 numeral as the entire content. Used as the visual identity of a section-divider slide; the rest of the slide carries a complementary headline panel in ink.

**Chart bar pair** — Vertical bars in groups of two (series A in solid ink, series B in yellow with ink border). The bars share equal width inside their column and the column gap is set by the parent grid.

## Do's and Don'ts

### Do
- Compose every slide on the 12-column × 8-row grid (`{components.frame}`) with 40px inset and 12px (or 18px for breathing room) gaps. The grid is the system's identity.
- Use the grid corner to corner with panel spans sized for real content. Blank color fields are allowed; do not add facts to populate the design.
- Use `{colors.paper}` as your default panel fill, `{colors.ink}` for contrast blocks, and `{colors.accent-lemon}` for one to three signal panels per slide.
- Set every display, title, subtitle, and stat numeral in Space Grotesk 700 uppercase with negative letter-spacing. The combination is the system's typographic voice.
- Use `<mark>` inside a headline to wrap one or more words in a yellow highlighter swatch — the system's primary headline emphasis.
- Use upright lemon emphasis only on ink panels and only for an established emphasis. On light panels use the ink-on-lemon mark.
- Place a `{components.pagenum}` tag bottom-left of every slide. Choose the background variant (paper / ink / lemon) that contrasts with the lower-left panel.
- Use JetBrains Mono uppercase with at least 0.08em tracking for every label, page number, axis tag, and metadata string.
- Render pills (yes / part / no) in their canonical three-color treatment inside comparison tables.
- Allow stat numerals to scale to 156–320px when they occupy a featured panel. Large numbers are part of the editorial poster identity.

### Don't
- Don't add box-shadow to any panel. Depth comes from color adjacency only.
- Don't round any corner on any element. The system is strictly rectangular.
- Don't put display headlines in mixed case. Space Grotesk display is always uppercase.
- Don't put body copy in uppercase. Mixed case at weight 400 is the body voice.
- Don't introduce a second accent color. Neon yellow is the only chromatic accent — adding red, blue, or green breaks the system.
- Don't use lemon text on paper or lemon surfaces. On ink, check the actual text size and contrast before using the optional lemon text treatment.
- Don't compose layouts outside the 12×8 grid. Absolutely-positioned elements that break the grid (page number, corner mark, copyright) are explicitly the only exceptions.
- Don't use italic letterforms. The `<em>` tag is repurposed as a color switch — italic visual style does not exist here.
- Don't use rounded "pill" shapes despite the pill component naming. Pills are 0-radius rectangles.
- Don't scatter tiny cards across an empty grid. Enlarge or combine panels into a coherent poster field; two strong panels can carry a short message honestly.

## Stage, interaction and export

Use the [shared deck runtime](../../../references/deck-runtime.md) for the fixed stage, navigation and export integration. Keep all layout decisions inside the 1920×1080 stage; the audience viewport scales the complete composition uniformly, without internal mobile breakpoints. Do not add a template-specific navigation engine, active-state protocol, print path or presenter controls.

Check the recipe's characteristic edges at the rendered size: type extents, rotated objects, shadows, textures and panel boundaries. Appearance alone does not prove fit or contrast. Preserve the content and repair the layout when a check fails.

## CJK & International Content

### Pairing by role

| Role | Latin face | Chinese candidate | Starting weight |
|---|---|---|---|
| Heavy display / card heading | Space Grotesk 700 | Noto Sans SC | Compare available 700 and 900 faces |
| Body | Space Grotesk 400 | Noto Sans SC | 400 |
| Labels | JetBrains Mono 400 | Noto Sans SC | 400, upright |

CJK display carries the grid's poster force through size, weight and panel area; uppercase has no corresponding operation in Chinese. Start with heavy available weights, but judge the actual strokes at the intended stage size. Neither 900 nor a specific family is a proved equivalent of Space Grotesk.

### Explicit mixed-script styles

Use a Latin-first family stack with Noto Sans SC after Space Grotesk. A fallback stack does not change a CSS weight from 700 to 900: use explicit language spans when weights differ, and disable synthetic weight/slant. Numeric page positions and source numbers may remain in JetBrains Mono or Space Grotesk according to their existing role.

Reset Chinese tracking to 0. The Latin negative tracking is a treatment for those glyphs, not a rule to compress every script. Start at 1.15–1.25 line-height for display and 1.75–1.85 for body, then inspect. Preserve original punctuation, reading order and qualifications.

### Panel and highlight composition

The 12×8 grid, 40px inset and 12–18px gaps remain fixed at 1920×1080. Give a longer Chinese heading more columns or rows before shrinking it. A useful dense spread can use fewer, larger panels: density comes from the filled color fields, not a quota of labels or claims.

A lemon `<mark>` behind ink text can emphasize the same approved phrase in either script. Keep an entire meaningful phrase together and allow vertical room around its glyphs. Lemon text is restricted to ink panels and still needs contrast checking; on paper or lemon use the ink-on-lemon swatch. The color choice must not create a new recommendation, ranking or winning option.

### Font and diagram checks

Load the exact requested faces and confirm glyph coverage in the rendered deck; use local or embedded assets for release. Check the biggest section numerals separately from the longest CJK headline. Keep digits as supplied rather than altering numbering conventions for decoration. Process arrows must still connect the real sequence after panel spans change. Recompose or split a table that no longer fits; never fill empty cells with invented data.

## Iteration Guide

1. Every new slide composes its layout on the 12×8 grid via `grid-column` and `grid-row` span declarations. Never break the grid with absolute positioning except for the page-number tag, corner-mark, and copyright stamp.
2. Every new panel uses one of three fill colors: paper (default), ink (inverted), or accent-lemon (signal). Don't introduce a fourth panel color.
3. Every new display headline is Space Grotesk weight 700 uppercase with negative letter-spacing scaled to the headline size (-0.005em at 30px, up to -0.05em at 320px).
4. Every new body element is Space Grotesk weight 400 mixed case at one of the three body sizes (28px, 24px, 22px).
5. Every new label or metadata tag is JetBrains Mono uppercase with at least 0.08em tracking.
6. Use ink and lemon for chart series, with explicit labels and outline/hatch variants for additional supplied series. If distinctions become unclear, split the chart or change systems rather than removing a series.
7. Every new card uses 0 border-radius. Square corners are non-negotiable.
8. Render an established headline emphasis with an ink-on-lemon mark, or upright lemon text on ink only. Do not introduce bold, italic, underline or a new priority.
9. Every new comparison cell uses the three-state pill system: yellow fill (yes), paper with ink border (partial), ink fill (no).
10. Rebalance panel spans around the actual message. Empty cells can become larger fields or whitespace; they are not evidence that content is missing.

## Known Gaps

- An abstract B&W texture can remain when the locked direction calls for texture rather than photography. If the region is meant to show evidence or a person, use the real supplied asset; an abstract texture cannot stand in for it.
- Bar chart heights are set via inline `style="height: XX%"` declarations on each bar fill. There is no data-binding layer.
- The arrow SVG used between process steps is hand-pathed inside each slide template; if a slide adds or removes process nodes, the arrow positions must be recomputed manually.
- Fixed stage pixels preserve the composition; the shared runtime handles letterboxing and uniform scaling.
- The `{colors.muted}` (#8A8A85) token is defined but used only in low-opacity overlays on photo region tags — it has no role in the main type or panel system.
