const fs = require('fs');
const h = fs.readFileSync('guides/best-studio-monitors-under-150.html', 'utf8');
const marker = 'letter-spacing:-.01em;">';
let idx = 0;
let n = 0;
while ((idx = h.indexOf(marker, idx)) !== -1) {
  const val = h.slice(idx + marker.length, idx + marker.length + 4);
  if (!/^9\.\d/.test(val)) { idx += 1; continue; }
  const before = h.slice(Math.max(0, idx - 2500), idx);
  const heads = [...before.matchAll(/<(h1|h2|h3)[^>]*>([\s\S]*?)<\/\1>/g)].map(m => m[2].replace(/<[^>]+>/g, '').trim());
  const pn = [...before.matchAll(/product-name">([^<]+)</g)].map(m => m[1]);
  console.log('badge ' + val + ' | last heading: ' + (heads[heads.length - 1] || '-') + ' | last product-name: ' + (pn[pn.length - 1] || '-'));
  n++;
  idx += 1;
}
console.log('total badges:', n);
