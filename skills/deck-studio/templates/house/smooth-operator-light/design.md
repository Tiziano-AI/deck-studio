# Smooth Operator Light

Visual signature: ivory evidence surface, Raleway authority, Victor Mono audit rails, magenta/cyan brand signals.

Visual thesis: this deck should feel like a calm operator dossier because SmoothOperator sells trust through workflow governance, committed evidence, explicit routes, and exportable artifacts rather than generic chatbot excitement.

Fonts:

- `SO Raleway` leads headings, product naming, body copy, and primary reading surfaces.
- `SO Victor Mono` explains trace IDs, route names, evidence aliases, tool calls, code-like labels, and exact values.

Brand assets:

- Shared logo: `templates/house/_smoothoperator-assets/logo/smoothoperator-icon.svg`.
- Shared fonts: `templates/house/_smoothoperator-assets/fonts/*.woff2`.
- Shared palette source: `templates/house/_smoothoperator-assets/palette/palette.json`.

Best for: SmoothOperator board updates, workflow strategy decks, evidence-system explainers, customer onboarding dossiers.

Avoid for: pure cinematic launch reveals, non-SmoothOperator brand work, playful consumer storytelling.

## Design rules

- Use the canonical 1920x1080 runtime (`runtime/deck-stage.css` and `runtime/deck-stage.js`), `body[data-web-slides-studio]`, `.deck-viewport`, `.deck-stage`, `.slide`, and the existing `WebSlidesStudio` API. Do not add a second scaler or viewport-sized slide internals.
- These developed brand compositions express a visual language, not current product evidence. Architecture names, endpoints, status, counts, custody, and readiness claims require the actual locked source; do not inherit fixture copy as verified product behavior.
- Recompose or split content while preserving all meaning, evidence, qualifications, order, and ask. Never delete content for fit or invent metrics, attributions, QR codes, controls, or proof.
- Keep legend and source text readable. Use words or shapes with color for state and verification; no color-only status claims.
- The supplied CSS loads normal Raleway 400/600/700 and Victor Mono 500 from the local manifest. Other weights/styles require matching explicit font faces. Verify loaded glyph coverage for the actual language; no cross-script or fallback equivalence is assumed.

- Keep the surface bright but not generic white: use `--so-base-100` as the page, white cards only for framed evidence, and `--so-base-200` as the quiet grid.
- Use magenta `--so-primary-700` for decisions, active routes, and the brand mark. Use cyan `--so-secondary-400` for evidence lanes, verification, and technical balance.
- Give every slide an operator spine: top-left product/section, top-right run or audience context, bottom evidence/source rail when the content is evidence-bearing.
- Prefer compact panels, ledgers, route maps, and annotated diagrams over decorative cards. A panel must encode hierarchy, state, source, comparison, or custody.
- Use rounded surfaces from the product shell, but keep radii disciplined: large frames around workflow surfaces; smaller pills only for state, lane, route, or role.
- Do not use generic SaaS purple gradient hero language. The brand gradient is allowed only as a precise signal line, logo glow, selected-route beam, or proof highlight.
- Do not render template names, file paths, option labels, or internal prompt notes inside slides.

## Standalone deck asset handling

When generating a deck, copy only the needed shared assets into `assets/smoothoperator/` beside the produced deck and update `@font-face`/logo URLs, or inline the SVG logo. Keep each copied font family's copyright and full license notice with the font files: `Raleway-OFL.txt` for Raleway and `Victor-Mono-OFL.txt` for Victor Mono, from the shared font directory. Do not point a delivered deck at local source-checkout paths.

## Weakness

The light system is less dramatic for a founder keynote. If the deck needs a theatrical reveal or low-text launch moment, use the dark SmoothOperator system instead.
