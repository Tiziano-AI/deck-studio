---
version: alpha
name: Broadside
description: A protest-poster editorial system built on massive Barlow type and a single fire-orange environment color. The aesthetic is "ink on fire" — dark slides for documentation, orange slides for declaration. Display type is enormous (249.6px, roughly 187px at 1440 width) in weight 900 lowercase, treating words as graphic elements rather than reading copy. The cultural reference is broadside printing, SPACE10 reports, and Wim Crouwel grids reinterpreted with one loud color and zero decoration.

colors:
  ink-black: "#111111"
  ink-black-alt: "#1A1A18"
  fire-orange: "#E85D26"
  cream: "#F0ECE5"
  cream-muted: "#888880"
  cream-hint: "#505048"
  border-dark: "#282826"
  ink-on-orange-muted: "rgba(17, 17, 17, 0.75)"
  ink-on-orange-hint: "rgba(17, 17, 17, 0.55)"
  ink-on-orange-faint: "rgba(17, 17, 17, 0.40)"
  ink-on-orange-border: "rgba(17, 17, 17, 0.20)"

color-aliases:
  c-bg: ink-black
  c-bg-alt: ink-black-alt
  c-bg-orange: fire-orange
  c-fg: cream
  c-fg-2: cream-muted
  c-fg-3: cream-hint
  c-accent: fire-orange
  c-border: border-dark

typography:
  display:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: "249.6px"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: -0.04em
  h1:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: "144px"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: -0.03em
  h2:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: "86.4px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  h3:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: "53.8px"
    fontWeight: 600
    lineHeight: 1.2
  lead:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: "30.7px"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: "23px"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: "17.3px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "13.8px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.14em
    textTransform: uppercase
  stat-value:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: "105.6px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: -0.04em
  quote-mark:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: "192px"
    fontWeight: 900
    lineHeight: 0.6
  quote-text:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: "73px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.02em
  fadelist-item:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: "144px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: -0.03em
  fadelist-title:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: "201.6px"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: -0.04em

spacing:
  pad-x: "105.6px"
  pad-y: "59.4px"
  gap-lg: "37.8px"
  gap-md: "21.6px"
  gap-sm: "10.8px"

canvas:
  width: 1920px
  height: 1080px

motion:
  ease-slide: "cubic-bezier(0.77, 0, 0.175, 1)"
  dur-slide: "0.8s"
  ease-enter: "cubic-bezier(0.16, 1, 0.3, 1)"
  dur-enter: "0.5s"

