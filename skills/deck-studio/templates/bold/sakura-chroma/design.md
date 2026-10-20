---
version: alpha
name: Sakura Chroma
description: "A cassette-package editorial system on warm cream paper with a six-color primary palette and warm-brown ink. Display type runs in Big Shoulders Display (condensed industrial display sans at weight 900); body in Albert Sans; tabular and tag content in JetBrains Mono; Noto Sans JP when genuine Japanese text requires it. The aesthetic borrows from 1970s consumer cassette packaging, Japanese print catalogues, and lo-fi product zines: petal-cluster blob clusters, diagonal multi-color ribbon bands, 32-vertex / 16-tip starburst seals, red rectangular stamps, and tracked uppercase micro-labels. The effect is hand-curated industrial editorial — warm but disciplined, playful but tightly typeset, with the cassette as its visual metaphor."

colors:
  paper: "#F1E6CB"
  paper-dk: "#E5D6B0"
  ink: "#3A2516"
  red: "#E5392A"
  pink: "#E54489"
  orange: "#F09131"
  green: "#3D9F47"
  blue: "#3F8BC4"
  yellow: "#F0BC2A"

color-aliases:
  line: ink

typography:
  disp-hero:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "237.6px"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: -0.025em
  disp-statement:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "151.2px"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: -0.022em
  disp-title:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "151.2px"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: -0.022em
  disp-lockup:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "118.8px"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: -0.015em
  disp-section:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "97.2px"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: -0.018em
  disp-quote:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "97.2px"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: -0.018em
  disp-quote-lg:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "113.4px"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: -0.018em
  disp-brand:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "56px"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: -0.02em
  disp-card-name:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "48px"
    fontWeight: 900
    lineHeight: 0.94
    letterSpacing: -0.012em
  num-hero:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "194.4px"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: -0.025em
  num-md:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "118.8px"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: -0.02em
  ttl-row:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.005em
  body:
    fontFamily: "'Albert Sans', sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: "'Albert Sans', sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.4
  body-emphasis:
    fontFamily: "'Albert Sans', sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.4
  micro:
    fontFamily: "'Albert Sans', sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.16em
    textTransform: uppercase
  micro-lg:
    fontFamily: "'Albert Sans', sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.2em
    textTransform: uppercase
  micro-xl:
    fontFamily: "'Albert Sans', sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.32em
    textTransform: uppercase
  micro-spec:
    fontFamily: "'Albert Sans', sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.04em
  mono:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.02em
  mono-md:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.02em
  mono-tag:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: 0.04em
  jp:
    fontFamily: "'Noto Sans JP', sans-serif"
    fontSize: "inherit"
    fontWeight: 500
    lineHeight: inherit
  stamp-text:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "28px"
    fontWeight: 900
    lineHeight: 1.0
    letterSpacing: 0.02em
  seal-text:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "38px"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: -0.01em

spacing:
  frame-inset: "69.12px"
  frame-inset-bottom: "75.6px"
  topbar-gap: "15.12px"
  card-pad-x: "20px"
  card-pad-y: "24px"
  grid-gap: "26px"
  col-gap: "56px"
  pagenum-inset: "23.76px 42.24px"

canvas:
  width: 1920px
  height: 1080px

