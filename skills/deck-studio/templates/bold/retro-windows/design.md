---
version: alpha
name: Retro Windows
description: A Windows 95 / 98 desktop-OS aesthetic rendered as a presentation system. Every slide is a window — beveled chrome, navy gradient title bar, MS Sans Serif body type, with chart areas, group boxes, and panels arranged as if they were software UI from 1995. The palette is the original Win9x system colors (gray button-face, navy title bars, white sunken inputs) with retro accent hues (DOS green, brick red, mustard yellow, teal cyan) reserved for status text and chart data. Pixel-font (Press Start 2P) and terminal-font (VT323) appear sparingly for nostalgic punctuation. The effect is half playful nostalgia, half functional dashboard — a deck that reads as a software product running on a CRT monitor.

colors:
  bg-gray: "#c0c0c0"
  bg-light: "#d4d0c8"
  bg-dark: "#808080"
  white: "#ffffff"
  black: "#000000"
  text-dark: "#222222"
  blue-navy: "#000080"
  blue-bright: "#0000a0"
  blue-light: "#1084d0"
  green-retro: "#008000"
  red-retro: "#800000"
  yellow-retro: "#808000"
  cyan-retro: "#008080"
  text-gray: "#555555"

color-aliases:
  btn-face: bg-light
  btn-highlight: white
  btn-shadow: "#404040"
  btn-dark-shadow: black

typography:
  body:
    fontFamily: "MS Sans Serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  text-xl:
    fontFamily: "MS Sans Serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.2
  text-lg:
    fontFamily: "MS Sans Serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.3
  text-md:
    fontFamily: "MS Sans Serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  text-sm:
    fontFamily: "MS Sans Serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  text-xs:
    fontFamily: "MS Sans Serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
  metric-xl:
    fontFamily: "MS Sans Serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.1
  title-bar:
    fontFamily: "MS Sans Serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: 0.5px
  group-box-title:
    fontFamily: "MS Sans Serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.0
  pixel-display:
    fontFamily: "'Press Start 2P', cursive"
    fontSize: "20–24px"
    fontWeight: 400
    lineHeight: 1.8
  terminal:
    fontFamily: "'VT323', monospace"
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.2

  slide-pad: "24px 32px 44px 32px"
  win-body-pad: "20px 24px 24px 24px"
  panel-pad: 16px
  group-box-pad: "20px 18px 16px 18px"
  panel-sunken-pad: 12px
  gap-1: 6px
  gap-2: 10px
  gap-3: 16px
  gap-4: 24px

canvas:
  width: 1920px
  height: 1080px

