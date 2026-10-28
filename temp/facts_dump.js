const fs = require('fs');
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const arr = Array.isArray(p) ? p : (p.products || []);
console.log('products type', Array.isArray(p) ? 'array' : Object.keys(p).slice(0, 8), 'count', arr.length);
const ids = [459, 1058, 1059, 1060, 1061, 1062, 1063];
for (const id of ids) {
  const x = arr.find(v => String(v.id) === String(id));
  if (!x) { console.log(id, 'MISSING'); continue; }
  console.log('\n=== id ' + x.id + ' | ' + x.title);
  console.log('facts:', JSON.stringify(x.facts, null, 1));
}
