// Only display preferences live here. Access keys and sessions belong to the server.
const root = document.documentElement;
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* Preferences are optional. */ } },
};
const media = window.matchMedia('(prefers-color-scheme: light)');
let theme = storage.get('decks.theme');
if (!['light', 'dark'].includes(theme)) theme = null;

function setTheme(value, remember = false) {
  root.dataset.theme = value;
  for (const button of document.querySelectorAll('[data-theme-choice]')) {
    button.setAttribute('aria-pressed', String(button.dataset.themeChoice === value));
  }
  if (remember) {
    theme = value;
    storage.set('decks.theme', value);
  }
}

setTheme(theme ?? (media.matches ? 'light' : 'dark'));
for (const button of document.querySelectorAll('[data-theme-choice]')) {
  button.addEventListener('click', () => setTheme(button.dataset.themeChoice, true));
}
media.addEventListener('change', event => {
  if (theme === null) setTheme(event.matches ? 'light' : 'dark');
});

const gallery = document.querySelector('[data-deck-gallery]');
function setLayout(value) {
  if (!gallery) return;
  gallery.dataset.layout = value;
  for (const button of document.querySelectorAll('[data-layout]')) {
    button.setAttribute('aria-pressed', String(button.dataset.layout === value));
  }
}
setLayout(storage.get('decks.layout') === 'editorial' ? 'editorial' : 'grid');
for (const button of document.querySelectorAll('[data-layout]')) {
  button.addEventListener('click', () => {
    setLayout(button.dataset.layout);
    storage.set('decks.layout', button.dataset.layout);
  });
}

const reveal = document.querySelector('[data-reveal-key]');
const key = document.getElementById('access-key');
if (reveal && key) {
  reveal.addEventListener('click', () => {
    const show = key.type === 'password';
    key.type = show ? 'text' : 'password';
    reveal.setAttribute('aria-label', show ? 'Hide key' : 'Show key');
    reveal.setAttribute('aria-pressed', String(show));
  });
  // A restored browser page must not expose a previously revealed credential.
  window.addEventListener('pageshow', () => {
    key.type = 'password';
    reveal.setAttribute('aria-label', 'Show key');
    reveal.setAttribute('aria-pressed', 'false');
  });
}
for (const control of document.querySelectorAll('[data-enhance]')) control.hidden = false;