components:
  slide-chrome:
    layout: "flex row, justify space-between"
    paddingBottom: "{spacing.gap-sm}"
    borderBottom: "1px solid {colors.border-dark}"
    marginBottom: "{spacing.gap-md}"
    description: "Top chrome bar carrying section label on left, slide number/meta on right. Suppressed on cover, chapter, quote, and end slides."
  slide-foot:
    layout: "flex row, justify space-between"
    paddingTop: "{spacing.gap-sm}"
    borderTop: "1px solid {colors.border-dark}"
    marginTop: "{spacing.gap-md}"
    description: "Bottom chrome bar, mirrors top chrome. Same suppression rules."
  rule:
    width: 36px
    height: 2px
    background: "{colors.fire-orange}"
    description: "Stub accent rule. On orange slides this flips to {colors.ink-black}."
  rule-full:
    width: "100%"
    height: 2px
    background: "{colors.border-dark}"
  kicker:
    fontFamily: "{typography.label.fontFamily}"
    fontSize: "{typography.label.fontSize}"
    letterSpacing: 0.14em
    textTransform: uppercase
    color: "{colors.fire-orange}"
    description: "Eyebrow above headlines. Orange on dark; dark-ink-at-55%-opacity on orange."
  tag:
    fontFamily: "{typography.label.fontFamily}"
    fontSize: "{typography.label.fontSize}"
    letterSpacing: 0.14em
    textTransform: uppercase
    color: "{colors.fire-orange}"
    border: "1px solid {colors.fire-orange}"
    padding: "0.3em 0.8em"
    description: "Bordered mono tag. On orange slides flips to dark ink with 40%-opacity dark border."
  broadside-num:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "21.1px"
    fontWeight: 500
    letterSpacing: 0.1em
    color: "rgba(17, 17, 17, 0.45)"
    description: "Catalogue-style slide number, typically anchored top-left on orange slides. On dark slides, color shifts to {colors.cream-hint}."
  stat-card:
    borderTop: "1px solid {colors.border-dark}"
    padding: "{spacing.gap-md} {spacing.gap-md} {spacing.gap-md} 0"
    description: "Top-border-only data card. Big orange numeral above body label above mono note."
  bullet-marker:
    content: "/"
    color: "{colors.fire-orange}"
    fontFamily: "IBM Plex Mono, monospace"
    fontWeight: 700
    description: "Slash glyph rendered via ::before on every bullet item. Orange on dark, dark-at-45%-opacity on orange."
  compare-panel-left:
    paddingRight: "calc({spacing.pad-x} * 0.55)"
    borderRight: "1px solid {colors.border-dark}"
  compare-panel-right:
    paddingLeft: "calc({spacing.pad-x} * 0.55)"
  compare-panel-orange:
    background: "{colors.fire-orange}"
    description: "Right-half panel filled with fire orange — the 'after' or payoff side in compare layouts."
  bar-track:
    height: "324px"
    borderLeft: "1px solid {colors.border-dark}"
    description: "Vertical bar chart container. Bars are cream-hint by default; one bar per chart gets the .accent class for fire orange."
  bar-fill:
    background: "{colors.cream-hint}"
  bar-fill-accent:
    background: "{colors.fire-orange}"
  img-placeholder:
    height: "594px"
    background: "rgba(255, 255, 255, 0.04)"
    border: "1px dashed {colors.border-dark}"
    textTransform: uppercase
    letterSpacing: 0.12em
    description: "A 594px-tall region for supplied media; recompose if no media is supplied rather than showing a placeholder."
  fadelist-stack:
    description: "Vertical stack of three display-weight words, opacities 1.0 / 0.5 / 0.22 top-to-bottom. The SPACE10 'before/during/after' treatment."
---

## Stage and Content Contract

This recipe supplies visual decisions for Deck Studio's fixed **1920×1080** stage. Use the canonical [runtime](../../../runtime/) and [runtime contract](../../../references/deck-runtime.md) for stage scaling, navigation, focus, capture and export. Do not create a second scaler, slide controller, keyboard handler or print engine. The whole stage scales uniformly, including on phones; the composition does not internally reflow with the browser viewport.

All dimensions below are stage-space authoring values. A range is a choice to resolve while composing, not permission for live viewport-dependent layout. Body and data text must remain readable in the intended presentation or reading setting: enlarge and recompose, split while retaining all locked material, or choose another system when the content does not fit. Never clip, scroll, hide, omit or invent material to complete a layout. Visible labels, metrics, attribution, ordinals, emphasis and status come from the content lock; wordless geometry may supply atmosphere.

## Overview

Broadside is a **protest-poster editorial system**. The defining premise: type is so large it stops behaving as text and starts behaving as graphic primitive. Display sizes at `249.6px` (`{typography.display}`) put a single word at roughly 187px on a 1440-wide screen — wide enough that the eye scans letterforms before reading. This is the system's primary expressive instrument.

The typeface stack is monolithic. **Barlow** carries every text role from `{typography.display}` down to `{typography.body}` — there is no serif companion, no script accent, no secondary display face. The expressive range is achieved entirely through weight (400 to 900) and size, not face contrast. **IBM Plex Mono** is the only secondary face and it appears only in chrome: slide numbers, kickers, labels, tags, captions, and the bullet-list slash markers. **Noto Sans SC** sits in every font-family stack as the CJK fallback at matching weights. The voice is uniform, heavy, and lowercase — *Broadside does not use uppercase headlines.* That is a meaningful inversion of the brutalist norm.

The palette functions in two distinct registers. The **dark register** uses near-black canvas `{colors.ink-black}` with cream text `{colors.cream}` and `{colors.fire-orange}` as the singular accent — the orange is used only for emphasis (kickers, accent stats, bullet markers, a meaningfully distinguished bar). The **orange register** flips the relationship entirely: `{colors.fire-orange}` becomes the full slide background, and the same dark `#111111` ink is used for headlines and body. There is no light/cream slide variant. Cover and chapter slides default to the orange register; content slides default to dark.

