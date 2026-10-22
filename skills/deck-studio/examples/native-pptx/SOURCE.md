# A connected review

This generic example serves an agent learning Deck Studio's native PPTX path.
Its point is to show one semantic source represented by native editable text,
a connected diagram, a dense table and a chart with an embedded workbook.

The sequence is the review's purpose, a requirement/control/evidence chain,
four evidential judgments, then a visibly illustrative chart. Documentary
agreement does not establish implementation or effectiveness. The chart's
values are invented, not evidence or a prediction.

`deck.mjs` is the format-specific composition, using the standard PptxGenJS
API directly. Rebuild with `scripts/build_pptx.mjs` from the skill package,
then run `scripts/render_pptx.py` and inspect every slide. Rendering creates
candidate evidence, not a visual acceptance. Keep this source out of audience
release files; it stays with the editable authoring project.
