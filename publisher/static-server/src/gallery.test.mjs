import assert from 'node:assert/strict';
import test from 'node:test';
import { renderGallery, renderLogin } from './gallery.mjs';

const deck = {
  deck_id: 'sample', title: 'Sample deck', slide_count: 7,
  html: '/decks/sample/release/', pdf: '/decks/sample/release/deck.pdf',
  cover: '/decks/sample/release/assets/cover.jpg',
};

test('the public entrance links to the actual deck, PDF and cover', () => {
  const page = renderGallery({ decks: [deck] });
  assert.match(page, /<html lang="en" data-brand="neutral">/);
  assert.match(page, /<h1 id="gallery-title">Public decks\.<\/h1>/);
  assert.match(page, /href="\/decks\/sample\/release\/\?return_to=%2F"/);
  assert.match(page, /href="\/decks\/sample\/release\/deck.pdf"/);
  assert.match(page, /src="\/decks\/sample\/release\/assets\/cover.jpg"/);
  assert.match(page, /7 slides/);
  assert.match(page, /href="\/login">Enter access key/);
  assert.doesNotMatch(page, /dialog|demo|preview|SMOOTHOPERATOR/);
  assert.doesNotMatch(page, />PPTX|PowerPoint:/);
});

test('only available native companions expose a PowerPoint download', () => {
  const page = renderGallery({ decks: [{ ...deck, pptx: '/decks/sample/release/deck.pptx' }] });
  assert.match(page, /href="\/decks\/sample\/release\/deck.pptx" download aria-label="PowerPoint: Sample deck"/);
  assert.match(page, />PPTX /);
  assert.match(page, /href="\/decks\/sample\/release\/deck.pdf"/);
});

test('public browsing and the keyed collection remain distinct navigation', () => {
  const publicPage = renderGallery({ decks: [deck], authenticated: true, csrf: 'csrf-value' });
  assert.match(publicPage, /Public decks\.<\/h1>/);
  assert.match(publicPage, /href="\/collection">Your collection/);
  assert.match(publicPage, /action="\/logout" method="post"/);
  assert.match(publicPage, /name="csrf" value="csrf-value"/);
  const collection = renderGallery({ decks: [deck], collection: { label: 'Research', scope: 'collection' }, authenticated: true });
  assert.match(collection, /Your collection\.<\/h1>/);
  assert.match(collection, />Research<\/span>/);
  assert.match(collection, /href="\/collection" aria-current="page"/);
  assert.match(collection, /href="\/decks\/sample\/release\/"/);
  assert.doesNotMatch(collection, /return_to=/);
});

test('text and attribute values are escaped without rendering backstage metadata', () => {
  const page = renderGallery({
    decks: [{ ...deck, title: '<img src=x onerror="alert(1)">', proof: 'hidden-proof', source: { secret: 'hidden-secret' } }],
    collection: { label: '<script>bad()</script>' }, site: { title: 'A & B' },
    error: '<svg/onload=alert(1)>', csrf: '" onfocus="x', authenticated: true,
  });
  assert.doesNotMatch(page, /<script>bad|<img src=x|<svg\/onload|hidden-proof|hidden-secret/);
  assert.match(page, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
  assert.match(page, /name="csrf" value="&quot; onfocus=&quot;x"/);
  assert.match(page, /<title>Your collection · A &amp; B<\/title>/);
});

test('nonlocal and traversal presentation URLs never become active links', () => {
  for (const path of ['https://evil.invalid/a', '//evil.invalid/a', 'javascript:alert(1)', '/decks/a/../private', '/decks/a/%2e%2e/private', '/decks/a%5cb', '/decks/a?secret=yes', '/decks/a#x', '/decks/%00', '/decks/%zz']) {
    const page = renderGallery({ decks: [{ ...deck, html: path, pdf: path, pptx: path, cover: path }] });
    assert.doesNotMatch(page, /<a class="cover"|<img src=|aria-label="PDF:|aria-label="PowerPoint:/, path);
    assert.match(page, /class="cover-fallback"/, path);
  }
});

test('login posts the key and hidden return target with associated field errors', () => {
  const page = renderLogin({ returnTo: '/decks/private/release/deck.html', csrf: '<nonce>', error: 'Key not recognised.' });
  assert.match(page, /<h1 id="login-title">Open this deck\.<\/h1>/);
  assert.match(page, /action="\/login" method="post"/);
  assert.match(page, /name="return_to" value="\/decks\/private\/release\/deck.html"/);
  assert.match(page, /name="csrf" value="&lt;nonce&gt;"/);
  assert.match(page, /name="key" type="password"/);
  assert.match(page, /aria-invalid="true" aria-describedby="key-error"/);
  assert.match(page, /id="key-error" role="alert">Key not recognised\./);
  assert.doesNotMatch(page, /name="key"[^>]*value=|>private<|Private deck title/);
});

test('the UI does not echo invalid redirects or brand HTML', () => {
  const page = renderLogin({ returnTo: 'https://evil.invalid', site: { title: '<script>x</script>', brand: '<img>' } });
  assert.match(page, /name="return_to" value=""/);
  assert.match(page, /data-brand="neutral"/);
  assert.doesNotMatch(page, /evil.invalid|<script>x/);
  const branded = renderGallery({ site: { brand: 'smoothoperator' } });
  assert.match(branded, /data-brand="smoothoperator"/);
  assert.match(branded, /BY SMOOTHOPERATOR/);
});

test('empty states and enhancement controls preserve useful non-JavaScript HTML', () => {
  const empty = renderGallery();
  assert.match(empty, /No public decks yet\./);
  assert.match(empty, /<a class="text-link" href="\/login">Enter an access key/);
  const collection = renderGallery({ collection: { label: 'Empty collection' }, authenticated: true });
  assert.match(collection, /No decks in this collection\./);
  assert.match(collection, /href="\/login">Change key/);
  assert.match(collection, /href="\/">Public decks/);
  assert.doesNotMatch(empty, /data-layout=/);
  const multiple = renderGallery({ decks: [deck, deck, deck] });
  assert.match(multiple, /aria-label="Gallery layout" data-enhance hidden/);
  assert.match(multiple, /<ul class="cards" data-deck-gallery>/);
  assert.match(multiple, /class="skip-link" href="#main"/);
  assert.match(multiple, /loading="lazy"/);
});
