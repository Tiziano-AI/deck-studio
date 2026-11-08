# Deck Studio engineering

Start with [README.md](README.md), [VISION.md](VISION.md) and [ARCH.md](ARCH.md).
This repository owns the skill, local HTML/PDF/native-PPTX producer and optional
audience gateway. Native hosts own plugin installation; a source change is not
an installed update or a hosted deployment.

## Product boundaries

- Ordinary local deck delivery includes HTML, PDF and native editable PPTX.
  Preserve one meaning source and inspect each format through its documented
  production path; mechanical checks do not establish visual acceptance.
- Keep the canonical doctrine in `DECKS.md` and its packaged copy identical.
  Author skill behavior at `skills/deck-studio/SKILL.md` and its references,
  never in an installed plugin cache.
- Use the package-owned, exact-version sandboxed browser through its shared
  launcher. Installation and recovery follow `docs/DISTRIBUTION.md`; do not
  add another browser-selection route or bypass an OS-policy refusal.
- The gateway and local authoring are separate consumers. Library publication,
  audience grants, credentials and deployment require their own authority;
  consult `docs/HOSTED_DEPLOYMENT.md` and the packaged publishing guide.
- Keep private host paths, operational incidents, security approvals, runtime
  captures, libraries and secrets outside this public source repository.
  Product documentation describes portable behavior, not a private fleet.

## Changes and validation

Use English for source, documentation and commits. Run
`python3 scripts/validate_product.py` and `git diff --check`; the README's
Development section owns the additional gates for the behavior changed.
Check touched Markdown links and table structure. Use Biome, not ESLint, for
JavaScript/TypeScript linting and formatting when needed.

Work in the saved checkout on its current branch, preserving other writers'
changes. Inspect the complete outgoing history, not only its final tree.
`origin` is public: each push needs explicit authorization for that publication.
Do not include private recovery refs or bundles in a push.
