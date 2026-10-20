---
version: alpha
name: 8-Bit Orbit
description: A retro-futuristic pixel-art presentation system that fuses 16-bit arcade nostalgia with editorial discipline. Display type runs in Tektur (a chunky geometric display face built on pixel-grid logic) paired with Chakra Petch for body and Space Mono for code-flavored labels and tabular data. The palette pivots on a deep cosmic navy (`#0F1B3D` / `#0A0E27`) lit by three saturated neons — cyan, hot pink, and a high-key yellow — with a soft lavender pastel for warm reprieves. Depth is built from stacked hard offset shadows in 4px increments (the pixel unit), CRT scanlines, atmospheric grain, vignettes, and static seeded starfields. The effect sits between an arcade cabinet and a Tron-era boardroom — unmistakably digital, intentionally lo-fi, and engineered to feel as if it just booted up.

colors:
  dark-void: "#0A0E27"
  deep-navy: "#0F1B3D"
  neon-cyan: "#5EDCF4"
  neon-pink: "#F0A6CA"
  neon-yellow: "#F4D03F"
  soft-lavender: "#E2D5F2"
  white: "#FFFFFF"

shadows:
  pixel-stack-cyan-yellow: "4px 0 0 0 {colors.deep-navy}, 0 4px 0 0 {colors.deep-navy}, 4px 4px 0 0 {colors.deep-navy}, 8px 4px 0 0 {colors.neon-yellow}, 4px 8px 0 0 {colors.neon-yellow}, 8px 8px 0 0 {colors.neon-yellow}"
  pixel-stack-pink-cyan: "4px 0 0 0 {colors.deep-navy}, 0 4px 0 0 {colors.deep-navy}, 4px 4px 0 0 {colors.deep-navy}, 8px 4px 0 0 {colors.neon-cyan}, 4px 8px 0 0 {colors.neon-cyan}, 8px 8px 0 0 {colors.neon-cyan}"
  pixel-l-shape: "4px 0 0 0 {colors.deep-navy}, 0 4px 0 0 {colors.deep-navy}, 4px 4px 0 0 {colors.deep-navy}"
  pixel-text-shadow: "4px 4px 0 {colors.neon-yellow}, 8px 8px 0 {colors.deep-navy}"
  pixel-text-shadow-small: "3px 3px 0 {colors.deep-navy}"
  card-offset: "6px 6px 0 rgba(15, 27, 61, 0.15)"
  card-featured: "8px 8px 0 {colors.neon-yellow}"

typography:
  pixel-hero:
    fontFamily: "'Tektur', cursive"
    fontSize: "128px"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: 0.04em
  display:
    fontFamily: "'Tektur', cursive"
    fontSize: "64px"
    fontWeight: 700
    lineHeight: 1.15
  headline:
    fontFamily: "'Tektur', cursive"
    fontSize: "45px"
    fontWeight: 700
    lineHeight: 1.15
  subhead:
    fontFamily: "'Tektur', cursive"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.15
  stat-number:
    fontFamily: "'Tektur', cursive"
    fontSize: "56px"
    fontWeight: 900
    lineHeight: 1
  body:
    fontFamily: "'Chakra Petch', sans-serif"
    fontSize: "18.4px"
    fontWeight: 400
    lineHeight: 1.7
  hero-tagline:
    fontFamily: "'Chakra Petch', sans-serif"
    fontSize: "19.2px"
    fontWeight: 400
    lineHeight: 1.8
  quote-body:
    fontFamily: "'Chakra Petch', sans-serif"
    fontSize: "25.6px"
    fontWeight: 500
    lineHeight: 1.8
  label-pill:
    fontFamily: "'Space Mono', monospace"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.2em
    textTransform: uppercase
  label-eyebrow:
    fontFamily: "'Space Mono', monospace"
    fontSize: 13.6px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.3em
    textTransform: uppercase
  badge:
    fontFamily: "'Space Mono', monospace"
    fontSize: 11.2px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.1em
    textTransform: uppercase
  chart-value:
    fontFamily: "'Space Mono', monospace"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1
  chart-label:
    fontFamily: "'Space Mono', monospace"
    fontSize: 11.2px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.05em
  date-chip:
    fontFamily: "'Space Mono', monospace"
    fontSize: 11.2px
    fontWeight: 400
    lineHeight: 1
  counter:
    fontFamily: "'Space Mono', monospace"
    fontSize: 12.8px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.15em

spacing:
  pixel-unit: 4px
  pad-slide-y: "32.4px"
  pad-slide-x: "76.8px"
  pad-card-lg: "32px 40px"
  pad-card-md: "28px"
  pad-card-sm: "16px 20px"
  gap-grid-lg: 32px
  gap-grid-md: 24px
  gap-grid-sm: 16px
  content-max-width: 1200px

canvas:
  width: 1920px
  height: 1080px

