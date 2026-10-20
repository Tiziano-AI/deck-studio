---
version: alpha
name: Blue Professional
description: A restrained, consulting-grade presentation system on a warm cream canvas (#fdfae7) with a single saturated cobalt blue (#1e2bfa) as the principal accent color. Display type runs Space Grotesk for headlines and numerical callouts; Inter handles body and chrome. Cards are soft-tinted cobalt at 4% opacity with 1.5px translucent borders and 10-14px rounded corners — quiet, never bordered in solid color. The aesthetic borrows from investment-research reports, McKinsey-grade quarterly briefings, and contemporary financial dashboards — measured, data-dense without feeling crowded, and unmistakably professional. The hierarchy aims at executive briefings; choose readable stage text sizes for the actual viewing distance instead of assuming compact metadata sizes suffice.

colors:
  bg: "#fdfae7"
  primary: "#1e2bfa"
  text: "#111111"
  text-muted: "#6b6b6b"
  text-light: "#9a9a9a"
  accent-light: "rgba(30, 43, 250, 0.08)"
  accent-medium: "rgba(30, 43, 250, 0.15)"
  border: "rgba(30, 43, 250, 0.2)"
  card-bg: "rgba(30, 43, 250, 0.04)"
  positive: "#059669"
  negative: "#dc2626"

typography:
  h1:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 700
    fontSize: "67.2px"
    lineHeight: 1.1
    letterSpacing: -0.02em
  h2:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 600
    fontSize: "41.6px"
    lineHeight: 1.1
    letterSpacing: -0.02em
  h3:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 500
    fontSize: "24px"
    lineHeight: 1.3
    letterSpacing: -0.02em
  h4-eyebrow:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 600
    fontSize: "16px"
    lineHeight: 1.1
    letterSpacing: 0.08em
    textTransform: uppercase
    color: "{colors.primary}"
  body:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 400
    fontSize: "16.8px"
    lineHeight: 1.6
    color: "{colors.text-muted}"
  metric-value:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 700
    fontSize: "48px"
    lineHeight: 1
    color: "{colors.primary}"
  metric-label:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 600
    fontSize: "17.6px"
    lineHeight: 1.3
    color: "{colors.text}"
  metric-desc:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 400
    fontSize: "14.4px"
    lineHeight: 1.5
    color: "{colors.text-muted}"
  metric-support:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 400
    fontSize: "13.6px"
    lineHeight: 1.45
    color: "{colors.text-muted}"
  stat-num:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 700
    fontSize: "33.6px"
    lineHeight: 1
    color: "{colors.primary}"
  stat-name:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 500
    fontSize: "15.2px"
    lineHeight: 1.35
    color: "{colors.text}"
  stat-context:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 400
    fontSize: 12px
    lineHeight: 1.4
    color: "{colors.text-light}"
  agenda-num:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 700
    fontSize: 28.8px
    lineHeight: 1
    color: "{colors.primary}"
  insight-num:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 600
    fontSize: 12.5px
    lineHeight: 1.7
    letterSpacing: 0.05em
    color: "{colors.primary}"
  split-highlight:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 500
    fontSize: "24px"
    lineHeight: 1.4
    color: "{colors.text}"
  blockquote:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 500
    fontSize: "38.4px"
    lineHeight: 1.35
    color: "{colors.text}"
  quote-mark:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 700
    fontSize: "128px"
    lineHeight: 0.5
    color: "{colors.primary}"
    opacity: 0.15
  step-circle-text:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 700
    fontSize: 20.8px
    lineHeight: 1
  step-title:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 600
    fontSize: "18.4px"
    lineHeight: 1.2
  bar-label:
    fontFamily: "'Inter', sans-serif"
    fontWeight: 500
    fontSize: "16px"
    lineHeight: 1.3
    color: "{colors.text}"
  bar-pct:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 600
    fontSize: 15.2px
    color: "{colors.primary}"
  tag:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 500
    fontSize: 12px
    lineHeight: 1
    color: "{colors.primary}"
  counter:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 500
    fontSize: 12.8px
    lineHeight: 1
    letterSpacing: 0.05em
    color: "{colors.text-muted}"
  meta:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 400
    fontSize: 12.8px
    lineHeight: 1.4
    letterSpacing: 0.05em
    color: "{colors.text-light}"
  cite:
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 500
    fontSize: 12.5px
    lineHeight: 1.4
    letterSpacing: 0.04em
    textTransform: uppercase
    color: "{colors.text-muted}"

spacing:
  pad-slide-x: "76.8px"
  pad-slide-y-top: "67.2px"
  pad-slide-y-bottom: "91.8px"
  pad-card-lg: "1.5rem 1.6rem"
  pad-card-md: "1.4rem 1.5rem"
  pad-card-sm: "1rem 1.2rem"
  pad-mini: "0.9rem 1rem"
  gap-grid-lg: "3.5rem"
  gap-grid-md: "2rem 3rem"
  gap-grid-sm: "1.5rem"
  gap-cards: "1.2rem"
  gap-mini: "1rem"
  header-margin: "27px"
  accent-line-width: "60px"
  accent-line-height: "4px"

canvas:
  width: 1920px
  height: 1080px
  background: "{colors.bg}"

radii:
  pill: "100px"
  card-lg: "14px"
  card-md: "12px"
  card-sm: "10px"
  bar: "6px"
  circle: "50%"

components:
  card-tinted:
    background: "{colors.card-bg}"
    border: "1.5px solid {colors.border}"
    borderRadius: 14px
    padding: "1.5rem 1.6rem"
    description: "Primary content card. Cobalt tinted at 4% with a 20% cobalt 1.5px border. Soft 14px radius. Never solid-colored, never outlined in full primary."
  card-tinted-sm:
    background: "{colors.card-bg}"
    border: "1px solid {colors.border}"
    borderRadius: 12px
    padding: "1.4rem 1.5rem"
    description: "Compact tinted card with 1px border. Used for stat cells and small data blocks."
  card-tinted-xs:
    background: "{colors.card-bg}"
    border: "1px solid {colors.border}"
    borderRadius: 10px
    padding: "0.9rem 1rem"
    description: "Mini tinted card used for inline mini-stats."
  detail-block:
    background: "{colors.card-bg}"
    border: "1px solid {colors.border}"
    borderRadius: 10px
    padding: "1rem 1.2rem"
    description: "Detail block holding a small h3 + a bulleted ul. Used in detail-analysis grids."
  tag-pill:
    background: "{colors.accent-light}"
    color: "{colors.primary}"
    padding: "0.35rem 0.9rem"
    borderRadius: 100px
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 500
    fontSize: 12px
    description: "Pill-shaped tag sitting in the top-right of the slide-header. Fully rounded, soft cobalt tint background, cobalt text."
  cta-button:
    background: "{colors.primary}"
    color: "{colors.bg}"
    padding: "0.9rem 2.2rem"
    borderRadius: 100px
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 600
    fontSize: 15.2px
    description: "Primary CTA. Fully rounded solid cobalt pill with cream text. Hover lifts -2 with a soft cobalt drop shadow."
  nav-btn:
    width: 44px
    height: 44px
    borderRadius: 50%
    border: "1.5px solid {colors.border}"
    background: "{colors.bg}"
    color: "{colors.primary}"
    description: "Circular nav-arrow button. Hover inverts: cobalt fill, cream icon. Disabled state at 30% opacity."
  accent-line:
    width: 60px
    height: 4px
    background: "{colors.primary}"
    borderRadius: 2px
    description: "Short horizontal cobalt rule, 60×4px, slightly rounded. Used above cover titles and as eyebrow separators."
  accent-dot:
    width: 8px
    height: 8px
    background: "{colors.primary}"
    borderRadius: 50%
    description: "Small inline cobalt dot. Decorative inline marker."
  bar-track:
    height: 28px
    background: "{colors.accent-light}"
    borderRadius: 6px
    description: "Horizontal bar chart track. Soft cobalt tint with 6px rounded corners."
  bar-fill:
    height: "100%"
    background: "{colors.primary}"
    borderRadius: 6px
    description: "Solid cobalt fill inside bar-track. Width carries the data value. Animates from 0 to value on slide entry."
  step-circle:
    width: 56px
    height: 56px
    borderRadius: 50%
    background: "{colors.primary}"
    color: "{colors.bg}"
    description: "Circular numbered step marker in cobalt with cream numeral. Keep steps equally readable; source-established state can receive a labeled visual distinction without implying unsupported future status."
  metric-change-positive:
    color: "{colors.positive}"
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 600
    fontSize: 12.5px
    description: "Inline positive-change chip with a source-correct direction glyph and percentage. Green text inline; no border or fill."
  metric-change-negative:
    color: "{colors.negative}"
    fontFamily: "'Space Grotesk', sans-serif"
    fontWeight: 600
    fontSize: 12.5px
    description: "Inline negative-change chip with up/down-arrow glyph and percentage. Red text inline; no border or fill."
  insight-list-item:
    paddingLeft: "2.6rem"
    description: "Numbered insight list with a Space Grotesk 600 counter (decimal-leading-zero) at position absolute left. Numbers in cobalt, body in default text color."
  split-highlight-block:
    background: "{colors.accent-light}"
    borderLeft: "4px solid {colors.primary}"
    borderRadius: 12px
    padding: "1.3rem 1.5rem"
    description: "Highlighted callout block with cobalt left rule and tinted cobalt fill. Used for inline pull-quotes inside split-column layouts."
  progress-bar:
    position: "fixed bottom 0 left 0"
    height: 3px
    background: "{colors.primary}"
    description: "Thin cobalt progress bar at the bottom edge of the viewport, width grows linearly with slide index."
  cover-decoration:
    background: "{colors.accent-light}"
    clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)"
    description: "Diagonal accent panel filling the right ~35% of cover surfaces. Soft cobalt tint, clip-path angled cut on the left edge."
  cover-dots:
    layout: "3x3 grid of 6px cobalt dots at 12px gap, 25% opacity"
    description: "Small dotted decoration used on cover and other open-space surfaces."
  closing-circles:
    border: "1px solid {colors.border}"
    borderRadius: "50%"
    description: "Two concentric centered circles (500px outer, 360px inner) as atmospheric decoration on closing-class surfaces. Opacity 0.3-0.4."
