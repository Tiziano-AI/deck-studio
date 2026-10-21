---
version: alpha
name: Daisy Days
description: A cheerful, childlike presentation system built around the chunky display face Fredoka One and the rounded humanist sans Quicksand. The palette is a sunny garden — cream canvas, turquoise, soft pink, butter yellow, mint, lavender, peach, sky blue, and a single coral accent — with charcoal-brown 2D outlines wrapping every shape. Hard offset shadows in dark charcoal, generous border-radius, and hand-drawn SVG decorations (daisies, stars, suns, clouds, rainbows) anchor the aesthetic somewhere between a children's storybook spread and a sticker-sheet kawaii zine.

colors:
  cream: "#F5F0E6"
  turquoise: "#7ECDC0"
  soft-pink: "#F7C8D4"
  butter: "#FDE68A"
  mint: "#A8E6CF"
  lavender: "#D4A5E8"
  peach: "#FFCBA4"
  sky: "#A8D8F0"
  coral: "#F8635F"
  text-dark: "#2D2D2D"
  text-muted: "#6B6B6B"
  white: "#FFFFFF"

borders:
  primary: "3px solid {colors.text-dark}"
  thin: "2px solid {colors.text-dark}"

shadows:
  default: "6px 6px 0 {colors.text-dark}"
  small: "4px 4px 0 {colors.text-dark}"
  text-headline: "3px 3px 0 {colors.text-dark}"
  text-headline-soft: "3px 3px 0 rgba(0,0,0,0.2)"

typography:
  display:
    fontFamily: "'Fredoka One', cursive"
    fontSize: "104px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: 0.02em
  headline:
    fontFamily: "'Fredoka One', cursive"
    fontSize: "72px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: 0.02em
  title:
    fontFamily: "'Fredoka One', cursive"
    fontSize: "48px"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: 0.02em
  subtitle:
    fontFamily: "'Fredoka One', cursive"
    fontSize: "28.8px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.02em
  label-display:
    fontFamily: "'Fredoka One', cursive"
    fontSize: "20.8px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.02em
  quote:
    fontFamily: "'Fredoka One', cursive"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.35
  body:
    fontFamily: "'Quicksand', sans-serif"
    fontSize: "18.4px"
    fontWeight: 500
    lineHeight: 1.6
  body-strong:
    fontFamily: "'Quicksand', sans-serif"
    fontSize: "18.4px"
    fontWeight: 600
    lineHeight: 1.5
  meta:
    fontFamily: "'Quicksand', sans-serif"
    fontSize: "15.2px"
    fontWeight: 600
    lineHeight: 1.45
  badge:
    fontFamily: "'Fredoka One', cursive"
    fontSize: "13.6px"
    fontWeight: 400
    letterSpacing: 0.02em

spacing:
  pad-slide: "40px 60px"
  pad-card-lg: "48px 56px"
  pad-card-md: "32px 40px"
  pad-card-sm: "16px 24px"
  gap-grid-lg: "28px"
  gap-grid-md: "24px"
  gap-grid-sm: "14px"
  radius: "20px"
  radius-lg: "28px"
  radius-pill: "50px"
  radius-round: "50%"

canvas:
  width: 1920px
  height: 1080px