components:
  label-pill:
    background: "{colors.deep-navy}"
    color: "{colors.neon-yellow}"
    padding: "6px 14px"
    fontSize: 12px
    fontWeight: 700
    letterSpacing: 0.2em
    textTransform: uppercase
    fontFamily: "'Space Mono', monospace"
    description: "Treatment for a supplied section tag. Default fill is deep-navy with neon-yellow text. Variant fills swap text color so the pill stays legible (e.g., navy bg with cyan text, navy bg with pink text)."
  pixel-button:
    background: "{colors.neon-cyan}"
    color: "{colors.deep-navy}"
    padding: "16px 36px"
    fontFamily: "'Tektur', cursive"
    fontWeight: 700
    letterSpacing: 0.08em
    textTransform: uppercase
    boxShadow: "{shadows.pixel-stack-cyan-yellow}"
    description: "The signature stacked-shadow CTA. The pink variant swaps cyan body for pink and yellow shadow halo for cyan halo."
  pixel-corner-bracket:
    width: 24px
    height: 24px
    borderWidth: 4px
    description: "Two outward-facing L-shapes (top-left + bottom-right) bracketing a region. Default color is neon-cyan; yellow and pink variants exist. Sits 8px outside the bracketed element."
  feature-card:
    background: "rgba(255, 255, 255, 0.15)"
    backdropFilter: "blur(8px)"
    padding: "32px 24px"
    border: "2px solid rgba(15, 27, 61, 0.2)"
    description: "Frosted-glass card with inset navy L-brackets (top-left + bottom-right) replacing rounded corners. Used on light-surface slides."
  stat-block:
    background: "rgba(94, 220, 244, 0.08)"
    border: "2px solid rgba(94, 220, 244, 0.2)"
    padding: "32px 16px"
    description: "Cyan-tinted glass stat tile with cyan L-bracket accents at opposite corners. Used on dark surfaces. Stat numeral uses the pixel-text-shadow-small treatment."
  bar-track-light:
    height: 32px
    background: "rgba(15, 27, 61, 0.1)"
    description: "Horizontal track for hbar charts on light surfaces. Fill is solid navy/cyan/pink with a yellow offset shadow."
  bar-vertical:
    background: "{colors.neon-cyan}"
    boxShadow: "{shadows.pixel-l-shape}"
    description: "Vertical chart bar with three-piece navy L-shadow. Color cycles cyan → pink → yellow."
  timeline-node:
    width: 24px
    height: 24px
    background: "{colors.neon-cyan}"
    border: "4px solid {colors.deep-navy}"
    description: "Square pixel node on timeline rails. Active state swaps fill to neon-yellow."
  timeline-rail:
    width: 4px
    background: "repeating-linear-gradient(to bottom, {colors.deep-navy} 0px, {colors.deep-navy} 16px, transparent 16px, transparent 24px)"
    description: "Dashed pixel rail running between timeline nodes."
  date-chip:
    background: "{colors.deep-navy}"
    color: "{colors.neon-cyan}"
    padding: "2px 10px"
    fontFamily: "'Space Mono', monospace"
    fontSize: 11.2px
    description: "Small inline date marker on timeline events."
  hero-badge:
    border: "2px solid {colors.neon-yellow}"
    color: "{colors.neon-yellow}"
    padding: "8px 16px"
    fontFamily: "'Space Mono', monospace"
    fontSize: 11.2px
    letterSpacing: 0.1em
    textTransform: uppercase
    description: "Outline-only chip used in clusters under hero headlines."
  bg-grid:
    backgroundColor: "{colors.dark-void}"
    backgroundImage: "linear-gradient(rgba(94, 220, 244, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(94, 220, 244, 0.07) 1px, transparent 1px)"
    backgroundSize: "40px 40px"
    description: "40px cyan-on-navy grid wallpaper for dark surfaces. Pink, cyan, and lavender variants invert the relationship (colored ground with low-opacity navy grid lines)."
  scanlines:
    background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(10, 14, 39, 0.04) 2px, rgba(10, 14, 39, 0.04) 4px)"
    mixBlendMode: multiply
    description: "Horizontal CRT scanline overlay applied in its own background element at z-index 2, below content. Tune intensity for reading."
  grain:
    opacity: 0.035
    description: "SVG fractal-noise grain layer applied in its own background element at z-index 1, below content."
  crt-glow:
    background: "radial-gradient(ellipse at center, transparent 50%, rgba(10, 14, 39, 0.25) 100%)"
    description: "Radial vignette that darkens the corners to mimic a CRT bulge. Applied to dark-surface slides in a separate background element at z-index 3."
  starfield:
    description: "Container of small 4-6px colored squares (cyan, yellow, pink) positioned absolutely with a 3s twinkle keyframe. Lives on dark surfaces only."
  pixel-particles:
    description: "Floating 8px colored squares with an 8s float keyframe. Decorative ambient layer on hero and CTA-type surfaces."
  nav-dot:
    width: 12px
    height: 12px
    border: "2px solid {colors.neon-cyan}"
    background: transparent
    description: "Hollow square pip with a 2px inset cyan fill on active state. Fixed vertical rail at right edge."
  quote-line:
    width: 60px
    height: 4px
    background: "{colors.neon-yellow}"
    boxShadow: "4px 4px 0 {colors.deep-navy}"
    description: "Short yellow rule with navy offset shadow, used as a separator under quote bodies."
