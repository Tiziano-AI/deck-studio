---
version: alpha
name: Mat
description: A warm, material-tactile presentation system inspired by a high-end product landing page. Dark forest green is the dominant environment, warmed by a low atmospheric wood-brown glow from the bottom-right corner of every dark slide. Cream type floats directly on the field; warm orange acts as the single accent. The typeface stack pairs Bricolage Grotesque (a heavy, rounded grotesque) for display with DM Sans for body and DM Mono for labels — the result reads as industrial-design portfolio meets boutique product launch, never tech demo.

colors:
  bg-dark: "#232E26"
  bg-dark-alt: "#2E3D30"
  bg-cream: "#EDE6D0"
  bg-cream-alt: "#E4DAC4"
  ink-cream: "#F0E8D2"
  ink-cream-2: "rgba(240, 232, 210, 0.58)"
  ink-cream-3: "rgba(240, 232, 210, 0.3)"
  ink-dark: "#1E2820"
  ink-dark-2: "rgba(30, 40, 32, 0.6)"
  ink-dark-3: "rgba(30, 40, 32, 0.3)"
  accent-orange: "#C07030"
  border-on-dark: "rgba(240, 232, 210, 0.12)"
  border-on-cream: "rgba(30, 40, 32, 0.14)"
  wood-glow: "#7A4E24"

color-aliases:
  c-fg: ink-cream
  c-fg-light: ink-dark
  c-bg: bg-dark
  c-bg-light: bg-cream
  c-accent: accent-orange

typography:
  display:
    fontFamily: "Bricolage Grotesque, Noto Sans SC, sans-serif"
    fontSize: 230.4px
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: -0.03em
  h1:
    fontFamily: "Bricolage Grotesque, Noto Sans SC, sans-serif"
    fontSize: 134.4px
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: -0.025em
  h2:
    fontFamily: "Bricolage Grotesque, Noto Sans SC, sans-serif"
    fontSize: 76.8px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: -0.02em
  h3:
    fontFamily: "Bricolage Grotesque, Noto Sans SC, sans-serif"
    fontSize: 46.08px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.01em
  lead:
    fontFamily: "DM Sans, Noto Sans SC, sans-serif"
    fontSize: 28.8px
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "DM Sans, Noto Sans SC, sans-serif"
    fontSize: 20.16px
    fontWeight: 400
    lineHeight: 1.65
  caption:
    fontFamily: "DM Sans, Noto Sans SC, sans-serif"
    fontSize: 15.74px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "DM Mono, monospace"
    fontSize: 13.44px
    fontWeight: 400
    letterSpacing: 0.12em
    textTransform: uppercase
  stat-value:
    fontFamily: "Bricolage Grotesque, Noto Sans SC, sans-serif"
    fontSize: 105.6px
    fontWeight: 800
    lineHeight: 1.0
    letterSpacing: -0.025em
  quote-text:
    fontFamily: "Bricolage Grotesque, Noto Sans SC, sans-serif"
    fontSize: 65.28px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.02em
  quote-mark:
    fontFamily: "Bricolage Grotesque, Noto Sans SC, sans-serif"
    fontSize: 153.6px
    fontWeight: 800
    lineHeight: 0.6

spacing:
  pad-x: 105.6px
  pad-y: 59.4px
  gap-lg: 48.6px
  gap-md: 30.24px
  gap-sm: 15.12px

canvas:
  width: 1920px
  height: 1080px

