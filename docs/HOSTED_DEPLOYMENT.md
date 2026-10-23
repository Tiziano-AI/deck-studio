# Hosted gateway deployment

This guide covers building and operating the optional gateway with persistent
storage. Authoring, release admission and audience commands remain in the
[publishing guide](../skills/deck-studio/references/publishing.md). A local deck
is complete without this deployment. Building or pushing source deploys nothing.

## Image and build context

The Dockerfile contains Node 24 (at least 24.22.1), Python 3 with its standard
library, gateway/UI source, the canonical admission modules and the shared
delivery profile. Python verifies proof produced elsewhere; the server does not
render or perform visual review. There is no npm dependency installation,
Playwright, Chromium, template collection, Git checkout, policy or artifact
library in the image. The process runs as `node`, UID/GID 1000.

Build from a reviewed source commit. The source exporter creates a clean build
context without Git metadata, installed dependencies or runtime data. It reads
the working tree, so use a stable source snapshot rather than exporting while
another writer changes it. Run the source/export checks and review the exact
context before sending it to a builder. Keep artifact libraries, policy and
secrets outside it.

From that accepted source snapshot, choose a new absolute export path:

```sh
python3 scripts/export_public_source.py --out "$EXPORT"
# These are generated deployment inputs in the export, not new source owners.
cp "$EXPORT/publisher/static-server/.dockerignore" "$EXPORT/.dockerignore"
docker build --platform linux/amd64 \
  -f "$EXPORT/publisher/static-server/Dockerfile" \
  -t decks-gateway:candidate "$EXPORT"
```

`EXPORT` must name a new directory outside the source checkout. The context is
the **export root**, not `publisher/static-server`: the gateway imports canonical
modules from the skill. Docker ignores a subdirectory `.dockerignore` for a root
context, hence the explicit copy. The allowlist filter further restricts image
inputs; review the context before uploading it to Railway. Keep the
accepted source commit, base-image digest and resulting image ID with release
evidence. A later rebuild of the moving Node 24 tag is a new artifact to qualify.

## Railway service configuration

For Railway source deployment, upload only the reviewed export, with the canonical
`.dockerignore` copied to its root. Keep the export root as the build context;
do not scope the service root to `publisher/static-server`. Select the nested
Dockerfile with the service variable
`RAILWAY_DOCKERFILE_PATH=publisher/static-server/Dockerfile`, as described in
Railway's [Dockerfile documentation](https://docs.railway.com/builds/dockerfiles).

Configure the service through Railway's native settings or API. These values are
installation configuration, not a `railway.json` recipe or a product-owned IaC
framework. Resolve the exact account, project, environment, service, domain and
volume before changing them. For this uploaded-source recipe, the intended native
configuration is:

| Setting | Required value |
|---|---|
| Root-directory override (`rootDirectory`) | Unset (`null`); upload the export root |
| Source override (`source`) | Unset (`null`); no legacy repository or image override |
| Start-command override (`startCommand`) | Unset (`null`); use the Dockerfile's exec `CMD` |
| Config-file selector (`railwayConfigFile`) | Unset (`null`); no `railway.json` |
| `RAILWAY_DOCKERFILE_PATH` service variable | `publisher/static-server/Dockerfile` |
| Replicas | `1` |
| Durable volume mount | `/data` |
| Healthcheck path | `/healthz` |
| Healthcheck timeout | `120` seconds |
| Restart policy | `ON_FAILURE`, maximum retries `3` |

Read back the applied native configuration before deployment; an uploaded file
does not establish that the provider selected it. Confirm the build uses the
custom Dockerfile and the process uses its command. The gateway must listen on
the provider's `PORT`. The expected health response is HTTP 200 with
`{"ok":true}` from `GET /healthz`, including a probe whose Host is
`healthcheck.railway.app`. That endpoint checks policy availability before the
audience-host restriction; do not broaden the public origin or send a management
bearer to make the probe pass. Native configuration and a passing healthcheck
do not establish hosted audience acceptance.

## Storage and explicit initialization

Use one durable mount at `/data`, one gateway writer and one library writer
protocol. Keep immutable artifacts and audience policy separate:

```text
/data/
  library/
    .incoming/                 # unselected transfer staging, never audience data
    decks/<deck>/<release>/    # complete immutable bundles
    catalog.json              # generated operator index, not an access policy
  policy/policy.sqlite         # current selections, keys, grants and sessions
```

