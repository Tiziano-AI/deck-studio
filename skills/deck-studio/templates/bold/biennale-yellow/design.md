---
version: alpha
name: Biennale Yellow
description: "A literary-editorial presentation system in the visual register of an art biennale catalogue or quiet exhibition poster. The aesthetic is built on warm parchment grounds (`#E9E5DB`) flooded with soft solar yellow (`#F1EE2E`) radial blooms, set against a single deep indigo navy ink color. Display type is Instrument Serif — a contemporary high-contrast serif with tall ascenders and elegant italics — paired with Archivo for sans-serif chrome and JetBrains Mono for numerical and metadata callouts. No drop shadows, no rounded corners, no bordered cards: the only structural lines are hairline 1px rules in ink. The mood sits between a folded museum brochure, a slow-reading literary quarterly, and a Mediterranean exhibition poster — confident, atmospheric, and deeply restrained."

colors:
  paper: "#E9E5DB"
  paper-deep: "#DCD6C4"
  sun: "#F1EE2E"
  sun-soft: "#F8F39B"
  haze: "#F0DA7C"
  ink: "#1B2566"
  ember: "#E26B4A"

color-aliases:
  line: ink

typography:
  display:
    fontFamily: "'Instrument Serif', Georgia, serif"
    fontWeight: 400
    fontSize: "237.6px"
    lineHeight: 0.86
    letterSpacing: -0.018em
  display-md:
    fontFamily: "'Instrument Serif', Georgia, serif"
    fontWeight: 400
    fontSize: "172.8px"
    lineHeight: 0.86
    letterSpacing: -0.018em
  display-sm:
    fontFamily: "'Instrument Serif', Georgia, serif"
    fontWeight: 400
    fontSize: "194.4px"
    lineHeight: 0.86
    letterSpacing: -0.018em
  display-it:
    fontFamily: "'Instrument Serif', Georgia, serif"
    fontWeight: 400
    fontStyle: italic
    fontSize: "118.8px"
    lineHeight: 1.04
    letterSpacing: -0.005em
  numeral-jumbo:
    fontFamily: "'Instrument Serif', Georgia, serif"
    fontWeight: 400
    fontSize: "537.6px"
    lineHeight: 0.84
    letterSpacing: -0.04em
  numeral-lg:
    fontFamily: "'Instrument Serif', Georgia, serif"
    fontWeight: 400
    fontSize: "237.6px"
    lineHeight: 0.9
    letterSpacing: -0.04em
  numeral-md:
    fontFamily: "'Instrument Serif', Georgia, serif"
    fontWeight: 400
    fontSize: "129.6px"
    lineHeight: 0.92
    letterSpacing: -0.01em
  headline:
    fontFamily: "'Instrument Serif', Georgia, serif"
    fontWeight: 400
    fontSize: "75.6px"
    lineHeight: 1.06
    letterSpacing: -0.005em
  headline-sm:
    fontFamily: "'Instrument Serif', Georgia, serif"
    fontWeight: 400
    fontSize: "56px"
    lineHeight: 1
  date-rail:
    fontFamily: "'Instrument Serif', Georgia, serif"
    fontWeight: 400
    fontSize: "96px"
    lineHeight: 0.96
    letterSpacing: -0.005em
  ledger-title:
    fontFamily: "'Instrument Serif', Georgia, serif"
    fontWeight: 400
    fontSize: "30px"
    lineHeight: 1.15
  strand-title:
    fontFamily: "'Instrument Serif', Georgia, serif"
    fontWeight: 400
    fontSize: "32px"
    lineHeight: 1.1
  strand-num:
    fontFamily: "'Instrument Serif', Georgia, serif"
    fontWeight: 400
    fontSize: "38px"
    lineHeight: 1
  body-lede:
    fontFamily: "'Archivo', sans-serif"
    fontWeight: 400
    fontSize: "18px"
    lineHeight: 1.55
  body:
    fontFamily: "'Archivo', sans-serif"
    fontWeight: 400
    fontSize: "16px"
    lineHeight: 1.5
  body-sm:
    fontFamily: "'Archivo', sans-serif"
    fontWeight: 400
    fontSize: "13px"
    lineHeight: 1.5
  micro-label:
    fontFamily: "'Archivo', sans-serif"
    fontWeight: 600
    fontSize: "14px"
    lineHeight: 1.2
    letterSpacing: 0.18em
    textTransform: uppercase
  micro-label-tight:
    fontFamily: "'Archivo', sans-serif"
    fontWeight: 600
    fontSize: "12px"
    lineHeight: 1.2
    letterSpacing: 0.16em
    textTransform: uppercase
  rail-label:
    fontFamily: "'Archivo', sans-serif"
    fontWeight: 600
    fontSize: "13px"
    lineHeight: 1
    letterSpacing: 0.32em
    textTransform: uppercase
  mono-data:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontWeight: 400
    fontSize: "14px"
    lineHeight: 1.4
    letterSpacing: 0.04em
  mono-date:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontWeight: 400
    fontSize: "16px"
    lineHeight: 1.4
    letterSpacing: 0.02em
  pagenum:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontWeight: 400
    fontSize: "13px"
    lineHeight: 1
    letterSpacing: 0.08em

