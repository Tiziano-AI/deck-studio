---
version: alpha
name: Monochrome (Ivory Ledger)
description: A literary editorial system rendered in black ink on cream paper. Ultra-light geometric sans (Jost at weight 200–300) carries every headline; Lora italic serif handles quote text while Lora roman handles insight-card titles; JetBrains Mono provides the structural chrome. There are no chromatic accents — every color in the palette is a graphite or cream tone, and "accent" simply means "darker ink." The aesthetic borrows from independent research reports, scholarly monographs, and the quietest end of contemporary editorial design — closer to a printed journal than a tech presentation.

colors:
  cream-paper: "#FAFADF"
  cream-paper-2: "#F2F2D2"
  cream-paper-3: "#F0F0D4"
  cream-warm: "#F5F0E4"
  ink-black: "#1A1A16"
  ink-graphite: "#5E5E54"
  ink-graphite-light: "#8A8A80"

color-aliases:
  c-bg: cream-paper
  c-bg-light: cream-paper
  c-bg-cream: cream-warm
  c-fg: ink-black
  c-fg-light: ink-black
  c-fg-2: ink-graphite
  c-fg-3: ink-graphite-light
  c-accent: ink-black
  c-border: ink-black
  c-border-light: ink-black

typography:
  display:
    fontFamily: "Jost, Noto Sans SC, system-ui, sans-serif"
    fontSize: 163.2px
    fontWeight: 200
    lineHeight: 0.96
    letterSpacing: -0.02em
  h1:
    fontFamily: "Jost, Noto Sans SC, system-ui, sans-serif"
    fontSize: 96px
    fontWeight: 200
    lineHeight: 1.1
    letterSpacing: -0.01em
  h2:
    fontFamily: "Jost, Noto Sans SC, system-ui, sans-serif"
    fontSize: 61.44px
    fontWeight: 300
    lineHeight: 1.2
  h3:
    fontFamily: "Jost, Noto Sans SC, system-ui, sans-serif"
    fontSize: 38.4px
    fontWeight: 400
    lineHeight: 1.3
  lead:
    fontFamily: "Jost, Noto Sans SC, system-ui, sans-serif"
    fontSize: 28.8px
    fontWeight: 300
    lineHeight: 1.65
  body:
    fontFamily: "Jost, Noto Sans SC, system-ui, sans-serif"
    fontSize: 21.12px
    fontWeight: 300
    lineHeight: 1.7
  caption:
    fontFamily: "Jost, Noto Sans SC, system-ui, sans-serif"
    fontSize: 16.32px
    fontWeight: 300
    lineHeight: 1.55
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: 13.82px
    fontWeight: 400
    letterSpacing: 0.12em
    textTransform: uppercase
  quote-serif:
    fontFamily: "Lora, Noto Serif SC, Georgia, serif"
    fontSize: 61.44px
    fontWeight: 400
    lineHeight: 1.35
  insight-serif:
    fontFamily: "Lora, Noto Serif SC, Georgia, serif"
    fontSize: 53.76px
    fontWeight: 400
    lineHeight: 1.15
  stat-value:
    fontFamily: "Jost, Noto Sans SC, system-ui, sans-serif"
    fontSize: 105.6px
    fontWeight: 200
    lineHeight: 1.0
    letterSpacing: -0.03em
  flow-num:
    fontFamily: "Jost, Noto Sans SC, system-ui, sans-serif"
    fontSize: 67.2px
    fontWeight: 200
    lineHeight: 1.0
    letterSpacing: -0.02em

spacing:
  pad-x: 153.6px
  pad-y: 64.8px
  gap-lg: 54px
  gap-md: 32.4px
  gap-sm: 16.2px

canvas:
  width: 1920px
  height: 1080px

