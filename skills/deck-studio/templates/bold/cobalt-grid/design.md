---
version: alpha
name: Cobalt Grid
description: "A Japanese-magazine trend-report system built on warm cream paper, electric cobalt ink, and a graph-paper grid that lives permanently behind every slide. Newsreader serif headlines tower at 194.4px while DM Mono carries chrome and ticker text. The signature decoration is a pixel-glitch column — vertical scanlines stair-stepped down the right edge of declarative slides — paired with abstract stripe/block patches. The cultural reference is WIRED Japan, Shift magazine, and architectural trend reports printed in two-color risograph: cream + one cobalt."

colors:
  paper: "#F0EBDE"
  paper-2: "#E6E0CE"
  ink: "#1F2BE0"
  ink-soft: "#5560E5"
  grid: "rgba(31, 43, 224, 0.10)"
  ink-faint: "rgba(31, 43, 224, 0.18)"

color-aliases:
  rule: ink
  bg: paper

typography:
  display-hero:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "194.4px"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: -0.008em
  display-closing:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "151.2px"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: -0.005em
  display-chapter:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "108px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.005em
  display-quote:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "97.2px"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: -0.005em
  display-manifesto:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "118.8px"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: -0.005em
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "88.6px"
    fontWeight: 400
    lineHeight: 0.95
  headline-index:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "91.8px"
    fontWeight: 400
    lineHeight: 0.95
  vbig-numeral:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "194.4px"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: -0.015em
  ed-callout:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "49.7px"
    fontWeight: 400
    lineHeight: 1.1
  row-headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "38.4px"
    fontWeight: 400
    lineHeight: 1.05
  table-name:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.15
  micro:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.16em
    textTransform: uppercase
  micro-strong:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.18em
    textTransform: uppercase
  micro-sm:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.18em
    textTransform: uppercase
  body:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  body-lede:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
  body-stat:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.5
  mono-tag:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.04em
  mono-chrome:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.06em
  mono-tick:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.04em

spacing:
  edge: "69.1px"
  edge-inner: "153.6px"
  pad-top: "86.4px"
  pad-bottom: "108px"
  gap-lg: "56px"
  gap-md: "23.8px"
  gap-sm: "17.3px"
  gap-xs: "13px"

canvas:
  width: 1920px
  height: 1080px

components:
  graph-paper-grid:
    backgroundImage: "linear-gradient(to right, {colors.grid} 1px, transparent 1px), linear-gradient(to bottom, {colors.grid} 1px, transparent 1px)"
    backgroundSize: "42.2px 42.2px"
    description: "Permanent ::before pseudo on every stage. 28–44px squared graph paper grid in 10%-opacity cobalt that sits behind every slide at z-index 1. Cannot be turned off — it is the canvas tone."
  hairlines:
    height: "1.5px"
    background: "{colors.ink}"
    description: "Two persistent slim cobalt rules — one at the top of every slide (≈28.1px from top) and one near the bottom (≈21.6px from bottom) — both inset from edges by {spacing.edge}. They frame the slide composition."
  pagenum:
    position: absolute
    right: "{spacing.edge}"
    bottom: "51.8px"
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "13px"
    color: "{colors.ink}"
    letterSpacing: 0.06em
    description: "Mono cobalt page number anchored bottom-right above the bottom hairline. One per slide."
  nav-hint:
    position: absolute
    left: "{spacing.edge}"
    bottom: "51.8px"
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "12px"
    color: "{colors.ink}"
    letterSpacing: 0.08em
    opacity: 0.4
    description: "Mono cobalt navigation hint anchored bottom-left, mirrors pagenum."
  pixel-glitch:
    description: "Stair-stepped column of vertical scanlines, rendered as inline SVG. Each stepped rectangle contains evenly-spaced cobalt vertical lines on cream. Sits absolutely positioned (typically right edge) at z-index 3, decorative only. Size ranges from 307.2px × full-height (compact decoration) to 614.4px × full-height (signature cover decoration)."
  pixel-swatch:
    display: grid
    gridTemplateColumns: "repeat(8, 1fr)"
    gridTemplateRows: "repeat(8, 1fr)"
    gap: 1.5px
    background: "{colors.paper}"
    padding: 4px
    boxShadow: "0 0 0 1.5px {colors.paper}"
    description: "Abstract stripe/block swatch of cobalt rectangles on cream, without finder squares or scanning affordance. Paper-fill ensures it reads as a discrete patch when overlapping the pixel-glitch column. Typical size 58–100px square."
  topbar-rule:
    borderBottom: "1.5px solid {colors.ink}"
    paddingBottom: "15.1px"
    description: "1.5px cobalt rule under the topbar of an index, data, or table layout. Below the rule sits a Newsreader headline (left) and a supplied mono lab-tag (right)."
  row-divider:
    borderBottom: "1px solid {colors.ink-faint}"
    description: "Faint 18%-opacity cobalt rule between rows of an index list, table, or ledger."
  attribution-rule:
    borderTop: "1px solid {colors.ink}"
    paddingTop: "13px"
    description: "Solid cobalt rule above a quote attribution or manifesto byline."
  pixel-stack-bars:
    description: "Vertical bar chart rendered as a column of stacked 'cells' — flex column-reverse with 3px gaps, each cell a small horizontal block. Cells default to 10%-opacity cobalt (the grid color); .on cells fill solid cobalt to represent the value. Reads as a pixelated bar made of grid units."
  ledger-row:
    display: grid
    gridTemplateColumns: "76px 0.6fr 1.4fr 0.7fr 0.5fr"
    gap: "26.9px"
    borderBottom: "1px solid {colors.ink-faint}"
    description: "Dense table row carrying a num-tag, name (Newsreader), description (Hanken Grotesk), mood-tag, and delta-tag (mono with up/down arrow prefix). Header row uses 1.5px solid cobalt bottom border."
  vstack-label:
    fontFamily: "DM Mono, ui-monospace, monospace"
    writingMode: "vertical-rl"
    textOrientation: "mixed"
    letterSpacing: 0.04em
    description: "Vertical-orientation mono label column anchored to the right edge of a slide. Carries supplied catalogue metadata; preserve its language and test mixed-script vertical orientation."
  delta-up:
    content: "↑ "
    description: "Up arrow prefix via ::before on a mono delta tag in the ledger table."
  delta-down:
    content: "↓ "
    opacity: 0.6
    description: "Down arrow prefix via ::before, at readable full ink; declining value is not automatically a negative outcome."
  delta-flat:
    content: "— "
    opacity: 0.6
    description: "Em-dash prefix via ::before, at readable full ink and used only for an actual unchanged value."
