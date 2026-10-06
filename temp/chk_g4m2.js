const fs = require('fs');
const h = fs.readFileSync('guides/best-digital-pianos.html', 'utf8');
const titles = [...h.matchAll(/guide-product-card-title">([^<]+)</g)];
console.log('titles:', titles.map(t => t[1]).join(' | '));
const start = h.indexOf('guide-product-card-title">Roland RP107');
const next = h.indexOf('guide-product-card-title">', start + 10);
const slice = h.slice(start, next > -1 ? next : start + 20000);
console.log('slice len', slice.length);
console.log('stores in slice:', (slice.match(/data-store="[a-z]+"/g) || []).join(','));
console.log('gear4music in slice:', slice.indexOf('gear4music'));
console.log('prices in slice:', (slice.match(/(£|€|\$)[0-9,.]+/g) || []).join(' '));
// all g4m occurrences with nearest preceding title
let idx = 0, seen = {};
while ((idx = h.indexOf('data-store="gear4music"', idx + 1)) > -1) {
  const pre = h.slice(0, idx);
  const tt = [...pre.matchAll(/guide-product-card-title">([^<]+)</g)].pop();
  const key = tt ? tt[1] : '(none)';
  seen[key] = (seen[key] || 0) + 1;
}
console.log('g4m rows by card:', JSON.stringify(seen, null, 1));
