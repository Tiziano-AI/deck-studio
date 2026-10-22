# Native editable PowerPoint

Use this path when the requested result is an editable `.pptx`. Deck Studio
authors native Office slide objects through its locked PptxGenJS dependency;
it does not put screenshots of entire slides into a PowerPoint container.
The producer runs in Codex, Claude Code or another local executor without an
OpenAI artifact runtime, hosted account or Microsoft Office installation.

## Author from the meaning source

Keep the approved audience, argument, claims, evidence and qualifications in
the existing semantic source. Compose the native deck from that source. If
HTML is also requested, share the meaning and adapt the composition to each
format, then inspect both. Do not promise lossless conversion of arbitrary
HTML/CSS or an imported PowerPoint's masters, animations or review history.

Author a JavaScript module that default-exports
`build(presentation, {PptxGenJS, sourceDir})`. It receives the upstream native
PptxGenJS presentation, not a second Deck Studio slide language. Use the
standard API for text runs, shapes, images, tables, charts, masters and notes.
Keep tables and chart data native where the recipient needs to edit them.
Use a coherent theme, appropriate slide dimensions and real typography rather
than rebuilding every table or chart from unrelated text boxes.

Author modules are executable code. Run only modules produced or reviewed as
part of the commissioned work, not an untrusted attachment merely because it
has the right extension. Keep source, required assets and final output together
at the artifact's owner; sources are not audience library downloads.

From the deck folder, set `S` to this selected package's `scripts` directory:

```bash
node "$S/setup_runtime.mjs" --check
node "$S/build_pptx.mjs" source/deck.mjs deck.pptx
python3 "$S/pptx_inspection.py" deck.pptx --expect-slides 11
python3 "$S/render_pptx.py" --check
python3 "$S/render_pptx.py" deck.pptx --out proof --expect-slides 11
```

Use the real slide count, not the example's eleven. Build preserves upstream
editable structures; the bounded OOXML inspector checks the actual exported
package. Render capture converts that exact file through LibreOffice in an
isolated profile, then rasterizes its pages with Poppler. Required tools are
`soffice`, `pdftoppm` and `pdffonts`; this package does not install system applications or
change global Office settings. A missing renderer is a render blocker, not
permission to invent acceptance or replace the deck with images.

For a working four-slide starting point, copy
[`examples/native-pptx/`](../examples/native-pptx/) into the deck's own source
folder. It demonstrates native text, connectors, a table and an editable chart
with an embedded workbook. Build its `deck.mjs` and use `--expect-slides 4`.
The example's chart values are explicitly invented, not product evidence.
The [upstream API documentation](https://gitbrent.github.io/PptxGenJS/docs/quick-start/)
owns the authoring methods.

## Inspect what the recipient gets

Read every rendered slide at its intended reading size and compare it with
the meaning source and any supplied visual reference. Repair missing text,
clipping, overlaps, broken table/chart labels and connector meaning at the
authoring module, rebuild, and capture the changed output again. Check the
native object counts and required table/chart structures separately: a good
render does not prove editability.

Fonts can change line breaks and fit. Use the requested/reference families,
verify which faces the renderer actually used, and leave room for reasonable
editing. Font names in the PPTX are not proof that those fonts are installed
or embedded. Unless embedding has actually been established, tell recipients
which fonts they need or choose an agreed portable substitute. Do not alter
the machine's font or Office settings to hide a rendering problem.

The native report and visual review are separate. A renderer can produce a
successful capture; only an actual inspection can accept its appearance.
Use the report/review contract in [release-bundle.md](release-bundle.md) when
the deck will enter the library. Keep proof backstage. State the render layer
honestly: LibreOffice inspection does not mean the deck was opened in
Microsoft PowerPoint. If practical editing is material, edit/save/reopen a
working copy in the recipient's application without changing the original.

After inspecting every native frame, record `proof/pptx-visual-review.json`.
Its complete shape is below; replace the placeholders and slide list with the
actual inspected report and judgment. Do not generate an accepted verdict just
because rendering succeeded.

```json
{
  "schema_version": 1,
  "kind": "native-pptx-review",
  "report": {
    "path": "proof/pptx-report.json",
    "sha256": "<SHA-256 of the exact inspected report file>",
    "bytes": 1234
  },
  "verdict": "accepted",
  "reviewer": "<reviewing person or agent>",
  "reviewedSlides": [1, 2, 3, 4],
  "notes": "<content fidelity, visual findings, actual fonts and remaining limits>"
}
```

Obtain the report identity from its exact bytes, for example:

```bash
python3 - <<'PY'
from pathlib import Path
import hashlib, json
p = Path("proof/pptx-report.json")
b = p.read_bytes()
print(json.dumps({"path": p.as_posix(), "sha256": hashlib.sha256(b).hexdigest(), "bytes": len(b)}))
PY
```

For a local-only deliverable the inspection can stay in the artifact's existing
README. A library companion requires this machine-checkable review; canonical
release admission validates it during packaging and selection.

## Local delivery and the library

A checked local `.pptx` is a complete result. It need not be published. If
publication is requested, a release can carry `deck.pptx` as an optional native
companion to its HTML/PDF, with its own byte-bound render and review evidence.
The gallery exposes it only for the same authorized audience and selected
release as the browser deck. An existing immutable release is not patched to
add a PowerPoint; package a new release under the publication authority.

Updating the producer, publishing source, refreshing native plugin discovery,
deploying the gateway and publishing a deck are different effects. A local
native build establishes none of the later ones.
