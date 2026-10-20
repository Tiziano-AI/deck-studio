---
name: "deck-studio"
description: "Decks: create, revise and publish communication decks. Start from a vague request, approved content, an existing deck or an accepted Decks release. Shape narrative and evidence; produce fixed-stage HTML/PDF or use the appropriate artifact skill for editable slides and documents. Publication targets the Decks library; not generic websites, format-only document edits or unrelated hosting."
---

# Deck Studio

Make the communication work for its receiver: a live audience can follow the
argument, a reader can understand it without a narrator, and either can see the
intended next step. Carry the request from its actual starting point to the
requested artifact or Decks-library publication. A finished local deck is a
complete outcome when publication was not requested.

## Start at the useful point

Use what the user supplied. A vague request needs enough understanding of
audience, what the audience already knows, outcome, live versus async use, and
evidence to choose a story and a register.
Approved content needs composition, in the register it names or, when it names
none, the one its audience calls for. An existing deck needs inspection of the
requested change. An accepted release needs admission and publication, not a
new interview or redesign.

Ask only when a missing answer changes meaning, audience risk, artifact choice
or authority. Choose routine narrative and visual details within the mandate;
do not require a questionnaire, human content approval, aesthetic approval or
preview gallery merely to proceed. A supplied lock, explicit review checkpoint
or consequential uncertainty still binds. Stop at analysis when analysis is
the requested result; otherwise create the artifact.

For narrative uncertainty use [communication.md](references/communication.md)
and the diagnostic sections of [DECKS.md](DECKS.md). Its archetypes, density
ranges, variants and failure modes are judgment aids, not mandatory outlines.
Choose the medium early: editable slides, text accessibility, searchable PDF
and documents can change the production route. See
[artifact-routing.md](references/artifact-routing.md) for those cases.

## Keep one semantic source

Use the existing approved outline, brief or deck as the stable meaning source.
When creating content, establish a compact source containing audience and
register, thesis, sequence, headlines, claims and evidence, relevant
qualifications, and ask. Write its slide lines in the voice the audience will
receive, and keep guidance for the writer (guardrails, corrections, reasons for
a cut, evidence classes) in a separate backstage part.
Reuse it through composition, revision and review; do not create a separate
ceremony or duplicate lock on every pass.

An explicit user lock is fixed. For ordinary creation, the agent may settle and
revise the source within the user's authority. If composition reveals a needed
semantic change, explicitly reopen that part of the source and carry the
change through the artifact; ask only when it exceeds the mandate or alters
user-locked meaning. Visual variants consume the same semantic source. Narrative
alternatives are content exploration and must be identified as such.

Keep internal proof limits, work status, publication conditions and guardrails
about what not to imply backstage. A guardrail is kept by what the slides leave
out, never by stating its negation to the audience. Include limitations the
audience needs in their language, attached to the claim they qualify; a short
marker may repeat where an item can travel alone, such as a screenshot, but its
explanation is given once. A proof label, template slug or local path is not
slide copy.

## Compose for the real material

Choose a visual register that fits the audience and argument, then build the
hardest representative slide early: evidence, comparison, diagram or dense
reading page often reveals more than a cover. A useful template accelerates
this; it does not decide the story. [Composition](references/composition.md)
explains hierarchy, density, pacing and visual judgment.

For template selection start with [the catalog](templates/README.md) or
`templates/index.json`, then read only the selected design and layout resources.
[Template selection](references/template-selection.md) explains fit and
optional style comparisons. Use [visual assets](references/visual-assets.md)
when imagery, screenshots, diagrams, charts or brand references carry the
message. Generate or retrieve assets only when they earn their place.

For HTML, read [deck-runtime.md](references/deck-runtime.md) before authoring.
The canonical `runtime/deck-stage.css` and `runtime/deck-stage.js` keep a
1920×1080 stage that scales uniformly, with keyboard and touch navigation.
Inline runtime and assets for a standalone file when practical; otherwise
deliver a self-contained folder with relative resources. Phone letterboxing is
not mobile-native reading layout.

## Inspect, repair, deliver

Run the installed package's structural validator and renderer from the deck
folder, using the resolved package path in place of `<skill>`:

```bash
python3 <skill>/scripts/validate_deck.py deck.html
node <skill>/scripts/render_qa.mjs deck.html --out proof
```

Inspect every rendered slide, the intended reading size and navigation. Compare
the result with its semantic source. Repair clipping, illegible density,
misleading evidence, content drift or a visual system that obscures the message.
Mechanical QA supplies signals; it cannot make the visual judgment for you.
Read [rendered-qa.md](references/rendered-qa.md) to interpret its report and
[visual-acceptance.md](references/visual-acceptance.md) when recording acceptance.
Acceptance is the producing agent's inspection, not a required human approval.

Render reports bind exact deck/resources and screenshot bytes; visual review
binds the exact report digest. Changed source or evidence invalidates affected
proof. Keep these records outside the audience's slides. If inspection is
unavailable, identify the artifact as an unaccepted candidate rather than ready.

Export PDF when requested, or for a release, using
[pdf-export.md](references/pdf-export.md). This export contains slide images:
text is not selectable or semantically accessible, and interactions become
static frames. Do not promise searchable, editable or accessible PDF from it.

Deliver usable artifact links, brief navigation guidance and material remaining
limitations. Keep proof detail proportionate to the request, with proof files
reachable. Do not equate local acceptance with installation, runtime selection
or hosted availability.

## Publish only when requested

Read [publishing.md](references/publishing.md) for the complete library procedure
and [release-bundle.md](references/release-bundle.md) for byte-bound admission.
Publishing uses a resolved Decks checkout; the installed skill and a supplied
release bundle are not deployable workspaces. New publication requires an
immutable schema v3 release admitted by the canonical Python core. Capture
both QA and PDF with `--delivery library` before recording acceptance: the
profile applies the gateway's actual MIME, CSP and nested bundle-path rules.
Local capture remains valid for local delivery but is not proof of library
fitness. Use relative modules or inline data, not JSON fetches or dependencies
outside the bundle. See the publishing guide for retry and promotion rules.

Obtain explicit authorization for the exact library and audience before a
provider mutation, public grant or key delivery. Mutate only the authorized
service and its Decks-owned configuration. The local deck may be complete while this step
awaits authorization. Never infer hosting permission from artifact creation.

## Runtime availability

Resolve this package from the host, or use its source directory. Run
`node <skill>/scripts/setup_runtime.mjs --check` before producing; explicit
`--install` prepares its locked dependencies and package-local Chromium.
Preparation downloads packages/browser binaries but does not install global
skills, start services or publish content. Use this package's scripts, not a
presumed caller dependency tree. Publication checkout discovery is separate.
