const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const arr = Array.isArray(data) ? data : (data.products || Object.values(data));
for (const id of [459, 553, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065]) {
  const p = arr.find(x => x.id === id);
  if (!p) { console.log(id, 'MISSING'); continue; }
  console.log('\n' + id, '|', p.title);
  Object.entries(p.stores || {}).forEach(([k, v]) => console.log('   ' + k + ': ' + v));
}
