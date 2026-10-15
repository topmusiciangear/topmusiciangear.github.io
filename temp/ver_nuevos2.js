const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;

[16, 674].forEach(id => {
  const p = list.find(x => x.id === id);
  console.log('\n' + '='.repeat(64));
  console.log('  id ' + id + ' · ' + p.title);
  console.log('='.repeat(64));
  console.log(JSON.stringify(p, null, 1));
});
