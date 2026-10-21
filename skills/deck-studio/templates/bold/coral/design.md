---
version: alpha
name: Coral
description: "A bold magazine-poster system that runs on three surface registers — coral fire, ink black, and warm cream — animated by Bebas Neue display caps and a constant 45° diagonal hatch pattern. Inter handles body copy; Bebas Neue handles every headline, stat, title, and meta-figure at heavy letter-spacing. The cultural reference is mid-century travel posters, Saul Bass film titles, and modern editorial sport magazines: solid color planes meeting at hard edges, oversized condensed caps as architectural elements, and a single coral hue used both as accent and as full-slide environment."

colors:
  coral: "#E85D5D"
  coral-dark: "#D44A4A"
  cream: "#F5F0E8"
  cream-dark: "#E8E0D4"
  black: "#1A1A1A"
  gray: "#6B6B6B"
  light-gray: "#B0B0B0"
  white: "#FFFFFF"

color-aliases:
  bg: cream
  ink: black

typography:
  hero-title:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "120px"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: 4px
  jumbo-feature:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "200px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 12px
  display-statement:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "100px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 2px
  section-headline:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "80px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 2px
  column-title:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "72px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 2px
  stat-numeral:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "96px"
    fontWeight: 400
    lineHeight: 1
  card-stat:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "56px"
    fontWeight: 400
    lineHeight: 1
  sidebar-value:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "48px"
    fontWeight: 400
    lineHeight: 1
  card-title:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "36px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: 1px
  bar-title:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "56px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 2px
  meta-figure:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "44px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 2px
  meta-date:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "38px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 2px
  background-numeral:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "200px"
    fontWeight: 400
    lineHeight: 1
    description: "Decorative oversized numeral placed inside a coral region at rgba(0,0,0,0.12) — wallpaper opacity. Sits behind the actual column title at full opacity."
  giant-mark:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "280px"
    fontWeight: 400
    lineHeight: 1
    description: "Oversized quote mark or single character placed inside a coral region at opacity 0.35 — half-decorative, half-content."
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  body-light:
    fontFamily: "Inter, sans-serif"
    fontSize: "36px"
    fontWeight: 300
    lineHeight: 1.5
    description: "Lighter-weight Inter for pull quotes — weight 300 to contrast against the Bebas Neue dominant voice."
  item-text:
    fontFamily: "Inter, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  card-text:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  bar-meta:
    fontFamily: "Inter, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 2px
    textTransform: uppercase
  section-label:
    fontFamily: "Inter, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 4px
    textTransform: uppercase
  item-label:
    fontFamily: "Inter, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 3px
    textTransform: uppercase
  meta-label:
    fontFamily: "Inter, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 3px
    textTransform: uppercase
  sidebar-label:
    fontFamily: "Inter, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 1px
  quote-attribution:
    fontFamily: "Inter, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 3px
    textTransform: uppercase
  quote-role:
    fontFamily: "Inter, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 1px

spacing:
  pad-y: "64.8px"
  pad-x: "100px"
  pad-y-tight: "48.6px"
  pad-col: "60px"
  gap-grid: "32px"
  gap-md: "40px"
  card-pad: "32.4px"
  bar-pad: "40px"

canvas:
  width: 1920px
  height: 1080px

