const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const w = G.find(x => x.id === 'wireless-intercom-systems');
['intro', 'conclusion'].forEach(f => {
  if (typeof w[f] === 'string') w[f] = w[f].split('inalámbrico real').join('true-wireless');
});
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const s = JSON.stringify(w);
const left = (s.match(/inalámbrico real/g) || []).length;
console.log('inalámbrico restantes:', left);
let i = -1, ok = true;
const keys = [];
while ((i = s.indexOf('inalámbrico real', i + 1)) > -1) {
  const seg = s.slice(Math.max(0, i - 120), i);
  const m = seg.match(/"([a-z_0-9]+)":"[^"]*$/);
  keys.push(m ? m[1] : '?');
}
console.log('claves:', [...new Set(keys)].join(','));