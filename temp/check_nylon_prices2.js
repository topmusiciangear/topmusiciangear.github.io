const fs = require('fs');
const h = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html', 'utf8');
for (const n of ['319', '209', '289', '249', '229', '299', '284']) {
  const idx = [...h.matchAll(new RegExp(n, 'g'))].map(m => m.index).slice(0, 3);
  console.log(n, '->', idx.length, idx.map(i => JSON.stringify(h.slice(i - 30, i + 12))).join(' | '));
}
const i = h.indexOf('shop-price');
console.log('\nprimer shop-price:', i < 0 ? 'NO' : JSON.stringify(h.slice(i - 200, i + 200)));
