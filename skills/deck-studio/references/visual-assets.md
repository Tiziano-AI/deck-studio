# Visual assets that do real work

Use this when photographs, screenshots, diagrams, charts, illustrations or
identity assets materially improve the deck. An asset deserves attention in
proportion to its role and the consequence of getting it wrong.

## Decide what the asset does

| Role | Useful form | Trust requirement |
| --- | --- | --- |
| Evidence | Actual product screenshot, chart, photograph, document excerpt | Preserve source, dates, scale and relevant context; never generate a factual exhibit and present it as observed. |
| Explanation | Mechanism diagram, workflow, comparison or annotated visual | Preserve the relationships and label simplifications; prefer editable vector/code-native geometry when precision matters. |
| Atmosphere | Photograph, texture, conceptual illustration or backdrop | Support the register without implying an unobserved fact; protect readability and avoid filling every empty area. |
| Identity | Logo, product image, brand palette or recognizable subject | Use the canonical reference and its real proportions; do not approximate brand marks when source assets exist. |

One image can have more than one role. Apply the evidence or identity constraint
where relevant even if the composition also uses it atmospherically. A generated
illustration may explain a concept, but cannot establish that a product feature,
customer result or historical event actually exists.

## Sources and canonical references

Prefer the user's supplied original or the asset's real owner for identity and
evidence. Inspect references before generating or editing. Keep one canonical
input rather than deriving every variant from the previous derivative; repeated
reinterpretation causes identity and factual drift. For visual variants, hold
the subject and important semantic details fixed while changing only the visual
treatment requested.

Choose the available image-generation capability for new raster imagery, the
existing vector/code owner for diagrams and icons, and real source data for
charts. Do not call a generation tool just because one is available. Respect
usage rights and transfer boundaries; a private source does not become safe to
publish merely because it is cropped.

Keep lineage where it helps use or revision: source URL or local owner, relevant
date, original/derived relationship and material transformations. A small asset
note is enough for an atmospheric illustration; evidence needs the context that
lets a reviewer understand what it supports. Do not copy private paths, provider
logs or unrelated reference material into release artifacts. Publication may
require source credit or an audience-facing caption, but not the entire working
trail.

## Crop, resolution and integration

Choose the crop around the slide's argument. A screenshot must retain the UI
context needed to interpret it. Do not crop away dates, axis labels, disclaimers
or contradictory context that changes the evidence. If a detail is too small,
use a clearly marked enlargement rather than an illegible whole-screen image.

Inspect the placed result at the actual slide use size. Check essential detail,
contrast, compression artifacts, cut faces/objects, transparent edges and safe
space around marks. High source resolution does not make tiny slide text
legible. Fit/aspect-ratio choices should be explicit: `cover` is often suitable
for atmosphere, while evidence and logos usually require preserved geometry and
deliberate crops. Compare variants at the same use size.

Charts need units, comparable scales, baseline and time period where they affect
interpretation. Diagrams need label hierarchy and unambiguous connectors. Add
text alternatives for essential visuals when the medium supports them, and
route to a text-bearing accessible deliverable when the audience requires it.

Before release-bound rendering, localize or inline allowed assets and fonts so
the exact bytes can be bound by QA. A remote URL may change after inspection.
Use relative paths for folder deliverables. Regenerate affected render and PDF
proof after any image, font, crop or source-byte change.
