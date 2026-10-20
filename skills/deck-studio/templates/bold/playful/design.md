---
version: alpha
name: Playful
description: "A warm, hand-crafted editorial system built on a peach-clay canvas with charcoal ink as the only \"color.\" Display type runs in Syne (weight 700–800, tight negative tracking); body type runs in Space Grotesk at weight 400–500. The aesthetic borrows from independent studio decks, risograph zines, and sketchbook spreads: organic blob frames, scribbled SVG doodles, slightly rotated cards, and double-stroke offset borders give every slide a hand-touched, unpolished warmth. The effect is creative-studio editorial, not corporate pitch — confident but human, structured but loose."

colors:
  bg: "#F0C8A0"
  bg-alt: "#E8B88E"
  light: "#F7DEC6"
  text: "#1A1A1A"

color-aliases:
  accent: text

typography:
  display-hero:
    fontFamily: "Syne, sans-serif"
    fontSize: "144px"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: -0.03em
  display:
    fontFamily: "Syne, sans-serif"
    fontSize: "112px"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: -0.02em
  headline:
    fontFamily: "Syne, sans-serif"
    fontSize: "80px"
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: -0.01em
  statement:
    fontFamily: "Syne, sans-serif"
    fontSize: "72px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
  title:
    fontFamily: "Syne, sans-serif"
    fontSize: "56px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
  title-sm:
    fontFamily: "Syne, sans-serif"
    fontSize: "20.8px"
    fontWeight: 700
    lineHeight: 1.2
  number-hero:
    fontFamily: "Syne, sans-serif"
    fontSize: "112px"
    fontWeight: 800
    lineHeight: 1.0
  number-md:
    fontFamily: "Syne, sans-serif"
    fontSize: "40px"
    fontWeight: 800
    lineHeight: 1.0
  number-sm:
    fontFamily: "Syne, sans-serif"
    fontSize: "32px"
    fontWeight: 800
    lineHeight: 1.0
  body:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "17.6px"
    fontWeight: 400
    lineHeight: 1.7
  body-md:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "19.2px"
    fontWeight: 500
    lineHeight: 1.6
  label-eyebrow:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "13.6px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.15em
    textTransform: uppercase
  caption:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "13.6px"
    fontWeight: 500
    lineHeight: 1.4
  tag:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.2

spacing:
  pad-slide-lg: "64px 80px"
  pad-slide-md: "48px 64px"
  pad-card-lg: "32px 48px"
  pad-card-md: "24px"
  gap-lg: "48px"
  gap-md: "32px"
  gap-sm: "24px"

canvas:
  width: 1920px
  height: 1080px

