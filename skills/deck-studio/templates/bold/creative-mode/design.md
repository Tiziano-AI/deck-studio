---
version: alpha
name: Creative Mode
description: A neo-brutalist editorial presentation system built for 1920x1080 slides. The deck anchors on a warm cream canvas with heavy 4px ink borders, hard offset drop-shadows, and a bold four-color accent palette (forest green, hot pink, burnt orange, sunshine yellow). Display headlines run Archivo Black in pure uppercase — aggressive, loud, zero letter-spacing softness. Monospace labels in JetBrains Mono echo a typesetting rule-sheet. Body copy sits in Space Grotesk. Every slide uses flat color-blocking with no gradients, no rounded cards, and no subtlety. The aesthetic is part Bauhaus grid, part punk zine, part Swiss editorial.

colors:
  cream: "#EFE9D9"
  cream-2: "#E4DCC4"
  ink: "#0F0F0F"
  ink-2: "#2A2A2A"
  green: "#1F8A4C"
  green-dark: "#136636"
  pink: "#F06CA8"
  pink-dark: "#D14E8B"
  orange: "#E85A1F"
  yellow: "#F5C518"

typography:
  display-jumbo:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 220px
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: -0.01em
    textTransform: uppercase
  display-hero:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 160px
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: -0.01em
    textTransform: uppercase
  display-xl:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 140px
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: -0.01em
    textTransform: uppercase
  display-lg:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 100px
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: -0.01em
    textTransform: uppercase
  display-md:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 96px
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: -0.01em
    textTransform: uppercase
  display-sm:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 84px
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: -0.01em
    textTransform: uppercase
  display-xs:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 72px
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: -0.01em
    textTransform: uppercase
  stat-num:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 96px
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: 0
  step-num:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 140px
    fontWeight: 400
    lineHeight: 0.85
    letterSpacing: 0
  step-title:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 34px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: 0
    textTransform: uppercase
  stamp-num:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 64px
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: 0
  marker-label:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 46px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: 0
    textTransform: uppercase
  badge-label:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: 0
    textTransform: uppercase
  table-head:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: 0
    textTransform: uppercase
  table-label:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: 0
    textTransform: uppercase
  body-lg:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0
  mono-label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: 0.06em
    textTransform: uppercase
  mono-kicker:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: 0.14em
    textTransform: uppercase
  mono-tag:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: 0.1em
    textTransform: uppercase
  mono-chart:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: 0.08em
    textTransform: uppercase

spacing:
  slide-gutter: 96px
  chrome-gutter: 64px
  grid-gap: 28px
  cell-pad: 32px
  step-pad: 28px
  topbar-top: 48px
  meta-bottom: 40px
  table-cell-pad: 18px 26px

canvas:
  width: 1920px
  height: 1080px

