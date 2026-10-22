# Deck Studio architecture

## Owners

- `skills/deck-studio`: proportional communication discovery, semantic source,
  visual composition, 56 systems, 1920×1080 HTML runtime, render inspection and
  screenshot PDF, plus native editable PowerPoint authoring and inspection.
  Its doctrine copy is byte-identical to root `DECKS.md`.
- `scripts/package_deck_release.py`: immutable byte-bound bundles and the
  operator catalog in an explicitly selected library.
- `skills/deck-studio/scripts/release_admission.py`: the single read-only
  admission core used by packaging, source validation and gateway selection.
- `skills/deck-studio/scripts/release_store.py`: stable cooperative library lock,
  same-filesystem staging/promotion, idempotent reconciliation and atomic catalog.
- `skills/deck-studio/scripts/delivery_profile.mjs`: standalone MIME, CSP and
  audience-path contract imported by capture and gateway; its complete bytes
  identify the profile bound by library QA and PDF reports.
- `publisher/static-server`: audience gateway, policy, management API and CLI.
- `scripts/export_public_source.py`: clean source snapshots for build and
  distribution, excluding Git metadata, dependencies and runtime data.

One implementation serves local production and optional hosting. The plugin
does not need an MCP server, a hosted account or a second publishing engine.
Native plugin installation owns discovery; explicit runtime setup installs only
locked dependencies and hermetic Chromium inside the selected skill package.
The native producer uses that package's pinned PptxGenJS, not a host-private
artifact SDK or a second slide DSL. Its author module calls the upstream API
directly. Rendering uses available LibreOffice and Poppler with an isolated
profile; setup does not install these system applications.

## Intake/render boundary

The agent starts from the actual request, approved content, existing deck or
accepted bundle. Before visual execution it settles a semantic source: audience,
register, thesis, sequence, headlines, claims and evidence, qualifications and
ask. Approved meaning is not silently changed for fit. Reopen the affected
content when copyfitting would change it; ask only for decisions belonging to
the person. Optional style exploration preserves identical meaning.

Internal proof limits, production status and drafting guardrails stay backstage.
Audience-needed limitations stay attached to their claims in the audience's
language. Templates aid composition; they do not decide the story. Other formats
route to their proper artifact capability with the semantic source intact.
Native PowerPoint stays here: format-specific compositions consume the same
approved meaning source. There is no universal HTML/CSS converter or arbitrary
PPTX importer. Native text, tables, charts and diagrams retain the structures
needed for editing; exported PPTX bytes get separate render and visual review.

## Release bytes and policy are different owners

An external library has `decks/<deck_id>/<release_id>/` folders containing
`deck.html`, `deck.pdf`, optional `deck.pptx`, `deck-manifest.json`, local presentation resources and
`proof/`. New manifests use schema v3; render, review and PDF records bind exact
bytes. A dedicated `cover.png` may copy the already-bound first-slide screenshot
byte for byte. Audience delivery never exposes `proof/` to obtain a cover.
The optional native companion has an explicit manifest field and separate
byte-bound native inspection/render/review. It cannot enter as an unreviewed
generic HTML asset. Native source modules remain at the authoring owner.

Library capture mounts the bundle at `/decks/qa/candidate/`, applies that same
delivery profile, and records its identity in render v3 and PDF v2 reports
before review. Local capture is still general-purpose; a successful local
capture without the bound profile cannot establish library admission. CSP
violations observed during capture fail even when deck code catches the error.
Capture exercises rendered slides and navigation, not every future execution
of arbitrary JavaScript. Relative modules or inline data replace JSON fetches;
no new data-fetch permission is granted.

The admission core is stdlib-only. Its standalone import closure is
`release_admission.py`, `proof_identity.py`, `validate_deck.py`,
`pptx_inspection.py` and the profile
module read as bytes. The gateway asynchronously runs that fixed core without
a shell, with a minimal token-free environment, bounded concurrency, output
and process lifetime. It matches returned release/manifest/profile identities
against the loaded contract and rechecks bytes immediately before the policy
transaction. Helper failure leaves selection and access unchanged. Per-request
Node path, policy and byte checks remain delivery defenses, not a second proof
validator. A gateway distribution must carry this closure at its canonical
relative location, plus Python; producer npm dependencies are not needed.

