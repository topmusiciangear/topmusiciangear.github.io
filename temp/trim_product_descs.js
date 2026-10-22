const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const MAX = 145;
function trim(s) {
  if (!s || s.length <= MAX) return s;
  const cut = s.slice(0, MAX);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trim();
}
let changed = 0;
for (const p of products) {
  const o1 = p.desc, o2 = p.desc_es;
  p.desc = trim(p.desc);
  p.desc_es = trim(p.desc_es);
  if (p.desc !== o1 || p.desc_es !== o2) changed++;
}
fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2));
console.log('products changed:', changed, 'of', products.length);
// check max desc length now
const lens = products.map(p => (p.desc||'').length);
console.log('max desc len now:', Math.max(...lens), 'avg:', Math.round(lens.reduce((a,b)=>a+b,0)/lens.length));
