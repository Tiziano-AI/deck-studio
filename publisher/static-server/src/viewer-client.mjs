const frame = document.querySelector('[data-deck-frame]');
const slideHash = value => /^#slide-[1-9]\d*$/.test(value) ? value : '';

function presentationWindow() {
  try {
    const child = frame?.contentWindow;
    return child?.WebSlidesStudio ? child : null;
  } catch {
    // A denied or cross-origin destination is not an active presentation.
    return null;
  }
}

function followLink(event) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target?.closest?.('a[href]');
  if (!link || link.hasAttribute('download') || !['', '_self'].includes((link.target || '').toLowerCase())) return;
  const child = presentationWindow();
  if (!child) return;
  const target = new URL(link.href, child.location.href);
  // Keep in-deck fragments (including slide links) inside the presentation.
  if (target.origin === child.location.origin && target.pathname === child.location.pathname && target.search === child.location.search && target.hash) return;
  if (!['http:', 'https:'].includes(target.protocol)) return;
  // Evidence and calls to action retain ordinary top-level browser navigation;
  // the frame is for slides, not for browsing their linked destinations.
  event.preventDefault();
  location.assign(target.href);
}

// Share/reload the visible viewer URL without changing the presentation runtime
// or adding another history entry for the same slide transition.
function reflectSlide() {
  const child = presentationWindow();
  if (!child) return;
  const hash = slideHash(child.location.hash);
  if (hash && location.hash !== hash) history.replaceState(null, '', `${location.pathname}${location.search}${hash}`);
}

function restoreSlide() {
  const child = presentationWindow();
  const hash = slideHash(location.hash);
  if (!hash || !child || child.location.hash === hash) return;
  child.history.replaceState(null, '', `${child.location.pathname}${child.location.search}${hash}`);
  child.dispatchEvent(new child.HashChangeEvent('hashchange'));
}

if (frame) {
  frame.addEventListener('load', () => {
    const child = presentationWindow();
    // Expired/revoked access may load a login or denial instead of a deck.
    if (!child) return;
    restoreSlide();
    child.document.addEventListener('webslides:slidechange', reflectSlide);
    child.addEventListener('hashchange', reflectSlide);
    child.document.addEventListener('click', followLink);
    reflectSlide();
    if (document.activeElement === document.body || document.activeElement === frame) {
      child.focus();
      child.document.querySelector('.deck-stage')?.focus({ preventScroll: true });
    }
  });
  const source = new URL(frame.dataset.deckSrc, location.href);
  source.hash = slideHash(location.hash);
  frame.src = source.href;
  window.addEventListener('hashchange', restoreSlide);
  window.addEventListener('popstate', restoreSlide);
}
