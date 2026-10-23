<img src="skills/deck-studio/assets/deck-studio.png" width="72" height="72" alt="">

# Deck Studio

Turn an idea, notes or an existing deck into a presentation an audience can
follow, read and use. Deck Studio helps an agent shape the argument, choose a
visual system, produce HTML, PDF and native editable PowerPoint, and inspect
every rendered slide. **Decks emits all three formats**, without requiring an
extra PowerPoint request.
A finished local deck is a complete result; hosting is optional.

> Turn these notes into a decision deck for leadership. Resolve what is missing,
> build it, and give me the checked local deck. Do not publish it.

Start with rough notes, approved content or a deck to revise. The package
includes 56 visual systems, from compact style recipes to developed layouts,
and a fixed-stage HTML runtime with keyboard and touch navigation.

**One deck, three deliverables.** HTML decks scale uniformly to the screen;
they do not reflow into a mobile reading layout. PDF pages are slide images,
not searchable text, editable slides or a semantically accessible document.
Native PowerPoint uses editable text, shapes, tables and charts, rather than
slide screenshots. It is authored directly, not converted from arbitrary HTML.
Other document and accessibility needs still route to their proper artifact tool.

**One meaning source, format-specific composition.** HTML and PPTX compositions share the approved
meaning source; each format has its own layout and acceptance. A PPTX file does
not prove that its HTML companion matches, or vice versa. The 56 visual systems
are composition resources, not a claim that every design is a prebuilt PowerPoint
template.

## Install and prepare the producer

Install `deck-studio@tiziano-ai` from the shared
[Tiziano AI plugin catalog](https://github.com/Tiziano-AI/plugins).
Choose your host:

```bash
# Codex
codex plugin marketplace add Tiziano-AI/plugins
codex plugin add deck-studio@tiziano-ai --json
```

```bash
# Claude Code
claude plugin marketplace add Tiziano-AI/plugins --scope user
claude plugin install deck-studio@tiziano-ai --scope user
```

If the catalog is already registered, refresh it rather than adding it again.
See [Installation and distribution](docs/DISTRIBUTION.md) for package discovery,
updates and removal. Installation does not start a service, publish a deck or
create a hosted account.

Local production requires a local executor, Node.js 24.22.1+, npm and Python 3.9+.
Resolve the installed package from the host, then run from its
`skills/deck-studio` directory, or the same directory in a source checkout:

```bash
node scripts/setup_runtime.mjs --check
# Explicit preparation downloads locked npm packages and Chromium:
node scripts/setup_runtime.mjs --install
```

Dependencies and Chromium stay inside the selected package. Setup neither
copies global skills nor changes other installations.

Native PPTX generation uses the same package's locked PptxGenJS dependency.
Rendering its output also requires an available LibreOffice and Poppler
(`soffice`, `pdftoppm`, `pdffonts`); setup does not install these system applications.
Follow the [native PowerPoint guide](skills/deck-studio/references/native-pptx.md)
for authoring, font requirements and inspection.

Refresh the host's plugin discovery and start a new chat. Invoke
`$deck-studio:deck-studio` in Codex or `/deck-studio:deck-studio` in Claude Code,
then describe the audience, the result you want and the material you have.

## Produce and inspect

The skill carries the work from audience, argument and evidence through visual
composition and inspection. You do not need to choose a template or complete a
questionnaire before asking for a deck. It asks only for missing decisions that
change the result.

For direct script use, follow the [packaged skill](skills/deck-studio/SKILL.md)
and [rendered QA guide](skills/deck-studio/references/rendered-qa.md).

From the deck folder, set `S` to the skill's scripts directory:

```bash
S="/absolute/installed/package/skills/deck-studio/scripts"
python3 "$S/validate_deck.py" deck.html
node "$S/render_qa.mjs" deck.html --out proof
# Inspect every slide, reading size and navigation; record the actual review.
python3 "$S/validate_visual_review.py" proof/visual-review.json \
  --report proof/report.json --deck deck.html
node "$S/export_pdf.mjs" deck.html deck.pdf --proof proof/pdf-report.json
```

Mechanical checks do not establish good communication or visual acceptance.
Changed HTML, resources, screenshots or PDF invalidate the proof they affect.
Keep review records outside the audience's slides.

## Optional library

The gateway gives audiences a public gallery and, optionally, a collection
opened with an access key. Agents manage releases, public visibility, keys and
assignments through the CLI/API. There is no web admin console or slide editor.

Hosted deck links open a presentation-first viewer: slides fill the viewport,
and the existing auto-hiding bottom control pill includes a home icon for
**Back to collection** (shortcut **B**), or **Back to public decks** for a public
gallery entry. The refresh icon restarts at slide one (shortcut **R**); arrows
and slide count remain together in the same pill. The gateway supplies the
return control, including for existing releases; authors do not add it to
their slides. Share the canonical `/decks/<deck_id>/<release_id>/` viewer URL.
The explicit `deck.html` path remains the unchanged standalone presentation,
with slide navigation but no collection return control or shortcut.

The collection page uses the viewing key's stored label as its heading and
browser title, rather than a fixed generic name.

A deck may be public, assigned to several keys, both, or neither. Selecting a
new deck starts private and unassigned; selecting a later release of an existing
deck preserves its public flag and assignments. Inspect that audience before
replacing a selected release. A keyed collection does not automatically merge
public decks; they remain separately available. An owner viewer can read all
selected decks but cannot administer them. Viewer keys are bearer secrets, not
verified identities: recipients can forward them, and revocation cannot recall
downloaded copies.

Self-hosting requires **Node.js 24.x, at least 24.22.1, and Python 3.9+**, an
external artifact library, a separate SQLite policy file and an independent
management bearer. Production also needs HTTPS, durable storage and a single
gateway writer. Only trusted operators may publish: deck HTML is active
same-origin content, not sandboxed uploads from untrusted authors.

Start with the [publishing guide](skills/deck-studio/references/publishing.md)
for release packaging and audience commands. It requires a committed source
checkout and library-specific render/PDF proof; a local render alone does not
qualify a release for hosting. [Hosted deployment](docs/HOSTED_DEPLOYMENT.md)
covers the gateway image and storage. [Architecture](ARCH.md) explains the
release and access boundaries.

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

## License

Original source is [MIT](LICENSE). Adapted templates and bundled fonts have
[their own notices](skills/deck-studio/templates/THIRD_PARTY_NOTICES.md).
Retain the relevant notices when reusing them. Bundled brand assets do not
grant rights to use a third party's identity.
