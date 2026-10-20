---
version: alpha
name: Studio
description: "A \"Boring Studios\" agency presentation system — type-as-graphic-mass in the spirit of contemporary design-studio decks (Pentagram, Anti, Order). Heavy display runs in Barlow 900, with a 700/500/400 ladder for subheads and prose, with type so heavy at display scale that it stops being type and starts being a shape. The palette is two-color: near-black field (#1C1C1C), acid yellow type (#F5D200), and the same yellow as a full slide background. IBM Plex Mono carries every footer metadata, slide counter, and three-column lockup. No drop shadows, no rounded corners, no accent colors — the headline IS the design, and the only chromatic decision per slide is dark-yellow-on-near-black or near-black-on-acid-yellow."

colors:
  near-black: "#1C1C1C"
  near-black-alt: "#242422"
  acid-yellow: "#F5D200"
  acid-yellow-alt: "#F0CC00"
  text-on-dark-2: "rgba(245,210,0,0.58)"
  text-on-dark-3: "rgba(245,210,0,0.32)"
  text-on-light-2: "rgba(28,28,28,0.62)"
  text-on-light-3: "rgba(28,28,28,0.35)"
  border-dark: "#2E2E2C"
  border-light: "rgba(28,28,28,0.18)"

color-aliases:
  c-bg: near-black
  c-bg-alt: near-black-alt
  c-bg-light: acid-yellow
  c-bg-light-alt: acid-yellow-alt
  c-fg: acid-yellow
  c-fg-light: near-black
  c-accent: acid-yellow
  c-fg-2: text-on-dark-2
  c-fg-3: text-on-dark-3
  c-fg-light-2: text-on-light-2
  c-fg-light-3: text-on-light-3

typography:
  display:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: 230.4px
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: -0.02em
    textTransform: uppercase
  h1:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: 144px
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: -0.02em
    textTransform: uppercase
  h2:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: 92.16px
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: -0.01em
    textTransform: uppercase
  h3:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: 53.76px
    fontWeight: 700
    lineHeight: 1.1
    textTransform: uppercase
  quote-text:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: 72.96px
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: -0.02em
    textTransform: uppercase
  stat-value:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: 105.6px
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: -0.03em
    textTransform: uppercase
  lead:
    fontFamily: "Barlow, Noto Sans SC, system-ui, sans-serif"
    fontSize: 30.72px
    fontWeight: 500
    lineHeight: 1.45
  body:
    fontFamily: "Barlow, Noto Sans SC, system-ui, sans-serif"
    fontSize: 22.08px
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Barlow, Noto Sans SC, system-ui, sans-serif"
    fontSize: 16.32px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: 13.82px
    fontWeight: 500
    letterSpacing: 0.06em

spacing:
  pad-x: 96px
  pad-y: 54px
  gap-lg: 37.8px
  gap-md: 21.6px
  gap-sm: 10.8px

canvas:
  width: 1920px
  height: 1080px