---

## Stage and Content Contract

This recipe supplies visual decisions for Deck Studio's fixed **1920×1080** stage. Use the canonical [runtime](../../../runtime/) and [runtime contract](../../../references/deck-runtime.md) for stage scaling, navigation, focus, capture and export. Do not create a second scaler, slide controller, keyboard handler or print engine. The whole stage scales uniformly, including on phones; the composition does not internally reflow with the browser viewport.

All dimensions below are stage-space authoring values. A range is a choice to resolve while composing, not permission for live viewport-dependent layout. Body and data text must remain readable in the intended presentation or reading setting: enlarge and recompose, split while retaining all locked material, or choose another system when the content does not fit. Never clip, scroll, hide, omit or invent material to complete a layout. Visible labels, metrics, attribution, ordinals, emphasis and status come from the content lock; wordless geometry may supply atmosphere.

## Overview

Blue Professional is a **consulting-grade presentation system** designed for executive briefings, research deliverables, and quarterly reviews. Its foundational visual premise is **restraint with one strong commitment**: a warm cream canvas (`{colors.bg}` — `#fdfae7`) and a single saturated cobalt (`{colors.primary}` — `#1e2bfa`) that carries every accent, every metric, every CTA, every eyebrow, every chart fill. There is no secondary brand color, no palette of pastels, no warm/cool pairing — just cream, cobalt, and a tight ladder of muted grays for body text.