components:
  card:
    background: "{colors.white}"
    border: "3px solid {colors.text-dark}"
    borderRadius: "{spacing.radius}"
    boxShadow: "{shadows.default}"
  card-lg:
    background: "{colors.white}"
    border: "3px solid {colors.text-dark}"
    borderRadius: "{spacing.radius-lg}"
    boxShadow: "{shadows.default}"
  badge-pill:
    display: "inline-block"
    padding: "8px 20px"
    borderRadius: "{spacing.radius-pill}"
    border: "3px solid {colors.text-dark}"
    fontFamily: "'Fredoka One', cursive"
    fontSize: "13.6px"
    background: "{colors.butter}"
  framed-header:
    description: "A two-part stacked card: a colored header strip (any accent surface) with rounded top corners and no bottom border, sitting flush above a white body with rounded bottom corners. The pair reads as a single unit with a tonal cap."
    headerBackground: "any accent surface"
    headerBorderRadius: "{spacing.radius-lg} {spacing.radius-lg} 0 0"
    bodyBackground: "{colors.white}"
    bodyBorderRadius: "0 0 {spacing.radius-lg} {spacing.radius-lg}"
    border: "3px solid {colors.text-dark}"
    boxShadow: "{shadows.default}"
  circle-dot:
    width: "48px"
    height: "48px"
    borderRadius: "{spacing.radius-round}"
    border: "3px solid {colors.text-dark}"
    fontFamily: "'Fredoka One', cursive"
    color: "{colors.text-dark}"
    description: "Outlined colored disc holding a numeral or single letter. Used as timeline node, step marker, or list bullet anchor."
  circle-icon:
    width: "44px"
    height: "44px"
    borderRadius: "{spacing.radius-round}"
    border: "3px solid {colors.text-dark}"
    fontFamily: "'Fredoka One', cursive"
    background: "any accent surface"
    description: "Smaller cousin of circle-dot used as a card icon at the top of an info card."
  step-circle-lg:
    width: "90px"
    height: "90px"
    borderRadius: "{spacing.radius-round}"
    border: "3px solid {colors.text-dark}"
    fontFamily: "'Fredoka One', cursive"
    color: "{colors.text-dark}"
    boxShadow: "{shadows.small}"
    description: "Oversized outlined disc used as a process step marker. Carries a hard offset shadow."
  avatar-circle:
    width: "100px"
    height: "100px"
    borderRadius: "{spacing.radius-round}"
    border: "3px solid {colors.text-dark}"
    background: "{colors.white}"
    boxShadow: "{shadows.small}"
    overflow: "hidden"
  bullet-dot:
    width: "20px"
    height: "20px"
    borderRadius: "{spacing.radius-round}"
    border: "2px solid {colors.text-dark}"
    background: "{colors.butter}"
    description: "Small outlined disc used as a ::before bullet for body list items, anchored 4px from the top of the line."
  compact-bullet:
    description: "Use the same outlined disc vocabulary at a smaller 10px diameter for compact in-card lists; keep list semantics in HTML."
  legend-swatch:
    width: "18px"
    height: "18px"
    border: "2px solid {colors.text-dark}"
    borderRadius: "4px"
  decoration:
    position: "absolute"
    pointerEvents: "none"
    zIndex: 1
    description: "Hand-drawn SVG sticker (daisy, star, sun, cloud, rainbow) placed at slide corners and edges as atmospheric ornament. Often crops past the slide edge."
  chart-container:
    background: "{colors.white}"
    border: "3px solid {colors.text-dark}"
    borderRadius: "{spacing.radius-lg}"
    boxShadow: "{shadows.default}"
    padding: "{spacing.pad-card-md}"
---

## Stage and content contract

Use the shared [Deck Studio runtime](../../../references/deck-runtime.md) on a fixed **1920×1080** stage, uniformly scaled as one composition. This recipe owns visual layout, not navigation, loading, animation, capture or export. Use the shared runtime as written; do not create an equivalent inline scaler or phone-specific internal reflow.

The role sizes and spacing below are stage coordinates. Check readability at the intended viewing size, not only against overflow. If content does not fit, recompose, split or select another system while preserving the locked meaning. Real labels, identities, quotations, metrics and their qualifications come from supplied content; empty decorative slots do not authorize new words, numbers or controls. Keep case-sensitive names and identifiers intact, even within a display-cap treatment.

## Overview

Daisy Days is a **cheerful childlike presentation system** rooted in a single typographic pairing: the chubby rounded display face **Fredoka One** for every headline, and the friendly humanist sans **Quicksand** for every line of body and meta text. The visual language descends from picture-book illustration and sticker-sheet kawaii: every shape carries a charcoal 2D outline, every elevated element casts a solid offset shadow, and every surface is a pastel from a sunny garden palette.