spacing:
  pad-edge: "76px"
  pad-region: "80px"
  pad-foot: "56px"
  pad-strand-y: "17.3px"
  gap-region: "48px"
  gap-strand: "19.4px"
  gap-footer-col: "44px"
  pagenum-bottom: "25.9px"
  pagenum-right: "46.1px"

canvas:
  width: 1920px
  height: 1080px
  background: "{colors.paper}"

components:
  pagenum:
    position: "absolute, right + bottom"
    color: "{colors.ink}"
    opacity: 0.75
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "13px"
    letterSpacing: 0.08em
    description: "Single mono pagenum NN / NN pinned to bottom-right of every slide at 75% opacity. The only persistent chrome on every surface."
  hairline-rule:
    border: "1px solid {colors.ink}"
    description: "1px solid ink horizontal or vertical rule. The system's only border treatment — separates header bands from content, footer columns from each other, ledger rows from each other. No thicker rule exists."
  hairline-rule-soft:
    border: "1px solid rgba(27, 37, 102, 0.2)"
    description: "1px ink at 18-20% opacity. Used for between-row separators inside dense ledger or strand lists where a full-weight rule would feel oppressive."
  sun-bloom:
    background: "radial-gradient using {colors.sun} {colors.sun-soft} {colors.haze} blending to transparent on {colors.paper}"
    description: "Large soft radial bloom of solar yellow placed off-center or behind a focal element. The system's primary atmospheric layer. Sized 42-70% of viewport in the larger axis."
  ember-bloom:
    background: "radial-gradient using {colors.ember} at 15-22% opacity blending to transparent"
    description: "Small warm peach bloom used as a counter-temperature accent in a corner opposite the sun bloom. Always subordinate; never dominant."
  block-tile:
    background: "{colors.sun} at 40-70% opacity"
    description: "Geometric blocks of translucent solar yellow placed on an 8-row × 4-column grid behind cover or colophon surfaces. Suggests a layered poster underprint."
  yellow-panel:
    background: "{colors.sun}"
    color: "{colors.ink}"
    description: "Full-bleed yellow panel covering a column or third of the slide. The strongest possible color statement — used when a region needs to read as poster-fill, not paper."
  bar-ink:
    background: "{colors.ink}"
    height: "17.3px"
    description: "Solid ink horizontal bar for data charts. Width carries the data value."
  bar-lit:
    background: "{colors.sun}"
    border: "1px solid {colors.ink}"
    height: "17.3px"
    description: "Highlighted variant of bar-ink — yellow fill with 1px ink stroke. Used to mark the current or featured row in a series."
  strand-row:
    layout: "grid 56px 1fr, gap 24px, border-bottom hairline-soft, padding-bottom 17.3px"
    description: "Numbered editorial list row — numeral cell + content cell separated by hairline-soft. Used for programmes, agendas, and curated lists."
  ledger-row:
    layout: "grid 92px 1.6fr 0.9fr 80px, gap 26.9px, border-bottom hairline-soft, padding 14px 0"
    description: "Four-column tabular row for calendars and itineraries. Date column is mono, title is serif, venue is sans, duration is mono right-aligned."
  footer-band:
    layout: "grid sized to supplied metadata entries, hairline-rule top border on each cell, gap 44px"
    description: "Metadata strip near the bottom of cover and colophon surfaces. Use only supplied entries, with readable labels in their original language; four columns are an optional proportion, not a content requirement."
  vertical-rail:
    transform: "rotate(-90deg) translateY(-50%) at left edge"
    fontFamily: "'Archivo', sans-serif"
    fontSize: "13px"
    letterSpacing: 0.32em
    textTransform: uppercase
    description: "Rotated vertical text label running up the left edge. Used on chapter/divider surfaces as a section marker."
  date-rail-stack:
    fontFamily: "'Instrument Serif', Georgia, serif"
    fontSize: "96px"
    lineHeight: 0.96
    textAlign: right
    description: "Large serif date or date-range stacked at top-right of cover surfaces. Uses an en-dash to indicate spans."
---

## Stage and Content Contract