---

## Stage and Content Contract

This recipe supplies visual decisions for Deck Studio's fixed **1920×1080** stage. Use the canonical [runtime](../../../runtime/) and [runtime contract](../../../references/deck-runtime.md) for stage scaling, navigation, focus, capture and export. Do not create a second scaler, slide controller, keyboard handler or print engine. The whole stage scales uniformly, including on phones; the composition does not internally reflow with the browser viewport.

All dimensions below are stage-space authoring values. A range is a choice to resolve while composing, not permission for live viewport-dependent layout. Body and data text must remain readable in the intended presentation or reading setting: enlarge and recompose, split while retaining all locked material, or choose another system when the content does not fit. Never clip, scroll, hide, omit or invent material to complete a layout. Visible labels, metrics, attribution, ordinals, emphasis and status come from the content lock; wordless geometry may supply atmosphere.

## Overview

Cobalt Grid is a **two-color trend-report editorial system** built on three immovable foundations: a warm cream paper canvas (`{colors.paper}`), an electric cobalt ink (`{colors.ink}`), and a **permanent graph-paper grid** that sits behind every slide. The grid is not optional decoration — it is rendered via a `::before` pseudo on every `.stage` and cannot be turned off. The aesthetic is "two-color risograph monograph": cream + cobalt only, with the grid lending the entire deck the feel of architectural tracing paper or a Japanese trend report.

The typeface stack is a deliberate three-face conversation. **Newsreader** — a contemporary literary serif with low-modulation roman letterforms — carries every display moment, every section headline, every stat numeral. Newsreader is used at weight 400 only; the type relies on size to assert hierarchy, not weight. **Hanken Grotesk** — a humanist sans — carries every body paragraph, every uppercase label, every micro-text. Hanken runs at 400 for body and 600 for labels. **DM Mono** — a monospace — carries every chrome element: page numbers, mono tags, axis ticks, vertical-stack labels, delta arrows in tables. The three-face system creates the system's identity: serif statements + sans bodies + mono chrome.

The palette is **strictly two-color**: cream and cobalt, with a softer cobalt `{colors.ink-soft}` and two opacity tones (`{colors.grid}` at 10%, `{colors.ink-faint}` at 18%) for atmospheric and structural use. There are no accent colors. Cobalt is the *only* ink color — for headlines, body, borders, page numbers, the graph paper, the pixel-glitch decoration, and the pixel patches. The cream paper is the *only* surface. Even the pixel-stack bar chart uses cobalt at two opacities (10% off, 100% on) to render data.

