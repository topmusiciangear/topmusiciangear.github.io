const fs = require('fs');
const h = fs.readFileSync('guides/best-bass-practice-amps.html', 'utf8');
const seg = h.slice(88709, 91000);
const re = /data-store="([a-z]+)"/g;
let m;
const stores = [];
while ((m = re.exec(seg)) !== null) stores.push(m[1]);
console.log('stores in 489 card:', [...new Set(stores)].join(','));
const g = seg.indexOf('gear4music');
console.log('gear4music row present:', g > -1);
if (g > -1) {
  const a = seg.lastIndexOf('<a ', g);
  console.log(seg.slice(a, g + 400).replace(/\s+/g, ' '));
}