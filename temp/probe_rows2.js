const fs = require('fs');
const h = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html', 'utf8');
const i = h.indexOf('store-buttons guide-section-buy');
const zone = h.slice(i, i + 40000);
const idxs = [];
let p = -1;
while ((p = zone.indexOf('data-store="zzounds"', p + 1)) >= 0) idxs.push(p);
console.log('zzounds rows in zone:', idxs.length);
for (const p of idxs.slice(0, 2)) {
  const seg = zone.slice(p - 100, p + 1800).replace(/<svg[\s\S]*?<\/svg>/g, '<svg/>');
  console.log('-----');
  console.log(seg.replace(/></g, '>\n<'));
}