---

## Stage and Content Contract

This recipe supplies visual decisions for Deck Studio's fixed **1920×1080** stage. Use the canonical [runtime](../../../runtime/) and [runtime contract](../../../references/deck-runtime.md) for stage scaling, navigation, focus, capture and export. Do not create a second scaler, slide controller, keyboard handler or print engine. The whole stage scales uniformly, including on phones; the composition does not internally reflow with the browser viewport.

All dimensions below are stage-space authoring values. A range is a choice to resolve while composing, not permission for live viewport-dependent layout. Body and data text must remain readable in the intended presentation or reading setting: enlarge and recompose, split while retaining all locked material, or choose another system when the content does not fit. Never clip, scroll, hide, omit or invent material to complete a layout. Visible labels, metrics, attribution, ordinals, emphasis and status come from the content lock; wordless geometry may supply atmosphere.

## Overview

8-Bit Orbit is a **retro-futuristic pixel-art presentation system**. Its foundational premise is the **4-pixel unit**: major spacing, brackets and primary shadows follow 4px steps, with documented 2px borders, 3px numeral shadows and 6px card-shadow optical exceptions. Layouts feel as if they were rasterized on an old CRT and dragged into HTML — and atmospheric overlays (scanlines, grain, vignette glow, static seeded starfields) reinforce the illusion on every surface.

The type stack is three faces working in concert. **Tektur** is the display face — a chunky, geometric, semi-pixelated grotesque that carries headlines, hero text, stat numerals, and any text that needs to feel like it was drawn on the pixel grid. **Chakra Petch** is the body face — a humanist sans with subtle geometric cuts that reads cleanly at small sizes and avoids fighting Tektur for attention. **Space Mono** is the system face — used exclusively for labels, captions, badges, chart values, dates, and counters. The mono treatment + wide tracking on these elements makes them feel like HUD readouts, not editorial captions.

The palette is built around **deep navy as ground** (`{colors.dark-void}` and `{colors.deep-navy}`) lit by **three saturated neons** — cyan, hot pink, yellow — plus a soft lavender pastel. Surfaces alternate: a dark navy surface (cyan grid wallpaper, white text, neon accents glowing in front) followed by a colored surface (pink, cyan, or lavender ground with navy text and navy grid lines etched at low opacity). The neons never appear as body text — they are reserved for headlines, stat numerals, accent rules, and label fills. The intended result is luminous rather than printed; inspect actual text contrast after translucency, grid and shadows are composed.

Depth is the system's signature trick: **stacked hard offset shadows in the pixel unit**. The flagship pattern is a six-piece shadow on buttons — three navy offsets stepping down-right at 4px, then three colored halo offsets stepping further at 8px. Hero text gets a two-layer text shadow (yellow at +4/+4, navy at +8/+8). Cards get either a 6px navy box shadow or an 8px yellow box shadow on the featured tier. Every shadow is hard-edged and zero-blur; 3px and 6px offsets are deliberate optical exceptions to the main 4px rhythm. Atmospheric depth comes from the always-on **scanlines + grain + CRT glow** overlay trio that subtly modulates every surface.

**Density philosophy: moderately dense, atmospherically loaded.** The etched grid and stepped shadows supply the primary arcade context. Use restrained grain, vignette or star squares where they improve that context without dirtying text. Within content regions, however, breathing room matters: cards are widely spaced (24-32px gaps), stat tiles get heavy internal padding, and hero text is allowed to dominate. A typical slide carries one display moment + a small constellation of supporting elements (badges, labels, a chart, or a small grid), all sitting on a fully decorated atmospheric background.

**Key Characteristics:**
- Three-font stack: Tektur (display), Chakra Petch (body), Space Mono (HUD/labels) — never substitute, never mix outside their roles.
- Navy ground (`{colors.dark-void}` / `{colors.deep-navy}`) alternates with colored-grid surfaces (pink, cyan, lavender) — both carry the 40px etched grid.
- Three neons (cyan, pink, yellow) reserved for display, stats, rules, and label fills — never for body text.
- The dominant 4px rhythm includes explicit optical exceptions: borders 2-4px, shadow offsets 4px / 8px, corner brackets 24×24 with 4px stroke.
- Stacked hard offset shadows are the system's depth language — never blurred, never colored on text shadows except in the yellow→navy cascade.
- Every slide carries the persistent scanline + grain + CRT-vignette trio at z-index 1-51.
- L-shaped corner brackets (`{components.pixel-corner-bracket}`) replace rounded corners and frame regions, cards, and stat tiles.
- A monospace label pill (`{components.label-pill}`) can carry a supplied eyebrow — navy fill, neon text, 0.2em tracking, uppercase.
- Static seeded starfields and floating particle squares wallpaper dark surfaces — ambient, not decorative.