components:
  crt-overlay:
    backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 3px)"
    zIndex: 9999
    description: "Optional stage-local scanline texture at up to 3% black opacity. Reduce or omit if it harms reading. Pointer-events disabled; do not cover runtime controls."
  win-window:
    background: "{colors.bg-light}"
    border: "2px solid {colors.white} (top/left) + 2px solid {colors.black} (right/bottom)"
    boxShadow: "inset 1px 1px 0 {colors.white}, inset -1px -1px 0 #404040"
    description: "The signature framing element. Every slide is one (or more) win-window. The asymmetric border + double inset shadow creates the Win9x beveled raised effect — top-left highlighted, bottom-right shadowed."
  win-titlebar:
    background: "linear-gradient(90deg, {colors.blue-navy} 0%, {colors.blue-bright} 100%)"
    color: "{colors.white}"
    padding: "4px 8px"
    fontSize: 14px
    fontWeight: 700
    description: "Navy-blue gradient bar at the top of every window. Contains the actual slide title or genuine source filename, with an optional supplied icon. No inert operating-system buttons."
  win-titlebar-inactive:
    background: "linear-gradient(90deg, #808080 0%, #a0a0a0 100%)"
    description: "Grayed-out title bar variant for inactive/secondary windows (used when a slide contains multiple stacked windows representing different states)."

  btn-retro:
    background: "{colors.bg-light}"
    border: "2px solid {colors.white} (top/left) + 2px solid {colors.black} (right/bottom)"
    padding: "6px 24px"
    fontSize: 14px
    description: "Optional genuine command button with an implemented action, visible keyboard focus and hover feedback. Pressing inverts the bevel. Never add inert OK, Cancel, Help, Export or Print controls."
  group-box:
    border: "2px solid #404040 (top/left) + 2px solid {colors.white} (right/bottom)"
    padding: "20px 18px 16px 18px"
    background: "{colors.bg-light}"
    description: "Sunken-bevel framed container with a title label that breaks the top border (the title sits in a small background-painted notch at top-left). The Win9x equivalent of a fieldset/legend."
  group-box-title:
    position: absolute
    top: -10px
    left: 12px
    background: "{colors.bg-light}"
    padding: "0 8px"
    fontSize: 13px
    fontWeight: 700
    description: "The title label that sits on top of a group-box's upper border, painted with the parent background to mask the border behind it."
  panel-raised:
    background: "{colors.bg-light}"
    border: "2px solid {colors.white} (top/left) + 2px solid {colors.black} (right/bottom)"
    padding: 16px
    description: "Raised-bevel panel. Used for tool palettes, button strips, and elevated content regions inside a window body."
  panel-sunken:
    background: "{colors.white}"
    border: "2px solid #404040 (top/left) + 2px solid {colors.white} (right/bottom)"
    padding: 12px
    description: "Sunken-bevel panel with a white interior. Used for text input fields, read-only data displays, and status regions. The white interior is the system's signal for 'this is content, not chrome.'"
  progress-bar:
    width: "100%"
    height: 24px
    background: "{colors.white}"
    border: "2px solid #404040 (top/left) + 2px solid {colors.white} (right/bottom)"
    padding: 2px
    description: "Sunken white well containing a solid navy fill div whose width represents the data value. The fill is `{colors.blue-navy}` solid — no gradient, no animation required."
  retro-list:
    listStyle: none
    marker: "> (chevron)"
    markerColor: "{colors.blue-navy}"
    description: "Custom-bullet list where each item is prefixed with a navy '>' character. The chevron is set via ::before, never via list-style."
  retro-check:
    checkBoxSize: "16px"
    checkBoxBorder: "2px solid {colors.black} (top/left) + 2px solid {colors.white} (right/bottom)"
    checkMarker: "x"
    description: "Sunken square for an established checked/unchecked state, labeled in words. Static states are not buttons; use semantic controls only for implemented interactions."
  retro-table:
    borderCollapse: collapse
    fontSize: 14px
    headerBackground: "{colors.bg-gray}"
    headerBorder: "1px solid #404040"
    cellBackground: "{colors.white}"
    cellBorder: "1px solid {colors.bg-gray}"
    zebraRowBackground: "#f0f0f0"
    description: "Pixel-flat data table with gray headers, white cells, light-gray border lines, and a barely-different zebra fill on alternate rows."
  inset-message:
    background: "{colors.white}"
    border: "1px inset {colors.bg-gray}"
    padding: "3px 0"
    description: "Static message inside a sunken white well. Show actual locked text in full, with room to wrap; no continuous scrolling."
  win-icon:
    width: 18px
    height: 18px
    background: "{colors.white}"
    border: "1px solid {colors.black}"
    fontSize: 11px
    color: "{colors.blue-navy}"
    fontWeight: 700
    description: "Optional supplied icon with a real referent beside the title. Do not invent an application mnemonic or brand."
  tree-item:
    fontSize: 14px
    indent: "24px per level"
    folderGlyph: "📁 (U+1F4C1)"
    fileGlyph: "📄 (U+1F4C4)"
    description: "Read-only hierarchy with real folder/file labels and 24px indentation per level. Use tree lines for static content. Expansion markers require implemented expansion; do not hide content needed for export."
  separator-vertical:
    width: 2px
    background: "#404040"
    borderLeft: "1px solid {colors.white}"
    margin: "0 12px"
    description: "Beveled vertical separator between inline elements — the Win9x equivalent of a vertical rule."
  hr-retro:
    borderTop: "1px solid #404040"
    borderBottom: "1px solid {colors.white}"
    margin: "14px 0"
    description: "Beveled horizontal rule. Two stacked 1px lines (dark on top, white on bottom) create the engraved-in look."

  chart-canvas-host:
    background: "{colors.bg-light}"
    description: "Chart.js canvas embedded inside a panel-raised. Chart colors use {colors.blue-navy}, {colors.blue-bright}, {colors.blue-light}, {colors.green-retro}, {colors.cyan-retro}, {colors.yellow-retro}. Axis labels use MS Sans Serif at 11–12px in {colors.text-dark}. Gridlines in {colors.bg-gray}."

