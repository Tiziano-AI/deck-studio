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

function integrateControls(child) {
  const controls = child.document.querySelector('.deck-controls');
  const reset = controls?.querySelector('[data-action="reset"]');
  if (!controls || !reset) return;

  // Selected releases keep their accepted bytes. Enhance their existing pill
  // in the live DOM instead of creating another navigation surface or runtime.
  reset.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10a9 9 0 1 1 2.7 8.4M3 4v6h6"/></svg>';
  reset.title = 'Reset to first slide (R)';
  reset.setAttribute('aria-keyshortcuts', 'R');

  const link = child.document.createElement('a');
  link.className = 'deck-button';
  link.dataset.viewerReturn = '';
  link.setAttribute('href', frame.dataset.returnTo);
  link.target = '_top';
  link.title = frame.dataset.returnLabel;
  link.setAttribute('aria-label', frame.dataset.returnLabel);
  link.setAttribute('aria-keyshortcuts', 'B');
  link.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7M5 9v11h5v-6h4v6h5V9"/></svg>';
  controls.append(link);

  // Existing releases predate icon links. Keep the shared pill's geometry,
  // focus reveal and touch access without changing its auto-hide mechanism.
  const style = child.document.createElement('style');
  style.textContent = '.deck-controls .deck-button{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;text-decoration:none;vertical-align:middle}.deck-controls svg{flex:none}.deck-controls{bottom:calc(22px + env(safe-area-inset-bottom))}@media(pointer:coarse){.deck-controls .deck-button{min-width:44px;height:44px}}';
  child.document.head.append(style);
  child.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.repeat || event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.key.toLowerCase() !== 'b') return;
    if (event.target instanceof child.Element && event.target.closest('a,button,input,textarea,select,summary,video,audio,[contenteditable]:not([contenteditable="false"]),[tabindex]:not([tabindex="-1"]),[role="button"],[role="link"],[role="textbox"],[role="slider"],[role="menu"],[role="tablist"]')) return;
    event.preventDefault();
    location.assign(frame.dataset.returnTo);
  });
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
    integrateControls(child);
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