components:
  kicker:
    fontFamily: "{typography.label.fontFamily}"
    fontSize: "{typography.label.fontSize}"
    letterSpacing: 0.12em
    textTransform: uppercase
    color: "{colors.accent-orange}"
  rule:
    width: 32px
    height: 1px
    background: "{colors.accent-orange}"
  bullet-marker:
    content: "—"
    color: "{colors.accent-orange}"
    fontFamily: "{typography.label.fontFamily}"
    description: "Em-dash prefix in warm orange; emerges in mono face. The system's standard list mark; never a bullet, never a checkmark."
  info-card:
    background: "{colors.bg-cream}"
    color: "{colors.ink-dark}"
    padding: "{spacing.gap-md} calc({spacing.pad-x} * 0.8)"
    maxWidth: 537.6px
    description: "Cream inset box embedded on a dark green field. The signature material-contrast component; carries a heading and a body block, no border, no shadow."
  chrome-band:
    borderBottom: "1px solid {colors.border-on-dark}"
    paddingBottom: "{spacing.gap-sm}"
    description: "Label-pair on top of a 1px rule; suppressed on cover/quote/end slide types."
  foot-band:
    borderTop: "1px solid {colors.border-on-dark}"
    paddingTop: "{spacing.gap-sm}"
    description: "Label-pair under a 1px rule; mirrors the chrome band."
  stat-cell:
    borderRight: "1px solid {colors.border-on-dark}"
    padding: "{spacing.gap-md} {spacing.pad-x} {spacing.gap-md} 0"
    description: "A vertically-divided cell containing a large numerical value (with optional inline orange-emphasis em-span) and a one-line label. Last cell has no right border."
  bar-fill:
    width: "100%"
    background: "{colors.ink-cream-3}"
    description: "Vertical bar derived from supplied data, with readable labels. Use orange only for a meaningful supplied focus, never an invented priority."
  compare-divider:
    width: 1px
    background: "{colors.border-on-dark}"
    description: "A 1px-wide vertical column (not a border) used to split a before/after comparison; subtle, not loud."
  image-region:
    background: "rgba(240, 232, 210, 0.06)"
    border: "1px solid {colors.border-on-dark}"
    color: "{colors.ink-cream-3}"
    description: "Real supplied or authorized image in a sharp region, with suitable alt text. If no image exists, recompose; never deliver a labeled placeholder."
  atmospheric-glow:
    selector: ".slide.dark::before"
    position: "bottom-right ellipse, 55% wide × 70% tall"
    gradient: "radial-gradient(ellipse at 70% 80%, rgba(122, 78, 36, 0.28) 0%, rgba(80, 50, 20, 0.14) 40%, transparent 70%)"
    description: "The wood-brown atmospheric glow that lives on every dark slide via ::before. Non-optional on dark surfaces; defines the warmth of the system."
---

## Stage and content contract

Use the shared [Deck Studio runtime](../../../references/deck-runtime.md) on a fixed **1920×1080** stage, uniformly scaled as one composition. This recipe owns visual layout, not navigation, loading, animation, capture or export. Use the shared runtime as written; do not create an equivalent inline scaler or phone-specific internal reflow.

The role sizes and spacing below are stage coordinates. Check readability at the intended viewing size, not only against overflow. If content does not fit, recompose, split or select another system while preserving the locked meaning. Real labels, identities, quotations, metrics and their qualifications come from supplied content; empty decorative slots do not authorize new words, numbers or controls. Keep case-sensitive names and identifiers intact, even within a display-cap treatment.

## Overview

Mat is a **material-tactile presentation system** built around a single environmental premise: a deep forest-green surface warmed from the bottom-right corner by a low wood-brown glow. The atmosphere does the heavy lifting — before any content lands, the slide already feels like a workbench in afternoon light. Cream type floats directly on the green field; main copy is unboxed. The cream info-card is the deliberate panel exception. Where the system needs to break the green, it does so with a single cream inset box (the info-card) that reads as a piece of warm paper laid on the dark surface.

The typeface stack is a deliberate three-voice pairing. **Bricolage Grotesque** at weights 600, 700 and 800 is the display workhorse — heavy, rounded, with a slightly mechanical character that suits product writing without feeling tech-startup. **DM Sans** at weight 400 is the body voice, neutral enough to let the display type breathe. **DM Mono** at weight 400 handles all labels, kickers, metadata, and chrome — anything structural that needs to read as a tag rather than a sentence. Display uses the supplied mixed-case voice, while mono labels normally use tracked Latin caps. Preserve acronyms, names and case-sensitive strings in either role.

The palette is intentionally narrow. **Dark forest green** is the dominant surface (`{colors.bg-dark}`), with a slightly lighter alternate available for layered regions. **Warm cream** is the primary text color on dark and the secondary surface color when a slide flips light. **Warm orange** (`{colors.accent-orange}`) is the single accent — it appears only as small inline marks: kicker text, bullet em-dashes, the `<em>` inside a stat numeral, the opening quote glyph, the single highlighted bar in a chart. Orange is never a background and never a large headline color; it's the structural emphasis dot of the system.

Depth is minimal and atmospheric, not stacked. There are no drop shadows. There are no rounded corners on any structural element. The only depth signal is the wood-brown radial glow that sits behind every dark slide via a `::before` pseudo-element. Region separation comes from **thin 1px hairline rules** in low-opacity cream — for chrome bands, foot bands, stat cell dividers, compare panel splits, and chart baselines. Nothing about this system is loud.