Configure the mount directories for UID/GID 1000 before starting the gateway.
The mounted filesystem replaces image-directory ownership; a Dockerfile `chown`
does not fix a provider volume. Verify actual reads, SQLite writes and journal
creation as the runtime user. Do not make the database world-writable, run the
gateway as root to hide an ownership problem, or store a database in the image.

Initialization is an explicit one-off operation on a new destination. With a
local Docker volume named by `VOLUME`, prepare directories and initialize:

```sh
docker run --rm --user 0 --mount "type=volume,src=$VOLUME,dst=/data" \
  --entrypoint sh decks-gateway:candidate -c \
  'mkdir -p /data/library/.incoming /data/policy && chown -R 1000:1000 /data'
docker run --rm --mount "type=volume,src=$VOLUME,dst=/data" \
  decks-gateway:candidate node /app/publisher/static-server/src/cli.mjs \
  policy init --db /data/policy/policy.sqlite --library-root /data/library
```

Use the ownership command only for a new, task-owned volume, not recursively on
existing shared storage. Policy initialization creates an empty store exclusively
and refuses to overwrite one. It grants no audience access. Missing or corrupt
policy must refuse startup; do not add startup auto-init, fallback grants or a
pre-deploy initializer. Railway mounts volumes at runtime, not during image build
or pre-deploy commands.

Runtime configuration:

| Setting | Value or source |
|---|---|
| `DECKS_LIBRARY_ROOT` | `/data/library` |
| `DECKS_POLICY_PATH` | `/data/policy/policy.sqlite` |
| `DECKS_ORIGIN` | Exact authorized external HTTPS origin |
| `DECKS_MANAGEMENT_TOKEN` | New independent high-entropy bearer, provided privately |
| `NODE_ENV`, `HOST` | `production`, `0.0.0.0` (image defaults) |
| `PORT` | Provider-assigned port, or image default 3000 |
| `DECKS_SITE_TITLE`, `DECKS_SITE_BRAND` | Optional installation identity |

Use distinct credentials for management and viewers. Pass
secrets through private environment/secret input, not arguments, source, image
build arguments, URLs, screenshots or logs. No startup step creates viewer keys.

## Transfer and immutable promotion

Transfer only an already admitted v3 bundle to a unique, previously absent
directory below `/data/library/.incoming/`. It must share the destination
filesystem and remain outside `decks/`. Directory upload is not an atomic
transaction; never upload directly into the final immutable path.

After transfer, run the image's canonical `release_store.promote_release`
function against that staged directory and `/data/library`. It admits the hosted
copy, acquires the library lock, rechecks bytes and the destination, renames the
complete bundle and replaces the generated catalog atomically. Do not replace
this with a second validator or an unchecked SFTP rename. The Python module path
is `/app/skills/deck-studio/scripts`; the image contains its full import closure.
No token or audience policy is needed for byte promotion.

For example, on an isolated Docker volume with a completed `NAME` transfer:

```sh
docker run --rm --mount "type=volume,src=$VOLUME,dst=/data" \
  -e PYTHONPATH=/app/skills/deck-studio/scripts decks-gateway:candidate \
  python3 -c 'import json, sys; from pathlib import Path; from release_store import promote_release; print(json.dumps(promote_release(Path(sys.argv[1]), Path(sys.argv[2]))))' \
  /data/library/.incoming/NAME /data/library
```

For hosted execution, invoke the same modules in the running qualified image
through the provider's native command transport, with explicit target IDs.

An identical existing bundle is a successful retry; a reused identity with
different bytes is a conflict, never an overwrite. A failure after promotion can
leave a complete release with a stale catalog; inspect the reported result and
retry the same bytes to repair that derived index. Preserve unknown staging or
partial destinations for their owner's recovery, rather than deleting them.
Atomic visibility does not promise crash durability against every storage fault.

Railway CLI supports volume-file upload to a mounted service with an active
deployment. Paths are relative to the volume root; `/library/.incoming/NAME`
maps to `/data/library/.incoming/NAME`. Avoid a trailing slash on a new directory
destination and inspect its resulting shape. Existing directories may acquire
an extra basename; after uncertain upload, inspect the actual tree and digests
before retrying. A transport receipt is not admission or promotion.

