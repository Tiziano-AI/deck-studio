# Visual acceptance

Use this after `render_qa.mjs` and before delivery, PDF export claims, release
packaging, or publication. This is the producing agent's acceptance of Deck
Studio artifacts, not a mandatory human approval checkpoint.

## Contract

Rendered QA is mechanical evidence. Visual acceptance is the agent's judgment
that the rendered artifact is usable for the stated audience and semantic
source. The HTML composition is not accepted until both are true:

1. `proof/report.json` is mechanically passing for the current `deck.html`.
2. The producing agent has inspected the rendered screenshots or browser output
   visually, repaired visible defects, rerun proof, and recorded
   `proof/visual-review.json` with a passing validator result.

This accepts the HTML, not the complete delivery. Ordinary Decks delivery also
needs the PDF export check and the native editable PPTX's separate structural,
render and visual inspection in [native-pptx.md](native-pptx.md).

If the agent cannot inspect the rendered output, the correct status is
`not observed` / `deferred`, not pass. Do not ask the user to be the first QA
line for obvious clipping, overlap, unreadable density, metadata leaks, or bad
taste.

## Required artifact

Write this file next to `proof/report.json`:

```text
proof/visual-review.json
```

Schema:

```json
{
  "schema_version": 2,
  "render_report_sha256": "<SHA-256 of the exact proof/report.json inspected>",
  "artifact": "deck.html",
  "status": "pass",
  "inspected_by": "agent",
  "inspected_viewports": ["desktop", "phone"],
  "slides_inspected": "all",
  "evidence": [
    "proof/contact-sheet.html",
    "proof/screenshots/desktop-slide-01.png"
  ],
  "content_fidelity": "pass",
  "render_mechanics": "pass",
  "de_visu_inspection": "pass",
  "taste_judgment": "pass",
  "metadata_leak": "pass",
  "visual_thesis": "This deck should feel like ... because ...",
  "template_fit": "Why the selected visual system fits this audience and job.",
  "density_fit": "Why the density is readable for the mode, or how it was split.",
  "weakness": "The strongest visible tradeoff that remains.",
  "failures": [],
  "warnings": [],
  "residual_risk": "What was not proven, such as mobile-native readability."
}
```

Validate it:

```bash
python3 <skill>/scripts/validate_visual_review.py \
  proof/visual-review.json \
  --report proof/report.json --deck deck.html
```

Add `--expect-slides N` when the slide count is known.

After inspecting the generated evidence, obtain the report digest with
`shasum -a 256 proof/report.json` and record it verbatim in
`render_report_sha256`. This binds the judgment to that report's deck/resource
and screenshot identities; it is not a substitute for inspection. Keep the
report and its screenshot/contact-sheet files unchanged. Any changed source
bytes require fresh rendered QA and acceptance; changed report/evidence bytes
also invalidate the review. Old schema v1 reviews cannot establish current
acceptance. Render resources must be local or inline for release-bound proof;
an external URL can change independently of the HTML.

Additional local evidence may be cited as a `proof/` path, such as
`proof/navigation.log` or `proof/laptop/slide-01.png`. Packaging preserves those
files unchanged and binds their bytes in the release manifest. Prose and URL
evidence entries remain prose and URLs. Local text evidence must be UTF-8 and
uses one of `.css`, `.html`, `.js`, `.json`, `.md`, `.svg`, `.txt`, `.xml`, `.log`,
`.csv`, `.jsonl`, or `.tsv`; packaging and publication admission scan it for
private paths and secret-like tokens. Screenshot images may use PNG, JPEG,
GIF or WebP and still require visual inspection for private visible content.
Suffix checks are case-insensitive. Other opaque types are not supported as
local release evidence; provide a reviewed screenshot or sanitized UTF-8 text
instead. Missing, escaped, unsupported or unmanifested proof files cannot pass
release admission.

## Pass criteria

Pass requires all of the following:

- content fidelity preserves the current semantic source and any user lock;
- every slide screenshot or browser-rendered slide was inspected, not merely
  generated;
- no hard mechanical failures remain in `proof/report.json`;
- no visible clipping, cut text, collapsed panels, accidental overlap, or
  hidden content remains;
- no microtype that a normal human would need to squint at in the intended
  mode remains;
- no private implementation details, local paths or backstage process notes
  leak into the audience's slide frames;
- visible labels serve the audience's subject and understanding. A term about
  review, evidence or workflow can be legitimate content when that is the
  actual topic; its spelling alone is not a defect. Reject accidental agent
  process labels and unexplained internal jargon. Preserve necessary
  qualifications in audience-native language instead of removing them to pass
  a word check;
- the copy is in the register the source chose, or the one its audience calls
  for when the source names none ([DECKS.md](../DECKS.md)): in the explanatory
  register it supplies the context, terms and steps its reader lacks; in the
  peer register it does not explain the audience's own material or field,
  label a paragraph to say how to take it, or use a headline that counts or
  restates its body; in any register it carries no notes for the writer, does
  not comment on the deck itself, reassure the audience about a doubt they did
  not raise, state the negation of a backstage guardrail, or re-explain one
  limitation on slide after slide;
- visual register, typography, palette, density, and chrome serve the audience
  and communication job;
- the review names one real weakness or tradeoff instead of pretending the deck
  is perfect;
- residual risk states any unproven layer, such as phone letterbox proof versus
  mobile-native responsive readability.

## Failure and repair loop

When any pass criterion fails:

1. Record the defect family: `clipping`, `overlap`, `microtype`, `density`,
   `metadata_leak`, `content_drift`, `template_mismatch`, `register`, or
   `taste_failure`.
2. Repair at the smallest visual owner: split a slide, rebalance layout, resize
   type, remove decorative chrome or change template usage. If meaning must
   change, explicitly reopen that part of the semantic source within the
   mandate; ask before changing user-locked meaning or exceeding authority.
3. Rerun `validate_deck.py`, `render_qa.mjs`, and
   `validate_visual_review.py`.
4. Deliver only after the new rendered proof and visual review both pass.

Do not bury failures as "known issues" while calling the deck ready. A deck may
be delivered with residual risk only when the residual risk is outside the
claim being made, for example fixed-stage phone letterboxing when no mobile
readability claim is made.

## Responsibility through publication

Deck Studio carries meaning, composition, visual judgment and repair in one
job. Publication still consumes accepted bytes: a missing visual review cannot
be replaced by hosted success or a passing manifest. When asked to publish an
accepted release, reuse valid bound proof; do not fabricate acceptance, redesign
the deck or rerender it merely because publication is the current step.

The user's aesthetic preference can choose a direction. The producing agent
still owns obvious usability and visual-fit defects. Exercise navigation as
well as inspecting frames before describing the HTML as usable.
