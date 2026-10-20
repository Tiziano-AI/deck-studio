---
version: alpha
name: BlockFrame
description: "A maximalist neobrutalist presentation system built on 4px solid black borders, 8px hard offset shadows, and a high-key candy palette of five saturated pastels plus cream and off-white. Display type runs Inter at weight 800-900 in tight uppercase; secondary chrome uses Space Grotesk as a proportional technical label face. Tilted decorative shapes (rotated stars, rectangles, badges) puncture the borders and break the grid intentionally. Pastels are paired loudly: pink + blue + green + yellow + cream cycle through every region with deliberate juxtaposition. The aesthetic borrows from zine layout, 1990s-revival sticker books, and contemporary toy packaging — bold, joyful, slightly chaotic, never timid."

colors:
  black: "#000000"
  white: "#FFFFFF"
  offwhite: "#FFFDF5"
  pink: "#FE90E8"
  blue: "#C0F7FE"
  green: "#99E885"
  yellow: "#F7CB46"
  cream: "#FFDC8B"

borders:
  primary: "4px solid {colors.black}"
  thin: "3px solid {colors.black}"

shadows:
  default: "8px 8px 0px {colors.black}"
  small: "4px 4px 0px {colors.black}"
  hover: "6px 6px 0px {colors.black}"
  close-yellow: "12px 12px 0px {colors.yellow}"
  close-white: "6px 6px 0px {colors.white}"

typography:
  heading-xl:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 900
    fontSize: "96px"
    lineHeight: 0.95
    letterSpacing: -0.03em
    textTransform: uppercase
  heading-lg:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 800
    fontSize: "64px"
    lineHeight: 1
    letterSpacing: -0.02em
    textTransform: uppercase
  heading-md:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 700
    fontSize: "40px"
    lineHeight: 1.1
    letterSpacing: -0.01em
  close-title:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 900
    fontSize: "80px"
    lineHeight: 0.95
    letterSpacing: -0.03em
    textTransform: uppercase
  quote-text:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 900
    fontSize: "52px"
    lineHeight: 1.15
    letterSpacing: -0.02em
    textTransform: uppercase
  stat-number:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 900
    fontSize: "64px"
    lineHeight: 1
  card-title:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 700
    fontSize: 22px
    lineHeight: 1.2
    textTransform: uppercase
  step-num:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 900
    fontSize: 48px
    lineHeight: 1
  body:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 500
    fontSize: "20px"
    lineHeight: 1.6
  body-card:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 500
    fontSize: 15px
    lineHeight: 1.6
  list-body:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 500
    fontSize: 16px
    lineHeight: 1.5
  label:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 600
    fontSize: 13px
    lineHeight: 1
    letterSpacing: 0.08em
    textTransform: uppercase
  mono-tag:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 600
    fontSize: 14px
    lineHeight: 1
    letterSpacing: 0.05em
    textTransform: uppercase
  mono-meta:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 500
    fontSize: 15px
    letterSpacing: 0.02em
  subtitle-mono:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 500
    fontSize: 18px
    lineHeight: 1.5
  counter:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 700
    fontSize: 14px
    lineHeight: 1
    letterSpacing: 0.1em
    textTransform: uppercase
  legend-item:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 600
    fontSize: 13px

spacing:
  slide-pad: 60px
  card-pad-lg: 60px
  card-pad-md: 36px
  card-pad-sm: 28px
  card-pad-xs: 22px
  gap-lg: 48px
  gap-md: 32px
  gap-sm: 24px
  gap-xs: 16px
  pad-bottom-clearance: 110px

canvas:
  width: 1920px
  height: 1080px
  default-background: "{colors.offwhite}"