Only after promotion does the management API select the release. It re-runs
canonical admission against the hosted bytes before its SQLite transaction.
Helper failure, changed proof or a different delivery profile must retain the
previous selection and grants. Selection of a new deck starts private and
unassigned; replacement preserves that deck's existing audience. Packaging and
catalog reconstruction do not change either.

## Replacing an existing service

Before changing a live service, resolve its existing links, viewers, storage,
policy and deployed image. Preserve the intended audience through the change;
existing access is not permission to make content public. Historical v1/v2
bundles remain immutable and cannot be selected by relabeling old proof. New
selection requires admitted v3 bundles. There is no automatic library, password
or grant import from another service.

The gateway viewer is service-owned navigation, not a new release format.
Deploying it extends the existing auto-hiding bottom slide-control pill at
canonical `/decks/<deck_id>/<release_id>/` URLs for already selected releases without
republishing or rewriting their accepted artifacts. Its home icon returns to
the collection or public decks with shortcut **B**; the restart control uses a
refresh icon with shortcut **R**. The slide frame fills the viewport, with no
top bar or separate toolbar. Preserve the library, viewing keys and grants;
this change does not require a policy migration or credential rotation. Exact
`deck.html` and download paths stay raw.

Retain the exact previous image identity for recovery. A provider rebuild of
the same source is a new image to qualify, not the previous artifact. Mount and
verify storage with the new image before treating it as ready. Railway volumes
do not support replicas or concurrent deployments mounting the same storage;
keep one replica and do not promise an uninterrupted handoff.

## Qualification and recovery

Exercise the built image, not only source tests: Node/Python and imports without
the checkout; explicit initialization and non-root writes; complete release
admission; interrupted staging, idempotent retry and immutable collision;
replacement/restart with selections and revocations retained. Missing storage,
unreadable, unwritable or corrupt policy must refuse startup. An unavailable
admission helper must refuse selection without changing existing access.
Startup verifies database and journal writability with a rollback-only SQLite
write; `/healthz` checks policy identity and read integrity, not continuous write
readiness. Test its provider Host separately from the exact public-origin checks.
Do not broaden audience origin to make a health probe pass.

Use real browser audience paths for anonymous public access, separate A/B
collections and owner viewing. Test login, invalid key, change-key, sign-out,
the viewer's **Back to collection** link, direct HTML/PDF/PPTX/cover/resources,
and revocation in an already-open session. Confirm that slides fill the viewport
without a top bar or reserved navigation band. Check that the existing bottom
pill is the only control group and still auto-hides. Exercise its home icon by
pointer, keyboard and touch at desktop and narrow sizes, plus the **B** shortcut.
Collection entries return to `/collection`; public-gallery entries return to
`/` even when signed in. Check the refresh-icon restart and **R** shortcut,
previous/next arrows and slide count. Raw standalone HTML must have no
collection return control or **B** shortcut. Open a direct `#slide-N` link and
navigate inside the frame, checking the viewer URL's current hash. Verify raw
`deck.html` still matches its admitted digest and receives its own authorization
check. The viewer adds no Escape shortcut and does not remove the deck's
slide-history entries.

Verify that the gallery offers both PDF and editable PPTX downloads,
the downloaded bytes match the admitted files, and all three formats obey the
same selected-release and audience policy.
Old releases, catalog, manifests, proof and management must remain inaccessible
to every viewer. Inspect all slides and navigation for the first real release;
synthetic review fixtures qualify mechanics, not communication quality.

Record the exact provider deployment and image digest, mounted volume and
observed audience behavior before calling a cutover complete. Stop task-owned
local containers after QA. A source push or local image is not hosted delivery.

Contain a failing gateway and repair forward when no compatible safe image
exists. Application rollback does not roll back the volume or audience policy.
Restoring old policy can reactivate revoked keys, so reconcile subsequent
revocations before serving it. Never copy a live SQLite file alone with `cp`;
use SQLite's coherent backup API or a closed database. Persistence is not backup;
any provider-volume checkpoint policy needs its own agreed scope, not a second
permanent library or an archive of the source checkout.

Provider references: [Dockerfiles](https://docs.railway.com/builds/dockerfiles),
[restart policy](https://docs.railway.com/deployments/restart-policy),
[volumes](https://docs.railway.com/volumes),
[volume limits](https://docs.railway.com/volumes/reference),
[volume CLI](https://docs.railway.com/cli/volume),
[healthchecks](https://docs.railway.com/deployments/healthchecks),
[SQLite backup](https://sqlite.org/backup.html).