Depth is **flat with structural rules**. There are no drop shadows, no elevated cards, no rounded surfaces. Hierarchy comes from:
- The 1.5px cobalt **hairline frame** (top and bottom of every slide).
- 1.5px cobalt **topbar rule** under section headers.
- 1px faint-cobalt **row dividers** between table or index entries.
- The 10%-opacity **graph paper grid** behind everything.
- The pixel-glitch and Pixel-swatch **decorative SVG patches** as compositional accents.

**Density philosophy: medium to dense, structured by the grid.** Cobalt Grid is built for editorial density — magazine spreads, trend indices, data ledgers. A correctly composed slide pairs one large Newsreader headline with multiple structured information rows (an index, a ledger or a pixel-stack chart sized to the actual entries). The grid organizes actual content; never invent rows or data to fill it. The exception is the manifesto, quote, and colophon layouts, which deliberately leave space open and let the graph paper breathe. Choose density by slide type: chapter / manifesto / quote / colophon are sparse; index / data / table are dense.

**Key Characteristics:**
- Cream paper canvas `{colors.paper}` with electric cobalt `{colors.ink}` as the only ink — strictly two-color.
- Permanent 28–44px graph-paper grid in 10%-opacity cobalt behind every slide.
- Top and bottom 1.5px cobalt hairlines frame every slide with `{spacing.edge}` insets.
- Newsreader serif at weight 400 for every display/headline; Hanken Grotesk sans for body/labels; DM Mono for all chrome.
- Pixel-glitch vertical scanline columns and abstract stripe/block swatches as the system's signature decorative patches.
- Display type can be enormous — `{typography.display-hero}` up to 194.4px (≈194px on a 1080-tall display) and `{typography.vbig-numeral}` to 240px.
- Hanken labels are uppercase at 0.16–0.18em letter-spacing; mono tags carry 0.04–0.06em tracking.
- Pixel-stack bar charts render data as stacks of grid-unit cells (cobalt on / cobalt-10% off).
- Page number bottom-right, mono navigation hint bottom-left, both anchored above the bottom hairline.

## Colors

