# Publish to a Decks library

Use this when the user asks to publish, update or verify a library release.
Creating a local artifact never authorizes hosting, grants or sending keys.

## Resolve the library and its operator

The plugin contains the producer and guidance. Management needs a source checkout
with `scripts/package_deck_release.py`, `scripts/validate_product.py` and
`publisher/static-server/src/cli.mjs`. Resolve it from project configuration,
not by walking upward from an installed skill. A supplied release is an input,
not a server workspace.

Resolve the user's exact gateway URL, artifact library, policy path, provider
project/service and authorized audience. There is no built-in author deployment
or account to inherit. Read the available hosting provider's current guide before
a provider operation. A local result can be complete while hosting awaits authority.

## Prepare accepted bytes

Read [release-bundle.md](release-bundle.md). New selection requires schema v3,
not merely a valid historical manifest.

```bash
python3 scripts/package_deck_release.py --spec /absolute/spec.json \
  --library-root /absolute/library --preserve-existing-catalog
python3 scripts/validate_product.py --release /absolute/library/decks/example/r1
```

The spec is a JSON list. Each row supplies `source_dir`, `deck_id`, `audience`,
`desired_action`, `expected_slides`, and optional `title` and `release_id`.
The source must already contain bound render/review/PDF evidence. Packaging
does not create visual acceptance or public visibility.

Before review, run both `render_qa.mjs` and `export_pdf.mjs` with
`--delivery library`. These reports bind the current delivery profile. The
gateway runs the same standalone `release_admission.py` as packaging and
`validate_product.py --release`; there is no management-only hash shortcut.

Packaging stages outside `decks/` on the destination filesystem, admits the
copied bytes, then promotes under `.package.lock` and atomically replaces the
catalog. Every library writer must use `release_store.py`, never a second
transfer validator or an upload straight to a final release directory:

```bash
python3 skills/deck-studio/scripts/release_store.py promote /absolute/staging \
  --library-root /absolute/library
```

The staging directory is caller-owned, on the same filesystem, and outside
`library/decks/`; it may live beside the library. The command preserves existing
catalog membership by default and grants no audience. An identical admitted
destination returns `already_present`; changed, incomplete or linked bytes at
the same ID fail without overwrite. Inspect failures rather than deleting an
unknown residue. A failure after promotion reports that completed effect;
retrying reconciles it instead of copying twice. Do not delete the stable lock.

Omitting `--preserve-existing-catalog` intentionally replaces operator catalog
membership; never use it as a preliminary additive check. It does not alter
gateway policy. Releases are immutable: changed bytes require a new release id.

## Initialize a new gateway

Requires Node.js 24.x (24.22.1+) and Python 3.9+. Use a persistent library and SQLite file **outside**
that library. Initialization creates an empty policy; it does not expose any
existing release. Never initialize over an existing or damaged policy as a repair.

```bash
node publisher/static-server/src/cli.mjs policy init \
  --db /absolute/state/policy.sqlite --library-root /absolute/library
```

Configure `DECKS_LIBRARY_ROOT`, `DECKS_POLICY_PATH`, an independent high-entropy
`DECKS_MANAGEMENT_TOKEN` and the exact `DECKS_ORIGIN`. Production uses HTTPS,
`NODE_ENV=production`, durable database/artifact storage and a single writer.
The SQLite file must not live in a plugin cache or an ephemeral deployment image.
Set the intended `HOST` and `PORT`; local work defaults to loopback.
`DECKS_ADMISSION_PYTHON` optionally selects the Python executable. The server
distribution must retain the canonical relative layout with
`release_admission.py`, `proof_identity.py`, `validate_deck.py` and
`delivery_profile.mjs`; it does not need producer npm packages or Chromium.
`DECKS_SITE_TITLE` and `DECKS_SITE_BRAND` optionally configure the gallery,
whose default identity is neutral Decks. Individual decks retain their own design.

Supply secrets through a value-safe provider path or process environment.
Never dump provider variables, pass tokens in command arguments, commit them,
put them in URLs or copy them into evidence. Viewer keys and the management
bearer are different credentials. Neither plugin installation nor a Git push
starts or deploys a gateway.

## Manage through the CLI

Run `node publisher/static-server/src/cli.mjs --help` for the current command
contract. Remote calls select `--url` or `DECKS_URL`; the management bearer comes
from `DECKS_MANAGEMENT_TOKEN` or `--token-stdin`. HTTPS is required except
loopback development.

```bash
node publisher/static-server/src/cli.mjs releases list
node publisher/static-server/src/cli.mjs decks publish example --release r1
node publisher/static-server/src/cli.mjs decks access example
node publisher/static-server/src/cli.mjs keys issue --label North
node publisher/static-server/src/cli.mjs decks grant example --key KEY_ID
# Only when the public audience was authorized:
node publisher/static-server/src/cli.mjs decks public example --value true
```

Release listing returns `releases`, per-candidate `issues` and `complete`.
An invalid neighbour does not hide good releases. `complete` means the scan
finished, not that every candidate is valid; unreadable subtrees make it false.

Selecting a new deck starts private and unassigned. Selecting a later release of
an existing deck preserves its current public flag and key assignments; inspect
access before replacing it. Keys may have collection scope or `--scope all`
for owner viewing, never administration. A deck can be assigned to multiple keys.

Issue and rotation reveal the secret once in their explicit result. Keep that
result private and deliver it only through an authorized channel. The CLI never
sends keys. Normal lists expose IDs and labels, not secrets or verifiers.
After outcome-unknown issue, list keys, identify the exact created key and
deliberately rotate or revoke it; do not blindly issue again. An uncertain
rotation may already have invalidated the old secret and sessions. Inspect the
same key and explicitly rotate it again if necessary. Inspect state before
retrying other mutations.

`keys revoke` invalidates the key's existing sessions. `decks revoke` removes a
key assignment. Keys are bearer secrets that can be forwarded, not verified
recipient identities. Neither action recalls downloaded copies.

## Verify the actual audience path

Use separate anonymous, collection and owner-viewer sessions, plus management:

1. Public gallery and public deck links work without a key.
2. A collection includes only its assigned decks; public decks are separate.
3. A one-deck collection opens directly and browser Back remains usable.
4. Another collection's HTML, PDF, cover and local assets cannot be read.
5. Revoked keys and removed assignments lose access in already-open sessions.
6. Viewers, including owner viewers, cannot read old releases, full catalogs,
   manifests, proof, lineage or management APIs.
7. Login, change-key and sign-out work in a real browser; inspect desktop and
   narrow layouts, light/dark themes and empty/error states.
8. Read provider health, exact deployment identity and admitted byte digests
   through management. Check bounded logs without printing secrets.

Do not call a successful deploy receipt usable delivery. On an interruption,
reconcile the exact release, policy and deployment before repeating the effect.
Keep existing historical libraries unchanged until their owner authorizes a
specific cutover; the new gateway has no automatic legacy password or grant import.