---

## Composition and runtime

Build this recipe on the fixed **1920×1080** stage using the [shared deck runtime](../../../references/deck-runtime.md). That owner supplies scaling, navigation, active state and delivery behavior; this recipe supplies the slide's visual composition. Slide internals do not reflow on phones.

Choose components from the locked content: a stat needs a supported value, a quote its actual attribution, a label its real referent, and emphasis an established narrative reason. Empty component slots do not authorize new copy. Recompose or split an overfull slide without dropping meaning; change the visual system if it cannot carry the content.

## Overview

Retro Windows uses the visual grammar of a desktop window: warm gray chrome, a navy gradient title band, white recessed data wells and crisp raised/sunken edges. The framing makes a table, comparison or explanation feel like an application screen. It is a presentation, not an operating-system emulator: the title is the actual slide title, and every visible control has a real purpose.

The period-inspired native sans stack carries most content. Optional Press Start 2P and VT323 assets provide one or two nostalgic accents with supplied words, not fabricated filenames or loading messages. The native stack varies by platform; inspect the target render rather than claiming historical fidelity.

**Density philosophy: medium to high when content supports it.** Use related group boxes, a broad table or two aligned windows to express real structure. Fewer larger panels and a spare cover are legitimate. A status footer needs actual source, time or status information; empty space never authorizes invented readouts or button strips.

The defining relationships are white data wells against gray structure, navy titles against light body text areas, and opposite highlight/shadow directions on raised versus sunken frames. Restrained optional scanlines add texture but must not compete with reading. Status colors require a defined interpretation in words; a positive delta is not necessarily good news.

## Colors