components:
  slide-chrome:
    topbar:
      fontFamily: "JetBrains Mono, monospace"
      fontSize: 24px
      letterSpacing: 0.08em
      textTransform: uppercase
      position: absolute
      left: 64px
      right: 64px
      top: 48px
    topbar-pill:
      border: "2px solid {colors.ink}"
      padding: 6px 14px
      borderRadius: 999px
    slide-meta:
      fontFamily: "JetBrains Mono, monospace"
      fontSize: 24px
      letterSpacing: 0.06em
      textTransform: uppercase
      position: absolute
      left: 64px
      right: 64px
      bottom: 40px
    slide-meta-dot:
      width: 10px
      height: 10px
      background: "{colors.ink}"
      borderRadius: 50%
  stat-cell:
    border: "4px solid {colors.ink}"
    padding: 28px 32px
  stat-cell-green:
    background: "{colors.green}"
    color: "{colors.ink}"
  stat-cell-pink:
    background: "{colors.pink}"
    color: "{colors.ink}"
  stat-cell-cream:
    background: "{colors.cream}"
    color: "{colors.ink}"
  stat-cell-orange:
    background: "{colors.orange}"
    color: "{colors.ink}"
  step-card:
    border: "4px solid {colors.ink}"
    padding: 28px
    height: 420px
  step-card-cream:
    background: "{colors.cream}"
    color: "{colors.ink}"
  step-card-pink:
    background: "{colors.pink}"
    color: "{colors.ink}"
  step-card-yellow:
    background: "{colors.yellow}"
    color: "{colors.ink}"
  step-card-green:
    background: "{colors.green}"
    color: "{colors.ink}"
  step-arrow:
    borderTop: "18px solid transparent"
    borderBottom: "18px solid transparent"
    borderLeft: "24px solid {colors.ink}"
  table:
    border: "4px solid {colors.ink}"
    background: "{colors.cream-2}"
    rowBorder: "3px solid {colors.ink}"
    colBorder: "3px solid {colors.ink}"
  table-head-row:
    background: "{colors.ink}"
    color: "{colors.cream}"
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 28px
    borderColor: "{colors.cream}"
  table-col-pink:
    background: "{colors.pink}"
    color: "{colors.ink}"
  table-col-green:
    background: "{colors.green}"
    color: "{colors.ink}"
  table-col-orange:
    background: "{colors.orange}"
    color: "{colors.ink}"
  marker-block:
    background: "{colors.pink}"
    border: "4px solid {colors.ink}"
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 46px
    hardShadow: "24px 24px 0 {colors.orange}, 24px 24px 0 4px {colors.ink}"
  iso-panel:
    background: "{colors.green}"
    border: "4px solid {colors.ink}"
  stacked-block:
    border: "4px solid {colors.ink}"
    hardShadow: "18px 18px 0 {colors.ink}"
  badge-rotated:
    background: "{colors.yellow}"
    border: "4px solid {colors.ink}"
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 28px
    textTransform: uppercase
    transform: rotate(-4deg)
  stamp:
    background: "{colors.pink}"
    border: "4px solid {colors.cream}"
    width: 340px
    height: 340px
    transform: rotate(-6deg)
  stamp-inner:
    border: "4px solid {colors.cream}"
    borderRadius: 50%
  kicker-block:
    background: "{colors.ink}"
    color: "{colors.cream}"
    fontFamily: "JetBrains Mono, monospace"
    fontSize: 24px
    letterSpacing: 0.14em
    textTransform: uppercase
    padding: 8px 16px
  bar-chart-bar:
    border: "3px solid {colors.ink}"
  bar-chart-axis:
    borderRight: "3px solid {colors.ink}"
    borderBottom: "3px solid {colors.ink}"
  decorative-circle:
    background: "{colors.yellow}"
    border: "4px solid {colors.ink}"
    borderRadius: 50%
  closing-slide:
    background: "{colors.green}"
    color: "{colors.cream}"
---

## Stage and content contract

Use the shared [Deck Studio runtime](../../../references/deck-runtime.md) on a fixed **1920×1080** stage, uniformly scaled as one composition. This recipe owns visual layout, not navigation, loading, animation, capture or export. Use the shared runtime as written; do not create an equivalent inline scaler or phone-specific internal reflow.

The role sizes and spacing below are stage coordinates. Check readability at the intended viewing size, not only against overflow. If content does not fit, recompose, split or select another system while preserving the locked meaning. Real labels, identities, quotations, metrics and their qualifications come from supplied content; empty decorative slots do not authorize new words, numbers or controls. Keep case-sensitive names and identifiers intact, even within a display-cap treatment.

## Overview

Creative Mode is a **neo-brutalist editorial slide system** for 1920x1080 presentations. The foundational aesthetic choice is restraint of technique paired with aggression of expression: no rounded cards, no gradients, no shadows that suggest light sources — only flat color-blocking and hard offset drop-shadows (the "Risograph" or "screen-print" kind where the shadow is a solid same-color offset).

