const fs = require('fs');
const d = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-electric-guitar.html', 'utf8');
const re = /ued=https%3A%2F%2Fwww\.gear4music\.com%2F"/g;
let m, n = 0;
while ((m = re.exec(d))) {
  n++;
  const tag = d.slice(Math.max(0, m.index - 700), m.index);
  const store = (tag.match(/data-store="([^"]+)"/) || [])[1];
  const seg = d.slice(Math.max(0, m.index - 15000), m.index);
  const ids = [...seg.matchAll(/openReviewModal\((\d+)\)/g)].map(x => x[1]);
  const h2 = [...seg.matchAll(/<h2[^>]*>([\s\S]{0,150}?)<\/h2>/g)].map(x => x[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  console.log('--- #' + n + '  store=' + store);
  console.log('  producto: ' + (ids.length ? ids[ids.length - 1] : '?'));
  console.log('  h2: ' + (h2.length ? h2[h2.length - 1].slice(0, 90) : '?'));
}
console.log('\ntotal: ' + n);
