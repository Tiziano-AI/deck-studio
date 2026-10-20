---
version: alpha
name: Signal
description: A literary editorial presentation system in the spirit of a long-form magazine — The Economist's restraint crossed with a private intelligence briefing. Source Serif 4 carries every headline with roman/italic mixing mid-sentence in antique gold, DM Sans steps back for body, and IBM Plex Mono runs all the timestamps, kickers, and chrome. The dual surface system is warm cream paper (#F0ECE3) and deep editorial navy (#1C2644), connected by a single hot accent — antique gold (#C8A870) — used on editorial emphasis, real metadata, numerical highlights, rules and restrained diagram accents. A near-invisible 80px grid texture overlays every dark slide as a fingerprint. The effect is sober, considered, and a little bit aristocratic.

colors:
  navy: "#1C2644"
  navy-alt: "#232F55"
  cream: "#F0ECE3"
  cream-alt: "#E6E0D4"
  text-warm: "#E2DCD0"
  text-muted-dark: "#8A96A8"
  text-hint-dark: "#4E5A6E"
  ink: "#1A2030"
  text-muted-light: "#5A6270"
  text-hint-light: "#9AA0A8"
  gold: "#C8A870"
  border-dark: "#2E3D5C"
  border-light: "#CAC4B4"

color-aliases:
  c-bg: navy
  c-bg-alt: navy-alt
  c-bg-light: cream
  c-bg-light-alt: cream-alt
  c-fg: text-warm
  c-fg-2: text-muted-dark
  c-fg-3: text-hint-dark
  c-fg-light: ink
  c-fg-light-2: text-muted-light
  c-fg-light-3: text-hint-light
  c-accent: gold
  c-border: border-dark
  c-border-light: border-light

typography:
  display:
    fontFamily: "Source Serif 4, Noto Serif SC, Georgia, serif"
    fontSize: 182.4px
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: -0.02em
  h1:
    fontFamily: "Source Serif 4, Noto Serif SC, Georgia, serif"
    fontSize: 99.84px
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.01em
  h2:
    fontFamily: "Source Serif 4, Noto Serif SC, Georgia, serif"
    fontSize: 57.6px
    fontWeight: 600
    lineHeight: 1.18
  h3:
    fontFamily: "Source Serif 4, Noto Serif SC, Georgia, serif"
    fontSize: 36.48px
    fontWeight: 500
    lineHeight: 1.3
  lead:
    fontFamily: "DM Sans, Noto Sans SC, system-ui, sans-serif"
    fontSize: 26.88px
    fontWeight: 400
    lineHeight: 1.58
  body:
    fontFamily: "DM Sans, Noto Sans SC, system-ui, sans-serif"
    fontSize: 20.16px
    fontWeight: 400
    lineHeight: 1.65
  caption:
    fontFamily: "DM Sans, Noto Sans SC, system-ui, sans-serif"
    fontSize: 15.74px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "IBM Plex Mono, JetBrains Mono, monospace"
    fontSize: 13.44px
    fontWeight: 500
    letterSpacing: 0.14em
    textTransform: uppercase
  stat-value:
    fontFamily: "Source Serif 4, Noto Serif SC, Georgia, serif"
    fontSize: 105.6px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.02em
  quote-text:
    fontFamily: "Source Serif 4, Noto Serif SC, Georgia, serif"
    fontSize: 69.12px
    fontWeight: 400
    lineHeight: 1.28
    letterSpacing: -0.01em
  quote-mark:
    fontFamily: "Source Serif 4, Noto Serif SC, Georgia, serif"
    fontSize: 153.6px
    fontWeight: 300
    lineHeight: 0.6
  editorial-headline:
    fontFamily: "Source Serif 4, Noto Serif SC, Georgia, serif"
    fontSize: 52.8px
    fontWeight: 600
    lineHeight: 1.2
  dense-headline:
    fontFamily: "Source Serif 4, Noto Serif SC, Georgia, serif"
    fontSize: 46.08px
    fontWeight: 600
    lineHeight: 1.2

spacing:
  pad-x: 144px
  pad-y: 59.4px
  gap-lg: 43.2px
  gap-md: 27px
  gap-sm: 12.96px
  grid-cell: 80px

canvas:
  width: 1920px
  height: 1080px