**Density philosophy: medium-sparse.** Mat reads as elegant when the slide breathes — generous left and right padding (`{spacing.pad-x}` at 105.6px), one main typographic moment, and one secondary block of supporting copy. Cramming three columns of bullets onto a slide breaks the system; the warm green field needs negative space to do its atmospheric work. The exception is the stats and compare slide types, where a clean three-up or two-up arrangement of restrained cells is correct. A slide with a single headline and one paragraph of lead copy is right in this system's lane. A slide that fills 80% of its area with type is fighting the design.

**Key Characteristics:**
- Dark forest green canvas (`{colors.bg-dark}`) with a warm wood-brown radial glow (`{components.atmospheric-glow}`) anchored to the bottom-right corner of every dark slide.
- Cream main copy floats on the green field; the signature cream info-card is the deliberate inset exception.
- Bricolage display uses mixed-case prose; preserve actual acronyms and identifiers. DM Mono labels normally use tracked Latin caps.
- A single accent color, warm orange (`{colors.accent-orange}`), used only as small inline emphasis (kicker, bullet marker, inline `<em>`, quote glyph, one chart bar).
- The cream **info-card** (`{components.info-card}`) is the signature material-contrast component — a warm paper rectangle inset on the dark field.
- Bullet lists use an em-dash prefix in warm orange via DM Mono — never a dot, never a check.
- Thin 1px hairline rules in low-opacity cream are the only divider language. No heavy borders, no shadows.
- The system has one light slide variant (cream background with dark green text) used as a tonal inversion within a deck, never as the default.

## Colors

### Palette