components:
  card-elevated:
    border: "4px solid {colors.black}"
    background: "{colors.white}"
    boxShadow: "{shadows.default}"
    description: "Primary elevated card. 4px ink border + 8px ink offset shadow. Background is white by default; on darker surfaces background may shift to offwhite or to a colored fill."
  card-flat:
    border: "4px solid {colors.black}"
    background: "{colors.white}"
    description: "Bordered card without elevation shadow. Used for secondary content cells inside multi-card grids where the shadow would compound."
  card-small:
    border: "3px solid {colors.black}"
    background: "{colors.white}"
    boxShadow: "{shadows.small}"
    description: "Compact card with thinner border + smaller offset shadow. Used for intro-cards, stat-cards, team-cards, and timeline-steps."
  label-pill:
    border: "3px solid {colors.black}"
    padding: "6px 16px"
    fontFamily: "'Space Grotesk', sans-serif"
    fontSize: 13px
    fontWeight: 600
    letterSpacing: 0.08em
    textTransform: uppercase
    background: "{colors.white}"
    boxShadow: "{shadows.small}"
    description: "Treatment for a supplied section eyebrow. White base by default; pink, blue, green, yellow, cream variants swap background. Always sits on a 3px black border with a 4px hard offset shadow."
  button-primary:
    border: "3px solid {colors.black}"
    background: "{colors.yellow}"
    color: "{colors.black}"
    padding: "14px 32px"
    fontFamily: "'Inter', sans-serif"
    fontWeight: 700
    fontSize: 16px
    boxShadow: "{shadows.small}"
    description: "Primary CTA. Yellow fill with black text, 3px black border, 4px offset shadow. Hover lifts the button -2/-2 and grows shadow to 6px."
  corner-bracket:
    width: 24px
    height: 24px
    border: "3px solid {colors.black}"
    description: "Two L-shaped brackets at opposite corners of a card or frame (tl + br + tr + bl pattern available). Sits inside the card edge as a decorative frame-within-frame."
  icon-square:
    width: 64px
    height: 64px
    border: "3px solid {colors.black}"
    description: "Solid pastel square (pink/blue/green) holding a single uppercase letter glyph at weight 700 / 28px. Used as feature-card icons."
  feature-deco:
    width: 48px
    height: 48px
    border: "3px solid {colors.black}"
    background: "{colors.yellow}"
    position: "absolute top -12px right 24px"
    description: "Yellow square notch that protrudes from the top edge of a feature card, breaking the card's top border line."
  stat-deco-dot:
    width: 12px
    height: 12px
    borderRadius: 50%
    border: "2px solid {colors.black}"
    description: "Small black-bordered colored circle pinned to the top-right of a stat card. The only round shape used on cards. Fill cycles through the pastel palette."
  avatar-square:
    width: 72px
    height: 72px
    border: "3px solid {colors.black}"
    background: "{colors.pink}"
    fontFamily: "'Inter', sans-serif"
    fontWeight: 900
    fontSize: 28px
    textTransform: uppercase
    description: "Square avatar with two-letter initials, used in team grids. Fill cycles through the pastel palette."
  list-number:
    width: 36px
    height: 36px
    border: "3px solid {colors.black}"
    background: "{colors.yellow}"
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 700
    fontSize: 14px
    description: "Square marker for a genuine ordered item. Black border, yellow fill, proportional Space Grotesk numeral; use wordless geometry for an unordered list."
  star-burst:
    clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
    border: "3px solid"
    background: "{colors.pink}"
    description: "five-point star rendered as an SVG polygon with a true 3px outline. Decorative attention-grabber pinned to corners of close-frames and feature cards."
  stripe-block:
    background: "repeating-linear-gradient(45deg, {colors.black}, {colors.black} 4px, {colors.green} 4px, {colors.green} 12px)"
    border: "3px solid {colors.black}"
    description: "Black-and-color diagonal stripe panel used as decorative attention block on poster-class surfaces."
  bg-dot-grid:
    backgroundImage: "radial-gradient(circle, {colors.black} 1.2px, transparent 1.2px)"
    backgroundSize: "24px 24px"
    description: "Faint dot-grid background pattern used as an overlay on light surfaces or as decoration in corners of cards."
  tilt-card:
    transform: "rotate(±2deg) or rotate(±8deg)"
    description: "Card with intentional tilt. Stat cards alternate -2deg / +2deg; decorative rectangles tilt up to ±12deg. The tilt is the system's playful structural signature."
  nav-btn:
    width: 48px
    height: 48px
    border: "3px solid {colors.black}"
    background: "{colors.white}"
    boxShadow: "{shadows.small}"
    description: "Square nav arrow button. Hover translates -2/-2 and grows shadow; active translates 2/2 and shrinks shadow."
  slide-counter:
    border: "3px solid {colors.black}"
    background: "{colors.white}"
    padding: "10px 18px"
    boxShadow: "{shadows.small}"
    description: "Persistent slide counter pill at bottom-left. Space Grotesk uppercase NN / NN format."
---

## Stage and Content Contract

This recipe supplies visual decisions for Deck Studio's fixed **1920×1080** stage. Use the canonical [runtime](../../../runtime/) and [runtime contract](../../../references/deck-runtime.md) for stage scaling, navigation, focus, capture and export. Do not create a second scaler, slide controller, keyboard handler or print engine. The whole stage scales uniformly, including on phones; the composition does not internally reflow with the browser viewport.

All dimensions below are stage-space authoring values. A range is a choice to resolve while composing, not permission for live viewport-dependent layout. Body and data text must remain readable in the intended presentation or reading setting: enlarge and recompose, split while retaining all locked material, or choose another system when the content does not fit. Never clip, scroll, hide, omit or invent material to complete a layout. Visible labels, metrics, attribution, ordinals, emphasis and status come from the content lock; wordless geometry may supply atmosphere.

## Overview

