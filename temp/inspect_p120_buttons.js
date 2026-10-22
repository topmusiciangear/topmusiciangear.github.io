const fs = require('fs');
const file = process.argv[2] || 'guides/at2020-vs-p120.html';
const h = fs.readFileSync(file, 'utf8');
const grid = h.indexOf('<div class="guide-products-grid"');
const p120 = h.indexOf('AKG P120 Large-Diaphragm Condenser Microphone', grid);
const end = h.indexOf('Write a review', p120);
if (p120 < 0 || end < 0) { console.log('not found', p120, end); process.exit(0); }
const seg = h.slice(p120, end);
const re = /<a\b[^>]*data-store="([^"]+)"[^>]*>/g;
let m;
while ((m = re.exec(seg))) {
  const raw = m[0];
  const href = (raw.match(/href="([^"]+)"/) || [])[1] || '';
  console.log(m[1], '|', href.slice(0, 160).replace(/&amp;/g, '&'));
}
console.log('\nOOS / NA labels:', (seg.match(/Out of stock|No disponible|Not available|Agotado/g) || []).join(', '));
console.log('\nCard text:', seg.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 900));