The color philosophy is **multi-pastel with a single warm pop**. The background canvas alternates between a soft cream (`{colors.cream}`) and the saturated pastels (`{colors.turquoise}`, `{colors.soft-pink}`, `{colors.butter}`, `{colors.mint}`, `{colors.lavender}`, `{colors.peach}`, `{colors.sky}`). The lone high-saturation accent is `{colors.coral}` — used sparingly on small marker dots and headline strokes, never as a full surface. Headlines default to charcoal on cream and pastel surfaces. An optional 3px offset-print text shadow can echo the sticker vocabulary when it does not merge glyphs; it is not a contrast fix. Body text never leaves `{colors.text-dark}` or `{colors.text-muted}`.

Depth is **2D and graphic**, not photographic. Every elevated element gets a `{shadows.default}` or `{shadows.small}` — a solid charcoal block offset to the bottom-right, with zero blur. The combination of thick charcoal outline plus hard offset shadow gives the system its sticker-on-paper feel. There are no gradients, no glow, no glass effects.

The signature treatment is the **hand-drawn SVG decoration layer**. A region may carry a small cluster of absolutely-positioned ornaments — yellow-centered daisies, multi-color stars, smiling suns, fluffy clouds, arched rainbows — that cluster at the corners and edges, often cropping past the slide boundary at `top:-30px / right:-20px`. These decorations sit on a `z-index:1` layer behind the content (`z-index:2`) and carry the same 2px-ish charcoal stroke as the rest of the system, unifying ornament with structure.

**Density philosophy: full but not crowded.** This system reads as authoritative when every slide carries one focused content region (a card, a frame, a grid) at the center plus a generous wreath of corner ornaments at the edges. Ornaments frame the main subject when space permits; an empty corner is valid negative space, and no ornament may crowd meaningful content. Conversely, dense overlapping content panels read as anxious; the system wants one main subject, framed and surrounded, not three competing ones. Aim for one bordered/shadowed container per slide, with the corner decorations doing the work of filling the rest of the canvas.

**Key Characteristics:**
- Cream (`{colors.cream}`) default canvas with rotating pastel surfaces — every slide may pick a different surface color.
- Fredoka One for all headline / display / quote text; Quicksand 500/600 for all body and meta text.
- Every shape and card carries a 3px solid charcoal outline (`{colors.text-dark}`) plus a hard offset shadow (`{shadows.default}` or `{shadows.small}`).
- Generous border-radius: 20px on standard cards, 28px on featured cards, pill (`{spacing.radius-pill}`) on badges, full circle on dots and avatars.
- Hand-drawn SVG ornaments (daisies, stars, suns, clouds, rainbows) cluster at corners and crop past slide edges as atmospheric layer.
- Charcoal headlines work across the pastels; an optional 3px offset-print shadow is a visual treatment, not a readability guarantee.
- Bullets are colored outlined dots (`{components.bullet-dot}`), not glyphs. Lists feel hand-set.
- One main content container per slide, with an optional edge ornament cluster sized to preserve breathing room.

## Colors

