const fs = require('fs');
const product = JSON.parse(fs.readFileSync('data/products.json', 'utf8')).find(p => p.id === 434);
console.log('product zzounds:', product.stores.zzounds);

const js = fs.readFileSync('js/shop-buttons.js', 'utf8');
console.log('shop-buttons has AKGP120:', js.includes('AKGP120'));
const i = js.indexOf('434:');
console.log(js.slice(i, i + 360));

const css = fs.readFileSync('css/style.min.css', 'utf8');
const rule = css.match(/\.guide-card-img\{[^}]*\}/);
const img = css.match(/\.guide-card-img img\{[^}]*\}/);
console.log('guide-card rule:', rule && rule[0]);
console.log('guide-card img rule:', img && img[0]);

for (const f of ['guides/at2020-vs-p120.html', 'guides/at2020-vs-p120_es.html']) {
  const h = fs.readFileSync(f, 'utf8');
  console.log('---', f);
  let idx = -1, n = 0;
  while ((idx = h.indexOf('AKGP120', idx + 1)) > -1 && n < 6) {
    console.log('...', h.slice(Math.max(0, idx - 220), idx + 90).replace(/\s+/g, ' '));
    n++;
  }
  console.log('zzounds P120 count:', n);
}