## Colors

### Palette

- **Dark Void** (`{colors.dark-void}` — `#0A0E27`): The deepest ground, used on `<body>` and as the base for dark-grid surfaces. Reads as black-with-blue-bias under the CRT vignette.
- **Deep Navy** (`{colors.deep-navy}` — `#0F1B3D`): The structural color — all shadow stacks, label fills, dark cards, button text on neon surfaces, and chart bar text. Slightly warmer than the void; the two read as ground and figure when stacked.
- **Neon Cyan** (`{colors.neon-cyan}` — `#5EDCF4`): The system's primary glow. Used for headlines on dark surfaces, primary button fill, stat numerals, primary chart bars, timeline nodes, navigation dots, corner brackets, and grid lines on dark surfaces (at 7% opacity).
- **Neon Pink** (`{colors.neon-pink}` — `#F0A6CA`): The warm accent. Used as a colored surface ground (40px navy-on-pink grid), secondary button fill, secondary chart bars, mouth detail in pixel avatars, and tertiary corner brackets.
- **Neon Yellow** (`{colors.neon-yellow}` — `#F4D03F`): The high-key alert color. Used in shadow halos behind buttons and on featured tier cards, as the active timeline-node fill, on hero badges, in label-pill text variants, in the quote-line, and as Tektur text-shadow layer 1.
- **Soft Lavender** (`{colors.soft-lavender}` — `#E2D5F2`): The calm pastel surface — used as ground for slides that need a softer reprieve from the neon-on-navy intensity. Carries the same etched-navy grid wallpaper as the other colored surfaces.
- **White** (`{colors.white}` — `#FFFFFF`): Text color on dark/neon surfaces only. Never used as a slide background.

### Defaults

- **Default surface background**: `{colors.dark-void}` with the 40px cyan grid (`{components.bg-grid}`). Place restrained scanlines, grain and CRT glow in the background below reading content.
- **Default headline color on dark surfaces**: `{colors.neon-cyan}`, with the `{shadows.pixel-text-shadow-small}` or `{shadows.pixel-text-shadow}` treatment for hero-scale text.
- **Default headline color on colored grids (pink/cyan/lavender)**: `{colors.deep-navy}` — neon text becomes illegible on neon grounds.
- **Default body text color on dark surfaces**: `rgba(255, 255, 255, 0.7)` — softened white, not pure white.
- **Default body text color on colored grids**: `rgba(15, 27, 61, 0.75)` — softened navy.
- **Default label-pill fill**: `{colors.deep-navy}` with `{colors.neon-yellow}` text. On colored grids the text can swap to cyan or pink as long as contrast against navy holds.
- **Default accent color for callouts and stat numerals**: `{colors.neon-cyan}`.
- **Default chart palette order**: cyan → pink → yellow (in that order across series).
- **Default corner bracket color**: `{colors.neon-cyan}`. Yellow and pink variants exist for thematic accents.

When a slide needs to feel softer or warmer, switch the colored grid from cyan-on-navy (default) to navy-on-pink, navy-on-cyan, or navy-on-lavender — the structural relationship inverts (grid lines become navy at low opacity) but the typographic rules stay the same.

## Typography

### Font Family
The system runs three faces, each locked to its role.

**Tektur** is the display face — a wide-bodied, semi-geometric grotesque with subtle pixel-grid cuts. Used for every hero title, headline, stat numeral, quote mark, and large numeral. Tektur's chunky personality is what makes the system feel arcade-native; replacing it with Inter or Space Grotesk breaks the entire aesthetic.

**Chakra Petch** is the body face — a humanist sans with mild geometric/squared character that reads cleanly at 14-22px and has enough personality to sit next to Tektur without disappearing. Used for paragraphs, hero taglines, quote bodies, and any longer-form prose.

**Space Mono** is the HUD face — a monospace used exclusively for labels, badges, chart values/axes, page counters, date chips, and any element that should feel like a system readout. The mono + wide-tracked uppercase combination is the system's "interface" voice.

Never use Tektur for body, never use Chakra Petch for chrome/HUD, never use Space Mono for headlines. The three-role separation is the typographic structure.

### Typography Scale