components:
  paper-texture:
    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(58,37,22,0.55) 1px, transparent 1.6px)"
    backgroundSize: "4px 4px"
    opacity: 0.16
    zIndex: 1
    description: "Subtle 4px-period halftone-dot paper texture sitting over every slide stage at 16% opacity. Drawn as a 1px-period radial-gradient. Required — it is the paper-grain that anchors every flat color block in the print register."
  petals-cluster:
    description: "A decorative cluster of 4–5 overlapping perfect circles (each `aspect-ratio: 1/1, border-radius: 50%`) in the primary palette colors. Circles overlap and tile within a bounded container. Used as a brand mark, decorative anchor in slide corners, or quote-page ornament."
  ribbon-band:
    height: "64.8px"
    width: "160% (oversize so rotation clears the frame)"
    transform: "rotate(-22deg) or rotate(22deg)"
    description: "A bundle of 5 stacked solid-color horizontal bars (pink, orange, yellow, green, blue) rotated -22° or +22° to sweep diagonally across a region. Echoes the cassette-label color-stripe motif. Anchored to one edge of the slide and bleeds off the opposite edge."
  ribbon-single:
    height: "16–18%"
    width: "160%"
    transform: "rotate(±22deg)"
    description: "A single solid-color ribbon in a multi-color stack; each ribbon is positioned with its own top/bottom percentage so the stack reads as parallel rays."
  rosette-seal:
    width: "110px"
    aspectRatio: "1 / 1"
    background: "{colors.ink}"
    color: "{colors.paper}"
    clipPath: "32-vertex / 16-tip starburst polygon"
    description: "A consistent 32-vertex / 16-tip starburst contour. It may carry a real short volume, date or label if readable; otherwise remain unlettered or be omitted. Its shape must not imply invented authority."
  red-stamp:
    background: "{colors.red}"
    color: "{colors.paper}"
    padding: "10.8px 22px"
    transform: "rotate(-3deg) or rotate(0)"
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontWeight: 900
    description: "Red rectangular mark, optionally rotated -3deg, for a supplied label or actual status. Choose a readable foreground; never invent endorsement, scarcity or completion."
  card-product:
    border: "1.5px solid {colors.ink}"
    background: "{colors.paper}"
    overflow: hidden
    description: "Vertical product card with a 1.5px ink border, a colored topstrip header band, and a stacked body of name + description + extras + monospaced spec rows. The catalogue grid's primary unit."
  card-topstrip:
    height: "21.6px"
    description: "Colored horizontal band running the full width of a product card's top — fills in red, pink, orange, or blue depending on the card variant. Reads as a Pantone color tab."
  spec-checklist:
    description: "Vertical column of inline rows with a 14–20px square ink-bordered box (filled or empty) followed by a small caps label (COLOR, LO-FI, STEREO, LP). Echoes the cassette package's feature-spec checklist."
  bar-eq:
    bgUntint: "rgba(58, 37, 22, 0.10)"
    borderUntint: "rgba(58, 37, 22, 0.22)"
    description: "Segmented data bars with an explicit source-backed scale. Six tiles are suitable only when those bins honestly represent the values; otherwise use continuous bars. Visible labels preserve quantities, units and precision."
  ledger-row:
    gridColumns: "96px 1.4fr 0.9fr 0.6fr 64px"
    paddingY: "12.96px"
    borderBottom: "1px solid rgba(58,37,22,0.22)"
    description: "5-column tabular row pattern: date | title | edition | chip | nr indicator. Header row uses a 1.5px ink border-bottom; body rows use 1px hairline ink-alpha dividers."
  chip:
    padding: "4px 10px"
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "11–12px"
    color: "{colors.paper}"
    textTransform: uppercase
    letterSpacing: 0.06em
    description: "Mono-font color chip tagging a ledger row's category. Background pulls from red, pink, orange, blue, or green."
  topbar-rule:
    borderBottom: "1.5px solid {colors.ink}"
    paddingBottom: "15.12px"
    description: "Section header underline pattern. A title (Big Shoulders 900 with optional red em-emphasis) on the left aligned-end with a tracked-caps label on the right, separated from the body by a 1.5px ink rule."
  qbody-box:
    background: "{colors.paper}"
    border: "1.5px solid {colors.ink}"
    boxShadow: "8px 8px 0 {colors.ink}"
    padding: "25.92px 48px"
    description: "Quote body container with a 1.5px ink border and a hard 8px ink offset shadow. Sits on top of diagonal ribbons as a paper-on-ribbons callout."
  petal:
    aspectRatio: "1 / 1"
    borderRadius: "50%"
    description: "A single perfect circle in one of the primary colors. The atomic unit of petal-clusters and scattered blobs. Always perfectly round — never an ellipse."
  pagenum:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "13px"
    color: "{colors.ink}"
    letterSpacing: 0.06em
    description: "Bottom-right page indicator — mono font, formatted NN / TT. Required on every content slide."
  nb-checkbox:
    width: "20px"
    aspectRatio: "1 / 1"
    border: "2px solid {colors.ink}"
    checkedFill: "{colors.ink}"
    checkedMarker: "× (cream-colored multiplication sign in Big Shoulders 900)"
    description: "Static ink-bordered square encoding an actual supplied checklist state, with a readable cross only when that mark means the documented state. It is not an interactive checkbox."
---

## Composition contract

Use the shared [deck runtime](../../../references/deck-runtime.md) for the fixed 1920×1080 stage, navigation and scaling. This recipe owns the visual composition only. Its dimensions are stage-pixel starting points, not browser-responsive rules. Texture, borders, type and overlays belong inside the stage and scale together; slide internals never reflow on phones. Apply the shared [composition guidance](../../../references/composition.md) to content, legibility and fit, and the [visual acceptance method](../../../references/visual-acceptance.md) to the rendered result.

## Overview

Sakura Chroma is a **cassette-package editorial system** that treats every slide as a printed product page from a small Japanese audio-products catalogue. The visual metaphor is total: petal-cluster blob marks, diagonal multi-color ribbon bands, 32-vertex / 16-tip starburst seals, red rectangular stamps, mono-font spec rows, color-coded chips, and equalizer-style bar charts. Everything reads as if pulled from the back-page spread of a 1970s consumer-audio brochure — warm, hand-curated, industrially typeset.

The Latin stack has three functional voices: **Big Shoulders Display** 900 for condensed catalogue display, **Albert Sans** 400–700 for prose and labels, and **JetBrains Mono** 400/500 for supported tabular content. **Noto Sans JP** is an optional language font for genuine Japanese content, never atmospheric garnish. Their contrast is industrial display, clear body and monospaced data; not every slide needs every role.

