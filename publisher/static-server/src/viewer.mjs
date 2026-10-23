import { escapeHtml } from './gallery.mjs';

/** Site navigation belongs to the gateway, never to immutable slide bytes. */
export function renderViewer({ deck, authenticated = false, returnTo = '', site = {} }) {
  const destination = ['/', '/collection'].includes(returnTo) ? returnTo : authenticated ? '/collection' : '/';
  const label = destination === '/collection' ? 'Back to collection' : 'Back to public decks';
  const title = escapeHtml(deck.title || 'Untitled deck');
  const source = escapeHtml(`${deck.html}deck.html`);
  const brand = site.brand === 'smoothoperator' ? 'smoothoperator' : 'neutral';
  return `<!doctype html>
<html lang="en" data-brand="${brand}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="color-scheme" content="dark light">
  <title>${title} · ${escapeHtml(site.title || 'Decks')}</title>
  <link rel="stylesheet" href="/ui/gallery.css">
  <link rel="stylesheet" href="/ui/viewer.css">
  <script type="module" src="/ui/gallery-client.mjs"></script>
  <script type="module" src="/ui/viewer-client.mjs"></script>
</head>
<body class="viewer">
  <header class="viewer-bar">
    <nav aria-label="Deck navigation"><a class="viewer-return" data-viewer-return href="${destination}"><span aria-hidden="true">←</span> ${label}</a></nav>
    <span class="viewer-title" data-viewer-title>${title}</span>
  </header>
  <main class="viewer-content">
    <iframe data-deck-frame data-deck-src="${source}" title="${title}" allow="fullscreen"></iframe>
    <noscript><p>JavaScript is needed to present this deck. <a href="${source}">Open the standalone HTML</a>.</p></noscript>
  </main>
</body>
</html>`;
}