This recipe supplies visual decisions for Deck Studio's fixed **1920×1080** stage. Use the canonical [runtime](../../../runtime/) and [runtime contract](../../../references/deck-runtime.md) for stage scaling, navigation, focus, capture and export. Do not create a second scaler, slide controller, keyboard handler or print engine. The whole stage scales uniformly, including on phones; the composition does not internally reflow with the browser viewport.

All dimensions below are stage-space authoring values. A range is a choice to resolve while composing, not permission for live viewport-dependent layout. Body and data text must remain readable in the intended presentation or reading setting: enlarge and recompose, split while retaining all locked material, or choose another system when the content does not fit. Never clip, scroll, hide, omit or invent material to complete a layout. Visible labels, metrics, attribution, ordinals, emphasis and status come from the content lock; wordless geometry may supply atmosphere.

## Overview

Biennale Yellow is a **literary-editorial presentation system** modeled on the visual language of European art biennale catalogues, slow exhibition posters, and quarterly literary publications. There are no cards, no buttons, no shadows, no rounded corners. The structural vocabulary is just three things: paper, ink, and yellow.

The typographic system pivots on **Instrument Serif**, a contemporary high-contrast serif with tall ascenders, elegant italics, and slightly flared terminals. It carries every display moment, every numeral, every quote — at scales ranging from headline-small (40px) to jumbo numerals over 700px. Set tight (line-height 0.86, letter-spacing −0.018em), it reads as confident editorial display; set looser in italic (line-height 1.04, letter-spacing −0.005em), it becomes a slow-reading quotation face. **Archivo** is the sans companion — used for body paragraphs and as small, wide-tracked uppercase labels (the "micro-label" treatment). **JetBrains Mono** handles all numerical and metadata callouts: dates, ledger figures, page numbers. The three-face system is rigid and disciplined; the contrast between them is the entire typographic story.

The color world is built on **warm parchment** (`{colors.paper}` — `#E9E5DB`) as the universal ground, marked by a single **ink** color (`{colors.ink}` — `#1B2566`, a deep indigo navy) used for every line of type and every rule. The system's signature color is **sun** (`{colors.sun}` — `#F1EE2E`), a highly saturated solar yellow used as a flooded panel, as a soft blooming radial gradient, or as a geometric tile underprint. A **soft ember peach** (`{colors.ember}` — `#E26B4A`) appears only as a subordinate counter-temperature accent, always at 15-22% opacity in a corner radial bloom. Inverted color treatments are not used; the system commits to navy ink on a warm ground.

Depth is **atmospheric, not structural**. There are no drop shadows anywhere in the system. Depth comes from layered radial gradients of yellow (the sun-bloom and ember-bloom components) and the optional block-tile underprint on cover-class surfaces. Cards have no borders; regions are separated only by 1px hairline rules in ink. The lack of border weight is itself the aesthetic — the design feels printed, not engineered.

**Density philosophy: editorial-restrained.** This system reads as elegant when sparse and broken when crowded. A typical surface holds one large display moment + a handful of supporting elements (a micro-label, a body paragraph, an ordered list, or a single radial bloom). Crowding the canvas with cards, buttons, panels, or stacked components turns the system into a different aesthetic entirely. Even dense surfaces (a calendar or programme) achieve density through tabular repetition, not visual richness — many quiet rows of hairline-separated metadata, not many bordered cells. Generous edge padding (40-76px) and wide footer/header bands let the canvas breathe.

**Key Characteristics:**
- Warm parchment ground (`{colors.paper}`) on every surface; never white, never gray.
- Single ink color (`{colors.ink}`) for all text and all rules — no secondary text colors.
- Solar yellow (`{colors.sun}`) deployed three ways: as a flooded panel, as a soft radial bloom, as a translucent geometric tile underprint.
- Instrument Serif handles every display moment at scales from 40px to 720px+.
- Archivo Bold uppercase + 0.16–0.32em tracking is the universal label voice.
- JetBrains Mono is reserved exclusively for dates, ledger numerals, and page numbers.
- 1px hairline rules in `{colors.ink}` are the only border treatment — used for header bands, ledger rows, footer columns, and strand separators.
- No drop shadows, no rounded corners, no card outlines, no buttons. Decoration is atmospheric (radial blooms) or geometric (translucent tile blocks).
- Persistent `01 / NN` JetBrains Mono pagenumber at bottom-right of every surface at 75% opacity.
- Optional vertical rotated rail-label at the left edge of chapter/divider surfaces.

## Colors

### Palette