### Two-Color System
- **Paper** (`{colors.paper}` — #F0EBDE): The canvas. Warm cream off-white with a clear yellow-warm bias — closer to "newsprint paper" than "blank white." Used as the universal slide background and as the fill behind Pixel-swatchs so they read as discrete patches against the pixel-glitch column.
- **Paper-2** (`{colors.paper-2}` — #E6E0CE): A slightly deeper cream. Defined in the palette but used sparingly — available for subtle region differentiation when needed.
- **Ink** (`{colors.ink}` — #1F2BE0): Electric cobalt / royal blue. The *only* ink color in the system. Used for all headlines, all body text, all borders, all chrome, the graph paper grid, the pixel-glitch decoration, and the pixel patches. The high saturation is intentional — at full strength it reads as risograph-printed cobalt, not navy blue.
- **Ink Soft** (`{colors.ink-soft}` — #5560E5): A lighter cobalt for secondary marks. Defined in the palette but used sparingly — most softened cobalt in the system comes from opacity-on-ink rather than this dedicated tone.
- **Grid** (`{colors.grid}` — rgba(31, 43, 224, 0.10)): 10%-opacity cobalt. Used exclusively for the permanent graph-paper grid behind every slide, and for the "off" cells in pixel-stack bar charts.
- **Ink Faint** (`{colors.ink-faint}` — rgba(31, 43, 224, 0.18)): 18%-opacity cobalt. Used exclusively for the faint row dividers in index lists, tables, and ledgers — between rows that share the same dense information layer.

### Defaults
- **Default slide surface**: `{colors.paper}`.
- **Default headline color**: `{colors.ink}` — every Newsreader serif headline is cobalt. There is no other headline color.
- **Default body text color**: `{colors.ink}` — body is also cobalt, just smaller. Cobalt-on-cream is the system's only text relationship.
- **Default label / mono / micro color**: `{colors.ink}`.
- **Default border color (structural rules)**: `{colors.ink}` at 1.5px solid.
- **Default border color (row dividers within dense lists)**: `{colors.ink-faint}` at 1px solid.
- **Default grid color**: `{colors.grid}` — never visible at full strength; never disabled.
- **Default chart data color (on)**: `{colors.ink}`.
- **Default chart data color (off)**: `{colors.grid}`.

The system has **no accent color** in the populist sense. A second color does not exist — adding a red callout, a green stat, or a yellow highlight breaks the risograph two-color identity. When emphasis is needed, increase type size, switch from Hanken to Newsreader, use an approved visual distinction; a delta arrow must represent actual change and readable text must not be faded.

## Typography

### Font Family
The system runs on a **three-face conversation**: `Newsreader` (serif, weight 400 roman / 400 italic) carries every display and headline; `Hanken Grotesk` (sans, weights 400–700) carries every body, label, and micro-text; `DM Mono` (monospace, 400–500) carries every chrome element. There is no fourth face.

Newsreader's roman letterforms run at weight 400 almost exclusively — the type relies on size to assert hierarchy, not weight. The manifesto requires a verified Newsreader 400 italic style and is used inside the manifesto's `.roman` modifier (which is *non-italic* — the modifier flips the italic body back to roman for an inline pull moment) and is available for inline `<em>` emphasis. Hanken Grotesk carries body at 400 and labels at 600. DM Mono provides chrome at 400.

The serif/grotesk/mono three-way pairing is the system's primary typographic rhythm. Each face has a strict role: serif = statement, grotesk = supporting copy, mono = catalogue chrome.

### Type Scale

| Token | Size | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.vbig-numeral}` | 194.4px | Newsreader | 400 | Largest numerical display — hero stat figure |
| `{typography.display-hero}` | 194.4px | Newsreader | 400 | Largest title — cover or hero display |
| `{typography.display-closing}` | 151.2px | Newsreader | 400 | Conclusive headline on a colophon/closing layout |
| `{typography.display-chapter}` | 108px | Newsreader | 400 | Section-opening or chapter title |
| `{typography.display-manifesto}` | 118.8px | Newsreader | 400 | Manifesto statement display |
| `{typography.display-quote}` | 97.2px | Newsreader | 400 | Pull-quote body |
| `{typography.headline-index}` | 91.8px | Newsreader | 400 | Index or trend-list section header |
| `{typography.headline}` | 88.6px | Newsreader | 400 | Data, table, or chart section header |
| `{typography.ed-callout}` | 49.7px | Newsreader | 400 | Editorial subtitle below a hero title |
| `{typography.row-headline}` | 38.4px | Newsreader | 400 | Per-row headline inside an index list |
| `{typography.table-name}` | 28px | Newsreader | 400 | Per-row name cell inside a ledger table |
| `{typography.body-lede}` | 18px | Hanken Grotesk | 400 | Lead paragraph below a chapter title |
| `{typography.body-stat}` | 17px | Hanken Grotesk | 400 | Descriptive paragraph next to a stat figure |
| `{typography.body}` | 15px | Hanken Grotesk | 400 | Standard paragraph body |
| `{typography.micro-strong}` | 16px | Hanken Grotesk | 600 | Largest uppercase label / kicker |
| `{typography.micro}` | 14px | Hanken Grotesk | 600 | Standard uppercase label / lab-tag |
| `{typography.micro-sm}` | 12px | Hanken Grotesk | 600 | Smallest uppercase label / table header |
| `{typography.mono-tag}` | 15px | DM Mono | 400 | Mono catalogue tag, num-tag in an index row |
| `{typography.mono-tick}` | 14px | DM Mono | 400 | Mono chart tick label, vertical-stack-label entry |
| `{typography.mono-chrome}` | 13px | DM Mono | 400 | Mono page number, navigation hint, secondary meta |

### Defaults
- **Default size for the primary section headline (index, data, table)**: `{typography.headline}` (clamp 46–92px) or `{typography.headline-index}` for index layouts.
- **Default size for a cover or hero display**: `{typography.display-hero}` (clamp 100–200px).
- **Default size for a chapter or section-opener title**: `{typography.display-chapter}` (clamp 56–130px).
- **Default size for paragraph body**: `{typography.body}` (clamp 14–15px).
- **Default size for any inline uppercase label**: `{typography.micro}` (clamp 12–14px) at weight 600 with 0.16em tracking.
- **Default size for any mono chrome (page number, tag, tick)**: `{typography.mono-tag}` (clamp 13–15px).
- **Default weight for Newsreader**: 400. Newsreader bold is not used.
- **Default weight for Hanken body**: 400.
- **Default weight for Hanken label**: 600.

When unsure, reach for `{typography.headline}` (clamp 46–92px) for the slide's primary section header, not `{typography.display-chapter}` (which is for chapter-opening moments only).

### Signature Treatments
These treatments are **non-optional whenever the corresponding element type is used**:

- **Every Newsreader element is set at weight 400.** Newsreader at 600/700 is not used in this system. The literary-serif aesthetic depends on the open roman letterforms at modest weight.
- **Every Newsreader element is rendered in `{colors.ink}` (cobalt).** A cream serif headline does not exist.
- **Every Hanken label, kicker, lab-tag, and micro-text is uppercase with at least 0.16em letter-spacing** at weight 600. Hanken caps without tracking read as untreated.
- **Every DM Mono element is rendered in `{colors.ink}` with 0.04–0.08em letter-spacing.** Mono with tighter tracking reads as code, not editorial.
- **Every display element carries negative letter-spacing.** Display-hero at -0.008em, vbig-numeral at -0.015em, chapter / closing / manifesto / quote at -0.005em.
- **The graph-paper grid is permanent on every slide.** The `.stage::before` rule is not overridable per-slide — every composition sits on top of it.
- **The top and bottom hairlines frame every slide.** The `.hairlines::before` and `.hairlines::after` rules apply by default; they should not be suppressed.
- **Page number sits above the bottom hairline with clear vertical space.** The bottom hairline anchors at `bottom: 21.6px`; the page number anchors at `bottom: 51.8px` — they must not collide.

### Typography Principles
The Newsreader-400 + Hanken-600-uppercase-tracked + DM-Mono-tracked combination is the system's voice. Switching any of those three face/weight/case rules reads as a different design system. Italic is permitted via a verified Newsreader italic style for inline `<em>` and for the manifesto's editorial italic-with-`.roman`-flip treatment. Underline is not used.

Line-height collapses at the top: display-hero / vbig-numeral at 0.92, display-chapter at 1.0, body at 1.5. The tight display + open body contrast is what gives the system its trend-report rhythm.

## Layout

### Canvas System
Compose inside the canonical 1920×1080 stage. Keep the recipe's internal grid, margins and visual layers in stage coordinates. The runtime owns the outer viewport fit and slide visibility; recipe CSS must not replace its container positioning or slide-state classes. Reserve space for actual runtime controls where present and never reproduce them as painted buttons or invented hints.

### Edge and Padding Scale
| Token | Value | Use |
|---|---|---|
| `{spacing.edge}` | 69.1px | Standard slide edge inset for content, page number, hairlines |
| `{spacing.edge-inner}` | 153.6px | Tighter inset used for manifesto-style centered statements |
| `{spacing.pad-top}` | 86.4px | Top padding inside index/data/table frame, below the top hairline |
| `{spacing.pad-bottom}` | 108px | Bottom padding inside index/data/table frame, above the bottom hairline |
| `{spacing.gap-lg}` | 56px | Large gap between major regions inside a slide |
| `{spacing.gap-md}` | 23.8px | Standard inter-element spacing |
| `{spacing.gap-sm}` | 17.3px | Tight spacing — chrome bar inner gap, attribution-to-quote gap |
| `{spacing.gap-xs}` | 13px | Vertical-stack row gap, smallest inter-element gap |

### Universal Chrome Frame
Use two 1.5px cobalt rules, inset by the edge token: top about 28px and bottom about 22px. Supported shared-runtime controls may take the DM Mono cobalt treatment above the lower rule, about 52px from the edge. Do not author a separate page counter or hardcoded navigation hint. Content labels stay readable; 40% opacity is not a default for instruction text.

The nested content rectangle uses `inset: {spacing.pad-top} {spacing.edge} {spacing.pad-bottom}`. Keep the 42px graph grid in a dedicated background layer below the actual content rather than changing the canonical runtime's stage geometry.

### Composition Patterns
Within the chrome frame, content typically follows one of these compositional moves (not enumerated as available layouts — these are descriptive, not prescriptive):
- A `topbar` block (Newsreader headline left, mono lab-tag right, 1.5px cobalt rule beneath) above a main content region.
- A pixel-glitch column anchored to the right edge of the content region (or occasionally the left, as on the colophon).
- A Pixel-swatch patch as a small punctuation mark (typically top-right corner).
- A vertical-stack mono label column anchored to one edge.
- A dense ledger or index of equal-flex rows separated by faint cobalt dividers.

## Depth and Elevation

### Flat With Structural Rules
Cobalt Grid has no drop shadows, no elevated cards, no rounded surfaces, no gradients. Every element sits on a single plane.

Depth signals are entirely structural:
- **1.5px cobalt rules** — top/bottom slide hairlines, topbar rule, attribution rule.
- **1px faint cobalt dividers** — row separators inside index lists, tables, and ledgers.
- **Graph-paper grid** — the 10%-opacity cobalt background creates a sense of measured plane.
- **Pixel-glitch decoration** — vertical scanline columns add visual texture without z-axis elevation.
- **Pixel-swatch patches** — read as discrete graphic objects against the grid+glitch background due to their paper-fill and 1.5px paper-color outset shadow (which is functionally an "anti-shadow" — it pushes the grid away so the pixel mosaic stays readable).

The Pixel-swatch's 1.5px paper-color outset is the *only* shadow-like effect in the system, and it exists to preserve readability against the pixel-glitch column, not to create elevation. There is no z-axis depth.

## Shapes and Treatment

### Border Radius
| Value | Use |
|---|---|
| 0 | Every structural element — frames, cards, ledger rows, pixel cells, pixel-glitch rectangles, charts, tables |
| 50% (circle) | None — Cobalt Grid has no circular elements |

The system uses **zero rounded corners**. Every shape is a strict rectangle. This is unusual for editorial systems and is part of the trend-report identity.

### Border Weights
- **1.5px solid `{colors.ink}`** — primary structural rules: top/bottom slide hairlines, topbar bottom rule, table head row bottom border, chart baseline rule.
- **1px solid `{colors.ink}`** — attribution rules above quote bylines, manifesto attribution top border.
- **1px solid `{colors.ink-faint}`** (18% opacity) — faint row dividers between dense list / table / ledger entries.
- **1px solid `{colors.grid}`** (10% opacity) — the permanent graph-paper grid behind every slide.
- **1.5px box-shadow in `{colors.paper}`** — Pixel-swatch readability outset (functional, not decorative).

All structural borders are cobalt. Colored borders do not exist (there is no "colored" — only cobalt at different opacities).

### Decorative Element Types

**Pixel-glitch column** — A stair-stepped vertical column rendered as inline SVG. Each step is a rectangle filled with evenly-spaced cobalt vertical scanlines on cream. Steps decrease in width as the column descends (or vice versa), creating a "glitch" pixelation effect. Anchored to one edge of a slide (typically right), absolutely positioned, z-index 3, pointer-events disabled. Decorative only — sizes range from compact 307.2px × full-height secondary use to 614.4px × full-height signature cover decoration. Opacity 0.6–1.0 depending on context (lower opacity when used as background, full opacity when used as primary decoration).

**Pixel-swatch patch** — A wordless abstract arrangement of cobalt stripes and blocks on cream, avoiding QR finder motifs and any implied scanning function. Sits over a paper-fill background with 4px internal padding and 1.5px paper-color outset (which preserves readability when overlapping the pixel-glitch column). Typical size 58–100px square. Used as compositional punctuation — typically top-right corner.

**Vertical-stack label column** — A column of DM Mono labels written with `writing-mode: vertical-rl` and `text-orientation: mixed`, rotating Latin text 90° clockwise. Anchored to right edge, vertically centered, evenly spaced. Reads as catalogue-style metadata stacked along the slide edge.

**Topbar (with rule)** — A flex row containing a Newsreader headline left and a supplied mono lab-tag right, separated from the content below by a 1.5px solid cobalt bottom border. The universal section-header pattern.

**Frame** — An absolutely-positioned content container with `inset: {spacing.pad-top} {spacing.edge} {spacing.pad-bottom}`. Holds the slide's actual content while keeping it clear of the hairline frame, page number, and nav hint.

**Index list** — A 2×3 grid of equal-flex rows, each row a 56px num-tag column + a content column with a Newsreader row-headline and a Hanken body paragraph, separated by 1px faint-cobalt bottom borders.

**Pixel-stack bar chart** — A row sized to the actual series count, with vertical "stacks," each a flex column-reverse of small horizontal cells (default 10%-cobalt off, .on solid cobalt). Cell counts represent values through an explicit unit and rounding rule; label the exact values and preserve a common baseline. A 1.5px cobalt top border with mono tick labels sits beneath the bars as the axis. Renders data as pixelated bars made of grid units — directly echoes the pixel-glitch decoration.

**Ledger table** — A flex column of dense rows, each row a 5-column grid (76px num-tag / 0.6fr name / 1.4fr description / 0.7fr mood-tag / 0.5fr delta-tag), separated by 1px faint-cobalt bottom borders. Header row uses 1.5px solid cobalt. Delta tags use `↑` / `↓` / `—` prefixes via `::before`.

**Manifesto** — A centered statement in `{typography.display-manifesto}` Newsreader with an italic `<em>` body containing inline `.roman` (non-italic) emphasis moments. Below: a 1px cobalt top border with supplied attribution/metadata side-by-side where present.

**Quote** — A supplied Hanken kicker above a `{typography.display-quote}` Newsreader pull, with a 1px cobalt top-border attribution row beneath. Paired with a compact pixel-glitch column at the right edge.

**Colophon** — Right-aligned closing layout. A large `{typography.display-closing}` Newsreader title aligned right with a kicker above. Pixel-glitch column anchored to left edge (mirroring the cover). Footer with as many credit columns as the supplied credits require; no invented authors or institutional bylines.

## Do's and Don'ts

### Do
- Set every Newsreader element at weight 400 in `{colors.ink}`. The thin roman serif at modest weight is the literary register's identity.
- Render every label, kicker, and micro-text in Hanken Grotesk weight 600 uppercase with 0.16em+ letter-spacing in `{colors.ink}`.
- Render every chrome element (page number, mono tag, tick label, vertical-stack) in DM Mono with 0.04–0.08em tracking in `{colors.ink}`.
- Keep the permanent graph-paper grid behind every slide. The grid is the system — disabling it breaks the identity.
- Maintain the top and bottom 1.5px cobalt hairlines on every slide, with the page number and nav hint sitting above the bottom hairline.
- Use the pixel-glitch column as the system's primary decorative move on declarative slides (cover, chapter, quote, colophon).
- Pair pixel-glitch with a Pixel-swatch patch when the composition needs a discrete graphic anchor — the swatch's paper-fill keeps it readable against the glitch lines.
- Use the `topbar + 1.5px cobalt rule` pattern as the standard section-header treatment on index, data, and table layouts.
- Use 1px faint-cobalt dividers between rows of dense lists, tables, and ledgers.
- Render charts as pixel-stack columns of grid cells (cobalt on / cobalt-10% off). The pixel-stack bar treatment echoes the decorative glitch and unifies the visual language.

### Don't
- Don't introduce a second ink color. The system is strictly two-color: cream paper + cobalt ink. A second hue breaks the risograph identity.
- Don't render a Newsreader headline at weight 600 or 700. The 400-only rule is a signature.
- Don't disable or hide the graph-paper grid. It is the canvas tone, not optional decoration.
- Don't suppress the top/bottom hairlines on a slide. They are the frame — every slide carries them.
- Don't round any corner. Every shape is a strict rectangle; the system has zero circular elements.
- Don't add drop shadows, elevated cards, or gradient fills. Depth is structural (rules + grid + glitch), not z-axis.
- Don't use Hanken caps without 0.16em+ tracking. Untracked Hanken caps read as untreated.
- Don't put the page number directly on the bottom hairline. It sits at `bottom: 51.8px` with clear space above the hairline.
- Don't render the Pixel-swatch without its paper-fill and 1.5px paper outset. The fill is what preserves swatch separation against the pixel-glitch column.
- Don't crowd the manifesto, quote, or colophon layouts. Those layouts deliberately leave grid showing — over-stuffing them breaks the contemplative register.

## Stage Adaptation and Capture

Resolve the layout at 1920×1080, then let the shared runtime scale the entire stage. Narrow screens retain the composition, with letterboxing as necessary; there are no recipe-specific mobile stacks, font clamps, swipe handlers or slide transitions. An alternate reading composition is an authored artifact choice, not an automatic breakpoint.

Use the shared renderer and exporter. Inspect complete slides, long labels, dense tables, and navigation with the actual content and fonts. Meaningful data must be at its final value at capture time; no count-up or zero-to-value entrance animation may substitute for the data. Decorative motion, when retained, needs a deterministic static capture and reduced-motion treatment. Controls are real shared-runtime controls only; static callouts must not claim interactivity.

## CJK & International Content

### Role-Preserving Pairing

| Role | Candidate Chinese face | Requested weight |
|---|---|---|
| Display | Noto Serif SC | 400 |
| Body | Noto Sans SC | 400 |
| Labels | Noto Sans SC | 600 |

These are design candidates, not claims of installed assets, glyph coverage, equivalent metrics or available font styles. Select the correct language/region family for Simplified Chinese, Traditional Chinese, Japanese or Korean, and verify the actual source strings and required punctuation against the supplied font files. Localize licensed assets for reproducible output under the shared rendering contract; do not assume a successful remote CSS request means the font rendered.

### Mixed-Script Implementation

Use role-specific stacks and explicit language spans when a weight or style differs by script. A fallback family chooses glyphs, not a different weight. Keep Latin families in their original roles where desired, and set `font-synthesis: none` on the affected runs to expose missing bold or italic instead of silently fabricating it. Check full names, numbers, symbols and mixed-script baselines, not just a sample Hanzi. Retain supplied punctuation, capitalization and spacing; any copy edit that changes the lock returns to intake.

Start Chinese body leading around 1.7 and display leading around 1.1–1.2, then inspect the actual strings at stage size. Reset wide Latin tracking on CJK runs and apply case styling only where the source language and locked spelling permit it. Widen or recompose labels before making them smaller. Preserve all source qualifications when a line wraps; splitting into additional slides is preferable to squeezing the type.

### System-Specific Adaptation

The pairing preserves three roles: quiet literary display, clean sans support and technical mono metadata. Noto Serif 700 is not an equivalent of Newsreader 400, and a fallback declaration cannot set a different CJK weight. Keep DM Mono for genuine Latin identifiers and digits and supply readable Chinese language spans for real catalogue labels; do not translate or erase them to enforce Latin-only chrome. For vertical labels, test writing-mode:vertical-rl with the actual mixed-language string and isolate scripts where necessary so orientation and punctuation read correctly. Keep the 10% graph paper, cobalt hairlines and wordless stepped scanline patches. Where the verified Chinese face has no italic style, preserve manifesto emphasis using an approved supplied weight or rule treatment, never synthetic oblique or faint unreadable ink. Newsreader optical-size behavior cannot be assumed for another font.

### Asset and Emphasis Limits

Inspect requested weights and styles in the actual font asset before using them. Optical size, oblique style and weight are different properties; one does not supply another. When a face lacks a needed treatment, select a verified asset or an approved alternative visual treatment while preserving the same audience-visible emphasis. Test final composed text against its background; palette tokens and font family names are not evidence of legibility.

## Iteration Guide

1. Every slide uses the graph-paper background and two cobalt hairlines. Style only the actual shared-runtime counter/controls; do not duplicate them.
2. Every new headline uses Newsreader at weight 400 in `{colors.ink}`. Don't bold; don't color.
3. Every new label uses Hanken Grotesk weight 600 uppercase with 0.16em+ letter-spacing in `{colors.ink}`.
4. Every new chrome element uses DM Mono in `{colors.ink}` with 0.04–0.08em tracking.
5. New content slides on index / data / table layouts use a topbar (Newsreader headline left + Hanken lab-tag right) with a 1.5px cobalt bottom rule.
6. New chart slides use the pixel-stack treatment — cobalt on / cobalt-10% off cells in column-reverse stacks. Don't introduce filled bar charts in a single solid block.
7. New declarative slides (cover, chapter, quote, colophon) use a pixel-glitch column as the primary decoration. Pair with a Pixel-swatch when the composition needs a discrete graphic anchor.
8. New row dividers in dense lists use 1px solid `{colors.ink-faint}` (18% opacity), not full-strength cobalt. Full-strength cobalt is reserved for major structural rules.
9. New components inherit the zero-radius, no-shadow, no-gradient flatness. If a component breaks any of these, redesign it before adding.
10. The system has one ink color (`{colors.ink}`) and one surface (`{colors.paper}`). New compositions should never introduce a third color or a third surface tone (paper-2 is available but rarely needed).

## Authoring Limits

- Author the stepped scanline SVG to fit the composition; steps and line density are decorative and must not collide with text.
- The small pixel patch is an abstract stripe/block swatch, not a simulated QR code. Avoid finder squares and any implied scanning affordance.
- Pixel-stack cells need an explicit numeric unit and rounding policy. Retain exact numeric labels and common baselines; do not manufacture a fixed eight-series dataset.
- Test mixed-script vertical labels in the actual renderer, preserving real metadata and punctuation. Move labels to a horizontal position when vertical composition fails.
- Manifesto italic with roman emphasis requires the supplied Newsreader styles and an approved emphasis span. Keep bylines and attribution only where supplied.
- The 1.5px paper-color outset around the pixel swatch clears the underlying grid without creating elevation. Keep cream/cobalt and zero-radius rectangle geometry.
- Mirror the scanline column to the left for the right-aligned colophon. Footer credit columns are conditional on actual credits; empty space is legitimate.
- A 42px graph-paper cell is a stage-space starting point within the 28–44px aesthetic range. Verify Newsreader, Hanken Grotesk and DM Mono assets before capture.
