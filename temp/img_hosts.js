const p = require('../data/products.json');
const list = Array.isArray(p) ? p : (p.products || []);
const hosts = {};
for (const x of list) {
  const img = x.img || '';
  if (!/^https?:/.test(img)) { hosts['(local)'] = (hosts['(local)'] || 0) + 1; continue; }
  let h = '?';
  try { h = new URL(img).host; } catch (e) { h = 'malformada'; }
  hosts[h] = (hosts[h] || 0) + 1;
}
console.log('total productos:', list.length);
Object.entries(hosts).sort((a, b) => b[1] - a[1]).forEach(([h, n]) => console.log(String(n).padStart(4), h));