components:
  diagonal-hatch:
    background: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.06) 20px, rgba(0,0,0,0.06) 40px)"
    description: "Signature 45° diagonal hatch pattern in 6%-opacity black. Applied as a pseudo-element overlay on coral regions to provide texture without changing the surface color. Variant: -45° hatch on coral quote-left, with 30/60px stride. Variant: 90° vertical hatch in 10%-opacity black on coral gradient regions, with 60/62px stride. The hatch is a per-region atmospheric treatment, not a slide-level overlay."
  accent-line:
    width: "80px"
    height: "4px"
    background: "{colors.coral}"
    description: "Solid 80×4 coral rectangle used as a sub-headline accent rule. Closing or section-divider variant uses 60×4."
  quote-accent:
    width: "60px"
    height: "4px"
    background: "{colors.coral}"
    description: "60×4 coral rectangle placed above a quote attribution as a terminal accent."
  title-rule:
    width: "100%"
    height: "3px"
    background: "{colors.black}"
    opacity: 0.15
    description: "Full-width 3px ink rule at 15% opacity used as a subtle horizontal divider beneath the hero title on the cover composition."
  card:
    background: "{colors.white}"
    padding: "{spacing.card-pad}"
    borderTop: "5px solid {colors.coral}"
    description: "Column card — white surface with a 5px solid coral top border as the only border on the element. No shadow, no radius."
  sidebar-item:
    background: "{colors.white}"
    padding: "20px 24px"
    borderLeft: "4px solid {colors.coral}"
    description: "Compact data tile — white surface with a 4px solid coral left border. Holds a Bebas value and an Inter label."
  card-icon:
    width: "48px"
    height: "48px"
    background: "{colors.coral}"
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "24px"
    color: "{colors.black}"
    description: "48px coral square containing a genuine source initial or ordinal in readable ink, or an aria-hidden nonsemantic geometric mark. Omit the mark if it adds no useful structure."
  timeline-line:
    height: "4px"
    background: "repeating-linear-gradient(90deg, {colors.black} 0 20px, transparent 20px 30px)"
    description: "A 4px-high dashed timeline painted on a transparent base. Do not put a solid line underneath the gaps. Position nodes from the supplied chronology, with a labeled ordinal layout only when time spacing is not encoded."
  t-point-dot:
    width: "20px"
    height: "20px"
    borderRadius: "50%"
    background: "{colors.coral}"
    border: "4px solid {colors.cream}"
    description: "Timeline node — 20px coral circle with a 4px cream halo, sitting on the timeline-line."
  zigzag-layer:
    description: "SVG zigzag pattern overlay used decoratively on the cover's coral top-section. Renders as a thin black zigzag line at low opacity behind the title."
  pattern-overlay:
    description: "Decorative repeating-pattern overlay applied to feature regions — typically 90° vertical hatch in ink at 10% opacity on coral gradient backgrounds. Separate from the 45° diagonal-hatch which is the system's primary texture."
  bar-fill:
    description: "Horizontal bar fills use solid coral (#E85D5D) as the primary series color, with a darker coral (#D44A4A) for comparison or secondary series."
---

## Stage and content contract

Use the shared [Deck Studio runtime](../../../references/deck-runtime.md) on a fixed **1920×1080** stage, uniformly scaled as one composition. This recipe owns visual layout, not navigation, loading, animation, capture or export. Use the shared runtime as written; do not create an equivalent inline scaler or phone-specific internal reflow.

The role sizes and spacing below are stage coordinates. Check readability at the intended viewing size, not only against overflow. If content does not fit, recompose, split or select another system while preserving the locked meaning. Real labels, identities, quotations, metrics and their qualifications come from supplied content; empty decorative slots do not authorize new words, numbers or controls. Keep case-sensitive names and identifiers intact, even within a display-cap treatment.

## Overview

Coral is a **bold magazine-poster system** built on three surface registers — coral fire, ink black, and warm cream — that meet at hard edges. The defining structural premise is **solid color planes**: a single slide will split into a coral half + a cream half + an ink top-section, with each region a flat solid color holding its own self-contained composition. There are no gradient transitions between regions; the meeting point of two colors is the layout. This is the populist counterpart to a more refined editorial system — closer to a sports magazine cover than a literary catalogue.

The typeface stack is a **two-face hierarchy**. **Bebas Neue** — a tall narrow condensed sans display face — carries every headline, every stat, every column title, every meta figure, every section name. Bebas runs at its single available weight (400) and is treated as architectural — heavy letter-spacing (2–12px), oversized scale (up to 200px on jumbo features), and always set in its native uppercase. **Inter** — a contemporary humanist sans — carries every body paragraph, every label, every micro-text, every attribution. Inter spans weights 300 to 700: 300 for pull-quote bodies, 400 for paragraph body, 600 for meta labels, 700 for section eyebrows. The Bebas/Inter pair creates the system's voice: Bebas declares, Inter explains.