components:
  chrome-bar:
    borderBottom: "1px solid {colors.border-dark} (or {colors.border-light} on yellow)"
    paddingBottom: "{spacing.gap-sm}"
    marginBottom: "{spacing.gap-md}"
    description: "Top chrome bar — mono label left, mono counter right, hairline rule beneath."
  foot-bar:
    borderTop: "1px solid {colors.border-dark} (or {colors.border-light} on yellow)"
    paddingTop: "{spacing.gap-sm}"
    marginTop: "{spacing.gap-md}"
    description: "Bottom chrome bar — mirror of chrome-bar."
  cover-meta:
    display: "grid 1fr 1fr 1fr"
    borderTop: "1px solid rgba(245,210,0,0.25)"
    description: "Optional left/center/right metadata grid for actual organizations, date, title or author. Populate only supplied fields; never invent a studio/client relationship."
  stat-card:
    borderTop: "2px solid (acid-yellow on dark, near-black on yellow)"
    padding: "{spacing.gap-md} {spacing.gap-md} {spacing.gap-md} 0"
    description: "Stat tile with a 2px top rule. Value at 105.6px weight 900 in the surface's foreground color; label and mono note beneath."
  bullet-marker:
    content: "—"
    color: "acid-yellow on dark, near-black on yellow"
    fontFamily: "{typography.body.fontFamily}"
    description: "Em-dash bullet prefix on every list item; color follows the surface accent."
  compare-divider:
    borderRight: "2px solid (near-black on yellow, dark-text-3 on dark)"
    description: "Single vertical 2px rule separating two compare panels."
  bar-fill-default:
    background: "muted text-on-surface (dark-text-3 or light-text-3)"
    description: "Default chart bar fill — muted version of the surface text color."
  bar-fill-accent:
    background: "acid-yellow on dark, near-black on yellow"
    description: "Highlighted chart bar — the surface's primary foreground color."
  chart-baseline:
    height: "2px"
    background: "muted accent (dark-text-3 or border-light)"
    description: "Heavier 2px baseline beneath chart bars — Studio uses thicker rules than Signal."
  cover-img-area:
    position: "absolute inset 0"
    background: "{colors.near-black-alt}"
    description: "Optional genuine cover image behind the headline and supplied metadata, fitted to the stage. If no image is available or needed, use an intentional unlabelled flat field."
  image-region:
    background: "near-black-alt on dark, acid-yellow-alt on yellow"
    description: "Optional genuine image region on a dark or yellow tonal field. No placeholder label or fake image frame appears in delivered output."
---

## Composition contract

Use the shared [deck runtime](../../../references/deck-runtime.md) for the fixed 1920×1080 stage, navigation and scaling. This recipe owns the visual composition only. Its dimensions are stage-pixel starting points, not browser-responsive rules. Texture, borders, type and overlays belong inside the stage and scale together; slide internals never reflow on phones. Apply the shared [composition guidance](../../../references/composition.md) to content, legibility and fit, and the [visual acceptance method](../../../references/visual-acceptance.md) to the rendered result.

## Overview

Studio is a **type-as-graphic-mass** presentation system, drawing on contemporary design-studio posters and decks. Barlow 900 display forms behave almost as graphic shapes; 700 supports subheads, 500 lead text and 400 sustained body. IBM Plex Mono gives actual metadata a quieter spec-sheet voice. Large typographic mass is the identity, not a requirement to set all content in 900 or reduce a title to one word.

