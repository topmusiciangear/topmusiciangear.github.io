const fs = require('fs');
const vm = require('vm');
let src = fs.readFileSync('js/shop-buttons.js', 'utf8');
const sandbox = {
  window: {},
  document: { documentElement: { lang: 'en' } },
  navigator: {},
  localStorage: { getItem: () => null, setItem: () => {} },
  Intl: Intl,
  console: console,
};
sandbox.window = sandbox;
try {
  vm.runInNewContext(src, sandbox);
  const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
  const p = prods.find(x => x.id === 20);
  const html = sandbox.shopButtonsTest(p, false);
  console.log('id20 Rokit html length', html.length);
  const m = html.match(/data-store="([^"]+)"/g);
  console.log('rows:', (m || []).join(', '));
  const out = html.replace(/\s+/g, ' ').slice(0, 200);
  console.log(out);
} catch (e) {
  console.log('ERROR:', e.message);
  console.log(e.stack.split('\n')[0]);
  const mm = e.message.match(/character (\d+)/);
  if (mm) {
    const at = +mm[1];
    console.log(src.slice(Math.max(0, at - 120), at + 120));
  }
}