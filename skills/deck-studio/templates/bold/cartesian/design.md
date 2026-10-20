---
version: alpha
name: Cartesian
description: A quiet, museum-catalog editorial system built on Playfair Display serif headlines, Inter sans body, and a five-tone warm-stone palette. The aesthetic is "consulting deck meets architectural monograph" — minimal geometric line decorations (thin circles, dashed arcs, vertical and horizontal hairlines) drift behind content, suggesting drafting paper and compass work. Every divider is a single 1px line in a muted taupe; nothing is bold, nothing is loud. The cultural reference is Massimo Vignelli's editorial work, the Cooper Hewitt catalog, and pencil-and-tracing-paper urban planning documents.

colors:
  bg-primary: "#EDE8E0"
  bg-secondary: "#E2DBD1"
  text-primary: "#1A1A1A"
  text-secondary: "#5A5A5A"
  accent: "#8A8178"
  line: "#B8B0A4"
  white-overlay: "rgba(255, 255, 255, 0.3)"

typography:
  display:
    fontFamily: "Playfair Display, serif"
    fontSize: "clamp(3rem, 115.2px, 5.5rem)"
    fontWeight: 400
    lineHeight: 1.1
  h1:
    fontFamily: "Playfair Display, serif"
    fontSize: "clamp(2.5rem, 96px, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.1
  h2:
    fontFamily: "Playfair Display, serif"
    fontSize: "clamp(1.8rem, 67.2px, 3rem)"
    fontWeight: 400
    lineHeight: 1.1
  h3:
    fontFamily: "Playfair Display, serif"
    fontSize: "clamp(1.2rem, 38.4px, 1.6rem)"
    fontWeight: 400
    lineHeight: 1.1
  stat-figure:
    fontFamily: "Playfair Display, serif"
    fontSize: "2rem"
    fontWeight: 400
    lineHeight: 1
  agenda-numeral:
    fontFamily: "Playfair Display, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1
  team-initial:
    fontFamily: "Playfair Display, serif"
    fontSize: "2rem"
    fontWeight: 400
    lineHeight: 1
  quote-mark:
    fontFamily: "Playfair Display, serif"
    fontSize: "5rem"
    fontWeight: 400
    lineHeight: 1
  card-headline:
    fontFamily: "Playfair Display, serif"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1.1
  timeline-headline:
    fontFamily: "Playfair Display, serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(0.9rem, 23px, 1.1rem)"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.6
  subtitle:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(1rem, 28.8px, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.5
  attribution:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 2px
    textTransform: uppercase
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 3px
    textTransform: uppercase
  micro:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 2px
    textTransform: uppercase

spacing:
  pad-y: "43.2px"
  pad-x: "76.8px"
  gap-xl: "115.2px"
  gap-lg: "96px"
  gap-md: "57.6px"
  gap-sm: "21.6px"
  card-pad: "43.2px 38.4px"

canvas:
  width: 1920px
  height: 1080px

components:
  card:
    border: "1px solid {colors.line}"
    padding: "{spacing.card-pad}"
    background: "{colors.white-overlay}"
    description: "Tracing-paper card — 1px taupe outline with semi-transparent white fill that lets the canvas tone bleed through. No radius, no shadow."
  card-icon:
    width: 40px
    height: 40px
    border: "1px solid {colors.line}"
    borderRadius: "50%"
    color: "{colors.accent}"
    fontSize: "1rem"
    description: "Small ringed circle (40px) carrying a genuine ordinal or wordless mark; use a readable ink tone for real text."
  agenda-row:
    padding: "21.6px 0"
    borderBottom: "1px solid {colors.line}"
    description: "List row separated only by a 1px taupe hairline. Numeral at left, label at right."
  timeline-rule:
    height: "1px"
    background: "{colors.line}"
    description: "Single horizontal 1px taupe line connecting timeline items. No nodes, no markers — just the line."
  vertical-line:
    width: "1px"
    height: "100%"
    background: "{colors.line}"
    opacity: 0.3
    description: "Optional decorative vertical hairline anchored at left edge (default 153.6px from edge) at low opacity. Provides drafting-paper grid feel."
  horizontal-accent:
    width: "384px"
    height: "1px"
    background: "{colors.text-primary}"
    description: "Single short ink-black 1px horizontal line used as a strong accent rule. Black, not taupe."
  geo-circle:
    border: "1px solid {colors.line}"
    borderRadius: "50%"
    opacity: 0.5
    description: "Thin solid taupe ring at low opacity, used as decorative geometry behind content."
  geo-arc:
    border: "1px dashed {colors.line}"
    borderRadius: "50%"
    opacity: 0.3
    description: "Thin dashed taupe ring at very low opacity, paired with geo-circle to suggest compass construction."
  geo-decoration:
    border: "1px solid {colors.line}"
    borderRadius: "50%"
    description: "Large decorative ring (30–960px diameter) anchored to a corner or center. Always pairs with a ::before pseudo-element rendering a smaller dashed ring inside it, suggesting concentric drafting."
  geo-ring:
    width: "960px"
    height: "960px"
    border: "1px solid {colors.line}"
    borderRadius: "50%"
    opacity: 0.3
    description: "The largest geometric decoration variant — a 960px centered ring with an inner ::before dashed ring at 70% diameter."
  image-placeholder:
    background: "{colors.bg-secondary}"
    border: "1px solid {colors.line}"
    description: "Solid taupe-tinted block with two crossed 1px diagonal hairlines via ::before/::after at +30° and -30°, suggesting an X over a blank frame. Holds a small uppercase label centered."
  team-photo:
    width: "230.4px"
    height: "230.4px"
    borderRadius: "50%"
    border: "1px solid {colors.line}"
    background: "{colors.bg-secondary}"
    description: "Circular portrait frame (230.4px) in slightly darker stone, ringed in taupe, holding a supplied portrait or an actual named person's initial in readable ink."
  nav-arrow:
    width: 40px
    height: 40px
    border: "1px solid {colors.line}"
    background: "transparent"
    description: "Square 40px button with 1px taupe border holding an arrow glyph. Hover state inverts to ink fill with cream text."
  nav-dot:
    width: 8px
    height: 8px
    borderRadius: "50%"
    background: "{colors.line}"
    description: "Small taupe dot at right edge as navigation indicator. Active state shifts to ink and scales 1.3."
  chart-stroke-primary: "{colors.text-primary}"
  chart-stroke-comparison: "{colors.line}"
  chart-comparison-dash: "5, 5"
  chart-grid-color: "{colors.bg-secondary}"
  chart-axis-tick-color: "{colors.accent}"
---

## Stage and Content Contract

This recipe supplies visual decisions for Deck Studio's fixed **1920×1080** stage. Use the canonical [runtime](../../../runtime/) and [runtime contract](../../../references/deck-runtime.md) for stage scaling, navigation, focus, capture and export. Do not create a second scaler, slide controller, keyboard handler or print engine. The whole stage scales uniformly, including on phones; the composition does not internally reflow with the browser viewport.

All dimensions below are stage-space authoring values. A range is a choice to resolve while composing, not permission for live viewport-dependent layout. Body and data text must remain readable in the intended presentation or reading setting: enlarge and recompose, split while retaining all locked material, or choose another system when the content does not fit. Never clip, scroll, hide, omit or invent material to complete a layout. Visible labels, metrics, attribution, ordinals, emphasis and status come from the content lock; wordless geometry may supply atmosphere.

## Overview

Cartesian is a **quiet museum-catalog editorial system**. Its defining premise is **restraint through 1px lines**. Every structural element — list separators, agenda rules, timeline connectors, card borders, table dividers — is a single 1px line in a muted taupe `{colors.line}`. There are no thick borders, no elevated fills or shadows; 30%-white tracing-paper cards and true circular frames are deliberate exceptions to the square structural plane. Hierarchy is built through type contrast and negative space; depth does not exist in the conventional sense.

The typeface stack is a literary-monograph pairing. **Playfair Display** — a high-contrast didone-influenced serif — carries every headline, every stat numeral, every card title, every team initial, every quote mark. Playfair runs at weight 400 (regular) almost exclusively — there is no use of bold or 700-weight Playfair in the system. The thin-stroke didone aesthetic depends on letting the letterforms breathe at modest weights. **Inter** — a clean modern grotesque — carries every body paragraph, every subtitle, every label, every attribution. Inter runs at 400 for body and 500 for labels. The pairing creates the system's editorial voice: serif statements + clean sans supporting structure.

The palette is **five warm stones plus ink**. The canvas is `{colors.bg-primary}` — a warm sandstone off-cream. A slightly deeper stone `{colors.bg-secondary}` provides subtle region differentiation (image placeholders, team photo frames). Ink `{colors.text-primary}` is the headline color; medium gray `{colors.text-secondary}` is body. Taupe `{colors.accent}` carries ornamental marks; use body/ink tones for readable labels, attribution and small numerals. The lightest taupe `{colors.line}` is the universal 1px line color. There are no accent colors in the populist sense — no red, no orange, no blue. The palette is stone, stone, stone, ink, ink. The only "color" in the system is type contrast.

Depth is **entirely absent in the conventional sense**. There are no shadows, no elevated cards, no softly rounded rectangular surfaces, no gradients. Atmosphere is created by **geometric line decorations**: thin solid and dashed circles in `{colors.line}` at 20–50% opacity drift behind content as if drawn on tracing paper with a compass. These do not create hierarchy — they create mood. The decorative geometry signals "drafted, considered, precise."

**Density philosophy: sparse and breathing.** Cartesian reads as elegant when sparse and broken when crowded. A correctly composed slide pairs one Playfair headline with one body paragraph, or one chart with one short caption, framed by generous negative space. Most slide composition uses centered or asymmetric two-column layouts with `5–115.2px` gutters and significant vertical breathing room. The decorative compass arcs reinforce the sparseness — they are most effective when there is room around them. A slide that feels broken in this system is one packed edge-to-edge with content; the correct density is "one clear idea, well-framed, on stone paper."

**Key Characteristics:**
- Warm sandstone canvas `{colors.bg-primary}` with single 1px taupe `{colors.line}` dividers as the universal structural element.
- Playfair Display serif at weight 400 for every headline/numeral/quote-mark; Inter sans for every body/label/attribution.
- Five-tone monochrome palette: two stones, two grays, one ink. No vivid accent colors anywhere.
- Decorative geometric rings (thin solid + dashed circles, 20–50% opacity) drift behind content as compass-drafted atmosphere.
- Every label, attribution, and micro-text is uppercase Inter with 2–3px letter-spacing.
- All borders are 1px hairlines; no element has a thicker border or shadow; portrait circles and tracing-paper fills remain flat.
- Right-edge vertical nav-dot column, bottom-left square nav-arrow buttons, bottom-right mono slide counter.
- Actual media uses stone-tinted 1px frames; wordless drafting diagonals can remain separate abstract decoration.

## Colors

### Stone & Ink Palette
- **Background Primary** (`{colors.bg-primary}` — #EDE8E0): The canvas. Warm sandstone off-cream — closer to "manila folder" than "white paper." This is the default slide background.
- **Background Secondary** (`{colors.bg-secondary}` — #E2DBD1): A slightly deeper stone, used for image placeholders, team-photo frames, and any region that needs subtle separation from the canvas without a colored fill or a border.
- **Text Primary** (`{colors.text-primary}` — #1A1A1A): Near-black ink. Used for headlines, stat numerals, and the special `{components.horizontal-accent}` rule. The strongest contrast color in the system.
- **Text Secondary** (`{colors.text-secondary}` — #5A5A5A): Medium warm gray. Used for all body paragraph text. Softer than ink — readable but recedes.
- **Accent** (`{colors.accent}` — #8A8178): Warm taupe. Used for labels, attributions, agenda numerals, slide counter, card-icon text, team-member role text. The system's "small text" color.
- **Line** (`{colors.line}` — #B8B0A4): Pale taupe. The universal 1px line color: card borders, agenda rules, timeline connectors, team-photo rings, nav-arrow borders, geo-decoration rings.

### Defaults
- **Default surface background**: `{colors.bg-primary}`.
- **Default headline color**: `{colors.text-primary}` — always ink, never colored, never accent-taupe. Playfair headlines are uniformly ink.
- **Default body text color**: `{colors.text-secondary}` (medium warm gray).
- **Default label / attribution / micro-text color**: `{colors.accent}` (warm taupe).
- **Default border color**: `{colors.line}` — every 1px structural border. Never use ink-black for borders except the rare `horizontal-accent` rule.
- **Default secondary surface fill**: `{colors.bg-secondary}`.
- **Default chart primary series color**: `{colors.text-primary}` (ink).
- **Default chart comparison/secondary series color**: `{colors.line}` with 5px dashed stroke.
- **Default chart grid color**: `{colors.bg-secondary}`.
- **Default chart axis tick color**: `{colors.accent}`.

Cartesian has **no accent color in the populist sense.** A red callout, a blue bar, a green stat — none of these exist. When emphasis is needed, increase type size, switch from sans to serif, or add a single 1px `horizontal-accent` rule in ink. Color is not the emphasis mechanism in this system; restraint is.

## Typography

### Font Family
The system runs on a **two-face conversation**: `Playfair Display` (serif, weights 400/600/700, italic available) carries every headline, stat numeral, quote mark, card title, and team initial; `Inter` (sans, weights 300/400/500/600) carries every body, subtitle, label, attribution, and micro-text. There is no third face.

Playfair Display is used almost exclusively at **weight 400 (regular)**. The system deliberately avoids bold Playfair — the didone aesthetic relies on thin-stroke modulation that disappears at heavier weights. Italic Playfair is available (loaded) but not exercised in the default template; reserve it for inline emphasis inside body copy.

Inter runs at weight 400 for body, weight 500 for labels and micro-text, weight 600 for the rare emphasized inline element. The contrast between Playfair's high-modulation serif and Inter's even sans is the system's primary typographic rhythm.

### Type Scale

| Token | Size | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.display}` | clamp(3rem, 115.2px, 5.5rem) | Playfair Display | 400 | Cover or large opening title |
| `{typography.h1}` | clamp(2.5rem, 96px, 4.5rem) | Playfair Display | 400 | Section-opening or large closing headline |
| `{typography.h2}` | clamp(1.8rem, 67.2px, 3rem) | Playfair Display | 400 | Primary slide headline |
| `{typography.h3}` | clamp(1.2rem, 38.4px, 1.6rem) | Playfair Display | 400 | Sub-headline within a region |
| `{typography.card-headline}` | 1.3rem | Playfair Display | 400 | Card or pillar-block title |
| `{typography.timeline-headline}` | 1.2rem | Playfair Display | 400 | Timeline-step or phase headline |
| `{typography.stat-figure}` | 2rem | Playfair Display | 400 | Numerical stat figure (typically inline in a stats cluster) |
| `{typography.team-initial}` | 2rem | Playfair Display | 400 | Initial letter centered inside a team-photo circle |
| `{typography.agenda-numeral}` | 1.5rem | Playfair Display | 400 | Ordinal numeral preceding an agenda row |
| `{typography.quote-mark}` | 5rem | Playfair Display | 400 | Opening quotation glyph for a pull-quote |
| `{typography.subtitle}` | clamp(1rem, 28.8px, 1.3rem) | Inter | 400 | Subtitle paragraph below a display headline |
| `{typography.body}` | clamp(0.9rem, 23px, 1.1rem) | Inter | 400 | Standard paragraph body |
| `{typography.body-sm}` | 0.9rem | Inter | 400 | Compact body inside cards or timeline items |
| `{typography.attribution}` | 0.85rem | Inter | 400 | Attribution line below a quote, with 2px tracking + uppercase |
| `{typography.label}` | 0.75rem | Inter | 500 | Section label / eyebrow above a headline, with 3px tracking + uppercase |
| `{typography.micro}` | 0.7rem | Inter | 400 | Image label, slide counter, smallest chrome text |

### Defaults
- **Default size for the primary slide headline**: `{typography.h2}` (clamp 1.8–3rem).
- **Default size for a cover or large opening headline**: `{typography.h1}` (clamp 2.5–4.5rem); for the most expansive cover, `{typography.display}` (clamp 3–5.5rem).
- **Default size for paragraph body**: `{typography.body}` (clamp 0.9–1.1rem).
- **Default size for any inline label or eyebrow**: `{typography.label}` (0.75rem) — always 3px tracking + uppercase.
- **Default weight for any Playfair headline**: 400. Don't reach for 600 or 700.
- **Default weight for body**: 400.
- **Default weight for labels/micro**: 500.
- **Default size for a stat numeral inside a stats cluster**: `{typography.stat-figure}` (2rem). Cartesian does not have a hero-stat-numeral pattern (no 5–7rem display stat); stats are presented as inline ranks at modest scale.

When unsure, reach for `{typography.h2}` for the slide's primary text moment, not `{typography.h3}` (which is a sub-headline within a region).

### Signature Treatments
These treatments are **non-optional whenever the corresponding element type is used**:

- **Every Playfair headline, stat, quote, card title, and initial is set at weight 400.** Bold Playfair does not exist in this system. The thin-stroke didone aesthetic is the identity.
- **Every Playfair element is set in sentence case (or true title case for proper nouns).** Uppercase Playfair is not used.
- **Every Inter label, attribution, and micro-text element is uppercase with 2–3px letter-spacing.** Labels at 3px tracking; attributions and micro at 2px. Without the tracking, Inter caps read as untreated.
- **Every Playfair element is rendered in `{colors.text-primary}` (ink).** Headlines are never accent-taupe and never gray. The exception is decorative initial letters inside a circular `card-icon` or `team-photo`, where the letterform is rendered in `{colors.accent}`.
- **Every 1px structural border uses `{colors.line}`.** Other border colors do not exist except for the rare `horizontal-accent` rule in ink.
- **Every card, image-placeholder, team-photo, and nav-arrow border is 1px solid.** Thicker borders do not exist in this system.
- **Charts use ink-black for the primary series and dashed taupe (5px, 5px) for the comparison series.** This pair is the only chart-color rule.

### Typography Principles
The Playfair-400 + Inter-400 combination is the system's voice. Switching either family or jumping Playfair to weight 700 reads as a different design system. Approved body emphasis uses a verified Inter italic asset or supplied semibold; do not assume italic is loaded or switch body family to Playfair. Underline is not used.

Line-height stays open: headlines at 1.1, body at 1.6. The wide body line-height is part of the breathing-room aesthetic.

## Layout

### Canvas System
Compose inside the canonical 1920×1080 stage. Keep the recipe's internal grid, margins and visual layers in stage coordinates. The runtime owns the outer viewport fit and slide visibility; recipe CSS must not replace its container positioning or slide-state classes. Reserve space for actual runtime controls where present and never reproduce them as painted buttons or invented hints.

### Padding and Gap Scale
| Token | Value | Use |
|---|---|---|
| `{spacing.pad-y}` | 43.2px | Default vertical slide padding |
| `{spacing.pad-x}` | 76.8px | Default horizontal slide padding |
| `{spacing.gap-xl}` | 115.2px | Major two-column gutter (most spacious) |
| `{spacing.gap-lg}` | 96px | Standard two-column or grid gutter |
| `{spacing.gap-md}` | 57.6px | Card-grid gutter |
| `{spacing.gap-sm}` | 21.6px | Agenda row vertical padding, attribution spacing |
| `{spacing.card-pad}` | 43.2px 38.4px | Internal padding for content cards |

Headlines typically carry a 2–32.4px margin-bottom from labels above and a 21.6px margin-bottom from body below. Section headers above 3-card or 4-team grids carry a 64.8px margin-bottom from the grid (significant breathing room).

### Decorative Geometry Layer
Cartesian's signature is its **drafting-paper geometric decoration**. Every slide may layer one or more of:
- A large ringed `geo-decoration` anchored to a corner (typically 30–960px diameter) with an inner dashed ring at ~80% diameter (the `::before` pseudo).
- A `vertical-line` at ~153.6px from the left edge running floor-to-ceiling at 30% opacity.
- A `horizontal-accent` (a single short black 1px line) anchored at 162px from the bottom-left.
- A centered `geo-ring` (960px circle) on closing or contemplative slides.

These elements have **no informational role** — they create atmosphere. Slides without any geometric decoration are valid; over-decoration (more than two geo elements per slide) breaks the restraint.

### Chrome
Style actual shared-runtime controls with thin 1px lines and a quiet readable Inter counter where supported. The recipe does not create navigation arrows, counter IDs or a separate slide registry. Keep actual metadata in body/ink tones; taupe lines may remain decorative.

## Depth and Elevation

### Flat Plane (Only Technique)
Cartesian has no shadows, no elevated cards, no softly rounded rectangular surfaces, no gradients. Every element sits on a single plane.

Hierarchy is constructed from:
- **Type contrast** — Playfair serif vs Inter sans; size scale from 5rem down to 0.7rem.
- **1px hairline dividers** — agenda rows, timeline rule, card outlines, image-placeholder outlines, stats top-border, team-photo rings, nav-arrow borders.
- **Color tone** — ink vs gray vs taupe.
- **Negative space** — generous padding around every element.
- **Geometric atmosphere** — compass-drafted rings behind content suggest depth without creating it.

Introducing a `box-shadow`, an elevated card, or a soft gradient breaks the restraint that defines the system.

## Shapes and Treatment

### Border Radius
| Value | Use |
|---|---|
| 50% (circle) | Every circular element: `card-icon` (40px), `team-photo` (230.4px), `nav-dot` (8px), `geo-circle`, `geo-arc`, `geo-decoration`, `geo-ring` |
| 0 | Everything else: cards, image-placeholders, nav-arrows, agenda rows, timeline, stat-blocks, chart container |

The system uses **only two radius values**: 50% (true circle) or 0 (sharp rectangle). Soft-rounded corners do not exist.

### Border Weights
- **1px solid `{colors.line}`** — the universal structural border. Used on every card, image-placeholder, team-photo ring, nav-arrow, agenda row bottom, timeline rule, stats top, geo-circle, geo-decoration.
- **1px dashed `{colors.line}`** — used on `geo-arc` and the inner `::before` ring inside `geo-decoration` / `geo-ring`. Dashed signals "construction line / arc."
- **1px solid `{colors.text-primary}`** — used only on the rare `horizontal-accent` decorative rule. The system's only ink-black line.
- **Chart bar/line stroke widths** — Chart.js series at 1px (bar borders), 2px (line series). Comparison series at 2px dashed (5px dash, 5px gap).

All structural borders are `{colors.line}`. Thicker borders, colored borders, and dashed structural borders (other than geo-arcs) do not exist.

### Decorative Element Types

**Geometric ring (geo-circle / geo-decoration / geo-ring)** — Thin 1px taupe circles in various sizes (192px, 576px, 960px) at 20–50% opacity. Typically paired with an inner dashed `::before` ring at 70–80% of the outer diameter, suggesting compass construction with both a primary and an offset arc. Anchored to corners or centers; sits behind content with `z-index: 0` and `pointer-events: none`.

**Vertical line** — A single 1px taupe column anchored at ~153.6px from the left slide edge, running floor-to-ceiling at 30% opacity. Suggests a drafting-paper alignment guide. Optional per slide.

**Horizontal accent** — A single 384px × 1px black line anchored 162px from the bottom-left of a slide. The system's only ink-black line — used as a strong terminal accent rule on cover or closing layouts. Use sparingly.

**Media frame** — A stone-tinted block with a 1px taupe outline for actual supplied media. Crossed 30° drafting lines may be wordless background art, never an X plus a fake 'Visual Reference' label standing in for missing media.

**Team-photo frame** — A 230px circular stone field with a 1px taupe ring and an intentionally cropped supplied portrait. For an actual named person, a Playfair-400 initial in readable ink may be a deliberate text identity treatment.

**Card** — A 1px taupe-bordered block with a semi-transparent white interior fill (`{colors.white-overlay}`) that lets the canvas tone bleed through subtly. The faint white fill is what differentiates a card from a bare region; remove the fill and the card disappears.

**Agenda row** — A flex row containing a Playfair `{typography.agenda-numeral}` in `{colors.accent}` at left, then a label at right, with 21.6px padding and a 1px taupe bottom border. Stacked rows form an agenda list.

**Timeline** — A 1px taupe top-border across a flex row of evenly-distributed timeline items; each item carries a small Inter `year` label in taupe, a Playfair `{typography.timeline-headline}`, and an Inter body paragraph. The hairline is the only timeline structure — there are no nodes, no markers, no dots.

**Stats cluster** — A flex row of stat items separated by `gap-md`, framed by a 1px taupe top border, holding inline `{typography.stat-figure}` Playfair numerals with small uppercase Inter labels in taupe below.

**Quote mark** — A 5rem Playfair quote glyph at 50% opacity in taupe, positioned above a Playfair `{typography.h2}` headline + a small uppercase taupe attribution below.

**Chart** — Chart.js bar or line chart with ink-black primary series and dashed taupe comparison series. Grid lines in `{colors.bg-secondary}`. Axis ticks in `{colors.accent}`. Always rendered without fill on the primary series (or with a 5% ink-tinted fill on line charts).

## Do's and Don'ts

### Do
- Use a single 1px line in `{colors.line}` for every structural separator — agenda rule, timeline connector, card border, stats top, team-photo ring. The 1px hairline is Cartesian's identity.
- Set every Playfair headline, stat, quote mark, and card title at weight 400. Don't reach for bold; the thin-stroke didone aesthetic depends on it.
- Render every headline in `{colors.text-primary}` (ink). Playfair never appears in taupe or color.
- Render every label, attribution, agenda numeral, and micro-text in `{colors.accent}` (taupe) with uppercase + 2–3px letter-spacing.
- Layer decorative geometric rings (solid + dashed) at 20–50% opacity behind content for atmosphere. One or two geo elements per slide; never more.
- Pair Playfair Display (serif headlines) with Inter (sans body). The two-face pairing is fixed.
- Use actual media in the stone frame; keep crossed-diagonal geometry purely abstract and wordless.
- Let slides breathe — sparse layouts with generous negative space are the correct density.
- Use `{colors.bg-secondary}` as the fill for image placeholders and team-photo frames — a subtle stone, not white, not gray.
- Use a single `horizontal-accent` (384px × 1px ink line) sparingly as a strong terminal rule on cover or closing compositions.

### Don't
- Don't introduce a populist accent color. No red, no orange, no blue, no green. The palette is stone-on-stone with ink for headlines.
- Don't render Playfair headlines in `{colors.accent}` (taupe). Headlines are ink; taupe is reserved for small text.
- Don't bold any Playfair element. Weight 400 is the standing rule; bold breaks the didone aesthetic.
- Don't add shadows, elevated cards, or gradient fills. Cartesian is flat; depth comes from geometry and type, not z-axis.
- Don't use rounded corners on cards or rectangles. The only round shapes are true circles (radius 50%).
- Don't use thick borders (2px+). Every structural border is 1px.
- Don't crowd the slide. Sparse breathing layouts read as elegant; packed layouts read as broken.
- Don't pair Playfair with a different sans companion. The Inter pairing is fixed.
- Don't render labels or micro-text in sentence case. Small Inter text is always uppercase + 2–3px tracking.
- Don't add more than two geo decorations per slide — restraint is the rule; over-decoration reads as cluttered.

## Stage Adaptation and Capture

Resolve the layout at 1920×1080, then let the shared runtime scale the entire stage. Narrow screens retain the composition, with letterboxing as necessary; there are no recipe-specific mobile stacks, font clamps, swipe handlers or slide transitions. An alternate reading composition is an authored artifact choice, not an automatic breakpoint.

Use the shared renderer and exporter. Inspect complete slides, long labels, dense tables, and navigation with the actual content and fonts. Meaningful data must be at its final value at capture time; no count-up or zero-to-value entrance animation may substitute for the data. Decorative motion, when retained, needs a deterministic static capture and reduced-motion treatment. Controls are real shared-runtime controls only; static callouts must not claim interactivity.

## CJK & International Content

### Role-Preserving Pairing

| Role | Candidate Chinese face | Requested weight |
|---|---|---|
| Display | Noto Serif SC | 400 |
| Body | Noto Sans SC | 400 |
| Labels | Noto Sans SC | 500 |

These are design candidates, not claims of installed assets, glyph coverage, equivalent metrics or available font styles. Select the correct language/region family for Simplified Chinese, Traditional Chinese, Japanese or Korean, and verify the actual source strings and required punctuation against the supplied font files. Localize licensed assets for reproducible output under the shared rendering contract; do not assume a successful remote CSS request means the font rendered.

### Mixed-Script Implementation

Use role-specific stacks and explicit language spans when a weight or style differs by script. A fallback family chooses glyphs, not a different weight. Keep Latin families in their original roles where desired, and set `font-synthesis: none` on the affected runs to expose missing bold or italic instead of silently fabricating it. Check full names, numbers, symbols and mixed-script baselines, not just a sample Hanzi. Retain supplied punctuation, capitalization and spacing; any copy edit that changes the lock returns to intake.

Start Chinese body leading around 1.7 and display leading around 1.1–1.2, then inspect the actual strings at stage size. Reset wide Latin tracking on CJK runs and apply case styling only where the source language and locked spelling permit it. Widen or recompose labels before making them smaller. Preserve all source qualifications when a line wraps; splitting into additional slides is preferable to squeezing the type.

### System-Specific Adaptation

A quiet 400 serif maintains Playfair Display's structural role; a clean 400/500 sans maintains Inter body and labels. A 700 Chinese headline is a deliberate heavier choice, not an equivalent of Latin 400, and a fallback stack alone does not change weight by script. Preserve the stone plane, long hairlines, circular compass geometry and tracing-paper cards. Use explicit language spans if the chosen Chinese face needs different optical sizing or weight. Keep full approved emphasis phrases in body/ink color; do not isolate an arbitrary Hanzi in faint taupe to create meaning. Portrait initials require actual people. Chinese line lengths may need wider columns or another slide rather than a denser reading slab.

### Asset and Emphasis Limits

Inspect requested weights and styles in the actual font asset before using them. Optical size, oblique style and weight are different properties; one does not supply another. When a face lacks a needed treatment, select a verified asset or an approved alternative visual treatment while preserving the same audience-visible emphasis. Test final composed text against its background; palette tokens and font family names are not evidence of legibility.

## Iteration Guide

1. Every new structural separator uses a 1px solid `{colors.line}` border. No exceptions.
2. Every new headline uses Playfair Display at weight 400 in `{colors.text-primary}`. Don't bold; don't color.
3. Every new small text element (label, attribution, micro) uses Inter uppercase with 2–3px letter-spacing in `{colors.accent}`.
4. Every new body paragraph uses Inter weight 400 in `{colors.text-secondary}`, with line-height 1.6.
5. Every new card uses 1px taupe border + semi-transparent white overlay fill. No shadow, no radius.
6. New circular elements (icons, photos, decorative rings) use border-radius 50% with 1px taupe ring.
7. New geometric decorations stay subtle: 1 or 2 per slide, at 20–50% opacity, behind content (z-index 0, pointer-events none).
8. New chart series follow the ink-primary / dashed-taupe-comparison convention. Don't introduce colored chart series.
9. New layouts respect the breathing-room density rule — sparse beats dense in Cartesian.
10. The `horizontal-accent` 384px ink line is the system's only "ink rule" — use it sparingly as a terminal accent, never as a routine divider.

## Authoring Limits

- Chart appearance is owned here; a library is not prescribed. Use ink for the primary series, a distinguishable comparison line and directly readable axis/source labels.
- Compass geometry and the 70–80% inner ring need per-composition sizing; keep the thin circles behind text rather than using them as clipping masks for content.
- A circular portrait must show supplied media with an intentional crop. Initials are a possible text identity treatment for an actual named person, not a placeholder portrait.
- Use Inter for body. Italic requires a supplied Inter italic asset; available Playfair italic does not automatically authorize changing body family. A verified semibold can express already-approved emphasis.
- Tracing-paper cards may have a 30%-white fill without elevation. True circular frames coexist with the rule against softly rounded rectangular cards.
- Hairlines, muted taupe and crossed-line geometry do not prove text contrast. Actual axis, source and micro-copy should use the readable body/ink tones.
- The vertical/horizontal accent offsets (154px from left, 162px from bottom) are stage choices. Tune wordless geometry to the actual content; shared runtime owns navigation.
