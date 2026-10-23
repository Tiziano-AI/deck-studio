# PDF export

PDF is part of every ordinary Decks delivery. Its export is screenshot-based:
it captures the rendered browser
state for each slide and embeds the screenshots into a PDF so the PDF matches
the HTML deck's visual surface. Text is rasterized, not selectable, searchable
or semantically accessible. This is not editable slide output. If the user's
destination needs those properties, choose a text-bearing artifact producer
using [artifact routing](artifact-routing.md) before committing to this route.

Export after structural validation, rendered QA, and visual acceptance when the
PDF is a final or release artifact. A successful PDF export preserves the
current rendered frames; it does not upgrade a visually unaccepted deck into a
shippable artifact.

Run:

```bash
node <skill>/scripts/export_pdf.mjs deck.html deck.pdf --proof proof/pdf-report.json
```

Use `--compact` for 1280x720 screenshots when file size matters.

For a local deliverable, the output may use a caller-selected name such as
`strategy-review.pdf`. The report's `pdf` and `artifact.path` fields record that
actual basename; keep the file and its proof together without renaming either
identity. For a library release, export directly to `deck.pdf` as shown above.
The packager requires that canonical source filename and never rewrites the
PDF proof to accommodate a renamed file. Library URLs remain `deck.pdf`.

Release packaging requires `proof/pdf-report.json`. Its schema v2 binds the
bytes actually served from the deck and local resources to the exact exported
PDF digest and page count. Keep it unchanged with the PDF. Re-export when the
source or PDF changes; a matching page count cannot repair stale proof.
External render resources must be localized or inlined before release-bound
export. The exporter can still report an exploratory render with external
resources, but that report cannot admit an immutable release.

## Report

Report:

- output PDF path;
- file size;
- PDF page count;
- HTML slide count;
- whether page count equals slide count;
- that animations/interactions become static frames and text is rasterized.

If export fails, the accepted HTML remains usable. Repair the export when PDF
is part of the request; if blocked, deliver the HTML with the specific remaining
PDF failure. A requested PDF or release remains incomplete until export works.
