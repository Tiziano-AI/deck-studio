# Installation and distribution

Deck Studio packages communication guidance, 56 visual systems and a local
HTML/render/PDF and native editable PowerPoint producer. Local files are a complete result. The optional
audience gateway is a separate service that you configure and operate; installing
the plugin neither deploys it nor publishes your content.

## Package identity

| Item | Identity |
| --- | --- |
| Product / publisher | Deck Studio / Tiziano AI |
| Plugin name | `deck-studio` |
| Source repository | [`Tiziano-AI/deck-studio`](https://github.com/Tiziano-AI/deck-studio) |
| Shared discovery catalog | [`Tiziano-AI/plugins`](https://github.com/Tiziano-AI/plugins), named `tiziano-ai` |
| Installed plugin ID | `deck-studio@tiziano-ai` |

The plugin lives at the repository root, with portable `plugin.json`, native
`.claude-plugin/plugin.json` and `skills/`.
The shared catalog owns host-specific discovery entries and pins the selected
release. The `package.json` files are marked private; native Git installation
does not require npm publication.

## Requirements

Local authoring needs a host with native plugin support and a local executor,
Node.js 20+, npm, Python 3.9+ and write access to the selected plugin package.
Git-based installation also needs Git and access to the catalog
and product repositories. Explicit runtime preparation downloads the locked npm
dependencies and Chromium. No API key, hosted account or gateway is required.

The HTML PDF producer renders slides as images. Native PowerPoint generation
uses locked PptxGenJS in the same package, without an OpenAI-only artifact runtime
or a PowerPoint installation. Its render inspection needs separately available
LibreOffice and Poppler; setup does not install system applications. Fonts must
be available in the renderer and on recipients' machines unless the file embeds
them. The producer does not promise font embedding or arbitrary HTML/PPTX import.
Use the appropriate document capability for semantically accessible documents.

## Codex

Add the catalog if it is not already registered, then install:

```bash
codex plugin marketplace add Tiziano-AI/plugins
codex plugin marketplace upgrade tiziano-ai
codex plugin add deck-studio@tiziano-ai --json
codex plugin list --json
```

If `tiziano-ai` is already registered, refresh that catalog rather than adding
another source. The native install command is `plugin add`, not `plugin install`.
Check that the result identifies `deck-studio@tiziano-ai`, then resolve the actual
`installedPath` from the native result. Do not guess a cache path or prepare a
different source checkout. Continue with [Prepare the selected package](#prepare-the-selected-package).

Refresh the desktop host as it requires and use a new chat to check discovery.
The skill is namespaced as `$deck-studio:deck-studio`. Verify its plugin ID and
package root if another marketplace or standalone skill supplies Deck Studio.

## Claude Code

Add the catalog if it is not already registered, then install:

```bash
claude plugin marketplace add Tiziano-AI/plugins --scope user
claude plugin marketplace update tiziano-ai
claude plugin install deck-studio@tiziano-ai --scope user
claude plugin list --json
```

Use the existing `tiziano-ai` catalog if it is already registered. These commands
deliberately select the user scope; choose another native scope only when that
is the installation you intend to manage. Inspect the exact plugin ID, version
and installation record, resolve its package root, then continue with
[Prepare the selected package](#prepare-the-selected-package).

Reload plugins or restart Claude Code as the host requires. In a new session,
invoke `/deck-studio:deck-studio` and verify that it resolves to the intended
package rather than a competing installation.

## Prepare the selected package

Replace `/absolute/installed/package` with the package root returned by your host:

```bash
node "/absolute/installed/package/skills/deck-studio/scripts/setup_runtime.mjs" --check
# If preparation is needed, explicitly install this package's locked runtime:
node "/absolute/installed/package/skills/deck-studio/scripts/setup_runtime.mjs" --install
node "/absolute/installed/package/skills/deck-studio/scripts/setup_runtime.mjs" --check
```

`--install` runs `npm ci` with lifecycle scripts disabled and prepares hermetic
Playwright Chromium inside the selected package. It does not borrow another
installation's Playwright or browser cache. The plugin root is dependency-free;
the producer's manifest and lockfile live in `skills/deck-studio`.

`--check` validates the locked dependencies and package-local browser, launches
Chromium, renders a probe and creates an in-memory PDF. It does not check Python
availability; verify Python 3.9+ separately. Setup does not install or copy global
skills, change native plugin configuration, remove predecessors, start services
or publish anything. Native hosts, not this setup script, own installation.

A first request can be:

> Turn these notes into a decision deck for leadership. Resolve what is missing,
> build it, and give me the checked local HTML and PDF. Do not publish it.

Successful setup establishes the producer runtime, not the communication quality
of a future deck. Follow the packaged skill to inspect every slide and navigation
before delivery.

## Update or remove one installation

For Codex, refresh only the selected catalog and use native installation again:

```bash
codex plugin marketplace upgrade tiziano-ai
codex plugin add deck-studio@tiziano-ai --json
codex plugin list --json
```

For Claude Code, update the intended scope:

```bash
claude plugin marketplace update tiziano-ai
claude plugin update deck-studio@tiziano-ai --scope user
claude plugin list --json
```

After either update, resolve the selected package again, prepare its own runtime
and refresh host discovery. A release must advance the plugin manifest version;
changed source bytes alone do not establish an installed update.

To remove only Deck Studio from the installation above:

```bash
# Codex:
codex plugin remove deck-studio@tiziano-ai --json
# Claude Code:
claude plugin uninstall deck-studio@tiziano-ai --scope user
```

The native host manages its registration, package cache and package-owned runtime.
Another installation scope can remain enabled. Do not remove the shared
`tiziano-ai` marketplace to uninstall one product. Your decks, PDFs, external
libraries, policy stores and independently running gateways remain. Stopping a
service or revoking audience keys is a separate operation.

## Competing installations

If another marketplace or standalone skill also supplies Deck Studio, inspect
the plugin ID and package root selected by the host. The skill invocation alone
cannot distinguish two enabled plugins with the same namespace. Disable or
remove only the installation you intend to replace, through its native host,
then check discovery in a new chat. Already-open chats may retain older guidance.

## Optional gateway

Self-hosting additionally requires Node.js 24.x at least 24.21, Python 3.9+, an
explicit external artifact library, a separate SQLite policy path and an
independent management bearer. Production needs HTTPS, durable storage and one
gateway writer. Plugin setup does not prepare these destinations or grant audience
access. See [hosted deployment](HOSTED_DEPLOYMENT.md) and the packaged
[publishing guide](../skills/deck-studio/references/publishing.md).

## Host references

The portable manifest and catalog layout follow the
[official OpenAI documentation](https://developers.openai.com/plugins/build/plugins).
Claude Code's [command reference](https://code.claude.com/docs/en/plugins/cli-reference)
and [manifest reference](https://code.claude.com/docs/en/plugins/manifest-reference)
describe its native lifecycle and package identity. Check your installed host's
command help when a command or scope is unavailable; do not substitute manual
cache or configuration edits.