components:
  rule-short:
    width: 36px
    height: 1px
    background: "{colors.gold}"
    description: "Short gold rule used as a kicker separator above headlines and as a chapter accent mark."
  rule-full:
    width: "100%"
    height: 1px
    background: "{colors.border-dark}"
    description: "Full-width hairline divider, color shifts to {colors.border-light} on cream surfaces."
  kicker:
    color: "{colors.gold}"
    typography: "{typography.label}"
    description: "Mono uppercase label in antique gold, sits above a headline."
  tag:
    border: "1px solid {colors.gold}"
    color: "{colors.gold}"
    padding: "0.3em 0.8em"
    typography: "{typography.label}"
    description: "Outlined gold pill containing a mono uppercase label."
  chrome-bar:
    borderBottom: "1px solid {colors.border-dark}"
    paddingBottom: "{spacing.gap-sm}"
    marginBottom: "{spacing.gap-md}"
    description: "Top chrome strip with mono label left, mono counter right, hairline rule beneath."
  foot-bar:
    borderTop: "1px solid {colors.border-dark}"
    paddingTop: "{spacing.gap-sm}"
    marginTop: "{spacing.gap-md}"
    description: "Bottom chrome strip, mirror of chrome-bar."
  stat-card:
    borderTop: "1px solid {colors.border-dark}"
    padding: "{spacing.gap-md} {spacing.gap-md} {spacing.gap-md} 0"
    description: "Stat tile with a top hairline rule, big gold serif numeral above a sans label and mono note."
  bullet-marker:
    content: "—"
    color: "{colors.gold}"
    fontFamily: "{typography.label.fontFamily}"
    description: "Em-dash bullet rendered in mono gold prefixes every list item."
  vt-spine:
    width: 1px
    background: "{colors.border-dark}"
    description: "Vertical hairline spine for timeline column, with a 9px gold dot marking each entry."
  vt-dot:
    width: 9px
    height: 9px
    borderRadius: 50%
    background: "{colors.gold}"
    description: "Gold node sitting on the timeline spine at each date."
  pie-donut:
    borderRadius: 50%
    innerCutout: "22% inset, painted to match slide background"
    description: "SVG/CSS donut chart, segments in palette colors with a 1px gold ring divider where used."
  bar-fill-default:
    background: "{colors.text-hint-dark}"
    description: "Default bar fill in muted slate; switches to gold for the highlighted bar."
  bar-fill-accent:
    background: "{colors.gold}"
  compare-divider:
    borderRight: "1px solid {colors.border-dark}"
    description: "Single vertical hairline separating two comparison panels."
  pyramid-band:
    borderLeft: "3px solid {colors.gold}"
    padding: "14.04px 48px"
    fillFunction: "color-mix(in srgb, {colors.gold} N%, {colors.navy})"
    description: "Horizontal band in pyramid layouts; opacity of gold mix decreases from top tier to bottom."
  grid-texture:
    background: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)"
    backgroundSize: "80px 80px"
    description: "Near-invisible 80px grid overlay applied to every dark slide via ::before pseudo-element."
  cycle-step:
    borderTop: "2px solid {colors.gold}"
    padding: "{spacing.gap-md}"
    description: "Cycle/process step card with a 2px gold rule at top, gold numeral, serif title, sans body."
---

## Composition contract

Use the shared [deck runtime](../../../references/deck-runtime.md) for the fixed 1920×1080 stage, navigation and scaling. This recipe owns the visual composition only. Its dimensions are stage-pixel starting points, not browser-responsive rules. Texture, borders, type and overlays belong inside the stage and scale together; slide internals never reflow on phones. Apply the shared [composition guidance](../../../references/composition.md) to content, legibility and fit, and the [visual acceptance method](../../../references/visual-acceptance.md) to the rendered result.

## Overview

Signal is a **literary editorial** presentation system — what a long-form intelligence briefing or a quarterly review from a serious magazine would look like if it ran as a deck. The visual premise is the marriage of two faces: a literary editorial serif (Source Serif 4) carrying the voice, and a precision grotesque (DM Sans) carrying the substance, with a condensed monospace (IBM Plex Mono) for every timestamp, kicker, and piece of chrome metadata. The result reads like a quiet authority — the deck does not need to shout because the typography already telegraphs seriousness.

