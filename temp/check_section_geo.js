const fs = require('fs');
const file = process.argv[2] || 'guides/best-nylon-guitars-for-beginners_es.html';
const s = fs.readFileSync(file, 'utf8');
let from = 0, n = 0;
while (true) {
  const i = s.indexOf('store-buttons guide-section-buy', from);
  if (i < 0) break;
  from = i + 10;
  n++;
  const seg = s.slice(i, i + 9000);
  const end = seg.indexOf('</div></div>');
  const rows = (seg.match(/data-store="[a-z0-9]+"/g) || []);
  const stores = rows.map(r => r.slice(12, -1));
  const uniq = [...new Set(stores)];
  const moreStart = seg.indexOf('shop-more-list');
  const hasList = moreStart > 0;
  const beforeList = hasList ? seg.slice(0, moreStart) : seg;
  const priceRows = uniq.map(k => {
    const j = seg.indexOf('data-store="' + k + '"');
    const chunk = seg.slice(j, j + 900);
    const href = (chunk.match(/href="([^"]*)"/) || [])[1] || '';
    const pr = (chunk.match(/data-price="([^"]*)"/) || [])[1] || '';
    return k + ' -> ' + (pr || 'no-price') + ' | ' + (href ? href.slice(0, 60) : 'NO HREF');
  });
  const prim = seg.match(/<a[^>]*class="shop-btn-primary"[^>]*>/);
  const primStore = prim ? (prim[0].match(/data-store="([a-z0-9]+)"/) || [])[1] : null;
  console.log('--- section ' + n + ' ---');
  console.log('primary:', primStore);
  console.log('rows:', uniq.join(', '));
  priceRows.forEach(r => console.log('   ' + r));
  console.log('review before list:', /guide-review|Escribe una|Write a review/.test(beforeList));
  if (n >= 3) break;
}
console.log('total section wrappers:', n);
