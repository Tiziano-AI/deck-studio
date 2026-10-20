# Smooth Operator Dark

Visual signature: nocturnal control plane, gradient S/O mark, glass cockpit panels, magenta/cyan signal beams.

Visual thesis: this deck should feel like an operator cockpit at night because SmoothOperator is a premium orchestration/control-plane product whose value is live governance, route clarity, model/tool activity, and evidence custody.

Fonts:

- `SO Raleway` carries stage-scale title type, product naming, and calm reading rhythm.
- `SO Victor Mono` is reserved for endpoints, run states, tool names, routes, evidence aliases, and exact operational annotations.

Brand assets:

- Shared logo: `templates/house/_smoothoperator-assets/logo/smoothoperator-icon.svg`.
- Shared fonts: `templates/house/_smoothoperator-assets/fonts/*.woff2`.
- Shared palette source: `templates/house/_smoothoperator-assets/palette/palette.json`.

Best for: SmoothOperator launch narratives, architecture keynotes, control-plane demos, workflow capability reveals.

Avoid for: dense appendices, print-first board packets, non-SmoothOperator brand work.

## Design rules

- Use the canonical 1920x1080 runtime (`runtime/deck-stage.css` and `runtime/deck-stage.js`), `body[data-web-slides-studio]`, `.deck-viewport`, `.deck-stage`, `.slide`, and the existing `WebSlidesStudio` API. Do not add a second scaler or viewport-sized slide internals.
- These developed brand compositions express a visual language, not current product evidence. Architecture names, endpoints, status, counts, custody, and readiness claims require the actual locked source; do not inherit fixture copy as verified product behavior.
- Recompose or split content while preserving all meaning, evidence, qualifications, order, and ask. Never delete content for fit or invent metrics, attributions, QR codes, controls, or proof.
- Keep legend and source text readable. Use words or shapes with color for state and verification; no color-only status claims.
- The supplied CSS loads normal Raleway 400/600/700 and Victor Mono 500 from the local manifest. Other weights/styles require matching explicit font faces. Verify loaded glyph coverage for the actual language; no cross-script or fallback equivalence is assumed.

- Use the dark stack as the stage: `--so-base-1000` canvas, `--so-base-950` backdrop, `--so-base-900` elevated surfaces, and `--so-base-700` edges.
- Use magenta for brand energy, active runs, and selected workflow paths. Use cyan for verification, committed evidence, and technical counterbalance.
- Prefer one large claim plus one meaningful system object per slide: cockpit panel, route map, response bundle, source orbit, artifact stack, or run lifecycle rail.
- Let glow be structural, not atmospheric. It should reveal selected paths, custody, or state; do not add generic bokeh/orbs that carry no platform meaning.
- Keep chrome semantic: rails for run lifecycle, pills for lanes or roles, panels for evidence/tool surfaces, beams for data movement.
- Use logo presence sparingly: cover, section openers, and close. Do not watermark every slide unless the deck is externally distributed and the mark carries brand ownership.
- Do not render template names, file paths, option labels, or internal prompt notes inside slides.

## Standalone deck asset handling

When generating a deck, copy only the needed shared assets into `assets/smoothoperator/` beside the produced deck and update `@font-face`/logo URLs, or inline the SVG logo. Keep each copied font family's copyright and full license notice with the font files: `Raleway-OFL.txt` for Raleway and `Victor-Mono-OFL.txt` for Victor Mono, from the shared font directory. Do not point a delivered deck at local source-checkout paths.

## Weakness

The dark system is strong but can become theatrical if overloaded with glow. For board-readable evidence packets or dense appendices, use the light SmoothOperator system.
