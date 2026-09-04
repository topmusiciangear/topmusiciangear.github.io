const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const byId = {};
p.forEach(x => byId[x.id] = x.title);
const h = g.find(x => x.id === 'best-beginner-electric-guitar');
console.log('id:', h.id);
console.log('title:', JSON.stringify(h.title));
console.log('title_es:', JSON.stringify(h.title_es));
console.log('featuredProducts:', JSON.stringify(h.featuredProducts));
h.sections.forEach(function (s, i) {
  console.log('sec[' + i + '] heading:', JSON.stringify(s.heading || s.title || ''));
  console.log('   prods:', JSON.stringify(s.products.map(id => id + '=' + (byId[id] || '?'))));
});
console.log('productTable cols:');
h.productTable.columns.forEach(function (c) { console.log('   ', JSON.stringify(c.title)); });