Depth is **flat**. There are no drop shadows, no elevation tokens, no soft surfaces. Hierarchy is constructed entirely from type weight, type size, and 1px hairline dividers. The `slide-chrome` and `slide-foot` borders, the `stat-card` top borders, and the `compare-panel` divider are the system's only depth signals. Everything sits on a single plane.

**Density philosophy: low to medium.** Broadside is built for negative space. A correctly composed slide pairs one massive display moment with a 1–2 line caption and nothing else. Three items fit a strong list composition; longer locked lists continue on additional slides or use another system without omitting items. A slide that feels broken in this system is one where four columns of body copy compete for attention; the correct density is one statement, one rule, breathing room. Cover, chapter, and quote slides take this furthest, suppressing chrome entirely and leaving the type alone in the field.

**Key Characteristics:**
- Massive Barlow display type at weight 900 in **lowercase** — never uppercase on display elements.
- Two-register color system: dark slides with cream text, or orange slides with dark ink. No cream/white slides exist.
- `{colors.fire-orange}` is both accent (on dark) and environment (on orange) — never a secondary color, always *the* color.
- Single-typeface system on Barlow + IBM Plex Mono for chrome only. No serif, no script, no third face.
- 1px hairline dividers (`{colors.border-dark}` on dark; `rgba(17,17,17,0.2)` on orange) provide all hierarchy structure.
- Mono kickers, mono tags, mono catalogue numbers — the chrome voice is always IBM Plex Mono uppercase.
- Bullet lists use `/` glyph in mono as the marker, with around three items per composition and complete longer lists continued.
- Flat plane — no shadows, no rounded surfaces, no gradient backgrounds.
- `{spacing.pad-x}` of 105.6px + `{spacing.pad-y}` of 59.4px creates a generous frame; type fills the remaining space.

## Colors

### The Two Registers
Broadside operates on a binary surface system. Every slide is either **dark** (near-black background, cream text, orange as singular accent) or **orange** (fire-orange background, dark-ink text, dark-ink as the muted-emphasis tone). There is no cream/paper register. Choose one register per slide and commit to it.

