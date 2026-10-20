---
version: alpha
name: Long Table
description: A warm, single-ink editorial system in the register of a supper-club poster, a small-batch zine, or a Risograph-printed program. The entire system runs in one ink color — a warm rust terracotta (#B53D2A) — on a buttery cream paper ground (#FAF1E2), with a subtle 4px radial-dot texture overlay giving the surface its "printed paper" quality. Display type runs in Bricolage Grotesque at weight 700–800 in uppercase; body and metadata run in Fraunces serif at weight 400–600 with optical-size axis engaged. Pill tags and genuine links, outlined edition badges, italic-edition numerals, and dashed/solid 1.5px borders complete the printed-program vocabulary.

colors:
  paper: "#FAF1E2"
  paper-d: "#F2E5CF"
  paper-vd: "#E8D7B6"
  ink: "#B53D2A"
  ink-dp: "#8E2D1F"
  rule: "#B53D2A"
  ink-32: "rgba(181, 61, 42, 0.32)"
  ink-78: "rgba(181, 61, 42, 0.78)"
  ink-50: "rgba(181, 61, 42, 0.5)"

color-aliases:
  rule: ink
  ink-32-canonical: "Same ink #B53D2A at 32% opacity, used for dashed dividers and subtle internal rules"
  ink-78-canonical: "Same ink #B53D2A at 78% opacity, used for de-emphasized metadata"

typography:
  display-jumbo-numeral:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: "410.4px"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: -0.02em
    fontStyle: italic
  display-cover:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "162px"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: -0.012em
    textTransform: uppercase
  display:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "140.4px"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: -0.012em
    textTransform: uppercase
  headline-xl:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "113.4px"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: -0.012em
    textTransform: uppercase
  headline:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "108px"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: -0.012em
    textTransform: uppercase
  headline-md:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "90.72px"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: -0.012em
    textTransform: uppercase
  quote:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "79.92px"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: -0.012em
    textTransform: uppercase
  card-title:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "44px"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: -0.008em
    textTransform: uppercase
  course-name:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.005em
    textTransform: uppercase
  info-value:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.005em
    textTransform: uppercase
  edition-label-tracked:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "18px"
    fontWeight: 700
    letterSpacing: 0.18em
    textTransform: uppercase
  who-tag:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "18px"
    fontWeight: 700
    letterSpacing: -0.005em
    textTransform: uppercase
  body-serif-italic-lg:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.45
    fontStyle: italic
  body-serif-italic:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.5
    fontStyle: italic
  body-roman:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.45
  edition-label:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: "30px"
    fontWeight: 400
    lineHeight: 1
    fontStyle: italic
  tagline:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: "26px"
    fontWeight: 400
    lineHeight: 1.35
    fontStyle: italic
  stats:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.4
    fontStyle: italic
  pill-text:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1
    fontStyle: italic
  meta-tag:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.4
    fontStyle: italic
  info-key:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: "16px"
    fontWeight: 400
    letterSpacing: 0.16em
    textTransform: uppercase
    fontStyle: normal
  pagenum:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: "16px"
    fontWeight: 400
    letterSpacing: 0.02em
    fontStyle: italic

spacing:
  slide-pad-h-default: "96px"
  slide-pad-h-wide: "134.4px"
  slide-pad-h-narrow: "230.4px"
  slide-pad-top-default: "108px"
  slide-pad-top-cover: "64.8px"
  slide-pad-bottom-default: "118.8px"
  slide-pad-bottom-wide: "151.2px"
  gap-section: "32.4px"
  gap-content: "21.6px"
  gap-row: "17.28px"
  gap-tight: "12.96px"
  border-weight: "1.5px"
  rule-dashed-color: "{colors.ink-32}"

canvas:
  width: 1920px
  height: 1080px

components:
  pill:
    description: "Outlined rounded-rectangle (border-radius 999px → fully pill) holding short italic Fraunces text. A noninteractive label by default; only a genuine authorized destination makes it a link. Border is 1.5px solid {colors.ink}; padding is generous (~12px / 28px); text-color is {colors.ink}."
    border: "1.5px solid {colors.ink}"
    borderRadius: "999px"
    padding: "10.8px 32px"
    typography: "{typography.pill-text}"
  pill-divider:
    typography: "{typography.pill-text}"
    opacity: 0.7
    description: "A small italic Fraunces divider character (typically · or /) used inline between adjacent pills."
  ed-badge:
    description: "A small circular outlined badge (~38px) holding a single italic Fraunces digit. The edition / chapter ordinal marker. Border is 1.5px solid {colors.ink}; background is transparent."
    width: "44px"
    height: "44px"
    border: "1.5px solid {colors.ink}"
    borderRadius: "50%"
  rect-tag:
    description: "Outlined rectangular tag — like the pill but with sharp corners. Holds short italic Fraunces text. Used as a category / status / metadata chip when the pill's roundness isn't appropriate."
    border: "1.5px solid {colors.ink}"
    padding: "9.72px 22px"
    typography: "{typography.pill-text}"
  card-outlined:
    description: "A 1.5px ink-outlined rectangular content card. Holds a card-top metadata row (separated below by a 1px @ 32%-opacity rule), a Bricolage card-name, a Fraunces body description, and a meta-row at the bottom (separated above by a 1px dashed @ 32%-opacity rule). The system's primary content card pattern."
    border: "1.5px solid {colors.ink}"
    padding: "21.6px 30px"
    internalDivider-solid: "1px solid {colors.ink-32}"
    internalDivider-dashed: "1px dashed {colors.ink-32}"
  paper-texture:
    description: "Subtle radial-dot texture overlay on the stage. A 4px-tile background-image of 0.5px radial-gradient dots in {colors.ink-50} at 10% opacity. Sits absolutely on the stage with pointer-events disabled, giving the paper its Risograph / printed-stock quality. This is on every slide."
    backgroundImage: "radial-gradient(circle at 1px 1px, {colors.ink-50} 0.5px, transparent 1px)"
    backgroundSize: "4px 4px"
    opacity: 0.1
  topbar-divider:
    description: "A 1.5px ink solid border-bottom under a slide topbar (where a Bricolage headline sits beside a small Fraunces label). The horizontal rule beneath the topbar is the system's universal page-divider device."
    borderBottom: "1.5px solid {colors.ink}"
  pagenum:
    position: "absolute"
    placement: "right: 69.12px; bottom: 43.2px"
    typography: "{typography.pagenum}"
    color: "{colors.ink}"
    description: "Italic Fraunces page number at the bottom-right of every slide."
  ledger-row:
    description: "A horizontal ledger-style row in a calendar/schedule context. Multi-column grid (typical: 80px / 130px / 1.6fr / 0.9fr / auto) with a 1px @ 32%-opacity ink border-bottom. Each cell is a tag, label, or pill. Reads as a guestbook / restaurant-reservation log."
    rowPad: "14.04px 0"
    borderBottom: "1px solid {colors.ink-32}"
---

## Stage and content contract

Use the shared [Deck Studio runtime](../../../references/deck-runtime.md) on a fixed **1920×1080** stage, uniformly scaled as one composition. This recipe owns visual layout, not navigation, loading, animation, capture or export. Use the shared runtime as written; do not create an equivalent inline scaler or phone-specific internal reflow.

The role sizes and spacing below are stage coordinates. Check readability at the intended viewing size, not only against overflow. If content does not fit, recompose, split or select another system while preserving the locked meaning. Real labels, identities, quotations, metrics and their qualifications come from supplied content; empty decorative slots do not authorize new words, numbers or controls. Keep case-sensitive names and identifiers intact, even within a display-cap treatment.

## Overview

Long Table is a **single-ink editorial system** in the register of a supper-club poster, a Risograph zine, or a small-press dinner program. The foundational premise is monochromatic: every visible mark in the system — every headline, every paragraph, every border, every rule, every pill, every page number — is rendered in a single warm rust terracotta ink (`{colors.ink}` — #B53D2A) on a buttery cream paper ground (`{colors.paper}` — #FAF1E2). Variation stays in the rust family, including the deeper rust when needed for readable text; the starting opacity ladder is: the same ink at 100% for primary marks, at 78% for de-emphasized metadata, at 32% for dashed internal dividers, at 10% for the paper-texture dots.

The single-ink constraint is the system's identity. The aesthetic borrows from one-color screen printing, letterpress posters, and Risograph stationery — formats where each additional color is a separate printing pass and therefore a deliberate decision. By committing to one ink, the system achieves the calm authority of a printed object rather than the polish of a digital surface.

A signature **paper-texture overlay** sits on every slide: a 4px-tile radial-dot pattern in 50%-opacity ink at 10% opacity, applied via the `.slide::before` pseudo-element. The dots should remain subtle behind the content; inspect their appearance at the intended viewing size — they give the cream surface its "printed paper" feel and are an essential part of the design system, not optional decoration.

The typographic stack is a two-face pairing:

- **Bricolage Grotesque** at weights 700 and 800 in **strict uppercase** carries every display moment — covers, headlines, card titles, course names, quote bodies, info values, who-tags. Bricolage is a wide, slightly-condensed grotesque with strong personality; its uppercase set has the impact of a hand-lettered poster. The optical-size axis (`opsz` 12..96) is engaged.
- **Fraunces** at weight 400–600 carries every body paragraph, every metadata field, every pill, every page number, every edition label. **Italic Fraunces is the default body style** — the slanted serif is the system's body voice, lending warmth and editorial personality. Roman Fraunces appears only for specific tight cases (info keys, the description body inside index cards). The optical-size axis (`opsz` 9..144) is engaged for both styles.

A massive **italic Fraunces edition numeral** at up to 480px is the system's signature display anchor — it replaces the hand-drawn illustration that would traditionally fill the cover/featured slide right-half, giving the slide a typographic centerpiece in the same ink as the rest of the page.

Depth is **flat and printed**. There are no shadows, no gradients, no blur, no glow. Elevation is communicated entirely through 1.5px solid ink borders on cards, badges, pills, and tags; 1px solid or 1px-dashed internal dividers at 32% opacity; and the texture overlay's atmospheric quality. The whole system reads as ink soaked into paper.

**Density philosophy: rich-but-curated.** Long Table reads as authoritative when slides carry substantive content — a cover with a hero title plus a tagline plus action pills plus stats plus a big edition numeral; an index slide with a topbar headline plus three rich cards; a menu slide with five course rows with name + description + pairing. The slides are full but never crowded — each region carries one focused element with breathing room around it. A slide that holds only a headline reads as missing-its-program; a slide that holds 8 competing content blocks reads as broken. Reach for one major typographic moment (Bricolage display) anchored by 2–4 supporting groups (cards, pills, ledger rows, info-value pairs) per slide.

**Key Characteristics:**
- One ink color (`{colors.ink}` — warm rust terracotta) on cream paper (`{colors.paper}`). Opacity variants are the only color variation.
- Bricolage Grotesque weight 700–800 uppercase for every display moment; Fraunces 400–600 italic-default for every body and metadata moment.
- Subtle 4px radial-dot paper texture on every slide via `.slide::before` — invisible at distance, present up close.
- Pill tags and genuine links (border-radius 999px), edition badges (circular), rect-tags (sharp-cornered), and outlined cards (1.5px solid) — all single-weight ink outlines, no fills.
- A massive italic Fraunces edition numeral (up to 480px) is the system's hero typographic anchor on cover-class slides.
- 1.5px structural borders, 1px @ 32%-opacity solid or dashed internal dividers. No thicker borders, no shadows.
- An actual page ordinal may sit at bottom-right in italic Fraunces; audience navigation belongs to the shared runtime.
- The system is single-ink by design — adding any second color (a navy, a green, a yellow) shatters the printed-program register.

## Colors

### Palette
- **Paper / Cream** (`{colors.paper}` — #FAF1E2): The dominant warm buttery cream surface. Reads as good-quality paper stock — not white, not beige, somewhere between. The default slide background, and the only background fill the system uses.
- **Paper Dark** (`{colors.paper-d}` — #F2E5CF): A slightly darker cream for secondary surfaces or tonal separation. Available in the token system but used sparingly.
- **Paper Very Dark** (`{colors.paper-vd}` — #E8D7B6): A deeper cream for accent surfaces. Reserved.
- **Ink / Warm Rust Terracotta** (`{colors.ink}` — #B53D2A): The single ink color. Every text run, every border, every rule, every pill outline, every page number — all in this one color. The system's structural and expressive color.
- **Ink Deep** (`{colors.ink-dp}` — #8E2D1F): A deeper rust reserved for emphasis. Available in the token system but used sparingly in the published slides.
- **Rule** (`{colors.rule}` — #B53D2A): An alias for `{colors.ink}` — same hex, used semantically when referring to a rule line.
- **Ink @ 78%** (`{colors.ink-78}` — rgba(181,61,42,0.78)): The ink at 78% opacity. Used for de-emphasized metadata text where slightly lower contrast is desired (e.g., pairing notes in menu rows, meta-tags under quotes).
- **Ink @ 50%** (`{colors.ink-50}` — rgba(181,61,42,0.5)): The ink at 50% opacity. Used inside the paper-texture radial-dot gradient.
- **Ink @ 32%** (`{colors.ink-32}` — rgba(181,61,42,0.32)): The ink at 32% opacity. Used for internal dividers — solid 1px lines and 1px dashed lines inside cards, between ledger rows, between course rows.

### Defaults
- **Default slide background**: `{colors.paper}`. Every slide. There is no alternate surface in this system.
- **Default text color**: `{colors.ink}`. Every text run.
- **Default border color**: `{colors.ink}` at 1.5px solid for structural borders; `{colors.ink-32}` at 1px solid or dashed for internal dividers.
- **Default headline color**: `{colors.ink}`.
- **Default body color**: `{colors.ink}`.
- **Default page ordinal color**: full rust ink. Do not add a recipe-specific navigation hint.
- **Default metadata color**: full rust ink; `{colors.ink-78}` may recede only after actual readability checks, and deeper rust is available for stronger contrast.

The palette is intentionally single-ink. There is no "accent color" to reach for — the design language depends on the one-ink constraint. If a moment needs to stand out, scale up the type (Bricolage 800 at 180px) or reach for the italic Fraunces edition numeral; do not introduce a second color.

## Typography

### Font Family
Provision the two Latin fonts with the real weights and styles used by the recipe; inspect the selected files' optical-size support:

- **Bricolage Grotesque** with `opsz` 12..96 and weights 400, 600, 700, 800. **In the published slides, only 700 and 800 are used.**
- **Fraunces** with `opsz` 9..144, both roman and italic styles, weights 400, 500, 600. **In the published slides, all three weights of italic and weight 400/600 of roman are used.**

The two-face role split is deliberate: **Bricolage carries display moments** (covers, headlines, card titles, course names, quote bodies, info values, who-tags, edition labels with tracking), usually uppercase while preserving source casing where meaningful. **Fraunces italic starts the body and metadata roles** (paragraphs, leads, metadata, taglines, pills, page numbers, edition labels without tracking). **Fraunces roman** serves info keys, index-card descriptions and longer reading passages that need a calmer setting.

Use the actual Bricolage/Fraunces optical-size axes where supported. Inspect metadata and jumbo glyphs independently; a static or fallback face cannot be assumed to have the same size-dependent behavior. Provision Fraunces 400 regular/italic and any actual 500/600 emphasis used, not dormant weights.

### Display, Body, and Chrome Scale

The table lists expressive upper limits. The YAML gives fixed-stage starting sizes: jumbo numeral 410.4px, cover 162px, section display 140.4px, featured headline 113.4px, headline 108px, medium headline 90.72px and quote 79.92px. Increase toward a listed limit only when the actual composition has room; these are not viewport formulas.

| Token | Size | Family | Weight / Style | Use |
|---|---|---|---|---|
| `{typography.display-jumbo-numeral}` | up to 480px | Fraunces | 400 italic | Hero edition numeral (cover-class typographic anchor) |
| `{typography.display-cover}` | up to 180px | Bricolage | 800 uppercase | Cover-scale Bricolage title |
| `{typography.display}` | up to 160px | Bricolage | 800 uppercase | Section-opener / manifesto headline |
| `{typography.headline-xl}` | up to 140px | Bricolage | 800 uppercase | Featured-edition title |
| `{typography.headline}` | up to 120px | Bricolage | 800 uppercase | Topbar headline on index / calendar slides |
| `{typography.headline-md}` | up to 100px | Bricolage | 800 uppercase | Menu / programme title |
| `{typography.quote}` | up to 96px | Bricolage | 700 uppercase | Pull-quote / testimonial body |
| `{typography.card-title}` | up to 44px | Bricolage | 800 uppercase | Title inside an outlined card |
| `{typography.course-name}` | up to 28px | Bricolage | 700 uppercase | Course / item name in a ledger row |
| `{typography.info-value}` | up to 28px | Bricolage | 700 uppercase | Value in a key/value info row |
| `{typography.edition-label-tracked}` | up to 18px | Bricolage | 700 uppercase / 0.18em | Big-edition label beneath a hero numeral |
| `{typography.who-tag}` | up to 18px | Bricolage | 700 uppercase | Attribution name in a quote row |
| `{typography.body-serif-italic-lg}` | up to 28px | Fraunces | 400 italic | Lead paragraph in a manifesto / letter |
| `{typography.body-serif-italic}` | up to 22px | Fraunces | 400 italic | Standard body paragraph / lede |
| `{typography.body-roman}` | up to 17px | Fraunces | 400 roman | Card description body (tighter setting for legibility at small size) |
| `{typography.edition-label}` | up to 30px | Fraunces | 400 italic | "EDITION N." italic label beside an edition badge |
| `{typography.tagline}` | up to 26px | Fraunces | 400 italic | Tagline / subtitle beneath a cover title |
| `{typography.stats}` | up to 22px | Fraunces | 400 italic | Stats line ("N seats · M cities · L hours") |
| `{typography.pill-text}` | up to 20px | Fraunces | 400 italic | Text inside a pill tag or rect-tag |
| `{typography.meta-tag}` | up to 16px | Fraunces | 400 italic | Card metadata (city tag, num tag, seats tag, date tag) |
| `{typography.info-key}` | up to 16px | Fraunces | 400 roman / 0.16em / UPPER | Key in a key/value info row |
| `{typography.pagenum}` | up to 16px | Fraunces | 400 italic | Page number at the bottom-right of every slide |

### Defaults
- **Default size for a primary slide headline**: `{typography.headline}` (108px) in Bricolage 800 uppercase, subject to source-casing preservation.
- **Default size for a cover-scale title**: `{typography.display-cover}` (162px).
- **Default size for the hero typographic anchor on cover-class slides**: `{typography.display-jumbo-numeral}` (italic Fraunces 410.4px) — the system's signature hero element.
- **Default size for a body paragraph**: `{typography.body-serif-italic}` (up to 22px) in italic Fraunces.
- **Default size for a lede paragraph**: `{typography.body-serif-italic-lg}` (up to 28px).
- **Default size for body text inside a card**: `{typography.body-roman}` (up to 17px) in **roman** Fraunces — the roman is more readable at small sizes than italic.
- **Default size for an "EDITION N." label**: `{typography.edition-label}` (up to 30px) in italic Fraunces, paired with an `{components.ed-badge}` circular ordinal.
- **Default weight for any Bricolage display moment**: 800. (Weight 700 is reserved for the quote body and course/who-tag elements; weight 800 is the primary display weight.)
- **Default weight for any Fraunces body moment**: 400.

When unsure, reach for `{typography.headline}` (108px) for a routine slide headline. Start featured-edition titles at 113.4px, covers at 162px and section openers at 140.4px; the table's larger limits are available when the composition supports them. Use the jumbo edition numeral only for a real supplied edition in a cover-class moment.

### Signature Treatments
These treatments are **non-optional whenever the corresponding element type is used**:

- **Every Bricolage display element is UPPERCASE with negative letter-spacing (-0.005em to -0.012em).** A sentence-case Bricolage headline does not exist in this system. The uppercase + negative-tracking + weight 800 combination is the system's display voice.
- **Every Fraunces body element is italic by default.** Roman Fraunces appears only for specific tight cases (info-key in info-rows, body inside index cards). When in doubt, italic.
- **Edition badges require a real edition/chapter.** Keep the genuine label and ordinal together. Omit the badge when the source has no edition; do not invent one.
- **Every card / pill / rect-tag / badge carries a 1.5px solid ink border with no fill.** The single-weight outlined-shape vocabulary is the system's structural language. Filled shapes do not exist.
- **The paper-texture overlay (`{components.paper-texture}`) is on every slide.** Removing it (or running the system on a pure flat cream without texture) loses the printed-paper quality.
- **Every slide carries the page-number marker** at bottom-right in italic Fraunces. The page-number is the system's spine — without it, slides feel unanchored.
- **Internal dividers inside cards alternate between 1px solid @ 32% opacity (above content) and 1px dashed @ 32% opacity (below content).** The solid/dashed pairing is the system's card-rhythm device.

### Typography Principles
The Bricolage voice uses 800 display, with explicit 700 roles for quote/course/attribution. Keep its tight tracking and display-cap treatment while preserving case-sensitive source strings. Fraunces defaults to real 400 italic for body and metadata; roman serves info keys, card reading copy and longer passages when required for readability. Real 500/600 emphasis is permitted only where specified.

Underline is not used. Bold within body paragraphs uses Fraunces weight 600 (not 700/800). Color emphasis does not exist because there is only one color. The system's only emphasis mechanisms are: scale (bigger Bricolage), weight shift inside body (Fraunces 400 → 600), italic ↔ roman switch, and opacity (full → 78%).

## Layout

### Canvas System
Each slide is a fixed 1920×1080 composition using the [shared runtime](../../../references/deck-runtime.md). Lay out the rust-on-paper content inside the fixed padding ladder. The paper-dot texture belongs behind content on each slide. Real event/edition metadata may form the top and bottom bands; absent metadata leaves space.

### Fixed-Stage Padding Scale
| Token | Range | Use |
|---|---|---|
| `{spacing.slide-pad-h-default}` | 96px | Default horizontal slide padding |
| `{spacing.slide-pad-h-wide}` | 134.4px | Wider horizontal padding for featured / calendar slides |
| `{spacing.slide-pad-h-narrow}` | 230.4px | Narrow horizontal padding for menu / quote slides (forces content into a column) |
| `{spacing.slide-pad-top-default}` | 108px | Default top padding |
| `{spacing.slide-pad-top-cover}` | 64.8px | Cover top padding (less, to give the title room) |
| `{spacing.slide-pad-bottom-default}` | 118.8px | Default bottom padding (leaves room for page-num chrome) |
| `{spacing.slide-pad-bottom-wide}` | 151.2px | Wider bottom padding for featured / quote slides |
| `{spacing.gap-section}` | 32.4px | Between major content sections |
| `{spacing.gap-content}` | 21.6px | Between related content blocks |
| `{spacing.gap-row}` | 17.28px | Between row-level elements (course rows, ledger rows) |
| `{spacing.gap-tight}` | 12.96px | Between tightly coupled elements |

### Chrome Anatomy
An actual page ordinal can anchor the bottom-right in italic Fraunces. Use a readable stage size; the shared runtime owns navigation and its audience controls.

Slides with a topbar (index, calendar) carry a Bricolage headline on the left + a small italic Fraunces label-tag on the right, separated below by a 1.5px solid ink horizontal rule. The topbar-divider is the system's universal page-divider device.

### Border-Radius
- **999px** — pill tags and genuine links (fully pill-shaped)
- **50%** — circular edition badges
- **0** — every other shape (cards, rect-tags, info-cards, ledger rows, internal dividers)

The system uses sharp corners for content containers and pill/circle for action and ordinal markers. No medium border-radius values (4px, 8px, 12px) exist.

## Depth and Elevation

### Flat, No Shadows
The system uses **zero shadows**. No box-shadow, no text-shadow, no filter, no gradient. Elevation is communicated entirely through:

1. **1.5px solid ink borders** on cards, pills, badges, rect-tags — the outlined-shape vocabulary is the system's structural depth.
2. **1px solid or dashed internal dividers at 32% opacity** inside cards and between rows — the subtle horizontal lines give cards their internal rhythm.
3. **The paper-texture overlay** at 10% opacity on every slide — the dotted texture sits atmospherically beneath all content, giving the page its print-stock quality.
4. **Opacity layering on text** — primary at 100%, de-emphasized metadata at 78%, near-invisible dividers at 32%.

The absence of shadow is itself the depth language. Adding `box-shadow: 0 4px 12px rgba(0,0,0,0.1)` shatters the printed-paper feel.

### Paper Texture as Atmospheric Depth
The radial-dot texture on `.slide::before` is part of the depth system — it is not optional decoration. The texture gives the cream surface a quality that flat #FAF1E2 lacks: a sense that the surface is paper stock with grain, not a CSS background fill. The 4px tile size with 0.5px radial dots in 50%-opacity ink at 10% overall opacity is a starting texture treatment; inspect it at actual viewing scale, keeping it behind all text.

## Shapes and Treatment

### Border Weight and Style
- **1.5px solid `{colors.ink}`** — the universal structural border. Cards, pills, edition badges, rect-tags, topbar dividers, who-row top borders, info-card outlines.
- **1px solid `{colors.ink-32}`** — internal solid dividers inside cards (between card-top metadata and the card title), between ledger rows, between course rows.
- **1px dashed `{colors.ink-32}`** — internal dashed dividers inside cards (between the card body and the meta-row at the bottom), between info-rows in info-cards.

Borders are never thicker than 1.5px. Never colored beyond ink (full or 32%). Never dotted (dotted is reserved for the paper-texture pattern). The solid/dashed pairing inside cards is the system's signature rhythm device.

### Decorative Element Types

**Paper Texture Overlay** (`{components.paper-texture}`) — A 4px-tile radial-dot pattern in 50%-opacity ink at 10% overall opacity on `.slide::before`. The system's atmospheric base; on every slide.

**Pill Tag / Link** (`{components.pill}`) — An outlined 999px capsule carrying a genuine supplied label in italic Fraunces. A real authorized destination may use link semantics, focus and interaction. Without a destination it is a noninteractive tag, never a fake button.

**Pill Divider** (`{components.pill-divider}`) — A small italic Fraunces character (typically `·` or `/`) at 70% opacity placed between pills in a row.

**Edition Badge** (`{components.ed-badge}`) — A ~38px circular outlined badge holding a single italic Fraunces digit. The system's edition / chapter ordinal marker; paired with the genuine edition/chapter label and actual ordinal, when that content exists.

**Rect Tag** (`{components.rect-tag}`) — An outlined sharp-cornered rectangular tag holding short italic Fraunces text. The sharp-cornered cousin of the pill; used where roundness isn't appropriate.

**Outlined Card** (`{components.card-outlined}`) — A 1.5px ink-outlined rectangular card. Holds a card-top metadata row (separated below by a 1px @ 32% solid divider), a Bricolage card title, a Fraunces body description, and a meta-row at the bottom (separated above by a 1px @ 32% dashed divider). The system's primary content card.

**Topbar with Divider** — A Bricolage headline on the left + a small italic Fraunces label-tag on the right, separated below by a 1.5px solid ink horizontal rule. The system's universal section opener.

**Info-Card** — A wider outlined card with internal info-rows (key / value pairs separated by 1px @ 32% dashed dividers). Used as a featured-edition supporting panel.

**Ledger Row** (`{components.ledger-row}`) — A multi-column grid row with a 1px @ 32% solid border-bottom. Holds tags, labels, and pills aligned in columns. The system's calendar / schedule / index pattern.

**Course Row** — A 64px / 1fr / auto grid row with a 1px @ 32% solid border-bottom. Holds a Fraunces num-tag, an item (Bricolage name + Fraunces description), and a Fraunces pairing tag. The menu / programme pattern.

**Italic Jumbo Edition Numeral** — A massive italic Fraunces digit at up to 480px. The system's signature hero typographic anchor on cover-class slides, paired with a small tracked Bricolage label beneath and an italic Fraunces meta line.

**Page Number** (`{components.pagenum}`) — Italic Fraunces at the bottom-right of every slide.


## Do's and Don'ts

### Do
- Commit to single-ink rendering. Every text, border, rule, badge, and pill is `{colors.ink}` — the warm rust terracotta. Use the same rust family for variation; meaningful metadata may use full or deeper rust when opacity reduces readability. Reserve 32%/10% for dividers/texture.
- Apply the paper-texture overlay to every slide. The 4px radial-dot pattern at 10% opacity is part of the design system, not optional polish.
- Run every Bricolage display element at weight 800 (or 700 for quote / course-name / who-tag) in strict uppercase with negative letter-spacing.
- Run every Fraunces body element in italic by default. Use roman only for info-keys (where italic tracking would feel out of place) and card body descriptions (where italic at small size is less readable).
- Use the italic Fraunces jumbo numeral only for a genuine supplied edition or metric; otherwise let the actual title anchor the cover.
- Pair an edition badge with its genuine label and ordinal; omit the component when the content has no edition.
- Use the outlined-card pattern (1.5px ink border + internal 1px @ 32% solid divider above content + 1px @ 32% dashed divider below content) for primary content cards. The solid/dashed pairing is the system's rhythm.
- Use the pill (border-radius 999px) and the rect-tag (sharp corners) intentionally — pill for actions, rect for metadata / status. Don't conflate them.
- Place the page-number marker (italic Fraunces, bottom-right) on every slide. The marker is the system's spine.
- Keep slides rich-but-curated around a major display moment and the real supporting groups. Do not manufacture groups, seats, cities, hours, badges or statistics to meet a preferred density.

### Don't
- Don't introduce a second ink color. The system is single-ink — adding a navy, green, yellow, or any second hue shatters the printed-program register.
- Don't fill any shape. Cards, pills, badges, rect-tags are outline-only. Filled rectangles in the ink color do not exist.
- Don't use box-shadow, gradient, blur, or filter on any element. The system is flat printed paper.
- Don't omit the paper-texture overlay. A flat #FAF1E2 background without the dot pattern reads as digital, not paper.
- Set ordinary Bricolage display copy in uppercase with negative tracking and weight 700 or 800; preserve the supplied casing of names and case-sensitive identifiers.
- Don't render Fraunces in roman by default. Italic is the body voice; roman is the exception for specific tight cases.
- Don't use thicker borders (2px+). The 1.5px structural border weight is the system's commitment.
- Don't use a medium border-radius (4px, 8px, 12px). The system uses 999px (pill), 50% (badge), or 0 (everything else).
- Don't pair the edition badge with a non-Fraunces label or skip the label entirely. The badge-and-label unit is the system's edition marker.
- Don't crowd a slide with 8 small elements. Reach for fewer, larger groups with breathing room.

## Stage adaptation and delivery

All internal geometry stays on the 1920×1080 stage. The shared runtime scales the entire slide uniformly, including type, borders and ornaments; smaller screens may letterbox and do not rearrange columns. Test the real title, densest content, navigation and legibility at the intended viewing sizes. Capture, PDF, reduced motion and audience controls follow the [shared runtime contract](../../../references/deck-runtime.md) and Deck Studio's production workflow. This recipe defines no alternate print or presentation path.

## CJK & International Content

### Role map and visual choice

| Role | Latin face | CJK adaptation candidate |
|---|---|---|
| Display / headings | Bricolage Grotesque 700 / 800 | Noto Sans CJK at real supported 700 / 800 weights |
| Body / metadata | Fraunces 400 italic or roman by role | Noto Serif CJK 400 upright |
| Body emphasis | Fraunces 500 / 600 when used | Real supported CJK 500 / 600 serif faces, or a deliberate role distinction without synthesized weight |
| True edition figure | Fraunces 400 italic | Keep the supplied numeral with its real unit/edition label; use CJK serif for supplied Han numerals |

### Composition and mixed-script treatment

The default preserves a heavy sans heading against a bookish body. A pure-CJK all-Mincho edition is an available art direction, but it replaces that sans/serif contrast and must be selected as a changed texture, not claimed equivalent. In that variant assign the CJK families directly to whole roles. In a mixed edition retain Latin Bricolage/Fraunces on Latin spans and explicit CJK roles on Han spans; a Latin-first fallback stack does not switch an entire slide to CJK typography. Fraunces' actual italic gives the Latin body its invitation-like cadence. Upright Han serif avoids synthetic slant; use spacing and real supported weights for hierarchy. Start Han display leading around 1.1–1.25 and body around 1.6–1.8; zero Han tracking.

### Font provision and script handling

These are candidates, not bundled assets or guaranteed substitutes. Before rendering, provision the exact local font files, weights and styles actually used; record the selected faces and verify the deck's actual glyph inventory, including rare names, punctuation, numerals and locale-specific forms. Do not claim a network font URL, a fallback family name or a browser's synthetic weight proves the intended face loaded. Set `font-synthesis: none`; use explicit script/role classes when weight, style or family differs. A single fallback stack is sufficient only when the same requested face properties are genuinely supported for both scripts.

Keep punctuation, casing, names, metrics and the locked words intact. Apply locale-aware line-breaking and spacing through layout; do not automatically strip terminal punctuation, insert words, translate labels or normalize identifiers. Keep punctuation with the phrase it belongs to and numbers with units. Han tracking starts at zero; Latin tracking remains role-specific. Verify representative full-width punctuation and mixed Latin/Han lines at actual stage size. If adaptation would change audience-visible meaning, return to content approval outside the slide frame.

### System-specific checks

Inspect the rich ledger/calendar grids (80px/130px/1.6fr/.9fr/auto), labels inside pills and actual edition metadata. Keep supplied dates, venue names, qualifiers and capacities. A seasonal character or decorative numeral is not a substitute for a missing edition. Long technical passages can move to a roman reading layout, split across slides, or require another system; they must not be rewritten as lyrical copy simply to fit this one.

## Iteration Guide

1. Keep marks in the rust family: full or deeper ink for readable text; 78% metadata only if legible; 32% for internal dividers.
2. Any new headline is Bricolage Grotesque weight 800 uppercase with negative letter-spacing. Pick the size from the headline ladder (96 / 100 / 120 / 140 / 160 / 180px max) — do not invent a new size.
3. Body starts in Fraunces 400 italic. Roman is valid for info keys, card descriptions and longer reading passages; recompose, split or change system rather than rewrite technical text as lyrical copy.
4. Use the circular edition badge only with a genuine edition/chapter label and actual ordinal.
5. A real link may use the pill shape with proper interaction; a destination-free pill is a tag. Never draw a button that does nothing.
6. Any new card is the `{components.card-outlined}` pattern: 1.5px ink border, internal 1px @ 32% solid divider above content, internal 1px @ 32% dashed divider below content.
7. Any new ledger / schedule / calendar row uses the multi-column grid + 1px @ 32% solid border-bottom pattern (`{components.ledger-row}`).
8. Any new section opener uses the topbar pattern: Bricolage headline + small italic Fraunces label on the right + 1.5px solid ink horizontal rule beneath.
9. A cover can feature a real edition numeral; otherwise compose the actual title and metadata without inventing a number.
10. Every slide carries the page-number marker. If you skip it, the slide will feel unanchored.

## Production watchpoints

Verify the actual Fraunces roman/italic and 400/500/600 faces in use; do not promise an optical-size effect on an unsupported file. Inspect dense ledger columns, dotted paper texture and muted rust metadata. Pills without destinations are tags, not buttons. Every edition, date, seat count and location must be real.

This document is a recipe, not evidence that a deck was rendered or accepted. Inspect the actual output, keep validation enabled, and record rendered/visual/PDF acceptance through the shared Deck Studio workflow.
