# Rendered QA

Rendered QA observes slide geometry, scaling, screenshot inventory, internal
clipping and hard microtype signals that source inspection cannot settle. The
result informs visual review; it does not establish overall readability or taste.

Run:

```bash
node <skill>/scripts/render_qa.mjs deck.html --out proof
```

The script writes:

```text
proof/
  report.json
  contact-sheet.html
  screenshots/
    desktop-slide-01.png
    phone-slide-01.png
    ...
```

## Pass criteria

- Desktop viewport is 1920x1080.
- Phone viewport renders the same fixed stage letterboxed or pillarboxed.
- Screenshot files contain bytes. This checks capture output exists; byte size
  does not establish visible content or image quality. Inspect the frames.
- Slide count is greater than zero.
- Exactly one slide is active at a time.
- Stage scale is finite and positive.
- `document.documentElement` and `body` have no scrollbars in screen mode.
- No visible element's bounding box exceeds the 1920x1080 slide bounds beyond a
  small tolerance.
- No text-bearing element has internal scroll clipping such as
  `scrollHeight > clientHeight` or `scrollWidth > clientWidth` beyond tolerance
  on an axis whose CSS overflow can actually clip content.
- No direct text run falls below the hard microtype threshold.
- The report exposes warnings for near-microtype, suspicious text overlap,
  dense slides, and unloaded fonts so the agent can judge them de visu.
- `contact-sheet.html` renders every captured slide screenshot for fast visual
  inspection.

Rendered QA is a signal, not a perfect human design review. Pair it with the
composition guidance, visual acceptance, and a content-fidelity check against the
current semantic source or user lock. Screenshots can establish fit and visibility; they
do not by themselves prove that the renderer preserved the agreed message or
that the deck is tasteful enough to ship.

## Report interpretation

Schema v3 records SHA-256 and byte counts for the deck and local files actually
served during rendering, plus screenshots and the contact sheet. Paths are
relative to the deck/proof owners so packaging can preserve the report bytes.
The visual review binds this exact report digest. External render requests are
recorded but cannot be pinned by an immutable local release; localize/inline
those resources before release-bound QA. A source change during capture fails
the run rather than assigning old frames to new source bytes.

`proof/report.json` has `ok: false` when hard mechanical failures remain:

- `slide_bounds_overflow`;
- `internal_clipping`;
- `hard_microtype`;
- inactive/ambiguous slide state;
- viewport scrollbars;
- zero-byte screenshot output.

Warnings are not automatically pass/fail. They are mandatory inputs to
`proof/visual-review.json`: the agent must decide whether the warning is
acceptable for the audience/mode or repair the deck and rerun QA.
