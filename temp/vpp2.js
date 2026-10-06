const fs = require('fs');
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
for (const id of [565,566,567,568,569,570,571,572,140,141,565]) {
  const pr = p.find(x => x.id === id);
  console.log('=== ' + id + ' ' + pr.title);
  console.log('  img:', pr.img);
  console.log('  stores:', JSON.stringify(pr.stores, null, 1));
}
