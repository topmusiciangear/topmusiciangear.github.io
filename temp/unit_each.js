const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
[494, 626, 630, 631].forEach(id => {
  const x = products.find(y => y.id === id);
  console.log(id, x.title, '| unit before:', x.unit);
  x.unit = 'each';
});
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));
console.log('saved');