components:
  rough-box:
    border: "3px solid {colors.text}"
    background: "{colors.bg}"
    padding: "24px"
    offsetShadowOffset: "6px 6px"
    offsetShadowBorder: "2–3px solid {colors.text}"
    description: "Generic content card with a double-stroke effect — the inner box has a 3px solid border, and an absolutely-positioned ::before pseudo-element offsets a second 2–3px border down-and-right by 6–8px to simulate a hand-drawn double outline. No fill on the offset; the canvas shows through."
  filled-block:
    background: "{colors.text}"
    color: "{colors.bg}"
    padding: "24px"
    description: "Inverted card: dark charcoal background with peach text. Used as the visual counterpoint to outlined cards in a collage of mixed treatments."
  blob-frame-organic:
    border: "3px solid {colors.text}"
    borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%"
    description: "Organic outlined blob, asymmetric border-radius. Abstract wrapper that can hold a smaller filled blob; do not use an abstract shape as a portrait stand-in."
  blob-frame-pebble:
    border: "3px solid {colors.text}"
    borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px"
    description: "Pebble-shaped frame with extreme alternating border-radius — two opposing corners pulled long, the other two pinched short. Reads as a hand-drawn lozenge."
  blob-fill:
    background: "{colors.text}"
    borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%"
    description: "Solid dark blob with asymmetric organic radius. Used inside an outlined blob-frame or floating on its own as decorative mass."
  scribble-svg:
    stroke: "{colors.text}"
    strokeWidth: 2
    fill: none
    strokeLinecap: round
    description: "Inline SVG path drawn as a single hand-drawn line — wavy stub, scribbled circle, star outline, squiggle, arrow. Always 2px stroke, rounded caps. Placed absolutely in corners and edges as decorative breath."
  doodle-circle:
    border: "3px solid {colors.text}"
    borderRadius: "50%"
    description: "Plain round outlined circle used as a decorative anchor in slide corners."
  doodle-rect:
    border: "3px solid {colors.text}"
    rotation: "1–3deg"
    description: "Plain outlined rectangle, rotated within ±3deg, used as a decorative anchor in slide corners."
  card-rotated:
    transform: "rotate(-3deg to 3deg)"
    description: "Any card or block can carry a small ±3deg rotation. Rotations stagger so adjacent cards rotate in opposite directions — never all in the same direction, never more than 3deg."
  step-node-circle:
    width: 64px
    height: 64px
    border: "3px solid {colors.text}"
    borderRadius: "50%"
    background: "{colors.bg}"
    fontFamily: "Syne, sans-serif"
    fontSize: 24px
    fontWeight: 800
    description: "Round outlined node containing a single numeric digit at display weight. Used as a timeline or process marker; alternates between outlined (bg fill) and filled (charcoal fill, bg text)."
  avatar-placeholder:
    width: 60px
    height: 60px
    background: "{colors.text}"
    borderRadius: "50%"
    description: "Optional abstract circle. Use a real supplied portrait for a person, or omit the portrait region; do not present a shape as a person's image."
  tag-pill:
    background: "{colors.text}"
    color: "{colors.bg}"
    padding: "6.4px 12.8px"
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    description: "Small charcoal pill with peach text, anchored to the bottom-left of an image frame as a category label."
  bar-chart:
    barFillSolid: "{colors.text}"
    barFillOutlined: "3px solid {colors.text} + transparent"
    axisStroke: "3px solid {colors.text}"
    description: "Custom HTML bar chart. Bars are either solid charcoal (primary series) or outlined transparent (secondary series). Axes are 3px solid charcoal lines, no grid."
  vertical-text:
    fontFamily: "Syne, sans-serif"
    fontWeight: 700
    letterSpacing: 0.1em
    transform: "rotate(90deg)"
    description: "Display-weight text rotated 90deg, anchored to a slide edge as a magazine-style spine label."
  ghost-blob:
    background: "{colors.text}"
    borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%"
    opacity: 0.08
    description: "Oversized organic blob at very low opacity placed behind content as atmospheric wallpaper. Functions like a watermark cloud."
---

## Composition and runtime

Build this recipe on the fixed **1920×1080** stage using the [shared deck runtime](../../../references/deck-runtime.md). That owner supplies scaling, navigation, active state and delivery behavior; this recipe supplies the slide's visual composition. Slide internals do not reflow on phones.

Choose components from the locked content: a stat needs a supported value, a quote its actual attribution, a label its real referent, and emphasis an established narrative reason. Empty component slots do not authorize new copy. Recompose or split an overfull slide without dropping meaning; change the visual system if it cannot carry the content.

## Overview

