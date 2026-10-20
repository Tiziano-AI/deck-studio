---
version: alpha
name: Raw Grid
description: A neobrutalist presentation system where 3px solid black borders ARE the layout. Display type runs in the native system sans-serif stack (Segoe UI / system-ui) at weight 900 in strict uppercase — no web fonts loaded. The palette is white canvas + black structure + two muted pastel accents (blush pink #F2D4CF and sage green #E5EDD6) + a neutral gray. Depth comes from hard offset shadows in solid black at 4px and 6px — never blurred, never colored. The aesthetic borrows from brutalist editorial web design and zine layout: borders meet without gaps, contrast is high but warmed by the pastel accents, and large numerals sit at very low opacity behind content as decorative wallpaper. The effect is sharp, system-native, and unmistakably digital — closer to a Notion-meets-protest-poster than a polished pitch deck.

colors:
  black: "#0A0A0A"
  white: "#FFFFFF"
  pink: "#F2D4CF"
  green: "#E5EDD6"
  gray: "#F5F5F5"
  darkgray: "#333333"

borders:
  primary: "3px solid {colors.black}"

shadows:
  default: "6px 6px 0 {colors.black}"
  small: "4px 4px 0 {colors.black}"

typography:
  display:
    fontFamily: "Segoe UI, system-ui, -apple-system, Helvetica, Arial, sans-serif"
    fontSize: "96px"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: -0.02em
    textTransform: uppercase
  headline:
    fontFamily: "Segoe UI, system-ui, -apple-system, Helvetica, Arial, sans-serif"
    fontSize: "64px"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: -0.01em
    textTransform: uppercase
  title:
    fontFamily: "Segoe UI, system-ui, -apple-system, Helvetica, Arial, sans-serif"
    fontSize: "36px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: 0.01em
    textTransform: uppercase
  subtitle:
    fontFamily: "Segoe UI, system-ui, -apple-system, Helvetica, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0.04em
    textTransform: uppercase
  body:
    fontFamily: "Segoe UI, system-ui, -apple-system, Helvetica, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: 0
  caption:
    fontFamily: "Segoe UI, system-ui, -apple-system, Helvetica, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.08em
    textTransform: uppercase
  number:
    fontFamily: "Segoe UI, system-ui, -apple-system, Helvetica, Arial, sans-serif"
    fontSize: "120px"
    fontWeight: 900
    lineHeight: 1.0
    letterSpacing: -0.04em
  number-md:
    fontFamily: "Segoe UI, system-ui, -apple-system, Helvetica, Arial, sans-serif"
    fontSize: "56px"
    fontWeight: 900
    lineHeight: 1.0
    letterSpacing: -0.02em
  number-lg:
    fontFamily: "Segoe UI, system-ui, -apple-system, Helvetica, Arial, sans-serif"
    fontSize: "80px"
    fontWeight: 900
    lineHeight: 1.0
    letterSpacing: -0.02em
  label-text:
    fontFamily: "Segoe UI, system-ui, -apple-system, Helvetica, Arial, sans-serif"
    fontSize: 11px
    fontWeight: 800
    lineHeight: 1.0
    letterSpacing: 0.08em
    textTransform: uppercase

spacing:
  pad-lg: "64px"
  pad-md: "40px"
  pad-sm: "20px"
  gap-lg: "48px"
  gap-md: "32px"
  gap-sm: "16px"

canvas:
  width: 1920px
  height: 1080px

components:
  label:
    background: "{colors.black}"
    color: "{colors.white}"
    padding: "6px 14px"
    fontSize: 11px
    fontWeight: 800
    letterSpacing: 0.08em
    textTransform: uppercase
  line-h:
    width: 60px
    height: 4px
    background: "{colors.black}"
  line-v:
    width: 4px
    height: 60px
    background: "{colors.black}"
  line-full:
    width: "100%"
    height: 4px
    background: "{colors.black}"
  arrow-prefix:
    content: "→\\00a0"
    description: "Inline right-arrow glyph (U+2192) followed by a non-breaking space. Prepended via ::before on CTAs and interactive list items."
  icon-box:
    width: 48px
    height: 48px
    border: "3px solid {colors.black}"
    background: "{colors.white}"
    fontSize: "18px–20px"
    fontWeight: 900
    description: "Square white box with 3px black border, used for an actual icon, initials or ordinal with a real referent. Never invent a logo or number."
  bar-track:
    width: "100%"
    height: 32px
    border: "3px solid {colors.black}"
    background: "{colors.white}"
  bar-fill-pink:
    background: "{colors.pink}"
  bar-fill-green:
    background: "{colors.green}"
  bar-fill-black:
    background: "{colors.black}"
    color: "{colors.white}"
  stat-box:
    border: "3px solid {colors.black}"
    padding: "28px"
    background: "{colors.white}"
  card:
    padding: "48px"
    border: "3px solid {colors.black}"
    description: "Generic content card. Background may be white, pink, green, or gray."
  decorative-numeral:
    fontWeight: 900
    fontSize: "72px"
    lineHeight: 1.0
    opacity: 0.2–0.35
    description: "Oversized copy of the card's actual step or section number, at low opacity behind content. Omit when no numerical identity exists."
  decorative-quote-mark:
    fontSize: "160px"
    fontWeight: 900
    opacity: 0.15
    description: "Oversized opening quotation mark placed absolutely at the top-left of a quote region at very low opacity."
  connector-node:
    width: 32px
    height: 32px
    border: "3px solid {colors.black}"
    background: "{colors.black}"
    color: "{colors.white}"
    fontSize: 16px
    fontWeight: 900
    description: "Small black square with white arrow glyph, used as a connector between sequential items in a horizontal flow."
  legend-swatch:
    width: 16px
    height: 16px
    border: "3px solid {colors.black}"
  donut-stroke-width: 24
  donut-track-stroke-width: 1.5
  table-cell:
    border: "3px solid {colors.black}"
    padding: "20px"
    fontWeight: 700
  table-header:
    background: "{colors.black}"
    color: "{colors.white}"
    fontWeight: 800
    letterSpacing: 0.06em
    textTransform: uppercase
  table-zebra-row:
    background: "{colors.gray}"
  hover-highlight:
    background: "{colors.green}"
    transition: "background 0.15s"
    description: "Only for a genuinely interactive element, with keyboard focus too; static rows have no pointer or hover affordance."
---

## Composition and runtime

Build this recipe on the fixed **1920×1080** stage using the [shared deck runtime](../../../references/deck-runtime.md). That owner supplies scaling, navigation, active state and delivery behavior; this recipe supplies the slide's visual composition. Slide internals do not reflow on phones.

Choose components from the locked content: a stat needs a supported value, a quote its actual attribution, a label its real referent, and emphasis an established narrative reason. Empty component slots do not authorize new copy. Recompose or split an overfull slide without dropping meaning; change the visual system if it cannot carry the content.

## Overview

Raw Grid is a **neobrutalist presentation system** built on a single structural premise: **3px solid black borders are the layout**. There are no margins between regions, no gaps between cells, no rounded corners, no gradients. When two regions meet, a 3px black line separates them — that line is the entire grid system.

The typeface choice is deliberately non-decorative. The system uses the **native system sans-serif stack** (`Segoe UI, system-ui, -apple-system, Helvetica, Arial, sans-serif`) — no downloaded Latin display face is required. Native fonts remain subject to their own licenses. Display text runs at weight 900 in strict uppercase with tight negative letter-spacing. Body text runs at weight 500 in sentence case. The visual contrast between heavy uppercase display and light sentence-case body is the typographic rhythm of the system. The choice of system fonts is itself an aesthetic statement: it reads as "this is software, not a print artifact" — the digital-native counterpart to the printed-zine aesthetic of most brutalist systems.

The palette has six tokens but functions in four roles. **White** (`{colors.white}`) is the canvas. **Black** (`{colors.black}`) is the structure: borders, headlines, body text, label fills, shadow color. **Pink** (`{colors.pink}` — a muted blush #F2D4CF) and **green** (`{colors.green}` — a sage celadon #E5EDD6) are the accent surfaces — warm and cool counterparts, never used on text, always used as region fills. **Gray** (`{colors.gray}` — #F5F5F5) is the neutral fill for table zebra-striping and tertiary surfaces. Use black text on the pale accent surfaces and verify contrast and reading size in the rendered deck; palette choice alone does not prove legibility.

Depth is entirely **hard offset shadow** at 6px and 4px offsets in solid black with zero blur. No `rgba(...)`, no `0 4px 12px`. Either the shadow is hard-edged solid black or there is no shadow at all.

**Density philosophy: medium.** The system uses borders to wall off regions cleanly, but each region holds restrained content — typically one display element paired with one body paragraph, or one stat paired with one caption. The borders are loud (3px solid black, no compromise); the content within each region is quiet. Choose the number and area of regions from the real content. An unlettered pastel field can balance a sparse composition; never invent content to fill it.

**Key Characteristics:**
- White (`{colors.white}`) canvas with 3px solid black (`{colors.black}`) borders dividing every region. No gaps between cells — borders meet edge-to-edge.
- System sans-serif at weight 900 uppercase for all display type; weight 500 sentence case for all body type.
- Hard offset shadows at 6px and 4px in solid black, no blur, ever.
- Two muted pastel accent surfaces — blush pink and sage green — used as region fills, never as text colors.
- A signature black-pill `label` component (`{components.label}`) — white uppercase text in a small black rectangle — appears as the universal section tag.
- Oversized decorative numerals at 0.15–0.35 opacity sit behind content as wallpaper.
- An arrow glyph (→ with non-breaking space) signals a genuine action or directional relationship; never create dead controls to use it.
- No rounded corners anywhere in the system. Every shape is a strict rectangle, square, or circle.
- The native-only direction loads no external fonts; resolved faces, weights and line breaks vary by operating system.

## Colors

### Palette
- **Black** (`{colors.black}` — #0A0A0A): The structural color. All borders, all headline text, all body text, all label fills, all shadow values. Slightly softer than pure #000000 but reads as black at any reasonable size.
- **White** (`{colors.white}` — #FFFFFF): The canvas. Used as the default slide background, the default card background, and the text color inside black surfaces (labels, table headers, the dark stat tile).
- **Pink** (`{colors.pink}` — #F2D4CF): Muted blush. The warm accent surface — region backgrounds, bar fills, stat tile fills. The pastel saturation keeps black text fully legible without inversion.
- **Green** (`{colors.green}` — #E5EDD6): Sage celadon. The cool accent surface — region backgrounds, bar fills, hover-state highlight, alternating cards. Always paired with pink as the two halves of the accent system; rarely appear without each other in the same composition.
- **Gray** (`{colors.gray}` — #F5F5F5): Off-white neutral. Used for table zebra-stripe rows and tertiary card backgrounds where a region needs separation from white without committing to a colored accent.
- **Dark Gray** (`{colors.darkgray}` — #333333): A reserved tertiary text color, present in the token system but used sparingly. Available for de-emphasized text that needs to read softer than pure black.

### Defaults
- **Default surface background**: `{colors.white}`.
- **Default headline color**: `{colors.black}` — always. Headlines never appear in pink, green, or gray; only in black (on light surfaces) or white (on the black surface).
- **Default body text color**: `{colors.black}`.
- **Default border color**: `{colors.black}` — always.
- **Default accent surface for warm regions**: `{colors.pink}`.
- **Default accent surface for cool regions**: `{colors.green}`.
- **Default neutral fill for tertiary regions**: `{colors.gray}`.
- **Default text color on `{colors.black}` surfaces**: `{colors.white}` — the only color inversion in the system.

The accent surfaces (pink, green) are interchangeable — neither has a fixed semantic role (e.g., pink is not "warning" and green is not "success"). Use whichever color contrast best serves the composition. When two accent regions appear adjacent, pair pink with green for warm/cool balance rather than doubling on one color.

## Typography

### Font Family
The entire system runs on the **native system sans-serif stack**: `Segoe UI, system-ui, -apple-system, Helvetica, Arial, sans-serif`. No web fonts are loaded. This is intentional — the digital-native aesthetic depends on the type rendering in the user's actual system font, not a downloaded display face. The result is consistent only in spirit, not in exact letterform: a macOS render will look slightly different from a Windows render, and that variability is acceptable inside the system's tolerance.

The weight axis is the entire expressive tool. Display text uses weight 900 (the heaviest), titles use 800, subtitles use 700, body uses 500, with no italic variants and no alternate faces. The contrast between weight 900 uppercase and weight 500 sentence case is the system's primary typographic rhythm.

### Display and Numerical Scale

| Token | Stage size | Weight | Tracking | Use |
|---|---|---|---|---|
| `{typography.number}` | 120px | 900 | -0.04em | Hero numerical stat |
| `{typography.display}` | 96px | 900 | -0.02em | Section-opening or cover display |
| `{typography.number-lg}` | 80px | 900 | -0.02em | Large decorative or featured numeral |
| `{typography.headline}` | 64px | 900 | -0.01em | Primary section headline |
| `{typography.number-md}` | 56px | 900 | -0.02em | Stat tile or metric numeral |
| `{typography.title}` | 36px | 800 | 0.01em | Region or section title |
| `{typography.subtitle}` | 22px | 700 | 0.04em | Subtitle, intra-region heading |
| `{typography.body}` | 20px | 500 | 0 | Paragraph body |
| `{typography.caption}` | 13px | 700 | 0.08em | Caption, fine print, footnote |
| `{typography.label-text}` | 11px | 800 | 0.08em | Text inside black label pills |

### Defaults
- **Default size for a primary section headline**: `{typography.headline}` (64px).
- **Default size for a cover or opening display**: `{typography.display}` (96px).
- **Default size for paragraph body**: `{typography.body}` (20px).
- **Default size for any inline label or caption**: `{typography.caption}` (13px).
- **Default weight for any display element**: 900.
- **Default weight for any body element**: 500.
- **Default size for a hero numerical figure**: `{typography.number}` (120px).

When unsure, reach for `{typography.headline}` for the slide's primary text moment, not `{typography.title}` (which is for region-level headings within a slide).

### Signature Treatments
These treatments are **non-optional whenever the corresponding element type is used**:

- **Every display, headline, title, and subtitle element is uppercase.** Sentence-case display type does not exist in this system. If text is `{typography.display}`, `{typography.headline}`, `{typography.title}`, or `{typography.subtitle}`, it must be uppercase.
- **Every body element is sentence case.** Never uppercase a `{typography.body}` element — the uppercase/sentence-case contrast between display and body is the system's typographic signal.
- **Every display element uses negative letter-spacing.** Display (–0.02em), headline (–0.01em), number (–0.04em). Display type with default tracking reads as untreated; the negative tracking is what gives the type its compressed, brutalist density.
- **Every caption and label uses positive letter-spacing of at least 0.06em.** Caption and label glyphs without tracking read as code, not editorial.
- **All numerical figures use weight 900 with negative letter-spacing.** Even small stat numerals (56px) follow the display-weight convention.

### Typography Principles
The weight 900 + uppercase + negative tracking combination is the system's primary "voice." Switching any of those three properties (e.g., using weight 700 uppercase, or weight 900 sentence case) reads as a different design system. Weight 800 is reserved for `{typography.title}` and labels; weight 700 is for `{typography.subtitle}` and `{typography.caption}`; weight 500 is for body. Use actual supplied faces nearest the intended ladder and verify distinction; do not synthesize a missing weight.

Italic is not an emphasis device here. Weight carries editorial emphasis; real links still need a visible interactive treatment and keyboard focus.

## Layout

### Canvas System
Compose at 1920×1080 inside the shared runtime. The stage scales uniformly; this recipe does not own slide visibility, navigation or viewport sizing. The sizes below are stage pixels. The small caption and body tokens are historical starting values, not a readability guarantee: enlarge them and allocate more space for the actual viewing distance before reducing or removing content.

### Padding and Gap Scale
| Token | Stage size | Use |
|---|---|---|
| `{spacing.pad-lg}` | 64px | Outer slide-region padding, full-region cells |
| `{spacing.pad-md}` | 40px | Header bands, secondary regions |
| `{spacing.pad-sm}` | 20px | Compact regions, table cells |
| `{spacing.gap-lg}` | 48px | Large flex/grid gaps |
| `{spacing.gap-md}` | 32px | Standard flex/grid gaps |
| `{spacing.gap-sm}` | 16px | Tight inline gaps |

### Border-as-Layout Principle
The defining structural pattern: **regions are separated by 3px solid black borders, not by gaps**. When a slide is divided into a 2-column grid, the two columns share a 3px black vertical border between them and the cells meet that border directly — no `gap` property, no margin. When a header band sits above a content area, a 3px black horizontal line separates them and both regions abut the line. This is the system's most distinctive structural choice.

Internal padding and the gap tokens space content *within* a region. Structural regions meet without gutters; draw their common separator once rather than doubling two 3px borders.

## Depth and Elevation

### Hard Offset Shadow (Only Technique)
The system uses exactly two shadow values:
- **`{shadows.default}`** = `6px 6px 0 {colors.black}` — the standard hard offset shadow for elevated elements (large cards, primary callouts).
- **`{shadows.small}`** = `4px 4px 0 {colors.black}` — the lighter offset for smaller elevated elements.

Both shadows are **solid black, zero blur, fixed offset bottom-right**. There is no shadow variation by color, no blurred drop shadow, no soft elevation. An element either casts a hard offset shadow or it casts no shadow.

### Border-Based Depth
Most of the system's apparent "depth" actually comes from borders, not shadows. A 3px solid black border around a card on a colored background reads as elevated regardless of whether the card carries a shadow. Use shadow only when an element needs to feel "lifted off" the surface beneath it — typically a card that overlaps or floats above its containing region.

### Decorative Wallpaper (Atmospheric Depth)
A signature treatment: oversized numerals placed inside a card at very low opacity (0.15 for the largest quote mark, 0.20 for step numerals, 0.35 for card ordinals) sit behind the actual content as decorative wallpaper. The numeral fills the upper-left or upper portion of the region, and the actual title sits in front of it at full opacity. This creates a layered effect — content over decoration — without using any z-index trickery.

## Shapes and Treatment

### Border Radius
| Value | Use |
|---|---|
| 0px | Everything except circles |
| 50% (circle) | Donut chart shapes only |

The system has **no rounded corners**. Cards, buttons, labels, icon boxes, stat tiles, table cells, image frames — all strict rectangles or squares. The only round shape is the SVG donut chart, which is a circle by geometric necessity.

### Border Weights
- **3px solid `{colors.black}`** — the universal border. Used on every structural division: region separators, card outlines, table cells, icon boxes, connector nodes, swatches, bar tracks, stat tile borders. Never thinner, never thicker, never colored, never dashed.
- **4px solid `{colors.black}`** — used only for the `{components.line-h}` and `{components.line-v}` decorative rule elements (60px stub lines).
- **4px solid `{colors.white}`** — used only on the actual image frame inside black image regions (inverted border treatment for white-on-black contexts).
- **1.5px stroke** — used only on the inner stroke of the SVG donut chart at 0.1 opacity (a barely-visible inner ring).

### Decorative Element Types

**Black label pill** — A small black rectangle containing white uppercase text at 11px / weight 800 / 0.08em letter-spacing, with 6px × 14px padding. The system's universal section tag, fiscal-year marker, or status chip. May be prepended with the `{components.arrow-prefix}` for CTA variants.

**Horizontal rule stub** — A 60px × 4px solid black rectangle (`{components.line-h}`) used as an inline visual separator or accent next to a label. Functions as a "section break" mark in editorial layouts.

**Icon box** — A 48px × 48px white square with 3px black border containing a 1–3 character glyph (initials, Roman numeral, single letter) at 18–20px weight 900. Use only with a real referent; an arbitrary letter must not masquerade as a brand.

**Decorative oversized numeral** — A large numeric character (typically a step number or section ordinal) at weight 900 placed inside a card at 0.15–0.35 opacity. Sits behind or above the card's actual content as wallpaper.

**Connector node** — A 32px × 32px solid black square containing a white arrow glyph at weight 900. Positioned absolutely between sequential items in a horizontal flow (e.g., between timeline steps). Acts as the visual "→" between stages.

**Bar track** — A 32px-tall horizontal rectangle with 3px black border and white interior. The fill (in pink, green, or black) is a child `div` whose `width` percentage represents the data value, with the value label printed inside the fill at 12px weight 800. Bars in black get inverted text color (white).

**Stat tile** — A bordered card (`{components.stat-box}`) containing a large numeral (`{typography.number-md}`) above a small caption (`{typography.caption}`). Background may be white, pink, green, gray, or black (with appropriate text inversion).

**Arrow-prefixed text** — Text elements (CTAs, interactive list rows) get a `→` (U+2192) prepended via `::before` with a non-breaking space, indicating action or navigation. This is the system's interactivity signal.

**Donut chart** — Multi-segment SVG ring at 24px stroke width with a 1.5px inner divider ring at 0.1 opacity. Segments use the palette colors (black, pink, green) and the center holds a value + label pair.

## Do's and Don'ts

### Do
- Use 3px solid black borders on every structural division. The border weight is the system's identity — thinner reads as generic web app, thicker reads as broken.
- Set headline color to `{colors.black}` by default. Headlines in pink, green, or gray do not exist in this system.
- Pair pink and green as opposites when two accent surfaces appear together — warm with cool, never two pinks or two greens adjacent.
- Apply uppercase + negative letter-spacing + weight 900 together on every display element. The three traits are inseparable — using them individually loses the brutalist character.
- Use the black label pill (`{components.label}`) as the universal section tag. It is the system's most distinctive small component and should appear generously.
- Use the arrow-prefix (`→ + nbsp`) on every CTA and interactive list row. It is the system's interactivity signal.
- Render shadows as `6px 6px 0 {colors.black}` or `4px 4px 0 {colors.black}`. There are only two shadow values — pick one.
- Place oversized decorative numerals at 0.15–0.35 opacity behind content in cards that have a numerical identity (step number, ordinal, quote mark). The wallpaper-numeral pattern is a system signature.
- Let borders touch directly. Two regions meeting at a 3px black line is correct; a gap between them is wrong.
- Use weight 500 sentence case for body and weight 900 uppercase for display. The contrast between the two is the typographic rhythm.

### Don't
- Keep the native Latin sans direction. A localized CJK asset is a deliberate variation when actual glyph coverage or destination consistency requires it.
- Don't round any corner. Cards, buttons, labels, icon boxes — all strict rectangles. Border-radius is permitted only for circles (the donut chart).
- Don't use blurred shadows. `0 4px 12px rgba(0,0,0,0.1)` does not exist here. Either a 4px/6px hard solid black offset or nothing.
- Don't use color on borders. All structural borders are black. A colored border breaks the system.
- Don't use intermediate font weights (400, 600). The weight ladder is fixed at 500 / 700 / 800 / 900.
- Don't use italic for decoration. Preserve visible link and focus affordances on real controls.
- Don't put display-weight text in sentence case. Uppercase is non-negotiable on display, headline, title, subtitle, and caption tokens.
- Don't introduce a third accent surface color. Pink and green are the only accent surfaces. Adding a yellow or blue card breaks the warm/cool pairing system.
- Don't use gap properties between border-divided regions. Regions meet at borders; they do not have margins between them.
- Don't invert text color over pink, green, or gray surfaces. The pastels are designed for black text on top — inverted treatments only apply to the `{colors.black}` surface.

## Stage, interaction and export

Use the [shared deck runtime](../../../references/deck-runtime.md) for the fixed stage, navigation and export integration. Keep all layout decisions inside the 1920×1080 stage; the audience viewport scales the complete composition uniformly, without internal mobile breakpoints. Do not add a template-specific navigation engine, active-state protocol, print path or presenter controls.

Check the recipe's characteristic edges at the rendered size: type extents, rotated objects, shadows, textures and panel boundaries. Appearance alone does not prove fit or contrast. Preserve the content and repair the layout when a check fails.

## CJK & International Content

### Native type is a choice, not identical rendering

The native stack is a deliberate part of Raw Grid. It will resolve differently across operating systems; even the same numeric weight may map to a different supplied face. Use a tested native Chinese sans for a system-native deck, or a localized Noto Sans SC asset when consistent Chinese glyphs across destinations matter more. That optional CJK asset is a controlled variation of the native-font direction, not proof of equivalence.

| Role | Latin request | Chinese starting treatment |
|---|---|---|
| Display / numeral | Native sans 900 | Heaviest appropriate supplied face, tested at display size |
| Region title / subtitle | Native sans 800 / 700 | Available heavy/medium faces, distinct by size as needed |
| Body | Native sans 500 | Supplied 400–500 face with readable strokes |
| Caption / label | Native sans 700–800 | Supplied weight that survives at the actual label size |

### Explicit language handling

A font after `system-ui` may never be selected for CJK if the system font already supplies those glyphs. To require Noto Sans SC, select it explicitly on Chinese runs rather than claiming a final fallback name ensures its use. Preserve the Latin native face on Latin spans when needed; disable synthetic weight or slant and inspect the resolved result.

Reset CJK tracking to 0 and do not apply case transformation. Start Chinese display leading at 1.15–1.25 and prose at 1.75–1.85. Preserve the source's punctuation, number notation and identifiers. A Chinese label can be wider than a Latin one; expand the black label rectangle rather than abbreviating or fabricating a shorter label.

### Border-led hierarchy

The 3px shared borders, pink/green fields and 4px/6px hard offset shadows carry the same structural role across scripts. Without uppercase, Chinese hierarchy depends more on available weight, type size and panel allocation. Check that the body does not acquire a false display weight from synthetic fallback.

Only use a wallpaper numeral when the panel has that actual step or section identity. Keep the visible ordinal readable elsewhere; the low-opacity copy is decorative and may be hidden from assistive technology. Do not convert supplied numerals into another notation just for the aesthetic.

### Fit and acquisition

Native font variability requires checking the final target environment; the result is not byte-identical visual typography across platforms. If choosing a supplied CJK font asset, acquire the actual weights and glyph coverage and include it in the artifact. No remote font is required for the native-only direction.

Increase cell height, allocate more columns, or split the table when the CJK paragraph needs more room. Keep a single 3px separator at each shared edge rather than accumulating doubled borders. No content may be hidden behind scroll areas or removed to preserve a dense grid.

## Iteration Guide

1. Any new structural region uses a 3px solid black border to separate from its neighbor. Never use a gap or a margin between regions — borders are the separators.
2. Any new card or panel inherits the bordered-rectangle pattern: 3px solid black border, square corners, padding from the `{spacing.pad-*}` scale, background from the palette (white, pink, green, gray, or black).
3. Any new headline uses `{typography.headline}` (or `{typography.display}` for cover-level moments) in `{colors.black}` with uppercase. Don't reach for `{typography.title}` for the primary moment — that's a sub-headline.
4. Any new label or chip uses the `{components.label}` pattern: black background, white uppercase text at 11px / weight 800 / 0.08em.
5. Any new numerical figure follows the weight-900 + negative-tracking convention. Stat tiles use `{typography.number-md}`; hero stats use `{typography.number}`.
6. Any new accent surface picks pink or green based on warm/cool need. Don't introduce a third color.
7. Any new CTA or interactive element gets the `→` arrow prefix and, if elevated, a `6px 6px 0 {colors.black}` shadow.
8. If a card has a real step or section number, it may repeat that number at 0.15–0.35 opacity; otherwise use an unlettered field rather than inventing a digit. The wallpaper-numeral treatment is the system's signature decorative move.
9. Tables follow the bordered-cells + zebra-stripe + black-header pattern. Don't restyle them — the brutalist table aesthetic is part of the system identity.

## Implementation cautions

- Native type resolves differently across operating systems; inspect the actual delivery environment and supplied weights.
- Hover highlighting belongs only to implemented interactions and must have a focus counterpart. Static export cannot depend on hover to reveal data.
- Compute SVG chart geometry from the real values and radius. Keep all series; add labeled patterns or split the chart if the palette is insufficient.
- Replace working image voids with actual assets before delivery, or recompose the region. Never show a placeholder label as evidence.
- Low-opacity wallpaper is decoration; keep its actual number or quote readable in the foreground. Labels and small figures need a rendered readability check.
