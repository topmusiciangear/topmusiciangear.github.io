const fs = require('fs');
const s = fs.readFileSync('guides/budget-pa-systems_es.html', 'utf8');
let idx = -1;
while ((idx = s.indexOf('guide-product-card', idx + 1)) >= 0) {
  const block = s.substring(idx, idx + 6000);
  const title = (block.match(/guide-product-card-title[^>]*>([\s\S]{0,80})</) || [])[1] || '';
  const clean = title.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const stores = {};
  for (const m of block.matchAll(/data-store="([a-z]+)"/g)) stores[m[1]] = (stores[m[1]] || 0) + 1;
  const sl = Object.keys(stores).join(',');
  console.log('card @' + idx, '|', clean.slice(0, 45), '| stores:', sl || '(none)');
  idx += 1;
}
console.log('total cards:', (s.match(/guide-product-card-title/g) || []).length);