### Palette
- **Button Face Light** (`{colors.bg-light}` — #d4d0c8): The base chrome color for windows, panels, group boxes, buttons. The Win9x "3D Objects" system color. Slightly warm gray. The default fill for any non-content region.
- **Background Gray** (`{colors.bg-gray}` — #c0c0c0): Slightly darker gray. Used for table headers, secondary gray surfaces. The "Gray Background" system color.
- **Background Dark** (`{colors.bg-dark}` — #808080): Dark gray for desktop fills outside windows and for inactive title bar starts. The "Inactive Title Bar" color.
- **White** (`{colors.white}` — #ffffff): The content fill — used inside sunken panels, text inputs, table cells, progress bar wells, and as the title-bar text color. White signals "this is content, not chrome."
- **Black** (`{colors.black}` — #000000): The deepest shadow color in bevel borders and the strongest text color. Also used as button border for raised-bevel right/bottom edges.
- **Text Dark** (`{colors.text-dark}` — #222222): The default body text color. Slightly softer than pure black so body type doesn't compete with the bevel-dark shadow.
- **Text Gray** (`{colors.text-gray}` — #555555): A muted gray for secondary text, captions, and status hints.
- **Navy** (`{colors.blue-navy}` — #000080): The primary brand color — title bar starts, chart bars, progress fills, headline text, retro-list chevron markers. The system's "primary" color.
- **Blue Bright** (`{colors.blue-bright}` — #0000a0): Title bar gradient end. Slightly brighter and bluer than navy. Used as the second chart-bar variant.
- **Blue Light** (`{colors.blue-light}` — #1084d0): A lighter blue used as a tertiary chart-bar variant.
- **Green Retro** (`{colors.green-retro}` — #008000): DOS green. Reserved for OK status, success messages, favorable deltas when their interpretation is established, "READY" / "LIVE" badges, "On Track" labels.
- **Red Retro** (`{colors.red-retro}` — #800000): Brick red. Reserved for error/warning text and the brick-red status family.
- **Yellow Retro** (`{colors.yellow-retro}` — #808000): Mustard yellow. Reserved for "moderate" risk labels and warning chart segments.
- **Cyan Retro** (`{colors.cyan-retro}` — #008080): Teal cyan. Reserved for tertiary chart segments and secondary status accents.

### Defaults
- **Default surface background**: `{colors.bg-dark}` for the desktop region behind a window, `{colors.bg-light}` for the window body.
- **Default headline / primary text color**: `{colors.blue-navy}`. Headlines in this system are navy, not black — that is the dashboard / application-title voice.
- **Default body text color**: `{colors.text-dark}` (#222222), not pure black.
- **Default secondary / caption text color**: `{colors.text-gray}` (#555555).
- **Default chart primary color**: `{colors.blue-navy}`. Secondary bars use `{colors.blue-bright}` and `{colors.blue-light}` first; categorical-segment charts then pull `{colors.green-retro}`, `{colors.cyan-retro}`, `{colors.yellow-retro}`.
- **Default progress-bar fill color**: `{colors.blue-navy}` (solid, no gradient).
- **Default status-OK color**: `{colors.green-retro}` — used on `READY`, `LIVE`, `Approved`, favorable deltas when their interpretation is established, and any "things are good" badge.
- **Default status-warning color**: `{colors.red-retro}` or `{colors.yellow-retro}` — red for hard errors, yellow for moderate concerns.
- **Default title-bar background**: navy → blue-bright horizontal gradient on active windows; gray (`{colors.bg-dark}` → `#a0a0a0`) on inactive windows when the slide stacks multiple windows.
- **Default text color inside a navy title bar**: `{colors.white}` — always white-on-navy in title bars.
- **Default text color inside a sunken white panel**: `{colors.text-dark}` — dark-on-white for content text.

The accent palette (green / red / yellow / cyan) has fixed semantic meanings — do not use green for arbitrary decoration, do not use red for non-warning text. The accents are status signals, not paint.

## Typography

### Font Family
The system has three faces, each with a distinct role:

- **MS Sans Serif / Segoe UI / Tahoma / Geneva / Verdana stack** (system body): The default for nearly all text. The fallback chain works on any OS — macOS lands on Geneva or Verdana, Windows lands on Segoe UI or MS Sans Serif, Linux lands on a sans-serif fallback. The aesthetic is "what software UI looked like in 1995," and the system font stack is critical to that — never substitute a custom display sans.
- **Press Start 2P** (pixel display): An 8-bit pixel display face used sparingly. Reserved for splash-screen titles, the closing slide's send-off message, and any oversized nostalgic title moment. Always rendered in `{colors.blue-navy}`, always center-aligned. Use it once or twice per deck, not on every slide.
- **VT323** (CRT terminal monospace): A chunky monospace face that imitates a CRT terminal. Reserved for the bottom-edge navigation hint (`<-- ARROW KEYS to navigate -->`) and any "terminal output" body region. Optional — the deck functions without it.

Italic is not used. Underline is not used (interactive links can be underlined but no decorative underlining). Emphasis is achieved by weight (400 → 700) and by switching color (default → navy or default → green/red).

### Type Scale

| Token | Size | Family | Weight | Use |
|---|---|---|---|---|
| `{typography.text-xl}` | 32px | MS Sans Serif | 700 | Primary slide headline inside a window body |
| `{typography.metric-xl}` | 30px | MS Sans Serif | 700 | Hero metric value in a KPI tile |
| `{typography.text-lg}` | 22px | MS Sans Serif | 700 | Section heading / subheading inside a window body |
| `{typography.text-md}` | 18px | MS Sans Serif | 400 | Standard body paragraph |
| `{typography.body}` | 16px | MS Sans Serif | 400 | Default working body |
| `{typography.text-sm}` | 14px | MS Sans Serif | 400 | Captions, list items, button labels, table cells |
| `{typography.text-xs}` | 12px | MS Sans Serif | 400 | Fine print, status hints, slide counter |
| `{typography.title-bar}` | 14px | MS Sans Serif | 700 | Actual window title — preserve meaningful case |
| `{typography.group-box-title}` | 13px | MS Sans Serif | 700 | Notch-mounted group-box title label |
| `{typography.pixel-display}` | 20–24px | Press Start 2P | 400 | Nostalgic splash-screen or closing display title |
| `{typography.terminal}` | 22px | VT323 | 400 | Optional short supplied accent text |

### Defaults
- **Default size for a primary slide headline (inside window body)**: `{typography.text-lg}` (22px) in `{colors.blue-navy}` weight 700 — the application-title voice. For an oversized hero headline use `{typography.text-xl}` (32px).
- **Default size for a body paragraph**: `{typography.text-md}` (18px) for prose paragraphs; `{typography.text-sm}` (14px) for working text and list rows.
- **Window title bar**: use the actual title in white, at a readable size; expand the band when needed.
- **Default size for a metric or hero number**: `{typography.metric-xl}` (30px weight 700) in `{colors.blue-navy}`.
- **Default size for a section heading inside a window**: `{typography.text-lg}` (22px weight 700) in `{colors.blue-navy}`.
- **Default size for any caption, fine print, or status hint**: `{typography.text-xs}` (12px) in `{colors.text-gray}`.
- **Default weight for any headline or label that should command attention**: 700.
- **Default weight for body text**: 400.

When a slide carries multiple stacked windows or panels, the primary slide message goes inside the first window's body at `{typography.text-lg}`-weight-700-navy. Do not reach for a larger size unless it's an explicit hero / splash moment.

### Signature Treatments
These treatments are **non-optional whenever the corresponding element type is used**:

- **Every title bar carries real content**: the actual slide title in its meaningful case, or a genuine filename when that file is the subject.
- **Title bars do not carry inert system buttons.** Window framing, navy fill and beveled edges provide the metaphor.
- **Every title bar carries a `{components.win-icon}` lockup** on the left — an 18px white-with-black-border square containing a single navy letter that mnemonically identifies the window (P, A, R, D, F, G, M, E, T).
- **Every window uses the beveled-raised chrome treatment** (white top/left + black bottom/right border + double inset shadow). Removing the bevel breaks the Windows aesthetic entirely.
- **Every body headline inside a window is `{colors.blue-navy}` weight 700.** Navy supplies the application-title voice.
- **Status text uses the assigned status color** with weight 700: green for an established favorable state, red for an established error and yellow for a defined concern, always with a text label. A green status word at default weight reads as incidental rather than as a label.
- **Group-box titles sit in a 0–8px-padded notch over the upper border.** The title's background is painted in `{colors.bg-light}` (the parent fill) to mask the border behind it — never let the border run through the title.

### Typography Principles
Use stage-pixel sizes so the entire composition scales together. The tiny historical 12–32px tokens below must be enlarged for a presentation: start body near 32px, secondary labels near 24px, headlines near 56px and metrics near 64px, then inspect the actual deck. Integer sizes evoke crisp interface type; they do not guarantee legibility after uniform scaling. Preserve all content by allocating larger or fewer panels.

The pixel-font (Press Start 2P) and terminal-font (VT323) are nostalgic accents, not workhorses. Using Press Start 2P for body text becomes illegible quickly; using VT323 for headlines reads as overproduced. Reserve each for one or two moments per deck.

## Layout

### Canvas System
Compose at 1920×1080 on the shared stage. Start with 48px outer space and allocate a window up to 1824×984; grow title bands and panel type for readable content. Runtime navigation stays outside the recipe. No internal scrolling, viewport-relative maximum heights or active-slide engine: split a crowded composition into complete slides instead.

### Window Anatomy
Every window has three regions stacked vertically:
1. **Title bar** (`{components.win-titlebar}`) — navy gradient with actual title; expand its height for full readable text. A supplied icon is optional, and inert system buttons are absent.
2. **Body** — padding from `{spacing.win-body-pad}`, expanded with the presentation type scale; contains the slide's complete composition without internal scrolling.
3. **Optional status panel** at the body's bottom — a `{components.panel-raised}` or `{components.panel-sunken}` strip carrying meta info (data source, last updated, count, status badge).

A slide may contain multiple windows side-by-side (typically for timeline quarters or multi-screen comparisons). When multiple windows appear, only one carries the active navy title bar; the others carry the inactive gray gradient.

### Padding Scale
| Token | Value | Use |
|---|---|---|
| `{spacing.slide-pad}` | 24px 32px 44px 32px | Outer slide padding |
| `{spacing.win-body-pad}` | 20px 24px 24px 24px | Inside a window body |
| `{spacing.group-box-pad}` | 20px 18px 16px 18px | Inside a group-box (extra top to clear notched title) |
| `{spacing.panel-pad}` | 16px | Inside a raised panel |
| `{spacing.panel-sunken-pad}` | 12px | Inside a sunken white panel |

### Runtime chrome
The shared runtime owns navigation, counters and control placement. Window decoration stays within the composition; it does not add nav dots, a key-hint strip or a second counter. An optional scanline layer is stage-local and never obscures controls or focus.

## Depth and Elevation

### Bevel Illusion (Primary Technique)
The system uses **two-tone asymmetric borders** plus **inset box-shadows** to simulate the Windows 95 beveled UI. There are two states:

- **Raised**: 2px solid white on top + left, 2px solid black on right + bottom, plus `inset 1px 1px 0 white, inset -1px -1px 0 #404040`. Reads as a button or panel sitting up off the surface. Used on windows, raised panels and genuine buttons.
- **Sunken**: 2px solid `#404040` on top + left, 2px solid white on right + bottom. Reads as a recessed input field or content well. Used on group-boxes, sunken panels, text inputs, progress-bar tracks, truthful checkbox-state boxes.

The active button press state inverts the bevel — a button that is "pressed in" swaps the highlight/shadow border directions. Genuine controls also need visible focus and hover feedback; those states can remain crisp and bevel-based.

### No Modern Shadows
The system uses **no blurred `box-shadow` values**, no `drop-shadow` filters, no rgba shadow tints. Every depth cue comes from the bevel-border technique. Adding a soft modern shadow to a window or button breaks the era immediately.

### Color-Block Depth
Beyond the bevels, **white-vs-gray contrast** provides regional depth: white panels visually project as "content / data," gray panels recede as "chrome / structure." A slide's hierarchy emerges naturally from where the white wells sit.

### CRT Scanline Overlay
The optional CRT scanline overlay is a 3px-period horizontal repeating gradient at up to 3% black opacity within a slide. The overlay does not add depth, but it adds **texture** — every surface in the deck reads as "rendered on a 1995 CRT monitor" rather than "rendered on a flat screen." Omit it when it adds noise or weakens glyph contrast; bevels and palette preserve the aesthetic.

## Shapes and Treatment

### Border Radius
The system has **no rounded corners anywhere**. Every box, button, panel, window, table cell, checkbox, progress-bar — strict rectangles. Border-radius is `0` system-wide.

### Border Weights and Styles
- **2px solid** — the universal bevel border weight on windows, panels, buttons. Used in the two-tone asymmetric pattern (white+black or darkgray+white) that creates the bevel illusion.
- **1px solid** — used for thinner element borders (table cell borders, win-icon outline, hr-retro stacked lines).
- **`1px inset`** — used on the inset-message container border.

Borders are never colored (no navy borders, no green borders); the bevel two-tone pattern (white + black/darkgray) is the only border vocabulary.

### Decorative Element Types

**Window** (`{components.win-window}`) — The framing primitive. A beveled-raised rectangle with a navy title bar containing the real title and an optional supplied icon, and a body region containing the content. Every slide is at least one window.

**Group box** (`{components.group-box}`) — Sunken-bevel container with a notch-mounted title at the upper-left. The title sits in a 0–8px padded background-painted region that masks the border behind it, mimicking the `<fieldset><legend>` pattern of native HTML forms. Used to cluster related controls or content blocks inside a window.

**Raised panel** (`{components.panel-raised}`) — Beveled-raised gray panel. Used for tool palettes, button strips, status footers, and elevated content regions.

**Sunken panel** (`{components.panel-sunken}`) — Beveled-sunken white panel. Used for text inputs, KPI displays, status readouts, and read-only data. White interior is the cue.

**Retro button** (`{components.btn-retro}`) — Beveled-raised gray button with 6px × 24px padding. Always carries text-md (14px) MS Sans Serif weight 400. Active state inverts the bevel.

**Progress bar** (`{components.progress-bar}`) — Sunken white well containing a solid navy fill div. The fill width represents the value; no animation beyond width transition. Always 24px tall (or 16px when embedded inside a feature card).

**Retro table** (`{components.retro-table}`) — Pixel-flat data table with gray headers, white cells, light-gray border lines, and a barely-different zebra fill on alternate rows. Cell padding is 6px × 10px.

**Retro list** (`{components.retro-list}`) — Unstyled list with a navy `>` chevron prefix on each row. The chevron is set via `::before`, never via list-style.

**Retro check** (`{components.retro-check}`) — A 16px sunken-bevel white square containing a literal lowercase `x` character when checked. The bevel is inverted relative to buttons (black on top/left, white on bottom/right).

**Tree view** (`{components.tree-item}`) — Explorer-style hierarchical list. Static rows show actual hierarchy with tree lines and labels. Folder/file glyphs require those real referents; expansion markers require implemented behavior. Start at 24px indentation per nesting level.

**KPI tile (group-box variant)** — A group-box with the real metric label, value, units, period and available comparison context. Use a large navy figure. A delta's semantic color follows the established interpretation, with words or a symbol as well; never insert a default green improvement.

**Inset message** (`{components.inset-message}`) — A static sunken white well for actual opening or closing text. Wrap and size it to show the whole message without animation.

**Win icon** (`{components.win-icon}`) — Optional supplied asset with a real referent, framed in a small white square with black outline. It is not a reason to create an application mnemonic.

**Separator** (vertical or hr-retro) — A beveled rule. Vertical: 2px dark-gray + 1px white-left border, 12px horizontal margin. Horizontal: stacked 1px dark-gray-on-top + 1px white-on-bottom lines, 14px vertical margin.

**Nostalgic pictogram** — An optional nonverbal accent only where its meaning fits the real content. An hourglass must not imply a loading state that does not exist.

## Do's and Don'ts

### Do
- Keep the raised/sunken bevel directions consistent: white top/left and dark bottom/right for raised frames, reversed for recessed wells.
- Use navy headlines and white data panels to organize real information. A title bar can carry any meaningful title in its original language and case.
- Choose panel count from the supplied content. Leave room for readable labels and qualifications; use a taller title band or split an overfull slide.
- Use the navy ladder for related chart series and clearly labeled retro accent colors for categories. Status meaning needs text and a grounded interpretation.
- Make real controls operable by keyboard with visible focus, hover and pressed states. Static boxes and hierarchy rows remain noninteractive.
- Localize optional font/chart assets. Charts must be fully ready for render and export; deterministic SVG is a good fit.

### Don't
- Do not invent file extensions, source labels, classifications, timestamps, statuses or mnemonic letters to populate the UI metaphor.
- Do not add inert minimize/maximize/close clusters, command strips, fake scrollbars or a second navigation system.
- Do not turn every positive delta green or every selected row into a claimed winner.
- Do not hide content in internal scroll areas, lazy active-slide chart gates or moving marquees.
- Do not force tiny historical interface type onto a presentation. Increase scale and panel allocation before sacrificing content.
- Avoid rounded corners and blurred shadows; crisp rectangular bevels carry this system.
- Do not insist on scanlines when they impair text. Their absence does not break the window framing.

## Stage, interaction and export

Use the [shared deck runtime](../../../references/deck-runtime.md) for the fixed stage, navigation and export integration. Keep all layout decisions inside the 1920×1080 stage; the audience viewport scales the complete composition uniformly, without internal mobile breakpoints. Do not add a template-specific navigation engine, active-state protocol, print path or presenter controls.

Check the recipe's characteristic edges at the rendered size: type extents, rotated objects, shadows, textures and panel boundaries. Appearance alone does not prove fit or contrast. Preserve the content and repair the layout when a check fails.

## CJK & International Content

### One UI family, readable at presentation scale

| Role | Latin stack | Chinese candidate | Starting treatment |
|---|---|---|---|
| Title bar / headline / metric | MS Sans Serif, Segoe UI, Tahoma, Geneva, Verdana | Noto Sans SC or a tested native Chinese UI face | Supplied 700 face |
| Body / caption / table | Same UI stack | Same Chinese family | Supplied 400 face |
| Optional nostalgic accent | Press Start 2P / VT323 | The selected Chinese UI face unless a separate suitable pixel face is supplied | Do not synthesize missing glyphs |

The intent is a cohesive application interface, not an exact historical operating-system emulation. Do not infer that a modern Chinese font is what every Win9x localization used, or that no Chinese pixel fonts exist. A new pixel face requires an actual asset and a visual test; it is not needed to preserve the bevels and gray/navy structure.

### Window titles remain real content

Put the actual slide title or a genuine source filename in the title bar. Do not invent a filename, extension, English splash phrase or `LOADING` status to evoke the era. Chinese titles are valid window labels; they do not need a Latin suffix. Long titles can use a taller title band or an additional body headline while retaining their full meaning.

The optional accent-font moment must use supplied text. If a Chinese title has no supported pixel face, render it in the selected UI face and preserve its hierarchy through size, navy ink and inset framing. Never discard the words to preserve nostalgia.

### Mixed-script styles

Use explicit Chinese language spans if a specific font must be selected; a late fallback name may not be reached because an earlier system face contains the glyphs. Load actual supplied weights, disable synthesis and inspect the final render. Noto Sans SC is an optional asset, not a guarantee of historical or cross-platform equivalence.

Set Chinese tracking to 0 and leave case unchanged. Start body leading at 1.75–1.85 and headings at 1.15–1.25, then inspect within the window. Preserve source punctuation and keep labels, values and units together. Enlarge the notch background around a group-box title so the engraved border never crosses a glyph.

### Status, charts and fit

The UI metaphor cannot create data. Status badges require established statuses in words; green is not automatically appropriate for every positive numeric delta. Use labels and marks as well as color. A checkbox or tree expansion marker may not pretend to be an operable control; use the static data treatment unless the artifact genuinely implements that interaction.

Chinese chart labels need enough room for glyphs and units. Choose fewer panels, wider table cells or more slides before shrinking text. Scanline texture and 1–2px bevels can become noisy under uniform stage scaling; inspect them with the actual text and reduce the overlay when it hurts reading. Keep every data row and qualification accessible without internal scrolling.

## Iteration Guide

1. Give each window its actual slide title and determine whether one window or multiple related windows best expresses the locked structure. Use a gray secondary title band for subordinate panels only when that hierarchy is intended.
2. Group related content with notched group-boxes, gray raised panels or white sunken data wells. Ensure notch paint fully clears title glyphs and borders.
3. Set headline, body, metric and caption scale for the rendered viewing distance. The body/type contrast comes from weight, size and navy ink, not tiny UI density.
4. Build metric tiles from actual values, units, periods and comparison context. Carry all qualifications and avoid automatic success coloring.
5. Render complete charts with embedded/local resources. Match color and labels to the actual series and keep all series through a split or expanded chart where necessary.
6. Represent real hierarchy and checked states clearly. Use static lines or labels unless the deck implements actual controls; never make inert decoration look clickable.
7. Add only supplied source/status footer data. A blank footer may be omitted, and the window body may expand into that space.
8. Inspect bevels, scanlines, native glyphs, focus on real controls and all data labels at the final rendered size.

## Implementation cautions

- Native UI fonts vary by operating system. Localize any chosen optional Press Start 2P, VT323 or CJK assets and use actual weights without synthesis.
- Thin 1–2px bevels can disappear or become noisy under stage scaling. Inspect the intended destination and simplify texture where needed.
- Character-based chevrons, state markers and folder/file glyphs need actual glyph coverage. A static vector may be more consistent.
- The supplied small UI tokens describe the historical visual vocabulary; they do not establish presentation readability. Enlarge all related type, panels and spacing coherently.
- No CDN chart failure, missing font or active-slide gate may leave a blank data region in the delivered artifact.
