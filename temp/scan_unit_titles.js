const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const re = /\((each|pair|unidad|par|cada uno|cada una|c\/u|ea)\)/i;
const hits = products.filter(p => re.test(p.title || '') || re.test(p.title_es || ''));

console.log('productos con sufijo de unidad:', hits.length);
for (const p of hits) {
  console.log(p.id + ' | ' + p.title + ' || ' + p.title_es);
}
