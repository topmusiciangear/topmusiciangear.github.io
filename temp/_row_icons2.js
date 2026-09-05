const fs = require('fs');
const vm = require('vm');
const src = fs.readFileSync('js/shop-buttons.js', 'utf8');
const sandbox = { window: {}, document: { documentElement: { lang: 'en' } }, navigator: {}, localStorage: { getItem: () => null, setItem: () => {} }, Intl: Intl, console: console };
sandbox.window = sandbox;
vm.runInNewContext(src, sandbox);
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p = prods.find(x => x.id === 20);
const html = sandbox.shopButtonsTest(p, false);
console.log('total len', html.length);
for (const st of ['reverb', 'gear4music']) {
  const i = html.indexOf('data-store="' + st + '"');
  console.log('==== ' + st + ' @', i);
  console.log(html.slice(Math.max(0, i - 80), i + 1400));
  console.log('\n');
}