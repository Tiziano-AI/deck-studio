# Pastel Geometry

### 6. Pastel Geometry

**Vibe:** Friendly, organized, modern, approachable

**Layout:** White card on pastel background. Vertical pills on right edge.

**Typography:**
- Display: `Plus Jakarta Sans` (700/800)
- Body: `Plus Jakarta Sans` (400/500)

**Colors:**
```css
:root {
    --bg-primary: #c8d9e6;
    --card-bg: #faf9f7;
    --pill-pink: #f0b4d4;
    --pill-mint: #a8d4c4;
    --pill-sage: #5a7c6a;
    --pill-lavender: #9b8dc4;
    --pill-violet: #7c6aad;
}
```

**Signature Elements:**
- Rounded card with soft shadow
- **Vertical pills on right edge** with varying heights (like tabs)
- Consistent pill width, heights: short → medium → tall → medium → short
- Optional action icon only for a real working action; omit otherwise


## Fixed-stage adaptation

Use the canonical 1920x1080 runtime (`runtime/deck-stage.css` and `runtime/deck-stage.js`), `body[data-web-slides-studio]`, `.deck-viewport`, `.deck-stage`, `.slide`, and the existing `WebSlidesStudio` API. Preserve palette, typography roles, and signature elements with fixed pixel/rem coordinates, never a second scaler or viewport-sized internals. Keep preset names and workflow notes outside the slide.

This is a design recipe, not a bundled layout or font package. Confirm named font files, weights, styles, and required language glyphs before rendering; load them locally for delivery. A fallback is a visible design change, not an equivalent face. Judge fit with actual loaded fonts.

When style comparison is useful, use representative locked content with identical meaning across candidates; a title alone need not expose the hardest layout. This recipe imposes no fixed preview count or human approval gate. Preserve claims, qualifications, evidence, order, and ask. Recompose or split crowded material without dropping content or changing claims or numbers merely for fit. If a semantic revision is needed, reopen that part of the semantic source within the mandate and carry the change through the artifact. Ask only before changing explicitly user-locked meaning or exceeding authority; keep that discussion outside the slide frame.

Use only supplied numbers, quotations, attributions, logos, and real destinations. Decorative tabs or pills must not masquerade as controls. Add an action only when it works; never invent a QR code, byline, metric, or status to fill the layout. Keep sources readable and encode meaning in words or shapes as well as color.