The color philosophy is **warm-cream paper + ink-brown structure + six-color primary accent set**. The paper (`{colors.paper}` — #F1E6CB) is a warm cream, slightly darker than typical bone-white, with a darker tonal sibling (`{colors.paper-dk}` — #E5D6B0) for layered surfaces. The ink (`{colors.ink}` — #3A2516) is a deep warm brown rather than pure black, giving every type and border a print-on-paper warmth. Six primary colors (`red`, `pink`, `orange`, `yellow`, `green`, `blue`) appear as petal-cluster fills, ribbon bands, card topstrips, equalizer-bar fills, chip backgrounds, and red rectangular stamps. The reds and pinks dominate as emphasis colors; the orange / yellow / green / blue ladder serves as the categorical accent set.

Depth comes from **hard offset shadows** (8px 8px 0 ink), **paper-grain texture**, and **color-block layering** — not blurred drops. The signature treatments: the qbody-box (quote callout) carries an 8px hard ink-colored shadow with zero blur; every slide carries a 4px-period halftone-dot paper texture at 16% opacity that grounds every color block in the print register; diagonal multi-color ribbon bands sweep behind content as the system's most distinctive atmospheric layer.

**Density philosophy: medium-high.** The catalogue register depends on visual richness — product-card grids with 4 stacked cards each holding name + description + spec rows, ledger tables with 7+ rows, dashboards combining hero stats + equalizer charts, cover spreads stacking brand lockup + petals + ribbons + hero numeral + spec checklist + footer. A slide with only a single centered headline reads as a manifesto moment (deliberate sparsity in service of impact); every other slide should feel like a packed catalogue page. The correct density is "every region is doing concurrent work" — a topbar with title + meta-label, a body with primary visual + secondary panels, often a chip / stamp / seal as decorative punctuation.

**Key Characteristics:**
- Warm cream paper canvas (`{colors.paper}`) with warm-brown ink (`{colors.ink}`) as structure and six primary accent colors.
- A 4px-period halftone-dot paper texture (`{components.paper-texture}`) sits over every slide at 16% opacity. Required.
- Big Shoulders Display weight 900 with negative tracking for every display moment; Albert Sans for body; JetBrains Mono for tabular / data; Noto Sans JP for genuine Japanese text.
- Petal-cluster blob marks (4–5 overlapping perfect circles) as the signature decorative element.
- Diagonal multi-color ribbon bands (5 stacked colored bars at -22° or +22°) as atmospheric layering.
- 32-vertex / 16-tip starburst seal (`{components.rosette-seal}`) and red rectangular stamps (`{components.red-stamp}`) as optional sourced labels or unlettered ornaments.
- Hard offset shadows: 8px 8px 0 ink on quote callouts; no blur, no soft drops anywhere.
- Catalogue product cards with colored topstrip + name + description + dashed-rule + mono spec rows.
- Equalizer bar charts where each column stacks 6 tiles and "on" segments stack from the bottom up like a VU meter.
- Actual optional slide numbers in JetBrains Mono at bottom-right.

## Colors

### Palette
- **Paper** (`{colors.paper}` — #F1E6CB): The warm cream canvas. The default surface for every slide. Slightly darker and warmer than typical off-white, giving the deck a printed-paper warmth.
- **Paper Dark** (`{colors.paper-dk}` — #E5D6B0): A slightly darker tonal sibling of the canvas. Used for layered surfaces, half-region backgrounds, and where one paper region needs to read as sitting beneath another.
- **Ink** (`{colors.ink}` — #3A2516): Deep warm-brown ink. The structural color — all body text, all borders, all dividers, all hard-offset shadow color, all seal fills, all topbar rules. Slightly cool brown rather than pure black so it sits as warm ink on warm paper.
- **Red** (`{colors.red}` — #E5392A): The primary emphasis color and stamp color. Used for inline `em` emphasis inside Big Shoulders display headlines, for the red rectangular stamps, for catalogue-card topstrips on the first card, for hero numerals on data slides, and as the first ribbon-band color.
- **Pink** (`{colors.pink}` — #E54489): A bright magenta-pink. Used as the lockup-bar background on cover hero lockups, as a ribbon band color, as card-topstrip color for the second variant, and as a chip background.
- **Orange** (`{colors.orange}` — #F09131): A warm sunset orange. Used as a petal color, ribbon-band color, card-topstrip color for the third variant, and chip background.
- **Yellow** (`{colors.yellow}` — #F0BC2A): A mustard-warm yellow. Used as a petal color, ribbon-band color. Reserved as a categorical accent.
- **Green** (`{colors.green}` — #3D9F47): A medium grass green. Used as a petal color, ribbon-band color, chip background, and equalizer bar color.
- **Blue** (`{colors.blue}` — #3F8BC4): A warm mid-blue. Used as a petal color, ribbon-band color, card-topstrip color for the fourth variant, chip background, and as the second hero statistic color when the primary red statistic needs a paired counterpart.

### Defaults
- **Default surface background**: `{colors.paper}` — every slide opens on warm cream paper.
- **Default headline color**: `{colors.ink}` — display headlines are warm-brown ink, not red or another accent. Red appears only as inline `em` emphasis inside an ink headline.
- **Default body text color**: `{colors.ink}`.
- **Default border color**: `{colors.ink}` — every structural border is warm-brown ink, no exceptions.
- **Default tabular / mono text color**: `{colors.ink}`. Mono rows occasionally use `opacity: 0.7` on key labels for visual hierarchy.
- **Default emphasis color (inline `em` inside display headlines)**: `{colors.red}` for body and catalogue spreads; `{colors.blue}` for quote spreads when the body's color story already includes red.
- **Default hero numeral color**: `{colors.red}` — large data-slide statistics are red. Pair with `{colors.blue}` for a second statistic if two stats appear together.
- **Stamp treatment**: red field with readable warm-ink or cream lettering selected for its actual size and contrast, not an automatic inversion.
- **Default seal color**: `{colors.ink}` background with `{colors.paper}` text on every starburst seal.
- **Accent-surface foreground**: warm ink usually suits lighter pink, orange and yellow fills. Inspect red, green and blue combinations at the actual text size before choosing ink or cream. Keep all six accents without assuming cream works on each.
- **Default text color on `{colors.ink}` surfaces**: `{colors.paper}` (cream) for inversions.
- **Default chip palette ordering** (for categorical chips in ledgers / tables): red → pink → orange → blue → green.

The six primary colors have **no fixed semantic meaning** (red is not "danger," green is not "success"). They serve as a categorical accent set — pick whichever color suits the composition. The exception is `{colors.red}` for emphasis: it carries an "attention" register that the cool colors do not, so reserve it for inline `em` and for the most-emphasized hero numerals.

## Typography

### Font Family
The system has four Google Fonts each with a distinct functional role:

- **Big Shoulders Display** (display): Condensed industrial sans-serif at weight 700 and 900. Used for every display moment — headlines, statements, hero numerals, brand lockups, card names, seal text, stamp text, ledger row titles. Always with negative letter-spacing (-0.012em to -0.025em). Its tall narrow condensed forms are the entire system's visual identity.
- **Albert Sans** (body): Clean modern humanist sans at weights 400, 500, 600, 700. Used for body paragraphs (weight 400), descriptions (weight 400), tracked-caps micro-labels (weight 700), and emphasis body (weight 600–700). The neutral counterpoint to Big Shoulders' expressiveness.
- **JetBrains Mono** (data): Monospace at weights 400, 500. Used for spec rows in product cards, date tags in ledgers, page numbers, equalizer-tick labels, chip text and actual metadata. Any moment that reads as "data" rather than "editorial."
- **Noto Sans JP** (language support): use the appropriate loaded Japanese cut and weight only for actual Japanese text. Language is content, not a decorative accent.

Italic does not exist. Underline does not exist. Emphasis is achieved by inline `<em>` (color shift to red or blue without italic style), by weight (Albert Sans 400 → 700), or by switching face (Albert Sans body → Big Shoulders display).

### Type Scale

| Token | Size (stage range) | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.disp-hero}` | 120–280px | Big Shoulders Display | 900 | Hero numeral on a cover spread |
| `{typography.disp-title}` | 80–180px | Big Shoulders Display | 900 | Oversized title on a colophon / closing spread |
| `{typography.disp-statement}` | 70–168px | Big Shoulders Display | 900 | Manifesto / single-statement spread |
| `{typography.disp-lockup}` | 56–130px | Big Shoulders Display | 900 | Brand lockup bar on cover |
| `{typography.disp-quote-lg}` | 56–130px | Big Shoulders Display | 900 | Large pulled quote |
| `{typography.disp-section}` | 52–100px | Big Shoulders Display | 900 | Section topbar title |
| `{typography.disp-quote}` | 48–110px | Big Shoulders Display | 900 | Standard pulled quote |
| `{typography.disp-brand}` | 32–56px | Big Shoulders Display | 900 | Brand sub-mark or wordmark |
| `{typography.disp-card-name}` | 28–48px | Big Shoulders Display | 900 | Product card name |
| `{typography.num-hero}` | 110–240px | Big Shoulders Display | 900 | Primary hero statistic |
| `{typography.num-md}` | 70–150px | Big Shoulders Display | 900 | Secondary statistic |
| `{typography.ttl-row}` | 22–30px | Big Shoulders Display | 700 | Ledger row title |
| `{typography.body-emphasis}` | 15–20px | Albert Sans | 600 | Lead paragraph or emphasized body |
| `{typography.body}` | 14–17px | Albert Sans | 400 | Standard paragraph body |
| `{typography.body-md}` | 14–15px | Albert Sans | 400 | Compact body inside cards |
| `{typography.micro-spec}` | 14–20px | Albert Sans | 700 | Spec-checklist label (lightly tracked) |
| `{typography.micro-xl}` | 12–14px | Albert Sans | 700 | Loosest tracked-caps micro-label (0.32em) |
| `{typography.micro-lg}` | 12–14px | Albert Sans | 700 | Tracked-caps eyebrow label (0.2em) |
| `{typography.micro}` | 12–14px | Albert Sans | 700 | Standard tracked-caps micro-label (0.16em) |
| `{typography.mono-md}` | 14–16px | JetBrains Mono | 400 | Tabular date or value |
| `{typography.mono}` | 11–12px | JetBrains Mono | 400 | Spec row, page number, equalizer tick |
| `{typography.mono-tag}` | 12–14px | JetBrains Mono | 400 | Chip tag text |
| `{typography.stamp-text}` | 20–28px | Big Shoulders Display | 900 | Red rectangular stamp text |
| `{typography.seal-text}` | 22–38px | Big Shoulders Display | 900 | Starburst seal text |
| `{typography.jp}` | inherit | Noto Sans JP | 500 | Genuine Japanese text |

### Defaults
- **Default size for a primary section headline (topbar context)**: `{typography.disp-section}` (52–100px starting range) in `{colors.ink}`.
- **Default size for a manifesto / centered-statement spread**: `{typography.disp-statement}` (70–168px starting range) in `{colors.ink}` with optional `<em>` color shift.
- **Default size for paragraph body**: `{typography.body}` (14–17px starting range).
- **Default size for a tracked-caps micro-label or eyebrow**: `{typography.micro}` (12–14px Albert Sans weight 700, 0.16em tracking, uppercase) in `{colors.ink}`.
- **Default size for a hero statistic**: `{typography.num-hero}` (110–240px starting range) in `{colors.red}`.
- **Default size for a tabular date or mono value**: `{typography.mono-md}` (14–16px) in `{colors.ink}`.
- **Default size for a page number**: `{typography.mono}` (11–12px) in `{colors.ink}`.
- **Default weight for any Big Shoulders Display element**: 900. (700 is reserved for `{typography.ttl-row}` — the ledger row title, which is the only sub-display moment in the system.)
- **Default weight for body**: 400; for micro-labels: 700; for emphasis body: 600–700.

When unsure between `{typography.disp-section}` and `{typography.disp-statement}` for the dominant text moment, choose `{typography.disp-section}` if the slide carries a topbar/body grid; choose `{typography.disp-statement}` if the slide is dedicated to a single centered statement.

### Signature Treatments

Apply Latin case and tracking treatments only where they preserve the source's identifiers, names and script conventions. Missing semantic fields remain absent.
Use these signatures where the corresponding content exists. They govern composition, not permission to add words, alter meaning or force unsupported type:

- **Every Big Shoulders Display element carries negative letter-spacing** (-0.012em to -0.025em). Default tracking on Big Shoulders reads as untreated; the negative tracking is what gives display type its compressed, catalogue-cover density.
- **Every micro-label is uppercase with significant tracking** (0.16em, 0.18em, 0.2em, or 0.32em depending on context). A micro-label without uppercase + tracking reads as a body fragment, not a label.
- **Actual slide numbers**, when included, use JetBrains Mono at bottom-right with readable ink. Numbering is derived from the deck, not a decorative volume or product label.
- **Every inline `<em>` inside a Big Shoulders display headline switches color** to `{colors.red}` (default) or `{colors.blue}` (on quote spreads where red is overloaded). Never use italic style; the color shift is the entire emphasis device.
- **Every spec row uses JetBrains Mono.** A spec row in Albert Sans reads as a body sentence, not as catalogue data.
- **Starburst silhouette**: reuse one 32-vertex / 16-tip contour consistently, reserving it for an actual short label or an unlettered ornament. Do not create a certification, authority or volume to fill it.
- **Red stamp lettering** uses loaded Big Shoulders 900 and modest positive tracking where suitable for the source script. Preserve source wording and status; choose its foreground by readability.

### Typography Principles
The typographic rhythm is **face-to-face contrast**: condensed Big Shoulders → quieter Albert Sans → monospaced data. Use only the roles the content needs. Actual Japanese text has a locale-appropriate face integrated into this hierarchy, not a punctuation role.

Line-height: tight on display (0.84–0.94), generous on body (1.4–1.5), tight on micro and mono (1.0–1.3). Inverting these breaks the rhythm.

## Layout

### Canvas System

Compose on the shared 1920×1080 stage. Use a frame inset of about 69px on top/left/right and 76px at bottom; the body begins beneath the ruled topbar. Covers and quotes may break the frame with bounded circles and ribbons. Clip only decorative ribbon bleed at stage edges; keep complete text, values and labels inside their regions.

### Frame Inset Pattern
Most content slides follow a frame-inset pattern: a `.frame` div sits inset from the slide edges by `69.12px` on top/left/right and `75.6px` at bottom (to clear the page number). Inside the frame, a topbar pattern (title + meta-label + 1.5px ink rule) sits above a body region.

Cover, manifesto, and quote spreads break the frame pattern — they layer petals, ribbons, hero numerals, and lockups freely across the canvas without the topbar/body grid.

### Padding Scale
| Token | Value | Use |
|---|---|---|
| `{spacing.frame-inset}` | 36–72px | Frame inset from slide edges |
| `{spacing.frame-inset-bottom}` | 72–110px | Frame bottom inset (clears page number) |
| `{spacing.topbar-gap}` | 12–22px | Topbar pad-bottom and section gap |
| `{spacing.grid-gap}` | 16–26px | Card grid inter-cell gap |
| `{spacing.col-gap}` | 28–56px | Two-column body gap |
| `{spacing.card-pad-x}` / `{spacing.card-pad-y}` | 14–20px / 16–24px | Product card body padding |
| `{spacing.pagenum-inset}` | 20–36px / 24–44px | Page number inset from bottom-right |

### Slide-number treatment
When useful, show the actual slide number in JetBrains Mono at bottom-right, with enough size and ink contrast to read. It remains inside the stage frame. The shared runtime owns all navigation and controls; no separately authored keyboard hint or fixed overlay.

## Depth and Elevation

### Hard Offset Shadow (Primary Technique)
The system uses **hard offset shadows in ink** at exactly one value: `8px 8px 0 {colors.ink}` (zero blur, solid ink). Applied to the qbody-box (quote callout) and other elevated paper-on-ribbons elements that need to lift off a busy underlying composition. The shadow is rare — most cards and panels rely on borders alone for definition, and the 8px ink shadow is reserved for the moment that earns it.

### Paper-Grain Texture (Atmospheric Layer)
The `{components.paper-texture}` halftone-dot pattern sits over every slide at 16% opacity. It is not depth in the strict sense but provides the foundational textural ground that makes every flat color block read as ink on paper. Removing it breaks the print register immediately. Required on every slide.

### Color-Block Layering
Depth comes primarily from **layered colored regions**: ribbon bands behind hero numerals; petals behind brand lockups; topstrip color tabs on top of paper cards; red stamps over diagonal ribbons. The high-contrast accents projecting forward against the warm cream backdrop is the system's primary depth grammar.

### Border Definition
Most cards and panels rely on 1.5px ink borders for definition, not shadows. A 1.5px ink border around a paper card on the same paper background reads as elevated through the boundary alone.

### No Soft Shadows
The system uses **no blurred `box-shadow`** (other than the single 8px hard offset on qbody-box), no `drop-shadow` filters, no rgba shadow tints. A soft modern shadow on any element breaks the print catalogue aesthetic.

## Shapes and Treatment

### Border Radius
| Value | Use |
|---|---|
| 0px | All cards, all stamps, all topbars, all bodies, all chips, all ledger rows |
| 50% | Petals (perfect circles) — used inside petal-clusters and scattered blobs only |
| Polygon clip-path (32-vertex / 16-tip starburst) | Rosette seal — the only complex shape primitive |

The system has **no rounded corner radii** other than perfect circles (petals) and the polygon-clipped starburst (seal). Every other shape is strict rectangular or square.

### Border Weights
- **1.5px solid `{colors.ink}`** — the standard border weight on cards, topbar rules, ledger header rules, qbody-box, the cover frame's bottom rule, the cover footer's top rule.
- **2px solid `{colors.ink}`** — used on the spec-checklist checkbox borders.
- **1px solid `{colors.ink}`** — used inside the equalizer for the ticks/labels separator.
- **1px solid rgba(58,37,22, 0.22)** — used as the hairline ledger row body divider and as equalizer-segment off-state borders.
- **1px dashed `{colors.ink}`** — used as the dashed rule separating a product card's description from its mono spec rows.

Borders are always ink (warm brown). Colored borders do not exist in this system except as a chip's implicit background-border.

### Decorative Element Types

**Petal cluster** (`{components.petals-cluster}`) — A bounded container holding 4–5 perfectly-circular colored blobs that overlap. Each petal is positioned absolutely within the container as a percentage offset. The colors rotate across the primary palette (red, pink, orange, yellow, green, blue) — never all the same color. Used as a brand mark anchor in slide corners and as decorative ornament on quote spreads. The signature decorative element.

**Ribbon band** (`{components.ribbon-band}`) — A stack of 5 solid-colored horizontal bars rotated -22° or +22° to sweep diagonally across a region. Bars stack vertically with each ribbon at a different `top` percentage, creating a parallel-rays effect. Anchored to one slide edge, oversized to bleed off the opposite edge. The system's atmospheric layering signature.

**Rosette seal** (`{components.rosette-seal}`) — Reuse the 32-vertex / 16-tip silhouette in ink. A real short volume, year or label may appear in cream if it fits without changing its wording. Otherwise leave the shape unlettered or omit it; its visual form is not proof of authority.

**Red rectangular stamp** (`{components.red-stamp}`) — A red rectangle at optional -3° rotation with readable Big Shoulders lettering. It holds only supplied product labels or actual statuses; no invented completion, endorsement or limited-edition claim.

**Product card** (`{components.card-product}`) — Vertical card with a 1.5px ink border, a colored top strip (red / pink / orange / blue variant), and a stacked body: card name in Big Shoulders 900 → description in Albert Sans 400 → dashed-rule → mono spec rows. The catalogue grid's primary unit.

**Card topstrip** (`{components.card-topstrip}`) — A 18–32px tall solid-color band running the full width of a product card's top. Reads as a Pantone color tab; identifies the card's variant within the grid.

**Spec checklist** (`{components.spec-checklist}`) — Static rows of an ink-bordered state marker plus its actual label. Use a filled or empty square and cross only with a clear source-backed meaning, and do not make it look actionable.

**Ledger row** (`{components.ledger-row}`) — 5-column tabular row pattern: date (mono) | title (Big Shoulders 700) | edition (Albert Sans) | chip | nr indicator (square boxes). Header row uses 1.5px ink border-bottom; body rows use 1px hairline ink-alpha dividers.

**Chip** (`{components.chip}`) — A mono label tagging an actual ledger category. Use any of the six palette colors, with warm ink or cream chosen for readable contrast; color is not an inferred judgment.

**Topbar rule** (`{components.topbar-rule}`) — Section header underline pattern: title (display) on left aligned-end with a tracked-caps meta-label on right, separated from the body by a 1.5px ink rule.

**Equalizer bar chart** (`{components.bar-eq}`) — A grid of source-derived columns and an explicit labelled scale, stacked bottom-up. Six equal tiles are a stylistic option only when they faithfully encode the data; otherwise use continuous bars in the same palette. Preserve values, units, baseline and comparisons. Decorative inactive tiles must not look like extra quantities.

**Qbody-box** (`{components.qbody-box}`) — Quote callout container with 1.5px ink border and 8px hard ink shadow. Sits on top of diagonal ribbons.

**Brand lockup** — Big Shoulders 900 wordmark over Albert Sans 600 sub-mark, positioned absolutely near the cover petals.

## Do's and Don'ts

### Do
- Keep the paper-grain halftone-dot texture (`{components.paper-texture}`) on every slide at 16% opacity. It is the foundational print register; removing it makes the deck look like a flat web template.
- Use Big Shoulders Display at weight 900 with negative letter-spacing (-0.012em to -0.025em) for every display moment.
- Apply tracked uppercase to every micro-label — 0.16em standard, 0.2em for eyebrows, 0.32em for the loosest manifesto kicker. Default tracking reads as a body sentence.
- Set hero statistics in `{colors.red}` at Big Shoulders 900. Pair with `{colors.blue}` for a second statistic.
- Use inline `<em>` in display headlines to shift color (red default, blue on quote spreads). Never italicize.
- Compose petal-cluster blob marks (4–5 overlapping perfect circles in primary colors) as decorative anchors in slide corners.
- Sweep diagonal multi-color ribbon bands (-22° or +22°) behind hero content as atmospheric layering on cover and closing spreads.
- Place a page number on every content slide in JetBrains Mono at bottom-right (`NN / TT` format).
- Use JetBrains Mono for spec rows, dates, chips, and any tabular data — anything that should read as "data" instead of "editorial."
- Reserve the starburst and red stamp for a small number of sourced labels or unlettered punctuation marks. Never manufacture authority to justify a shape.

### Don't
- Don't round any corner. Cards, stamps, chips, topbars — all strict rectangles. Petals (circles) and the starburst seal (polygon clip-path) are the only non-rectangular shapes.
- Don't use blurred `box-shadow`. The only shadow in the system is the 8px hard ink offset on quote callouts. Soft modern shadows break the print register.
- Don't substitute another display face for Big Shoulders Display. The condensed industrial 900 voice is the entire system identity.
- Don't substitute another mono face for JetBrains Mono. The tabular voice is part of the catalogue conceit.
- Don't use Big Shoulders Display for body paragraphs. It reads as overwrought at small body sizes.
- Don't use Albert Sans for display moments. Albert Sans is the neutral body face; display moments need Big Shoulders.
- Don't italicize for emphasis. Use inline `<em>` with red or blue color, or switch weight (Albert 400 → 700).
- Don't introduce a seventh primary color. The palette is locked at red / pink / orange / yellow / green / blue. Adding purple, cyan, or other hues breaks the catalogue color story.
- Don't fill a card border with a saturated accent color (red border, blue border). Borders are always ink.
- Keep any actual slide-number treatment consistent and readable; do not add separate runtime navigation hints.

## CJK & International Content

### Pairing and visual intent

| Role | Latin | CJK candidate | Treatment |
|---|---|---|---|
| Display, cover lockup, stamp | Big Shoulders Display 900 | ZCOOL XiaoWei regular | A contrasting Song-style decorative option; not condensed or 900-equivalent |
| Body and compact labels | Albert Sans 400 / 600 / 700 | LXGW WenKai regular, or locale-appropriate Noto Sans | WenKai for a handwritten-paper register; sans for small dense data |
| Spec labels and values | JetBrains Mono | Noto Sans CJK for descriptors; JetBrains Mono for supported Latin values | Align columns explicitly; do not assume mixed text is monospaced |
| Japanese content | Noto Sans JP | Locale-appropriate Japanese cut | Only when the actual content is Japanese |

ZCOOL XiaoWei and LXGW WenKai offer a softer print interpretation of the cassette-package idea. They do not reproduce the narrow industrial mass of Big Shoulders. A heavy Noto Sans display is another candidate when stronger industrial hierarchy matters; select after seeing real text rather than treating any pairing as universally superior. No gendered aesthetic or nationality label is a reason to add foreign-language words.

### Composition adjustments

Drop negative display tracking and widely tracked Latin micro-label styling on CJK runs. Rebalance the lockup width rather than horizontally compressing characters. A regular-only decorative face needs hierarchy from size, panel area and ink/paper contrast, not a requested weight 900 that the asset lacks. Use an actually loaded heavier family when a small CJK label must be stronger.

Petal circles, parallel ribbons, hard 8px quote shadows and starburst silhouettes are script-independent. Keep seal text only when a real short label fits; otherwise use an unlettered ornament or omit the seal. Do not generate a character meaning new, limited or approved merely because it fits inside the shape. Genuine status checklists must retain their actual labels and states.

Mixed-language spec rows work well when descriptors and values have separate aligned cells. A CJK descriptor may need a larger minimum width and line-height than its Latin counterpart. Preserve units and precision in numerical values; use a continuous bar rather than six equalizer segments if segmentation would distort the data. Keep the broad catalogue hierarchy even when a crowded four-card grid becomes two slides.

### Script and font handling

These are candidate pairings, not metric equivalents or proof that a font is loaded. Inspect the exact font files, supported styles/weights, language coverage and rendered glyphs before accepting a deck. A CSS family stack alone does not load a font. Use locale-appropriate Simplified Chinese, Traditional Chinese, Japanese or Korean cuts; one Chinese pairing does not cover all CJK typography.

Set CJK runs to upright style, zero tracking and no case transform unless the chosen face explicitly supplies another intended style. Begin around 1.15–1.25 display line-height and 1.75–1.85 body line-height, then inspect the actual text. Preserve the locked language, wording, numerals and punctuation; do not add Latin labels for atmosphere. Follow the content's locale for punctuation, spacing at script boundaries and line breaking, keeping opening/closing punctuation with its phrase. Preserve quotations exactly unless an editorial change is approved.

Scope script styling to intentional runs with language tags. Do not apply inherited Latin italic or heavy weights to a regular-only CJK face and let the browser synthesize them. Compare mixed-script baselines visually; `palt` changes horizontal glyph metrics where supported, not vertical alignment, and is not a universal baseline repair. Adjust a run's baseline only after seeing the actual pair. A pure-CJK line still needs fit and clipping checks.

## Iteration Guide

1. Every new content slide carries the paper-grain halftone-dot texture, a frame-inset region (36–72px from edges, 72–110px from bottom), and a page number at bottom-right.
2. Any new content slide that follows the frame pattern opens with a topbar: display-section title on the left, tracked-caps meta-label on the right, separated from the body by a 1.5px ink rule.
3. Any new headline uses Big Shoulders Display weight 900 with negative tracking. For section topbars use `{typography.disp-section}`; for single-statement spreads use `{typography.disp-statement}`; for hero numerals use `{typography.num-hero}` in red.
4. Any new body uses Albert Sans 400; tracked-caps labels use Albert Sans 700 uppercase with 0.16–0.32em tracking; tabular content uses JetBrains Mono 400.
5. Any new card uses a 1.5px ink border, optional colored topstrip (red / pink / orange / blue), and a body pattern of display name → Albert body → dashed-rule → mono spec rows.
6. Any new ledger / tabular pattern uses the 5-column ledger-row grid with header underline (1.5px ink) and hairline body dividers (1px ink-alpha). Categorical tags use mono chips with primary-palette backgrounds.
7. Any new decorative anchor uses a petal-cluster (4–5 overlapping perfect-circle petals in mixed primary colors). Avoid ellipses — petals are always perfectly round.
8. Use the starburst or red stamp for an actual short label, or an unlettered accent. If source wording does not fit, choose a wider label treatment rather than shortening the claim.
9. Any inline emphasis inside a display headline uses `<em>` with color shift to `{colors.red}` (default) or `{colors.blue}` (when red is overloaded). Never italicize.
10. Atmospheric layering — diagonal ribbon bands at -22° or +22° behind hero content — appears on cover, closing, and stripe-spread moments. It is not a routine slide element; reserve it for spreads that earn atmospheric ambition.

## Known Gaps

- Verify the actual Big Shoulders, Albert Sans and JetBrains Mono files and needed weights. Load a locale font such as Noto Sans JP only for the genuine language content it supports. A recipe stack is not evidence of a loaded font.
- The radial-gradient paper grain uses a 4px stage-space period. It scales with the stage, so inspect it at destination size and avoid aliasing or texture strong enough to obscure small text.
- The 32-vertex / 16-tip starburst clip-path polygon is hardcoded; modifying the seal shape requires rewriting the polygon point list. The system is consistent only because the same polygon is reused everywhere — switching to a different starburst polygon breaks visual cohesion.
- Diagonal ribbon bands may rotate -22° and extend beyond their region for decorative bleed. Size and clip them against the fixed stage, and measure the rotated extent so they never cover required text or data.
- The equalizer bar chart uses `display: flex; flex-direction: column-reverse;` to stack on-segments from the bottom up. This is a subtle layout pattern that can be fragile under aggressive overrides — modifying the eq segments requires preserving the column-reverse behavior.
- Hero statistics use inline `<sub>` and inline-style `font-size` overrides for sub-units (`26K`, `61%`), which sidesteps the typography token system. New stats should follow the same pattern: oversized numeral + smaller inline unit at ~34% the numeral's size in ink color.
- Do not load Japanese typography for an invented decorative inscription. Remove unused imports when there is no corresponding source text.
- Runtime controls are owned by the common runtime. A faint decorative mark must never substitute for a usable control or required note.
