const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

[683, 654].forEach(id => {
  const p = products.find(x => x.id === id);
  console.log('\n===== id ' + id + ' =====');
  console.log(JSON.stringify(p, null, 1).substring(0, 900));
});