- **Paper** (`{colors.paper}` — `#E9E5DB`): The warm parchment canvas. The default and near-universal background. Reads as a softened off-white with strong warmth — never neutral, never cold.
- **Paper-deep** (`{colors.paper-deep}` — `#DCD6C4`): A slightly darker parchment tone, available as a secondary surface or to suggest a shadow band without using actual shadow. Reserved for moments that need surface differentiation while staying within the warm-paper family.
- **Ink** (`{colors.ink}` — `#1B2566`): The single text and line color across the entire system. A deep indigo navy that reads as confident editorial black-with-blue-bias. Used for headlines, body, micro-labels, monos, hairline rules, and ink-bar fills. The `--line` CSS variable resolves to this same color.
- **Sun** (`{colors.sun}` — `#F1EE2E`): The system's signature solar yellow. Highly saturated, slightly green-leaning. Used three ways: as a flooded full-bleed or column-bleed panel, as the core of soft radial blooms, and as 40-70% opacity geometric tile blocks.
- **Sun-soft** (`{colors.sun-soft}` — `#F8F39B`): A paler buttery yellow used in the middle stops of sun-bloom gradients to soften the transition from saturated sun to paper.
- **Haze** (`{colors.haze}` — `#F0DA7C`): A warmer mustard-leaning yellow used in the outermost stops of sun-bloom gradients to extend the bloom into the paper without a hard edge.
- **Ember** (`{colors.ember}` — `#E26B4A`): A warm peach-orange used only as a subordinate counter-temperature accent in 15-22% opacity radial blooms. Never used as a fill color, never as a text color. Its job is to balance a sun-bloom on the opposite side of the canvas.

### Defaults

- **Default surface background**: `{colors.paper}`. Every surface starts here.
- **Default headline color**: `{colors.ink}`. Always. Headlines never appear in yellow, ember, or paper-deep — only ink.
- **Default body text color**: `{colors.ink}`. Body uses the same color as display; the contrast is achieved through size and weight, not color.
- **Default rule color**: `{colors.ink}` (1px solid) for primary separators, ink at 18-20% opacity for secondary row separators.
- **Default accent surface for poster moments**: `{colors.sun}` — a flooded panel of solar yellow with `{colors.ink}` text on top.
- **Default atmospheric layer**: a single `{components.sun-bloom}` placed off-center on the surface, with an optional `{components.ember-bloom}` in the opposite corner.
- **Default chart bar color**: `{colors.ink}`. The featured/current bar uses `{components.bar-lit}` (yellow fill, ink stroke).
- **Default label color**: `{colors.ink}` for the text, no fill. Labels are tracking + uppercase + weight 600, not filled pills.

The system never inverts: ink text on a sun panel is correct (and a key signature treatment), but yellow text on an ink ground does not exist. Text is always ink; the variability lives in what's behind the text, not in the text color itself.

## Typography

### Font Family Stack
The system runs three faces, each with a tightly defined role.

**Instrument Serif** (Google Fonts, italic + roman) is the display and editorial face. Its high contrast, tall ascenders, and slightly flared terminals give it a contemporary literary register — closer to a magazine masthead than a traditional book serif. Roman is used for headlines, numerals, ledger titles, and date rails. Italic is used for manifesto quotes and certain emphasis moments. Set tight (line-height ≤ 1.06, negative letter-spacing −0.005 to −0.04em).

**Archivo** (Google Fonts) is the sans companion. Used at weight 400 for body paragraphs (line-height 1.5) and at weight 600 for the universal micro-label treatment (uppercase, 0.16-0.32em tracking, 10-14px). Never used at intermediate weights, never used for headlines.

**JetBrains Mono** (Google Fonts) is the numerical/metadata face. Used exclusively for dates in ledgers, mono numerical callouts in data slides, page numbers, and the nav-hint. Its slab character gives editorial weight to numerical content without leaning on bold styling.

### Typography Scale