components:
  rule:
    width: 36px
    height: 1px
    background: "{colors.ink-black}"
    description: "A 36-pixel hairline accent rule. The system's signature small punctuation mark — appears under chapter labels, beside kickers, above stat values."
  rule-full:
    width: "100%"
    height: 1px
    background: "{colors.ink-black}"
    description: "Full-width 1px hairline rule for chrome bands, foot bands, and section dividers."
  kicker:
    fontFamily: "{typography.label.fontFamily}"
    fontSize: "{typography.label.fontSize}"
    letterSpacing: 0.14em
    textTransform: uppercase
    color: "{colors.ink-graphite-light}"
    description: "Muted mono uppercase eyebrow label above a headline."
  tag:
    border: "1px solid {colors.ink-black}"
    padding: "0.3em 0.8em"
    fontFamily: "{typography.label.fontFamily}"
    fontSize: "{typography.label.fontSize}"
    letterSpacing: 0.12em
    textTransform: uppercase
    description: "Bordered inline tag for version numbers, status labels."
  bullet-marker:
    content: "—"
    color: "{colors.ink-graphite-light}"
    fontFamily: "{typography.label.fontFamily}"
    description: "Em-dash in muted graphite via JetBrains Mono. The standard list mark; never a dot, never a check."
  insight-card:
    background: "{colors.cream-warm}"
    borderRadius: 16px
    padding: "32.4px 48px"
    description: "Tall rounded-rectangle card in cream tone (one of three near-identical creams). Holds a large Lora serif title and a Jost body block at the bottom."
  stat-cell:
    borderTop: "1px solid {colors.ink-black}"
    padding: "{spacing.gap-md} {spacing.gap-md} {spacing.gap-md} 0"
    description: "Rule-topped vertical cell with a 105.6px weight-200 numeral, a Jost label, and a mono source note."
  timeline-dot:
    width: 8px
    height: 8px
    borderRadius: 50%
    background: "{colors.ink-black}"
    border: "2px solid {colors.cream-warm}"
    description: "Solid black dot with a cream border ring that punches through a horizontal connector rule."
  vtimeline-spine:
    width: 1px
    background: "{colors.ink-black}"
    description: "1px vertical rule that anchors a vertical timeline. Carries a 9px solid black dot at the top of each entry."
  pie-donut:
    width: "min(499.2px, 453.6px)"
    height: "min(499.2px, 453.6px)"
    borderRadius: 50%
    description: "Donut ring rendered by overlaying a same-color circular ::after pseudo on a conic-gradient or similar. Center cutout is the slide background."
  pyramid-bar:
    borderLeft: "2px solid {colors.ink-black}"
    background: "color-mix(in srgb, {colors.ink-black} N%, {colors.cream-paper})"
    description: "Horizontal pyramid level. Width grows down each level (36% → 100%); fill darkens up the pyramid via color-mix at increasing percentages."
  bar-fill:
    width: "100%"
    background: "{colors.ink-graphite-light}"
    opacity: 0.5
    description: "Vertical bar in muted graphite at half opacity. Accented variant uses solid ink-black at full opacity."
  img-placeholder:
    border: "1px solid {colors.ink-black}"
    background: "{colors.cream-paper-3}"
    color: "{colors.ink-graphite}"
    description: "Hairline-bordered cream void with a centered mono label. Working layout aid only; replace it with supplied photography or recompose without an image region before delivery."
---

## Composition and runtime

Build this recipe on the fixed **1920×1080** stage using the [shared deck runtime](../../../references/deck-runtime.md). That owner supplies scaling, navigation, active state and delivery behavior; this recipe supplies the slide's visual composition. Slide internals do not reflow on phones.

Choose components from the locked content: a stat needs a supported value, a quote its actual attribution, a label its real referent, and emphasis an established narrative reason. Empty component slots do not authorize new copy. Recompose or split an overfull slide without dropping meaning; change the visual system if it cannot carry the content.

## Overview

Monochrome (Ivory Ledger) is a **literary editorial system** built on a single material constraint: black ink on cream paper, and nothing else. The palette has seven tokens: four cream surfaces and three ink tones. There is no chromatic accent — the "accent" color is just darker ink. The result is a system that reads as a carefully typeset research report or a quiet contemporary monograph, not a presentation.