The system runs on a **dual-surface** model. The dark surface is `{colors.navy}` (#1C2644) — a deep editorial blue that sits warmer than navy and cooler than midnight. The light surface is `{colors.cream}` (#F0ECE3) — a warm aged-paper tone, never pure white. Both surfaces carry the same typographic vocabulary at the same scale; what changes is the foreground color. On dark surfaces, primary text is `{colors.text-warm}` (a warm off-white, never pure white). On cream, primary text is `{colors.ink}` (a near-black with a navy bias). The two surfaces are interchangeable from slide to slide — adjacent slides may alternate without any explanation, and the cream surface acts as a "reset" within a longer dark run.

There is one accent: **antique gold** (#C8A870), used sparingly for existing editorial emphasis, numerical highlights, real metadata, bullet markers, rules and diagram accents. A source-backed hierarchy may use restrained gold tints in its bands. Gold is not the general prose color or an all-purpose slide fill. Its visibility differs strongly between navy and cream; on cream use readable ink for small text and retain gold in an adjacent rule when needed.

Depth is **flat plus hairline**. There are no drop shadows, no rounded card chrome, no elevation system. Regions separate via 1px hairline rules in `{colors.border-dark}` (or `{colors.border-light}` on cream). The only "texture" in the system is a near-invisible 80px grid overlay on dark slides at 3% white opacity — visible only to the eye that's looking for it. It is the system's fingerprint.

**Density philosophy: medium-low and asymmetric.** Signal is an editorial system; it breathes. A typical slide uses a small fraction of its real estate — a kicker, a headline, a single sentence, a footer. The cover and chapter slides are the sparsest (one display headline against acres of cream or navy). The dense editorial layouts are the exception, not the rule, and even those leave generous interior padding. A slide that feels broken in Signal is one that fills the canvas edge-to-edge with content; the correct register is "I have one thing to say and I will say it carefully."

**Key Characteristics:**
- Source Serif 4 carries every headline with a roman/italic contrast for existing Latin emphasis, gold where readable.
- DM Sans for body and IBM Plex Mono for every timestamp, kicker, label, and chrome element.
- Dual surfaces — `{colors.navy}` (dark) and `{colors.cream}` (light) — used interchangeably, never blended in the same slide except in special split layouts.
- Antique gold is the single accent for editorial emphasis, actual metadata, numerical and chart highlights, rules and restrained diagram tints.
- Hairline 1px borders in `{colors.border-dark}` / `{colors.border-light}` separate every region. No card chrome, no rounded panels.
- A near-invisible 80px grid texture overlays every dark slide as a barely-perceived fingerprint.
- Em-dash bullet markers in gold mono replace the standard list dot.
- Mono uppercase chrome at the top of every standard slide carries a section label and a slide counter.
- No drop shadows, no gradients (except the bottom-up scrim on fullbleed image slides), no rounded corners (except the donut chart).

## Colors

### Palette

- **Navy** (`{colors.navy}` — #1C2644): The dark surface. A deep editorial blue, warmer than midnight, cooler than indigo. The "intelligence" color — authority without aggression.
- **Navy Alt** (`{colors.navy-alt}` — #232F55): A slightly lifted navy reserved for secondary dark surfaces (placeholder panels, image fallbacks). Visually nearly identical to navy; only differs in close adjacency.
- **Cream** (`{colors.cream}` — #F0ECE3): The light surface. A warm aged-paper tone, never neutral and never bright. Reads as "broadsheet" or "manuscript," not "screen white."
- **Cream Alt** (`{colors.cream-alt}` — #E6E0D4): A slightly cooler cream for secondary light surfaces. Same role as navy alt but on the light side.
- **Text Warm** (`{colors.text-warm}` — #E2DCD0): Warm off-white. The primary text color on navy surfaces. Never `#FFFFFF` — pure white would clash with the warm paper logic of the system.
- **Text Muted Dark** (`{colors.text-muted-dark}` — #8A96A8): Muted blue-grey. Secondary text on navy — descriptions, lead paragraphs that want to recede.
- **Text Hint Dark** (`{colors.text-hint-dark}` — #4E5A6E): a low-contrast decorative tone on navy. Required stat notes, captions and sources use a readable primary or secondary text color instead.
- **Ink** (`{colors.ink}` — #1A2030): Near-black with a navy bias. Primary text on cream. Picks up the dark surface color rather than fighting it.
- **Text Muted Light** (`{colors.text-muted-light}` — #5A6270): Secondary text on cream.
- **Text Hint Light** (`{colors.text-hint-light}` — #9AA0A8): a low-contrast decorative tone on cream, not the default for required text.
- **Gold** (`{colors.gold}` — #C8A870): the single accent for existing emphasis, figures, kickers, markers and rules, plus restrained tint in meaningful hierarchy bands. It is not a general paragraph fill; use readable ink for small labels when the accent is weak on cream.
- **Border Dark** (`{colors.border-dark}` — #2E3D5C): Hairline divider on navy surfaces. Visible but quiet.
- **Border Light** (`{colors.border-light}` — #CAC4B4): Hairline divider on cream surfaces. Warm greige.

### Defaults

- **Default surface**: alternate between `{colors.navy}` (dark) and `{colors.cream}` (light) across the deck. There is no "primary" surface — both are first-class. If unsure, reach for navy for chapter openers and statement slides, cream for dense editorial reads.
- **Default primary text on navy**: `{colors.text-warm}`.
- **Default primary text on cream**: `{colors.ink}`.
- **Default secondary text on navy**: `{colors.text-muted-dark}`.
- **Default secondary text on cream**: `{colors.text-muted-light}`.
- **Required captions, notes and sources** use readable primary or secondary text for their surface. Reserve hint colors for nonessential decoration, never missing-proof caveats or required qualifiers.
- **Default accent**: `{colors.gold}` — applied to rules, italic emphasis inside headlines, statistical figures, kicker labels.
- **Default border**: `{colors.border-dark}` on navy, `{colors.border-light}` on cream.
- **Default kicker color**: `{colors.gold}`.

Navy and cream share a palette but not contrast behavior. Inspect gold on both, particularly small type on cream. Keep general prose in surface ink; gold may highlight real emphasis and tint a diagram band only where meaning and readable foregrounds remain clear.

## Typography

### Font Family

Signal has three Latin role families and separate locale-appropriate script support:

- **Source Serif 4** (`{typography.display.fontFamily}`) — a literary editorial serif. Carries every headline at every scale (display, h1, h2, h3, editorial-headline, dense-headline, quote-text, stat-value). The face has a full italic axis, and the system's most distinctive typographic move is **mixing roman and italic mid-sentence**: the roman type carries the sentence and an `<em>` tag inside switches to italic in `{colors.gold}`. This is the "Signal moment."
- **DM Sans** (`{typography.body.fontFamily}`) — a humanist grotesque used for body, lead paragraphs, bullet items, and stat labels. DM Sans is the structural understudy — it never leads, it always supports. When `<em>` appears inside a sans `.lead` paragraph, the emphasis switches to **italic serif in gold** (a font-family change), not italic sans.
- **IBM Plex Mono** (`{typography.label.fontFamily}`) — a condensed editorial monospace. Carries every label, every kicker, every chrome element (top bar, footer, slide counter), every chapter number, every mono caption, every stat note, every timeline date. Mono is the system's "metadata voice."
- **Noto Serif SC / Noto Sans SC** — candidate Simplified Chinese support for the serif and sans roles. The files must actually be loaded, and their metrics require independent fitting; a CSS stack does not make them identical to the Latin faces.

The emotional contrast is: serif = voice, sans = substance, mono = timestamp. Mixing them in one sentence (a sans lead with an italic serif gold `<em>` inside) is the system's small choreography.

### Type Scale

| Token | Size | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.display}` | 182.4px | Source Serif 4 | 700 | Hero cover headline at maximum scale |
| `{typography.h1}` | 99.84px | Source Serif 4 | 600 | Chapter title or single-statement headline |
| `{typography.stat-value}` | 105.6px | Source Serif 4 | 600 | Large statistical numeral in gold |
| `{typography.quote-mark}` | 153.6px | Source Serif 4 | 300 | Decorative opening quotation glyph in gold |
| `{typography.quote-text}` | 69.12px | Source Serif 4 | 400 | Pull-quote body |
| `{typography.h2}` | 57.6px | Source Serif 4 | 600 | Primary slide headline |
| `{typography.editorial-headline}` | 52.8px | Source Serif 4 | 600 | Headline for editorial / newsletter layouts |
| `{typography.dense-headline}` | 46.08px | Source Serif 4 | 600 | Headline for two-column dense text layouts |
| `{typography.h3}` | 36.48px | Source Serif 4 | 500 | Sub-headline, panel title, intra-region heading |
| `{typography.lead}` | 26.88px | DM Sans | 400 | Lead paragraph, intro sentence, list item body |
| `{typography.body}` | 20.16px | DM Sans | 400 | Paragraph body, bullet body |
| `{typography.caption}` | 15.74px | DM Sans | 400 | Caption, footnote, source attribution |
| `{typography.label}` | 13.44px | IBM Plex Mono | 500 | Mono uppercase chrome label, kicker, tag, mono metadata |

### Defaults

- **Default size for a primary section headline**: `{typography.h2}` (57.6px).
- **Default size for a chapter opener**: `{typography.h1}` (99.84px).
- **Default size for a cover hero**: `{typography.display}` (182.4px).
- **Default size for a paragraph**: `{typography.body}` (20.16px).
- **Default size for a lead sentence beneath a headline**: `{typography.lead}` (26.88px).
- **Default size for any chrome, kicker, or metadata label**: `{typography.label}` (13.44px).
- **Default size for a statistical numeral**: `{typography.stat-value}` (105.6px), in `{colors.gold}`.
- **Default headline color**: primary text color for the surface (`{colors.text-warm}` on navy, `{colors.ink}` on cream). Never gold.

When unsure between `{typography.h2}` and `{typography.h3}` for a primary moment, reach for `{typography.h2}` — `h3` is for sub-headlines within a region, not for the slide's main statement.

### Signature Treatments

Apply Latin case and tracking treatments only where they preserve the source's identifiers, names and script conventions. Missing semantic fields remain absent.

Use these signatures where the corresponding content exists. They govern composition, not permission to add words, alter meaning or force unsupported type:

- **Existing Latin headline emphasis** may use true Source Serif italic. Gold works as the accent where readable; on cream, readable ink plus a neighboring gold rule retains the distinction. Do not add an emphasized phrase to satisfy this treatment.
- **Existing emphasis within sans prose** may switch to true Source Serif italic. Preserve meaning and readable foreground; for scripts without that style use the supported upright alternative.
- **Supplied kickers** use mono, modest tracking and uppercase only where appropriate to the source script. Use gold when readable, otherwise surface ink with an adjacent gold rule.
- **Actual statistical values** use Source Serif 600 and restrained negative tracking, with gold where readable or surface ink where necessary. Preserve complete units, scale and precision.
- **Every chrome bar carries a 1px hairline rule beneath it in `{colors.border-dark}` / `{colors.border-light}`.** The hairline is what makes the chrome read as chrome rather than as floating text.
- **Every chapter slide carries a 36px gold rule between the chapter number and the chapter title.** The rule is the section break — no rule, no chapter.
- **Bullet lists use an em-dash in mono gold as the marker.** Standard dot bullets do not exist in this system.

### Typography Principles

The font ladder separates serif voice, sans substance and mono metadata. The intentional exception is an existing emphasized phrase within sans prose: a loaded serif italic can supply a visible contrast. Preserve any source strong/emphasis meaning; do not change prose or create an emphasized claim merely to display the font switch.

Italic is one treatment for existing Latin emphasis. Use a true loaded style; for scripts without italic use a supported upright contrast. Readable ink can carry the emphasis on cream, with gold in nearby ornament. Keep the source's emphasis identifiable without forcing every paragraph to contain it.

Line-height runs tight at display scale (0.96 on display, 1.08 on h1) and opens as size decreases (1.5–1.72 on caption and body). Letter-spacing is negative on display and h1 (–0.01 to –0.02em) and zero on body. Mono labels carry tracking of 0.14em to 0.22em — generous letter-spacing is how mono reads as editorial rather than as code.

## Layout

### Canvas System

Compose on the shared 1920×1080 stage. Start at 144px horizontal and 59px vertical insets. A standard slide uses a header/body/footer grid; sparse openers can remove the header and footer while preserving any necessary identification. Use 43px, 27px and 13px gaps for major, related and tightly coupled elements.

### Padding and Gap Scale

| Token | Value | Use |
|---|---|---|
| `{spacing.pad-x}` | 144px | Horizontal slide padding |
| `{spacing.pad-y}` | 59.4px | Vertical slide padding |
| `{spacing.gap-lg}` | 43.2px | Between major content sections |
| `{spacing.gap-md}` | 27px | Between related elements |
| `{spacing.gap-sm}` | 12.96px | Between tightly coupled elements |

Quote slides increase pad-x to 1.1× and pad-y to 1.2× to give the pull-quote extra breathing room. Compare layouts use `pad-x * 0.55` as inset padding on each panel.

### Chrome Frame

Standard slides carry a top chrome bar and a bottom foot bar — both are flex rows with a mono label left, mono counter right, separated from the body by a 1px hairline rule. The chrome and foot disappear on cover, chapter, statement, quote, and end slides — those layouts are chromeless and let the type breathe edge to edge.

Each slide is a CSS grid with `grid-template-rows: auto 1fr auto` — the chrome and foot are the auto rows, the body is the 1fr row that fills.

### Grid Texture

Every dark slide carries a near-invisible 80px × 80px grid overlay drawn with two linear-gradient backgrounds at 3% white opacity. The grid is the system's visual fingerprint — it is not meant to be consciously perceived, only sensed as "this slide has structure." Cream slides do not carry this overlay.

## Depth and Elevation

Signal is **flat by design**. There are no drop shadows. There are no rounded card elevations. There is no elevation system at all — every element sits flush with the surface.

What looks like depth is actually **hairline separation**. Regions separate via 1px solid borders in `{colors.border-dark}` (on navy) or `{colors.border-light}` (on cream). A stat tile, a chrome bar, an editorial column — all separated by hairlines, not by shadows or backgrounds.

The single exception is the **fullbleed gradient scrim**: on fullbleed image slides, a linear gradient from transparent to `rgba(15, 20, 36, 0.9)` runs bottom-up across the lower portion of the slide so the type beneath remains legible against the image. This is the only gradient in the system; everywhere else, surfaces are solid.

## Shapes and Treatment

### Border Radius

| Value | Use |
|---|---|
| 0 | Every shape in the system except donut charts and donut center wells |
| 50% (circle) | Donut chart shapes, the 9px timeline dots, the 2px round-ended border on swatches |
| 2px | Pie legend swatch (subtle softening only) |

Signal has effectively **no rounded chrome**. Stat tiles, chrome bars, compare panels, image frames — all rectangular with sharp corners.

### Border Weights

- **1px solid** — the universal hairline border. Used on every chrome bar, every stat tile top rule, every column divider, every compare panel divider, every editorial column boundary. Color follows the surface (`{colors.border-dark}` or `{colors.border-light}`).
- **1px dashed** — used only inside the chart plot for grid lines (rgba transparency, very low opacity).
- **2px solid `{colors.gold}`** — used on the top rule of a cycle/process step.
- **3px solid `{colors.gold}`** — used as the left-border on pyramid bands.

### Decorative Element Types

**Short gold rule** — a 36px × 1px solid gold horizontal bar. Sits between a kicker and a headline, or as a chapter accent mark. The smallest atomic decorative element in the system.

**Full hairline rule** — a 100% × 1px horizontal rule in `{colors.border-dark}` / `{colors.border-light}`. Used as section dividers, chrome separators, stat-tile top edges, column boundaries.

**Outlined gold tag** — A strict rectangular inline-block with 1px gold outline. Metadata text is mono and readable gold or surface ink; this is an outlined kicker, never a rounded pill.

**Editorial column divider** — a 1px hairline running floor-to-ceiling between two columns in editorial layouts. Padding inside the columns is `pad-x * 0.38`.

**Vertical timeline spine** — a 1px vertical hairline running the height of a vertical timeline, with 9px circular gold dots positioned at each entry along the spine.

**Pyramid band** — a horizontal band with a 3px solid gold left-border, filled with `color-mix(in srgb, gold N%, navy)` where N decreases from 70% at the top tier to 8% at the bottom tier. Each tier is also progressively wider (38% → 100%). This creates the visual pyramid through color saturation and width, without any actual triangular geometry.

**Donut center well** — the inner 22% inset of a pie donut is filled with the slide background color (navy or cream) to create the donut hole.

**Connector arrow** — in cycle and diagram layouts, a low-contrast arrow glyph in `{colors.border-dark}` (or `{colors.border-light}`) sits between sequential steps. The arrow is intentionally muted — the steps lead, the connector recedes.

**Mono dash bullet** — every list item carries an em-dash (`—`) in mono gold as the bullet marker, with a 1.2em column for the marker and 0.5em gap.

## Do's and Don'ts

### Do

- Use roman-to-italic Source Serif contrast when the approved headline already contains emphasis. Do not add emphasis or rewrite the headline to manufacture a signature moment.
- Use IBM Plex Mono for every kicker, label, tag, chrome element, slide counter, chapter number, and statistical note. Mono is the metadata voice.
- Give genuine kickers a mono editorial register; use readable gold or surface ink, with tracking suited to the source script.
- Set every chrome bar to carry a 1px hairline beneath it in the surface-appropriate border color. The hairline is non-negotiable; chrome without a rule reads as floating text.
- Alternate navy and cream surfaces freely across a deck. Neither is "the" background — both are first-class.
- Use Source Serif 600 for actual figures. Gold supplies a numerical highlight when readable; stronger surface ink is valid where the foreground needs it.
- Replace standard bullet dots with em-dashes in mono gold. Standard dots break the editorial register.
- Use the 36px gold rule as the chapter break and the kicker separator. It is the system's small punctuation.
- Apply the 80px grid texture overlay to every dark slide via `::before`. It is the system's fingerprint and should never be removed.
- Pad with `{spacing.pad-x}` 144px / `{spacing.pad-y}` 59.4px — Signal needs the breathing room; tight padding breaks the editorial restraint.

### Don't

- Keep general prose in readable surface ink. Gold may serve existing inline emphasis, metadata, rules, numerical highlights and source-backed diagram tints; avoid a general gold slide background.
- Don't use pure white (`#FFFFFF`) for text on navy. Always use `{colors.text-warm}` — the warm off-white is what keeps the system tied to its paper register.
- Don't add drop shadows or rounded card chrome. The system is flat-plus-hairline; elevation breaks the editorial frame.
- Use sans for sustained prose; reserve the serif-in-prose exception for actual emphasized phrases, not whole paragraphs.
- Preserve supplied emphasis using a readable supported contrast. The italic serif switch is the Latin signature option, not a reason to discard strong meaning or synthesize italics.
- Don't round corners on chrome, panels, stat tiles, or image frames. The only round shapes in the system are the donut chart and the 9px timeline dots.
- Don't introduce a second accent color. Antique gold is the only hot color; adding a second accent dilutes its weight.
- A roughly half-occupied stage is a useful starting register, not permission to omit content. If the full message cannot breathe, recompose, split or choose another recipe with the content intact.
- Don't use mono outside metadata roles (label, kicker, chrome, counter, caption note). Mono in body or headline breaks the typographic ladder.
- Don't omit the 1px hairline beneath chrome or above a stat tile. Hairlines are the system's depth substitute; without them the elements float.

## CJK & International Content

### Pairing and visual intent

| Role | Latin | CJK candidate | Treatment |
|---|---|---|---|
| Display, headings, quotes | Source Serif 4 | Noto Serif SC, appropriate loaded weight | Preserve a serif editorial lead voice |
| Body, lead, caption | DM Sans | Noto Sans SC 400 | Calm upright supporting prose |
| Kicker, date, metadata | IBM Plex Mono | Noto Sans SC, or verified CJK mono | Preserve metadata placement; align columns explicitly |
| Headline emphasis | Source Serif 4 italic | Upright selected CJK display face | Retain emphasis with weight or color where readable |

A serif CJK headline plus sans CJK body preserves the system's editorial separation better than automatically collapsing every role into one family. A single sans CJK variant is possible when a technical register is desired, but it is a visible design choice to preview, not a repair for missing italics. Neither candidate reproduces Source Serif's roman-to-italic move.

### Composition adjustments

Keep Latin phrases in true Source Serif italic only when the corresponding italic asset is loaded. CJK emphasis stays upright. Use an actually loaded weight difference or the established accent treatment with adequate contrast; do not oblique Chinese glyphs to imitate the Latin mechanism. The same limitation applies to emphasized phrases inside the sans lead.

Wide mono tracking belongs to Latin kickers. Reset CJK labels to zero tracking, preserve their real words, and give them enough width rather than shortening them to fit the metadata bar. Do not add bilingual chapter labels or replace the content's numeral convention for aesthetic reasons. Actual ordinal counters can retain a consistent numbering style chosen for the deck.

The gold accent is much less distinct on cream than on navy. Small CJK kickers, chart notes and emphasis need direct review on both surfaces. Use readable surface ink for text and keep gold as the neighboring rule if the gold text treatment is weak; this maintains the restrained palette without dropping information.

The 80px dark grid, 1px region rules and generous 144px side insets carry the system independently of language. Allow additional height for CJK prose; use two related slides when an editorial spread no longer has breathing room. Quotation ornaments should match the actual locale and the supplied quotation; they are not permission to rewrite punctuation or attribution.

### Script and font handling

These are candidate pairings, not metric equivalents or proof that a font is loaded. Inspect the exact font files, supported styles/weights, language coverage and rendered glyphs before accepting a deck. A CSS family stack alone does not load a font. Use locale-appropriate Simplified Chinese, Traditional Chinese, Japanese or Korean cuts; one Chinese pairing does not cover all CJK typography.

Set CJK runs to upright style, zero tracking and no case transform unless the chosen face explicitly supplies another intended style. Begin around 1.15–1.25 display line-height and 1.75–1.85 body line-height, then inspect the actual text. Preserve the locked language, wording, numerals and punctuation; do not add Latin labels for atmosphere. Follow the content's locale for punctuation, spacing at script boundaries and line breaking, keeping opening/closing punctuation with its phrase. Preserve quotations exactly unless an editorial change is approved.

Scope script styling to intentional runs with language tags. Do not apply inherited Latin italic or heavy weights to a regular-only CJK face and let the browser synthesize them. Compare mixed-script baselines visually; `palt` changes horizontal glyph metrics where supported, not vertical alignment, and is not a universal baseline repair. Adjust a run's baseline only after seeing the actual pair. A pure-CJK line still needs fit and clipping checks.

## Iteration Guide

1. Set approved headlines in Source Serif 4. Existing emphasized phrases may use a true italic with gold where readable; a headline with no emphasis needs none added.
2. Any new region separator is a 1px hairline in `{colors.border-dark}` / `{colors.border-light}`. Never a thicker border, never a colored border, never a shadow.
3. Any new label, kicker, or chrome element is mono uppercase in `{colors.gold}` (for kickers) or surface-appropriate muted color (for chrome). Letter-spacing at least 0.14em.
4. Set actual figures in Source Serif 600, testing negative tracking and gold contrast on the actual surface. Keep source units and qualifiers; use readable ink if needed.
5. Any new accent treatment uses `{colors.gold}` — there is no second accent. If a slide needs more visual differentiation, vary the surface (navy vs. cream) rather than adding color.
6. Any new bullet list uses the em-dash gold mono marker. Adding a different bullet style breaks the system.
7. Cover, chapter, statement, quote, and end layouts are chromeless. Standard layouts carry chrome and foot. Don't mix — a chromeless statement is correct; a chromed statement reads as a different system.
8. The 80px grid overlay is part of the dark-surface identity. Any new dark slide should inherit `.slide.dark` so the `::before` overlay applies automatically.
9. New layouts should keep the editorial breathing room. If a layout requires content edge-to-edge, reconsider — Signal is a restrained system.
10. Preserve existing body emphasis with a true supported contrast; Source Serif italic is the Latin signature option. Do not synthesize a missing style or force faint gold on cream.

## Known Gaps

- Verify the three Latin role families and any needed locale assets are actually loaded and packaged. Georgia, system sans and a generic mono have different metrics and cannot establish successful fallback or legibility without inspection.
- Script-support files require explicit loading and rendered inspection. Noto Serif/Sans candidates differ from Latin typography in metrics, weight and available styles.
- The 80px grid is in stage coordinates and scales uniformly with the deck. Inspect low-opacity texture at the actual output size for aliasing and interference with small text.
- The common runtime owns slide visibility, transitions and navigation. This recipe must not carry a competing engine or state classes.
- The `--c-bg-alt`, `--c-bg-light-alt`, and several muted color tokens are defined but used sparingly — they exist as a reserve for adjacent-surface differentiation that the source template uses only occasionally.
- The pyramid layout uses `color-mix(in srgb, ...)` which requires modern browser support; older browsers may render bands as flat fill rather than tiered.
- The fullbleed slide gradient is hardcoded to `rgba(15, 20, 36, 0.9)` (close to navy but not parameterized via a token). Changing the navy color requires updating this gradient in parallel.
