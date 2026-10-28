const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const arr = Array.isArray(data) ? data : (data.products || Object.values(data));
const ids = [459, 1058, 1059];
for (const id of ids) {
  const p = arr.find(x => x.id === id);
  if (!p) { console.log(id, 'MISSING'); continue; }
  console.log(id, '|', p.title, '| cat:', p.category);
  console.log('  stores:', JSON.stringify(p.stores));
  console.log('  excludeStores:', JSON.stringify(p.excludeStores));
  console.log('  price:', p.price);
}