The palette is **three surfaces + ink + neutrals**. The coral `{colors.coral}` is both *the* accent (a 4px left border on a sidebar tile, a 5px top border on a card, a 48px solid icon square) and an entire slide environment (a full coral panel, the cover's top-section, a coral gradient feature region). The cream `{colors.cream}` is the warm canvas — the magazine paper. Ink `{colors.black}` is the strongest surface, used as full-slide background on quote and statement layouts. White appears only as card fills against coral or cream regions. Two grays (`{colors.gray}`, `{colors.light-gray}`) carry body and meta text.

Depth is **flat with hard color edges**. There are no drop shadows, no rounded surfaces, no soft elevations. Hierarchy comes from:
- **Solid color region splits** — coral / ink / cream regions meeting at hard edges.
- **Accent borders** — 4px coral left, 5px coral top, 3px ink top, 4px ink horizontal.
- **45° diagonal hatch** — a signature 6%-opacity black diagonal repeating pattern overlaid on coral regions, providing texture.
- **Oversized decorative typography** — background numerals at 12% opacity, giant quote marks at 35% opacity, sitting behind or beside primary content.

**Density philosophy: medium-high, structured by region.** Coral slides are structured rather than dense — each color region holds a self-contained composition (a single column title with one body block, a single stat tile with one label, a single timeline line with five dots). The aesthetic relies on regions feeling fully populated within their boundary, not on the slide overall being crowded. A correctly composed slide pairs 2–3 substantive regions, each fully expressed. A slide that feels broken is one where a coral region holds only a sparse fragment, or where a cream region attempts to carry too many competing elements. A real section ordinal may be repeated at 12% opacity behind its title. When no real ordinal exists, use the hatch, geometry or intentional negative space; never manufacture a number to fill a region.

**Key Characteristics:**
- Three-surface system: `{colors.coral}` (fire), `{colors.black}` (ink), `{colors.cream}` (paper) — used as solid regions meeting at hard edges.
- Bebas Neue uppercase condensed display for every headline/stat/title; Inter sans for every body/label/attribution.
- 45° diagonal hatch in 6%-opacity black on coral regions as the signature atmospheric texture.
- Coral as both accent (4–5px borders, 48px icon squares, 4-point timeline dots) and environment (full-region surfaces).
- Decorative oversized numerals at 12% opacity behind column titles inside coral regions.
- Oversized quote marks at 35% opacity inside coral regions as half-decorative content.
- No rounded corners on rectangles; timeline nodes are circular.
- Heavy letter-spacing on every Bebas element: 1–4px on most, 12px on the largest feature treatment.
- Hard-edge color splits (vertical, horizontal, or 40/60 ratios) define slide composition.

## Colors

### Three-Surface System
- **Coral** (`{colors.coral}` — #E85D5D): The signature color — a warm orange-red, vivid but not neon. Used both as accent (4px sidebar-item left border, 5px card top border, 48px card-icon fill, 80×4 accent line, 60×4 quote accent, timeline-point dot, chart primary series, section eyebrows, stat-numerals on cream surfaces) and as a full-region surface (cover top-section, two-column left panel, full-width feature region, quote left panel). Defines the system.
- **Coral Dark** (`{colors.coral-dark}` — #D44A4A): A darker coral variant. Used as the start stop in linear-gradient feature regions (135° from coral-dark to coral), and as the chart secondary/comparison series color.
- **Cream** (`{colors.cream}` — #F5F0E8): The warm canvas. Used as default slide background, as the cover's bottom-section, as info-bar surfaces, as body text color on ink-black surfaces, and as the timeline-point dot halo.
- **Cream Dark** (`{colors.cream-dark}` — #E8E0D4): A slightly deeper cream. Available in the palette for subtle region differentiation but sparingly used.
- **Black** (`{colors.black}` — #1A1A1A): Near-black ink. Used as headline color on cream surfaces, as the full-background ink register for quote and certain feature slides, as timeline-line color, as title-rule color, as decorative background-numeral color (at 12% opacity inside coral regions), and as giant-mark color (at 35% opacity inside coral regions).
- **Gray** (`{colors.gray}` — #6B6B6B): Mid neutral. Used for body paragraph text on cream surfaces, for meta labels, for sidebar labels, for card body copy, for quote roles.
- **Light Gray** (`{colors.light-gray}` — #B0B0B0): Pale neutral. Defined in the palette but used sparingly — available for nonsemantic decoration; meaningful tertiary text uses a measured readable gray or ink pairing.
- **White** (`{colors.white}` — #FFFFFF): True white. Used as card fills (sidebar-item, card, column-card), as item-text color on ink surfaces.

### Defaults
- **Default slide surface**: `{colors.cream}`. (Cover and feature slides use mixed-surface compositions; statement, quote, and three-column slides default to cream or ink.)
- **Default headline color on cream surfaces**: `{colors.black}` — Bebas Neue headlines are ink, not coral.
- **Default headline color on coral surfaces**: `{colors.black}` — ink-on-fire. Bebas on coral is always ink, never white.
- **Default headline color on ink surfaces**: `{colors.cream}`.
- **Default body text color on cream surfaces**: `{colors.gray}`.
- **Default body text color on ink surfaces**: `{colors.cream}`.
- **Default body text color on coral surfaces**: `{colors.black}` — ink, not white.
- **Default eyebrow / section-label color**: ink on cream and coral; cream on ink. Coral may accent a sufficiently large label only after checking the actual contrast.
- **Default accent border color**: `{colors.coral}` — 4px left (sidebar tiles), 5px top (cards), 48px solid (icon squares).
- **Default decorative numeral color inside a coral region**: `rgba(0, 0, 0, 0.12)` (ink at 12% opacity).
- **Default giant-mark color inside a coral region**: `rgba(0, 0, 0, 0.35)` (ink at 35% opacity).
- **Default chart primary series color**: `{colors.coral}`.
- **Default chart comparison series color**: `{colors.coral-dark}`.

The three surfaces are intermixed by composition: a slide may be split coral/cream, coral/ink, ink/cream, or held to a single surface. There is no semantic mapping between surfaces; each is chosen for compositional balance and contrast.

## Typography

### Font Family
The system runs on a **two-face hierarchy**: `Bebas Neue` (display, single weight 400) carries every headline, stat numeral, column title, meta figure, bar title, card stat, sidebar value, and decorative numeral; `Inter` (sans, weights 300 / 400 / 600 / 700) carries every body paragraph, label, eyebrow, meta-label, attribution, role, and chart legend. There is no third face.

Bebas Neue is a tall narrow condensed sans display face — its narrow letterforms allow large sizes without overwhelming the slide width, and its single available weight (400) is treated as the system's only weight. Bebas is always set in its native uppercase. The display character of the system comes from heavy letter-spacing (1–4px on standard headlines, 12px on the largest jumbo feature treatment) and oversized scale (up to 200–280px on jumbo / giant-mark moments).

Inter carries the supporting voice with weight contrast: 300 for pull-quote bodies (a lighter register against Bebas's dominance), 400 for body paragraphs, 600 for meta labels, 700 for section eyebrows. Italic and underline are not used.

### Type Scale

| Token | Size | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.giant-mark}` | 280px | Bebas Neue | 400 | Oversized decorative quote mark or feature character inside a coral region |
| `{typography.jumbo-feature}` | 200px | Bebas Neue | 400 | Single dominant word filling a feature region |
| `{typography.background-numeral}` | 200px | Bebas Neue | 400 | Decorative wallpaper numeral inside a coral region at 12% opacity |
| `{typography.hero-title}` | 120px | Bebas Neue | 400 | Largest cover title — 3-line title cap-and-line-broken |
| `{typography.display-statement}` | 100px | Bebas Neue | 400 | Big declarative statement on a cream surface |
| `{typography.stat-numeral}` | 96px | Bebas Neue | 400 | Hero stat figure |
| `{typography.section-headline}` | 80px | Bebas Neue | 400 | Primary section headline |
| `{typography.column-title}` | 72px | Bebas Neue | 400 | Column or panel title inside a region |
| `{typography.card-stat}` | 56px | Bebas Neue | 400 | Per-card stat figure |
| `{typography.bar-title}` | 56px | Bebas Neue | 400 | Info-bar title |
| `{typography.sidebar-value}` | 48px | Bebas Neue | 400 | Sidebar tile value |
| `{typography.card-title}` | 36px | Bebas Neue | 400 | Card or column-card title |
| `{typography.meta-figure}` | 44px | Bebas Neue | 400 | Cover meta value (location, date, brand) |
| `{typography.meta-date}` | 38px | Bebas Neue | 400 | Cover date variant |
| `{typography.body-light}` | 36px | Inter | 300 | Pull-quote body (lighter weight against Bebas dominance) |
| `{typography.body}` | 20px | Inter | 400 | Standard paragraph body |
| `{typography.item-text}` | 18px | Inter | 400 | Item body on ink surfaces |
| `{typography.card-text}` | 16px | Inter | 400 | Card body copy |
| `{typography.body-sm}` | 16px | Inter | 400 | Compact body |
| `{typography.section-label}` | 12px | Inter | 700 | Section eyebrow above a headline, 4px letter-spacing |
| `{typography.item-label}` | 11px | Inter | 700 | Item eyebrow in a list, 3px letter-spacing |
| `{typography.meta-label}` | 11px | Inter | 600 | Cover meta label, 3px letter-spacing |
| `{typography.quote-attribution}` | 14px | Inter | 600 | Author name below a pull quote, 3px letter-spacing |
| `{typography.bar-meta}` | 12px | Inter | 400 | Info-bar meta-text, 2px letter-spacing |
| `{typography.sidebar-label}` | 12px | Inter | 400 | Sidebar tile label, 1px letter-spacing |
| `{typography.quote-role}` | 12px | Inter | 400 | Author role below quote attribution, 1px letter-spacing |

### Defaults
- **Default size for the primary section headline**: `{typography.section-headline}` (80px).
- **Default size for a cover/hero title**: `{typography.hero-title}` (120px).
- **Default size for a feature dominant word**: `{typography.jumbo-feature}` (200px) with 12px letter-spacing.
- **Default size for paragraph body**: `{typography.body}` (20px).
- **Default size for any uppercase eyebrow / label**: `{typography.section-label}` (12px) at weight 700 with 4px letter-spacing; or `{typography.item-label}` (11px) at weight 700 with 3px letter-spacing for in-list contexts.
- **Default weight for any Bebas Neue element**: 400 (the only available weight).
- **Default weight for body**: 400; for pull quotes, 300.
- **Default weight for labels**: 600 or 700.
- **Default size for a hero stat figure**: `{typography.stat-numeral}` (96px).
- **Default size for an in-card stat figure**: `{typography.card-stat}` (56px).

When unsure, reach for `{typography.section-headline}` for the slide's primary text moment.

### Signature Treatments
These treatments are **non-optional whenever the corresponding element type is used**:

- **Bebas Neue display uses its uppercase voice.** Preserve source casing for acronyms, names and identifiers; use a supporting face or another composition when the display font cannot faithfully represent the string.
- **Every Bebas Neue element carries letter-spacing of at least 1px.** Standard headlines at 2px, hero-title at 4px, jumbo-feature at 12px. Untracked Bebas reads as untreated.
- **Inter chrome normally uses uppercase with 1–4px letter-spacing.** Section labels at 4px, item labels at 3px, bar-meta at 2px, sidebar-labels at 1px. Preserve any case-sensitive source string; body and role descriptions remain sentence case.
- **Every Bebas headline is rendered in `{colors.black}`, `{colors.cream}`, or `{colors.coral}`** based on surface contrast — never gray. Color choice: ink on cream/coral, cream on ink, coral on cream when emphasis is needed.
- **Every section eyebrow is rendered in `{colors.coral}`** when sitting on cream or ink, or in `{colors.black}` when sitting on coral. Coral-on-coral does not exist.
- **Every decorative oversized numeral inside a coral region is rendered at `rgba(0, 0, 0, 0.12)`** — the wallpaper-numeral signature. Sits behind primary content at full opacity.
- **Every giant decorative mark (quote, single character) inside a coral region is rendered at `rgba(0, 0, 0, 0.35)`** — half-decorative, half-content.
- **Pull-quote bodies use Inter weight 300, not Bebas.** This is the system's primary "voice break" — when content needs to feel personal rather than declarative, Inter Light takes over.

### Typography Principles
The Bebas-uppercase-tracked + Inter-mixed-weight combination is the system's voice. Switching either face — using a different display sans for headlines, or using Bebas for body — breaks the system entirely. Italic does not appear. Underline does not appear. The only emphasis mechanism is weight (Bebas dominance), case (uppercase always on Bebas + labels), color (coral on cream surfaces), and surface inversion (placing the element in a different region).

Line-height is uniformly tight at the top of the scale: Bebas elements at 0.9–1.0; Inter body at 1.6–1.7. The display compression + open body is what gives the system its magazine-poster rhythm.

## Layout

### Canvas System
Each slide is a fixed 1920×1080 composition using the [shared runtime](../../../references/deck-runtime.md). There is no universal content chrome bar. Each slide composes its own hard-edge coral/ink/cream regions; keep any real title, source label or ordinal within those regions. Shared navigation remains outside this recipe.

### Padding and Gap Scale
| Token | Value | Use |
|---|---|---|
| `{spacing.pad-y}` | 64.8px | Standard vertical slide padding |
| `{spacing.pad-x}` | 100px | Standard horizontal slide padding |
| `{spacing.pad-y-tight}` | 48.6px | Compact vertical padding (cover bottom-section) |
| `{spacing.pad-col}` | 60px | Column padding inside a region |
| `{spacing.gap-grid}` | 32px | Column-grid gap |
| `{spacing.gap-md}` | 40px | Chart container internal gap |
| `{spacing.card-pad}` | 32.4px | Card internal padding |
| `{spacing.bar-pad}` | 40px | Info-bar internal padding |

### Region Composition
Coral's primary layout move is **multi-surface composition**. Slides split into regions of solid color, with the boundary between regions defining the layout. Standard splits include:
- `grid-template-rows: 32% 68%` — top accent strip + main body (cover composition).
- `grid-template-rows: 1fr auto` — large feature region + bottom info-bar.
- `grid-template-columns: 1fr 1fr` — equal vertical split (often coral left + ink right).
- `grid-template-columns: 40% 60%` — narrow accent column + wider content column (quote layout).
- Single-surface slides — cream or ink as the whole canvas (statement, three-column, timeline layouts).

The boundary between regions is always a **hard color edge** — no soft transitions, no gradients across the boundary, no rounded corners at the junction. The meeting of two solid colors is the layout structure.

## Depth and Elevation

### Flat With Hard Color Edges
Coral has no drop shadows, no soft elevations, no rounded surfaces. Every element sits on a single plane.

Depth signals are entirely structural:
- **Hard color region boundaries** — the primary structural signal.
- **Accent borders** — 5px coral top on cards, 4px coral left on sidebar tiles, 4px ink horizontal timeline-line, 3px ink at 15% opacity title-rule.
- **45° diagonal hatch** — 6%-opacity black diagonal repeating-linear-gradient overlay on coral regions creates texture without depth.
- **Decorative wallpaper typography** — oversized numerals at 12% opacity and giant marks at 35% opacity sit behind primary content as wallpaper, creating a layered effect without z-index trickery.

Introducing a box-shadow, an elevated card, or a soft gradient breaks the populist-poster aesthetic that defines the system.

### Atmospheric Hatch Variants
The 45° diagonal hatch is the system's primary atmospheric treatment, but several stride/angle variants appear:
- **45° at 20/40px stride** in 6%-opacity black — the standard coral region overlay.
- **-45° at 30/60px stride** in 6%-opacity black — coral quote-left panel variant.
- **90° vertical at 60/62px stride** in 10%-opacity black — coral gradient feature-region overlay.

All hatches are subtle (6–10% opacity black). They provide texture without competing with content.

## Shapes and Treatment

### Border Radius
| Value | Use |
|---|---|
| 50% (circle) | `t-point-dot` (20px timeline node) |
| 0 | Everything else: every region, every card, every sidebar tile, every icon square, every chart, every accent line, every accent border |

The system uses **only two radius values**: 50% (true circle) or 0 (sharp rectangle). Soft-rounded corners do not exist. Cards, icon squares, info-bars, and feature regions are all strict rectangles.

### Border Weights
- **5px solid `{colors.coral}` (top)** — used on card top borders (column-card pattern).
- **4px solid `{colors.coral}` (left)** — used on sidebar-item left borders.
- **4px solid `{colors.black}` (horizontal)** — used on timeline-line.
- **4px solid `{colors.cream}` (ring)** — used as the halo around 20px coral timeline-point dots.
- **3px solid `{colors.black}` at 15% opacity** — used on title-rule beneath the cover hero title.

All borders are either coral, black, cream, or translucent. There is no border-radius on bordered rectangles.

### Decorative Element Types

**45° diagonal hatch** — A `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.06) 20px, rgba(0,0,0,0.06) 40px)` applied as a `::before` pseudo-element overlay on coral regions. The signature atmospheric texture. Variants: -45°, 90° vertical, different stride widths.

**Background numeral** — An oversized Bebas Neue numeral (200px) at `rgba(0, 0, 0, 0.12)` placed inside a coral region. Sits behind the region's primary column-title at full opacity, creating a layered "ordinal wallpaper" effect.

**Giant mark** — An oversized Bebas Neue character (280px) at `rgba(0, 0, 0, 0.35)` placed inside a coral region. Used as a half-decorative half-content element, typically a quotation mark on the coral left panel of a quote layout.

**Card (column-card)** — A white-fill rectangle with a 5px coral top border as its only border. May contain a source-grounded 48px mark, a Bebas card-title and an Inter body. A bottom stat is optional and only for supplied data with units, time basis and qualifications. The 5px top border is the only chrome — no other border, no shadow, no radius.

**Sidebar item** — A white-fill rectangle with a 4px coral left border as its only border. Contains a Bebas sidebar-value and an Inter sidebar-label. The 4px left border is the only chrome.

**Icon square** — A 48px sharp coral square with a genuine source initial or ordinal in ink, or a nonsemantic geometric mark. Never invent a glyph label. Omit it when the card needs no mark.

**Info bar** — A flex row spanning a region's full width, holding a Bebas bar-title left and an uppercase Inter bar-meta right. Cream background; used as a footer band beneath a feature region.

**Timeline** — A 4px-high repeating gradient, 20px ink and 10px transparent, on a transparent base. Nodes are 20px coral circles with 4px cream halos. Place them according to actual time values when spacing encodes time; equal spacing is for a labeled ordered sequence, not a false time scale.

**Accent line** — An 80×4 solid coral rectangle used as a sub-headline accent rule, or 60×4 for closing/quote contexts. Always coral, always solid, no radius.

**Title rule** — A full-width 3px solid ink line at 15% opacity, used as a subtle horizontal divider beneath the cover hero title.

**Zigzag layer** — An SVG zigzag pattern rendered as a thin ink line at low opacity, overlaid decoratively on the cover's coral top-section.

**Pattern overlay** — A separate repeating-pattern overlay (typically 90° vertical hatch in 10%-opacity ink) applied to coral gradient feature regions. Distinct from the standard 45° diagonal hatch.

## Do's and Don'ts

### Do
- Compose slides as multi-surface region splits — coral, ink, and cream meeting at hard color edges. The region boundary is the layout structure.
- Set every Bebas Neue element in its native uppercase with at least 1px letter-spacing — 2px for standard headlines, 4px for hero titles, 12px for jumbo feature treatments.
- Use Inter 700 with tracked Latin labels and a readable surface pairing; keep the coral accent in a border or larger type when small coral text lacks contrast.
- Apply the 45° diagonal hatch (6% opacity black, 20/40px stride) as a `::before` overlay on coral regions for atmospheric texture.
- Use the 5px coral top border on cards and the 4px coral left border on sidebar tiles as the only chrome on those elements — no other border, no shadow, no radius.
- Repeat a genuine section ordinal in Bebas at 12% opacity when useful; otherwise use hatch or negative space.
- Use Inter weight 300 (light) for pull-quote bodies on ink-surface quote layouts — the lighter weight contrasts against Bebas dominance.
- Render Bebas headlines on coral surfaces in `{colors.black}` (ink-on-fire). White headlines on coral do not exist in this system.
- Use the coral chart series + coral-dark comparison series convention for any chart data.
- Use the 48px sharp coral mark square only with a real source mark or nonsemantic geometry; data values and card labels remain content-grounded.

### Don't
- Don't force uppercase onto case-sensitive source strings. Preserve the display-cap voice where it retains the intended meaning.
- Don't render Bebas without letter-spacing. Untracked Bebas reads as untreated, even at large sizes.
- Don't introduce a fourth surface color. The three surfaces (coral / ink / cream) are the system — adding a yellow or blue region breaks the magazine-poster identity.
- Don't render headlines in `{colors.gray}`. Headlines are ink, cream, or coral; gray is reserved for body and meta text only.
- Don't add drop shadows, elevated cards, or rounded surfaces. The system is flat — depth comes from color region splits and accent borders.
- Don't round any rectangular element. Cards, sidebar tiles, info bars, icon squares, accent lines — all sharp rectangles.
- Don't pair Bebas with a different sans body face. The Bebas + Inter pairing is fixed.
- Don't lose the tracked Inter chrome hierarchy; preserve source casing where necessary.
- Don't soften region boundaries with gradients. A rare 135° coral-dark → coral gradient may live entirely within a feature region; its edge stays hard.
- Don't add facts or labels to fill a sparse region. Rebalance the split, hatch or negative space instead.

## Stage adaptation and delivery

All internal geometry stays on the 1920×1080 stage. The shared runtime scales the entire slide uniformly, including type, borders and ornaments; smaller screens may letterbox and do not rearrange columns. Test the real title, densest content, navigation and legibility at the intended viewing sizes. Capture, PDF, reduced motion and audience controls follow the [shared runtime contract](../../../references/deck-runtime.md) and Deck Studio's production workflow. This recipe defines no alternate print or presentation path.

## CJK & International Content

### Role map and visual choice

| Role | Latin face | CJK adaptation candidate |
|---|---|---|
| Display / figures | Bebas Neue 400 | A locally provisioned Noto Sans CJK face at a real heavy weight, or ZCOOL XiaoWei 400 as a deliberately more literary alternative |
| Body / quote | Inter 400 / 300 | Noto Sans CJK 400; use spacing and scale for the lighter quote register rather than synthesizing weight 300 |
| Labels / attribution | Inter 600 / 700 | A real 600 / 700 sans face when available, otherwise choose and document a supported weight |

### Composition and mixed-script treatment

Coral's narrow Latin capitals do not have a metric-equivalent Han face. Heavy CJK sans preserves the poster mass but consumes different width; XiaoWei shifts the voice toward a literary display. Select between those treatments by inspecting the actual title, not by assuming either is a condensed Bebas substitute. Preserve the 32/68, equal-column and 40/60 region choices, hard edges, 5px top borders and hatch angles. On a Han-led title begin with zero tracking and leading around 1.1–1.25, then measure actual glyph bounds. Keep 1–12px tracking on Latin display spans only. For CJK body start around 1.7–1.8 leading and check the longest cream, coral and ink text blocks. A true sequence ordinal can remain in Bebas as wallpaper; a missing ordinal becomes hatch or negative space, never an invented number.

### Font provision and script handling

These are candidates, not bundled assets or guaranteed substitutes. Before rendering, provision the exact local font files, weights and styles actually used; record the selected faces and verify the deck's actual glyph inventory, including rare names, punctuation, numerals and locale-specific forms. Do not claim a network font URL, a fallback family name or a browser's synthetic weight proves the intended face loaded. Set `font-synthesis: none`; use explicit script/role classes when weight, style or family differs. A single fallback stack is sufficient only when the same requested face properties are genuinely supported for both scripts.

Keep punctuation, casing, names, metrics and the locked words intact. Apply locale-aware line-breaking and spacing through layout; do not automatically strip terminal punctuation, insert words, translate labels or normalize identifiers. Keep punctuation with the phrase it belongs to and numbers with units. Han tracking starts at zero; Latin tracking remains role-specific. Verify representative full-width punctuation and mixed Latin/Han lines at actual stage size. Do not change claims or numbers merely for fit. If a semantic revision is needed, reopen that part of the semantic source within the mandate and carry the change through the artifact; it is not a visual-only or localization adjustment. Ask only before changing explicitly user-locked meaning or exceeding authority; keep that discussion outside the slide frame.

### System-specific checks

Check long mixed titles for region-boundary collisions, rare names for fallback glyphs, and small tracked Latin eyebrows beside untracked Han labels. A two-line Chinese title is not assumed to occupy the same area as three English lines. Recompose the region or split the slide while retaining all locked text.

## Iteration Guide

1. Every new slide is a composition of one to three surface regions (coral, ink, cream) meeting at hard edges. Choose the surface split based on content emphasis.
2. Every new headline uses Bebas Neue uppercase with at least 1–2px letter-spacing. Don't sentence-case; don't untracked.
3. New section eyebrows use Inter 700 and tracked Latin caps, with ink on cream/coral or cream on ink; check any coral-text variant.
4. Every new card uses the 5px coral top border + white fill + no shadow + no radius pattern.
5. Every new sidebar tile uses the 4px coral left border + white fill + no radius pattern.
6. Every new coral region carries a 45° diagonal hatch overlay at 6% opacity for texture.
7. Underweight coral regions can repeat a genuine ordinal at 12% opacity or use hatch and geometry. Do not invent a number.
8. New chart series use coral + coral-dark; don't introduce additional series colors.
9. New quote layouts pair a coral left panel (with a giant mark at 35% opacity) with an ink or cream right panel (carrying the quote body in Inter weight 300).
10. The system has three surfaces and one accent (coral). Don't introduce a fourth surface color or a second accent.

## Production watchpoints

Hatch texture must remain behind text; verify the 20/40px, 30/60px and 60/62px strides at rendered scale. A dashed timeline needs actual transparent gaps, not a transparent overlay on a solid line. Coral/gray labels and the Inter 300 quote need measured contrast and readable size. Localize any chosen chart implementation; data marks, axes, units and comparisons come from supplied data.

This document is a recipe, not evidence that a deck was rendered or accepted. Inspect the actual output, keep validation enabled, and record rendered/visual/PDF acceptance through the shared Deck Studio workflow.