The type system uses two open Google Fonts in tightly defined roles. **Space Grotesk** (weights 300-700) is the display, headline, numerical, and chrome face — used for h1-h3 headings, all metric/stat numerals, eyebrow labels (in uppercase with 0.08em tracking), tag pills, CTAs, slide counters, agenda numbers, and step circles. Its slightly geometric character + soft humanist warmth makes it read as both modern (suitable for AI/tech audiences) and trustworthy (suitable for finance audiences). **Inter** (weights 300-600) is the body face — used for paragraph text, list bodies, metric descriptions, and table-style content. The Space Grotesk / Inter pairing is deliberately ordinary; what makes the system feel distinctive is the discipline of their usage, not the novelty of the faces.

The color philosophy is **one accent, three text grays**. Cobalt does all the emphasis work: headlines stay in `{colors.text}` (a near-black `#111111`), but every metric value, every eyebrow, every CTA, every chart bar, every callout border, every step circle, every progress indicator is cobalt. Body text uses a three-step gray ladder — `{colors.text}` for primary body, `{colors.text-muted}` (`#6b6b6b`) for paragraph body and metric descriptions, `{colors.text-muted}` for tertiary metadata and `{colors.text-light}` (`#9a9a9a`) for wordless secondary marks. Only two non-cobalt accent colors exist: `{colors.positive}` (a subdued green `#059669`) and `{colors.negative}` (a subdued red `#dc2626`), used only on directional change indicators (arrows and percentages on metric cards) — and these are inline text colors, not fills.

Depth is **soft and tinted**, never offset or shadowed. Cards are 4% cobalt tints (`{colors.card-bg}`) with 1.5px translucent cobalt borders (`{colors.border}` — cobalt at 20% opacity) and 10-14px rounded corners. There are no drop shadows except a single subtle cobalt-tinted shadow on the CTA hover state (`0 8px 24px rgba(30, 43, 250, 0.25)`). The lack of harsh shadows is what gives the system its quiet, premium feel — every elevation is implied by border + tint, not by shadow.

**Density philosophy: balanced and data-dense without crowding.** This system is built to carry information — six-stat dashboards, six-detail-block grids, seven-bar rankings, multi-column splits with callouts and mini-stats. The system reads as authoritative when populated with substantive content and timid when sparse. A typical surface holds: a slide-header (h4 eyebrow + tag pill) + a section h2 headline + a grid or list of 3-6 information cells. Cards have moderate internal padding (1.5rem) and moderate inter-card gap (1.2-1.5rem) — neither tight nor airy. The system can support both quote/cover-class surfaces (one bold statement in space) and dashboard-class surfaces (six cards of dense data) without feeling like two different systems.

**Key Characteristics:**
- Warm cream ground (`{colors.bg}`) on every surface — never pure white, never gray.
- Single saturated cobalt (`{colors.primary}`) as the principal accent — used for every eyebrow, metric, CTA, chart fill, and progress indicator.
- Space Grotesk (display + chrome) + Inter (body) — never substitute either.
- Cards are 4% cobalt tints with 1.5px cobalt-at-20% borders and 10-14px rounded corners.
- Soft pill-shaped chrome (`{components.tag-pill}`, `{components.cta-button}`) with full `100px` border-radius.
- Headlines use Space Grotesk weight 600-700 with -0.02em tracking on a near-black text color.
- Body uses Inter weight 400 at 13.6-16.8px with 1.6 line-height in the muted gray.
- Content slides use a headline and flexible region; add an eyebrow or tag only when supplied, leaving the composition balanced without filler.
- Persistent chrome: cobalt progress bar at bottom edge, slide-counter at bottom-left, circular nav-arrows at bottom-right.
- Decorative atmospheric elements (concentric circles, dot grids, diagonal accent panels) appear only on cover and closing-class surfaces.

## Colors

### Palette

