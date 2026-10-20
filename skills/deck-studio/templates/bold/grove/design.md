---
version: alpha
name: Grove
description: A quiet, editorial-serif presentation system in the register of a well-bound monograph or boutique brand book. Playfair Display at weight 400 (never bold) carries every headline, italicized in terracotta coral for accent emphasis as the signature move. Jost weight 300 carries every paragraph as the "good paper" body face. JetBrains Mono at weight 300 holds labels, kickers, and the thin chrome bars. The palette pairs a deep forest green canvas (#192b1b) with warm cream text (#d4cfbf) and a single terracotta coral accent (#c8524a). Generous negative space, hairline 1px borders, and a near-invisible serif watermark numeral give it the calm authority of a literary journal.

colors:
  bg: "#192b1b"
  bg-alt: "#1e3221"
  bg-light: "#e8e4d6"
  bg-light-alt: "#dedad0"
  fg: "#d4cfbf"
  fg-2: "rgba(212, 207, 191, 0.6)"
  fg-3: "rgba(212, 207, 191, 0.32)"
  fg-light: "#192b1b"
  fg-light-2: "rgba(25, 43, 27, 0.58)"
  fg-light-3: "rgba(25, 43, 27, 0.33)"
  accent: "#c8524a"
  border: "rgba(212, 207, 191, 0.12)"
  border-light: "rgba(25, 43, 27, 0.14)"
  watermark-dark: "rgba(212, 207, 191, 0.06)"
  watermark-light: "rgba(25, 43, 27, 0.06)"

color-aliases:
  fg-light: bg
  fg-light-canonical: "fg-light shares hex #192b1b with bg — the green is reused as both surface and primary text-on-light"

typography:
  display:
    fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif"
    fontSize: "192px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.01em
  h1:
    fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif"
    fontSize: "105.6px"
    fontWeight: 400
    lineHeight: 1.1
  h1-statement:
    fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif"
    fontSize: "81px"
    fontWeight: 400
    lineHeight: 1.15
  h2:
    fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif"
    fontSize: "61.44px"
    fontWeight: 400
    lineHeight: 1.2
  h3:
    fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif"
    fontSize: "38.4px"
    fontWeight: 400
    lineHeight: 1.3
  quote-text:
    fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif"
    fontSize: "61.44px"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: -0.01em
    fontStyle: italic
  quote-mark:
    fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif"
    fontSize: "153.6px"
    fontWeight: 400
    lineHeight: 0.6
  stat-value:
    fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif"
    fontSize: "86.4px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.02em
  grove-num:
    fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif"
    fontSize: "345.6px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.03em
  lead:
    fontFamily: "'Jost', 'Noto Sans SC', system-ui, sans-serif"
    fontSize: "27.84px"
    fontWeight: 300
    lineHeight: 1.65
  body:
    fontFamily: "'Jost', 'Noto Sans SC', system-ui, sans-serif"
    fontSize: "20.16px"
    fontWeight: 300
    lineHeight: 1.75
  body-list-emph:
    fontFamily: "'Jost', 'Noto Sans SC', system-ui, sans-serif"
    fontSize: "26.88px"
    fontWeight: 300
    lineHeight: 1.6
  caption:
    fontFamily: "'Jost', 'Noto Sans SC', system-ui, sans-serif"
    fontSize: "15.74px"
    fontWeight: 300
    lineHeight: 1.55
  label:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: "13.44px"
    fontWeight: 300
    letterSpacing: 0.12em
  kicker:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: "13.44px"
    fontWeight: 300
    letterSpacing: 0.14em
    textTransform: uppercase
  chapter-num:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: "13.44px"
    fontWeight: 300
    letterSpacing: 0.2em
    textTransform: uppercase
  stat-label:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: "13.44px"
    fontWeight: 300
    letterSpacing: 0.12em
    textTransform: uppercase

spacing:
  pad-x: "153.6px"
  pad-y: "70.2px"
  pad-quote-x: "calc(153.6px * 1.1)"
  pad-quote-y: "calc(70.2px * 1.2)"
  gap-lg: "48.6px"
  gap-md: "30.24px"
  gap-sm: "15.12px"
  rule-short: "36px"

motion:
  ease-slide: "cubic-bezier(0.77, 0, 0.175, 1)"
  dur-slide: "0.9s"
  ease-enter: "cubic-bezier(0.16, 1, 0.3, 1)"
  dur-enter: "0.7s"
  stagger-delays: "0 / 0.08s / 0.18s / 0.3s / 0.44s / 0.6s / 0.78s"

canvas:
  width: 1920px
  height: 1080px

components:
  slide-chrome:
    description: "Thin top bar separating slide content from the page edge. A flex space-between row holding mono label text on each side, separated below by a 1px hairline in {colors.border} (or {colors.border-light} on light slides). Pads with {spacing.gap-sm} above the rule, then {spacing.gap-md} below before content starts."
    border: "1px solid {colors.border}"
    typography: "{typography.label}"
  slide-foot:
    description: "Matching bottom bar. Flex space-between row holding section name and 'NN / TT' counter, with 1px hairline border-top. The chrome and foot together frame every content slide; cover, chapter, quote, and end slides hide both."
    border: "1px solid {colors.border}"
    typography: "{typography.label}"
  grove-num:
    description: "A genuine section ordinal repeated in massive serif type in the background at very low opacity (6%) as compositional texture. Sits absolutely at right: {spacing.pad-x}, bottom: -0.15em, with pointer-events disabled. The system's signature wallpaper element on chapter and section moments."
    fontSize: "345.6px"
    color: "{colors.watermark-dark} on dark / {colors.watermark-light} on light"
  grove-stat:
    description: "Stat card: large Playfair value in {colors.accent}, mono uppercase label beneath, 1px border-bottom hairline. No background fill — the card is defined by the rule and the type ratio alone."
    valueColor: "{colors.accent}"
    valueSize: "86.4px"
    labelTypography: "{typography.stat-label}"
    borderBottom: "1px solid {colors.border}"
  bullet-list:
    description: "Two-column grid list (2em / 1fr) where the bullet is a coral em-dash glyph rendered in JetBrains Mono, not a CSS bullet. The em-dash is the system's bullet language."
    bulletGlyph: "—"
    bulletColor: "{colors.accent}"
    bulletFont: "'JetBrains Mono', monospace"
  rule-coral:
    width: "{spacing.rule-short}"
    height: "1px"
    background: "{colors.accent}"
    description: "A 36px-wide 1px-tall terracotta coral rule. The compositional beat between a kicker and the headline that follows."
  rule-full:
    width: "100%"
    height: "1px"
    background: "{colors.border} on dark / {colors.border-light} on light"
    description: "Full-width hairline divider. Used between stacked sections inside a slide."
  kicker:
    typography: "{typography.kicker}"
    color: "{colors.accent}"
    description: "Mono uppercase eyebrow in coral, placed above an h1/h2 headline."
  chapter-num:
    typography: "{typography.chapter-num}"
    color: "{colors.accent}"
    marginBottom: "{spacing.gap-md}"
  quote-mark:
    typography: "{typography.quote-mark}"
    color: "{colors.accent}"
    description: "Massive Playfair opening-quote glyph in coral, placed above the italic quote body."
  image-region:
    background: "{colors.bg-alt} on dark / {colors.border-light} on light"
    color: "{colors.fg-3} on dark / {colors.fg-light-3} on light"
    typography: "{typography.label}"
    minHeight: "324px"
    description: "Real image region on a tonal background. Use supplied or authorized imagery with appropriate alt text; if no image exists, recompose without a labeled placeholder."
---

## Stage and content contract

Use the shared [Deck Studio runtime](../../../references/deck-runtime.md) on a fixed **1920×1080** stage, uniformly scaled as one composition. This recipe owns visual layout, not navigation, loading, animation, capture or export. Use the shared runtime as written; do not create an equivalent inline scaler or phone-specific internal reflow.

The role sizes and spacing below are stage coordinates. Check readability at the intended viewing size, not only against overflow. If content does not fit, recompose, split or select another system while preserving the locked meaning. Real labels, identities, quotations, metrics and their qualifications come from supplied content; empty decorative slots do not authorize new words, numbers or controls. Keep case-sensitive names and identifiers intact, even within a display-cap treatment.

## Overview

Grove is a **quiet, editorial-serif presentation system** in the register of a literary monograph or boutique brand book. The foundational premise is restraint: every slide carries one focused content moment surrounded by deep negative space, anchored by thin 1px chrome bars at top and bottom and supported by a small library of compositional beats (coral kicker, 36px coral rule, italic-coral accent, em-dash bullet, near-invisible watermark numeral).

The Latin stack has three faces, each at one selected weight; CJK roles are provisioned separately:

- **Playfair Display at weight 400** carries every headline, every quote, every stat figure, and every watermark numeral. **Bold serif is not permitted** — the no-bold rule is the system's most important typographic commitment. Italicized Playfair in `{colors.accent}` coral is the signature accent move: `<em>` inside any headline switches to italic coral.
- **Jost at weight 300** carries every paragraph and bullet body. The light weight is the "good paper" feel — it sits back and lets the serif lead.
- **JetBrains Mono at weight 300** carries every label, kicker, footline, slide counter, and stat caption. Always uppercase, always with at least 0.12em letter-spacing.
- **CJK roles** use explicitly provisioned serif display and sans body candidates, with supported weights and glyph coverage checked as described below.

The palette is a tight two-surface system with one accent. Dark slides use `{colors.bg}` (a deep forest green) with `{colors.fg}` (warm cream — never pure white) for body text. Light slides flip to `{colors.bg-light}` (warm parchment) with `{colors.fg-light}` (the same forest green now used as text). The single accent is **terracotta coral** (`{colors.accent}` — #c8524a), used only in small, deliberate places: the italic emphasis inside headlines, the 36px rule under a kicker, the em-dash bullet, the stat figure, the chapter ordinal, and the opening quote mark. Coral is the system's accent voice; using it as a surface fill or for body paragraphs shatters the editorial discipline.

Depth is **flat and air-based**. There are no drop shadows, no gradients, no blur, no glow. The only "depth" devices are 1px hairline borders (the chrome bars, the stat-card divider, the compare-panel separator) and the watermark numeral at 6% opacity. The whole system reads as printed ink on linen paper, not as a digital surface.

Grove's quiet pacing comes from the sequence of open compositions. Motion, when used, follows the shared runtime; the recipe does not introduce a horizontal strip, hidden entrance state or custom animation attributes.

**Density philosophy: sparse and breathing.** Grove reads as elegant when slides are quiet — one headline, one supporting paragraph, three stats in a row, two columns of text-and-image. The 153.6px horizontal and 70.2px vertical padding is generous by design. A slide that crowds 6 elements into the canvas breaks the system; a slide with one headline, one lede, and one accent rule reads as authoritative. Reach for fewer, larger elements. The system rewards silence around the type, not density of content.

**Key Characteristics:**
- Playfair Display at weight 400 — never bold — for every serif moment. Italic in `{colors.accent}` is the headline accent.
- Jost weight 300 for every body paragraph. Lighter weight is the system's "good paper" voice.
- JetBrains Mono weight 300 uppercase with 0.12em–0.2em letter-spacing for every label, kicker, footline, counter, and caption.
- Dark slides on `{colors.bg}` deep forest green with `{colors.fg}` warm cream text. Light slides on `{colors.bg-light}` parchment with `{colors.fg-light}` green text.
- One accent color: `{colors.accent}` terracotta coral. Used only for italic headline emphasis, the 36px coral rule, em-dash bullets, stat figures, chapter ordinals, and the quote mark.
- 1px hairline borders only (`{colors.border}` on dark, `{colors.border-light}` on light). No thick borders, no shadows, no gradients.
- Em-dash glyph rendered in JetBrains Mono coral is the system's universal bullet.
- A massive serif watermark numeral (`{components.grove-num}` at 345.6px, 6% opacity) sits in the bottom-right corner of chapter and section slides as compositional texture.
- Static content is complete and visible; any motion belongs to the shared runtime.

## Colors

### Palette
- **BG / Deep Forest** (`{colors.bg}` — #192b1b): The dominant dark canvas. A deep, considered forest green — grounded, editorial, the Grove base. The default slide background.
- **BG Alt** (`{colors.bg-alt}` — #1e3221): A slightly lighter forest green for secondary dark surfaces. Used as the `{components.image-region}` fill on dark slides, where it reads as a tonal step up from the canvas without leaving the green family.
- **BG Light / Parchment** (`{colors.bg-light}` — #e8e4d6): The warm parchment surface used on light slides. Reads as good-quality paper stock, not as digital white.
- **BG Light Alt** (`{colors.bg-light-alt}` — #dedad0): A slightly cooler parchment for secondary light surfaces. Available for tonal separation between adjacent light regions.
- **FG / Warm Cream** (`{colors.fg}` — #d4cfbf): Primary text color on dark surfaces. Warm cream — never pure white. The off-white temperature is essential to the printed-ink feel.
- **FG-2** (`{colors.fg-2}` — rgba(212,207,191,0.6)): Secondary / muted text on dark. Used for ledes, captions, and supporting copy that needs to recede from primary.
- **FG-3** (`{colors.fg-3}`): Low-opacity decorative ink only; meaningful metadata uses a readable primary or measured secondary pairing.
- **FG Light** (`{colors.fg-light}` — #192b1b): Primary text on light surfaces. **Shares its hex with `{colors.bg}`** — the deep forest green is used both as the dark canvas and as the dark text-on-light color. This is the system's primary surface-text inversion device.
- **FG Light 2** (`{colors.fg-light-2}` — rgba(25,43,27,0.58)): Secondary muted text on light.
- **FG Light 3** (`{colors.fg-light-3}`): Decorative tint only; do not use it for essential text.
- **Accent / Terracotta Coral** (`{colors.accent}` — #c8524a): The single warm note. Used sparingly: italic emphasis inside headlines, the 36px coral rule under a kicker, the em-dash bullet, the stat figure, the chapter ordinal, the opening quote mark. Never used as a surface fill, never used for body paragraphs.
- **Border** (`{colors.border}` — rgba(212,207,191,0.12)): Hairline divider on dark slides. 12% cream — visible as a structural line but never loud.
- **Border Light** (`{colors.border-light}` — rgba(25,43,27,0.14)): Hairline divider on light slides. 14% forest green.

### Defaults
- **Default slide background**: `{colors.bg}` (deep forest green) for the deck's dominant tonal register. Reach for `{colors.bg-light}` (parchment) when the content wants a literal "page" feel — typically for quote slides, lighter chapters, or contrast.
- **Default primary text color on dark surface**: `{colors.fg}` (warm cream).
- **Default primary text color on light surface**: `{colors.fg-light}` (deep forest green — same hex as the dark surface).
- **Secondary text**: use primary ink by default; `{colors.fg-2}` / `{colors.fg-light-2}` are optional measured tints. Never let muted styling make a qualifier, caption or source unreadable.
- **Default headline color**: matches the surface's primary text color. Headlines never appear in coral except for the italic `<em>` accent inside them.
- **Default body color**: matches the surface's primary text color.
- **Default border color**: `{colors.border}` on dark, `{colors.border-light}` on light — both at 1px solid hairline weight.
- **Default kicker / chapter-num color**: `{colors.accent}` (terracotta coral). The mono uppercase kicker is the only chrome element that takes the accent color.
- **Default rule color** for the short 36px compositional rule under a kicker: `{colors.accent}`. The full-width section divider rule uses `{colors.border}` instead.

The palette is intentionally minimal. The dark forest / light parchment / terracotta coral triad is the entire color vocabulary. Introducing a fourth color (a navy, a yellow, a second accent) breaks the system's editorial restraint.

## Typography

### Font Family
The system loads four families from Google Fonts:

- **Playfair Display 400**, real regular and italic faces for the display and quote roles.
- **Jost 300** for body; provision this actual weight.
- **JetBrains Mono 300** for chrome; provision this actual weight.
- **CJK faces** are selected and provisioned by role, not presumed installed fallbacks.

The four-family stack is strict by role: Playfair for every serif moment (display, headlines, quotes, stat figures, watermark), Jost for every body paragraph and bullet, JetBrains Mono for every label / kicker / footline / counter / caption.

### Display, Body, and Chrome Scale

| Token | Size | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.grove-num}` | 345.6px | Playfair | 400 | Watermark ordinal numeral, 6% opacity, absolute bottom-right |
| `{typography.display}` | 192px | Playfair | 400 | Cover hero title |
| `{typography.quote-mark}` | 153.6px | Playfair | 400 | Opening quotation glyph |
| `{typography.h1}` | 105.6px | Playfair | 400 | Chapter title, statement headline |
| `{typography.stat-value}` | 86.4px | Playfair | 400 / coral | Stat-card numeric value |
| `{typography.h2}` | 61.44px | Playfair | 400 | Routine slide headline |
| `{typography.quote-text}` | 61.44px | Playfair | 400 italic | Quote body |
| `{typography.h3}` | 38.4px | Playfair | 400 | Sub-headline, compare-panel title |
| `{typography.lead}` | 27.84px | Jost | 300 | Lead paragraph |
| `{typography.body-list-emph}` | 26.88px | Jost | 300 | List-slide body / bullets — emphasized for legibility |
| `{typography.body}` | 20.16px | Jost | 300 | Standard body paragraph |
| `{typography.caption}` | 15.74px | Jost | 300 | Captions, footnotes, chart sources |
| `{typography.label}` | 13.44px | JetBrains Mono | 300 / 0.12em | Chrome label, mono metadata |
| `{typography.kicker}` | 13.44px | JetBrains Mono | 300 / 0.14em / UPPER | Eyebrow above a headline |
| `{typography.chapter-num}` | 13.44px | JetBrains Mono | 300 / 0.2em / UPPER | Chapter ordinal label |
| `{typography.stat-label}` | 13.44px | JetBrains Mono | 300 / 0.12em / UPPER | Mono label beneath a stat figure |

### Defaults
- **Default size for a routine slide headline**: `{typography.h2}` (61.44px).
- **Default size for a chapter or statement headline**: `{typography.h1}` (105.6px). For statement-class moments specifically, use `{typography.h1-statement}` which caps at `81px` as a lower-scale statement composition on the same fixed stage.
- **Default size for a cover hero title**: `{typography.display}` (192px).
- **Default size for a body paragraph**: `{typography.body}` (20.16px) in Jost weight 300.
- **Default size for a lede / introductory paragraph**: `{typography.lead}` (27.84px).
- **Default size for a kicker / eyebrow**: `{typography.kicker}` (13.44px) in JetBrains Mono uppercase 0.14em with `{colors.accent}` color.
- **Default size for a stat-card figure**: `{typography.stat-value}` (86.4px) in Playfair coral.
- **Default weight for every serif element**: 400.
- **Default weight for every body / Jost element**: 300.
- **Default weight for every mono / JetBrains element**: 300.

The 20.16px body coordinate is a compact starting point, not a projector-readability guarantee. Use the 26.88px list or 27.84px lede role when body is the main subject, and enlarge/recompose or split further if the intended viewing size needs it. Preserve the locked content.

### Signature Treatments
These treatments are **non-optional whenever the corresponding element type is used**:

- **Every Playfair element runs at weight 400.** Bold serif (weight 700) is not used anywhere in the system. This is the system's most important typographic rule.
- **An `<em>` tag inside any Playfair headline (h1, h2, h3, or quote) renders as italic in `{colors.accent}` coral.** This is the signature Grove accent — the way you add emphasis to a headline is to italicize a word in coral. The em-style switch is automatic via CSS.
- **The opening quote mark on a quote slide is rendered as a massive Playfair glyph at 153.6px in `{colors.accent}` coral.** A quote without the oversized coral quote-mark is broken.
- **The quote body is always italic.** Roman-style quote text is not in the system.
- **Every kicker / chapter-num / footline / label / caption is JetBrains Mono uppercase with at least 0.12em letter-spacing.** Mono in sentence case or without tracking reads as code, not chrome.
- **Bullet glyphs are em-dashes (`—`) rendered in JetBrains Mono `{colors.accent}` coral.** Never bullets (`•`), never hyphens (`-`), never asterisks. The em-dash is the system's bullet language.
- **Every chrome bar (top and bottom) carries a 1px solid `{colors.border}` rule (or `{colors.border-light}` on light slides).** The hairline rule is what makes the chrome read as a "frame around the page" rather than a banner.

### Typography Principles
The Playfair-400 / Jost-300 / JetBrains-Mono-300 weight commitment is the system's voice. Switching any of those weights breaks the editorial register. There is no weight ladder — each face has exactly one weight.

Italics are reserved for two specific roles: the coral accent inside headlines (via `<em>`) and the quote body. Italic body paragraphs are not used. Underline is not used. Emphasis in body text is communicated by the `.accent` color utility (changes color to coral), not by italic or bold.

## Layout

### Canvas System
Each slide is a fixed 1920×1080 composition using the [shared runtime](../../../references/deck-runtime.md). Keep the generous 153.6px side and 70.2px vertical padding. Cover, chapter, quote and ending layouts are chromeless; other layouts may carry the 1px top/bottom content frame with real labels.

### Padding Scale
| Token | Value | Use |
|---|---|---|
| `{spacing.pad-x}` | 153.6px | Horizontal slide padding |
| `{spacing.pad-y}` | 70.2px | Vertical slide padding |
| `{spacing.pad-quote-x}` | 168.96px | Slightly wider horizontal padding on quote slides |
| `{spacing.pad-quote-y}` | 84.24px | Slightly taller vertical padding on quote slides |
| `{spacing.gap-lg}` | 48.6px | Between major content sections |
| `{spacing.gap-md}` | 30.24px | Between related elements |
| `{spacing.gap-sm}` | 15.12px | Between tightly coupled elements |

### Chrome Anatomy
Every content slide carries a **slide-chrome** at the top — a thin flex space-between row holding two mono labels separated below by a 1px hairline border — and a **slide-foot** at the bottom — a matching row with section name + "NN / TT" counter, separated above by a matching hairline.

The chrome and foot are hidden on cover, chapter, quote, and end slides — those are the deck's chromeless emotional moments. Every other slide carries the frame.

### Border-Radius
**Zero structural radius.** Cards, actual image regions and comparison panels stay sharp. Navigation uses the shared runtime, not a recipe-specific dot row.

## Depth and Elevation

### Flat, No Shadows
The system uses **zero box-shadow, zero text-shadow, zero blur, zero gradient**. Depth is communicated entirely through:

1. **1px hairline borders** — the chrome bars at top and bottom, the stat-card divider, the compare-panel separator, the section-divider rule.
2. **Opacity layers in text color** — primary (`{colors.fg}`) and measured muted (`{colors.fg-2}`) text, with the faintest tint reserved for decoration. Meaningful text must remain readable.
3. **The watermark numeral** at 6% opacity — a massive Playfair digit sitting in the bottom-right corner of chapter and section slides as compositional texture, not as UI.

The absence of shadow is itself the elevation language. Adding `box-shadow: 0 4px 12px rgba(0,0,0,0.1)` shatters the printed-ink feel.

### Watermark Numeral
The `{components.grove-num}` element is a Playfair digit at 345.6px / 6% opacity, positioned absolutely at `right: {spacing.pad-x}, bottom: -0.15em`. It reads as a faint background texture, never as content. Repeat only an actual section ordinal on chapter / section / statement slides; without one, leave negative space or use the thin accent rule. It is part of the depth language even though it appears as a decorative element.

## Shapes and Treatment

### Border Weight and Style
- **1px solid `{colors.border}`** — the universal hairline on dark slides. Chrome bar borders, stat-card bottoms, compare-panel separators, full-width section dividers.
- **1px solid `{colors.border-light}`** — the matching hairline on light slides.
- **1px solid `{colors.accent}`** — the 36px-wide coral rule (`{components.rule-coral}`) used as the compositional beat between a kicker and the headline that follows.

Borders are never thicker than 1px. Never dashed, never dotted. The 1px hairline is the system's structural rhythm.

### Decorative Element Types

**Slide Chrome Bar** (`{components.slide-chrome}`) — Thin top bar with mono labels on each side, separated below by a 1px hairline. The system's universal "you are reading a page" frame.

**Slide Foot Bar** (`{components.slide-foot}`) — Matching bottom bar with section name + counter, separated above by 1px hairline.

**Coral Rule** (`{components.rule-coral}`) — A 36px-wide 1px terracotta coral horizontal rule. The compositional beat that sits between a kicker (above) and a headline (below). Use it once per slide where a kicker leads into a primary headline — do not stack multiple coral rules.

**Full Rule** (`{components.rule-full}`) — Full-width 1px hairline divider in `{colors.border}` / `{colors.border-light}`. Used as a section break inside a slide body.

**Kicker** (`{components.kicker}`) — Mono uppercase eyebrow in coral, placed above an h1 or h2 headline. Often paired with a coral rule below it.

**Chapter Number** — A mono uppercase ordinal in coral (`{typography.chapter-num}`) above the chapter title. Sets the chapter's identity at chapter-opener slides.

**Em-Dash Bullet** (`{components.bullet-list}`) — A two-column grid list (2em / 1fr) where the bullet is a coral em-dash glyph rendered in JetBrains Mono. Never use a true bullet (`•`); always the em-dash.

**Grove Stat** (`{components.grove-stat}`) — A vertical stack: large Playfair coral value (86.4px) on top, mono uppercase label beneath, 1px border-bottom hairline. No background fill — the card is defined by the rule + the type, not by a containing box.

**Quote Mark** (`{components.quote-mark}`) — Massive Playfair opening-quote glyph at 153.6px in coral, placed above the italic quote body. Always present on a quote slide.

**Watermark Numeral** (`{components.grove-num}`) — Playfair digit at 345.6px / 6% opacity in the bottom-right corner. Compositional texture only, never UI.

**Image Region** (`{components.image-region}`) — A real supplied or authorized image on a tonal fill, with appropriate alt text. If no suitable image exists, recompose the slide; a visible placeholder label is not final content.


## Do's and Don'ts

### Do
- Run every serif moment in Playfair Display weight 400. Never bold.
- Use `<em>` inside any Playfair headline to switch a word to italic terracotta coral — this is the system's signature accent move.
- Run every paragraph in Jost weight 300. The lighter weight is the system's body voice.
- Run every label, kicker, chapter-num, footline, counter, and stat-caption in JetBrains Mono weight 300, uppercase, with at least 0.12em letter-spacing.
- Default slide background to `{colors.bg}` (deep forest green). Use `{colors.bg-light}` (parchment) on quote slides and any moment that wants a literal "page" feel.
- Pair the kicker with the 36px coral rule as a single compositional unit above the slide's primary headline.
- Use the em-dash glyph (`—`) in coral as the universal bullet. Never use round bullets or hyphens.
- Apply the `{components.grove-num}` watermark numeral to chapter and section-opener slides — the bottom-right corner needs that anchor.
- Keep content complete without entrance animation; any motion uses the shared runtime only.
- Keep slides spacious — one headline + one supporting paragraph + one accent rule is the rhythm. Reach for fewer elements at larger sizes.

### Don't
- Don't use bold serif. Playfair at weight 700 is not in this system. Bold serif breaks the editorial voice.
- Don't introduce a fourth typeface beyond Playfair, Jost, JetBrains Mono, and Noto SC. The four-family stack is the entire typographic identity.
- Don't use coral as a surface fill or for body paragraphs. Coral is the accent voice: italic emphasis, kicker, rule, em-dash bullet, stat figure, quote mark, chapter ordinal. That's the entire coral vocabulary.
- Don't use box-shadow, gradient, blur, or any rgba shadow. The system is flat.
- Don't use thick borders (2px+). The 1px hairline is the system's structural rhythm.
- Keep structural geometry sharp-cornered. Navigation geometry belongs to the shared runtime.
- Don't use round bullets, hyphens, or asterisks for list items. The em-dash in coral is the only bullet glyph.
- Don't put a kicker without a coral rule below it. The kicker → rule → headline triad is one unit.
- Set ordinary mono chrome in uppercase with 0.12em+ tracking; preserve source casing and suitable tracking for case-sensitive names and identifiers.
- Don't omit the slide-chrome and slide-foot on content slides. The thin frame at top and bottom is what makes the slide read as a page.
- Don't crowd the canvas. Recompose, split or choose another system while preserving every supporting element's meaning; never discard content for silence.

## Stage adaptation and delivery

All internal geometry stays on the 1920×1080 stage. The shared runtime scales the entire slide uniformly, including type, borders and ornaments; smaller screens may letterbox and do not rearrange columns. Test the real title, densest content, navigation and legibility at the intended viewing sizes. Capture, PDF, reduced motion and audience controls follow the [shared runtime contract](../../../references/deck-runtime.md) and Deck Studio's production workflow. This recipe defines no alternate print or presentation path.

## CJK & International Content

### Role map and visual choice

| Role | Latin face | CJK adaptation candidate |
|---|---|---|
| Display / figures | Playfair Display 400 | Noto Serif CJK 400 |
| Body / captions | Jost 300 | Noto Sans CJK at an inspected supported 300 or 400 weight |
| Chrome / bullets | JetBrains Mono 300 | A provisioned CJK mono face at a supported weight, or CJK sans aligned to the label grid |
| Expressive emphasis | Playfair Display 400 italic | Upright Noto Serif CJK 400; optional XiaoWei 400 face change when that more literary voice is intended |

### Composition and mixed-script treatment

Preserve the quiet light-weight hierarchy, 1px frame rules, 36px coral accent rule, em-dash list markers and generous parchment/forest negative space. Latin italics require the real Playfair italic face. A browser can synthesize slant on a CJK fallback, so the CJK emphasis span explicitly uses upright style and no font synthesis. The optional XiaoWei face shift changes texture; it is not an italic equivalent. Keep Jost Latin and CJK sans body roles coherent instead of silently switching body to serif. Start Han display leading around 1.15–1.3 and body around 1.7–1.9, measured with the actual font. Zero Han tracking and retain the mono rhythm on Latin runs. Low-weight captions need enough size and full readable ink rather than a promise that a pale tint will survive projection.

### Font provision and script handling

These are candidates, not bundled assets or guaranteed substitutes. Before rendering, provision the exact local font files, weights and styles actually used; record the selected faces and verify the deck's actual glyph inventory, including rare names, punctuation, numerals and locale-specific forms. Do not claim a network font URL, a fallback family name or a browser's synthetic weight proves the intended face loaded. Set `font-synthesis: none`; use explicit script/role classes when weight, style or family differs. A single fallback stack is sufficient only when the same requested face properties are genuinely supported for both scripts.

Keep punctuation, casing, names, metrics and the locked words intact. Apply locale-aware line-breaking and spacing through layout; do not automatically strip terminal punctuation, insert words, translate labels or normalize identifiers. Keep punctuation with the phrase it belongs to and numbers with units. Han tracking starts at zero; Latin tracking remains role-specific. Verify representative full-width punctuation and mixed Latin/Han lines at actual stage size. If adaptation would change audience-visible meaning, return to content approval outside the slide frame.

### System-specific checks

Inspect long emphasis runs, mixed-script quotes, chapter labels and paragraph endings. A true ordinal can remain Playfair wallpaper at 6% opacity, decorative and aria-hidden, while its readable content occurrence remains intact. If content fills the quiet field, recompose or split with all supporting meaning preserved; never remove supporting content merely to keep the slide sparse.

## Iteration Guide

1. Any new headline is Playfair Display weight 400. Pick the size from the headline ladder (192px display / 105.6px h1 / 61.44px h2 / 38.4px h3) — do not invent a new size.
2. Any new emphasis inside a headline uses `<em>` and renders as italic coral automatically. Do not author a manual color/italic style.
3. Any new body paragraph is Jost weight 300 at 20.16px (or 27.84px for lede, or `26.88px` on list-style slides).
4. Any new label / kicker / footline / counter / caption is JetBrains Mono weight 300 uppercase with at least 0.12em letter-spacing.
5. Any new chrome line (top bar, bottom bar, section divider, stat-card border) is a 1px solid hairline in `{colors.border}` (dark) or `{colors.border-light}` (light). No thicker borders.
6. Any new bullet list uses the `{components.bullet-list}` pattern (two-column grid, em-dash in coral mono). Do not author a different bullet style.
7. Any new accent moment uses `{colors.accent}` terracotta coral. The accent is for italic headline emphasis, the 36px rule, em-dashes, stat figures, quote marks, chapter ordinals, and the kicker text. Nothing else.
8. Any new chapter or section-opener slide carries a `{components.grove-num}` watermark numeral in the bottom-right corner.
9. New content remains visible and complete without an animation hook. Navigation, motion and export use the shared runtime.
10. When in doubt, add space rather than content. Grove's editorial register is silence, not density.

## Production watchpoints

Inspect light-weight Jost body and mono captions at the intended viewing size; raise opacity or recompose when needed. Keep the 6% wallpaper decorative while any real ordinal remains readable elsewhere. No image placeholder or initially hidden content may survive into the accepted deck. Preserve supporting material through recomposition or splitting.

This document is a recipe, not evidence that a deck was rendered or accepted. Inspect the actual output, keep validation enabled, and record rendered/visual/PDF acceptance through the shared Deck Studio workflow.
