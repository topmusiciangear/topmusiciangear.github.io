const fs = require('fs');
const h = fs.readFileSync('guides/best-bass-amps.html', 'utf8');
const sigs = [
  ['483 Spark LIVE', 'positive-grid-spark-live'],
  ['484 Crush Bass 50', 'B01HPGEY6W'],
  ['485 DG210A', 'B07RL7FNFK'],
];
for (const [name, sig] of sigs) {
  // find the card-stores div containing this signature
  const ds = h.indexOf('guide-product-card-stores');
  let pos = h.indexOf(sig, ds);
  const cstart = h.lastIndexOf('guide-product-card-stores', pos);
  const cend = h.indexOf('guide-product-card-stores', pos + 1);
  const seg = h.slice(cstart, cend > -1 ? cend : cstart + 9000);
  const pm = /<a data-store="([^"]+)" href="([^"]+)" target="_blank"[^>]*class="shop-btn-primary"/.exec(seg) || /<a data-store="([^"]+)" href="([^"]+)"[^>]*class="shop-btn-primary"/.exec(seg);
  const rows = [];
  const more = seg.indexOf('shop-more-list');
  if (more > -1) {
    const re = /<a data-store="([^"]+)" href="([^"]+)"/g;
    let m; let c = 0;
    while ((m = re.exec(seg.slice(more))) && c < 6) { rows.push(m[1] + ' -> ' + m[2].slice(0, 80)); c++; }
  }
  const prices = [...new Set(seg.match(/[£$€][0-9,]+\.\d{2}/g) || [])];
  console.log('===', name, '===');
  console.log('  primary:', pm ? pm[1] + ' -> ' + pm[2] : 'NONE');
  rows.forEach(r => console.log('  row:', r));
  console.log('  prices:', prices.join(' | ') || '(none)');
  console.log();
}