| Token | Size (clamp) | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.pixel-hero}` | 48–128px | Tektur | 900 | Hero or cover display title — always carries the two-layer text shadow |
| `{typography.display}` | 32–64px | Tektur | 700 | Large section opener |
| `{typography.headline}` | 24–45px | Tektur | 700 | Primary section headline |
| `{typography.subhead}` | 17.6–24px | Tektur | 700 | Region-level subheading or card title |
| `{typography.stat-number}` | 32–56px | Tektur | 900 | Stat tile numeral — pairs with the small text shadow |
| `{typography.body}` | 14.4–18.4px | Chakra Petch | 400 | Paragraph body |
| `{typography.hero-tagline}` | 14.4–19.2px | Chakra Petch | 400 | Hero subtitle / lede paragraph below a pixel-hero |
| `{typography.quote-body}` | 17.6–25.6px | Chakra Petch | 500 | Quote text |
| `{typography.label-pill}` | 12px | Space Mono | 700 | Text inside the navy label pill |
| `{typography.label-eyebrow}` | 13.6px | Space Mono | 400 | Standalone uppercase eyebrow above a headline (heavier tracking than the pill) |
| `{typography.badge}` | 11.2px | Space Mono | 400 | Outline-only hero badge text |
| `{typography.chart-value}` | 12px | Space Mono | 700 | Chart bar value numerals |
| `{typography.chart-label}` | 11.2px | Space Mono | 400 | Chart axis or category labels |
| `{typography.date-chip}` | 11.2px | Space Mono | 400 | Date marker on timeline events |
| `{typography.counter}` | 12.8px | Space Mono | 400 | Persistent slide counter (NN / NN) |

### Defaults

- **Default size for a hero or cover title**: `{typography.pixel-hero}` (48–128px clamp) — always Tektur weight 900 with the two-layer text shadow.
- **Default size for a primary section headline**: `{typography.headline}` (24–45px clamp) — Tektur weight 700.
- **Default size for paragraph body**: `{typography.body}` (14.4–18.4px clamp) — Chakra Petch weight 400.
- **Default size for a stat numeral**: `{typography.stat-number}` (32–56px clamp) — Tektur weight 900, always carries the 3px navy text shadow.
- **Default size for an eyebrow label**: `{typography.label-pill}` (12px) housed in the navy pill — or `{typography.label-eyebrow}` (13.6px) if the eyebrow sits standalone.
- **Default tracking for any Space Mono label**: 0.1em (badges) to 0.3em (eyebrow labels). Mono without wide tracking reads as code, not HUD.
- **Default body weight**: 400 for Chakra Petch, 500 for quote bodies.
- **Default display weight**: 700 for headlines, 900 for hero scale and stat numerals.

When unsure which display token to reach for, default to `{typography.headline}` — it's the section-level workhorse. Reserve `{typography.pixel-hero}` for cover and CTA moments only.

### Signature Treatments

These treatments are **non-optional whenever the corresponding element type is used**:

- **Every pixel-hero element carries the stacked text-shadow.** The pattern is `4px 4px 0 {colors.neon-yellow}, 8px 8px 0 {colors.deep-navy}` on cyan text. A pixel-hero element without this two-layer cascade reads as untreated display type and breaks the arcade voice.
- **Every stat numeral carries the small text-shadow.** The pattern is `3px 3px 0 {colors.deep-navy}` on cyan text. Stat numerals on dark surfaces need this shadow to feel illuminated; without it they read flat.
- **Space Mono labels may use uppercase with wide tracking where locked spelling permits** — minimum 0.05em for chart labels, 0.08–0.2em for pills and badges, 0.3em for standalone eyebrow labels. Sentence-case mono does not exist in this system.
- **Every Tektur display element keeps its native letter-spacing or slight positive (+0.04em on hero scale).** Tektur is wide-bodied by design — adding negative tracking compresses it into something that no longer reads as the same face.
- **Every Chakra Petch body block uses line-height ≥ 1.6.** The face is dense; tighter line-height on body bleeds into unreadable.
- **Label pills use Space Mono with 0.2em letter-spacing.** Size them for the intended viewing distance, widening or wrapping their container before reducing type.
- **Every chart bar value / axis label uses Space Mono.** Numerical chrome is mono, never Tektur or Chakra Petch.

### Typography Principles

The voice contrast is **chunky display ↔ humanist body ↔ wide-tracked mono chrome**. Switching any of the three roles to a different face flattens the system into a generic dark-mode aesthetic. Italic is never used in display or body — the only italic that appears anywhere is implicit in the slight tilt on pixel-art decorative elements.

Tektur should always feel **planted** — left-aligned, generous line-height, never centered for body-length runs (centering is permitted on hero and CTA titles only). Chakra Petch should always feel **calm** — left-aligned by default, no all-caps treatment, no letter-spacing.

## Layout

### Canvas System
Compose inside the canonical 1920×1080 stage. Keep the recipe's internal grid, margins and visual layers in stage coordinates. The runtime owns the outer viewport fit and slide visibility; recipe CSS must not replace its container positioning or slide-state classes. Reserve space for actual runtime controls where present and never reproduce them as painted buttons or invented hints.

### Pixel Unit
A 4px rhythm organizes major dimensions: 24×24 corner brackets with 4px stroke, a 40px etched grid and padding in 16/24/32/48px steps. Thin 2px borders, the 3px numeral shadow and the 6px card offset are explicit optical exceptions. Preserve this stepped character without claiming every value is divisible by four.

### Persistent Chrome
Style actual shared-runtime controls with square cyan outlines and Space Mono where the supported surface permits it. A 12×12 square with an 8×8 inset can express the real current slide, and a zero-padded counter may use a navy pill. Do not paint a separate dot rail, duplicate counter or hardcoded keyboard hint; control text and behavior must match the runtime.

### Atmospheric Overlay Stack
Use an isolated background wrapper beneath content: surface/grid at z-index 0, restrained grain at 1, scanlines at 2 and dark-surface vignette at 3; put reading content above the wrapper at 10. Separate elements avoid competing ::after ownership. All atmospheric elements use pointer-events:none. Static seeded star squares may sit within the same background. The grid and hard shadows carry the arcade identity even where grain or scanlines must be reduced to keep text clean.

## Depth and Elevation

### Stacked Hard Offset Shadow (Signature)
The system uses **stacked, multi-step hard offset shadows** in the 4px pixel unit. Every shadow value is composed in one of three patterns:

- **Three-step navy L-shape** (`{shadows.pixel-l-shape}`) — three offsets at `4px 0`, `0 4px`, `4px 4px` in deep-navy, zero blur. Used on chart bars and small elevated chrome to suggest a single-layer drop.
- **Six-step button cascade** (`{shadows.pixel-stack-cyan-yellow}` / `{shadows.pixel-stack-pink-cyan}`) — three navy offsets at 4px stepping then three colored halo offsets at 8px stepping behind. Creates a two-layer pixel-bevel effect. Used exclusively on `{components.pixel-button}`.
- **Two-layer text-shadow** (`{shadows.pixel-text-shadow}` / `{shadows.pixel-text-shadow-small}`) — yellow layer at +4/+4 then navy layer at +8/+8 (or just navy at +3/+3 for stat-scale numerals). Used on every Tektur display element.

All shadows are zero-blur, hard-edged, locked to the pixel unit. A blurred drop shadow does not exist anywhere in the system.

### Card Shadows
Two simpler patterns serve cards:
- `{shadows.card-offset}` = `6px 6px 0 rgba(15, 27, 61, 0.15)` — soft navy offset for non-featured tier cards on light surfaces.
- `{shadows.card-featured}` = `8px 8px 0 {colors.neon-yellow}` — neon-yellow offset for featured tier cards, paired with a `-12px` translateY lift.

### Corner Brackets as Depth
The L-shaped corner brackets (`{components.pixel-corner-bracket}`) replace traditional border treatments on regions and cards. Two brackets at opposite corners imply a frame without enclosing it — the eye fills in the missing edges. On stat blocks and feature cards, brackets sit inset at `top: -2px / left: -2px` and `bottom: -2px / right: -2px` so they break the cell edge slightly, reinforcing the pixel-bevel feel.

### Atmospheric Depth
The scanline + grain + CRT-vignette stack provides ambient depth on every surface without requiring shadow on individual elements. Static seeded starfields and floating particles layer additional spatial cues behind content. None of these are decorative add-ons — they are core to the depth perception of the system.

## Shapes and Treatment

### Border Radius
Effectively zero. The only round shape that appears anywhere is the donut-style nav dot inner-fill (which is still a square in this system — the nav dots are square pips, not circles). Rounded buttons, rounded cards, or rounded pill chips break the pixel-art aesthetic immediately.

The pixel-face avatar zone uses square eyes and a rectangular mouth — anatomy rendered in pixels, not curves.

### Border Weights
- **2px solid** — used on feature-card outlines, hero badges, nav dots, stat-block frames, chart bars (inline edges).
- **3px stroke** — used for chart axes inside SVG charts (deep-navy).
- **4px solid** — used on corner brackets, timeline node borders, the quote-line, and the inner pixel-bevel of buttons.

Borders are always solid, always navy or neon, never dashed except for the timeline rail (`{components.timeline-rail}`) which is intentionally rendered as a 16px-on, 8px-off repeating linear gradient to mimic a pixel-dashed line.

### Decorative Element Types

**Pixel corner bracket** — Two outward L-shapes (top-left + bottom-right) bracketing a region. 24×24 with 4px stroke. Default color is cyan; yellow and pink variants exist. The bracket pattern is the system's most distinctive non-typographic mark.

**Label pill** — Navy rectangle with neon-yellow Space Mono text at 12px / 0.2em. A section eyebrow when one is supplied. Variants flip the text color to cyan or pink while keeping the navy fill.

**Hero badge** — Outline-only 2px yellow border with yellow Space Mono text. Appears in clusters under hero titles as feature tags.

**Stat block** — Cyan-tinted glass tile (8% cyan fill, 20% cyan border) with cyan corner brackets at top-left and bottom-right. Holds a large stat numeral over a Space Mono pink label.

**Feature card** — Frosted-glass white card (15% white fill, blur) with navy corner brackets at opposite corners. Used on colored-grid surfaces.

**Pixel button** — Cyan rectangle with the six-step stacked shadow cascade. For an actual action, hover/press may translate +2/+2 and collapse the shadow to a 4-step cascade. Static callouts have no button semantics or hover affordance.

**Quote-line** — A 60×4 yellow rectangle with a 4×4 navy offset shadow. Used as a separator beneath quote bodies.

**Timeline node** — 24×24 cyan square with a 4px navy border, positioned on a dashed navy rail. Active state swaps fill to yellow.

**Date chip** — Inline 2px-padded navy pill with cyan Space Mono text, used to mark timeline events.

**Pixel face** — A 120×120 grouping of square "facial features" (cyan eyes, pink mouth) rendered as absolutely positioned divs inside a navy avatar zone. Functions as both a friendly mascot and a system-signature decorative module.

**Tier card** — White rectangle, 6px navy offset shadow. Featured tier swaps fill to deep-navy and shadow to 8px yellow, with a `-12px` translateY lift. Tier features use a `+` ::before glyph in cyan instead of standard bullets.

**Pixel landscape** — A row of variable-height navy mountains at the bottom of CTA-class surfaces, opacity 0.3. Pure decoration suggesting an arcade horizon.

## Do's and Don'ts

### Do

- Keep the etched-grid identity and tune background atmosphere to preserve clean reading surfaces.
- Use `{colors.neon-cyan}` as the default headline color on dark surfaces and `{colors.deep-navy}` as the default headline color on colored grids (pink/cyan/lavender).
- Apply `{shadows.pixel-text-shadow}` to every pixel-hero element and `{shadows.pixel-text-shadow-small}` to every stat numeral. Tektur display type without its text-shadow reads flat.
- Use the 4px rhythm for padding, brackets and primary shadows; retain the explicit 2px borders, 3px numeral shadow and 6px card-shadow exceptions.
- Use Tektur for display, Chakra Petch for body, Space Mono for chrome — exclusively. Cross-mixing the three voices flattens the system.
- Wrap eyebrows in the `{components.label-pill}` (navy bg, yellow Space Mono text, 0.2em tracking, uppercase) as the universal section tag.
- Pair the navy ground with at least one neon glow per region — text, chart bar, corner bracket, or button shadow halo. Pure navy without a neon accent reads as dead screen.
- Layer static seeded starfields and pixel-particle floaters on dark hero and CTA surfaces. The motion is part of the atmosphere.
- Render charts with cyan → pink → yellow series order and Space Mono numerals/labels. The neon trio is the chart palette.
- Bracket cards and stat tiles with the L-shaped corner brackets at opposite corners instead of fully outlining them. The implied frame is the system's signature card treatment.

### Don't

- Don't substitute fonts. Tektur, Chakra Petch, and Space Mono are the three voices — replacing any of them with Inter, Roboto, or Space Grotesk collapses the system.
- Don't round any corner. The pixel aesthetic depends on square edges. Border-radius is reserved for SVG donut chart geometry only.
- Don't blur any shadow. Every shadow is hard-edged at zero blur. `0 4px 12px rgba(0,0,0,0.1)` does not exist here.
- Don't place neon text on neon surfaces. Cyan headlines on the pink grid become illegible — switch to deep-navy on colored grounds.
- Don't use Tektur in sentence-case body runs or Chakra Petch in chrome/labels. Each face has a single role.
- Don't introduce a fourth neon. The palette is cyan + pink + yellow + lavender pastel. Adding green or orange breaks the curated neon trio.
- Don't omit the atmospheric overlay stack on any slide, even chart-heavy or table-heavy slides. The overlays are non-negotiable.
- Don't use uppercase Chakra Petch body text. Body always sentence-case; uppercase is reserved for Space Mono and Tektur display.
- Don't drop the navy label pill in favor of a plain text eyebrow. The pill is the most recognizable small chrome in the system.
- Don't shadow text or chrome with off-axis offsets. Every shadow steps down-right in 4px increments — left or upward offsets do not exist.

## Stage Adaptation and Capture

Resolve the layout at 1920×1080, then let the shared runtime scale the entire stage. Narrow screens retain the composition, with letterboxing as necessary; there are no recipe-specific mobile stacks, font clamps, swipe handlers or slide transitions. An alternate reading composition is an authored artifact choice, not an automatic breakpoint.

Use the shared renderer and exporter. Inspect complete slides, long labels, dense tables, and navigation with the actual content and fonts. Meaningful data must be at its final value at capture time; no count-up or zero-to-value entrance animation may substitute for the data. Decorative motion, when retained, needs a deterministic static capture and reduced-motion treatment. Controls are real shared-runtime controls only; static callouts must not claim interactivity.

## CJK & International Content

### Role-Preserving Pairing

| Role | Candidate Chinese face | Requested weight |
|---|---|---|
| Display | Noto Sans SC | 900 |
| Body | Noto Sans SC | 400 |
| Labels | Noto Sans SC | 500 |

These are design candidates, not claims of installed assets, glyph coverage, equivalent metrics or available font styles. Select the correct language/region family for Simplified Chinese, Traditional Chinese, Japanese or Korean, and verify the actual source strings and required punctuation against the supplied font files. Localize licensed assets for reproducible output under the shared rendering contract; do not assume a successful remote CSS request means the font rendered.

### Mixed-Script Implementation

Use role-specific stacks and explicit language spans when a weight or style differs by script. A fallback family chooses glyphs, not a different weight. Keep Latin families in their original roles where desired, and set `font-synthesis: none` on the affected runs to expose missing bold or italic instead of silently fabricating it. Check full names, numbers, symbols and mixed-script baselines, not just a sample Hanzi. Retain supplied punctuation, capitalization and spacing; any copy edit that changes the lock returns to intake.

Start Chinese body leading around 1.7 and display leading around 1.1–1.2, then inspect the actual strings at stage size. Reset wide Latin tracking on CJK runs and apply case styling only where the source language and locked spelling permit it. Widen or recompose labels before making them smaller. Preserve all source qualifications when a line wraps; splitting into additional slides is preferable to squeezing the type.

### System-Specific Adaptation

Tektur's pixel-cut silhouette and Space Mono's fixed-width HUD are not reproduced by this pairing. Preserve the arcade register through 4px stepping, L-brackets, etched grids and hard shadows rather than claiming equivalent glyphs. Give Chinese HUD labels wider cells and keep their reading size; do not shrink them to mimic the Latin pill width. Keep Space Mono on actual Latin identifiers and digits when useful, with explicit language spans for the adjacent Chinese text. Check numeral alignment with the selected assets; a fallback sans is not a monospace. Wide Hanzi display strokes can crowd the two-layer shadow: test the full headline, shorten neither it nor its qualification, and recompose into another slide when needed.

### Asset and Emphasis Limits

Inspect requested weights and styles in the actual font asset before using them. Optical size, oblique style and weight are different properties; one does not supply another. When a face lacks a needed treatment, select a verified asset or an approved alternative visual treatment while preserving the same audience-visible emphasis. Test final composed text against its background; palette tokens and font family names are not evidence of legibility.

## Iteration Guide

1. Any new slide gets the full atmospheric overlay trio (scanlines + grain + crt-glow on dark surfaces, scanlines + grain on colored surfaces) and a 40px etched grid surface. Don't skip the overlays.
2. Any new display element uses Tektur. Any new body element uses Chakra Petch. Any new label, badge, counter, or chart value uses Space Mono. Never cross the role boundaries.
3. Any new headline gets `{colors.neon-cyan}` on dark surfaces or `{colors.deep-navy}` on colored grids — both with the appropriate Tektur weight and (for hero scale) the stacked text-shadow.
4. Any new eyebrow uses the `{components.label-pill}` — navy fill, neon-yellow Space Mono text at 12px / 0.2em / uppercase. Don't substitute a plain h-tag.
5. Any new card or region gets the L-shaped corner brackets at opposite corners (top-left + bottom-right) instead of a full outline. The implied frame is the system's signature.
6. Any new measurement snaps to the 4px pixel unit. Borders 2-4px, shadow offsets 4px / 8px, corner brackets 24px, grid 40px. Off-grid values feel wrong.
7. Any new shadow is hard-edged at zero blur. For buttons use the six-step cascade; for cards use 6px navy or 8px yellow; for text use the two-layer cascade.
8. Any new chart cycles cyan → pink → yellow in series order. Numerical labels and axis labels are always Space Mono.
9. If a surface needs to feel warmer or softer, switch to the pink, cyan, or lavender etched grid variant — but keep all typographic rules intact (navy headlines, softened-navy body).
10. Animated elements (starfield, particles, chart bar grow, counter rollup) should respect `prefers-reduced-motion`. Atmospheric overlays (scanlines, grain, vignette) are not animated and stay on always.

## Authoring Limits

- Tektur, Chakra Petch and Space Mono assets must supply the requested glyphs and weights; inspect the final rendered faces rather than relying on fallback names.
- Static seeded star positions preserve the atmosphere reproducibly. Do not generate a fresh random field on every capture or use count-up effects on figures.
- Map bars and timeline nodes from actual data. A featured tier, active node or highlighted badge requires an established meaning; equal alternatives start with equal treatment.
- The CRT vignette uses dark-navy gradient stops. Tune intensity against the actual text, and keep grain, scanlines and stars in a separate background wrapper below content.
- Corner brackets remain 24×24 stage pixels with a 4px stroke. The dominant 4px rhythm permits the documented 2px border, 3px numeral shadow and 6px card-shadow optical exceptions.
- Use normal pointer and text-selection semantics. Apply a button press treatment only to an actual enabled action; the shared runtime owns navigation and counters.