- **Bg** (`{colors.bg}` — `#fdfae7`): The warm cream canvas. The default and universal surface. Slightly green-cream-leaning warmth that distinguishes the system from corporate-template white. Every slide rests on this ground.
- **Primary** (`{colors.primary}` — `#1e2bfa`): The signature cobalt. A highly saturated electric blue that carries every emphasis moment. Used for h4 eyebrows, metric values, stat numerals, chart bar fills, CTA fills, step circles, progress bars, accent lines, agenda numbers, and the cite border on highlight blocks. Green/red remain reserved exceptions for actual positive/negative outcomes.
- **Text** (`{colors.text}` — `#111111`): The primary text color. Near-black, slightly warmer than `#000000`. Used for h1-h3 headlines, primary content text, metric labels, and any text that should carry full weight.
- **Text-muted** (`{colors.text-muted}` — `#6b6b6b`): Secondary text — body paragraphs, metric descriptions, captions. Reads as comfortably softer than the primary text without disappearing.
- **Text-light** (`{colors.text-light}` — `#9a9a9a`): Tertiary text — slide meta info, hairline dividers in text, stat context lines. Reserve this light tone for wordless secondary marks; use text-muted or text for readable metadata.
- **Accent-light** (`{colors.accent-light}` — `rgba(30, 43, 250, 0.08)`): The default cobalt tint for tag pills, bar tracks, highlight callouts, and cover-decoration panels.
- **Accent-medium** (`{colors.accent-medium}` — `rgba(30, 43, 250, 0.15)`): A slightly darker cobalt tint, available but used sparingly.
- **Border** (`{colors.border}` — `rgba(30, 43, 250, 0.2)`): Cobalt at 20% opacity. The universal soft border color for cards, nav buttons, decorative circles, and structural rules.
- **Card-bg** (`{colors.card-bg}` — `rgba(30, 43, 250, 0.04)`): Cobalt at 4% opacity. The universal card fill — softer than accent-light, reading as a barely-tinted surface that lifts slightly off the cream ground.
- **Positive** (`{colors.positive}` — `#059669`): Subdued green. Used only inline as the text color for positive-change indicators (actual direction + percentage). Never used as a fill or border.
- **Negative** (`{colors.negative}` — `#dc2626`): Subdued red. Used only inline as the text color for negative-change indicators. Never used as a fill or border.

### Defaults

- **Default surface background**: `{colors.bg}` — every surface starts on cream.
- **Default headline color**: `{colors.text}` (`#111111`) — headlines are near-black, never cobalt. Cobalt is reserved for accent moments (eyebrows, metrics, CTAs).
- **Default body text color**: `{colors.text-muted}` (`#6b6b6b`) — body paragraphs default to muted, not full black.
- **Default eyebrow / h4 color**: `{colors.primary}` — eyebrows are always cobalt, always uppercase, always with 0.08em tracking.
- **Default card fill**: `{colors.card-bg}` (cobalt at 4%) — the universal soft tint.
- **Default card border**: `{colors.border}` (cobalt at 20%) at 1px or 1.5px. Never solid full-cobalt borders.
- **Default card border-radius**: 10-14px depending on card size (`{radii.card-sm}` for stat cells, `{radii.card-md}` for stat cards and detail blocks, `{radii.card-lg}` for metric cards).
- **Default accent for any numerical value (metric, stat, agenda number, bar percentage)**: `{colors.primary}`.
- **Default chart bar color**: `{colors.primary}` solid fill on a `{colors.accent-light}` track.
- **Default CTA**: `{components.cta-button}` — solid cobalt pill with cream text and 100px border-radius.
- **Default tag pill**: `{components.tag-pill}` — soft cobalt tint with cobalt text and 100px border-radius, paired with an h4 eyebrow in the slide-header.

The system has **no secondary accent color**. Don't reach for orange, teal, or purple to differentiate categories — the single-cobalt discipline is the system's identity. Categorical differentiation should be done through positioning, sizing, or labeling, not through additional hues.

## Typography

### Font Family Stack
The system runs two faces, each with a single role.

**Space Grotesk** (Google Fonts, weights 300-700) is the display + numerical + chrome face. Used for every h1, h2, h3, h4 heading; every numerical callout (metric values, stat numbers, agenda numbers, bar percentages, step circles); every chrome element (tag pills, CTAs, slide counters, hint text); and every uppercase eyebrow with 0.08em tracking. Its slightly geometric character + softly rounded humanist forms read as both contemporary and trustworthy — suitable for both AI/tech and finance audiences.

**Inter** (Google Fonts, weights 300-600) is the body face. Used for paragraph text, list bodies, metric descriptions, agenda descriptions, detail-block body, and any longer-form content. Set at weight 400 with line-height 1.6 in the muted gray, Inter reads as comfortable, generous, and editorial.

The face roles are non-overlapping: Space Grotesk handles every numeral and every heading; Inter handles every paragraph and list body. Don't cross the boundary — Inter h1 reads as a different brand; Space Grotesk body reads as a tech startup landing page.

### Typography Scale

