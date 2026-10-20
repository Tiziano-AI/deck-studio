# Bold Signal

### 1. Bold Signal

**Vibe:** Confident, bold, modern, high-impact

**Layout:** Colored card on dark gradient. Number top-left, navigation top-right, title bottom-left.

**Typography:**
- Display: `Archivo Black` (900)
- Body: `Space Grotesk` (400/500)

**Colors:**
```css
:root {
    --bg-primary: #1a1a1a;
    --bg-gradient: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
    --card-bg: #FF5722;
    --text-primary: #ffffff;
    --text-on-card: #1a1a1a;
}
```

**Signature Elements:**
- Bold colored card as focal point (orange, coral, or vibrant accent)
- Large section numbers (01, 02, etc.)
- Navigation breadcrumbs with active/inactive opacity states
- Grid-based layout for precise alignment


## Fixed-stage adaptation

Use the canonical 1920x1080 runtime (`runtime/deck-stage.css` and `runtime/deck-stage.js`), `body[data-web-slides-studio]`, `.deck-viewport`, `.deck-stage`, `.slide`, and the existing `WebSlidesStudio` API. Preserve palette, typography roles, and signature elements with fixed pixel/rem coordinates, never a second scaler or viewport-sized internals. Keep preset names and workflow notes outside the slide.

This is a design recipe, not a bundled layout or font package. Confirm named font files, weights, styles, and required language glyphs before rendering; load them locally for delivery. A fallback is a visible design change, not an equivalent face. Judge fit with actual loaded fonts.

When style comparison is useful, use representative locked content with identical meaning across candidates; a title alone need not expose the hardest layout. This recipe imposes no fixed preview count or human approval gate. Preserve claims, qualifications, evidence, order, and ask. Recompose or split crowded material without dropping content; return meaning-changing edits to content approval.

Use only supplied numbers, quotations, attributions, logos, and real destinations. Decorative tabs or pills must not masquerade as controls. Add an action only when it works; never invent a QR code, byline, metric, or status to fill the layout. Keep sources readable and encode meaning in words or shapes as well as color.
