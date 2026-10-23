import { escapeHtml } from './gallery.mjs';

/** Hosted context belongs to the gateway, never to immutable slide bytes. */
export function renderViewer({ deck, authenticated = false, returnTo = '', site = {} }) {
  const destination = ['/', '/collection'].includes(returnTo) ? returnTo : authenticated ? '/collection' : '/';
  const label = destination === '/collection' ? 'Back to collection (B)' : 'Back to public decks (B)';
  const title = escapeHtml(deck.title || 'Untitled deck');
  const source = escapeHtml(`${deck.html}deck.html`);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${title} · ${escapeHtml(site.title || 'Decks')}</title>
  <link rel="stylesheet" href="/ui/viewer.css">
  <script type="module" src="/ui/viewer-client.mjs"></script>
</head>
<body class="viewer">
  <main class="viewer-content">
    <iframe data-deck-frame data-deck-src="${source}" data-return-to="${destination}" data-return-label="${label}" title="${title}" allow="fullscreen"></iframe>
  </main>
</body>
</html>`;
}
