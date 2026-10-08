const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
[494, 626].forEach(id => {
  const x = products.find(y => y.id === id);
  if (!x.desc.endsWith('(each)')) x.desc = x.desc + ' (each)';
  if (!x.desc_es.endsWith('(cada uno)')) x.desc_es = x.desc_es + ' (cada uno)';
  console.log(id, '|', x.desc.slice(-60));
  console.log(id, '|', x.desc_es.slice(-60));
});
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));
console.log('saved');