| Token | Size (clamp / px) | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.h1}` | 44.8–67.2px clamp | Space Grotesk | 700 | Cover or closing title |
| `{typography.h2}` | 28.8–41.6px clamp | Space Grotesk | 600 | Primary section headline on each slide |
| `{typography.h3}` | 17.6–24px clamp | Space Grotesk | 500 | Agenda item / region title |
| `{typography.h4-eyebrow}` | 13.6–16px clamp | Space Grotesk | 600 | Uppercase eyebrow in the slide-header (always cobalt) |
| `{typography.body}` | 13.6–16.8px clamp | Inter | 400 | Standard body paragraph |
| `{typography.metric-value}` | 35.2–48px clamp | Space Grotesk | 700 | Large metric numeral in a callout card |
| `{typography.metric-label}` | 15.2–17.6px clamp | Inter | 600 | Metric label line under the numeral |
| `{typography.metric-desc}` | 12.5–14.4px clamp | Inter | 400 | Metric supporting description paragraph |
| `{typography.metric-support}` | 12–13.6px clamp | Inter | 400 | Metric supporting bullet list |
| `{typography.stat-num}` | 25.6–33.6px clamp | Space Grotesk | 700 | Stat-cell numeral (smaller than metric-value) |
| `{typography.stat-name}` | 13.6–15.2px clamp | Inter | 500 | Stat-cell descriptive name line |
| `{typography.stat-context}` | 12px | Inter | 400 | Stat-cell tertiary context line below a hairline divider |
| `{typography.agenda-num}` | 28.8px | Space Grotesk | 700 | Agenda item numeral |
| `{typography.insight-num}` | 12.5px | Space Grotesk | 600 | Counter-style number prefix on insight list items |
| `{typography.split-highlight}` | 18.4–24px clamp | Space Grotesk | 500 | Inline pull-quote text inside a split-highlight block |
| `{typography.blockquote}` | 25.6–38.4px clamp | Space Grotesk | 500 | Quote-class headline body |
| `{typography.quote-mark}` | 128px | Space Grotesk | 700 | Decorative oversized quote glyph at 15% opacity above a blockquote |
| `{typography.step-circle-text}` | 20.8px | Space Grotesk | 700 | Numeral inside a circular step marker |
| `{typography.step-title}` | 15.2–18.4px clamp | Space Grotesk | 600 | Step title beneath a step circle |
| `{typography.bar-label}` | 12.8–16px clamp | Inter | 500 | Bar chart row label |
| `{typography.bar-pct}` | 15.2px | Space Grotesk | 600 | Bar chart row percentage value |
| `{typography.tag}` | 12px | Space Grotesk | 500 | Tag pill text in slide-header |
| `{typography.counter}` | 12.8px | Space Grotesk | 500 | Persistent slide counter |
| `{typography.meta}` | 12.8px | Space Grotesk | 400 | Cover meta line (e.g., date / confidential marker) |
| `{typography.cite}` | 12.5px | Space Grotesk | 500 | Cite/attribution under a pull-quote, uppercase with 0.04em tracking |

### Defaults

- **Default size for a cover title**: `{typography.h1}` (44.8–67.2px). Always Space Grotesk weight 700 with -0.02em tracking.
- **Default size for the primary section headline on each slide**: `{typography.h2}` (28.8–41.6px). Space Grotesk weight 600. The "section h2" is the system's structural workhorse — every content slide has one.
- **Default size for a region or agenda-item title**: `{typography.h3}` (17.6–24px).
- **Default size for the eyebrow above the h2**: `{typography.h4-eyebrow}` (13.6–16px) in cobalt, uppercase, 0.08em tracking.
- **Default size for paragraph body**: `{typography.body}` (13.6–16.8px clamp). Inter weight 400 with line-height 1.6.
- **Default size for a large metric numeral**: `{typography.metric-value}` (35.2–48px). For dashboard stat cells, step down to `{typography.stat-num}` (25.6–33.6px).
- **Default size for a quote body**: `{typography.blockquote}` (25.6–38.4px). Always Space Grotesk weight 500.
- **Default weight for Space Grotesk headings**: 500 (h3) → 600 (h2 and eyebrow) → 700 (h1 and numerical callouts). Don't reach for weight 400 or 800; the weight ladder is fixed.
- **Default weight for Inter body**: 400. Inter body at 500-600 reads as too assertive; at 300 reads as too thin.
- **Default tracking for h1-h3 headings**: -0.02em. Without negative tracking, Space Grotesk display reads as untreated.
- **Default tracking for the h4 eyebrow**: 0.08em uppercase. Without the wide tracking + uppercase combination, the eyebrow doesn't read as an eyebrow.

When unsure which heading token to reach for, default to `{typography.h2}` (28.8–41.6px) for the slide's primary text moment. `{typography.h3}` is for region or agenda-item titles; `{typography.h1}` is reserved for cover and closing.

### Signature Treatments

These treatments are **non-optional whenever the corresponding element type is used**:

- **Every h4 eyebrow is Space Grotesk weight 600 in `{colors.primary}` cobalt, uppercase, with 0.08em letter-spacing.** No exceptions. An eyebrow without uppercase + tracking + cobalt color is not the system's eyebrow — it's a stray sans element.
- **Every headline (h1, h2, h3) uses negative letter-spacing of -0.02em.** Default-tracked Space Grotesk display reads as untreated and breaks the editorial discipline.
- **Every headline uses `{colors.text}` (`#111111`), not cobalt.** Cobalt headlines are forbidden — cobalt is reserved for accent moments (eyebrows, metrics, CTAs, chart bars). Reversing this collapses the visual hierarchy.
- **Every numerical callout (metric value, stat number, agenda number, bar percentage, step circle) is Space Grotesk weight 600-700 in `{colors.primary}` cobalt.** Numerical values are the system's primary accent moment.
- **Every body paragraph is Inter weight 400 in `{colors.text-muted}` (`#6b6b6b`) with line-height 1.6.** Body in pure black reads as too heavy; body in text-light reads as too faint.
- **Every CTA is the `{components.cta-button}` pattern: solid cobalt pill with cream text, 100px border-radius, 0.9rem × 2.2rem padding.** CTAs in any other shape or color don't exist.
- **Every tag pill is the `{components.tag-pill}` pattern: soft cobalt tint with cobalt text, 100px border-radius, 0.35rem × 0.9rem padding.** Tag pills with solid backgrounds or borders break the system.
- **When both are supplied, the slide-header places the h4 eyebrow on the left and the tag pill on the right.** Recompose gracefully when either is absent.

### Typography Principles

The voice contrast is **near-black display headlines ↔ cobalt eyebrows + numerals ↔ muted gray body**. Italic and underline are not used. The only emphasis mechanisms are: switching weight within the Space Grotesk ladder, switching color from text-muted to text or to cobalt, and uppercase + tracking on labels.

