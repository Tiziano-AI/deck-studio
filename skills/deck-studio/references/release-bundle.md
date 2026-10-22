# Release bundle contract

Use this to package or admit a deck for new library selection. The
[publishing guide](publishing.md) owns destination resolution, access and hosted
verification. A local artifact need not become a release.

The packager requires a Git source checkout with a committed `HEAD` for its
lineage field. A Git-free source export supports local authoring and rendering,
not release packaging until its reviewed source has been committed.

Each new release contains `deck.html`, `deck.pdf`, `deck-manifest.json`,
`proof/report.json`, `proof/visual-review.json`, `proof/pdf-report.json`, all
hashed screenshots/contact-sheet files, and local render resources. PDF is
required for a release, optional for a local deck. Localize or inline mutable
remote render resources before admission.

An optional native companion adds `deck.pptx`, `proof/pptx-report.json`,
`proof/pptx-visual-review.json` and its bound render images under `proof/pptx/`.
The manifest declares
`pptx: {artifact: "deck.pptx", report: "proof/pptx-report.json", review: "proof/pptx-visual-review.json"}`.
All three identities are part of `artifacts[]`. A declaration with missing,
stale or unaccepted proof fails admission; an undeclared PowerPoint is not an
ordinary render resource. Existing HTML/PDF-only releases remain supported,
and already selected releases continue serving unchanged. Fresh library
publication, including reselection, requires proof bound to the current
delivery profile. Do not patch immutable releases: recapture and package a new
release before publishing under the updated profile.

The native report uses schema version 1 and kind `native-pptx`. It binds exact
PPTX bytes, slide count, the canonical native-object inspection and every
rendered slide image. The separate schema-version-1 `native-pptx-review` binds
that report's exact identity, names the reviewer, records an accepted verdict
and covers every slide in `reviewedSlides`. Capture success cannot author its
own visual acceptance. Follow [native-pptx.md](native-pptx.md) for production.
Native proof and authoring sources never become gallery downloads.

Schema v3 manifests carry identity/title/audience/desired action, slide count,
source lineage, `artifacts[]` with path/bytes/SHA-256, and the structural,
rendered, visual, fidelity, PDF and leak-check results. `visibility: unassigned`
is descriptive metadata; only the gateway's independent policy grants access.
Titles, audience and desired action are non-empty text; slide count is a
positive integer. V3 `source` records `generator: deck-studio`, the full Git
commit in `decks_commit`, and `brief_sha256`: SHA-256 of the exact title,
audience and desired action, each followed by LF. Additional source fields
are allowed, but cannot substitute for this lineage or proof.
The packager may copy the already-bound first desktop slide as `cover.png`
for the gallery without exposing proof to viewers.

Render report schema v3 binds exact source/resources and screenshots/contact
sheet. Visual review schema v2 binds the exact render-report digest. PDF report
schema v2 binds source, exported PDF bytes and page count. Packaging preserves
accepted bytes; a new manifest digest cannot rehabilitate stale proof.

New library admission requires `delivery_profile` in both render and PDF
reports, matching the SHA-256 of the canonical `delivery_profile.mjs` bytes.
Capture it with `--delivery library` before review; adding it to old reports
invalidates the review rather than renewing acceptance. Schema versions stay
render v3/PDF v2; `ok` still means successful capture, not library admission.
Local capture may omit the field.

The profile keeps delivery typed and bundle-relative: CSS, JavaScript modules,
images, fonts and supported media work. Inline data or a relative `.mjs` data
module replaces JSON fetches, which CSP forbids even if deck code catches the
error. Unknown MIME types, backstage resources and outside-bundle dependencies
cannot establish a library-ready capture. Exercise authored controls as well
as navigation; capture cannot prove every future path in arbitrary JavaScript.

```bash
python3 scripts/validate_product.py --release /absolute/release-directory
```

The bundle may be outside the checkout. Changed resources or missing evidence
require authorized producer repair, fresh affected proof and real inspection,
not an invented passing review during publication.

Historical v1/v2 bundles remain immutable. Explicit library validation can check
their consistency; they cannot pass new-publication admission. There is no
automatic migration, public grant or renewed visual acceptance.

Use new release ids for changed content. Operator catalogs are generated rather
than hand-edited and do not determine audience membership. Keep filesystem
paths, credentials, provider logs, raw receipts and unrelated screenshots out of
releases. Text scans catch only part of a privacy review.

Automatic IDs hash the canonical manifest excluding only `release_id`, with
sorted artifact paths. Metadata, PDF/proof/resource bytes and source commit
therefore all affect identity; no attempt timestamp or staging path does.
Same-source packaging retries are idempotent. Regenerating evidence or changing
lineage intentionally creates a different bundle. Promotion and catalog writes
share the stable store lock; immutable release names are never overwritten.

Manifest proof describes artifact bytes, not installed discovery, hosted
availability, browser rendering or the truth of a deck's substantive claims.