BlockFrame is a **maximalist neobrutalist presentation system** built on five structural laws: primary regions have 4px black borders and 8px hard offset shadows, while secondary elevated objects use 3px/4px and inner flat cells may have border only, every corner is square, every accent color is a saturated pastel, and every layout is allowed to be a little bit crooked. The system's joy comes from the deliberate collision of these laws — bordered cards meet bordered cards, shadows stack against shadows, tilted decorations puncture the grid intentionally.

The type system pivots on **Inter** (weights 400-900) for display, body, and stats — set at weight 800-900 in tight uppercase with negative letter-spacing for headlines, weight 500 sentence case for body, and weight 700 uppercase for card titles. **Space Grotesk** (weights 400-700) is the secondary face, used as a proportional technical label voice for eyebrows, slide counters, stat labels, mono tags, and any chrome that should read as "system" rather than "editorial". The face combination is deliberately ordinary — both are widely-available open sans-serifs — but the treatment (heavy uppercase Inter + wide-tracked Space Grotesk) gives them a distinct neobrutalist register.

The palette is built around **five saturated pastels** (pink `#FE90E8`, blue `#C0F7FE`, green `#99E885`, yellow `#F7CB46`, cream `#FFDC8B`) plus **pure black** (`#000000`) for borders and text, **white** (`#FFFFFF`) for clean card fills, and **off-white** (`#FFFDF5`) for warm canvas. The pastels are not subtle accents — they are full-bleed surface fills. A typical deck cycles every slide through a different colored ground (offwhite cover → blue intro → offwhite content → green chart → pink quote → yellow split → offwhite timeline → blue stats → cream team → black close). This color cycling is the system's primary rhythm.

Depth is **hard offset shadow at 4px and 8px**, always solid black, always zero blur, always positioned bottom-right. Larger elements get 8px, smaller chrome gets 4px. The close-frame uses a single 12px offset in **yellow** (one of the two closing-surface shadow exceptions) as the system's loudest depth statement, and inverted close-frames pair 6px **white** shadows on black surfaces. Borders are 4px solid black on primary cards, 3px solid black on secondary chrome. Border weight and shadow size are tightly coupled — a 4px border carries an 8px shadow; a 3px border carries a 4px shadow.

**Density philosophy: comfortably dense.** This system supports comfortable density through nested frames; sparse content can instead use one large framed statement. A typical surface holds: a label-pill eyebrow + a large headline + a multi-card grid (3-6 cards) + at least one decorative element (tilted rectangle, star burst, stripe block, corner bracket, deco dots). Use the supplied number of items to choose a complete composition; never invent cards, labels or figures to fill a grid. The system's joy depends on the visual chatter of many bordered objects existing in the same frame.

**Key Characteristics:**
- 4px solid black borders on primary cards, 3px on secondary chrome — never thinner.
- 8px hard offset shadows on primary cards, 4px on secondary chrome — solid black, zero blur.
- Five-pastel palette (pink, blue, green, yellow, cream) plus black, white, off-white — cycled across surfaces.
- Inter weight 800-900 uppercase with negative tracking is the display voice; Space Grotesk weight 600 uppercase with 0.08em tracking is the label voice.
- Square corners everywhere except a single circular accent dot on stat cards.
- Tilted decorative elements (rotated rectangles, stars, badges) puncture the grid intentionally.
- Label pills (`{components.label-pill}`) carry a 3px border, 4px offset shadow, and a pastel fill variant — the universal section eyebrow.
- Colored fills are bold and saturated; pastels are used as panel grounds, not as light accents.
- Yellow is the default CTA color; black is the default close-surface color.
- Star bursts, stripe blocks, and dot grids are reusable decorative attention units.

## Colors

### Palette

- **Black** (`{colors.black}` — `#000000`): The structural color. Every border, every primary text moment, every shadow. Pure black, no warm bias. The system's contrast anchor.
- **White** (`{colors.white}` — `#FFFFFF`): The default card fill. Used on every primary card and as the background of label-pills and nav-buttons. Pure white, no warmth.
- **Off-white** (`{colors.offwhite}` — `#FFFDF5`): The warm canvas tone. The default body/slide background when no pastel ground is in play. Subtly warmer than pure white so that white cards sitting on top still feel layered.
- **Pink** (`{colors.pink}` — `#FE90E8`): A high-key candy magenta. Used as a full-surface ground, as label-pill fill, as icon-square fill, as star-burst fill, and as one of the pastel chart series. The most saturated of the five pastels.
- **Blue** (`{colors.blue}` — `#C0F7FE`): A pale cyan-ice blue. Used as a full-surface ground (the "intro" and "stats" feel), as label-pill fill, as icon-square fill, and as a chart series.
- **Green** (`{colors.green}` — `#99E885`): A bright spring green. Used as a full-surface ground, as label-pill fill, as icon-square fill, in the stripe-block diagonal pattern, and as a chart series.
- **Yellow** (`{colors.yellow}` — `#F7CB46`): The CTA color. Used as the default button fill, as the close-frame shadow color, as list-number squares, as the feature-deco notch, and as label-pill fill. The brightest, most attention-pulling pastel.
- **Cream** (`{colors.cream}` — `#FFDC8B`): A warm yellow-cream. Softer than yellow, more saturated than offwhite. Used as a full-surface ground (the "team" or "cover" feel), as label-pill fill, and as a tertiary chart accent.