Numerical content is **always Space Grotesk**, even small numerical labels (bar percentages, slide counters, mini-stat values). Use explicit numeric columns and verify the selected asset's tabular-digit feature before depending on alignment.

## Layout

### Canvas System
Compose inside the canonical 1920×1080 stage. Keep the recipe's internal grid, margins and visual layers in stage coordinates. The runtime owns the outer viewport fit and slide visibility; recipe CSS must not replace its container positioning or slide-state classes. Reserve space for actual runtime controls where present and never reproduce them as painted buttons or invented hints.

### Padding and Gap Scale

| Token | Value | Use |
|---|---|---|
| `{spacing.pad-slide-x}` | 76.8px | Slide horizontal padding |
| `{spacing.pad-slide-y-top}` | 67.2px | Slide top padding |
| `{spacing.pad-slide-y-bottom}` | 91.8px | Slide bottom padding (extra to clear nav chrome) |
| `{spacing.pad-card-lg}` | 1.5rem 1.6rem | Large card internal padding (metric cards) |
| `{spacing.pad-card-md}` | 1.4rem 1.5rem | Medium card internal padding (stat cells) |
| `{spacing.pad-card-sm}` | 1rem 1.2rem | Small card internal padding (detail blocks) |
| `{spacing.pad-mini}` | 0.9rem 1rem | Mini card internal padding (mini-stat cells) |
| `{spacing.gap-grid-lg}` | 3.5rem | Large gap between split columns |
| `{spacing.gap-grid-md}` | 2rem 3rem | Medium gap in two-column grids (row × col) |
| `{spacing.gap-grid-sm}` | 1.5rem | Standard gap in 3-column metric grids |
| `{spacing.gap-cards}` | 1.2rem | Gap between dashboard stat cells |
| `{spacing.gap-mini}` | 1rem | Gap between mini-stats |
| `{spacing.header-margin}` | 27px | Margin below the slide-header |

### Persistent Chrome
The visual treatment for supported runtime navigation is a 44px circular control with a 1.5px translucent cobalt border, cobalt/cream active feedback and an actual disabled state. Use the runtime's real counter or progress indicator instead of drawing a second one. Keep the navigation footprint separate from content and use readable control labels.

### Slide-Header Structure
When present in the lock, an eyebrow and tag occupy the left and right of the slide-header band. Below the slide-header sits the section h2, then the content region (a grid, list, chart, or split). Cover, quote, and closing slides skip the slide-header in favor of centered content.

### Content Grids
The system uses repeated grid patterns for content layout: 2×3 agenda grid, 3-column metric row, 3-column stats grid (becomes 2 rows on dashboards), 1.05fr/1fr split-body, 4-step timeline row, 2-column detail grid. These are content-density containers; the grid choice depends on content volume, not on a fixed layout vocabulary.

## Depth and Elevation

### Tinted Cards (Primary Depth Mechanism)
The system uses **soft cobalt-tinted backgrounds + soft cobalt-borders + rounded corners** to create the impression of elevation without using shadows. A card with `background: {colors.card-bg}` (cobalt at 4%) and `border: 1.5px solid {colors.border}` (cobalt at 20%) sits visually above the cream ground without any actual offset. This treatment is the system's depth language.

### No Drop Shadows on Cards
There are no `box-shadow` declarations on cards, stat cells, detail blocks, or any content container. The only shadow in the system is a single soft cobalt-tinted hover state on the CTA button: `0 8px 24px rgba(30, 43, 250, 0.25)`, which appears for 200ms on hover and disappears on mouse-out. This is the only colored, blurred shadow in the system.

### Border-Left Accent (Highlight Block)
The `{components.split-highlight-block}` uses a 4px solid cobalt left border to signal "this is a quoted callout, distinct from surrounding body". This is the system's structural accent mechanism — it's not a shadow, but it carries the same elevation cue (the colored rule pulls the block forward visually).

### Rounded Corners as Softness
The 10-14px border-radius on cards is part of the depth language. Without rounded corners, the cobalt-tinted cards would read as flat panels; the soft radius softens them into "lifted" surfaces.

### Atmospheric Decorations
Decorative elements (cover-decoration diagonal panel, concentric closing-circles, cover-dots grid, quote decoration circles) appear only on cover, quote, and closing-class surfaces. They are atmospheric, not structural — used to soften open-space surfaces without filling them with content.

## Shapes and Treatment

### Border Radius
- **`{radii.pill}` = 100px** — fully rounded. Used on `{components.tag-pill}`, `{components.cta-button}`, and any pill-shaped chrome.
- **`{radii.card-lg}` = 14px** — used on large metric cards.
- **`{radii.card-md}` = 12px** — used on standard stat cells, split-highlight blocks.
- **`{radii.card-sm}` = 10px** — used on detail blocks and mini-stats.
- **`{radii.bar}` = 6px** — used on bar tracks and bar fills.
- **`{radii.circle}` = 50%** — used on step circles, nav-button circles, accent dots, closing decoration circles, cover dots, quote decoration circles.

The radius ladder is graduated: tighter radii on smaller chrome, larger radii on bigger cards, fully rounded on pills, perfect circles on chrome. The system has **no square (0px) corners** anywhere except the progress bar.

### Border Weights
- **1px solid `{colors.border}`** — universal soft border. Used on stat cells, mini-stats, detail blocks, agenda items (bottom border only), stat-context dividers (top border only).
- **1.5px solid `{colors.border}`** — slightly heavier soft border. Used on metric cards, nav-buttons.
- **2px solid `{colors.border}`** — used on the split column divider (border-left on the right column of split layouts).
- **4px solid `{colors.primary}`** — used only as the left rule on `{components.split-highlight-block}` to signal a quoted callout.