The canvas is warm cream (`{colors.cream}` — #EFE9D9) with near-black ink (`{colors.ink}` — #0F0F0F) for borders, text, and rules. Four accent colors fire at full saturation: forest green, hot pink, burnt orange, and sunshine yellow. These never blend — they collide on the slide and the collision is the design.

Headlines run **Archivo Black** (weight 400 due to the display face being intrinsically heavy) in strict uppercase with tight line-height (0.92). Font sizes are extreme: 220px for closing slides, 160px for titles. **JetBrains Mono** carries all metadata, labels, topbar text, and axis labels — reinforcing a "designed artifact" or "technical manual" register. **Space Grotesk** handles all body paragraphs.

The content frame reserves a JetBrains Mono topbar at 48px (real section/title left, optional genuine tag right) and a footer at 40px (real label and actual page ordinal). Empty slots collapse; do not invent a label or badge to complete the frame. Content uses 96px side gutters.

**Key Characteristics:**
- Cream canvas (`{colors.cream}` — #EFE9D9) as the universal background; green (`{colors.green}` — #1F8A4C) used for the closing slide only.
- 4px solid ink borders on every structural element — cards, panels, table cells, chart axes.
- Hard offset box-shadows in place of blurred drops: `24px 24px 0 color, 24px 24px 0 4px ink` on featured blocks.
- Archivo Black display type in uppercase with 0.92 line-height for extreme tightness.
- Four accent colors used as flat fills; each slide uses two or three of the four, never all simultaneously.
- Topbar pill badge (JetBrains Mono, 2px ink border, 999px radius), decorative circles and the stamp ring are the rounded exceptions to otherwise square geometry.

## Colors

### Canvas and Ink
- **Cream** (`{colors.cream}` — #EFE9D9): The universal slide background. Warm, not white. Distinguishes the deck from sterile white-background slides.
- **Cream 2** (`{colors.cream-2}` — #E4DCC4): One step darker cream. Used exclusively as the comparison table's background fill, creating a subtle recessed surface inside the ink border.
- **Ink** (`{colors.ink}` — #0F0F0F): Near-black used for all borders, body text, rules, topbar chrome, and the closing stamp border. Not pure #000000 — slightly softened.
- **Ink 2** (`{colors.ink-2}` — #2A2A2A): Softer near-black for secondary body text, descriptions inside stat cells, chart footnotes.

### Accent Colors
- **Green** (`{colors.green}` — #1F8A4C): Forest green. The dominant accent. Works on stat cells, diagram panels, process steps, and as a full-slide background for maximum visual impact.
- **Green Dark** (`{colors.green-dark}` — #136636): Darker green variant — available for lever/depth decorative effects. Not used as a primary surface fill.
- **Pink** (`{colors.pink}` — #F06CA8): Hot pink. High energy. Works on abstract print-block illustrations, section markers, stat cells, process steps, and stamp elements.
- **Pink Dark** (`{colors.pink-dark}` — #D14E8B): Darker pink for depth on decorative lever elements. Available for shadow-side accents.
- **Orange** (`{colors.orange}` — #E85A1F): Burnt orange. The hard drop-shadow color on featured blocks; also works as a stat cell fill, bar chart color, and table column background.
- **Yellow** (`{colors.yellow}` — #F5C518): Sunshine yellow. Works on decorative circles, process steps, rotated badges, and bar chart bars. A warm punctuation color.


## Typography

### Font Families
The system uses three typefaces, each in a strict register:
- **Archivo Black** — display headlines, step numbers, stat numbers, table labels, all uppercase presentation text. Intrinsically heavy, no additional font-weight needed.
- **JetBrains Mono** — all metadata: topbar labels, meta footer, kicker labels, chart axes, legend rows, layer tags, figure notes. Carries the "technical spec" voice.
- **Space Grotesk** — body copy only: body column text (slide 2), stat cell descriptors, diagram subtext, step descriptions, closing strap.

### Display Scale
The slide canvas is 1920x1080px, so font sizes are far larger than web norms.

| Token | Size | Use |
|---|---|---|
| `{typography.display-jumbo}` | 220px | Jumbo title or closing headline |
| `{typography.display-hero}` | 160px | Primary deck title or hero name |
| `{typography.display-xl}` | 140px | Section-opening display headline |
| `{typography.display-lg}` | 100px | Section headline alongside a panel |
| `{typography.display-md}` | 96px | Mid-weight section headline |
| `{typography.display-sm}` | 84px | Section headline for data-heavy layouts |
| `{typography.display-xs}` | 72px | Section headline for grid layouts |
| `{typography.step-num}` | 140px | Large ordinal numerals in stepped layouts |
| `{typography.stat-num}` | 96px | Large numerals in stat or data cells |
| `{typography.stamp-num}` | 64px | Stamp or seal numeral |
| `{typography.marker-label}` | 46px | Featured marker or callout block label |
| `{typography.step-title}` | 34px | Card or step title |
| `{typography.table-head}` | 28px | Table header or label row text |
| `{typography.badge-label}` | 28px | Rotated badge or annotation label |

### Monospace Scale
All JetBrains Mono text sits at 24px. Letter-spacing varies by use:
- Topbar labels: 0.08em
- Meta footer: 0.06em
- Kicker labels (inverted): 0.14em
- Chart axes: 0.08em (via `{typography.mono-chart}`)
- Legend rows: 0.06em
- Layer tags: 0.1em

### Body Scale
- `{typography.body-lg}` (28px): Body copy for wide column layouts or lede paragraphs.
- `{typography.body-md}` (24px): Body text in stat cells, diagram annotations, step descriptions, footnotes, and strap lines.

### Principles
Archivo Black display starts at 0.92 leading for a compact block. Inspect actual glyph bounds and increase leading when accents or descenders collide; intentional tightness is not permission to overlap meaningful letters. The display-cap treatment preserves source casing for names and identifiers. JetBrains uses 0.06–0.16em tracking; Archivo's display tracking is the specified -0.01em and Space Grotesk stays untracked.

## Layout

### Canvas System
Each slide is a fixed 1920×1080 composition using the [shared runtime](../../../references/deck-runtime.md). Content uses 96px side gutters. Reserve the 64px chrome gutters, topbar at 48px and footer at 40px only for real deck/section labels, supplied identity and actual ordinals; collapse unpopulated slots.

### Gutter System
- **Chrome gutter** (64px left/right): Used by topbar and slide-meta only.
- **Content gutter** (96px left/right): Used by all content — headlines, body, grids.
- Headlines occasionally push right to within 96px of the right edge, or are constrained by `right: 1000px` / `right: 900px` to coexist with a right-panel diagram.


### Content Chrome Frame
```
┌─ topbar @ top:48px, left:64px, right:64px ──────────────────────────────────┐
│  real section/title                                       [real tag, if supplied]            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   CONTENT (96px left gutter, 96px right gutter)                            │
│                                                                              │
├─ slide-meta @ bottom:40px, left:64px, right:64px ───────────────────────────┤
│  real descriptor                                    actual page / total                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Depth and Elevation

The system uses **zero blurred shadows**. Depth is expressed through two techniques:

### Hard Offset Shadow
The signature treatment: a second solid shape offset by a fixed amount in both X and Y. Two values are used:
- **Large offset** (24px 24px): Featured blocks like the marker and poster block — `box-shadow: 24px 24px 0 {colors.orange}, 24px 24px 0 4px {colors.ink}`. The first shadow is the colored offset; the second is the ink border around it.
- **Medium offset** (18px 18px): Stacked blocks in the diagram — `box-shadow: 18px 18px 0 {colors.ink}`. Pure ink shadow only.

### Color-Block Contrast
Depth perception comes from juxtaposing surfaces: cream on cream-2 (table), ink on cream (kicker block), green on cream (diagram panel). No shadow needed when contrast does the work.

### Flat Elements
Topbar, meta footer, chart axis lines, legend swatches: flat, no shadow, no border-radius.

## Shapes and Treatment

### Border Radius
- **0px (square)**: All structural elements — stat cells, step cards, table cells, chart bars, diagram panels, stacked blocks. No rounding.
- **50% (circle)**: Decorative circles within diagram (yellow circ), the topbar pill dot (slide meta separator dot).
- **999px (pill)**: Topbar badge pill only. The one exception to the system's overall squareness, and it reads as a label chip rather than a card.
- **Rotated elements**: The comparison badge rotates -4deg; the closing stamp rotates -6deg. These are the system's only non-orthogonal placements.

### Borders
- **4px solid `{colors.ink}`**: All structural borders — stat cells, step cards, diagram panels, table (outer), poster block, marker block, print block, stamp.
- **3px solid `{colors.ink}`**: All internal structural lines — table rows, table columns, chart axis, bar chart bars.
- **2px solid `{colors.ink}`**: Topbar pill badge.
- **3px dashed `{colors.ink}`**: Dashed horizontal rule separating the process slide's topbar from its flow cards.

### Decorative Elements
- **Print-block sculpture**: Skewed pink rectangles with a dark side face and 24px orange/ink hard shadow. Keep the silhouette abstract: no lever, on/off labels, switch track, pointer cursor or control semantics.
- **Stacked blocks**: Four overlapping absolute-positioned rectangles in pink, yellow, orange, cream-2 with 18px ink hard shadows.
- **Circle overlay**: Yellow circle centered in a green square — shape contrast acting as decorative figure.
- **Stamp geometry**: Pink square at -6° with a cream circular inner border. It may frame a genuine supplied identity or edition, otherwise stays nonsemantic geometry. It must not imply certification or approval without real supporting content.

## Do's and Don'ts

### Do
- Use 4px ink borders on every structural element. Thinner looks soft; thicker looks like a web component.
- Use hard offset shadows in exactly two sizes: 24px for featured hero blocks, 18px for diagram stacked blocks. Don't mix sizes.
- Stay uppercase on all Archivo Black usage. The font in sentence case reads as a different brand.
- Use the four accents in groups of two or three per slide. Every accent on one slide is noise.
- Reserve the green background for a single dominant slide. Its rarity is what gives it impact.
- Use JetBrains Mono for all labels, metadata, indices, figure notes, and axis text. Never use it for body or headlines.
- Start display leading at 0.92 and retain a tight block, but increase it when actual glyphs collide.
- Maintain 96px content gutter and 64px chrome gutter consistently across all slides.

### Don't
- Don't round card corners (except the topbar pill). Rounding signals "friendly SaaS"; sharp corners signal "editorial precision."
- Don't use gradients, drop shadows with blur, or glow effects. All depth must come from hard offset or color contrast.
- Don't alter case-sensitive names or identifiers to enforce the uppercase aesthetic; retain their source form.
- Don't apply letter-spacing to Archivo Black (except at -0.01em which is already encoded). Extra tracking breaks its density.
- Don't introduce a fifth accent color. The four-color palette is the brand constraint.
- Don't use pure white (#ffffff) as a background. Cream is the canvas; white reads as blank.
- Don't use Space Grotesk for labels or metadata. That role belongs to JetBrains Mono.
- Don't add multiple typefaces. The three-family stack is complete.
- Don't center-align body text. All body copy is left-aligned; centered text breaks the grid discipline.
- Don't soften the stamp or badge rotation. The -4deg and -6deg angles are deliberate imperfection signals.

## Stage adaptation and delivery

All internal geometry stays on the 1920×1080 stage. The shared runtime scales the entire slide uniformly, including type, borders and ornaments; smaller screens may letterbox and do not rearrange columns. Test the real title, densest content, navigation and legibility at the intended viewing sizes. Capture, PDF, reduced motion and audience controls follow the [shared runtime contract](../../../references/deck-runtime.md) and Deck Studio's production workflow. This recipe defines no alternate print or presentation path.

## CJK & International Content

### Role map and visual choice

| Role | Latin face | CJK adaptation candidate |
|---|---|---|
| Display / steps / figures | Archivo Black 400 | Noto Sans CJK at an inspected real 900 or other supported heavy weight |
| Body | Space Grotesk 400 | Noto Sans CJK 400 |
| Chrome / axes | JetBrains Mono 400 | A provisioned CJK mono face at a real supported weight, or upright CJK sans in the same label grid |

### Composition and mixed-script treatment

The contrast is heavy display mass versus a quiet body and engineered metadata. A CJK serif can be a consciously selected print variant, but it does not duplicate Archivo's grotesque forms. Keep the 220/160/140px hierarchy, 96px content and 64px chrome gutters, 4px outlines, 24px/18px hard shadows and square cards. Do not inherit Archivo's 400 into the heavy CJK display face: assign the face and its real weight together on the CJK role. The 0.92 Latin leading is a starting treatment, not safe Han leading; begin around 1.05–1.2 for display and 1.4–1.6 for body and inspect. Zero Han tracking; retain JetBrains tracking on Latin metadata. Chinese labels stay Chinese when they are supplied that way; do not replace them with English to make the chrome easier.

### Font provision and script handling

These are candidates, not bundled assets or guaranteed substitutes. Before rendering, provision the exact local font files, weights and styles actually used; record the selected faces and verify the deck's actual glyph inventory, including rare names, punctuation, numerals and locale-specific forms. Do not claim a network font URL, a fallback family name or a browser's synthetic weight proves the intended face loaded. Set `font-synthesis: none`; use explicit script/role classes when weight, style or family differs. A single fallback stack is sufficient only when the same requested face properties are genuinely supported for both scripts.

Keep punctuation, casing, names, metrics and the locked words intact. Apply locale-aware line-breaking and spacing through layout; do not automatically strip terminal punctuation, insert words, translate labels or normalize identifiers. Keep punctuation with the phrase it belongs to and numbers with units. Han tracking starts at zero; Latin tracking remains role-specific. Verify representative full-width punctuation and mixed Latin/Han lines at actual stage size. Do not change claims or numbers merely for fit. If a semantic revision is needed, reopen that part of the semantic source within the mandate and carry the change through the artifact; it is not a visual-only or localization adjustment. Ask only before changing explicitly user-locked meaning or exceeding authority; keep that discussion outside the slide frame.

### System-specific checks

Inspect dense step headings, 24px axes and topbar labels, especially the coexistence of CJK glyphs with Latin numerals. If the label grid needs more room, widen its slot or move the content to another slide. Stamps and rotated badges still require real content and must not imply an approval that was never given.

## Iteration Guide

1. Reserve the topbar at 48px/64px and footer at 40px/64px for real labels and actual ordinals. Collapse unused slots rather than manufacturing chrome.
2. Content begins at 96px from each side edge.
3. When adding a data section (chart, table, grid), pair a display headline above with JetBrains Mono labels inside.
4. Pick two or three accent fills per slide. Never mix all four on a single slide.
5. Hard shadows go on featured single elements only (marker, featured block). Grid cells do not get individual shadows.
6. Step/stat cards may alternate cream with accents. Color must not imply a final success, rank or priority absent from the supplied content; use supplied ordinals and data only.
7. All borders are 4px solid ink. Internal sub-borders within a table or axis are 3px solid ink.
8. Rotated elements (badge, stamp) use single fixed angles (-4deg, -6deg). Do not introduce other angles.
9. Geometric illustrations can use CSS or local SVG. Do not fabricate facts, controls or approval marks; retain any required real media.

## Production watchpoints

Check glyph clearance at the 0.92 display leading and the full extent of 24px/18px hard shadows. A rotated print ornament must not resemble a disabled control or unearned approval. Inspect cream/green and cream/orange combinations at their actual sizes; choose ink or a darker allowed surface when needed. Supplied chart/table data determines rows, labels and colors.

This document is a recipe, not evidence that a deck was rendered or accepted. Inspect the actual output, keep validation enabled, and record rendered/visual/PDF acceptance through the shared Deck Studio workflow.