### Defaults

- **Default surface background**: `{colors.offwhite}` for content-heavy surfaces; cycle through `{colors.cream}`, `{colors.blue}`, `{colors.pink}`, `{colors.green}`, `{colors.yellow}` for surfaces that need a stronger ground. The cycle is the rhythm; staying on one ground for many slides flattens the system.
- **Default headline color**: `{colors.black}` on all light/pastel surfaces; `{colors.white}` on the black close-surface.
- **Default body text color**: `{colors.black}` on all light/pastel surfaces; `{colors.white}` or `{colors.cream}` on dark surfaces.
- **Default border color**: `{colors.black}` — always. There are no colored borders anywhere except the 4px white border on the inverted close-frame.
- **Default card fill**: `{colors.white}`. Use a pastel fill only when the card is part of a multi-card row where each card needs distinct color identity (e.g., the timeline-step row where each step is a different pastel).
- **Default button fill**: `{colors.yellow}`. Other pastels work, but yellow is the system's primary "click here" signal.
- **Default label-pill base**: `{colors.white}`; pastel variants (`{colors.pink}`, `{colors.blue}`, `{colors.green}`, `{colors.yellow}`, `{colors.cream}`) signal section type or decorate the eyebrow.
- **Default decorative accent on stat cards**: a 12px circle (`{components.stat-deco-dot}`) in a pastel fill — cycling pink, blue, green, yellow across cards.
- **Default chart palette order**: pink → blue → green (three-series), with yellow and cream available for additional series.

The pastels are interchangeable in role — none of them carry fixed semantic meaning (green isn't "success", red doesn't exist in the palette at all). Pair them by visual juxtaposition: pink + blue + green is the most common trio; cream + yellow is the warm pair; blue + pink is the cool-warm contrast.

## Typography

### Font Family Stack
The system runs two faces.

**Inter** (weights 400-900) is the display, body, headline, and stat face. Used at weight 900 for hero/close titles and quote text, weight 800 for primary headlines, weight 700 for medium headlines and card titles, weight 500 for body. Display weights are always uppercase with negative letter-spacing (-0.02 to -0.03em); body weights are always sentence case with default tracking. The contrast between heavy uppercase display and weight-500 sentence body is the system's typographic rhythm.

**Space Grotesk** (weights 400-700) is the label and chrome face. Used at weight 600 for label-pills (13px, 0.08em tracking, uppercase) and at weight 500 for monospace meta callouts. The face is technically not monospace, but its slightly geometric character + the wide tracking treatment makes it read as the system's "code" voice.

Don't introduce a third face. The Inter + Space Grotesk pairing is the entire typographic palette.

### Typography Scale

