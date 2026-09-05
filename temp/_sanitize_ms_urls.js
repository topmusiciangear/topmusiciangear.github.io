const fs = require('fs');
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
let fixed = 0;
for (const p of prods) {
  const st = p.stores || {};
  for (const k of Object.keys(st)) {
    let u = st[k];
    if (typeof u !== 'string') continue;
    if (u.indexOf('musicstore.com/') >= 0 && u.indexOf('?') >= 0) {
      st[k] = u.slice(0, u.indexOf('?'));
      console.log('id', p.id, k, 'CLEANED');
      fixed++;
    }
  }
}
fs.writeFileSync('data/products.json', JSON.stringify(prods, null, 2) + '\n');
console.log('total cleaned:', fixed);