### Palette
- **Cream** (`{colors.cream}` — #F5F0E6): The default canvas. A warm off-white that reads as paper-stock rather than digital white. Used as the deck's neutral surface — title openings, info-card slides, anything that wants to feel like a storybook page.
- **Turquoise** (`{colors.turquoise}` — #7ECDC0): A medium-saturation teal-green. The boldest of the surface pastels; use charcoal headline text and inspect its actual contrast rather than relying on a shadow.
- **Soft Pink** (`{colors.soft-pink}` — #F7C8D4): A bubblegum blush. Used as a full surface, a header-strip color, a day-marker fill, and the quote-mark accent inside a quote card.
- **Butter** (`{colors.butter}` — #FDE68A): A buttery pastel yellow. The default badge and bullet-dot fill. It is the system's "highlight" color when something needs to feel marked.
- **Mint** (`{colors.mint}` — #A8E6CF): A cool celadon green. A surface color, a header-strip color, a circle-icon fill, and a timeline-dot color.
- **Lavender** (`{colors.lavender}` — #D4A5E8): A muted purple. Surface, header-strip, marker-dot, day-marker — same role flexibility as mint and soft-pink.
- **Peach** (`{colors.peach}` — #FFCBA4): A warm pastel orange. Used as a surface (typically on process or sequence slides) and an accent.
- **Sky** (`{colors.sky}` — #A8D8F0): A pastel blue. Surface and accent color, often paired with cloud decorations.
- **Coral** (`{colors.coral}` — #F8635F): The single saturated accent. Used only as a marker fill (a numbered dot, a timeline node, a step circle) and a day-header — never as a full slide surface. Coral is the system's "look here" color and loses its punch if overused.
- **Text Dark** (`{colors.text-dark}` — #2D2D2D): The structural color. Every border, every body text run on light surfaces, every shadow, every SVG stroke. Slightly warmer than pure black — reads charcoal, not jet.
- **Text Muted** (`{colors.text-muted}` — #6B6B6B): The de-emphasized text color. Subtitles, descriptions under headlines, list-dash bullets, role labels.
- **White** (`{colors.white}` — #FFFFFF): The default card fill — every card, every avatar, every chart-container interior. Cards on a cream canvas still get white interiors so the card edge reads cleanly.

### Defaults
- **Default slide background**: `{colors.cream}`. Use a saturated pastel surface (turquoise, soft-pink, mint, butter, lavender, peach, sky) when the slide wants a tonal personality; default to cream when it doesn't.
- **Default card background**: `{colors.white}` — on any surface, including pastel surfaces. White-on-pastel is the standard card treatment.
- **Default headline color**: `{colors.text-dark}` — always.
- **Default body color**: `{colors.text-dark}` for primary body, `{colors.text-muted}` for descriptions, role labels, captions, and sublines.
- **Default border color**: `{colors.text-dark}` — always. There are no colored borders anywhere.
- **Default shadow color**: `{colors.text-dark}` — always. Shadows are never pastel.
- **Default badge fill**: `{colors.butter}`.
- **Default marker / accent fill** when an element needs a single "attention" color: `{colors.coral}`. When a sequence of markers is needed, rotate through the full pastel set (coral → mint → sky → lavender → butter) for sequence steps and dots.
- **Default header-strip color** on a framed-header component: any pastel surface — pick whichever harmonizes with the slide's surface color.

The pastels are interchangeable at the surface level — they do not carry fixed semantic meaning (mint is not "success", coral is not "warning"). Pick the surface that best serves the slide's emotional register. The one rule: coral is reserved for small high-contrast accents, not surfaces.

## Typography

### Font Family
Provision the two Latin faces used by the recipe: **Fredoka One** (a single-weight rounded display face) and **Quicksand** (a humanist sans available at 400/500/600/700). The pairing is the entire typographic identity.

Fredoka One is a chunky single-weight display face — it has no italic, no lighter variants, no condensed cuts. The display weight reads as 400 by spec but visually behaves as a heavy weight because the letterforms are so rounded and full. Every headline, every title, every step number, every quote in the system runs in Fredoka One. There is no exception — using Quicksand for a heading or Fredoka One for a body paragraph breaks the system instantly.

Quicksand carries everything else: paragraphs, list items, role labels, captions, day-card body lists, legend text. Quicksand 500 is the body default; 600 is the "slightly stronger" variant used for emphasized body (welcome-list items, info-card descriptions, legend labels); 700 is used sparingly for quote-author attribution.

### Display, Body, and Marker Scale

| Token | Size | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.display}` | 104px | Fredoka One | 400 | Cover / opening hero headline |
| `{typography.headline}` | 72px | Fredoka One | 400 | Primary slide headline |
| `{typography.title}` | 48px | Fredoka One | 400 | Section title or framed-header title |
| `{typography.quote}` | 32px | Fredoka One | 400 | Pull-quote body text |
| `{typography.subtitle}` | 28.8px | Fredoka One | 400 | Sub-headline, in-card title |
| `{typography.label-display}` | 20.8px | Fredoka One | 400 | Small Fredoka labels — day-card header, step title |
| `{typography.body-strong}` | 18.4px | Quicksand | 600 | Emphasized body — welcome lists, info-card descriptions |
| `{typography.body}` | 18.4px | Quicksand | 500 | Standard paragraph body |
| `{typography.meta}` | 15.2px | Quicksand | 600 | Compact secondary text — day-card lists, step descriptions, legend rows |
| `{typography.badge}` | 13.6px | Fredoka One | 400 | Text inside a pill badge |

### Defaults
- **Default size for a primary slide headline**: `{typography.headline}` (72px).
- **Default size for a cover-level title moment**: `{typography.display}` (104px).
- **Default size for a paragraph**: `{typography.body}` (18.4px) in Quicksand 500.
- **Default size for emphasized list items**: `{typography.body-strong}` (Quicksand 600).
- **Default size for a description under a card title or a meta caption**: `{typography.meta}` in `{colors.text-muted}`.
- **Default size for a section / framed-header title**: `{typography.title}`.
- **Choose family by role, not size**: Fredoka One for display/headlines/quotes and Quicksand for body, descriptions and attribution. A larger body paragraph stays Quicksand.

When unsure, reach for `{typography.headline}` for the slide's main text moment, not `{typography.subtitle}` or `{typography.title}` (which are intra-content titles, not the primary slide voice).

### Signature Treatments
These treatments define the type roles; optional ornament must serve the real content:

- **Headline text defaults to charcoal on pastel or cream.** An optional 3px offset-print shadow may echo the sticker outlines after actual glyph and contrast inspection. Omit it if it muddies the letters.
- **White headline variants require an actually readable pairing.** Do not assume white-on-pastel is accessible, and do not count a text shadow as proof.
- **Every body list item uses an outlined colored disc as its bullet, not a glyph.** Default fill is `{colors.butter}`. The bullet is rendered as a `::before` 20px circle with 2px charcoal border, positioned 4px from the top of the first line.
- **Every quote uses the Fredoka quote-mark treatment**: an oversized `"` glyph in `{colors.soft-pink}` sits above the quoted text. Quotes never appear without a quote-mark anchor.
- **Quicksand body text never goes uppercase.** No display-style ALL-CAPS treatments on body. Fredoka has its own personality and doesn't need shouting.

### Typography Principles
The size ladder is the rhythm. Fredoka One does not get italicized, underlined, or rendered in alternate weights — Fredoka has one weight, full stop. Quicksand stays inside the 500 / 600 / 700 ladder; do not introduce 400 or 800 even if available. Letter-spacing on Fredoka stays at the spec default of `0.02em`. Letter-spacing on Quicksand stays at 0.

Mixing Quicksand into a headline (e.g. for an italicized phrase) is not supported in this system — the headline runs in one face. If a headline needs a different emotional register, the size and color do the work, not the font swap.

## Layout

### Canvas System
Each slide is a fixed 1920×1080 composition using the [shared runtime](../../../references/deck-runtime.md). The main subject is centered inside 40px/60px outer padding. A 700–1100px content region leaves room for optional edge ornaments; widen or split it when the locked material needs more readable space.

### Padding and Gap Scale
| Token | Value | Use |
|---|---|---|
| `{spacing.pad-slide}` | 40px 60px | Outer slide padding |
| `{spacing.pad-card-lg}` | 48px 56px | Large featured cards (quote box, welcome body) |
| `{spacing.pad-card-md}` | 32px 40px | Standard cards (chart container, framed-header body) |
| `{spacing.pad-card-sm}` | 16px 24px | Compact cards (timeline card, day-card body) |
| `{spacing.gap-grid-lg}` | 28px | Major grid gaps (team grid, info-card grid) |
| `{spacing.gap-grid-md}` | 24px | Standard grid gaps |
| `{spacing.gap-grid-sm}` | 14px | Tight grid gaps (weekly day-card grid) |

### Border-Radius Scale
| Token | Value | Use |
|---|---|---|
| `{spacing.radius}` | 20px | Standard cards, day-cards, timeline cards |
| `{spacing.radius-lg}` | 28px | Featured cards (chart container, welcome frame, quote box) |
| `{spacing.radius-pill}` | 50px | Badges |
| `{spacing.radius-round}` | 50% | All circles (avatars, bullet dots, marker dots, step circles, icons) |

Every visible region carries some radius. There are zero square corners in this system besides the SVG decorations themselves.

### Content Centering
Slide content is flex-centered both vertically and horizontally inside the slide padding. The main content container has a max-width that varies by composition (typically 700–1100px) and never spans the full slide width — there is always margin between content and slide edge for the decorations to occupy.

## Depth and Elevation

### Hard Offset Shadow (Only Technique)
Every elevated element uses one of two shadow values:
- **`{shadows.default}`** = `6px 6px 0 {colors.text-dark}` — standard offset for cards, frames, chart containers, badges.
- **`{shadows.small}`** = `4px 4px 0 {colors.text-dark}` — lighter offset for smaller elevated elements (day-cards, timeline-cards, info-cards, step circles, avatars).

The shadow is **solid charcoal, zero blur, fixed bottom-right offset**. There is no rgba shadow, no blur, no soft elevation. An element either casts a hard offset shadow in `{colors.text-dark}` or it casts no shadow.

### Optional Offset-Print Display Treatment
Use a display shadow only when actual glyph separation stays clear. It is decorative, not a substitute for readable foreground/background contrast:
- **`{shadows.text-headline}`** = `3px 3px 0 {colors.text-dark}` for bold pastel surfaces (turquoise, butter, peach).
- **`{shadows.text-headline-soft}`** = `3px 3px 0 rgba(0,0,0,0.2)` for softer pastel surfaces (soft-pink, mint) where the full charcoal would feel too heavy.

Headlines on cream get no text-shadow.

### Decorative Z-Index Layer
The atmospheric SVG decorations live on `z-index: 1` with `pointer-events: none`. Content sits on `z-index: 2`. Keep ornaments outside meaningful text and data bounds; pointer-events alone does not prevent a visual obstruction. Decorations frequently crop past the slide edge with negative offsets like `top:-30px / left:-30px`, which gives the layout a "stickers reaching off the page" feel.

## Shapes and Treatment

### Border Weight and Style
- **3px solid `{colors.text-dark}`** — the universal structural border. Cards, framed headers, badges, marker circles, step circles, avatars, chart containers.
- **2px solid `{colors.text-dark}`** — the lighter border used only on small elements at the bullet / legend-swatch / day-header divider scale.
- **~2.1px solid `#232323` or `#000`** — the SVG stroke weight used inside the daisy / star / cloud / sun decorations. This matches the perceived weight of the 3px structural border at the SVG's natural scale.

Borders are never colored. Borders are never dashed. The only line style in the system is solid charcoal.

### Decorative Element Types

**Daisy** — A six-petal white-petal / yellow-center daisy in two paired stem positions. The system's signature ornament. Place at corners (typically `top-left`, `top-right`, `bottom-left`, `bottom-right`), often cropped past the edge at `top:-30px` or `right:-20px`. Two daisies plus 2–3 stars is the most common decoration cluster.

**Star** — A puffy five-pointed sticker star in a solid pastel fill (pink, yellow, mint, lavender, white) with charcoal outline. Used as scattered accents between the larger daisy / sun / cloud ornaments. Vary fill color across instances on the same slide; do not use all-white or all-yellow stars.

**Sun** — A smiling round sun in butter yellow with rays. Used as a single feature ornament, typically at top-left or bottom-right.

**Cloud** — A puffy white-and-blue cloud with optional smaller cloud variant. Used in sequences (two clouds at opposing corners) or as a single ornament on slides that want a sky atmosphere.

**Rainbow** — An arched four-band rainbow (coral / yellow / mint / sky) with the standard charcoal outline. Used as a single feature ornament, typically at top-right or bottom-right.

**Framed Header** (`{components.framed-header}`) — A two-part stacked card: a colored header strip (any pastel) sits flush above a white body. The pair shares one rounded outer corner radius and one continuous 3px border, and the whole unit casts a single offset shadow. Used as a featured info container.

**Badge Pill** (`{components.badge-pill}`) — A short rounded-pill chip with 3px border and butter (default) fill. Used as a section tag or small label. Pill text is Fredoka One at 13.6px.

**Marker Circle Set** — Four sizes (`{components.bullet-dot}` 20px, `{components.circle-dot}` 48px, `{components.circle-icon}` 44px, `{components.step-circle-lg}` 90px). All are outlined circles in a pastel fill, all carry charcoal border. Genuine ordinals or supplied initials inside larger markers use Fredoka One in dark charcoal by default. Empty circles may stay nonsemantic; never invent a letter or step.

**Avatar Circle** — A 100px outlined white circle holding an authorized real portrait or supplied identity's initial. Omit it when no identity is provided. Carries `{shadows.small}`.

**Quote Mark** — An oversized `"` glyph in Fredoka One at ~64px in `{colors.soft-pink}`, placed above the quote body inside a quote card.

**Process Arrow** — A simple `→` glyph in Fredoka One at ~32px in `{colors.text-dark}`, sat between process steps.

**Legend Swatch** — A 18px square with 4px rounded corners and a 2px border. Holds a fill color matched to a corresponding data series.

## Do's and Don'ts

### Do
- Pair Fredoka One with Quicksand strictly by role — Fredoka for every headline and display moment, Quicksand for every paragraph and meta line. The two-face contrast is the system's voice.
- Set the default canvas to `{colors.cream}`. Reach for a saturated pastel surface (turquoise, soft-pink, mint, etc.) when the slide wants a tonal mood, but cream is the safe default for content-heavy moments.
- Apply a 3px solid charcoal outline plus a `{shadows.default}` or `{shadows.small}` hard offset shadow to every elevated container. The outline + offset shadow combo is the system's signature elevation.
- Keep headline text readable against the actual pastel. Add the optional offset-print shadow only when it improves the visual treatment without merging glyphs.
- Use a deliberate edge ornament cluster only where it leaves the real content clear.
- Use outlined colored discs as list bullets — never bare hyphens or asterisks. The `{components.bullet-dot}` with `{colors.butter}` fill is the default.
- Reserve `{colors.coral}` for small high-attention markers (step numbers, timeline dots, day-headers). Coral as a full slide surface breaks the warmth-balance and reads aggressive.
- Center the main content container with a max-width well inside the slide padding. The decorations need room at the edges; full-bleed content blocks the ornament layer.
- Rotate marker / dot colors through the pastel set (coral → mint → sky → lavender → butter) when a sequence needs distinct steps. Do not use a single color for all steps.

### Don't
- Don't use any font other than Fredoka One and Quicksand. The system loads only those two faces from Google Fonts. Adding a third face breaks the storybook voice.
- Don't put Quicksand into a headline or Fredoka One into a paragraph. The role / face mapping is strict.
- Don't use square corners. Every card, every badge, every marker has some radius — the smallest radius in the system is 4px (legend swatch), and most are 20px or larger.
- Don't use blurred or rgba shadows. The system uses solid charcoal offsets only. `0 4px 12px rgba(0,0,0,0.1)` does not exist here.
- Don't use colored borders. All borders are charcoal `{colors.text-dark}`.
- Don't use coral as a full slide surface. Coral is the system's high-attention spot color; it loses power if it covers a region.
- Don't render Fredoka One in italic, underline, or stretched weights. Fredoka has one weight — that's the design.
- Don't treat white text plus a shadow as a guaranteed readable pastel pairing.
- Don't leave a slide's corners empty of decorations. The ornament layer is part of the composition, not optional dressing.
- Don't pile two cards on top of each other without separation. The system reads as one main content region per slide, surrounded by ornament — not as a stack of competing panels.

## Stage adaptation and delivery

All internal geometry stays on the 1920×1080 stage. The shared runtime scales the entire slide uniformly, including type, borders and ornaments; smaller screens may letterbox and do not rearrange columns. Test the real title, densest content, navigation and legibility at the intended viewing sizes. Capture, PDF, reduced motion and audience controls follow the [shared runtime contract](../../../references/deck-runtime.md) and Deck Studio's production workflow. This recipe defines no alternate print or presentation path.

## CJK & International Content

### Role map and visual choice

| Role | Latin face | CJK adaptation candidate |
|---|---|---|
| Display / quotes / markers | Fredoka One 400 | An inspected rounded CJK display face; ZCOOL XiaoWei 400 is a more literary candidate, not a Fredoka equivalent |
| Body / descriptions | Quicksand 500 / 600 | Noto Sans CJK 500 / 600 when those actual faces are provisioned |
| Attribution | Quicksand 700 | A real supported 700 CJK face; do not request missing weights from a single-weight decorative face |

### Composition and mixed-script treatment

Preserve the storybook character primarily through the garden pastels, outlined daisies/stars/clouds/rainbows, rounded cards and hard charcoal shadows. Han display need not mimic Fredoka's bulbous Latin outline to belong in that composition. An optional Yozai 400 body changes the weight system: use its real regular face and distinguish hierarchy by size and spacing, rather than calling it 500/600/700. For mixed content select one adaptation per role and keep it consistent. Start Han headlines around 1.15–1.3 leading, body around 1.6–1.8, with zero Han tracking. The large rounded title needs measured clearance from both the header cap and the ornament layer; it must not be clipped to preserve a sticker arrangement.

### Font provision and script handling

These are candidates, not bundled assets or guaranteed substitutes. Before rendering, provision the exact local font files, weights and styles actually used; record the selected faces and verify the deck's actual glyph inventory, including rare names, punctuation, numerals and locale-specific forms. Do not claim a network font URL, a fallback family name or a browser's synthetic weight proves the intended face loaded. Set `font-synthesis: none`; use explicit script/role classes when weight, style or family differs. A single fallback stack is sufficient only when the same requested face properties are genuinely supported for both scripts.

Keep punctuation, casing, names, metrics and the locked words intact. Apply locale-aware line-breaking and spacing through layout; do not automatically strip terminal punctuation, insert words, translate labels or normalize identifiers. Keep punctuation with the phrase it belongs to and numbers with units. Han tracking starts at zero; Latin tracking remains role-specific. Verify representative full-width punctuation and mixed Latin/Han lines at actual stage size. Do not change claims or numbers merely for fit. If a semantic revision is needed, reopen that part of the semantic source within the mandate and carry the change through the artifact; it is not a visual-only or localization adjustment. Ask only before changing explicitly user-locked meaning or exceeding authority; keep that discussion outside the slide frame.

### System-specific checks

Check title and quote cards with real full-width punctuation, numerals inside 48px and 90px markers, and names inside attribution rows. Use dark text on pastel markers as the default; a shadow does not prove a pale pairing readable. If more room is needed, move ornaments outward, enlarge the card within the stage or split content without removing meaning.

## Iteration Guide

1. Any new container is rounded (20px / 28px / pill / circle), bordered in 3px charcoal, and shadowed with `{shadows.default}` or `{shadows.small}`. Never ship a flat rectangle with square corners.
2. Default to charcoal display text. The optional 3px print shadow must pass visual inspection; it does not establish contrast.
3. Any new paragraph is Quicksand 500 by default; Quicksand 600 when the paragraph needs emphasis.
4. Any new bullet is an outlined colored disc (`{components.bullet-dot}`), not a glyph. The default fill is butter, but circle bullets can rotate through the pastel set.
5. Any new sequence of markers (steps, timeline nodes, day labels) rotates through the pastel set (`coral → mint → sky → lavender → butter`) rather than reusing one color.
6. Add only the ornaments the composition can carry without competing with text, data or navigation.
7. Any new accent surface picks one of the eight pastels. Do not introduce a ninth color.
8. Coral stays a small-marker color only. Do not make a coral surface, a coral card, or a coral headline.
9. Any list bullet sits 4px from the top of the first text line, vertically aligned with x-height, not the line baseline.
10. When a new component needs a "two-part frame" feel, reach for the `{components.framed-header}` pattern (colored cap + white body) rather than nesting two separate cards.

## Production watchpoints

Check charcoal text on every chosen pastel and inside numbered circles. Optional display shadows must not merge glyphs or serve as the sole contrast repair. Keep ornaments behind and away from meaningful text, and allow their removal for fit. Inspect the framed header's continuous outer border and single shadow at its rounded seam.

This document is a recipe, not evidence that a deck was rendered or accepted. Inspect the actual output, keep validation enabled, and record rendered/visual/PDF acceptance through the shared Deck Studio workflow.