| Token | Size (clamp) | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.display}` | 120–240px | Instrument Serif | 400 | Cover-scale display title |
| `{typography.display-sm}` | 110–200px | Instrument Serif | 400 | Editorial display in a panel context |
| `{typography.display-md}` | 80–200px | Instrument Serif | 400 | Closing-statement display |
| `{typography.display-it}` | 56–120px | Instrument Serif italic | 400 | Manifesto-scale italic quote body |
| `{typography.numeral-jumbo}` | 220–720px | Instrument Serif | 400 | Chapter-divider ordinal numeral |
| `{typography.numeral-lg}` | 120–280px | Instrument Serif | 400 | Decorative quotation mark, oversized punctuation |
| `{typography.numeral-md}` | 72–144px | Instrument Serif | 400 | Hero stat figure |
| `{typography.headline}` | 40–88px | Instrument Serif | 400 | Primary section headline, large quote body |
| `{typography.headline-sm}` | 32–56px | Instrument Serif | 400 | Region headline, ledger/calendar topbar |
| `{typography.date-rail}` | 48–96px | Instrument Serif | 400 | Date or date-range stacked at top of a surface |
| `{typography.ledger-title}` | 20–30px | Instrument Serif | 400 | Title cell inside a calendar/ledger row |
| `{typography.strand-title}` | 22–32px | Instrument Serif | 400 | Title inside a numbered strand/list row |
| `{typography.strand-num}` | 28–38px | Instrument Serif | 400 | Numeral cell inside a strand row |
| `{typography.body-lede}` | 15–18px | Archivo | 400 | Lede paragraph following a chapter headline |
| `{typography.body}` | 14–16px | Archivo | 400 | Standard body paragraph |
| `{typography.body-sm}` | 11–13px | Archivo | 400 | Footer-band body text, dense metadata |
| `{typography.micro-label}` | 11–14px | Archivo | 600 | Universal uppercase eyebrow label |
| `{typography.micro-label-tight}` | 10–12px | Archivo | 600 | Smaller uppercase label inside footer cells |
| `{typography.rail-label}` | 11–13px | Archivo | 600 | Vertical rotated rail label |
| `{typography.mono-data}` | 12–14px | JetBrains Mono | 400 | Chart year/value labels, mono inline data |
| `{typography.mono-date}` | 13–16px | JetBrains Mono | 400 | Date column in calendar ledgers |
| `{typography.pagenum}` | 11–13px | JetBrains Mono | 400 | Persistent page number |

### Defaults

- **Default size for a cover-scale display headline**: `{typography.display}` (120–240px clamp). Anything smaller reads as section-level, not cover-level.
- **Default size for a primary section headline**: `{typography.headline}` (40–88px clamp).
- **Default size for a chapter-divider numeral**: `{typography.numeral-jumbo}` (220–720px clamp). Don't shrink — the jumbo numeral is the point of a divider surface.
- **Default size for a hero statistic**: `{typography.numeral-md}` (72–144px clamp). Stat figures share the same serif as headlines — they are display moments, not data chrome.
- **Default size for a paragraph body**: `{typography.body}` (14–16px). For a lede after a chapter headline, step up to `{typography.body-lede}` (15–18px).
- **Default size for any eyebrow label**: `{typography.micro-label}` (11–14px) at weight 600, uppercase, 0.18em tracking.
- **Default weight for any Archivo body**: 400. Archivo body at any other weight breaks the rhythm.
- **Default weight for any micro-label**: 600. Labels at weight 400 or 700 read as either timid or oversized.
- **Default tracking for any uppercase label**: 0.16em minimum, 0.32em maximum. Labels without wide tracking read as code, not editorial.

When unsure which display token to reach for, default to `{typography.headline}` (40–88px) for the primary moment, and `{typography.numeral-md}` (72–144px) for a single hero statistic. The display, display-sm, and display-md tokens are reserved for cover/colophon/poster-scale moments.

### Signature Treatments

These treatments are **non-optional whenever the corresponding element type is used**:

- **Every display, numeral, headline, and ledger-title element is Instrument Serif at weight 400.** Bold serif display does not exist in this system — the face's contrast is its weight signal. Setting Instrument Serif at weight 700 collapses the entire elegance.
- **Every Instrument Serif display element uses tight line-height (0.84–1.06).** Generous line-height on display destroys the editorial poster feel — large serif headlines must feel stacked, not aerated.
- **Every Instrument Serif display element uses negative letter-spacing.** Display, headline, jumbo numerals at −0.018 to −0.04em; italic display at −0.005em. Without negative tracking, the wide-bodied glyphs read as untreated.
- **Every micro-label is uppercase Archivo weight 600 with tracking ≥ 0.16em.** No exceptions. A label without uppercase + tracking is not a label in this system; it's a stray sans element.
- **Every numerical metadata element (date, page number, chart value, calendar date) is JetBrains Mono.** Serif numerals are for display moments; mono numerals are for data chrome. Don't cross the line.
- **Every italic manifesto-scale quote uses `{typography.display-it}`.** Setting an italic quote at headline scale (40–88px) reads as a smaller moment; the italic is meant to dominate.
- **Every body paragraph is Archivo weight 400 with line-height ≥ 1.45.** Body in Instrument Serif does not exist — Instrument is for display only.

### Typography Principles

The voice contrast is **slow elegant serif ↔ wide-tracked uppercase sans ↔ tabular mono**. Italic Instrument is the system's "feeling" voice (reserved for quotes and manifesto moments); roman Instrument is the "statement" voice; Archivo upper-tracked is the "label" voice; mono is the "data" voice. Each has a single job.

Mixing rules are tight: an `<em>` inside an Instrument Serif headline stays in italic Instrument Serif (no face switch). An approved `<em>` inside an Archivo body paragraph uses an actually supplied Archivo italic asset; otherwise choose an approved treatment without synthetic italic. Don't mix faces inline.

Color is locked to ink on every element. There is no "accent color text" treatment in this system — accent is delivered through atmospheric blooms and panel fills, not text color.

## Layout

### Canvas System
Compose inside the canonical 1920×1080 stage. Keep the recipe's internal grid, margins and visual layers in stage coordinates. The runtime owns the outer viewport fit and slide visibility; recipe CSS must not replace its container positioning or slide-state classes. Reserve space for actual runtime controls where present and never reproduce them as painted buttons or invented hints.

### Padding and Margin Scale

| Token | Range | Use |
|---|---|---|
| `{spacing.pad-edge}` | 40–76px | Standard edge padding from any slide edge to content |
| `{spacing.pad-region}` | 40–80px | Internal padding inside a flooded yellow panel or major region |
| `{spacing.pad-foot}` | 56–88px | Bottom padding when the footer band is present |
| `{spacing.gap-region}` | 20–48px | Gap between two major content columns/regions |
| `{spacing.gap-strand}` | 14–22px | Gap between strand rows in a numbered list |
| `{spacing.gap-footer-col}` | 20–44px | Gap between columns of the footer-band metadata strip |
| `{spacing.pagenum-bottom}` | 22–42px | Bottom inset of the persistent pagenum |
| `{spacing.pagenum-right}` | 24–48px | Right inset of the persistent pagenum |

### Persistent Chrome
The visual counter treatment is JetBrains Mono in ink at the lower-right, clear of the footer. Apply it only to the shared runtime's real counter; reserve the actual control area and avoid a duplicate pagenum or a hardcoded navigation hint. Text contrast is checked at the final size; content remains full ink.

### Edge Discipline
Every meaningful element respects a minimum 40px (mobile) to 76px (desktop) edge inset. The system's elegance depends on negative space at the edges — pushing content to the bleed (other than full-bleed panels, blooms, and tile blocks) breaks the catalogue feel.

### Atmospheric Layer
Every slide may carry one or both atmospheric layers behind content:
- A **sun-bloom** (`{components.sun-bloom}`) — a large soft radial gradient of solar yellow, sized 42-70% of viewport, placed off-center or behind a focal element.
- An **ember-bloom** (`{components.ember-bloom}`) — a small warm peach radial gradient at 15-22% opacity, placed in a corner opposite the sun bloom.

These layers are not optional decoration — they are the system's primary depth mechanism. A surface without a bloom reads as flat parchment.

## Depth and Elevation

### No Drop Shadows
The system has **zero drop shadows**. No `box-shadow`, no `text-shadow`, no `filter: drop-shadow(...)`. Depth is delivered atmospherically.

### Atmospheric Depth (Sun Bloom)
The primary depth mechanism is the **sun-bloom** — a large soft radial gradient of solar yellow blooming from a point on the canvas. Bloom anatomy is a layered radial gradient with three or four color stops:
- 0%: `{colors.sun}` at 70-95% opacity (the hot core)
- ~30-40%: `{colors.sun}` at 40-65% opacity (the bloom)
- ~55-65%: `{colors.haze}` at 18-22% opacity (the soft extension)
- 80-90%: `{colors.paper}` at 0% (smooth fade into ground)

Bloom size and position varies by surface need: cover surfaces use a centered or slightly-off-center bloom 42% × 38% of viewport; chapter surfaces use a corner-anchored 720px-radius bloom; closing surfaces use a bottom-anchored 55% × 50% bloom rising from below.

### Counter-Temperature Accent (Ember Bloom)
An optional **ember-bloom** in a corner opposite the sun-bloom provides warm-cool color tension without raising the saturation of the canvas. Always at 15-22% opacity, always smaller than the sun-bloom, always subordinate.

### Geometric Underprint (Block Tiles)
On cover and colophon surfaces, an additional **block-tile** layer can appear behind content — translucent solar yellow rectangles placed on an 8-row × 4-column grid system at 40-70% opacity. This layer suggests a layered poster underprint without committing to a solid panel. The tiles are decorative geometry, not active content regions.

### Yellow Panel (Structural Color)
For surfaces that need the strongest possible color statement, a **yellow-panel** flood (`{components.yellow-panel}`) covers a column, half, or third of the canvas in saturated `{colors.sun}`. This is the only "hard" color treatment in the system — when a panel is used, ink text sits on top at full opacity. Panels do not have borders or shadows; they meet the paper edge or another panel edge directly.

### Hairline Rules
Internal structural depth is delivered by **1px solid ink hairline rules** separating header bands from content, ledger rows from each other, and footer columns from each other. Rules are never thicker than 1px. Between secondary list rows (e.g., strand separators), the rule drops to `rgba(27, 37, 102, 0.2)` — same color, lower opacity.

## Shapes and Treatment

### Border Radius
**Zero, on everything.** Every shape is a strict rectangle. The radial blooms are technically circles but they have no visible edge — they fade into paper.

### Border Weights
- **1px solid `{colors.ink}`** — the universal rule. Used for header-band underlines, ledger row separators, footer-column tops, and the bordered chart bar accent on the lit row.
- **1px solid `rgba(27, 37, 102, 0.2)`** — soft variant of the same rule. Used for secondary row separators inside dense lists where full-weight ink would feel heavy.

The system has **no thicker borders**. There are no 2px, 3px, or 4px outlines anywhere. The visual structure depends on the lightness of the hairline.

### Decorative Element Types

**Sun-bloom** — Large soft radial gradient of solar yellow placed off-center or behind a focal element. The system's primary depth mechanism. Always one per surface, sometimes paired with a counter-bloom.

**Ember-bloom** — Small warm peach radial gradient at 15-22% opacity, placed in a corner opposite the sun-bloom. Subordinate atmospheric balance.

**Block-tile underprint** — Translucent solar yellow rectangles placed on an 8×4 grid system. Decorative geometry suggesting a layered poster, used on cover and colophon-type surfaces.

**Yellow panel** — A full-bleed column, half, or third of the canvas flooded with `{colors.sun}`. The system's strongest color statement. Carries ink text on top.

**Hairline rule** — 1px solid ink. Used for header-band underlines, ledger separators, footer column tops. The system's only border.

**Footer band** — A four-column metadata strip at the bottom of cover/colophon surfaces. Each cell has a `{components.hairline-rule}` top border, an Archivo micro-label, and a short body statement.

**Strand row** — Numbered editorial list row with serif numeral cell + serif title + sans body, separated from the next row by a hairline-soft rule.

**Ledger row** — Four-column tabular calendar/itinerary row: mono date + serif title + sans venue + mono duration (right-aligned), separated by hairline-soft rules.

**Vertical rail label** — Rotated Archivo uppercase text running up the left edge of a chapter-divider surface, with 0.32em tracking.

**Date rail** — Large serif date or date-range stacked at top-right of cover surfaces, often using an en-dash to indicate a span across years or months.

**Jumbo numeral** — A single huge Instrument Serif numeral (220-720px) dominating a divider surface. Always serif, always at weight 400, always with tight line-height.

**Chart bar** — A solid ink rectangle whose width carries the data value. A source-established featured/current bar swaps to yellow fill with a 1px ink stroke (`{components.bar-lit}`). Chart layouts use grid-row patterns: mono year label + bar + mono value, separated by gap.

## Do's and Don'ts

### Do

- Apply `{colors.paper}` as the universal background. Every surface starts on parchment.
- Set every line of text in `{colors.ink}` — display, body, micro-label, mono, everything. The single text color is non-negotiable.
- Use Instrument Serif at weight 400 with tight line-height (0.84-1.06) and negative letter-spacing (-0.018 to -0.04em) for every display moment. The serif's elegance lives in this configuration.
- Add at least one `{components.sun-bloom}` to every surface. Atmospheric depth is the system's depth mechanism; a flat parchment surface reads as broken.
- Pair a sun-bloom with an `{components.ember-bloom}` in the opposite corner when you want warm-cool tension without raising the overall saturation.
- Use `{components.hairline-rule}` (1px solid ink) for every structural separator: header-band underline, ledger row, footer column, strand separator.
- Set every uppercase label in Archivo weight 600 with 0.16-0.32em tracking. Without the wide tracking, labels read as code, not editorial.
- Use `{components.yellow-panel}` (full-bleed sun column or panel) when a surface needs strongest color commitment — keep ink text on top at full opacity.
- Place the persistent `{components.pagenum}` (JetBrains Mono, 75% opacity ink) at bottom-right of every surface.
- Reserve JetBrains Mono exclusively for numerical and metadata callouts: dates, ledger figures, chart values, page numbers, nav-hint. Never use mono for display or body.

### Don't

- Don't add drop shadows. The system has zero box-shadows and zero text-shadows. Adding any blurred or offset shadow breaks the printed-paper feel immediately.
- Don't round any corner. Every shape is strict rectangle. Border-radius is forbidden.
- Don't use borders thicker than 1px. The hairline rule is the only border vocabulary; 2px, 3px, or 4px outlines do not exist.
- Don't set Instrument Serif at weight 700 or any bold weight. The serif's character lives at weight 400; bold serif display flattens the system.
- Don't introduce a second text color. Yellow text on paper, ember text anywhere, or muted-ink secondary text — none exist. Text is always full-opacity ink.
- Don't crowd the canvas with cards or panels. The system reads as elegant when sparse. Bordered cards, button stacks, or multi-region grids of containers break the editorial restraint.
- Don't invert: ink panels with yellow or paper text are not part of the system. Ink ground is reserved for chart bars and small rule elements only.
- Don't substitute Inter, Helvetica, or system-ui for Archivo, or Times for Instrument Serif. The font selection is the visual identity; substitution collapses the aesthetic.
- Don't use mono for body or headlines. JetBrains Mono is exclusively for numerical/metadata chrome.
- Don't omit the bloom layer on a surface. A flat parchment slide reads as a CMS template; the bloom is the atmosphere that signals "biennale".

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

The serif display preserves the literary role of Instrument Serif; the sans body and labels preserve Archivo's supporting role. Neither is a metric or stylistic equivalent. Keep the broad parchment field, sun bloom, long hairlines and narrow numeral columns. Smiley Sans Oblique is a different, expressive sans direction, not an automatic replacement for the serif. Instrument Serif's true italic quotation treatment cannot be presumed on the Chinese face: use a verified supplied italic asset only when appropriate, otherwise retain the quote in roman with its rule and attribution. Do not invent emphasis. JetBrains Mono may carry real dates and figures; validate tabular features before relying on them, and align ledger cells with grid columns regardless.

### Asset and Emphasis Limits

Inspect requested weights and styles in the actual font asset before using them. Optical size, oblique style and weight are different properties; one does not supply another. When a face lacks a needed treatment, select a verified asset or an approved alternative visual treatment while preserving the same audience-visible emphasis. Test final composed text against its background; palette tokens and font family names are not evidence of legibility.

## Iteration Guide

1. Any new surface starts on `{colors.paper}` with a deliberately placed sun bloom below content; reserve the real shared-control area instead of inventing persistent chrome.
2. Any new headline uses Instrument Serif weight 400 with tight line-height and negative tracking. Reach for `{typography.headline}` for primary moments and `{typography.display}` only for cover-scale.
3. Any new body paragraph uses Archivo weight 400 with line-height 1.5. Lede paragraphs following a headline use the slightly larger `{typography.body-lede}` for breathing room.
4. Any new eyebrow or section tag uses the micro-label treatment: Archivo weight 600, uppercase, 0.16-0.32em tracking, ink color, no fill. Don't substitute a pill or chip.
5. Any new structural separator is a 1px `{components.hairline-rule}` in ink, or its soft variant for secondary list rows. Never reach for a thicker border.
6. Any new numerical or metadata content (date, page number, chart value, ledger figure) uses JetBrains Mono. Serif numerals are reserved for display moments only.
7. Any new "poster-scale" color statement uses `{components.yellow-panel}` — a flooded column or fraction of the canvas in `{colors.sun}` with ink text on top.
8. Any new ordered list of program items uses the `{components.strand-row}` pattern: serif numeral cell + serif title + sans body, separated by hairline-soft rule.
9. Any new tabular itinerary uses the `{components.ledger-row}` pattern: mono date + serif title + sans venue + mono duration right-aligned, separated by hairline-soft rule.
10. If a surface feels flat, add an `{components.ember-bloom}` in the opposite corner from the sun-bloom — never add a card border or shadow.

## Authoring Limits

- Instrument Serif's italic is a font style, not an assumed axis. Verify the actual italic display asset; Archivo body emphasis needs its own supplied italic or an approved alternative treatment.
- Compute bar widths from actual values and retain labels, units and comparison baselines. This recipe supplies visual proportions rather than a chart engine.
- Block-tile underprints may use an 8-row by 4-column grid, with a large tile spanning columns 1–2 and rows 6–8. These are wordless background placements to tune per composition.
- A vertical rail may carry a real section title. If rotation renders poorly, move that text to a horizontal position rather than dropping it.
- Footer ratios 1.1fr 1fr 1.4fr 2fr on a cover and 1.2fr 1.1fr 1fr 1.4fr on a colophon are useful starting proportions for four supplied entries, not a requirement to invent four pieces of metadata.
- Bloom opacity and label contrast depend on their composed ground. Keep sun warmth away from small ink text when necessary and inspect the actual result.