Playful is a **hand-crafted editorial system** anchored by a single warm canvas — a peach-clay `{colors.bg}` (#F0C8A0) — with charcoal `{colors.text}` (#1A1A1A) as the only meaningful "color." Everything reads as ink-on-clay-paper. There are no secondary brand colors, no gradients, no chromatic accents. The system commits fully to a one-color discipline and finds its expressiveness in shape, weight, rotation, and hand-drawn marks rather than in palette variety.

The typeface stack is **Syne for display, Space Grotesk for body**. Syne is the personality — a high-contrast display sans with quirky humanist proportions that reads as a contemporary independent studio voice, not a corporate sans. It is used at weights 700 and 800 with tight negative letter-spacing (-0.01em to -0.03em) for every headline, statement, statistic, and number. Space Grotesk is the workhorse — a steady, neutral geometric sans at weight 400–500 for body and 500–600 for labels. The pairing reads as "expressive editorial built on a reliable grid."

The color philosophy is **monochrome warmth**: a single ink color on a single warm surface, plus two tonal siblings of the canvas (`{colors.bg-alt}` slightly darker for image placeholders, `{colors.light}` slightly lighter for gentle layering). The peach is saturated enough to read as a deliberate aesthetic choice, not a neutral. The ink is slightly softened from pure black (#1A1A1A) to sit comfortably on the warm paper. The system's emotional register is "studio sketchbook" — confident but warm, structured but unpolished.

Depth is **double-stroke offset borders** and **hand-drawn marks**, not blurred shadows. The signature treatment: a 3px charcoal border on a card, plus a `::before` pseudo-element offset down-and-right by 6–8px carrying a second 2–3px border — the visual effect is a hand-drawn double outline that suggests imperfect tracing. Combined with small rotations (±0.5deg to ±3deg on cards) and scribbled SVG paths placed in slide corners, the system reads as crafted-by-hand rather than rendered-by-software.

**Density philosophy: medium-low.** Each slide is anchored by a single dominant element — a statement, a chart, a roster — surrounded by deliberate breathing room and one or two decorative scribbles. Crowding the canvas with simultaneous cards, doodles, and copy collapses the hand-touched feeling into clutter. The correct density is one substantive moment per slide with one or two SVG scribbles or organic blobs serving as visual punctuation in the negative space.

**Key Characteristics:**
- Peach-clay canvas (`{colors.bg}`) with charcoal ink (`{colors.text}`) as the only color. No secondary brand palette.
- Syne at weight 700–800 with negative letter-spacing for every display and numeric moment; Space Grotesk at 400–500 for body.
- Double-stroke offset borders on cards — a 3px outline plus a 6–8px offset ghost border via `::before`.
- Small ±0.5deg to ±3deg rotations on cards and blocks, with restrained ±1deg on standalone statistics for a hand-placed feel.
- Organic blob shapes with asymmetric border-radius act as decorative frames and fills.
- Inline 2px-stroke SVG scribbles (squiggles, stars, circles, arrows) live in slide corners as hand-drawn punctuation.
- No web shadows. Depth comes from double borders, rotation, and ink-density contrast.
- One dominant element per slide with generous negative space — never wall-to-wall content.

## Colors

### Palette
- **Background** (`{colors.bg}` — #F0C8A0): The peach-clay canvas. The default surface for every slide. Saturated enough to be the system's signature; warm enough that charcoal ink reads softly rather than starkly.
- **Background Alt** (`{colors.bg-alt}` — #E8B88E): A slightly darker tonal sibling of the canvas. Used as a fill for image placeholder regions and for subtle surface differentiation when one card needs to read as "behind" another without committing to a new color.
- **Light** (`{colors.light}` — #F7DEC6): A slightly lighter tonal sibling of the canvas. Available for gentle layering when a region needs to lift off the background by a single tonal step without introducing white.
- **Text/Ink** (`{colors.text}` — #1A1A1A): Charcoal ink — the single non-canvas color in the system. Softened from pure black so it sits as warm ink on warm paper. Used for all body text, all display text, all borders, all SVG strokes, all filled blocks, all dark fills.

The `accent` alias resolves to `{colors.text}` — the system has no separate accent color. The "accent" in Playful is contrast against the canvas, not a third hue.

### Defaults
- **Default surface background**: `{colors.bg}` — every slide opens on peach-clay.
- **Default headline color**: `{colors.text}` — always. Headlines are never tinted or recolored.
- **Default body text color**: `{colors.text}` — sometimes at opacity 0.7–0.9 for de-emphasis, but the underlying color remains charcoal.
- **Default border color**: `{colors.text}` — every outlined card, blob, doodle, and chart axis is charcoal.
- **Default text color on filled charcoal blocks**: `{colors.bg}` — peach text on dark surfaces is the only color inversion.
- **Default image-placeholder fill**: `{colors.bg-alt}` — slightly darker than the canvas so the placeholder reads as a distinct region without using white.
- **Default decorative-blob fill**: `{colors.text}` at full opacity (foreground) or at 0.08 opacity (atmospheric ghost-blob behind content).

The system has no concept of "primary vs secondary color." Every visual decision is a binary between canvas (peach) and ink (charcoal), modulated by opacity, scale, and shape.

## Typography

### Font Family
The system pairs two carefully chosen Google Fonts:

- **Syne** (display): A contemporary humanist display sans with quirky letterforms, narrow apertures, and slightly compressed proportions. Used at weight 700 and 800 for every display moment — headlines, statements, titles, numerals, vertical labels. Its character is what distinguishes Playful from a generic warm-toned deck: Syne reads as an independent studio voice, not a corporate header.
- **Space Grotesk** (body): A clean, slightly geometric sans-serif with a friendly humanist warmth. Used at weight 400–500 for body paragraphs, 500–600 for labels and captions. Provides a steady, legible counterweight to Syne's expressiveness.

There is no third face. Italic and underline are not used. Emphasis comes from weight (700 → 800), size, and the Syne-vs-Space-Grotesk contrast itself.

### Type Scale

| Token | Authored size at 1920×1080 | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.display-hero}` | 144px | Syne | 800 | Oversized cover or opening date/title |
| `{typography.display}` | 112px | Syne | 800 | Closing or major declarative headline |
| `{typography.headline}` | 80px | Syne | 700 | Primary section headline |
| `{typography.statement}` | 72px | Syne | 700 | Long-form quoted statement or manifesto line |
| `{typography.title}` | 56px | Syne | 700 | Region or section title |
| `{typography.number-hero}` | 112px | Syne | 800 | Hero statistic numeral |
| `{typography.number-md}` | 40px | Syne | 800 | Mid-scale ordinal or stat numeral |
| `{typography.number-sm}` | 32px | Syne | 800 | Inline ordinal or step numeral |
| `{typography.title-sm}` | 20.8px | Syne | 700 | Card title within a small block |
| `{typography.body-md}` | 19.2px | Space Grotesk | 500 | Subtitle or emphasized body |
| `{typography.body}` | 17.6px | Space Grotesk | 400 | Paragraph body |
| `{typography.label-eyebrow}` | 13.6px | Space Grotesk | 600 | Section eyebrow above a headline, uppercase tracked |
| `{typography.caption}` | 13.6px | Space Grotesk | 500 | Subtitle, fine print, footnote |
| `{typography.tag}` | 12px | Space Grotesk | 600 | Pill tag text inside a charcoal label |

### Defaults
- **Default size for a primary section headline**: `{typography.headline}` (80px).
- **Default size for a cover or major opening moment**: `{typography.display-hero}` (144px).
- **Default size for paragraph body**: `{typography.body}` (17.6px).
- **Default size for a subtitle or emphasized lead body**: `{typography.body-md}` (19.2px).
- **Default size for any inline caption, footnote, or fine print**: `{typography.caption}` (13.6px).
- **Default size for a hero numerical figure**: `{typography.number-hero}` (112px).
- **Default size for a stat tile or ordinal numeral**: `{typography.number-md}` (40px).
- **Default weight for any display element (headline, statement, title, numeral)**: 700 or 800 — never lower.
- **Default weight for any body element**: 400 or 500.

When unsure between `{typography.title}` and `{typography.headline}` for the primary text on a slide, reach for `{typography.headline}` — `{typography.title}` is for sub-regions within a slide.

### Signature Treatments
These treatments are **non-optional whenever the corresponding element type is used**:

- **Every display element is set in Syne.** Headlines, statements, titles, numerals, vertical labels, actual section numerals and supplied spine labels — all Syne. Using Space Grotesk at large sizes is the wrong system signal.
- **Latin Syne display elements use negative letter-spacing**: -0.01em to -0.03em depending on size. Syne at default tracking reads as untreated; the negative tracking is what gives display type its tight, compressed personality.
- **Every body and label element is set in Space Grotesk.** Syne for body paragraphs reads as overwrought.
- **Eyebrow labels are uppercase with 0.15em letter-spacing.** A label without uppercase + tracked spacing reads as a body fragment, not a label.
- **Statistics and numerals are always weight 800.** Even mid-scale numerals (32px) follow the display-weight convention. The heavy numeral establishes hierarchy; it must not exaggerate or change the meaning of the supplied value.
- **Numerals and statistics may carry a small rotation (±0.5deg to ±1deg)** when they sit as standalone stat-items rather than inside a chart or table. The rotation reinforces the hand-placed feeling.

### Typography Principles

The type table describes the starting design, not a minimum readable size. At 1920×1080, small body/caption roles may need a larger allocation for the audience. Recompose or split supporting regions before shrinking required text; never treat a small recipe token as permission to hide meaning.
The system's typographic rhythm comes from the **Syne-vs-Space-Grotesk contrast**, not from mixing weights within a face. A slide that uses only Syne at varying weights reads as monotonous; a slide that uses only Space Grotesk reads as understated to the point of corporate. The correct rhythm is Syne headline + Space Grotesk body, repeated with discipline.

Line-height: tight on display (0.85–1.1), generous on body (1.5–1.7). Never use tight line-height on body or generous line-height on display — both inversions break the rhythm.

Italic does not exist in this system. Underline does not exist. Emphasis is achieved by switching face (body → display) or weight (400 → 700), never by italicizing.

## Layout

### Canvas System
Compose at fixed 1920×1080 using the shared runtime. The recipe's authored type and spacing values below are stage coordinates, not viewport-dependents. Retain the peach field and double-outline proportions while adapting the composition to the real text.

### Padding Scale
| Token | Value | Use |
|---|---|---|
| `{spacing.pad-slide-lg}` | 64px 80px | Cover, statement, and closing slides — generous outer padding |
| `{spacing.pad-slide-md}` | 48px 64px | Standard content slides — outer padding |
| `{spacing.pad-card-lg}` | 32px 48px | Large card or contact block interior padding |
| `{spacing.pad-card-md}` | 24px | Standard card interior padding |
| `{spacing.gap-lg}` | 48px | Large grid/flex gaps between major regions |
| `{spacing.gap-md}` | 32px | Standard grid/flex gaps between cells |
| `{spacing.gap-sm}` | 24px | Tight inline gaps |

### Slide Edges

Slides carry no mandatory title bar, footer or decorative navigation. Leave a clear margin around the handmade composition; presenter controls and progress feedback belong to the shared runtime. A supplied spine label can occupy one edge without becoming a competing control.

## Depth and Elevation

### Double-Stroke Offset Border (Primary Technique)
The signature depth treatment is a **double-stroke offset border**. A card carries a 3px solid charcoal border, and a `::before` pseudo-element absolutely positioned over the card carries a second 2–3px border offset 6–8px down-and-right. The offset border has no fill — the canvas shows through. The visual effect is a hand-drawn double outline that suggests imperfect tracing, like a pen pulled twice along an edge. This is the system's elevation device; it replaces what most systems would do with a `box-shadow`.

### Rotation (Secondary Technique)
Small rotations (±0.5deg to ±3deg) on cards, blocks, statistics, and decorative shapes provide a hand-placed feeling. Rotation directions alternate across adjacent elements — never two cards rotated the same direction next to each other — to suggest someone laid each piece down by hand rather than via a snapped grid.

### Atmospheric Ghost-Blob
A signature treatment: an oversized organic blob (`{components.ghost-blob}`) filled with charcoal at 0.08 opacity, placed absolutely in a slide corner as atmospheric wallpaper. The blob reads as a soft watermark cloud behind the content. Use sparingly — at most one ghost-blob per slide, anchored to a corner the primary content does not occupy.

### No Web Shadows
The system uses **no `box-shadow` blur values, no `drop-shadow`, no rgba shadows**. All apparent depth comes from the double-stroke offset border, rotation, and ink-density contrast. A blurred shadow on any element breaks the hand-crafted aesthetic — the marks should look drawn, not rendered.

## Shapes and Treatment

### Border Radius Scale
| Value | Use |
|---|---|
| 0px | Cards, blocks, tags, image frames, table cells |
| 50% | Real portrait crops, step-node circles, doodle circles |
| Asymmetric organic (e.g. `40% 60% 70% 30% / 40% 50% 60% 50%`) | Blob frames and blob fills only |
| Pebble-asymmetric (e.g. `255px 15px 225px 15px / 15px 225px 15px 255px`) | Pebble-shaped frames only |

The system avoids smooth medium radii (4px, 8px, 12px) — corners are either sharp, perfectly round, or organically blob-shaped. The middle ground reads as a generic web app, which is the wrong signal.

### Border Weights
- **3px solid `{colors.text}`** — the standard outlined-card and blob-frame border weight.
- **2–3px solid `{colors.text}`** — the offset ghost-border weight on the `::before` pseudo-element (slightly thinner than the primary).
- **3px solid `{colors.text}`** — the chart axis weight (X and Y axes on bar charts).
- **2px solid `{colors.text}`** — timeline-track horizontal line; runtime control styling is owned elsewhere.
- **2px stroke** — the standard SVG scribble stroke weight with rounded line-caps.

### Decorative Element Types

**Rough-box card** — A rectangular content card with the signature double-stroke offset border. Background can be canvas peach (default), or solid charcoal (inverted card). Padding from the `{spacing.pad-card-*}` scale. Optional small rotation (±0.5–3deg).

**Organic blob frame** — A decorative outlined wrapper with asymmetric border-radius. Used as a portrait frame or decorative anchor; often holds a smaller solid blob-fill inside. Two characteristic shapes: the wavy organic blob (`{components.blob-frame-organic}`) and the pebble shape (`{components.blob-frame-pebble}`).

**Solid blob fill** — A charcoal organic shape with asymmetric border-radius. Used either inside an outlined blob-frame (creating a frame-and-mass pairing) or floating alone as a decorative mass.

**Scribble SVG** — Inline SVG path drawn as a single 2px-stroke charcoal line with round caps. The vocabulary: wavy stub, star outline, scribbled circle, squiggle waveform, arrow, concentric circles. Placed absolutely in slide corners or edges as decorative breath. One or two scribbles can punctuate available space; omit a mark when it competes with text or suggests an unsupported relationship.

**Doodle circle / doodle rect** — Plain outlined circle or rectangle, slightly rotated, placed absolutely in slide corners as a minimal decorative anchor. The simpler counterpart to the blob shapes — when a slide needs visual punctuation but a blob would feel too organic.

**Step-node circle** — A 64px round outlined node containing a single digit in Syne 800. Alternates between outlined (canvas fill, charcoal digit) and filled (charcoal fill, canvas digit) in sequence — odd steps filled, even steps outlined, or any consistent pattern.

**Tag pill** — A small charcoal rectangle with peach text at 12px weight 600. Anchored to the bottom-left of an image frame as a category label. The only inverted text-on-charcoal element that is not a full card.

**Vertical spine label** — Syne 700 text at 24px rotated 90deg, anchored to a slide's right edge with 0.1em letter-spacing. Reads as a magazine-spine wayfinder.

**Ghost-blob wallpaper** — Oversized organic blob at 0.08 opacity, placed absolutely in a slide corner as atmospheric wallpaper.

**Connector arrow doodle** — A small sketched arrow (single 2px line with chevron head) connects a real process or reference relationship. Without such a relationship, use a nondirectional squiggle.

## Do's and Don'ts

### Do
- Use Syne for every display moment (headline, statement, title, number, vertical label) and Space Grotesk for every body and label. The two-face contrast is the system's typographic rhythm.
- Apply negative letter-spacing (-0.01em to -0.03em) to every Syne element. Default tracking on Syne reads as untreated.
- Apply the double-stroke offset border to every primary content card — 3px main outline plus a 6–8px offset ghost border via `::before`. This is the system's signature elevation device.
- Use a nonverbal scribble in a clear corner when it helps the composition. Prefer a squiggle or circle; an arrow needs a real directional relationship and must not imply a nonexistent action.
- Give cards, blocks, and statistics a small ±0.5–3deg rotation. Alternate rotation direction across adjacent elements so nothing reads as snapped to a grid.
- Use `{colors.text}` (charcoal) as the only ink color. Headlines, body, borders, scribbles, fills — all the same color.
- Reach for `{colors.bg-alt}` when a region needs to read as a distinct surface without introducing white or a new color.
- Let negative space breathe. One dominant element per slide plus one or two scribbles is the correct density.
- Pair an outlined blob with a smaller fill for abstract visual mass; use a real asset when the role is a portrait.
- Place an oversized ghost-blob (charcoal at 0.08 opacity) in a slide corner when the negative space feels empty but a scribble would be too small.

### Don't
- Don't introduce a third color. The system is peach-canvas + charcoal-ink only. No blues, no reds, no chart-segment palettes — chart bars are solid charcoal or outlined charcoal, never colored.
- Don't use blurred `box-shadow`. All depth comes from double borders and rotation. A blurred shadow breaks the hand-drawn aesthetic immediately.
- Don't apply medium border-radius values (4px, 8px, 12px). Corners are sharp, fully round, or organically blob-shaped — nothing between.
- Don't use Space Grotesk for headlines or display moments. Syne is the personality face; substituting Space Grotesk loses the studio voice.
- Don't use Syne for body paragraphs. It reads as overwrought at small sizes and at low weights.
- Don't rotate elements more than 3deg. Beyond ±3deg the hand-placed feeling tips into wonky and amateur.
- Don't rotate every element in the same direction. Alternate ±directions across adjacent elements; uniformity reads as a tilted canvas, not as hand-placement.
- Don't crowd a slide with simultaneous cards, statistics, and doodles. The system reads as expensive when sparse and broken when dense.
- Don't use italic or underline for emphasis. Switch face or weight instead.
- Don't put display-weight text at default tracking. Always tighten Syne with negative letter-spacing.

## Stage, interaction and export

Use the [shared deck runtime](../../../references/deck-runtime.md) for the fixed stage, navigation and export integration. Keep all layout decisions inside the 1920×1080 stage; the audience viewport scales the complete composition uniformly, without internal mobile breakpoints. Do not add a template-specific navigation engine, active-state protocol, print path or presenter controls.

Check the recipe's characteristic edges at the rendered size: type extents, rotated objects, shadows, textures and panel boundaries. Appearance alone does not prove fit or contrast. Preserve the content and repair the layout when a check fails.

## CJK & International Content

### Pairing by role

| Role | Latin face | Chinese candidate | Starting treatment |
|---|---|---|---|
| Expressive display | Syne 700–800 | ZCOOL KuaiLe | Supplied 400 face, no synthetic bold |
| Body / label | Space Grotesk 400–600 | Yozai, or Noto Sans SC for a steadier prose voice | Use the available face and verify its weight |

KuaiLe can supply a playful display voice without reproducing Syne's proportions. Yozai is a warmer candidate whose handwritten character should be judged against the actual paragraphs; it is not a proved equivalent of Space Grotesk. If both fonts make the page too informal, keep KuaiLe for headlines and use the steadier sans for prose.

### Mixed-script hierarchy

Extend the Latin-first family stacks and style Chinese runs explicitly when the supplied face uses a different weight. Fallback does not convert a Syne 800 request to a native 400 glyph face. Disable synthetic bold and slant, load the actual font files, and inspect full glyph coverage. Numeric values may stay in Syne when that matches the source notation; Chinese unit suffixes remain attached to their values.

Use size, spacing and grouping to distinguish roles when the selected CJK files do not supply the Latin weight ladder. Do not claim the lost weight steps are automatically inconsequential. A rendered mixed slide must still separate the headline, explanatory body and caption at the audience's reading scale.

### Tracking and leading

Reset Chinese tracking to 0 instead of copying Syne's -0.01 to -0.03em treatment. Start at 1.15–1.25 for display leading and 1.75–1.85 for body, then adjust for the actual glyphs. CJK eyebrows keep their source wording and normal case, with size and placement carrying the label role. Do not insert a label simply because the Latin preview used one.

### Handmade geometry and fit

The peach/charcoal palette, double-stroke border, organic blobs and restrained alternating card rotations can remain. Those visual tools need no translation, but their collision bounds change with longer text and larger line boxes. Check the 6–8px ghost outline, card corners and scribbles around every Chinese paragraph; decorative punctuation must not cover a real text mark.

Use fewer, larger regions or split a logical sequence across slides before shrinking text. Keep all supplied content and its order. If a word cannot sit inside the pebble frame, change the frame allocation or use the rectangular rough-box treatment rather than clipping glyphs. Acquire and localize the selected fonts before export; neither the family name nor a live CDN response is part of the finished deck's reliability.

## Iteration Guide

1. Any new card uses the rough-box pattern: 3px charcoal border, peach background (or charcoal if inverted), padding from `{spacing.pad-card-*}`, and a `::before` ghost-border offset 6–8px down-and-right at 2–3px weight.
2. Any new card carries a small rotation (±0.5–3deg). Alternate rotation direction with neighboring cards; never align all cards to the same angle.
3. Any new headline uses Syne at weight 700–800 with negative letter-spacing. If the headline is the primary slide moment, reach for `{typography.headline}` or `{typography.display}` — not `{typography.title}` (which is sub-region scale).
4. Any new body or label uses Space Grotesk at weight 400–600. Use `{typography.label-eyebrow}` (13.6px, weight 600, uppercase, 0.15em tracking) for the small label above a headline.
5. Any new statistic or numeral uses Syne at weight 800 with negative letter-spacing. Even small numerals (32px) follow the display-weight convention.
6. Use optional corner scribbles at 2px with rounded caps in charcoal. Keep them clear of content and do not add decorative words or directional meaning.
7. Any decorative shape uses asymmetric organic border-radius (blob) or sharp 0px (rectangle) or 50% (round). Avoid medium radii.
8. If the slide negative space feels heavy, add a ghost-blob (charcoal at 0.08 opacity, oversized organic shape) anchored to a corner the content does not occupy.
9. Charts (bar, donut, line) use only `{colors.text}` and `{colors.bg-alt}` as fills. Do not introduce chromatic chart palettes.
10. Cards may be either outlined (default — canvas fill, charcoal border, charcoal text) or inverted (charcoal fill, peach text). Inverted cards are the system's emphasis device; reserve them for the cell you want to anchor the slide's attention.

## Known Gaps

- Localize the actual Syne and Space Grotesk font assets used by the deck. Fallback sans-serif changes the voice and metrics, so verify the selected faces before rendering.
- The double-stroke offset border (`::before` with 6–8px offset) requires the parent card to have `position: relative` and the pseudo-element to be visually inside the card's bounding box plus the offset. Cards near a slide edge may have their offset border clipped.
- The peach canvas (#F0C8A0) has a strong cultural register (earthy, warm, slightly rustic). It does not pair well with cool-toned brand palettes and is not interchangeable with a neutral cream or white — the warmth is foundational.
- Working image voids must become real supplied assets or be recomposed away. Preserve the asset's evidential meaning; use neutral framing rather than recoloring evidence to fit the warm palette.
- There is no defined dark-mode variant. The system is single-mode (warm peach canvas only).