The typeface stack is a three-voice editorial pairing. **Jost** at weights 200, 300, and 400 carries every display, headline and body paragraph — its geometric sans construction stays calm at ultra-light weights and the contrast between weight 200 (display) and weight 300 (body) is the system's primary typographic rhythm. **Lora** serif is reserved for two specific moments: italic for the body text of a pull-quote and roman for the title of an insight card. The serif italic provides the only typographic warmth in the system — wherever it appears, it signals "this is the human voice." **JetBrains Mono** at weight 400 carries every structural marker: chrome labels, sidebar tags, version numbers, footer text, bullet dashes, axis labels, dates. Mono is uppercase and tracked at 0.12em or wider.

The palette functions in three roles. **Cream paper** (`{colors.cream-paper}` and its three near-identical sibling tones) is the canvas — slides are never white, always a warm off-yellow cream. **Black ink** (`{colors.ink-black}` — actually #1A1A16, a very dark olive-black) is every text moment, every border, every divider, every shape fill that isn't decorative cream. **Graphite** in two tones (`{colors.ink-graphite}` for secondary text, `{colors.ink-graphite-light}` for tertiary) handles muted copy. That's the whole color system.

Depth is achieved entirely through **1px hairline rules** and **generous whitespace**. There are no drop shadows, no gradients, no elevation, no atmospheric effects. When two regions need separation, a 1px black line divides them. When a region needs visual weight, it gets more padding, not a fill change. The insight-card surfaces are nearly indistinguishable from the page itself — the cards are defined by their corner radius and padding, not by a contrast jump.

**Density philosophy: sparse.** Ivory Ledger reads as elegant when generous whitespace dominates and a single typographic moment anchors the slide. The horizontal padding is set to 153.6px (the most generous in the library), and content typically uses only the middle 60–70% of the canvas. A slide that fills 80% of its area with type reads as cramped and breaks the editorial reading. The system is asking the agent to leave space — to let a single Jost-200 headline carry an otherwise nearly-empty slide. When density is required (a research timeline, a two-column dense-text spread, a 12-row table), the system holds together only because the type is so light and the rules so thin that even dense content reads as airy.

**Key Characteristics:**
- Cream paper background (`{colors.cream-paper}`) on every slide — never white, never dark by default. The cream is the surface, not a stylistic choice.
- Ultra-light Jost (weight 200 for display, weight 300 for body) is the dominant typographic voice.
- Lora serif appears in two specific moments: italic pull-quote bodies and roman insight-card titles.
- JetBrains Mono uppercase with 0.12em+ tracking handles every structural label, chrome tag, axis, and bullet marker.
- The system has no chromatic accent. The accent color is `{colors.ink-black}` — slightly darker ink.
- All structural separation is 1px hairline rules in black, plus the signature 36px short rule (`{components.rule}`) used as a small punctuation mark.
- The bullet list marker is an em-dash in muted graphite via JetBrains Mono.
- Generous 153.6px horizontal padding — the most spacious in the template library.

## Colors

### Palette

- **Cream Paper** (`{colors.cream-paper}` — #FAFADF): The default surface. Warm off-yellow, never pure white. Every slide background is this color or a near-identical variant.
- **Cream Paper Alt** (`{colors.cream-paper-2}` — #F2F2D2): A slightly deeper cream for inset surfaces. Used sparingly — the difference from the default cream is barely perceptible.
- **Cream Paper Deep** (`{colors.cream-paper-3}` — #F0F0D4): The image-placeholder fill. Slightly more saturated cream that distinguishes a void rectangle from the slide surface.
- **Cream Warm** (`{colors.cream-warm}` — #F5F0E4): The insight / timeline slide background, a warmer tone that signals these slides as related sub-aesthetic moments within the deck.
- **Ink Black** (`{colors.ink-black}` — #1A1A16): Every text moment, every rule, every divider, every border. A very dark olive-black, not pure black — chosen for warmth against the cream paper.
- **Ink Graphite** (`{colors.ink-graphite}` — #5E5E54): Secondary text color. Used for muted lead copy, body paragraphs in dense slides, and labels that need to step back from headline weight.
- **Ink Graphite Light** (`{colors.ink-graphite-light}` — #8A8A80): Tertiary ink for decorative marks. For kickers, axis labels, source notes and footer text, test legibility at the rendered size and darken toward ink-graphite when needed; required information must not be barely present.

### Defaults

- **Default surface background**: `{colors.cream-paper}`. The system is single-surface by default.
- **Default primary headline color**: `{colors.ink-black}`. Headlines never appear in graphite or any other tone.
- **Default body text color**: `{colors.ink-black}` for primary copy on light slides; `{colors.ink-graphite}` for muted lead paragraphs.
- **Default kicker / label color**: `{colors.ink-graphite}` for readable structural text; reserve the lighter graphite for nonessential marks or use it only after contrast and legibility checks.
- **Default border / divider color**: `{colors.ink-black}` — every divider is solid black. There is no muted border tone.
- **Default rule weight**: 1px. The pyramid-bar left anchor is the specific 2px exception.
- **Default "accent" color**: `{colors.ink-black}` — the same as the primary text color. Accent in this system means darker emphasis ink, not a chromatic switch.
- **Default warmer-surface treatment for insight or timeline groups**: `{colors.cream-warm}` — used to tonally identify a group of slides without breaking the monochrome palette.

The system has no warm/cool pairing, no semantic color (no red for warning, no green for success), no chromatic emphasis. Every emphasis comes from typography (size, weight, italic switch) or from a rule, never from color.

## Colors (continued)

The three "insight card surfaces" (`--c-card-a`, `--c-card-b`, `--c-card-c`) are all near-identical cream tones (#FAFADF, #F5F0E4, #FAFADF). They are intentionally collapsed — the card distinction is meant to come from padding and serif title, not surface color. Treat the three card-surface tokens as effectively one surface.

## Typography

### Font Family

The system loads five faces: **Jost** (weights 200, 300, 400, 500, 600) carries all sans display and body; **Lora** (italic and roman, weights 400, 500, 600) carries only the pull-quote text and the insight-card title; **JetBrains Mono** (weights 300, 400, 500) carries every structural label; **Noto Serif SC** is the CJK fallback for Lora; **Noto Sans SC** is the CJK fallback for Jost.

The emotional register is deliberate:
- Jost reads as **quiet, geometric, almost mathematical** at weight 200. It is the system's editorial voice.
- Lora italic reads as **literary, personal, hand-set**. It signals "this is the voice of a human or a quote" — wherever it appears, the tone shifts from analytical to lyrical.
- JetBrains Mono reads as **archival, indexical, structural**. It is the system's catalog-card voice — version numbers, dates, axis labels, anything that's metadata rather than message.

### Type Scale

| Token | Size | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.display}` | 163.2px | Jost | 200 | Cover or opening hero display — generous and airy |
| `{typography.h1}` | 96px | Jost | 200 | Chapter-opening or section-break headline |
| `{typography.h2}` | 61.44px | Jost | 300 | Primary content-slide headline |
| `{typography.stat-value}` | 105.6px | Jost | 200 | Large numerical figure inside a stat cell |
| `{typography.quote-serif}` | 61.44px | Lora italic | 400 | Pull-quote body text |
| `{typography.insight-serif}` | 53.76px | Lora | 400 | Insight-card title |
| `{typography.h3}` | 38.4px | Jost | 400 | Sub-headline, region heading, flow-step title |
| `{typography.lead}` | 28.8px | Jost | 300 | Lead paragraph or large bullet item |
| `{typography.body}` | 21.12px | Jost | 300 | Body paragraph |
| `{typography.caption}` | 16.32px | Jost | 300 | Image caption, source note, fine print |
| `{typography.label}` | 13.82px | JetBrains Mono | 400 | Kicker, chrome label, axis label, version tag |
| `{typography.flow-num}` | 67.2px | Jost | 200 | Large step numeral in a process diagram |

### Defaults

- **Default primary section headline**: `{typography.h2}` (61.44px at weight 300). Don't reach for `{typography.h1}` for a standard content slide — that size is for chapter breaks.
- **Default opening or cover display**: `{typography.display}` (163.2px at weight 200).
- **Default body paragraph size**: `{typography.body}` (21.12px at weight 300).
- **Default lead paragraph size**: `{typography.lead}` (28.8px at weight 300) when a paragraph is the single supporting block under a headline.
- **Default label / kicker size**: `{typography.label}` (13.82px).
- **Default weight for any display element**: 200. Jost at 200 is the system's display voice.
- **Default weight for body**: 300.

When unsure, the canonical pairing is `{typography.h2}` (weight 300) for the headline + one paragraph at `{typography.lead}` (weight 300) for the supporting block. The narrow weight gap (300 vs. 300, distinguished only by size) is correct — Ivory Ledger does not lean on heavy weight contrast.

### Signature Treatments

These treatments are **non-optional whenever the corresponding element type is used**:

- **Every Jost display, h1, h2, h3 element is mixed case** — never uppercase. Uppercase is reserved exclusively for JetBrains Mono labels.
- **Every label, kicker, chrome tag, footer, axis label, and source note uses JetBrains Mono uppercase with at least 0.12em positive tracking** (most are 0.14–0.18em). Mono in sentence case does not exist here.
- **The pull-quote body is always Lora italic.** A pull-quote in Jost reads as a different design system.
- **The insight-card title is always Lora roman (not italic).** The serif face is the card's defining visual signal.
- **The bullet-list marker is always an em-dash in JetBrains Mono colored `{colors.ink-graphite-light}`.** Never a dot, never a check, never a numeral.
- **Stat values, display headlines, and flow numerals all use Jost weight 200 with negative letter-spacing.** The combination of ultra-light weight and tight tracking is the system's display signature.
- **Headlines and body text are colored `{colors.ink-black}`; muted lead and readable labels use `{colors.ink-graphite}`.** Reserve the lighter graphite for nonessential marks unless it passes the actual reading check.

### Typography Principles

The rhythm of Ivory Ledger is **ultra-light Jost + Lora italic quotes / roman insight titles + tracked mono labels**. Switching Jost to a heavier weight (500+) for a headline reads as a different system. Setting body text in Lora reads as a different system. Setting a label in Jost rather than JetBrains Mono reads as a different system. The role of each face is narrow and unmoving.

Italic is reserved for Lora pull-quote bodies; insight-card titles use Lora roman. Underline and added bold are not the body-emphasis mechanism. Isolate already-established emphasis through spacing or a separate text region, without introducing another inline font role.

## Layout

### Canvas System

Compose at fixed 1920×1080 using the shared runtime. Preserve the generous side gutters and light type; no template-specific strip, entrance-state classes or hidden-on-load content belongs to this recipe.

### Padding and Gap Scale

| Token | Value | Use |
|---|---|---|
| `{spacing.pad-x}` | 153.6px | Slide horizontal padding (the most generous in the library) |
| `{spacing.pad-y}` | 64.8px | Slide vertical padding |
| `{spacing.gap-lg}` | 54px | Between major content sections |
| `{spacing.gap-md}` | 32.4px | Between related elements |
| `{spacing.gap-sm}` | 16.2px | Between tightly related elements |

Use the explicit 153.6px side gutters without a dormant sidebar reserve. Align content to that shared edge so an unused sidebar does not produce an unexplained asymmetric inset.

### Chrome Frame

Most content slides carry a **chrome header** and **chrome foot**: each is a `flex space-between` row of two JetBrains Mono labels, separated from the slide body by a 1px solid black rule. Cover-style, chapter-break, quote, and closing slide types suppress chrome and foot entirely.

### Quiet Left Gutter

Leave the left gutter clear. The system's small 36px hairline supplies enough punctuation; a rotated sidebar label is unnecessary and would consume the generous margin.

## Depth and Elevation

### No Shadows, Hairline Rules Only

The system uses **zero box-shadow declarations** on any structural element. Depth is created through three mechanisms:

1. **1px hairline rules in solid `{colors.ink-black}`** — under chrome bands, above foot bands, between compare panels, above stat cells, across timeline tracks, across chart baselines. The rule is the divider, the separator, the structural mark.
2. **The 36px short rule** (`{components.rule}`) — a small punctuation mark used under chapter labels, beside kickers, or as a delicate accent break.
3. **Generous whitespace** — the primary depth signal is the 153.6px horizontal gutter and the space around each typographic moment.

### No Atmospheric Effects

There are no atmospheric gradients, glows, textures or grain overlays. A data-bound conic ring is a chart fill, not a surface effect. Even the donut chart center cutout is just a same-color circle laid over the conic ring — there is no contrast jump.

## Shapes and Treatment

### Border Radius

| Value | Use |
|---|---|
| 0px | Every structural element — image placeholders, stat cells, compare panels, tables, chart areas |
| 16px | Insight cards only |
| 50% (circle) | Pie/donut chart shape, timeline-dot small circles, vt-spine dot |
| 999px (pill) | None — pills are not used |

The system is dominantly square-cornered. The 16px rounded radius on insight cards is the only structural soft edge and is the visual signal that distinguishes a card from a region.

### Border Weights

- **1px solid `{colors.ink-black}`** — the universal structural rule weight. Used for every divider, every chrome rule, every chart axis, every cell border.
- **2px solid `{colors.ink-black}`** — used only on the pyramid-bar left edge (`{components.pyramid-bar}`) as a slightly stronger left-anchor for that specific chart type.

There is no thicker border weight, no dashed border (except a `1px dashed` graphite hint inside dense charts), no colored border.

### Decorative Element Types

**36px short rule** — A small 36px-wide × 1px-tall solid black horizontal accent rule. The system's signature punctuation mark. Used under a chapter number, beside a kicker, or as a delicate section break.

**Kicker / mono eyebrow** — A muted JetBrains Mono uppercase label in `{colors.ink-graphite-light}` placed above a headline. The eyebrow is barely-there by design.

**Bordered tag** — A small inline element with a 1px black border and 0.3em × 0.8em padding, containing a mono uppercase string. Used for version tags or status labels.

**Bullet em-dash** — A `—` glyph in JetBrains Mono colored `{colors.ink-graphite-light}`, prepended to each list item via a CSS grid marker column (`grid-template-columns: 1.2em 1fr`).

**Insight card** — A 16px-rounded rectangle (`{components.insight-card}`) on a slightly warmer cream surface. Carries a Lora roman title (53.76px weight 400) and a Jost body block (weight 300) pushed to the bottom of the card. The card is identified by its rounded corners and its serif title, not by a color contrast.

**Stat cell** — A vertical region with a 1px solid black top rule (`{components.stat-cell}`), containing a 105.6px Jost-200 numeral, a Jost label, and a small mono source note. Three stat cells side by side is the canonical arrangement.

**Timeline dot** — An 8px solid black circle with a 2px cream-warm border ring (`{components.timeline-dot}`) that punches through the horizontal connector rule. The ring color matches the warm-cream slide surface so the dot reads as floating on the rule, not crossing it.

**Vertical timeline spine** — A 1px-wide vertical solid black line (`{components.vtimeline-spine}`) with 9px solid black dots at the top of each entry. Used in long chronological lists.

**Pie / donut chart** — A circle (`{components.pie-donut}`) at min(499.2px, 453.6px) size, with a same-color circular cutout via `::after` to create the donut ring. The chart sits beside a legend column.

**Pyramid bar** — A horizontal bar (`{components.pyramid-bar}`) with a 2px solid black left edge and a tonal cream-to-graphite fill computed via `color-mix(in srgb, ink-black N%, cream-paper)` where N ranges from 4% to 55% across the five levels. Widths step from 36% (top, darkest) to 100% (bottom, lightest).

**Vertical bar chart** — A muted graphite (`{colors.ink-graphite-light}`) bar at 50% opacity for default bars; a solid black bar at full opacity for the highlighted bar. The chart has a 1px black left axis and a 1px black baseline.

**Image placeholder** — A 1px-bordered cream-paper-3 rectangle with centered mono label. Working layout aid only; do not deliver a labeled image void as if it were evidence.

**Process flow with no arrows** — Flow diagrams in this system are explicit about not using arrows between steps. Use aligned step numbers and clear ordering for an actual sequence; whitespace alone must not imply an unsupported relationship.

## Do's and Don'ts

### Do
- Use the cream paper background (`{colors.cream-paper}`) on every slide. The single-surface canvas is the system's foundation.
- Set every headline in `{colors.ink-black}` and let the weight (Jost 200) and size do the work. Headlines never need a chromatic shift.
- Use Jost at weight 200 for any display moment. The ultra-light weight is the system's defining typographic voice.
- Reach for Lora italic only when the text is a pull-quote body; reach for Lora roman only when it's an insight-card title. The serif's two roles are non-overlapping.
- Use JetBrains Mono uppercase with at least 0.12em tracking for every structural label, axis tag, footer, and bullet marker. Mono is the catalog-card voice.
- Render structural dividers as 1px solid black rules; keep the 2px pyramid anchor and light dashed chart guide as their documented exceptions.
- Apply the em-dash marker in muted graphite via JetBrains Mono for every bullet list.
- Leave generous whitespace. Content should sit comfortably in the middle 60–70% of the canvas; cramming content to the edges breaks the editorial reading.

### Don't
- Don't introduce a chromatic color. Red, blue, green, yellow do not exist in this system. The accent is darker ink.
- Don't use heavy weights (Jost 500, 600, 700) for headlines. The system reads as broken if display type weighs more than 300.
- Don't put a pull-quote in Jost. The Lora italic body is the quote's identity — switching to sans collapses the typographic distinction.
- Don't use box-shadow on any element. The system has no elevation.
- Don't use a card surface with chromatic contrast. Insight cards are identified by corner radius and serif title; a colored fill breaks the monochrome reading.
- Don't crowd a slide. The horizontal padding is 153.6px for a reason — content needs to breathe.
- Don't invent bold or serif inline emphasis in body copy. Use spacing and grouping to preserve an established emphasis while retaining Jost's quiet voice.
- Don't substitute the em-dash bullet marker with a dot, check, arrow, or numeral. The em-dash is the system's only list mark.
- Don't round any element other than insight cards (16px) or true circles (dots, donut). Square corners are the structural default.

## Stage, interaction and export

Use the [shared deck runtime](../../../references/deck-runtime.md) for the fixed stage, navigation and export integration. Keep all layout decisions inside the 1920×1080 stage; the audience viewport scales the complete composition uniformly, without internal mobile breakpoints. Do not add a template-specific navigation engine, active-state protocol, print path or presenter controls.

Check the recipe's characteristic edges at the rendered size: type extents, rotated objects, shadows, textures and panel boundaries. Appearance alone does not prove fit or contrast. Preserve the content and repair the layout when a check fails.

## CJK & International Content

### Pairing by editorial role

| Role | Latin face | Chinese candidate | Starting treatment |
|---|---|---|---|
| Light display / headline | Jost 200–300 | Noto Sans SC | Test a supplied light face at 300 alongside 400; select by the rendered strokes and line length |
| Body / lead | Jost 300 | Noto Sans SC | 400, upright |
| Pull quote / insight title | Lora italic / roman 400 | Noto Serif SC | 400, upright |
| Structural label | JetBrains Mono 400 | Noto Sans SC | 400, no tracking |

The goal is light editorial rhythm on cream, not a numeric weight match between fonts. A CJK 700 headline is not an equivalent of Jost 200 merely because both occupy the same rectangle. Dense glyphs, the supplied words and projected size can change the useful weight; compare actual renderings before choosing. Preserve ample cream around the text rather than forcing a heavier face to emulate Latin presence.

### Mixed-script composition

Use Latin-first stacks such as `Jost, "Noto Sans SC", sans-serif` and `Lora, "Noto Serif SC", serif`. Fallback selects glyphs, not a different CSS weight. Where scripts require different weights or tracking, use language spans with explicit styles and `font-synthesis: none`; keep a sentence in its correct reading order.

Start CJK display line-height around 1.15–1.25 and body around 1.75–1.85, then fit the real text. Reset CJK tracking to 0 and do not transform its case. Retain Latin numeric labels in JetBrains Mono; use the sans candidate for Chinese structural strings. Preserve punctuation and the wording of sources.

### Serif warmth without synthetic slant

Use an upright Noto Serif SC face for a Chinese quote when the selected files have no genuine italic. The serif shift, a generous inset and the cream ground can mark the quote's human voice without slanting glyphs. Insight-card titles remain upright serif in both scripts. Do not create new quote text, marginal commentary or emphasis to demonstrate the serif.

The em-dash list marker can remain in its own fixed-width marker column; inspect its alignment and glyph width rather than assuming the Latin and Chinese fonts draw identical dashes. Keep list items aligned by their text edge.

### Acquisition and fit

Acquire the chosen font files with the actual weights and glyph coverage before render; a family name alone does not load a face. Verify that Jost's light weights, Lora's quote italic and CJK glyphs resolve as intended in the artifact. Use local or embedded assets in a shareable release.

A long Chinese headline may need a second line. Start by using the available content width and an intentional line break; a modest size adjustment is acceptable only while readable. If the generous 153.6px side gutters and the full qualification cannot coexist, split the content or choose another system. Do not remove the qualification or claim a fixed 15% reduction always works.

## Iteration Guide

1. Any new slide background is `{colors.cream-paper}` (or `{colors.cream-warm}` for the insight/timeline sub-aesthetic). Never introduce a dark or chromatic background.
2. Any new headline uses Jost in mixed case at weight 200 (display, h1) or 300 (h2). Never reach for heavier weights.
3. Any new label, eyebrow, tag, or metadata text uses JetBrains Mono uppercase with at least 0.12em tracking colored `{colors.ink-graphite-light}`.
4. Any new structural divider is a 1px solid black rule. Use `{components.rule}` (36px short) for decorative accents and `{components.rule-full}` for region separation.
5. Any new pull-quote uses Lora italic at `{typography.quote-serif}` size. Quotes never appear in sans.
6. Any new card moment uses 16px rounded corners and a Lora roman title. Don't introduce square cards or sans-titled cards.
7. Any new bullet list uses the em-dash in muted graphite via JetBrains Mono.
8. Generous whitespace is a feature, not a missing layout. Don't fill space because it's available.
9. For an established emphasis, increase size or isolate the phrase with space; reserve Lora italic for genuine quotes. Do not introduce color or a new priority.
10. Color tokens that look chromatic (e.g. `--c-accent`) are aliased to `{colors.ink-black}` — they exist for token compatibility but resolve to black. Don't add a chromatic value to them.

## Known Gaps

- The three insight-card surface tokens (`--c-card-a`, `--c-card-b`, `--c-card-c`) resolve to two near-identical values (#FAFADF, #F5F0E4). The card "color variation" is effectively cosmetic — cards are distinguished by serif title and padding, not surface tone.
- The pie/donut chart uses a `::after` pseudo cutout that requires the chart background to match the slide surface. Slides with a different background (e.g., the cream-warm variant) need the `--c-bg-light` token adjusted for the cutout to disappear correctly.
- The pyramid chart uses `color-mix(in srgb, ...)` which requires a modern browser. Older browsers will render the bars as solid `{colors.cream-paper}`.
- Lora italic at large sizes (61.44px quote body) has noticeably wider stroke contrast than the surrounding Jost — this is intentional but creates a perceived weight jump. Don't compensate by making the surrounding text heavier.
- The bar-chart `bar-fill` uses inline `style="height: XX%"` declarations — there's no data-binding layer. Heights are computed manually.
- The system was originally named "Ivory Ledger" in the source comments. The template is exposed in the library as "Monochrome"; both names refer to the same design system.
