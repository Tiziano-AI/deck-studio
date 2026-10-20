/** Audience HTML only. The gateway supplies the already-authorized deck list. */
const icons = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  moon: '<path d="M20 14a8 8 0 0 1-10-10 8.5 8.5 0 1 0 10 10Z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  editorial: '<rect x="3" y="3" width="18" height="8" rx="1"/><rect x="3" y="15" width="7" height="6" rx="1"/><rect x="14" y="15" width="7" height="6" rx="1"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  arrow: '<path d="M6 18 18 6M6 6h12v12"/>',
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false">${icons[name]}</svg>`;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

// Presentation resources are same-origin. The server still owns authorization.
function resourcePath(value) {
  if (typeof value !== 'string' || !value.startsWith('/decks/')) return null;
  if (/[\s\\\u0000-\u001f\u007f?#]/.test(value)) return null;
  try {
    const decoded = decodeURIComponent(value);
    if (/[\\\u0000-\u001f\u007f?#]/.test(decoded)) return null;
    if (decoded.split('/').some(segment => segment === '.' || segment === '..')) return null;
    const url = new URL(value, 'https://decks.invalid');
    return url.origin === 'https://decks.invalid' && url.pathname.startsWith('/decks/') ? value : null;
  } catch {
    return null;
  }
}

function returnPath(value) {
  return value === '/' || value === '/collection' ? value : resourcePath(value) ?? '';
}

function hiddenFields(csrf, returnTo = '') {
  return `<input type="hidden" name="csrf" value="${escapeHtml(csrf)}"><input type="hidden" name="return_to" value="${escapeHtml(returnPath(returnTo))}">`;
}

function keyLink(returnTo) {
  const target = returnPath(returnTo);
  return target ? `/login?return_to=${encodeURIComponent(target)}` : '/login';
}

function shell({ site = {}, authenticated = false, csrf = '', page, title, body }) {
  const name = typeof site.title === 'string' && site.title.trim() ? site.title.trim() : 'Decks';
  const branded = site.brand === 'smoothoperator';
  const titleText = `${title} · ${name}`;
  const navigation = authenticated
    ? `<a class="nav-link${page === 'public' ? ' current' : ''}" href="/"${page === 'public' ? ' aria-current="page"' : ''}>Public decks</a><a class="nav-link${page === 'collection' ? ' current' : ''}" href="/collection"${page === 'collection' ? ' aria-current="page"' : ''}>Your collection</a>`
    : '';
  const access = page === 'login' ? '' : authenticated
    ? '<a class="nav-link" href="/login">Change key</a>'
    : '<a class="access-link" href="/login">Enter access key</a>';
  const logout = authenticated
    ? `<form action="/logout" method="post" class="logout">${hiddenFields(csrf)}<button class="nav-link" type="submit">Sign out</button></form>`
    : '';
  return `<!doctype html>
<html lang="en" data-brand="${branded ? 'smoothoperator' : 'neutral'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark light">
  <meta name="referrer" content="same-origin">
  <title>${escapeHtml(titleText)}</title>
  <link rel="stylesheet" href="/ui/gallery.css">
  <script type="module" src="/ui/gallery-client.mjs"></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="header">
    <a class="identity" href="/" aria-label="${escapeHtml(name)} home"><span class="word">${escapeHtml(name.toLowerCase())}<span class="brand-dot" aria-hidden="true">.</span></span>${branded ? '<span class="by">BY SMOOTHOPERATOR</span>' : ''}</a>
    <div class="head-actions">
      ${navigation ? `<nav aria-label="Collections" class="collection-nav">${navigation}</nav>` : ''}
      <div class="access-actions">${access}${logout}</div>
      <div class="theme" role="group" aria-label="Color theme" data-enhance hidden>
        <button class="icon-button" type="button" aria-label="Light theme" aria-pressed="false" data-theme-choice="light">${icon('sun')}</button>
        <button class="icon-button" type="button" aria-label="Dark theme" aria-pressed="false" data-theme-choice="dark">${icon('moon')}</button>
      </div>
    </div>
  </header>
  <main id="main">${body}</main>
  <footer class="foot"><span>${escapeHtml(branded ? 'SMOOTHOPERATOR · DECKS' : name)}</span></footer>
</body>
</html>`;
}

function deckCard(deck, index) {
  const html = resourcePath(deck.html);
  const pdf = resourcePath(deck.pdf);
  const cover = resourcePath(deck.cover);
  const title = escapeHtml(deck.title || 'Untitled deck');
  const slides = Number.isSafeInteger(deck.slide_count) && deck.slide_count > 0
    ? `${deck.slide_count} ${deck.slide_count === 1 ? 'slide' : 'slides'}` : '';
  const image = cover
    ? `<img src="${escapeHtml(cover)}" alt="" width="1600" height="900" decoding="async"${index > 1 ? ' loading="lazy"' : ''}>`
    : `<span class="cover-fallback" aria-hidden="true"><span class="cover-lines"></span><span class="cover-title">${title}</span></span>`;
  const openLabel = `Open ${deck.title || 'Untitled deck'}`;
  const visual = html
    ? `<a class="cover" href="${escapeHtml(html)}" aria-label="${escapeHtml(openLabel)}">${image}<span class="open-arrow">${icon('arrow')}</span></a>`
    : `<div class="cover">${image}</div>`;
  return `<li class="deck"><article>${visual}<div class="deck-copy"><div class="deck-meta">${slides ? `<span>${slides}</span>` : '<span></span>'}${pdf ? `<a href="${escapeHtml(pdf)}" aria-label="${escapeHtml(`PDF: ${deck.title || 'Untitled deck'}`)}">PDF ${icon('arrow')}</a>` : ''}</div><h2>${html ? `<a href="${escapeHtml(html)}">${title}</a>` : title}</h2></div></article></li>`;
}

export function renderGallery({ decks = [], collection = null, authenticated = false, site = {}, error = '', returnTo = '', csrf = '' } = {}) {
  const keyed = collection !== null && collection !== undefined;
  const label = typeof collection === 'string' ? collection : collection?.label;
  const title = keyed ? 'Your collection.' : 'Public decks.';
  const selected = Array.isArray(decks) ? decks : [];
  const layoutControls = selected.length > 2
    ? `<div class="layouts" role="group" aria-label="Gallery layout" data-enhance hidden><button class="icon-button" type="button" aria-label="Editorial layout" aria-pressed="false" data-layout="editorial">${icon('editorial')}</button><button class="icon-button" type="button" aria-label="Uniform grid" aria-pressed="true" data-layout="grid">${icon('grid')}</button></div>`
    : '';
  const empty = keyed
    ? '<h2>No decks in this collection.</h2><p>You can try another key or browse the public gallery.</p><div class="empty-actions"><a class="button primary" href="/login">Change key</a><a class="text-link" href="/">Public decks <span aria-hidden="true">→</span></a></div>'
    : `<h2>No public decks yet.</h2><a class="text-link" href="${keyLink(returnTo)}">Enter an access key <span aria-hidden="true">→</span></a>`;
  const body = `<section class="gallery" aria-labelledby="gallery-title">
    <div class="gallery-top"><h1 id="gallery-title">${title}</h1><span class="count">${String(selected.length).padStart(2, '0')} ${selected.length === 1 ? 'DECK' : 'DECKS'}</span></div>
    <div class="tools"><span class="collection"><span class="dot" aria-hidden="true"></span>${escapeHtml(keyed ? label || 'Private collection' : 'Open to everyone')}</span>${layoutControls}</div>
    ${error ? `<p class="error" role="alert">${escapeHtml(error)}</p>` : ''}
    ${selected.length ? `<ul class="cards" data-deck-gallery>${selected.map(deckCard).join('')}</ul>` : `<div class="empty-state">${empty}</div>`}
  </section>`;
  return shell({ site, authenticated, csrf, page: keyed ? 'collection' : 'public', title: title.slice(0, -1), body });
}

export function renderLogin({ collection = null, authenticated = false, site = {}, error = '', returnTo = '', csrf = '' } = {}) {
  const hasTarget = Boolean(resourcePath(returnTo));
  const title = hasTarget ? 'Open this deck.' : authenticated ? 'Change your key.' : 'Your collection.';
  const label = typeof collection === 'string' ? collection : collection?.label;
  const body = `<section class="login" aria-labelledby="login-title">
    <div class="entry">
      <h1 id="login-title">${title}</h1>
      ${authenticated && label ? `<p class="current-key">Current collection: ${escapeHtml(label)}</p>` : ''}
      <form action="/login" method="post" class="key-form">
        ${hiddenFields(csrf, returnTo)}
        <label class="key-label" for="access-key">Your access key</label>
        <div class="keybox"><input id="access-key" name="key" type="password" autocomplete="off" autocapitalize="none" spellcheck="false" required maxlength="256"${error ? ' aria-invalid="true" aria-describedby="key-error"' : ''}><button class="reveal icon-button" type="button" aria-label="Show key" aria-controls="access-key" aria-pressed="false" data-reveal-key data-enhance hidden>${icon('eye')}</button></div>
        ${error ? `<p class="error" id="key-error" role="alert">${escapeHtml(error)}</p>` : ''}
        <button class="button primary" type="submit">${hasTarget ? 'Open deck' : 'Open your collection'} ${icon('arrow')}</button>
      </form>
      <a class="public-link" href="/">Back to the public gallery <span aria-hidden="true">→</span></a>
    </div>
    <div class="art" aria-hidden="true"><div class="stack"><div class="sheet one"></div><div class="sheet two"></div><div class="sheet three"><span class="abstract">decks<span>.</span></span><span class="rule"></span></div></div></div>
  </section>`;
  return shell({ site, authenticated, csrf, page: 'login', title: title.slice(0, -1), body });
}
