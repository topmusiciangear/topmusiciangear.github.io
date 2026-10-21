const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const money = /(\$|€|£)\s?\d|\b\d[\d.,]*\s?(USD|EUR|GBP|dollars?|euros?|pounds?)\b|\b(around|about|under|over|for|at|desde|por|bajo|menos de|más de|unos|alrededor de)\s+(\$|€|£)/i;
const hits = products.filter(p => money.test(p.desc || '') || money.test(p.desc_es || ''));

console.log('productos con precio en descripcion:', hits.length, 'de', products.length);
for (const p of hits) {
  console.log('\n#' + p.id + ' ' + p.title);
  if (money.test(p.desc || '')) console.log('  EN: ' + p.desc);
  if (money.test(p.desc_es || '')) console.log('  ES: ' + p.desc_es);
}