| Token | Size (clamp / px) | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.heading-xl}` | 48–96px clamp | Inter | 900 | Hero or cover-scale headline |
| `{typography.heading-lg}` | 32–64px clamp | Inter | 800 | Primary section headline |
| `{typography.heading-md}` | 24–40px clamp | Inter | 700 | Region headline, chart title |
| `{typography.close-title}` | 40–80px clamp | Inter | 900 | Closing-statement title (inverted surface) |
| `{typography.quote-text}` | 28–52px clamp | Inter | 900 | Quote body — always uppercase |
| `{typography.stat-number}` | 36–64px clamp | Inter | 900 | Stat numeral |
| `{typography.card-title}` | 22px | Inter | 700 | Feature card title — uppercase |
| `{typography.step-num}` | 48px | Inter | 900 | Numeral inside a timeline-step (opacity 0.6) |
| `{typography.body}` | 16–20px clamp | Inter | 500 | Standard body paragraph |
| `{typography.body-card}` | 15px | Inter | 500 | Body inside compact cards |
| `{typography.list-body}` | 16px | Inter | 500 | Numbered list body |
| `{typography.label}` | 13px | Space Grotesk | 600 | Text inside label-pill |
| `{typography.mono-tag}` | 14px | Space Grotesk | 600 | Mono tag/badge, slide-counter |
| `{typography.mono-meta}` | 15px | Space Grotesk | 500 | Inline mono metadata |
| `{typography.subtitle-mono}` | 18px | Space Grotesk | 500 | Hero subtitle / close subtitle |
| `{typography.counter}` | 14px | Space Grotesk | 700 | Persistent slide counter (NN / NN) |
| `{typography.legend-item}` | 13px | Space Grotesk | 600 | Chart legend label |

### Defaults

- **Default size for a hero or cover title**: `{typography.heading-xl}` (48–96px). Always uppercase, always weight 900, always with -0.03em tracking.
- **Default size for a primary section headline**: `{typography.heading-lg}` (32–64px). Uppercase, weight 800, -0.02em.
- **Default size for a region or chart title**: `{typography.heading-md}` (24–40px). The only Inter heading not in uppercase by default — though uppercase is permitted.
- **Default size for a stat numeral**: `{typography.stat-number}` (36–64px). Weight 900, line-height 1.
- **Default size for body paragraph**: `{typography.body}` (16–20px clamp). Weight 500, sentence case, line-height 1.6.
- **Default size for an eyebrow label**: `{typography.label}` (13px) inside the `{components.label-pill}`.
- **Default weight for any Inter display**: 800 or 900. Inter display at weight 700 reads as "almost there"; only use 700 for `{typography.heading-md}` or card titles.
- **Default weight for any Inter body**: 500. Body at 400 reads as too light, body at 700 reads as oversized.
- **Default tracking for any Space Grotesk label/chrome**: 0.05-0.10em. Wide tracking is the face's "chrome" signal.
- **Default tracking for any Inter display**: -0.01em (heading-md) to -0.03em (heading-xl). Display without negative tracking reads as untreated.

When unsure which heading token to reach for, default to `{typography.heading-lg}` (32–64px) for the slide's primary text moment. `{typography.heading-md}` is for region or chart titles within a slide.

### Signature Treatments

These treatments are **non-optional whenever the corresponding element type is used**:

- **Every Inter display element (heading-xl, heading-lg, quote-text, close-title) is uppercase.** Sentence-case Inter display at weights 800+ does not exist in this system. The uppercase + heavy-weight + negative-tracking combination is the visual identity.
- **Every Inter display element uses negative letter-spacing** (-0.01 to -0.03em). Display without negative tracking reads as default Inter, which is a fundamentally different aesthetic.
- **Every label-pill carries the 3px border + 4px shadow + uppercase Space Grotesk text** combination. A label without all three properties is not a label-pill — it's a stray text element.
- **Every card-title is uppercase Inter weight 700.** Card titles in sentence case break the brutalist rhythm.
- **Every Space Grotesk label/chrome/counter is uppercase with 0.05-0.1em tracking.** Sentence-case Space Grotesk does not exist in this system except for body-adjacent metadata (mono-meta, mono inline).
- **Every stat numeral is Inter weight 900 with line-height 1.** Stat numerals are display moments, not data chrome.
- **Every Inter body block is sentence case with line-height 1.6 (or 1.5 for compact card body).** Body in uppercase or with tight line-height reads as broken.
- **Step numbers inside timeline-step cards are 48px weight 900 at opacity 0.6.** The reduced opacity is mandatory — full-opacity step numbers overwhelm the step title.

### Typography Principles

The voice contrast is **bold uppercase display ↔ sentence body ↔ wide-tracked label**. Italic is never used. Underline is never used. The only emphasis mechanism is weight contrast within the Inter ladder and the uppercase/sentence-case switch.

Display elements should be allowed to **dominate the canvas**. The system is built for poster-scale typography; reading a heading-xl at small size collapses its character. Lean into the upper bound of every clamp.

## Layout

### Canvas System
Compose inside the canonical 1920×1080 stage. Keep the recipe's internal grid, margins and visual layers in stage coordinates. The runtime owns the outer viewport fit and slide visibility; recipe CSS must not replace its container positioning or slide-state classes. Reserve space for actual runtime controls where present and never reproduce them as painted buttons or invented hints.

### Padding and Gap Scale

| Token | Value | Use |
|---|---|---|
| `{spacing.slide-pad}` | 60px | Default slide padding from edge to content |
| `{spacing.card-pad-lg}` | 60px | Hero-frame and quote-frame internal padding |
| `{spacing.card-pad-md}` | 36px | Feature-card internal padding |
| `{spacing.card-pad-sm}` | 28px | Intro-card internal padding |
| `{spacing.card-pad-xs}` | 22px | Team-card and small-cell padding |
| `{spacing.gap-lg}` | 48px | Gap between major sections (header-to-grid) |
| `{spacing.gap-md}` | 32px | Gap between feature cards |
| `{spacing.gap-sm}` | 24px | Gap between intro cards, stat cards |
| `{spacing.gap-xs}` | 16px | Gap inside list items, intra-card content |
| `{spacing.pad-bottom-clearance}` | 110px | Bottom padding reserve to clear fixed nav chrome |

### Persistent Chrome
Apply the black 3px border, white fill and 4px offset treatment to actual supported runtime controls. The visual target is compact 48px arrow controls and a Space Grotesk counter, not a second controller. Reserve their actual footprint; 110px bottom padding is a useful stage option when controls and content would otherwise crowd.

### Card-on-Card Structure
The system's primary layout pattern is **cards on grounds on grounds**. A typical slide places a colored-ground surface, on which sits a white card with 4px black border + 8px shadow, which may contain smaller cards or icon-squares. Each level of nesting carries its own border weight: 4px for the outer card, 3px for inner chrome. This nested-bordered structure is what gives the system its dense, packed feel.

### Decorative Disruption
Tilted decorative elements (rotated rectangles, stars, badges, dot grids) are placed absolutely on slide and card surfaces to puncture the grid intentionally. These are not "background decoration" — they are part of the composition. A surface without any decorative element reads as too clean.

## Depth and Elevation

### Hard Offset Shadow Stack
The system uses three primary shadow values:
- **`{shadows.default}`** = `8px 8px 0px {colors.black}` — primary card shadow. Used on hero-frame, feature-card, quote-frame, chart-frame, and any elevated card.
- **`{shadows.small}`** = `4px 4px 0px {colors.black}` — secondary chrome shadow. Used on intro-card, stat-card, team-card, timeline-step, label-pill, button-primary, nav-btn, slide-counter.
- **`{shadows.hover}`** = `6px 6px 0px {colors.black}` — hover state for buttons and nav. Triggered with a -2/-2 transform.

All shadows are solid black, zero blur, fixed offset bottom-right. The shadow + transform pairing on hover creates a "lifting off the page" interaction signature — the element translates -2/-2 while the shadow grows to 6/6, simulating a peel-up.

### Inverted Shadows
On the dark close-surface, shadows invert their color but keep the offset logic:
- **`{shadows.close-yellow}`** = `12px 12px 0px {colors.yellow}` — the loudest depth statement in the system. Used on close-frame to make the inverted surface read as still "elevated" despite its dark ground.
- **`{shadows.close-white}`** = `6px 6px 0px {colors.white}` — used on the close-btn to maintain elevation on the black ground.

These colored shadows are the only exceptions to the "shadows are always black" rule, and they appear only on the dark surface.

### Border-Based Depth
Most of the system's apparent layering comes from the 4px or 3px ink borders, not from shadow. A card with a border but no shadow still reads as "an object on a surface" — the shadow is what makes it read as "lifted". Use shadow for elevated cards; use border-only for secondary cards inside a multi-card grid where stacked shadows would compound into noise.

### Tilted Elements as Depth
The system's playful depth signature is **tilt**. Stat cards alternate -2deg / +2deg rotation. Decorative pink rectangles tilt up to ±12deg. The yellow button tab on the hero frame tilts -3deg. These tilts break the grid alignment intentionally and create perceived dimensionality without using actual perspective or shadow.

## Shapes and Treatment

### Border Radius
- **0px** on everything structural — cards, label-pills, buttons, icon-squares, list-numbers, avatars, badges. Square corners are non-negotiable.
- **50% (circle)** used only for the stat-deco dot (12×12 circular accent pinned to stat cards). This is the only round shape in the system.

The square-corner discipline is the system's structural identity. Adding rounded corners to any card or chip immediately reads as a different aesthetic.

### Border Weights
- **4px solid `{colors.black}`** — used on primary cards (hero-frame, feature-card, quote-frame, chart-frame, team-card border, timeline-step border, stat-card border) and the close-frame inverse (4px solid white on black ground).
- **3px solid `{colors.black}`** — used on secondary chrome (label-pill, button, intro-card, icon-square, list-number, avatar, corner-bracket, nav-btn, slide-counter, stripe-block, star-burst). The 3px weight signals "secondary structural" vs. the 4px "primary structural".
- **2px solid `{colors.black}`** — used only on legend swatches (16×16 chart swatches) and stat-deco dots. The thinnest border weight, reserved for atomic chrome.
- **4px solid `{colors.white}`** — used only on the inverted close-frame, the visual-box, and its ::after offset frame on the dark split-visual surface.

The border weight ladder (2 / 3 / 4) is fixed. No 1px borders, no 5px+ borders.

### Decorative Element Types

**Label-pill** — Square bordered pill (3px black border, 4px shadow), pastel or white fill, Space Grotesk 13px weight 600 uppercase text with 0.08em tracking. A section eyebrow when supplied.

**Corner-bracket** — Two L-shaped brackets (or four for full enclosure) at the corners of a card, 3px black border. Creates a frame-within-frame decorative motif.

**Star-burst** — five-point star rendered as an SVG polygon with a true 3px outline, pastel fill. Decorative attention-grabber pinned to corners of close-frames and feature cards.

**Stripe-block** — Diagonal 4px-on, 8px-off stripe pattern in black + a pastel color, framed with a 3px black border. Decorative attention block used on poster-class surfaces.

**Dot-grid** — 1.2px radial-gradient dot pattern at 24×24 spacing. Used as a faint decorative overlay in corners of slides, at 30-40% opacity.

**Feature-deco notch** — 48×48 yellow square with 3px black border, positioned absolutely to protrude from the top edge of a feature card. The notch breaks the card's top border, suggesting it's been "stapled on".

**Icon-square** — 64×64 pastel square with 3px black border holding a single uppercase letter glyph at Inter weight 700 / 28px. Used as feature-card icons.

**Stat-deco dot** — 12×12 circle with 2px black border, pastel fill, pinned to the top-right of a stat card. The system's only round shape.

**List-number** — 36×36 yellow square with 3px black border holding a Space Grotesk 14px weight 700 numeral. Used as bullets on numbered lists.

**Avatar-square** — 72×72 pastel square with 3px black border holding two uppercase initials at Inter weight 900 / 28px. Used in team grids; fills cycle through pastels.

**Step-connector** — A 28×4 horizontal black bar pinned to the right edge of a timeline-step card, mid-height. Visually links adjacent steps in a horizontal flow.

**Tilted decoration** — Any rectangle, badge, or star with a rotate(±2deg to ±12deg) transform. The tilt is intentional disruption of the grid; without it, the system reads as too uniform.

## Do's and Don'ts

### Do

- Apply 4px solid black borders to primary cards (`{components.card-elevated}`, hero-frame, quote-frame) and 3px to secondary chrome. The border weight ladder is the system's structural backbone.
- Pair elevated 4px cards with 8px shadows and elevated 3px chrome with 4px shadows. Inner flat cells keep their border without a shadow.
- Cycle slide backgrounds through the pastel palette — offwhite, cream, blue, pink, green, yellow — to keep the deck visually rhythmic. Staying on one color for many slides flattens the system.
- Set every Inter display element in uppercase with negative letter-spacing (-0.01 to -0.03em) and weight 800+. The combination is the typographic identity.
- Use the `{components.label-pill}` (3px border, 4px shadow, pastel fill, Space Grotesk uppercase 0.08em) for a supplied section eyebrow.
- Apply tilt to decorative rectangles, stat cards, stars, and badges (±2deg to ±12deg). The intentional misalignment is the system's playful signature.
- For an actual enabled action, use `{colors.yellow}` as the default button color. Yellow with a 3px black border and 4px black shadow is the system's "click here" voice.
- Render shadows as solid black with zero blur, always offset bottom-right. The hard-edge shadow is the depth language.
- Add a decorative element (star-burst, stripe-block, dot-grid, corner-bracket, tilted rectangle) to every surface. The visual chatter is part of the system's energy.
- Use pure black `{colors.black}` for the closing surface, with white text and a 12px yellow offset shadow on the close-frame. The inverted dark surface is the system's loudest contrast moment.

### Don't

- Don't round any corner on cards, buttons, label-pills, icon-squares, or avatars. Border-radius is forbidden except on the stat-deco dot (12px circle).
- Don't blur any shadow. Every shadow is hard-edged at zero blur. `box-shadow: 0 4px 12px rgba(0,0,0,0.1)` does not exist in this system.
- Don't use colored borders. Borders are always pure black, except for the inverted 4px white border on the close-frame.
- Don't use Inter display weights in sentence case. Uppercase is mandatory on heading-xl, heading-lg, quote-text, close-title, and card-title.
- Don't set Inter display without negative letter-spacing. Default-tracked Inter at heavy weights reads as a different system.
- Don't introduce a sixth pastel color. The palette is locked at pink, blue, green, yellow, cream. Adding purple, orange, or red breaks the curated candy palette.
- Don't omit the label-pill on a region. Going straight from background to headline without an eyebrow tag breaks the system's editorial rhythm.
- Don't render label-pills as plain text. The 3px border + 4px shadow + pastel fill combination is what defines the pill.
- Don't use blurred or colored body text. Body is solid black on light surfaces, solid white or cream on dark surfaces.
- Don't keep every card perfectly aligned. The tilt on stat cards, decorations, and badges is what gives the system its hand-made energy.

## Stage Adaptation and Capture

Resolve the layout at 1920×1080, then let the shared runtime scale the entire stage. Narrow screens retain the composition, with letterboxing as necessary; there are no recipe-specific mobile stacks, font clamps, swipe handlers or slide transitions. An alternate reading composition is an authored artifact choice, not an automatic breakpoint.

Use the shared renderer and exporter. Inspect complete slides, long labels, dense tables, and navigation with the actual content and fonts. Meaningful data must be at its final value at capture time; no count-up or zero-to-value entrance animation may substitute for the data. Decorative motion, when retained, needs a deterministic static capture and reduced-motion treatment. Controls are real shared-runtime controls only; static callouts must not claim interactivity.

## CJK & International Content

### Role-Preserving Pairing

| Role | Candidate Chinese face | Requested weight |
|---|---|---|
| Display | Noto Sans SC | 900 |
| Body | Noto Sans SC | 500 |
| Labels | Noto Sans SC | 600 |

These are design candidates, not claims of installed assets, glyph coverage, equivalent metrics or available font styles. Select the correct language/region family for Simplified Chinese, Traditional Chinese, Japanese or Korean, and verify the actual source strings and required punctuation against the supplied font files. Localize licensed assets for reproducible output under the shared rendering contract; do not assume a successful remote CSS request means the font rendered.

### Mixed-Script Implementation

Use role-specific stacks and explicit language spans when a weight or style differs by script. A fallback family chooses glyphs, not a different weight. Keep Latin families in their original roles where desired, and set `font-synthesis: none` on the affected runs to expose missing bold or italic instead of silently fabricating it. Check full names, numbers, symbols and mixed-script baselines, not just a sample Hanzi. Retain supplied punctuation, capitalization and spacing; any copy edit that changes the lock returns to intake.

Start Chinese body leading around 1.7 and display leading around 1.1–1.2, then inspect the actual strings at stage size. Reset wide Latin tracking on CJK runs and apply case styling only where the source language and locked spelling permit it. Widen or recompose labels before making them smaller. Preserve all source qualifications when a line wraps; splitting into additional slides is preferable to squeezing the type.

### System-Specific Adaptation

Use a verified 700 weight for card headings to preserve their middle rung below the 900 display. Space Grotesk is proportional, so its technical label voice does not require a false promise of Chinese monospace equivalence. The identity survives through black 4px frames, the 8px shadow step, pastel grounds and genuinely oversized type. Hanzi have a dense square silhouette: widen label boxes, loosen display line-height and keep black outlines out of counters. Keep real initials only for identified people; use wordless shapes instead of inventing Latin letters as icons. Do not shrink Chinese labels merely to preserve a Latin-width card.

### Asset and Emphasis Limits

Inspect requested weights and styles in the actual font asset before using them. Optical size, oblique style and weight are different properties; one does not supply another. When a face lacks a needed treatment, select a verified asset or an approved alternative visual treatment while preserving the same audience-visible emphasis. Test final composed text against its background; palette tokens and font family names are not evidence of legibility.

## Iteration Guide

1. Any new elevated card uses the matched border/shadow pair (4px/8px or 3px/4px); flat inner cards use border only.
2. Any new region begins with a `{components.label-pill}` eyebrow in pastel fill, then the headline in uppercase Inter weight 800+, then content. The label-headline-content sequence is the system's editorial rhythm.
3. Any new headline uses uppercase Inter with negative letter-spacing and weight 800-900. Reach for `{typography.heading-lg}` (32-64px) for primary moments and `{typography.heading-xl}` (48-96px) for cover/hero scale.
4. Any new accent or surface fill picks from the 5-pastel palette (pink, blue, green, yellow, cream) — never introduce a sixth pastel.
5. Any new CTA uses the `{components.button-primary}` pattern: 3px black border, yellow fill, 4px black shadow, Inter weight 700 / 16px. Hover lifts -2/-2 with shadow growing to 6px.
6. Any new chart cycles through pink → blue → green for series order, with yellow/cream available for additional series. Legend swatches use 2px black border.
7. Any new stat or metric uses Inter weight 900 + line-height 1 for the numeral, paired with Space Grotesk uppercase label below. Decorate the card with a `{components.stat-deco-dot}` in a pastel color.
8. Any new slide adds at least one decorative disruption (tilted rectangle, star-burst, stripe-block, dot-grid corner, corner-bracket frame) — empty surfaces feel timid.
9. Any new closing-style surface uses pure `{colors.black}` ground with white text, a 4px white-bordered close-frame, and a 12px yellow offset shadow. The close button may also use the documented 6px white shadow.
10. If a surface feels too noisy, drop a decoration — don't drop a border or shadow. The borders and shadows are structural; the decorations are tunable.

## Authoring Limits

- Verify Inter and Space Grotesk assets, including the requested heavy display weights; dependency or fallback availability is not visual proof.
- Map the chart to actual data. An 800×360 SVG viewBox can anchor the illustration geometry, with axes and labels placed from a shared quantitative scale.
- Assign ±2° stat-card tilts explicitly to keep the visual composition stable when source order changes; do not reorder content just to obtain a tilt.
- Render the five-point decorative star as an SVG polygon with a real stroke. A ten-vertex polygon has five outer points; a clipped CSS box border does not reliably outline its silhouette.
- Reserve the actual shared-control area; 110px of lower breathing room is an authoring option, not a promise that a bespoke counter or nav exists.
- Inspect meaningful text and graphics on black and pastel grounds separately. The 24px dot grid, white closing border and yellow/white shadows are visual ingredients, not blanket contrast assurances.