Card outlines use 20%-opacity cobalt (`{colors.border}`); the documented 4px highlight rule uses solid cobalt. This is what gives the system its quiet, lifted quality.

### Decorative Element Types

**Tinted card** (`{components.card-tinted}`) — Cobalt-at-4% background with 1.5px cobalt-at-20% border, 14px radius. The primary content card.

**Tag pill** (`{components.tag-pill}`) — Fully rounded cobalt-at-8% pill with cobalt text. Sits in the top-right of the slide-header.

**Eyebrow** (`{typography.h4-eyebrow}`) — Uppercase cobalt label with 0.08em tracking. Sits in the top-left of the slide-header.

**CTA button** (`{components.cta-button}`) — Solid cobalt pill with cream text. The system's only solid-color element. Used once per closing surface.

**Accent line** (`{components.accent-line}`) — A short 60×4 horizontal cobalt rule with 2px radius. Used above cover titles and as eyebrow separators on open-space surfaces.

**Step circle** (`{components.step-circle}`) — A 56×56 solid cobalt circle with cream Space Grotesk numeral inside. Timeline steps stay equally readable unless the source establishes their different states.

**Bar track + fill** (`{components.bar-track}` + `{components.bar-fill}`) — 28px-tall track in cobalt-at-8% with a solid cobalt fill whose width carries the data. 6px rounded corners on both.

**Insight list item** (`{components.insight-list-item}`) — A counter-numbered list using CSS counter() to render decimal-leading-zero prefixes ("01", "02") in cobalt Space Grotesk 600 / 12.5px positioned absolute left.

**Split highlight block** (`{components.split-highlight-block}`) — A cobalt-at-8% tinted block with a 4px cobalt left rule and a cite line below. Used for inline pull-quotes inside split-column layouts.

**Cover decoration** (`{components.cover-decoration}`) — A clipped diagonal cobalt-tinted panel filling the right ~35% of cover surfaces. Reads as a printed accent without enclosing the layout.

**Cover dots** (`{components.cover-dots}`) — A 3×3 grid of 6px cobalt dots at 12px gap, 25% opacity. Decorative atmosphere on open-space surfaces.

**Closing circles** (`{components.closing-circles}`) — Two concentric centered circles (500px outer, 360px inner) with 1px cobalt-at-20% borders, opacity 0.3-0.4. Atmospheric decoration on closing-class surfaces.

**Metric change chip** (`{components.metric-change-positive}` / `{components.metric-change-negative}`) — Inline directional indicator: a small arrow glyph + percentage value in `{colors.positive}` or `{colors.negative}`. No fill, no border — pure inline text color.

## Do's and Don'ts

### Do

- Apply `{colors.bg}` (cream) as the universal canvas. Every surface starts on warm cream, never pure white.
- Use `{colors.primary}` cobalt as the principal accent color across the entire deck — for eyebrows, metrics, CTAs, chart fills, step circles, and progress indicators.
- Set headlines (h1, h2, h3) in `{colors.text}` (`#111111`) near-black with -0.02em tracking. Cobalt headlines are forbidden; cobalt is for accent moments only.
- Set every h4 eyebrow in cobalt Space Grotesk weight 600 with uppercase + 0.08em tracking. The eyebrow is the universal section opener.
- Use `{components.card-tinted}` (cobalt-at-4% fill + cobalt-at-20% 1.5px border + 14px radius) as the universal content card pattern.
- Place supplied eyebrow/tag metadata at opposite header edges; never invent either to complete the rhythm.
- Set body in Inter weight 400 at 13.6-16.8px in `{colors.text-muted}` (`#6b6b6b`) with line-height 1.6. The muted gray body is what makes the system feel premium.
- Render every numerical callout (metric, stat, bar percentage, agenda number) in Space Grotesk weight 600-700 in cobalt. The cobalt numerical accent is the system's data voice.
- Use full 100px border-radius on all chrome (tag pills, CTAs, nav-buttons). The pill shape is the system's chrome signature.
- Use directional change chips (`{components.metric-change-positive}` / `{components.metric-change-negative}`) inline with no fill — green for positive, red for negative, both subdued.

### Don't

- Don't introduce a second accent color. Cobalt is the only accent — orange, teal, purple, or any additional brand color breaks the single-accent discipline.
- Don't set headlines in cobalt. Headlines are near-black; cobalt is reserved for eyebrows, metrics, CTAs, and chart fills.
- Don't use drop shadows on cards or content. The system has zero box-shadows except a single soft cobalt CTA hover.
- Don't use square corners (0px radius) anywhere. The system is built around soft rounded corners — square corners immediately read as a different aesthetic.
- Don't use opaque cobalt borders on cards. Borders are always cobalt-at-20% (`{colors.border}`). Full-opacity borders break the quiet, lifted feel.
- Don't substitute fonts. Space Grotesk + Inter is the pairing. Substituting Arial, Helvetica, Roboto, or Open Sans collapses the typographic identity.
- Don't crowd the canvas with bordered hard-edged elements. The system depends on soft tints and gentle borders; adding heavy outlines makes it feel like a different system.
- Do not manufacture an eyebrow or tag for a content slide; its real headline can anchor the header alone.
- Don't use uppercase body text. Uppercase is reserved for h4 eyebrows and the cite line under highlight blocks.
- Don't use directional chips for non-directional emphasis. The green/red change chips are reserved for actual positive/negative comparisons (e.g., "+11 pts vs. prior quarter"). They are not general accent colors.

