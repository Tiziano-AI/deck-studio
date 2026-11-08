# Linux ARM64 runtime readiness

The package downloader supports Linux ARM64 for the pinned Chrome for Testing
version. Browser acquisition alone does not establish that the host can run
it. Qualify the selected installation under the same user and execution
environment that will produce decks.

## Prepare the actual consumer

Follow [installation and distribution](DISTRIBUTION.md) to resolve the native
host's installed package and prepare its locked runtime. Verify Node and Python
in the actual consumer environment: an interactive login shell and a native
agent session can have different `PATH` values.

Use that selected package's `setup_runtime.mjs --check`. The check exercises
the package-local browser, a screenshot, PDF generation and native PPTX
production. It does not install system libraries, LibreOffice, Poppler or fonts,
and does not establish the quality of a future deck.

Setup, HTML QA and PDF export share the
[package-owned browser launcher](../skills/deck-studio/scripts/browser_runtime.mjs).
It selects the exact version defined by the
[browser contract](../skills/deck-studio/scripts/browser_contract.mjs), with
Chromium sandboxing enabled. Do not substitute a personal browser, another
package's cache or a sandbox-disable flag to make a readiness check pass.

## Distinguish a missing runtime from a sandbox refusal

**Missing package dependencies or browser:** resolve the intended installation
again and inspect native plugin/catalog changes. A host refresh can replace a
same-version plugin cache with source alone. Complete the authorized native
catalog reconciliation before explicitly preparing that package again, then
check runtime retention after native initialization. This possible replacement
mechanism is not proof of what removed a particular installation's files.

**Browser present, but `No usable sandbox`:** stop the launch and have the host
administrator inspect the original failure and applicable OS policy. On Ubuntu,
AppArmor user-namespace restrictions can prevent downloaded Chrome from
creating its sandbox. Reinstalling npm dependencies does not repair that policy.
The error alone does not establish the exact denial or authorize a security
change; do not retry the refused effect through another launcher or privilege.

[Chromium's AppArmor guidance](https://chromium.googlesource.com/chromium/src/+/main/docs/security/apparmor-userns-restrictions.md)
explains the interaction with downloaded browsers. Any exception needs a
host-specific administrator decision, including its actual executable
attachment, exposure, load and recovery steps. Deck Studio does not install
an AppArmor profile or change global namespace restrictions.

A file-path allowance is not a byte-identity guarantee: replacement executables
at a user-writable attachment path can receive it. Depending on host policy,
other unconfined processes may also enter an unconfined profile that permits
user namespaces. Keeping Chromium sandboxing enabled does not eliminate that
additional kernel exposure. See
[Ubuntu's explanation](https://discourse.ubuntu.com/t/understanding-apparmor-user-namespace-restriction/58007).
Keep each host's installed policy, approval and incident evidence in its private
operational owner, not in this product guide.

## Accept the production path

After any approved host resolution, verify these separate layers:

1. Run the selected installed package's setup check as the original user.
2. Run the actual HTML QA and PDF export CLIs on a small synthetic deck.
   Inspect every rendered slide and PDF page, plus navigation; setup success
   alone does not exercise the complete delivery path.
3. Build a native editable PPTX and run `pptx_inspection.py`. Inspect its native
   text, shapes, tables and charts, then every rendered slide through the
   available LibreOffice/Poppler path. Follow the
   [native PowerPoint guide](../skills/deck-studio/references/native-pptx.md).
4. Verify skill discovery, command resolution and runtime retention after
   native host initialization. Another successful shell check does not prove
   the agent session selects the same package or environment.

Record the renderer and actual font substitutions. A LibreOffice render is not
inspection in Microsoft PowerPoint. PDF exports contain slide images, not
searchable text, and fixed-stage portrait letterboxing is not mobile-native
reading. Synthetic acceptance qualifies that installed production path, not
future cache durability or a model-authored deck. Each delivered deck still
needs its own content and visual inspection.
