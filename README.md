# Deck Studio

Turn an idea, notes or an existing deck into something an audience can follow,
read and use. Deck Studio combines communication judgment, 56 visual systems,
a fixed-stage HTML runtime, rendered inspection and PDF export. A finished local
deck is a complete result; hosting is optional.

> Turn these notes into a decision deck for leadership. Resolve what is missing,
> build it, and give me the checked local HTML and PDF. Do not publish it.

Approved content, revisions and accepted releases enter at their useful point,
without restarting an interview. Editable slides and documents route to the
appropriate artifact capability. The HTML producer's PDF contains slide images:
it is not searchable text, editable slides or a semantically accessible document.

## Install and prepare the producer

Deck Studio is a native plugin for Codex and Claude Code, maintained by Tiziano AI.
The public-source package uses `Tiziano-AI/deck-studio`; discovery belongs to the
shared [`Tiziano-AI/plugins` catalog](https://github.com/Tiziano-AI/plugins), not a
second marketplace in this product. Catalog installation requires both a public
release and a published catalog entry. Once that entry is available, install
`deck-studio@tiziano-ai` with the host-specific commands in
[Installation and distribution](docs/DISTRIBUTION.md).

The package contains the skill, doctrine, 56 visual systems and producer scripts.
Installation does not start a service, publish a deck or create a hosted account.

Local production requires a local executor, Node.js 20+, npm and Python 3.9+.
Resolve the actual installed package from the host, then use its
`skills/deck-studio` directory, or the same directory in a source checkout:

```bash
node scripts/setup_runtime.mjs --check
# Explicit preparation downloads locked npm packages and Chromium:
node scripts/setup_runtime.mjs --install
```

Dependencies and Chromium belong to that package, not a shared browser cache.
Setup prepares the producer only: it neither copies global skills nor removes
other installations. Missing runtime dependencies are a setup failure, not a
reason to silently borrow the caller's Playwright or browser.

Native removal stops that installation from supplying guidance; the host manages
its package cache and runtime. Another installation scope can remain enabled.
Decks, PDFs, external artifact libraries, independently running gateways and
policy stores remain with their owners. Stop services and revoke keys separately
when wanted.

## Produce and inspect

Use the skill's workflow to settle the audience, argument and evidence, then
preserve that meaning during visual execution. `DECKS.md` carries the full
communication doctrine; template metadata helps select a visual system rather
than forcing the story into a cover.

From the deck folder, with `S` set to the resolved package's `scripts` directory:

```bash
python3 "$S/validate_deck.py" deck.html
node "$S/render_qa.mjs" deck.html --out proof
# Inspect every slide, reading size and navigation; record the actual review.
python3 "$S/validate_visual_review.py" proof/visual-review.json \
  --report proof/report.json --deck deck.html
node "$S/export_pdf.mjs" deck.html deck.pdf --proof proof/pdf-report.json
```

Mechanical checks do not establish good communication or visual acceptance.
Changed HTML, resources, screenshots or PDF invalidate the proof they affect.
Keep proof backstage, not as badges in the audience's slides.

## Optional library

The gateway gives audiences a public gallery and, optionally, a collection
opened with an access key. Agents manage releases, public visibility, keys and
assignments through the CLI/API. There is no web admin console or slide editor.

A deck may be public, assigned to several keys, both, or neither. Selecting a
new deck starts private and unassigned; selecting a later release of an existing
deck preserves its public flag and assignments. Inspect that audience before
replacing a selected release. A keyed collection does not automatically merge
public decks; they remain separately available. An owner viewer can read all
selected decks but cannot administer them. Viewer keys are bearer secrets, not
verified identities: recipients can forward them, and revocation cannot recall
downloaded copies.

The gateway requires **Node.js 24.x, at least 24.21, and Python 3.9+**, an explicit artifact library, a SQLite
policy file outside that library, and a separate management bearer. Production
also requires HTTPS, durable storage and a single gateway writer. See
[architecture](ARCH.md) and the skill's [publishing guide](skills/deck-studio/references/publishing.md)
for setup, command examples and audience verification.

Packaging and access are separate:

Release packaging runs from a Git source checkout with a committed `HEAD`,
recorded as source lineage. A Git-free archive can author/render local decks,
but must become a reviewed, committed source repository before packaging.

```bash
python3 scripts/package_deck_release.py --spec /absolute/spec.json \
  --library-root /absolute/library --preserve-existing-catalog
python3 scripts/validate_product.py --release /absolute/library/decks/example/release-id
```

New selection requires an immutable schema v3 release bound to its rendered,
visual-review and PDF evidence. Packaging alone grants nobody access. The
catalog is operator metadata, not the source of audience policy.

For library delivery, capture both QA and PDF with `--delivery library` before
recording the review. This applies the gateway's exact MIME, CSP and nested
bundle-path contract. Relative JavaScript modules and inline data work; JSON
fetches, unknown resource types and dependencies outside the bundle do not.
The default local capture remains available and does not claim library fitness.
The gateway runs the same Python admission core as the packager and validator
before selecting a release; no browser runs in the gateway.

Packaging admits copied bytes outside `decks/`, then promotes the complete
directory under a stable library lock and atomically replaces the derived
catalog. Automatic IDs include the complete bundle and lineage. Retrying the
same bundle is a no-op; an occupied ID with different or incomplete bytes is a
conflict, not permission to overwrite. Release listing reports invalid neighbours
without hiding complete candidates.

The default gallery identity is neutral Decks. `DECKS_SITE_BRAND=smoothoperator`
selects the installation-specific SO treatment; it is not a requirement for
authoring or self-hosting, and individual decks keep their own design.

## Development

```bash
python3 scripts/validate_product.py
python3 -m unittest scripts/test_validate_deck.py scripts/test_release_admission.py scripts/test_packaging_atomic.py scripts/test_export_public_source.py
node --test scripts/test_setup_runtime.mjs
npm test --prefix publisher/static-server
# After preparing the selected producer package:
export DECKS_TEST_SKILL_ROOT=/absolute/prepared/deck-studio
python3 -m unittest scripts/test_proof_identity.py
node --test scripts/test_runtime.mjs
node --test scripts/test_delivery_profile.mjs scripts/test_delivery_gateway.mjs
git diff --check
```

`DECKS_TEST_SKILL_ROOT` selects the complete prepared producer for these
acceptance tests. Add `--library-root /absolute/library`
to the product validator to check a specific catalog and historical releases;
source validation by itself makes no claim about any library, installation or
hosted deployment.

## Public source boundary

Public tool releases contain a clean source snapshot, never a private development
repository's history or library. When preparing that boundary,
`scripts/export_public_source.py --out /absolute/new-directory` copies only the
reviewable tool source, without `.git`, releases, operational notes, dependencies
or runtime state. It is a projection of one engine, not another implementation.
Review the exact export before creating a public destination; the exporter is
not historical secret or copyright clearance. Do not publish a private checkout
or an archive of it instead.

Original source is MIT. Retain the [template notices](skills/deck-studio/templates/THIRD_PARTY_NOTICES.md)
and the separate font notices.