## Stage Adaptation and Capture

Resolve the layout at 1920×1080, then let the shared runtime scale the entire stage. Narrow screens retain the composition, with letterboxing as necessary; there are no recipe-specific mobile stacks, font clamps, swipe handlers or slide transitions. An alternate reading composition is an authored artifact choice, not an automatic breakpoint.

Use the shared renderer and exporter. Inspect complete slides, long labels, dense tables, and navigation with the actual content and fonts. Meaningful data must be at its final value at capture time; no count-up or zero-to-value entrance animation may substitute for the data. Decorative motion, when retained, needs a deterministic static capture and reduced-motion treatment. Controls are real shared-runtime controls only; static callouts must not claim interactivity.

## CJK & International Content

### Role-Preserving Pairing

| Role | Candidate Chinese face | Requested weight |
|---|---|---|
| Display | Noto Sans SC | 700 |
| Body | Noto Sans SC | 400 |
| Labels | Noto Sans SC | 600 |

These are design candidates, not claims of installed assets, glyph coverage, equivalent metrics or available font styles. Select the correct language/region family for Simplified Chinese, Traditional Chinese, Japanese or Korean, and verify the actual source strings and required punctuation against the supplied font files. Localize licensed assets for reproducible output under the shared rendering contract; do not assume a successful remote CSS request means the font rendered.

### Mixed-Script Implementation

Use role-specific stacks and explicit language spans when a weight or style differs by script. A fallback family chooses glyphs, not a different weight. Keep Latin families in their original roles where desired, and set `font-synthesis: none` on the affected runs to expose missing bold or italic instead of silently fabricating it. Check full names, numbers, symbols and mixed-script baselines, not just a sample Hanzi. Retain supplied punctuation, capitalization and spacing; any copy edit that changes the lock returns to intake.

Start Chinese body leading around 1.7 and display leading around 1.1–1.2, then inspect the actual strings at stage size. Reset wide Latin tracking on CJK runs and apply case styling only where the source language and locked spelling permit it. Widen or recompose labels before making them smaller. Preserve all source qualifications when a line wraps; splitting into additional slides is preferable to squeezing the type.

### System-Specific Adaptation

A clean sans pairing keeps the original Space Grotesk/Inter division: geometric-feeling large display versus quiet supporting copy. Noto Serif would introduce a literary register and is a deliberate design change, not an equivalent corporate fallback. Retain cream, cobalt, restrained concentric circles and the 60×4 accent. Use 500 for medium subheads only when the asset supplies it. Widen bilingual agenda and metric columns and increase body size for the actual viewing distance; do not hide Chinese qualifications or invent short English labels. Align mixed-script metrics by explicit numeric columns and verify tabular-digit support rather than assuming glyph widths.

### Asset and Emphasis Limits

Inspect requested weights and styles in the actual font asset before using them. Optical size, oblique style and weight are different properties; one does not supply another. When a face lacks a needed treatment, select a verified asset or an approved alternative visual treatment while preserving the same audience-visible emphasis. Test final composed text against its background; palette tokens and font family names are not evidence of legibility.

## Iteration Guide

1. Any new slide starts on `{colors.bg}` cream ground. Don't switch the background per slide; the constant ground is the system's identity.
2. Any new content slide carries a slide-header at the top: h4 eyebrow (cobalt, uppercase, 0.08em) on the left + tag-pill on the right.
3. Any new headline uses Space Grotesk weight 600-700 in `{colors.text}` near-black with -0.02em tracking. Reach for h2 (28.8-41.6px) for primary moments.
4. Any new card uses the tinted pattern: `{colors.card-bg}` (cobalt at 4%) + 1-1.5px `{colors.border}` (cobalt at 20%) + 10-14px radius. Never use solid color fills or opaque borders.
5. Any new numerical callout (metric value, stat number, agenda number, bar percentage, step circle) is Space Grotesk weight 600-700 in `{colors.primary}` cobalt. Numbers are the accent moment.
6. Any new accent line, divider, or directional rule uses cobalt — solid for the primary rule, soft-cobalt (20% opacity) for borders.
7. Any new CTA uses the `{components.cta-button}` pattern: solid cobalt pill with cream text, 100px radius, no other CTA shape exists.
8. Any new chart bar uses `{components.bar-fill}` (solid cobalt) on `{components.bar-track}` (cobalt at 8%) with 6px radius.
9. Any new step or sequential indicator uses the `{components.step-circle}` with diminishing opacity for future steps (1.0 → 0.85 → 0.7 → 0.55).
10. If a surface feels sparse, recompose the supplied content with larger type or a more open layout; do not add metrics or claims. The system reads as elegant when populated with substance, not noise.

## Authoring Limits

- Verify Space Grotesk and Inter weights used by the composition; Inter 400 body and 500/600 supporting labels are intentional roles.
- Cobalt is the principal accent; green and red are exceptions for source-established positive/negative outcomes. Direction alone does not establish desirability: a falling cost can be beneficial.
- Multiple chart series need direct labels, position and distinct line/dash treatments under the single-accent palette. Choose another system if that cannot encode the data legibly.
- Agenda rows remain static unless they point to an actual supported destination. Charts display their final values without replaying zero-to-value animation.
- Actual outcome arrows must retain their comparison period, units and baseline. Test arrow glyphs and numeric alignment using the final font assets.
- Concentric circles of 500px and 360px are stage-space decoration. Keep them below content; crop wordless geometry intentionally rather than crowding reading columns.