The shared store admits same-filesystem staging outside `decks/`, then locks
the persistent `.package.lock` inode, rechecks and renames a complete bundle.
Cooperating writers never unlink the lock. An identical admitted destination
is `already_present`; a different, incomplete or linked destination is a
conflict. Automatic IDs hash the canonical full manifest except `release_id`,
including sorted artifact identities and source lineage. Catalog writes use
a temporary file plus `os.replace` under the same lock. Rename provides atomic
visibility, not universal power-loss durability. Residues are reported rather
than automatically deleted; staging is never enumerated or served. A partially
successful multi-release run preserves promoted bundles and reports them.

Historical v1/v2 bundles remain immutable. Explicit library validation can check
their consistency, but new selection requires v3; there is no automatic import,
audience grant or retrofit of old acceptance. Packaging writes `visibility:
unassigned` as descriptive metadata. Actual public visibility, current release
and key assignments live only in the policy database.

The policy SQLite file is configured outside the artifact library. Initialization
is explicit and empty. Missing, corrupt or unsupported policy refuses startup;
the gateway does not reconstruct grants from a catalog or manufacture a new
database. Run one gateway writer with durable library and database storage.
Startup also exercises a real SQLite page/journal write in a rolled-back
transaction, including an empty policy. Merely opening the database or obtaining
its write lock is not evidence that mounted storage is writable. This probe
preserves policy bytes and grants; ordinary audience reads do not run it.

## Viewer and management paths

`GET /` shows public decks. `GET /collection` shows only a viewer key's assigned
decks, or all selected decks for an owner viewer. A single-deck collection can
open directly after login. `GET/POST /login` creates an opaque server-side
session; `POST /logout` ends it. Public and keyed galleries stay distinct.
`/ui/` contains only the fixed gallery resources and licensed fonts.

Viewer sessions and keys cannot manage. The separate management bearer accesses
`/api/v1`; the CLI exposes the same policy and release operations. It cannot be
used as a viewer key. Key issue/rotation returns the secret once; list and
diagnostics never return it. An uncertain issue result must be resolved by key
listing and explicit rotation/revocation, not blind reissuance.

Authorization is evaluated on every HTML, PDF, PPTX, cover, font, image and other
presentation-resource request, including already-open viewer sessions. Revoking
a key or removing an assignment takes effect without waiting for session expiry.
Only the current release is audience-readable. Old releases, the full catalog,
manifests, proof and lineage remain management-only, even for owner viewers.

Files must appear in the manifest allowlist, remain within the library, and not
traverse symlinks. Immutable bytes must not be modified underneath the gateway;
new content means a new release. Only trusted publishing operators supply decks:
deck HTML and scripts are active same-origin content, not sandboxed uploads from
untrusted authors. Bearer keys do not establish a recipient's identity or prevent
forwarding and downloaded copies.

Sessions use HttpOnly/SameSite cookies and Secure in production. Origin and CSRF
checks protect session mutations; login failures and request bodies are bounded.
Private responses are not shared-cache content. A reverse proxy must preserve
the configured origin; untrusted forwarding headers are not an authorization or
rate-limit identity. Production management is HTTPS or loopback for local use.

## Configuration

- `DECKS_LIBRARY_ROOT`: absolute artifact root, explicitly selected.
- `DECKS_POLICY_PATH`: absolute policy SQLite path outside the library.
- `DECKS_MANAGEMENT_TOKEN`: independent high-entropy management bearer.
- `DECKS_ORIGIN`: exact external origin, HTTPS in production.
- `DECKS_ADMISSION_PYTHON`: optional Python executable, default `python3`; never
  a request-supplied helper, digest or validator path.
- `DECKS_SITE_TITLE`, `DECKS_SITE_BRAND`: optional gallery identity; neutral by default.
- `PORT`, `HOST`, `NODE_ENV`: process binding and environment. Local work defaults
  to loopback; the deployment supplies its intended binding.

Deployment selects the exact project, service, persistent storage, origin and
secrets separately. A source push deploys nothing. No provider identity or author
library is part of the public plugin.

## Evidence layers

Source syntax and package validation do not prove access policy. HTTP tests
exercise anonymous, separate collections, owner and management paths, direct
resources, revocation, persistence and hostile paths. Real browser use establishes
gallery rendering, login, links, navigation and responsive behavior. Producer
tests establish rendering/proof mechanics, not narrative or aesthetic acceptance.
Installed discovery and hosted delivery each require evidence at that destination.
