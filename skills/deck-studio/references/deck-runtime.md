# Deck runtime

Use `runtime/deck-stage.css` and `runtime/deck-stage.js` for HTML decks unless a
user explicitly asks for a different runtime. The internal protocol names
`data-web-slides-studio`, `window.WebSlidesStudio` and `webslides:slidechange`
remain intentional runtime interfaces; the public skill is Deck Studio.

## Required HTML shape

```html
<body data-web-slides-studio>
  <div class="deck-viewport">
    <main class="deck-stage" aria-live="polite">
      <section class="slide active" data-title="Title">...</section>
      <section class="slide" data-title="Next">...</section>
    </main>
  </div>
</body>
```

## Invariants

- `.deck-stage` is 1920px by 1080px.
- `.slide` is 1920px by 1080px, absolute, and `overflow: hidden`.
- Exactly one slide receives `.active` / `.visible`. Inactive slides remain in
  the DOM, hidden through `visibility`, `opacity` and `pointer-events`, with
  `aria-hidden="true"` and `inert` so their controls cannot receive focus.
- If navigation leaves focus inside the previous slide, focus moves to the
  stage. The stage is programmatically focusable; runtime navigation buttons
  have visible keyboard focus, and controls remain visible while focused.
- No slide switch may rely on `display: none`.
- Deck chrome outside the slide may scale with the viewport; slide internals do
  not reflow.
- Use CSS variables for template colors, type, spacing, density, and motion.

## Interaction

- ArrowRight, Space, PageDown advance.
- ArrowLeft, PageUp go back.
- Home/End jump to first/last slide.
- Numeric entry jumps to a one-based slide number after a short delay or Enter;
  Escape cancels the pending number.
- `R` resets to slide 1.
- Keyboard shortcuts leave interactive elements, composition and modified key
  combinations alone, so links, forms and embedded controls retain their keys.
- Touch taps on noninteractive slide areas navigate in the left/right thirds;
  the middle third reveals controls. The runtime observes taps without adding
  an overlay, skips interactive targets, and rejects movement beyond its tap
  threshold. Links and controls remain directly usable.
- The URL uses `#slide-N`. Initialization and reload restore that slide;
  hash changes and browser Back/Forward update the stage. Navigation clamps
  out-of-range slide numbers and defaults invalid hashes to the first slide.

## Runtime API

`window.WebSlidesStudio` exposes `current()`, `total()`, `goTo(index)`, `next()`,
`prev()`, `reset()` and `scaleStage()`. API indices are zero-based; visible
counters and URL hashes are one-based. The stage emits `webslides:slidechange`
with current/previous indices, total, reason and active slide. Use the public
API for renderer navigation rather than changing slide classes independently.

Document data attributes expose readiness and the current slide for checks.
These runtime observations are not evidence that all slides are visually
accepted. Exercise focus, content links and history as well as arrow navigation
when those paths matter to the deck.

## Standalone delivery

Inline the runtime and assets when a single portable `deck.html` is practical.
A self-contained folder with relative linked resources is also a complete
deliverable; include every dependency. Choose from the requested destination
and asset size instead of assuming that only one file can be standalone. Do
not use absolute local filesystem paths in a delivered deck. Release-bound
rendering requires local or inline resource bytes so QA can bind their exact
identities; mutable external resources cannot supply immutable release proof.
