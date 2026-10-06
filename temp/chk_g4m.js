const fs = require('fs');
const h = fs.readFileSync('guides/best-digital-pianos.html', 'utf8');
const i = h.indexOf('Roland RP107 Digital Piano</h3>');
const chunk = h.slice(i, i + 6000);
const stores = (chunk.match(/data-store="([a-z]+)"[^>]*href="([^"]{0,120})/g) || []);
console.log(stores.join('\n'));
const g = chunk.indexOf('data-store="gear4music"');
console.log('--- gear4music idx in card chunk:', g);
if (g > -1) console.log(chunk.slice(g - 200, g + 300).replace(/\n/g, ' '));
// where do gear4music rows live?
let idx = 0, n = 0;
while ((idx = h.indexOf('data-store="gear4music"', idx + 1)) > -1 && n < 3) {
  const before = h.slice(Math.max(0, idx - 400), idx);
  const t = (before.match(/guide-product-card-title">([^<]{0,50})/) || ['', '?'])[1];
  console.log('gear4music row belongs to card title:', t);
  n++;
}