The palette is **two-color**. The dark surface is `{colors.near-black}` (#1C1C1C) — a warm dark, not cold neutral. The light surface is `{colors.acid-yellow}` (#F5D200) — a saturated cadmium yellow that fills the entire slide, not as an accent but as the environment. On dark slides, text is `{colors.acid-yellow}`. On yellow slides, text is `{colors.near-black}`. That's the entire color system: dark/yellow, yellow/dark. There are no secondary colors, no grays, no warming accents. Even muted text is just the same color at reduced opacity (yellow at 58%, near-black at 62%).

The stack is functional: Barlow 900 for display/headlines, 700 for h3, 500 for leads and 400 for body/captions. IBM Plex Mono supplies actual metadata, slide counts and optional cover columns. These distinct weights keep heavy display legible beside sustained prose rather than making every fragment a poster.

Depth is **flat and severe**. No drop shadows. No rounded corners. No gradients. Borders are 1px or 2px hairlines in `{colors.border-dark}` or `{colors.border-light}`. The 2px chart baseline and 2px stat-card top-rule are the heaviest lines in the system. The system reads as an architectural drawing or a manifesto poster — every line is intentional, nothing decorative.

**Density philosophy: low and deliberate.** Give the complete approved headline one dominant region, with the evidence and qualification it needs beneath or beside it. A cover may use a genuine image or an intentional flat field; its full title can occupy multiple lines. The 96px / 54px frame lets type carry spatial weight. When the content has several equally important regions, split coherently or choose a denser system without deleting meaning.

**Key Characteristics:**
- Binary palette — `{colors.near-black}` field with `{colors.acid-yellow}` type, or `{colors.acid-yellow}` field with `{colors.near-black}` type. No third color.
- Barlow at weight 900 uppercase for every headline at every scale; Barlow 400/500 for body; IBM Plex Mono only for metadata chrome.
- Headlines run massive — cover display at 230.4px (~230px at 1920px viewport), statements at 144px, section headers at 92.16px.
- Tight negative letter-spacing on all display type (-0.01 to -0.03em); uppercase non-negotiable.
- Flat: no drop shadows, no rounded corners, no gradients, no accent colors beyond the yellow/dark binary.
- Hairline 1px borders on chrome; 2px on stat-card tops, chart baselines, and compare panel dividers.
- An optional three-column mono footer offers an agency-style cover structure, populated solely by actual supplied metadata.
- Em-dash bullet markers in the surface accent color (yellow on dark, near-black on yellow).
- Body and chrome opacity-tuned versions of the same color (yellow at 58%/32%, near-black at 62%/35%) — never a separate grey color.

## Colors

### Palette

- **Near-Black** (`{colors.near-black}` — #1C1C1C): The dark surface. A warm dark, slightly biased toward brown rather than cold neutral. The "ink" of the system.
- **Near-Black Alt** (`{colors.near-black-alt}` — #242422): A barely-lifted near-black for image regions and secondary dark surfaces. Visually nearly identical to near-black.
- **Acid Yellow** (`{colors.acid-yellow}` — #F5D200): The light surface AND the primary text color on dark surfaces. Cadmium yellow, saturated and slightly warm. On dark slides, this is the type color. On light slides, this is the background. Same color, two roles.
- **Acid Yellow Alt** (`{colors.acid-yellow-alt}` — #F0CC00): A slightly cooler yellow for adjacent-surface differentiation on light slides. Used sparingly.
- **Text on Dark 2** (`{colors.text-on-dark-2}` — rgba(245,210,0,0.58)): Secondary text on dark — yellow at 58% opacity. The system never uses a separate "grey" color; muting is opacity only.
- **Text on Dark 3** (`{colors.text-on-dark-3}` — rgba(245,210,0,0.32)): Tertiary text on dark — yellow at 32%.
- **Text on Light 2** (`{colors.text-on-light-2}` — rgba(28,28,28,0.62)): Secondary text on yellow — near-black at 62%.
- **Text on Light 3** (`{colors.text-on-light-3}` — rgba(28,28,28,0.35)): Tertiary text on yellow — near-black at 35%.
- **Border Dark** (`{colors.border-dark}` — #2E2E2C): Hairline border color on dark surfaces. Slightly lifted from near-black so it reads as a line, not a void.
- **Border Light** (`{colors.border-light}` — rgba(28,28,28,0.18)): Hairline border color on yellow surfaces. Low-opacity near-black for subtle separation.

### Defaults

- **Default surface**: alternate between `{colors.near-black}` (dark) and `{colors.acid-yellow}` (light) across the deck. Both surfaces are first-class. If unsure, reach for near-black for cover/quote/statement slides, acid-yellow for chapter and end slides.
- **Default primary text on dark**: `{colors.acid-yellow}`.
- **Default primary text on yellow**: `{colors.near-black}`.
- **Default secondary text on dark**: `{colors.text-on-dark-2}` (yellow at 58% opacity).
- **Default secondary text on yellow**: `{colors.text-on-light-2}` (near-black at 62%).
- **Required mono captions, chart axes and stat notes** use readable primary or secondary text. Tier-3 opacity is a muted graphic fill, not a default for content the audience must read.
- **Default border on dark**: `{colors.border-dark}`.
- **Default border on yellow**: `{colors.border-light}`.
- **Default headline color**: surface accent — yellow on dark, near-black on yellow. Never any other color.
- **Default chart accent fill**: surface accent (yellow on dark, near-black on yellow). The "highlighted" bar is just the primary text color; "default" bars are tier-3 muted.

There are no semantic color roles. Yellow does not mean "warning"; near-black does not mean "primary." They are simply the two surfaces. Choice between them is rhythmic — alternate to vary the visual cadence, or run several dark slides in a row for a quiet section followed by a single yellow slide for a punctuation moment.

## Typography

### Font Family

Studio runs **two families** in strictly separated roles:

- **Barlow** (`{typography.display.fontFamily}`) — a contemporary grotesque with a wide weight axis. Carries every headline at every scale (display through h3), every numeral (stat-value), every quote, all body, and all lead paragraphs. The system uses weight 900 for all display and headline tokens; weight 700 for h3; weight 500 for lead and bullet markers; weight 400 for body and caption.
- **IBM Plex Mono** (`{typography.label.fontFamily}`) — a precision monospace. Used **only** for metadata labels — chrome bars, slide counters, chapter numbers, the three-column cover lockup, stat notes, mono captions inside cover-meta. Mono is the system's "metadata voice"; everywhere else, Barlow dominates.

The emotional split is binary: Barlow for content (loud, uppercase, dominant); IBM Plex Mono for spec-sheet metadata (small, precise, supportive). There is no third face.

Barlow weight 900 at display scale stops behaving like a typeface and starts behaving like a graphic shape — the letterforms are so heavy that counters (the holes inside letters) become structural negative space, and the headline reads as a black or yellow geometric block before it reads as words. This is the system's identity.

### Type Scale

| Token | Size | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.display}` | 230.4px | Barlow | 900 | Cover hero at maximum scale |
| `{typography.h1}` | 144px | Barlow | 900 | Chapter title, full-slide statement headline |
| `{typography.stat-value}` | 105.6px | Barlow | 900 | Statistical numeral inside a stat card |
| `{typography.h2}` | 92.16px | Barlow | 900 | Primary slide headline |
| `{typography.quote-text}` | 72.96px | Barlow | 900 | Pull-quote body (uppercase, no quote marks) |
| `{typography.h3}` | 53.76px | Barlow | 700 | Sub-headline, panel title |
| `{typography.lead}` | 30.72px | Barlow | 500 | Lead paragraph, intro sentence |
| `{typography.body}` | 22.08px | Barlow | 400 | Default body paragraph, bullet body |
| `{typography.caption}` | 16.32px | Barlow | 400 | Caption, source attribution |
| `{typography.label}` | 13.82px | IBM Plex Mono | 500 | Mono chrome, slide counter, chapter number, stat note, cover-meta |

### Defaults

- **Default size for a primary section headline**: `{typography.h2}` (92.16px).
- **Default size for a chapter or statement headline**: `{typography.h1}` (144px).
- **Default size for a cover hero**: `{typography.display}` (230.4px).
- **Default size for a paragraph body**: `{typography.body}` (22.08px).
- **Default size for a lead sentence**: `{typography.lead}` (30.72px).
- **Default size for any chrome label, counter, or mono caption**: `{typography.label}` (13.82px).
- **Default size for a statistical numeral**: `{typography.stat-value}` (105.6px) in the surface accent.
- **Default weight for any headline**: 900.
- **Default weight for any body element**: 400 (lead = 500).

When unsure between sizes, lean larger. Studio's identity depends on type running massive — a 92.16px h2 reads as the system; a 53.76px h3 used as a primary headline reads as a different system.

### Signature Treatments

Apply Latin case and tracking treatments only where they preserve the source's identifiers, names and script conventions. Missing semantic fields remain absent.

Use these signatures where the corresponding content exists. They govern composition, not permission to add words, alter meaning or force unsupported type:

- **Every display, h1, h2, h3, quote-text, and stat-value is uppercase.** Sentence-case display type does not exist. Even h3 (53.76px) at weight 700 runs uppercase.
- **Every display headline uses weight 900.** Display, h1, h2, quote-text, and stat-value are all weight 900 — no exceptions. Using weight 800 or 700 at display scale breaks the type-as-graphic-mass effect.
- **Every display element uses negative letter-spacing.** Display at –0.02em, h1 at –0.02em, h2 at –0.01em, stat-value at –0.03em. Display Barlow 900 without negative tracking reads as untreated; the negative tracking is what gives the type its compressed density.
- **All chrome, labels, counters, and metadata are IBM Plex Mono at 0.06em tracking.** No exceptions. Mono labels in Barlow break the metadata/content separation.
- **Headlines are always rendered in the surface accent color** — yellow on dark, near-black on yellow. Never a muted opacity, never a different color.
- **Body bullets use an em-dash in the surface accent color**, never a dot, never a different glyph. The em-dash carries surface-aware color (yellow on dark, near-black on yellow).
- **Stat cards have a 2px (not 1px) top rule** in the surface accent (or muted accent on the dark side). The 2px rule is heavier than chrome hairlines because stats are anchors.
- **The optional cover metadata grid** uses mono left/center/right alignment. Preserve only the actual supplied fields; omit missing organization, author or date slots rather than inventing a signature lockup.

### Typography Principles

The face ladder is fixed: Barlow for everything except metadata; IBM Plex Mono for metadata only. Mono outside metadata roles, or Barlow inside metadata roles, breaks the typographic separation.

The weight ladder is fixed too: 900 / 700 / 500 / 400. Intermediate weights (600, 800) are not used. The four-tier weight system is the entire expressive register of the typography.

Line-height runs tight at display scale (0.9 on display, 0.92 on h1) and opens to 1.5–1.6 on body. Letter-spacing is uniformly negative on display (–0.01 to –0.03em), zero on body, positive 0.06em on mono labels.

Italic is not used. Underline is not used. There is no font-style variation in the system; emphasis is achieved purely by weight contrast (900 headline against 400 body).

## Layout

### Canvas System

Compose on the shared 1920×1080 stage. Start at 96px horizontal and 54px vertical insets. Headlines are graphic masses contained within measured text regions, with 38px, 22px and 11px gaps between major, related and tightly coupled elements. Let full-bleed imagery reach the edges, but keep title and metadata readable inside their own bounds.

### Padding and Gap Scale

| Token | Value | Use |
|---|---|---|
| `{spacing.pad-x}` | 96px | Horizontal slide padding |
| `{spacing.pad-y}` | 54px | Vertical slide padding |
| `{spacing.gap-lg}` | 37.8px | Between major content sections |
| `{spacing.gap-md}` | 21.6px | Between related elements |
| `{spacing.gap-sm}` | 10.8px | Between tightly coupled elements |

Statement and chapter slides increase bottom padding to 1.5× pad-y so the headline drops to the lower portion of the slide with deliberate empty space above. The cover slide uses zero outer padding because the image area fills the entire canvas.

### Chrome Frame

Standard slides carry a top chrome bar and a bottom foot bar:

- **Chrome bar** — left-aligned mono label, right-aligned mono counter, 1px hairline rule beneath. Padding-bottom is `{spacing.gap-sm}`, margin-bottom is `{spacing.gap-md}`.
- **Foot bar** — left-aligned mono label, right-aligned mono counter, 1px hairline rule above. Mirror of the chrome bar.

The cover, chapter, statement, quote, and end slides omit standard chrome — those layouts use either the cover-meta lockup (cover) or nothing (chapter, statement, quote, end).

### Cover Lockup

The cover slide is the system's signature layout:
- A genuine image may fill the stage, or the cover may remain a deliberate flat field without a placeholder label.
- A single display headline (typically one word at 230.4px) sits in the top area as `cover-type`.
- A left/center/right mono footer may hold actual organization, title, author or date fields, with a 1px surface-aware separator. Missing metadata stays absent.

## Depth and Elevation

Studio is **flat by design**. There are no drop shadows. No rounded card elevation. No gradients. Every element sits flush with the surface.

Apparent depth comes from:
- **Surface contrast** — near-black against acid-yellow when both appear (compare panels, image regions).
- **Hairline separation** — 1px and 2px borders divide regions.
- **Heavy type** — display headlines at weight 900 create visual mass that reads as foreground against the flat surface.

The system is intentionally severe. If heavy type, flat surfaces and hairlines cannot distinguish all necessary material, reorganize, split or change systems. Do not remove evidence or qualifications to preserve severity.

## Shapes and Treatment

### Border Radius

| Value | Use |
|---|---|
| 0 | Everything in the system |

Studio has **no rounded chrome**. Cards, panels, stat tiles, chart frames, image regions, compare panels — all strict rectangles with sharp corners. Runtime controls are separate from this shape vocabulary.

### Border Weights

- **1px solid** in `{colors.border-dark}` (on near-black) or `{colors.border-light}` (on yellow) — the universal hairline. Used on chrome bars, foot bars, cover-meta separator.
- **2px solid** in the surface accent (yellow on dark, near-black on yellow) — the heavier rule. Used on stat-card top rules, compare panel vertical dividers, chart baselines, chart bar-track left rules.
- **No dashed borders.** Every border in the system is solid.

### Decorative Element Types

**Display headline as graphic mass** — Barlow at weight 900 at display scale (92.16px and above) sits as a black or yellow geometric block. The headline is the primary decorative element of every slide; there are no additional ornaments.

**Hairline rule** — a 1px solid line in the surface border color. Used to separate chrome from body, body from foot, and inside compare panels. The rule is the system's only structural divider.

**Heavy rule** — a 2px solid line in the surface accent (or muted accent). Used on stat-card tops, chart baselines, compare-panel vertical dividers. Heavier than the chrome hairline; reads as "anchor" rather than "separator."

**Stat card** — a flat region with a 2px top rule, a stat numeral (105.6px Barlow 900) in the surface accent, a stat label (22.08px Barlow 500), and an optional mono stat-note (16.32px starting IBM Plex Mono in a readable foreground). Padding right and bottom; left padding is zero (the rule starts flush with the card's left edge).

**Cover metadata grid** — An optional left/center/right mono footer, separated by a quiet 1px rule. Use actual supplied organizations, title, author or date; do not create a client relationship or duplicate a studio name to fill a column.

**Image region** — A genuine approved image fitted to a strict rectangular region. A near-black or acid-yellow tonal field may be an intentional composition when no image is needed. Do not ship a placeholder label, missing-asset notice or pretend image.

**Chart bar** — a flat vertical rectangle in muted text-on-surface color (default) or the surface accent (highlighted). No rounded ends, no gradient. The "hi" variant uses the full accent color and weight 900 on its numerical label.

**Chart baseline** — a 2px solid line in muted surface accent (yellow tier-3 on dark, border-light on yellow) running the full width of the chart wrapper, below the bar tops.

**Em-dash bullet** — `—` prefix on every list item in the surface accent color, with 0.5em right margin. Color flips with the surface.

## Do's and Don'ts

### Do

- Use Barlow at weight 900 uppercase for every headline at every scale, with negative letter-spacing of at least -0.01em. The type-as-graphic-mass effect is the system's identity.
- Alternate `{colors.near-black}` and `{colors.acid-yellow}` surfaces freely. Both are first-class; the rhythm of dark/yellow alternation is the system's pacing.
- Color every headline in the surface accent — yellow on dark, near-black on yellow. Never a muted version, never a third color.
- Use IBM Plex Mono only for metadata (chrome labels, slide counters, chapter numbers, cover-meta lockup, stat notes, mono captions). Mono is the spec-sheet voice; never use it for content.
- Render the cover-meta footer as a three-column mono lockup (left/center/right). This is the system's signature pattern.
- Mute secondary text with opacity (.58 on yellow, .62 on near-black), not with a separate grey color. The system has no greys — only opacity variants of yellow and near-black.
- Apply 2px rules to stat-card tops, chart baselines, and compare-panel dividers. The 2px weight differentiates "anchor" elements from chrome hairlines.
- Use em-dashes in the surface accent color as bullet markers — never dots, never circles.
- Pad slides tight (96px / 54px) so display type runs near the edge. Studio depends on type filling the canvas; generous padding breaks the scale effect.
- Leave statement and chapter slides deliberately sparse. One massive headline against empty surface is the correct register for those slide types.

### Don't

- Don't lowercase a headline. Every Barlow 900 element runs uppercase, no exceptions.
- Don't use weight 800 or 700 at display scale. Display = 900 weight, always.
- Don't add a third color to the palette. The system is binary plus opacity variants — adding red, blue, or any accent breaks the binary logic.
- Don't round any corner. Keep content regions rectangular; runtime controls remain under their own owner.
- Don't add drop shadows or gradients. The system is severely flat — depth comes from contrast and weight, not elevation.
- Don't use Barlow for chrome metadata. Mono is the metadata voice; chrome in Barlow reads as content rather than spec.
- Don't use Mono for headlines or body. Mono lives in the metadata role only.
- Don't add italic, underline, or color variants for emphasis. The only emphasis mechanism is weight contrast (900 vs 400).
- Don't introduce dashed borders. Every line in the system is solid.
- Don't fill more than ~60% of a typical slide with content. The empty surface is structural — Studio reads as broken when crowded.

## CJK & International Content

### Pairing and visual intent

| Role | Latin | CJK candidate | Treatment |
|---|---|---|---|
| Display, h1/h2, quotes, stats | Barlow 900 | Noto Sans SC 900, if loaded | Heavy sans continuity; inspect dense counters |
| h3 | Barlow 700 | Noto Sans SC 700 | Subordinate title weight |
| Lead, body, caption | Barlow 500 / 400 | Noto Sans SC 500 / 400 | Upright readable prose |
| Metadata | IBM Plex Mono | Verified Noto CJK mono or Noto Sans SC | Preserve three-column alignment explicitly |

A heavy CJK sans is the first candidate because Studio's graphic mass comes from a severe sans voice. A heavy Noto Serif alternative can produce a woodblock-poster register, but that is a visible aesthetic change to preview; it is not an upgrade or a mass equivalent. There is no numerical percentage by which a CJK version loses the Latin identity.

### Composition adjustments

Chinese has no uppercase transform, and the square glyph proportions differ from Barlow capitals. Retain the near-black/yellow inversion, strong headline mass and tight structural gutters; remove Latin negative tracking on CJK runs. Open display leading to 1.15–1.25 and inspect counters at the actual 230px cover or 144px statement size. A heavier request cannot compensate for a missing font asset.

Use a consistent display family for a full CJK headline when that gives the most coherent block. For a meaningful mixed-language title, separate script runs deliberately and inspect their baselines, weight and widths. Do not move Chinese content off the cover or translate it to English to preserve a Latin look.

The cover footer can keep its left/center/right grid with Chinese metadata. Font fallback alone does not make columns align: size each column for the real studio/client, title and author information. Omit missing optional metadata rather than inventing names; do not add a second organization to complete a multiplication-sign lockup. The title need not be reduced to one word.

Keep numerical values, units and notation exactly as approved. Studio statistics are upright, not italic. Axis labels and stat notes must remain readable; the tier-3 opacity is an atmospheric option, not a mandatory text color. Use stronger foreground text when the source notes carry needed meaning.

The binary fields, 2px stat rules and absence of rounded chrome survive script changes. If a long title or dense evidence does not fit, compose a sequence with one dominant statement per slide or select a more appropriate system; do not delete content to achieve a poster silhouette.

### Script and font handling

These are candidate pairings, not metric equivalents or proof that a font is loaded. Inspect the exact font files, supported styles/weights, language coverage and rendered glyphs before accepting a deck. A CSS family stack alone does not load a font. Use locale-appropriate Simplified Chinese, Traditional Chinese, Japanese or Korean cuts; one Chinese pairing does not cover all CJK typography.

Set CJK runs to upright style, zero tracking and no case transform unless the chosen face explicitly supplies another intended style. Begin around 1.15–1.25 display line-height and 1.75–1.85 body line-height, then inspect the actual text. Preserve the locked language, wording, numerals and punctuation; do not add Latin labels for atmosphere. Follow the content's locale for punctuation, spacing at script boundaries and line breaking, keeping opening/closing punctuation with its phrase. Preserve quotations exactly unless an editorial change is approved.

Scope script styling to intentional runs with language tags. Do not apply inherited Latin italic or heavy weights to a regular-only CJK face and let the browser synthesize them. Compare mixed-script baselines visually; `palt` changes horizontal glyph metrics where supported, not vertical alignment, and is not a universal baseline repair. Adjust a run's baseline only after seeing the actual pair. A pure-CJK line still needs fit and clipping checks.

## Iteration Guide

1. Any new headline uses Barlow weight 900 uppercase with negative letter-spacing. Without all three (weight, case, tracking), the type loses its graphic-mass character.
2. Choose dark/yellow sequence for the story's rhythm. A short 2–3-slide run can establish continuity before an inversion marks a real change; alternation is a design choice, not a rule on every slide.
3. Any new chrome, metadata, label, or counter uses IBM Plex Mono. Mono in any other role breaks the metadata separation.
4. Any new color introduces a third option to the binary palette — don't. Stick to yellow and near-black, with opacity variants for muting.
5. Any new bullet list uses em-dash markers in the surface accent. Dot bullets break the system.
6. Stat cards use the 2px top rule plus a 105.6px weight 900 numeral. Smaller stats, sentence-case stats, or rounded stat tiles break the pattern.
7. Use the cover's left/center/right mono grid when real metadata makes it useful. Omit absent fields; the full title and typographic mass can carry a cover alone.
8. Chapter, statement, quote, and end slides are chromeless. Standard slides carry chrome and foot. Don't blend the two — a chromeless quote is correct; a chromed quote reads as a different system.
9. New layouts should aim for one dominant element (the headline) plus minimal supporting elements. Multi-element layouts (more than 4–5 distinct regions) crowd the design.
10. The 2px rule weight is reserved for anchors (stat-tops, baselines, compare dividers). Chrome and structural separators stay at 1px.

## Known Gaps

- The two font families (Barlow, IBM Plex Mono) load from Google Fonts. If fonts fail, fallbacks are Noto Sans SC / system-ui (for Barlow) and monospace (for IBM Plex Mono); the system degrades significantly without Barlow 900, since the type-as-graphic-mass effect depends on the specific letterforms.
- Noto Sans SC is a candidate script-support family, not proof of loading or clean rendering. Verify the actual 400/500/700/900 files and glyphs needed by the content.
- The `--c-bg-alt`, `--c-bg-light-alt`, and several muted color tokens are defined but used sparingly — they exist as a reserve for adjacent-surface differentiation.
- The common runtime owns navigation, state classes and any transitions. Do not embed a competing slide engine.
- A delivered image region contains a genuine image or a deliberate flat field. There must be no visible placeholder label; verify the real asset and reading contrast over it.
- The 96px / 54px stage frame is intentionally tight. Inspect complete glyph bounds and negative tracking at stage and destination size; scaling cannot rescue clipped title edges.
- The compare panel uses a 2px right border on the left panel only (no left border on the right), creating an asymmetry between the two panels — this is intentional but worth noting if extending the compare layout to 3-up.
