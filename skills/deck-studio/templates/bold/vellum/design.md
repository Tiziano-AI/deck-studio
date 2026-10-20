---
version: alpha
name: Vellum
description: An essay-pinned-to-a-wall presentation system — a single monochromatic field of deep periwinkle (#2A3870) with warm chartreuse-yellow type (#E8D85C) floating centered on it, every slide. Italic Cormorant Garamond carries every headline at all sizes — the italic serif is the personality, against the bold colorfield. DM Sans handles body in a quiet supporting role. Courier Prime mono provides the typed annotation voice — appearing as a "pin-note" attribution sitting in the bottom-left corner of every slide. The mood is gallery exhibition wall meets archive folder — quiet, monochromatic, deeply still. One dominant field, three type roles, restrained stillness.

colors:
  navy: "#2A3870"
  navy-alt: "#343F80"
  navy-deep: "#1F2858"
  navy-mid: "#34407A"
  yellow: "#E8D85C"
  yellow-2: "rgba(232,216,92,0.62)"
  yellow-3: "rgba(232,216,92,0.32)"
  emphasis-yellow: "#F5E168"
  teal: "#3A7878"
  border: "rgba(232,216,92,0.20)"

color-aliases:
  c-bg: navy
  c-bg-alt: navy-alt
  c-fg: yellow
  c-fg-2: yellow-2
  c-fg-3: yellow-3
  c-emphasis: emphasis-yellow
  c-accent: teal
  c-border: border

typography:
  display:
    fontFamily: "Cormorant Garamond, Noto Serif SC, Georgia, serif"
    fontSize: 211.2px
    fontWeight: 400
    fontStyle: italic
    lineHeight: 0.92
    letterSpacing: -0.01em
  h1:
    fontFamily: "Cormorant Garamond, Noto Serif SC, Georgia, serif"
    fontSize: 134.4px
    fontWeight: 400
    fontStyle: italic
    lineHeight: 0.95
    letterSpacing: -0.01em
  h2:
    fontFamily: "Cormorant Garamond, Noto Serif SC, Georgia, serif"
    fontSize: 76.8px
    fontWeight: 400
    fontStyle: italic
    lineHeight: 1.05
  h3:
    fontFamily: "Cormorant Garamond, Noto Serif SC, Georgia, serif"
    fontSize: 46.08px
    fontWeight: 500
    fontStyle: italic
    lineHeight: 1.15
  quote-text:
    fontFamily: "Cormorant Garamond, Noto Serif SC, Georgia, serif"
    fontSize: 61.44px
    fontWeight: 400
    fontStyle: italic
    lineHeight: 1.25
  quote-mark:
    fontFamily: "Cormorant Garamond, Noto Serif SC, Georgia, serif"
    fontSize: 134.4px
    fontWeight: 400
    fontStyle: italic
    lineHeight: 0.6
    color: "{colors.teal}"
  stat-value:
    fontFamily: "Cormorant Garamond, Noto Serif SC, Georgia, serif"
    fontSize: 105.6px
    fontWeight: 400
    fontStyle: italic
    lineHeight: 1
    letterSpacing: -0.02em
  lead:
    fontFamily: "DM Sans, Noto Sans SC, system-ui, sans-serif"
    fontSize: 28.8px
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "DM Sans, Noto Sans SC, system-ui, sans-serif"
    fontSize: 20.16px
    fontWeight: 400
    lineHeight: 1.65
  caption:
    fontFamily: "DM Sans, Noto Sans SC, system-ui, sans-serif"
    fontSize: 16.32px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: 13.82px
    fontWeight: 400
    letterSpacing: 0.06em
  pin-note:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: 22.08px
    fontWeight: 400
    lineHeight: 1.5
    color: "{colors.yellow}"
    letterSpacing: 0.01em
  bar-val:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: 21.12px
    fontWeight: 400
    lineHeight: 1

spacing:
  pad-x: 115.2px
  pad-y: 64.8px
  gap-lg: 54px
  gap-md: 32.4px
  gap-sm: 16.2px

canvas:
  width: 1920px
  height: 1080px

components:
  pin-annotation:
    position: "absolute bottom-left, padding ~0.9 * pad-y from bottom and 1 * pad-x from left"
    typography: "{typography.pin-note}"
    color: "{colors.yellow}"
    maxWidth: "422.4px"
    description: "A bottom-left typed region for an actual slide number and optional supplied attribution or notes. Courier Prime 400 in readable yellow; a teal rule supplies the accent. No invented phrases."
  kicker:
    typography: "{typography.label}"
    color: "{colors.yellow}"
    description: "A genuine section label in readable yellow Courier Prime, optionally beside a teal rule. Omit when no label is supplied."
  rule:
    width: 28px
    height: 1px
    background: "{colors.teal}"
    description: "A 28px hairline accent rule in dusty teal, used as a small kicker separator."
  chrome-bar:
    borderBottom: "1px solid {colors.border}"
    paddingBottom: "{spacing.gap-sm}"
    marginBottom: "{spacing.gap-md}"
    description: "Top chrome bar — mono label left, mono counter right, low-opacity hairline rule beneath."
  foot-bar:
    borderTop: "1px solid {colors.border}"
    paddingTop: "{spacing.gap-sm}"
    marginTop: "{spacing.gap-md}"
    description: "Bottom chrome bar — mirror of chrome-bar."
  bullet-list-numbered:
    listStyle: "none"
    counter: "list-counter"
    markerFontFamily: "{typography.label.fontFamily}"
    markerColor: "{colors.yellow}"
    markerSize: "{typography.label.fontSize}"
    description: "Ordered-list treatment for a real sequence only: preserved ordinals in readable Courier Prime, with a 2em marker column and 0.5em gap. Unordered items stay unnumbered."
  pin-stat:
    borderRight: "1px solid {colors.border}"
    padding: "{spacing.gap-md}"
    description: "Vertically-arranged centered stat (italic serif numeral above mono label), separated from neighbors by a single 1px low-opacity hairline. Last stat in row drops the border."
  pin-stat-val:
    typography: "{typography.stat-value}"
    color: "{colors.yellow}"
    description: "Large italic serif stat numeral (105.6px italic Cormorant Garamond), centered in a pin-stat tile."
  pin-stat-label:
    typography: "{typography.caption}"
    fontFamily: "{typography.label.fontFamily}"
    color: "{colors.yellow-2}"
    description: "Small mono caption beneath a pin-stat numeral."
  compare-panel-dark:
    background: "{colors.navy-deep}"
    description: "Left compare panel — a slightly deeper navy to create internal contrast against the standard navy field."
  compare-panel-light:
    background: "{colors.navy-mid}"
    borderLeft: "1px solid {colors.border}"
    description: "Right compare panel — a slightly lighter navy with a hairline left-border, creating the two-shade panel pair."
  bar-fill-default:
    background: "{colors.yellow-3}"
    description: "Default chart bar fill — yellow at 32% opacity (the tier-3 muted color)."
  bar-fill-accent:
    background: "{colors.yellow}"
    description: "Highlighted chart bar — full yellow."
  chart-baseline:
    height: 1px
    background: "{colors.border}"
    description: "1px hairline baseline beneath chart bars."
  image-frame:
    background: "rgba(42,56,112,0.12)"
    border: "1px dashed {colors.border}"
    description: "Optional genuine image in a subtle frame. Omit unused image regions; no visible placeholder labels."
  quote-mark:
    typography: "{typography.quote-mark}"
    color: "{colors.teal}"
    description: "A 134.4px italic Cormorant Garamond opening quote glyph in dusty teal, sitting centered above a centered pull-quote. The teal color is the system's only large-graphic accent."
---

## Composition contract

Use the shared [deck runtime](../../../references/deck-runtime.md) for the fixed 1920×1080 stage, navigation and scaling. This recipe owns the visual composition only. Its dimensions are stage-pixel starting points, not browser-responsive rules. Texture, borders, type and overlays belong inside the stage and scale together; slide internals never reflow on phones. Apply the shared [composition guidance](../../../references/composition.md) to content, legibility and fit, and the [visual acceptance method](../../../references/visual-acceptance.md) to the rendered result.

## Overview

Vellum is a **monochromatic essay-on-a-wall** presentation system. The visual premise is severe and tender at once: every slide is the same deep periwinkle navy field (`{colors.navy}` — #2A3870), with warm chartreuse-yellow type (`{colors.yellow}` — #E8D85C) floating centered on it. There is no alternate surface. There is no light/dark theme. There is no second background color. The field is the constant; the type and a single small annotation in the bottom-left corner are everything else.

The typographic premise is **italic serif as personality**: Cormorant Garamond italic carries headlines and featured numerals; upright DM Sans carries sustained prose; Courier Prime supplies a typed annotation voice. Keep a bounded bottom-left pin-note region for an actual slide number and any genuine supplied attribution. Required annotation text is readable yellow, with dusty teal in a nearby rule or large ornament. No note is invented to make the frame look archival.

The color philosophy is **one field with restrained accents**. Navy holds full yellow primary text and a tested secondary yellow tier. Brighter emphasis-yellow marks existing emphasis. Dusty teal belongs to the 28px rule and large quote ornament; it is weak against navy for small text, so required labels, notes and markers stay readable yellow. The 32% yellow tier is a subdued graphic fill, not required captions or axes.

Depth is **flat and centered**. There are no drop shadows. No rounded corners. No gradients. Borders are 1px hairlines at 20% yellow opacity — barely visible, present mostly as faint structural marks rather than dividers. The compare layout is the single exception: it uses two slightly-different navy shades (`{colors.navy-deep}` and `{colors.navy-mid}`) to create a visible split panel, but even there, the difference is subtle. Animation is set to zero duration — slides do not transition. The system is, by design, completely still.

**Density philosophy: sparse and centered.** Vellum slides are pinned essays — each slide holds a small amount of content, centered in the canvas with significant breathing room above, below, and to the sides. A statement slide is one short headline centered on the field. A cover is a kicker, a display title, a lead sentence, and the pin-note in the corner — that's it. A list can occupy a centered 60% width column, with numbering only for a real sequence. The system reads as broken when crowded; the empty navy field around the content is structural, not negative space. It's wall.

**Key Characteristics:**
- Single monochromatic field — `{colors.navy}` (deep periwinkle) — on every slide. No light theme, no inversion.
- Italic Cormorant Garamond at weight 400 for every headline, every numeral, every featured serif moment.
- DM Sans for body and lead paragraphs; Courier Prime mono for chrome labels and the pin-note signature.
- Yellow type (`{colors.yellow}`) is the primary; brighter `{colors.emphasis-yellow}` is the only `<em>` color inside headlines.
- Dusty teal supports rules and large ornaments. Required text, including pin notes and kickers, uses readable yellow rather than weak small teal-on-navy lettering.
- A bottom-left typed annotation region contains the actual slide number and optional real notes; it needs no invented label or phrase.
- Center the main reading region, usually 55–80% of stage width. Within it, align body paragraphs naturally for reading; the pin note remains a separate bottom-left region.
- Hairline 1px borders at 20% yellow opacity for chrome separators; otherwise no borders, no shadows, no elevation.
- Zero motion — slide transitions and entrance animations are set to 0 duration. The system is meant to be still.
- Italic is structural, not decorative: serif italic at display scale is the system's identity, never the upright roman.

## Colors

### Palette

- **Navy** (`{colors.navy}` — #2A3870): Deep periwinkle field. The single surface across every slide. Slightly warmer than midnight, slightly cooler than ultramarine — sits in a contemplative blue register.
- **Navy Alt** (`{colors.navy-alt}` — #343F80): A slightly lifted navy for adjacent-surface differentiation. Rarely used in practice.
- **Navy Deep** (`{colors.navy-deep}` — #1F2858): The darker compare-panel shade. Used only on the left side of compare layouts to create internal panel contrast.
- **Navy Mid** (`{colors.navy-mid}` — #34407A): The lighter compare-panel shade. Used only on the right side of compare layouts.
- **Yellow** (`{colors.yellow}` — #E8D85C): The warm chartreuse-yellow primary text color. Warm, slightly green-biased — reads as aged vellum or chartreuse silk against the navy field.
- **Yellow 2** (`{colors.yellow-2}` — rgba(232,216,92,0.62)): Secondary text — yellow at 62% opacity. Used for lead paragraphs and descriptions.
- **Yellow 3** (`{colors.yellow-3}` — rgba(232,216,92,0.32)): a muted graphic fill for subordinate bars or ornaments, not a default color for required captions, source notes or chart axes.
- **Emphasis Yellow** (`{colors.emphasis-yellow}` — #F5E168): Brighter yellow. Used only for `<em>` emphasis inside italic headlines (the `<em>` renders as roman non-italic in this brighter shade — see Signature Treatments) and for small accent text labels.
- **Teal** (`{colors.teal}` — #3A7878): a dusty accent for the large quote glyph and 28px rule. Against navy it is too weak as a general small-text default; use readable yellow for required labels and annotations.
- **Border** (`{colors.border}` — rgba(232,216,92,0.20)): Hairline border color — yellow at 20% opacity. Used on chrome bars, stat dividers, image frames.

### Defaults

- **Default surface**: `{colors.navy}` — every slide.
- **Default primary text color**: `{colors.yellow}`.
- **Default secondary text color**: `{colors.yellow-2}` (yellow at 62% opacity).
- **Required tertiary text**: retain readable yellow or a tested secondary foreground; the 32% tier is reserved for nontext graphic muting.
- **Default emphasis color (inside headlines)**: `{colors.emphasis-yellow}` — applied to `<em>` tags inside `display`, `h1`, `h2` (the emphasis renders roman non-italic in this brighter yellow, providing the system's `<em>` mechanism).
- **Kicker and pin-note text**: readable yellow. **Adjacent rule**: dusty teal, keeping its color role without sacrificing the words.
- **Default large-graphic accent color**: `{colors.teal}` — used for the quote-mark glyph specifically.
- **Default border**: `{colors.border}` — yellow at 20% opacity. Hairline only.

Colors do not encode judgments. Yellow carries reading, brighter yellow can mark existing emphasis, and teal supplies limited ornament. Do not infer an ordered priority or status from these treatments.

## Typography

### Font Family

Vellum runs **three families** in carefully separated roles:

- **Cormorant Garamond** (`{typography.display.fontFamily}`) — an old-style serif with a beautifully expressive italic axis. Carries every headline (display through h3), every numeral (stat-value), every featured serif moment, the quote-text, and the quote-mark glyph. The headline tokens specify `fontStyle: italic` — italic is the default presentation, not an emphasis variant. Weight is 400 (regular) on display/h1/h2/quote-text; weight 500 on h3. Italic Cormorant Garamond at display scale against the periwinkle field is the system's defining visual moment.
- **DM Sans** (`{typography.body.fontFamily}`) — a clean humanist grotesque. Carries body, lead paragraphs, and bullet body text. DM Sans recedes behind the personality type — it's the substance, not the voice.
- **Courier Prime** (`{typography.label.fontFamily}`) — a typewriter-style monospace. Carries every chrome label, every slide counter, the pin-note in the bottom-left corner of every slide, list counter markers, and stat labels. Mono is the "typed-note voice" — it gives the system its archival/exhibition register.

The emotional split: italic serif for the personal essay voice (headlines, quotes); sans for the supporting substance (body); mono for the typed annotation (pin-notes, chrome). The mix of italic-serif + typed-mono is unusual and is the system's most distinctive typographic combination.

### Type Scale

| Token | Size | Family | Weight | Style | Use |
|---|---|---|---|---|---|
| `{typography.display}` | 211.2px | Cormorant Garamond | 400 | italic | Cover hero at maximum scale |
| `{typography.h1}` | 134.4px | Cormorant Garamond | 400 | italic | Chapter or statement headline |
| `{typography.quote-mark}` | 134.4px | Cormorant Garamond | 400 | italic | Decorative opening quote glyph (in teal) |
| `{typography.stat-value}` | 105.6px | Cormorant Garamond | 400 | italic | Large italic serif stat numeral |
| `{typography.h2}` | 76.8px | Cormorant Garamond | 400 | italic | Primary slide headline |
| `{typography.quote-text}` | 61.44px | Cormorant Garamond | 400 | italic | Pull-quote body |
| `{typography.h3}` | 46.08px | Cormorant Garamond | 500 | italic | Sub-headline, compare panel title |
| `{typography.lead}` | 28.8px | DM Sans | 400 | upright | Lead paragraph, intro sentence |
| `{typography.pin-note}` | 22.08px | Courier Prime | 400 | upright | Readable pin-annotation text, bar-val accent |
| `{typography.bar-val}` | 21.12px | Courier Prime | 400 | upright | Chart bar value label |
| `{typography.body}` | 20.16px | DM Sans | 400 | upright | Default body paragraph |
| `{typography.caption}` | 16.32px | DM Sans | 400 | upright | Caption, secondary text |
| `{typography.label}` | 13.82px | Courier Prime | 400 | upright | Chrome label, slide counter, kicker, stat-label |

### Defaults

- **Default size for a primary section headline**: `{typography.h2}` (76.8px).
- **Default size for a chapter or statement headline**: `{typography.h1}` (134.4px).
- **Default size for a cover hero**: `{typography.display}` (211.2px).
- **Default size for body paragraph**: `{typography.body}` (20.16px).
- **Default size for a lead sentence**: `{typography.lead}` (28.8px).
- **Default size for any chrome label, kicker, or mono metadata**: `{typography.label}` (13.82px).
- **Default size for the pin-note**: `{typography.pin-note}` (22.08px).
- **Default size for a statistical numeral**: `{typography.stat-value}` (105.6px italic).
- **Default headline weight**: 400 italic.
- **Default headline color**: `{colors.yellow}`.

When unsure between sizes, lean larger. Vellum is sparse — the headline often is the slide, so it should be sized to anchor the empty field around it.

### Signature Treatments

Apply Latin case and tracking treatments only where they preserve the source's identifiers, names and script conventions. Missing semantic fields remain absent.

Use these signatures where the corresponding content exists. They govern composition, not permission to add words, alter meaning or force unsupported type:

- **Every headline is italic Cormorant Garamond at weight 400** (h3 is the exception at weight 500, still italic). Roman (non-italic) serif at display scale does not exist in this system except as `<em>` emphasis.
- **An `<em>` tag inside an italic headline (`display`, `h1`, `h2`) renders as upright roman Cormorant Garamond at weight 600 in `{colors.emphasis-yellow}`.** This is the system's emphasis mechanism — the inversion of italic to roman, plus the color shift, is non-negotiable. It is opposite the conventional "italic for emphasis" pattern; here, italic is the default and roman is the emphasis.
- **Reserve the bottom-left pin region** at about 0.9 × pad-y from bottom and pad-x from left, max-width about 422px. An actual slide number is sufficient; include extra attribution or notes only when supplied. Keep the region clear of the main content.
- **Pin notes use Courier Prime 400**, readable yellow and 0.01em tracking. A teal adjacent rule can carry the accent; do not synthesize a 500 weight.
- **Genuine kickers use Courier Prime** at a readable label size in yellow, optionally paired with a teal rule. Missing kickers stay absent.
- **The large quotation ornament** may use 134px italic Cormorant in teal above a genuine quote. Keep its quotation convention consistent with the source language; do not add a quotation or author to justify it.
- **Numbered lists keep meaningful sequence or identifiers.** Use readable Courier Prime markers in a 2em column only for actual ordered content; unordered items use aligned unnumbered rows or neutral bullets.
- **Center the main reading region**, with centered display moments and naturally aligned body inside it. Keep the bottom-left annotation distinct. Paragraph legibility takes priority over universal text-align:center.

### Typography Principles

The face ladder is fixed: italic serif (Cormorant Garamond italic) for headlines, numerals, quotes, and any personality moment; sans (DM Sans) for body and lead; mono (Courier Prime) for chrome, pin-notes, kickers, and list counters. Crossing the rails (e.g., using italic serif for body, or sans for headlines) breaks the gallery-wall register.

Italic is structural, not emphatic. Headlines default to italic; emphasis is achieved by switching to roman at weight 600 in `{colors.emphasis-yellow}`. This inverted pattern is the system's most distinctive typographic move.

Line-height runs tight at display scale (0.92 on display, 0.95 on h1) and opens to 1.5–1.65 on body. Letter-spacing on display is slightly negative (–0.01em); body and label are nearly neutral. Mono labels carry 0.06em tracking; pin-notes carry 0.01em (tighter than chrome labels).

DM Sans body is already upright. Preserve existing emphasis with a true supported weight or a deliberate roman-serif contrast in readable emphasis-yellow; do not describe an italic-to-upright switch that does nothing to the actual body face.

## Layout

### Canvas System

Compose on the shared 1920×1080 stage. Start at 115px horizontal and 65px vertical insets. Center the main reading region, generally 55–80% of slide width, with 54px, 32px and 16px gaps. Reserve a separate bottom-left annotation region so its text never collides with a centered essay or chart.

### Padding and Gap Scale

| Token | Value | Use |
|---|---|---|
| `{spacing.pad-x}` | 115.2px | Horizontal slide padding |
| `{spacing.pad-y}` | 64.8px | Vertical slide padding |
| `{spacing.gap-lg}` | 54px | Between major content sections |
| `{spacing.gap-md}` | 32.4px | Between related elements |
| `{spacing.gap-sm}` | 16.2px | Between tightly coupled elements |

Quote slides use 1.2× pad-y and 1.4× pad-x to give the centered quote extra breathing room. Compare layouts override slide padding to 0 because each panel carries its own internal padding.

### Chrome Frame

Standard slides carry chrome and foot bars (1px hairlines at 20% yellow opacity with mono labels). Chromeless layouts include cover, statement, quote, end, and any slide where the content is meant to float without structural framing — most of the deck.

The system's universal chrome element is the **pin-annotation in the bottom-left corner**, present on every slide regardless of whether the slide carries chrome/foot bars. The pin-annotation is the system's persistent identification mark.

### Content Centering

Center the cover, statement and quote composition. Lists, charts and essays use a centered 60–80% width container whose text can align naturally for reading. Compare panels center their regions, not necessarily each paragraph line; the annotation keeps its own bottom-left boundary.

Content rarely fills more than 70% of the canvas width or 60% of the canvas height. The remaining navy field is the pinned-wall context.

## Depth and Elevation

Vellum is **completely flat**. There are no drop shadows. No rounded corners. No gradients. No elevation system whatsoever.

What looks like differentiation comes from:
- **Color shifts within the navy family** — `{colors.navy-deep}` and `{colors.navy-mid}` on compare panels create a subtle two-shade pairing.
- **Hairline borders at 20% yellow opacity** — visible but quiet structural marks.
- **Yellow tiers** offer restrained graphic hierarchy. Keep all required labels readable at the destination, independent of the opacity chosen for chart fills or ornaments.

The system is intentionally still. There is no motion (slide and entrance animation durations are set to 0). There is no shadow elevation. Slides are meant to be read like pages in a folio — one at a time, with no transition.

## Shapes and Treatment

### Border Radius

| Value | Use |
|---|---|
| 0 | Rectangular content regions |

Vellum has **no rounded chrome**. Cards, panels, stat tiles, image frames, compare panels — all strict rectangles. The common runtime controls have their own shape vocabulary.

### Border Weights

- **1px solid** in `{colors.border}` (yellow at 20% opacity) — the universal hairline. Used on chrome bars, foot bars, stat dividers, chart baselines, compare-panel left edges.
- **1px dashed** in `{colors.border}` can frame a genuine image when appropriate; it must not advertise an unfilled slot.
- **1px solid** at slightly lower opacity (rgba(232,216,92,0.18)) — used on the compare panel left/right divider.

There are no heavier borders in the system. Every line is 1px.

### Decorative Element Types

**Italic display headline** — Cormorant Garamond italic at weight 400, 76.8–211.2px, centered on the slide in `{colors.yellow}`. The headline is the dominant visual element of every content slide.

**Pin annotation** — Courier Prime 400 in readable yellow, bottom-left with roughly 3px line gaps and 422px maximum width. Show an actual slide number and only genuine supplied note/attribution lines. An adjacent teal rule preserves the typed-label signature; no required extra prose.

**Teal quote-mark glyph** — a 134.4px italic Cormorant Garamond `"` in `{colors.teal}`, centered above a centered pull-quote. The only large-scale teal element in the system.

**Kicker** — An actual supplied label in Courier Prime, starting at 14px with modest tracking, enlarged as necessary for readability. Yellow text and an optional teal rule keep the accent distinction.

**28px accent rule** — a 28px × 1px horizontal bar in `{colors.teal}`. Used as a small kicker separator or chapter accent.

**List rows** — For a true sequence, preserve source ordinals in readable Courier Prime with a 2em marker column and 0.5em gap to DM Sans body. Use automatic CSS counters only for an actual simple sequence, never meaningful IDs. Unordered material remains unnumbered.

**Pin-stat** — a centered column containing an italic serif stat numeral (105.6px) above a mono caption in muted yellow. In a row, pin-stats are separated by single 1px hairlines at 20% yellow opacity; the last stat in row drops the border.

**Compare panel pair** — two side-by-side panels filling the slide. Left panel: `{colors.navy-deep}` background. Right panel: `{colors.navy-mid}` background with a 1px left-border. Each panel contains a small mono compare-label in `{colors.yellow-2}`, an italic h3, an upright lead, and source-appropriate list rows.

**Image frame** — A genuine image in a subtle 1px frame, beginning around 302px high if useful. Omit an unused region or use a deliberate flat field; no delivered placeholder labels or pretend assets.

**Chart bar** — a flat vertical rectangle in `{colors.yellow-3}` (default) or `{colors.yellow}` (accent). Bar values render in Courier Prime mono (`{typography.bar-val}`).

## Do's and Don'ts

### Do

- Fill every slide with `{colors.navy}` — the monochromatic field is the constant. There is no light alternate.
- Render every headline in italic Cormorant Garamond at weight 400, in `{colors.yellow}`. The italic serif at display scale is the system's identity.
- Reserve the bottom-left typed pin region for an actual slide count and any supplied note. Use Courier Prime 400 and readable yellow, with teal in a neighboring rule rather than small required text.
- Use `<em>` inside headlines as upright roman (non-italic) at weight 600 in `{colors.emphasis-yellow}`. This italic-to-roman emphasis pattern is non-negotiable.
- Use teal for the short rule and optional large quotation ornament; keep required kickers, notes and list markers readable in yellow.
- Center the principal composition while allowing natural paragraph alignment and a separate bottom-left annotation.
- Use Courier Prime mono for chrome labels, slide counters, pin-notes, list counter markers, and bar values. Mono is the typed-annotation voice.
- Number bullet lists with Courier Prime mono counters in `{colors.teal}`. Bullet dots and em-dashes do not exist in this system.
- Leave generous empty navy field around every content block. Sparse is the correct register.
- Pad slides with `{spacing.pad-x}` 115.2px and `{spacing.pad-y}` 64.8px, increasing 1.2–1.4× on quote slides.

### Don't

- Don't introduce a second background color. The navy field is the single surface. Even compare layouts use two near-identical navy shades, not contrasting backgrounds.
- Don't render headlines in upright roman. Italic at display scale is the default; roman appears only as the `<em>` emphasis mechanism.
- Don't add drop shadows, rounded corners, or gradients. The system is severely flat.
- Keep the large quote ornament and short rule teal when used. Required small text stays readable yellow; it must not inherit the weak ornamental color.
- Do not give unordered material numbered priority. Preserve source order and identifiers; neutral bullets or aligned rows can carry unordered content.
- Don't motion the slides. The deck is intentionally still — slide transitions and entrance animations are both 0 duration.
- Don't omit the pin-annotation. It is on every slide — chromeless or chromed — and removing it breaks the system's signature.
- Keep the three Latin type roles coherent. Add only necessary supported locale fonts, following the script adaptation rather than mixing unrelated display voices.
- Don't render small text in italic serif. Italic is for display scale only; body and caption stay upright sans.
- Don't crowd slides edge-to-edge. The empty navy field is structural — sparse content centered with breathing room above and below is the register.

## CJK & International Content

### Pairing and visual intent

| Role | Latin | CJK candidate | Treatment |
|---|---|---|---|
| Display, headings, quotes | Cormorant Garamond italic 400 / 500 | Locale-appropriate LXGW WenKai regular | Upright calligraphic warmth, not an italic equivalent |
| Body and lead | DM Sans 400 | Noto Serif SC 400 or Noto Sans SC 400 | Literary or quieter sans support |
| Pin-note, metadata | Courier Prime 400 | Verified CJK mono or Noto Sans SC | Keep annotation placement and real language |
| Emphasis | Cormorant roman 600 | Selected upright CJK face with supported weight, or Noto Serif SC 700 | A deliberate emphasis contrast, not italic-to-roman inversion |

The visual goal is considered writing on a gallery wall. WenKai can support that register while changing its letterform character; it is one candidate among handwritten CJK faces, not the only available solution. For Simplified Chinese, choose and inspect a suitable locale cut rather than assuming a TC file changes simplified characters into traditional ones or covers every character.

### Composition adjustments

Keep genuine Latin phrases in Cormorant italic and CJK phrases upright through explicit script styling. An inherited italic declaration can synthesize slanted CJK glyphs, so a family stack alone is insufficient. Open leading and inspect the optical relation between the two scripts at 211px cover and 134px statement scales; apply a baseline offset only if the actual line needs it.

The italic-to-roman emphasis mechanism becomes a different form of contrast in CJK. A supported heavier upright face or an intentional change to Noto Serif can mark the existing emphasized phrase; preserve that phrase and do not invent emphasis to exercise the treatment. The brighter yellow can remain, provided it adds a perceivable distinction.

The bottom-left pin-note remains the signature through placement, monospaced rhythm and separation from the centered reading field. Keep real annotations in their original language, and use only actual slide numbering if no note was supplied. Do not add English studio phrases for a typewriter effect. Courier Prime's regular 400 is the annotation default; the loaded family does not need a synthetic medium 500.

Dusty teal on navy is a weak small-text pairing. Preserve teal in the 28px rule or quotation ornament while using readable yellow for required pin-note text, kickers or list markers. Center the overall essay region, but allow body paragraphs to align naturally within it. Number lists only when order or genuine item identifiers exist; neutral list items can use aligned unnumbered rows without manufacturing rank.

Keep the navy field and hairline dividers. A CJK essay that outgrows the centered region should become a readable sequence of slides, retaining its full meaning and qualifications rather than removing passages.

### Script and font handling

These are candidate pairings, not metric equivalents or proof that a font is loaded. Inspect the exact font files, supported styles/weights, language coverage and rendered glyphs before accepting a deck. A CSS family stack alone does not load a font. Use locale-appropriate Simplified Chinese, Traditional Chinese, Japanese or Korean cuts; one Chinese pairing does not cover all CJK typography.

Set CJK runs to upright style, zero tracking and no case transform unless the chosen face explicitly supplies another intended style. Begin around 1.15–1.25 display line-height and 1.75–1.85 body line-height, then inspect the actual text. Preserve the locked language, wording, numerals and punctuation; do not add Latin labels for atmosphere. Follow the content's locale for punctuation, spacing at script boundaries and line breaking, keeping opening/closing punctuation with its phrase. Preserve quotations exactly unless an editorial change is approved.

Scope script styling to intentional runs with language tags. Do not apply inherited Latin italic or heavy weights to a regular-only CJK face and let the browser synthesize them. Compare mixed-script baselines visually; `palt` changes horizontal glyph metrics where supported, not vertical alignment, and is not a universal baseline repair. Adjust a run's baseline only after seeing the actual pair. A pure-CJK line still needs fit and clipping checks.

## Iteration Guide

1. Any new headline uses italic Cormorant Garamond at weight 400 in `{colors.yellow}`. Italic is the default, not the emphasis.
2. Any emphasized phrase inside a headline switches to upright roman at weight 600 in `{colors.emphasis-yellow}`. The italic-to-roman inversion is the system's `<em>` mechanism.
3. Reserve the bottom-left pin region for an actual slide count and optional supplied attribution. Courier Prime 400 and readable yellow preserve the role without invented prose.
4. Keep required kicker and marker text in readable yellow. Teal belongs to neighboring rules and large ornaments.
5. Number only a meaningful sequence or preserved source identifiers. Unordered lists remain unnumbered, in aligned rows.
6. Center the main reading region; align body text for natural reading within it and keep the pin region separate.
7. Any new background introduces a system break — there is only one surface color, `{colors.navy}`. Compare layouts use slight navy variants but do not introduce a different hue.
8. Any new font is forbidden. Cormorant Garamond, DM Sans, Courier Prime are the entire stack.
9. Any new chart, table, or data display uses 1px hairlines at 20% yellow opacity. No heavier borders, no shadows, no rounded chrome.
10. Keep a sparse reading composition. If the complete message feels crowded, recompose, split or choose a denser recipe; never delete content or hide qualifications to preserve space.

## Known Gaps

- The three font families (Cormorant Garamond, DM Sans, Courier Prime) load from Google Fonts. If fonts fail, fallbacks are Georgia (for the italic serif), system-ui (for sans), and Courier New (for mono). The system loses much of its character without Cormorant italic — Georgia italic substitutes acceptably but with different proportions.
- CJK support needs explicit loaded locale files and upright styling where no true italic exists. Use the adaptation below/above as candidates, not a promise of automatic fallback fidelity.
- Stillness is the aesthetic preference. Configure motion only through the common runtime; the recipe must not recreate transition infrastructure or state classes.
- The bottom-left annotation requires a reserved stage region; measure it against the centered content and inspect the scaled result rather than assuming its offset prevents collisions.
- The compare panel uses two near-identical navy shades (`{colors.navy-deep}` and `{colors.navy-mid}`) — at low-contrast displays or in heavy ambient light, the panel split may be hard to perceive.
- The teal accent color (`{colors.teal}` — #3A7878) is desaturated and may read as a muted blue rather than a teal on some displays.
- The system has no light theme, no inversion, and no alternate surface. Decks that require a "reset" slide (a different color background to break a long sequence) must either accept the monochromatic limitation or step outside the design system.
