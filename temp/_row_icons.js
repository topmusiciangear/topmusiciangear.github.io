const fs = require('fs');
const vm = require('vm');
const src = fs.readFileSync('js/shop-buttons.js', 'utf8');
const sandbox = {
  window: {},
  document: { documentElement: { lang: 'en' } },
  navigator: {},
  localStorage: { getItem: () => null, setItem: () => {} },
  Intl: Intl,
  console: console,
};
sandbox.window = sandbox;
vm.runInNewContext(src, sandbox);
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p = prods.find(x => x.id === 20);
const html = sandbox.shopButtonsTest(p, false);
for (const st of ['reverb', 'gear4music', 'musicstore', 'zzounds', 'andertons', 'amazon']) {
  const re = new RegExp('<a data-store="' + st + '"[\\s\\S]{0,700}?</a>');
  const m = html.match(re);
  if (m) {
    const seg = m[0];
    const img = seg.match(/<svg[\s\S]*?<\/svg>/);
    console.log('==== ' + st + ' icon:', img ? img[0].slice(0, 320) : 'NO SVG', '\n--- ow30:', seg.slice(0, 120).replace(/\s+/g, ' '));
  } else {
    // maybe data-store only appears in dropdown with icon
    console.log('==== ' + st + ': row not matched')
  }
}