- **Dark Forest Green** (`{colors.bg-dark}` — #232E26): The dominant environment. Default background for every slide unless a deliberate light-slide variant is chosen. The green is muted enough that cream type sits on it without vibration.
- **Slightly Lighter Green** (`{colors.bg-dark-alt}` — #2E3D30): A tonal step-up reserved for layered or recessed surfaces within a dark slide. Available but used sparingly.
- **Warm Cream** (`{colors.bg-cream}` — #EDE6D0): The light-slide background and the fill color of the info-card inset. Reads as warm paper, not white — the warmth is essential to the system's material identity.
- **Deeper Cream** (`{colors.bg-cream-alt}` — #E4DAC4): A secondary cream tone for image regions on light slides.
- **Cream Ink** (`{colors.ink-cream}` — #F0E8D2): Primary text color on every dark surface. Slightly warmer than the background cream — chosen so headlines feel like they're carved into the green rather than printed on it.
- **Cream tints** (`{colors.ink-cream-2}`, `{colors.ink-cream-3}`): Optional measured secondary ink and decorative tint. The faintest tint never carries meaningful metadata.
- **Dark Ink** (`{colors.ink-dark}` — #1E2820): Primary text color on cream surfaces (info-card body, light slide). A very dark forest green, never pure black.
- **Dark tints** (`{colors.ink-dark-2}`, `{colors.ink-dark-3}`): Optional measured secondary ink and decoration on cream; keep meaningful text readable.
- **Warm Orange** (`{colors.accent-orange}` — #C07030): The single accent. A burnt copper-orange that nods to wood, leather, and oxidized metal. Never a background, never a large headline color.
- **Wood Glow** (`{colors.wood-glow}` — #7A4E24): The radial atmospheric glow color, applied only at 0.28 and 0.14 alpha inside the bottom-right corner gradient. Never used as a flat fill.

### Defaults

- **Default surface background**: `{colors.bg-dark}` (forest green). The system is dark-default; cream slides are an intentional tonal break, not a routine choice.
- **Default headline color on dark**: `{colors.ink-cream}`. Headlines never appear in orange.
- **Default headline color on cream**: `{colors.ink-dark}`.
- **Default body text color on dark**: `{colors.ink-cream}`. A muted variant needs actual contrast checks over the wood glow.
- **Default body text color on cream**: `{colors.ink-dark}`; use a muted variant only when still readable.
- **Default border / divider color**: `{colors.border-on-dark}` on dark; `{colors.border-on-cream}` on cream. Always 1px, never thicker.
- **Default kicker color**: `{colors.accent-orange}`. The kicker is the system's eyebrow label and is the most consistent place orange shows up.
- **Default inline emphasis color**: `{colors.accent-orange}`. An `<em>` inside a stat value, a quote attribution, or a chart label resolves to orange.
- **Default atmospheric treatment for dark slides**: the wood-brown radial glow (`{components.atmospheric-glow}`) is always on. It is part of the dark surface itself.

Orange functions as a punctuation color: it tells the eye where the structural emphasis lives without ever competing for surface area. If two orange elements end up adjacent on the same slide, one of them is wrong.

## Typography

### Font Family

Provision the three Latin faces actually used, plus the explicit CJK role faces when needed. **Bricolage Grotesque** carries every display, h1, h2, h3, stat numeral, and quote text — its rounded, heavy character at weights 600–800 is the defining voice. **DM Sans** at weight 400 carries every paragraph, lead, caption, and bullet item — neutral, readable, lets the display type lead. **DM Mono** at weight 400 carries every label, kicker, chrome tag, footer text, bullet em-dash, and chart label — anything that needs to read as a structural marker rather than prose. CJK uses provisioned sans faces by role, with real supported weights; a serif substitution is a distinct art direction.

A subtle but load-bearing rule: **the bullet em-dash before each list item renders in DM Mono in warm orange**, not in the body face. The mono shape is what makes the dash feel like a deliberate mark and not a stray punctuation glyph.

Italics are not used for typographic decoration in this system. The `<em>` tag is repurposed as an **orange inline emphasis** — `<em>` inside a stat value or a quote attribution switches to `{colors.accent-orange}` and stays upright (font-style: normal). There is no italicized face anywhere.

### Type Scale

| Token | Size | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.display}` | 230.4px | Bricolage Grotesque | 800 | Cover or opening hero display — massive, line-broken into 1–2 words per line |
| `{typography.h1}` | 134.4px | Bricolage Grotesque | 800 | Chapter-opening or closing headline |
| `{typography.h2}` | 76.8px | Bricolage Grotesque | 700 | Primary content-slide headline |
| `{typography.stat-value}` | 105.6px | Bricolage Grotesque | 800 | Large numerical figure inside a stat cell |
| `{typography.quote-mark}` | 153.6px | Bricolage Grotesque | 800 | Decorative opening quotation glyph in warm orange |
| `{typography.quote-text}` | 65.28px | Bricolage Grotesque | 600 | Pull-quote body text |
| `{typography.h3}` | 46.08px | Bricolage Grotesque | 600 | Sub-headline or region heading |
| `{typography.lead}` | 28.8px | DM Sans | 400 | Lead paragraph or large bullet item |
| `{typography.body}` | 20.16px | DM Sans | 400 | Body paragraph and info-card body |
| `{typography.caption}` | 15.74px | DM Sans | 400 | Image caption, tagline, fine print |
| `{typography.label}` | 13.44px | DM Mono | 400 | Kicker, chrome tag, footer label, metadata, chart label |

### Defaults

- **Default primary section headline**: `{typography.h2}` (76.8px).
- **Default opening or cover display**: `{typography.display}` (230.4px) on a cover; `{typography.h1}` (134.4px) on a chapter or closing moment.
- **Default body paragraph size**: `{typography.body}` (20.16px). Reach for `{typography.lead}` (28.8px) when the paragraph is the single supporting block under a large headline.
- **Default label / kicker size**: `{typography.label}` (13.44px).
- **Default weight by display role**: 600 (h3, quote), 700 (h2), 800 (display, h1, stat-value).
- **Default weight for body**: 400.
- **Default headline letter-spacing**: negative — display at -0.03em, h1 at -0.025em, h2 at -0.02em. The negative tracking is essential.

When unsure, default to `{typography.h2}` for the primary text moment paired with one `{typography.lead}` paragraph as supporting copy — that pairing is the system's most reliable rhythm.

### Signature Treatments

These treatments are **non-optional whenever the corresponding element type is used**:

- **Display prose keeps the mixed-case voice.** Preserve source acronyms, names and case-sensitive identifiers rather than recasing them.
- **DM Mono chrome normally uses tracked Latin caps at 0.12em.** Retain case-sensitive source strings and apply the CJK role treatment to Han runs.
- **The kicker is always warm orange.** When a slide carries a kicker (eyebrow label above a headline), its color is `{colors.accent-orange}` regardless of surface.
- **Bullet lists use an em-dash prefix in DM Mono colored warm orange.** Never a dot, never a check, never a numeral.
- **The `<em>` tag inside a stat numeral renders in warm orange and stays upright.** It is the mechanism for highlighting a unit suffix or a key digit inside a number.
- **Headlines on dark surfaces are cream; headlines on cream surfaces are dark ink.** Headlines are never orange.
- **All Bricolage display type uses negative letter-spacing.** Default tracking on display reads as untreated; the negative is what gives the type its compressed, premium-product character.

### Typography Principles

The rhythm of the system is **heavy mixed-case display + light mixed-case body + small uppercase mono label**. Switching any of those three modes (e.g., uppercasing the display, or making the body the same weight as the display) breaks the editorial register. Bricolage at 600–800 sits next to DM Sans at 400 — the weight gap is deliberate and wide. Do not use intermediate Bricolage weights (400, 500) for display moments; they read as undecided.

Italics are not used. Underline is not used. The only emphasis mechanism inside body copy is the orange `<em>` inline. The only structural emphasis is the kicker and the bullet em-dash.

## Layout

### Canvas System
Each slide is a fixed 1920×1080 composition using the [shared runtime](../../../references/deck-runtime.md). Use 105.6px side and 59.4px vertical padding. Cover, quote and ending layouts are chromeless. Other layouts can carry the thin content frame with real labels; the cream info-card is the intentional inset exception.

### Padding and Gap Scale

| Token | Value | Use |
|---|---|---|
| `{spacing.pad-x}` | 105.6px | Slide horizontal padding; the breathing room on left and right edges |
| `{spacing.pad-y}` | 59.4px | Slide vertical padding |
| `{spacing.gap-lg}` | 48.6px | Between major content sections |
| `{spacing.gap-md}` | 30.24px | Between related elements (headline → lead, stat → label) |
| `{spacing.gap-sm}` | 15.12px | Between tightly related elements (label pair in chrome band) |

The horizontal padding is generous — content occupies roughly the middle 89% of the stage. Pushing content closer to the edges breaks the system's editorial spaciousness.

### Chrome Frame

Most slide types carry a **chrome band** (`{components.chrome-band}`) at the top and a **foot band** (`{components.foot-band}`) at the bottom. Each is a `flex space-between` row of two DM Mono labels (typically a section name on the left and a slide-position or section number on the right) separated from the body by a 1px hairline rule. Cover, quote, and end-style slides suppress both bands entirely — those moments are chromeless by convention.

## Depth and Elevation

### Atmospheric Glow (Primary Depth Mechanism)

The system's only depth treatment is the **bottom-right wood-brown radial glow** that lives on every dark slide via `::before`. The pseudo-element occupies 55% width × 70% height anchored to the bottom-right corner, with a radial gradient from `rgba(122,78,36,0.28)` to `rgba(80,50,20,0.14)` to transparent. The glow sits at `z-index: 0`; all slide content sits at `z-index: 1`. This is the depth — there are no drop shadows, no elevation cards, no glow effects on text.

### Hairline Rules (Structural Separation)

Where the system needs to separate regions, it uses **1px hairline rules in low-opacity cream** (`{colors.border-on-dark}` at 12% opacity) on dark surfaces, or low-opacity dark ink (`{colors.border-on-cream}` at 14% opacity) on cream. These rules appear under chrome bands, above foot bands, between stat cells, between compare panels, and as the chart baseline. Hairlines never go thicker than 1px, never colored.

### No Shadows

There are no `box-shadow` declarations on any structural element. The info-card sits on the dark field with no shadow — its material contrast is the cream-on-green tonal jump, not elevation. Adding a shadow to any component breaks the system's flat material-photography aesthetic.

## Shapes and Treatment

### Border Radius

| Value | Use |
|---|---|
| 0px | Every structural element — info-card, image regions, stat cells, compare panels, bars |
| 50% | Nav-dot circles only |

The system has **no rounded corners** on any composed content. Cards, panels, and image frames are all strict rectangles. The only round shapes are the navigation UI dots.

### Border Weights

- **1px solid hairline** — the universal structural border. Used for chrome bands, foot bands, stat cell dividers, compare panel splits, chart baselines, and image region outlines. Color is `{colors.border-on-dark}` on dark surfaces and `{colors.border-on-cream}` on cream.
- No other border weights exist. A 2px border breaks the system; a 3px border belongs to a different design family.

### Decorative Element Types

**Kicker** — A small DM Mono uppercase tag in warm orange with 0.12em positive tracking, placed above a headline as an eyebrow label. The most consistent appearance of orange in the system. Typically 13.44px size.

**Rule** — A 32px-wide × 1px-tall horizontal accent line in warm orange. Used as a small underline-style separator between a kicker and a headline, or beneath a chapter number. Decorative, not structural.

**Bullet em-dash** — The list marker for every bullet list. Renders as `—` in DM Mono colored warm orange, prepended to the list item via the marker column of a CSS grid (`grid-template-columns: 1.4em 1fr`). The bullet voice of the system.

**Info-card** — A cream inset rectangle (`{components.info-card}`) placed on a dark slide. Carries a heading (h3-scale, dark ink) and a body block (body-scale, muted dark ink). The single most distinctive component in the system — used to puncture the green field with a piece of warm paper. Has no border, no shadow, no rounded corners; the tonal jump alone defines the edge.

**Stat cell** — A vertically-divided cell containing a large numerical value (`{typography.stat-value}`) above a one-line label (`{typography.body}` in muted cream). Cells line up in groups of three with a 1px right border separating each (last cell has no right border). An orange span can emphasize a meaningful supplied metric component, but the full number, unit, denominator, time basis and qualification remain together.

**Quote mark** — An oversized opening quotation glyph at `{typography.quote-mark}` size in warm orange. Sits above the quote text as a typographic ornament. Used only inside the quote slide type.

**Compare divider** — A 1px-wide vertical CSS column (not a border) between two side-by-side panels. Subtle by design — the contrast between the two panels does the visual work, not the divider.

**Image region** — A real supplied or authorized image in a sharp hairline frame when the composition needs media. No visible placeholder label belongs in an accepted slide; recompose without the region if no image exists.

## Do's and Don'ts

### Do
- Use the dark forest green (`{colors.bg-dark}`) as your default slide background. The system is dark-first; cream slides are a tonal break, not the default.
- Apply the wood-brown atmospheric glow to every dark slide. It is part of the surface, not an optional flourish.
- Pair Bricolage Grotesque display in mixed case with DM Mono labels in uppercase. The case contrast between the two faces is the system's typographic rhythm.
- Set headlines in cream (`{colors.ink-cream}`) on dark and dark ink (`{colors.ink-dark}`) on cream. Headlines never carry the orange accent.
- Use warm orange (`{colors.accent-orange}`) as the kicker color, the bullet em-dash color, and the inline `<em>` color. Orange is the punctuation, never the surface.
- Use the cream info-card (`{components.info-card}`) when a slide needs a piece of warm paper inset on the green field — the system's signature material-contrast move.
- Keep slides medium-sparse. One primary headline, one supporting paragraph, optionally one list of 3–5 short bullets is the right density.
- Use 1px hairline rules in low-opacity cream or dark ink for every structural divider. Borders never go thicker.
- Use the em-dash prefix in DM Mono for every bullet list. Never substitute a dot, check, or numeral.
- Render the `<em>` inside a numerical value in warm orange, font-style normal — that's how unit suffixes and emphasis digits read in this system.

### Don't
- Don't recase source acronyms or identifiers to enforce the visual system; use mixed case for ordinary display prose.
- Don't introduce a second accent color. The system has one accent (warm orange) and it cannot share that role.
- Don't add drop shadows, blur shadows, or elevation effects on any component. Depth is the atmospheric glow only.
- Don't round any corner on a structural element. Cards, panels, image frames, bars — all strict rectangles. Navigation geometry belongs to the shared runtime.
- Don't fill a slide with three columns of bullets or stack five regions vertically. Mat reads as broken when crowded.
- Don't use orange as a background fill. Orange is inline-only.
- Don't use a serif face anywhere. There is no serif in this system; the rounded grotesque carries every editorial moment.
- Don't add a border around the info-card. The tonal jump between cream and forest green defines the edge — a border breaks the flat material reading.
- Don't use italic letterforms. The `<em>` tag is repurposed as an orange inline color switch and stays upright.
- Don't increase border weights above 1px. A 2px border breaks the hairline language of the system.

## Stage adaptation and delivery

All internal geometry stays on the 1920×1080 stage. The shared runtime scales the entire slide uniformly, including type, borders and ornaments; smaller screens may letterbox and do not rearrange columns. Test the real title, densest content, navigation and legibility at the intended viewing sizes. Capture, PDF, reduced motion and audience controls follow the [shared runtime contract](../../../references/deck-runtime.md) and Deck Studio's production workflow. This recipe defines no alternate print or presentation path.

## CJK & International Content

### Role map and visual choice

| Role | Latin face | CJK adaptation candidate |
|---|---|---|
| Display / headings | Bricolage Grotesque 800 / 700 / 600 | Noto Sans CJK at real supported 800 / 700 / 600 weights |
| Body / captions | DM Sans 400 | Noto Sans CJK 400 |
| Chrome / bullets | DM Mono 400 | A provisioned CJK mono face at a supported weight, or CJK sans in the same editorial label grid |

### Composition and mixed-script treatment

Mat is a sans-led material system. Keep that role relationship for CJK rather than replacing every face with a serif and claiming the same identity. A serif variant is a separate visual choice, not the default adaptation. Preserve the heavy mixed-case Latin hero, cream inset, dark forest field, bottom-right wood glow and orange em-dash markers. Assign script roles explicitly when their weight or style differs. Han runs use zero tracking and no case transform; Latin names, acronyms and case-sensitive identifiers retain their source form. Start Han display leading around 1.05–1.2 and body around 1.55–1.75, then inspect actual glyph bounds against the cream inset and glow.

### Font provision and script handling

These are candidates, not bundled assets or guaranteed substitutes. Before rendering, provision the exact local font files, weights and styles actually used; record the selected faces and verify the deck's actual glyph inventory, including rare names, punctuation, numerals and locale-specific forms. Do not claim a network font URL, a fallback family name or a browser's synthetic weight proves the intended face loaded. Set `font-synthesis: none`; use explicit script/role classes when weight, style or family differs. A single fallback stack is sufficient only when the same requested face properties are genuinely supported for both scripts.

Keep punctuation, casing, names, metrics and the locked words intact. Apply locale-aware line-breaking and spacing through layout; do not automatically strip terminal punctuation, insert words, translate labels or normalize identifiers. Keep punctuation with the phrase it belongs to and numbers with units. Han tracking starts at zero; Latin tracking remains role-specific. Verify representative full-width punctuation and mixed Latin/Han lines at actual stage size. Do not change claims or numbers merely for fit. If a semantic revision is needed, reopen that part of the semantic source within the mandate and carry the change through the artifact; it is not a visual-only or localization adjustment. Ask only before changing explicitly user-locked meaning or exceeding authority; keep that discussion outside the slide frame.

### System-specific checks

Check the longest 28.8px lede, compact 537.6px-wide info-card, real quote and axes over the brightest glow area. Meaningful captions must use readable ink even when the original hierarchy suggests a pale tint. The orange accent may mark an actual supplied focus; it must not imply a newly invented priority or detach a figure from its unit.

## Iteration Guide

1. Any new component sits on the dark surface as cream text; no card, panel, or frame wraps it unless it's the info-card move (cream-on-green tonal contrast).
2. Any new headline uses Bricolage Grotesque in mixed case, weight 600 (h3/quote), 700 (h2) or 800 (display/h1). Never reach for weight 500 on display.
3. Any new structural divider is a 1px hairline rule in low-opacity cream or dark ink. Never use a thicker or colored border.
4. New labels use DM Mono with tracked Latin caps where appropriate; retain case-sensitive source strings and untracked CJK roles.
5. Any new bullet list uses the em-dash prefix in DM Mono colored warm orange. The marker face and color are non-negotiable.
6. Any new accent moment (a highlighted number, an emphasis word, a kicker) uses warm orange. Don't introduce a second accent.
7. Any new dark slide carries the atmospheric glow on `::before`. If you make a custom slide layout, replicate the pseudo-element or the slide will read flat.
8. If a slide needs a piece of warm paper to anchor it (a CTA, a summary, an attribution block), use the info-card. Don't invent a parallel card pattern.
9. Tonal break slides (cream backgrounds) are used once per deck for emphasis, not as a routine alternative to dark. The system reads as dark-default.

## Production watchpoints

Check text over the brightest wood-glow region as well as the dark corner. The cream info-card must fit its real body copy at readable size. Use a real image or recompose without an image reservation. A highlighted bar or orange figure fragment requires meaningful content emphasis, with complete metric context preserved.

This document is a recipe, not evidence that a deck was rendered or accepted. Inspect the actual output, keep validation enabled, and record rendered/visual/PDF acceptance through the shared Deck Studio workflow.
