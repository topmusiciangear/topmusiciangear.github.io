const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/pro-microphones.html', 'utf8');
const needle = 'Neumann U 87 Ai';
let idx = 0; const spots = [];
while ((idx = h.indexOf(needle, idx)) > -1) { spots.push(idx); idx += needle.length; }
console.log('occurrences:', spots.length);
let cardAt = 0;
spots.forEach(s => {
  const ctx = h.slice(Math.max(0, s - 300), s);
  if (ctx.includes('guide-product-card-title')) cardAt = s;
});
console.log('card at:', cardAt);
const listAt = h.indexOf('shop-more-list', cardAt);
console.log('list offset from card:', listAt - cardAt);
const seg = h.slice(listAt, listAt + 15000);
// list all rows: store + has price?
const rows = [...seg.matchAll(/data-store="([a-z]+)"/g)].map(m => m[1]);
console.log('rows:', rows.join(','));
const mi = seg.indexOf('data-store="musicstore"');
const rowStart = seg.lastIndexOf('<a ', mi);
const rowEnd = seg.indexOf('</a>', mi);
console.log('--- MS ROW ---');
console.log(seg.slice(rowStart, rowEnd + 4).replace(/<svg.*?<\/svg>/g, '[FLAG]'));