### Palette
- **Ink Black** (`{colors.ink-black}` — #111111): The dark register's primary canvas, and the primary text color on orange slides. Slightly softer than pure black but reads as black. This is the universal "ink" of the system.
- **Ink Black Alt** (`{colors.ink-black-alt}` — #1A1A18): A secondary surface for the dark register, used when a region needs to feel slightly raised from the base canvas without breaking the flat plane.
- **Fire Orange** (`{colors.fire-orange}` — #E85D26): The signature. On dark slides it is the accent — kickers, accent stat values, bullet markers, a meaningfully distinguished bar in a chart, the orange opening quote mark. On orange slides it is the entire environment. Saturation is high but the hue is warm rather than electric; it reads as protest poster, not safety vest.
- **Cream** (`{colors.cream}` — #F0ECE5): Primary text color on dark slides. Warm off-white, never pure white — the warmth softens the dark canvas and signals an editorial register.
- **Cream Muted** (`{colors.cream-muted}` — #888880): Secondary text on dark slides — supporting body, sub-headings, the muted half of a comparison.
- **Cream Hint** (`{colors.cream-hint}` — #505048): Tertiary text on dark — chart axis labels, source notes, slide numbers when not in mono context.
- **Border Dark** (`{colors.border-dark}` — #282826): The 1px divider color on dark slides. Barely visible against the canvas; provides structure without drawing attention.
- **Ink-on-orange overlays**: Dark ink at four opacities (75% / 55% / 40% / 20%) for body, hint, label, and border treatments on orange slides. These are the orange register's "muted" equivalents.

### Defaults
- **Default surface for content slides**: `{colors.ink-black}` (dark register).
- **Default surface for cover, chapter, statement-payoff, and section-divider slides**: `{colors.fire-orange}` (orange register).
- **Default headline color on dark surfaces**: `{colors.cream}`.
- **Default headline color on orange surfaces**: `{colors.ink-black}`.
- **Default body text color on dark surfaces**: `{colors.cream}`.
- **Default body text color on orange surfaces**: `rgba(17, 17, 17, 0.75)`.
- **Default accent color on dark surfaces**: `{colors.fire-orange}` — used for kickers, accent stat values, bullet markers, a meaningfully distinguished bar in a chart, and the opening quote mark.
- **Default accent color on orange surfaces**: `{colors.ink-black}` — the dark ink itself becomes the contrast pop.
- **Default chrome border color**: `{colors.border-dark}` on dark; `rgba(17, 17, 17, 0.2)` on orange.

The orange register has no third color. When emphasis is needed on an orange slide, use weight or opacity contrast on the existing ink, not a new hue. Introducing a second accent color breaks the system.

## Typography

### Font Family
**Barlow** carries display, headings, leads, body and captions. **IBM Plex Mono** is reserved for chrome: slide numbers, kickers, tags, labels, chart axes, bullet-list markers, image captions and source notes. For other scripts, select and verify the role-specific alternatives described below; a fallback does not guarantee identical metrics or glyph coverage. The contrast between Barlow's tight grotesque density and IBM Plex Mono's even monospace is the system's secondary typographic rhythm; the primary rhythm is Barlow's own weight and size axis.

Italic is not used. Underline is not used. The only emphasis mechanisms are weight, size, and color (orange accent on dark, or weight-only on orange).

### Display, Heading, and Body Scale

| Token | Size | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.display}` | 249.6px | Barlow | 900 | Cover-scale display — the single dominant element on a slide where type *is* the composition |
| `{typography.fadelist-title}` | 201.6px | Barlow | 900 | Oversized side-of-stage display in a fadelist composition |
| `{typography.quote-mark}` | 192px | Barlow | 900 | The opening quotation glyph on a pull-quote slide |
| `{typography.h1}` | 144px | Barlow | 800 | Chapter or section-opener title |
| `{typography.fadelist-item}` | 144px | Barlow | 900 | Each stacked word in a three-stage fadelist treatment |
| `{typography.stat-value}` | 105.6px | Barlow | 900 | Large data figure inside a stat card |
| `{typography.h2}` | 86.4px | Barlow | 700 | Primary slide headline |
| `{typography.quote-text}` | 73px | Barlow | 700 | Pull-quote body |
| `{typography.h3}` | 53.8px | Barlow | 600 | Sub-headline or panel title inside a comparison |
| `{typography.lead}` | 30.7px | Barlow | 400 | Lead paragraph, list items, prominent supporting copy |
| `{typography.body}` | 23px | Barlow | 400 | Standard body paragraph |
| `{typography.caption}` | 17.3px | Barlow | 400 | Image caption, footnote, source line |
| `{typography.label}` | 13.8px | IBM Plex Mono | 500 | Chrome labels, kickers, tags, mono notes |

### Defaults
- **Default size for a primary content slide headline**: `{typography.h2}` (86.4px).
- **Default size for a cover or chapter title**: `{typography.h1}` (144px).
- **Default size for the single declarative display moment on a statement slide**: `{typography.display}` (249.6px).
- **Default size for paragraph body**: `{typography.body}` (23px); for the lead paragraph immediately following a headline, `{typography.lead}` (30.7px).
- **Default size for any inline chrome element (label, kicker, tag, slide number, axis label)**: `{typography.label}` (13.8px).
- **Default size for a hero numerical figure inside a stat card**: `{typography.stat-value}` (105.6px).
- **Default weight for any Barlow display moment (h2 and above)**: 700+; for the largest display, 900.
- **Default weight for body**: 400.

When unsure, reach for `{typography.h2}` for the slide's primary text moment. `{typography.h1}` is reserved for chapter/section openers; `{typography.display}` for the rare moment where type is the entire composition.

### Signature Treatments
These treatments are **non-optional whenever the corresponding element type is used**:

- **All Barlow display, heading, lead, and body text is set in sentence case (or true title case for proper nouns).** Uppercase Barlow at display weights does not exist in this system — it reads as a different design language entirely. The lowercase-display choice is the most distinctive single decision in Broadside.
- **All IBM Plex Mono chrome text is uppercase with at least 0.1em letter-spacing.** Mono labels, kickers, tags, slide numbers, axis labels, source notes, and bullet markers are always uppercase. The uppercase/lowercase split between Barlow body and mono chrome is the system's primary case rhythm.
- **All display tokens carry negative letter-spacing.** `{typography.display}` and `{typography.stat-value}` at -0.04em; `{typography.h1}` and `{typography.fadelist-title}` at -0.03em or -0.04em; `{typography.h2}` and `{typography.quote-text}` at -0.02em. Barlow at display weight without negative tracking reads as untreated.
- **All Barlow display elements run at weight 700, 800, or 900 — never lighter.** Lighter Barlow at display sizes loses the broadside density.
- **On orange slides, every Barlow display/h1/h2/h3 element is forced to `{colors.ink-black}`.** This is the "ink on fire" rule — cream-colored headlines on orange do not exist.
- **Every bulleted list item carries the orange `/` mono marker via `::before`.** Bullet discs, dashes, or numerals do not exist in this system.
- **Every kicker is uppercase IBM Plex Mono at `{typography.label}` size in `{colors.fire-orange}`** (or dark-ink-at-55%-opacity on orange).

### Typography Principles
The weight-900 + lowercase + negative-tracking + Barlow combination is the system's voice. Substituting uppercase, switching to weight 600, or removing the negative tracking each reads as a different system. The chrome's IBM Plex Mono uppercase + 0.14em-tracking is similarly inseparable.

Line-height collapses at scale: `{typography.display}` runs at 0.88, `{typography.h1}` at 0.9, `{typography.h2}` at 1.1, and only by `{typography.lead}` does it open to 1.5+. The compression at the top of the scale is what makes the display feel monolithic.

## Layout

### Canvas System
Compose inside the canonical 1920×1080 stage. Keep the recipe's internal grid, margins and visual layers in stage coordinates. The runtime owns the outer viewport fit and slide visibility; recipe CSS must not replace its container positioning or slide-state classes. Reserve space for actual runtime controls where present and never reproduce them as painted buttons or invented hints.

### Padding and Gap Scale
| Token | Value | Use |
|---|---|---|
| `{spacing.pad-x}` | 105.6px | Outer horizontal padding on every slide |
| `{spacing.pad-y}` | 59.4px | Outer vertical padding on every slide |
| `{spacing.gap-lg}` | 37.8px | Large vertical spacing between major blocks |
| `{spacing.gap-md}` | 21.6px | Standard spacing between sibling elements |
| `{spacing.gap-sm}` | 10.8px | Tight spacing — kicker to headline, chrome bar inner gap |

The padding is deliberately tighter than a generic editorial system. Broadside's massive type needs the slide's edge to feel close, not distant — the type is supposed to crowd the frame.

### Chrome Frame
Content compositions may carry supplied category/metadata above a thin rule; declarative covers and chapters can omit this band. Style actual shared-runtime controls with the same flat cream/ink treatment, without a second dot bar, counter or hardcoded catalogue number. A real catalogue identifier belongs in content only when supplied. Keep footer/source text readable, not in faint cream.

## Depth and Elevation

### Flat Plane (Only Technique)
Broadside is entirely flat. There are no drop shadows, no inner shadows, no blurred elevations, no rounded surface gradients. Every element sits on a single plane.

Hierarchy is constructed from:
- **Type weight + size contrast** — the dominant signal.
- **1px hairline dividers** — `slide-chrome`/`slide-foot` borders, `stat-card` top borders, `compare-panel` dividers, `bar-track` left border, `chart-baseline` baseline.
- **Color shift** — orange against ink, ink against cream, cream-muted against cream.
- **Negative space** — generous padding and intentional empty regions.

Introducing a `box-shadow`, a card with elevation, or a soft gradient breaks the system. The flatness is the editorial signal.

## Shapes and Treatment

### Border Radius
Border radius is **0px everywhere** except `nav-dot` (50% — the tiny navigation circles at the bottom). Cards, panels, tags, image placeholders, stat cards, chart bars — all rectangles with sharp corners.

### Border Weights
- **1px solid** — the only structural weight. Used on `slide-chrome`, `slide-foot`, `stat-card` top, `compare-panel` divider, `bar-track` left edge, `chart-baseline`, image captions, the `rule.full` divider.
- **1px solid** — a restrained frame for actual media where needed; no unfinished placeholder in the audience artifact.
- **2px solid** — used only on the small `rule` accent stub (36px wide) and the `chapter-rule` mark.

All borders are either `{colors.border-dark}` (dark slides), `rgba(17, 17, 17, 0.2)` (orange slides), or `{colors.fire-orange}` (the tag border on dark slides).

### Decorative Element Types

**Stub accent rule** — A 36×2px solid bar in `{colors.fire-orange}` (on dark) or `{colors.ink-black}` (on orange). Used as a visual "section break" mark above a chapter title, above a stat, or beside a kicker. Functions as Broadside's only ornament.

**Mono catalogue number** — A small IBM Plex Mono numeral anchored top-left on cover/chapter slides at low opacity (`rgba(17, 17, 17, 0.45)` on orange, `{colors.cream-hint}` on dark). Reads as a publication catalogue mark.

**Stat card** — A top-border-only data block: 1px solid border on top, no other borders, padded body containing `{typography.stat-value}` (large orange numeral on dark; dark ink on orange) above `{typography.body}` (label) above `{typography.caption}` (mono note in `{colors.cream-hint}` or dark-faint).

**Compare panel pair** — Two equal-width panels divided by a 1px vertical border. The right panel may optionally be filled with `{colors.fire-orange}` (`compare-panel-orange`) as the "after" / payoff side; the left panel remains transparent over the dark canvas.

**Vertical bar chart** — A `bar-track` container with `border-left` only (no other axes), bars dropping from the top with `cream-hint` fill, one bar per chart carrying the `.accent` class for fire orange. Axis labels in mono uppercase below the baseline.

**Fadelist** — A SPACE10-style composition: three stacked Barlow-900 phrases at equally readable opacity unless the source establishes differing emphasis paired with one oversized display title on the opposite side of the slide. Used for "before / during / after" or "past / present / future" narratives.

**Pull quote** — An oversized fire-orange `{typography.quote-mark}` glyph (with line-height 0.6 so it sits on the baseline rather than below), followed by `{typography.quote-text}` capped at ~78% of the column width, followed by a two-line `quote-attr` with name above mono role/affiliation.

**Bordered mono tag** — A small inline pill in IBM Plex Mono uppercase with a 1px solid border, padded 0.3em vertical × 0.8em horizontal. The border and text are both `{colors.fire-orange}` on dark; dark ink at 40% opacity on orange.

## Do's and Don'ts

### Do
- Set every Barlow display, heading, lead, and body element in sentence case. Lowercase display is Broadside's most distinctive single choice.
- Use IBM Plex Mono uppercase at 0.1em+ tracking for every chrome element: slide numbers, kickers, labels, tags, axis labels, source notes, bullet markers.
- Make `{colors.fire-orange}` the singular accent on dark slides — kickers, accent stat values, bullet `/` markers, a meaningfully distinguished chart bar, the opening quote mark, the `rule` stub.
- Make orange the *full background* on cover, chapter, and declarative-payoff slides. Use it as environment, not just accent, on those slide types.
- Cap bullet lists at three items. Broadside prizes density of impact over density of information.
- Apply negative letter-spacing on every Barlow display moment — -0.04em on the largest, -0.02em on h2.
- Use 1px hairline borders (`{colors.border-dark}` on dark, `rgba(17,17,17,0.2)` on orange) for all structural division. They are the system's only hierarchy chrome.
- Suppress slide-chrome and slide-foot on cover, chapter, statement, quote, and end slides — let the type breathe edge-to-edge.
- Place the `broadside-num` catalogue number top-left on orange cover/chapter slides as a publication-style mark.
- Use the `/` mono glyph in fire orange as the bullet marker on every list item.

### Don't
- Don't uppercase Barlow at display or heading weights. Uppercase Barlow at 249.6px reads as a different design system entirely.
- Don't introduce a second accent color. Orange is *the* color — adding a blue, yellow, or green accent breaks the protest-poster identity.
- Don't add drop shadows, blurred elevations, or rounded surfaces. Broadside is strictly flat — depth comes from type and 1px lines.
- Don't use cream-colored text on orange slides. The "ink on fire" rule is absolute: orange slides use `{colors.ink-black}` for headlines and body.
- Don't pair Barlow with a serif companion. The single-typeface monolith is part of the identity.
- Don't use border-radius on cards, tags, panels, or stat blocks. The only round shapes in the system are the small nav dots.
- Don't pack more than one display moment into a slide. Broadside is for one statement, one rule, breathing room — not magazine-style layered composition.
- Don't render chrome elements in Barlow. Chrome is exclusively IBM Plex Mono uppercase.
- Don't introduce a third surface register. There are two: dark and orange. A cream/paper slide does not exist.
- Don't use italic or underline. Emphasis is achieved through weight, size, or orange color only.

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

Keep Broadside's single-sans architecture: a forceful black-weight display with quieter text, not an automatic serif-and-handwriting replacement. Neither Noto Sans nor another fallback is an exact Barlow equivalent; the environmental orange/ink switch, huge scale and flat rules carry the broader identity. Use IBM Plex Mono for actual Latin or digit metadata where useful and a readable Chinese sans beside it. Chinese words have no lowercase treatment: preserve source capitalization in mixed-language proper names, acronyms and identifiers. Stacked large phrases should have equal readable emphasis unless the content establishes priority; do not use faint rows to simulate importance. Longer Hanzi phrases may require more than one fixed-stage composition, with every item retained.

### Asset and Emphasis Limits

Inspect requested weights and styles in the actual font asset before using them. Optical size, oblique style and weight are different properties; one does not supply another. When a face lacks a needed treatment, select a verified asset or an approved alternative visual treatment while preserving the same audience-visible emphasis. Test final composed text against its background; palette tokens and font family names are not evidence of legibility.

## Iteration Guide

1. Every new content slide opens with a `kicker` in mono uppercase fire orange, followed by `{typography.h2}` headline in Barlow lowercase. Don't skip the kicker — it is the system's content-slide chrome signal.
2. Every cover, chapter, statement-payoff, or end slide uses the orange register. Don't use orange for content/data slides — orange is for declaration moments.
3. New stat cards use the `stat-card` top-border-only pattern with `{typography.stat-value}` in orange (on dark) or ink (on orange). Don't bottom-border or fully-border stat cards.
4. New bullet lists use the `/` mono marker in fire orange. Cap at three items.
5. New charts use the `bar-track` vertical-bar pattern with readable bars on a common scale; fire orange marks a source-established distinction only, otherwise keep equal series treatment.
6. New quotes use the oversized fire-orange `{typography.quote-mark}` opening glyph, followed by `{typography.quote-text}` at max 78% width.
7. Headlines on orange slides are always `{colors.ink-black}`. There are no cream headlines on orange.
8. New tags use `tag` styling: 1px fire-orange border + fire-orange mono uppercase text on dark; dark-ink at 40% opacity on orange.
9. The system has nine canonical layout patterns — cover, chapter, statement, split, stats, quote, list, compare, end — plus fadelist, chart, and diagram extensions. New layouts should respect the chrome/no-chrome rule based on whether the slide is declarative or content-bearing.

## Authoring Limits

- Only orange and ink registers are active choices. Do not create a dormant light-theme alias or retain a suppressed compatibility theme.
- Use the slash bullet as a wordless marker, and preserve every supplied list item. Three items are a useful composition size, not a content limit.
- Map bar heights from actual values and retain common scale, zero and units. The orange accent may mark a source-established distinction, never an arbitrary favorite.
- Use actual media in the 594px-tall visual region or recompose the layout. Dashed placeholders and made-up media labels are not final audience content.
- The huge lowercase Barlow register needs explicit care for proper names, acronyms and identifiers: preserve their locked capitalization.
- Verify Barlow, IBM Plex Mono and any CJK assets before capture. Faint cream can remain on wordless rules; sources and axes require readable foreground color.
