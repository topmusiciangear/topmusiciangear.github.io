const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const h = g.find(x => x.id && /electric-guitar/i.test(x.id));
if (!h) { console.log('electric guide not found. ids:'); g.forEach(x=>console.log(' -', x.id)); process.exit(0); }
console.log('id:', h.id);
console.log('title:', JSON.stringify(h.title));
console.log('title_es:', JSON.stringify(h.title_es));
console.log('featuredProducts:', JSON.stringify(h.featuredProducts));
h.sections.forEach(function (s, i) {
  console.log('sec[' + i + '] heading:', JSON.stringify((s.heading || s.title || '')));
  console.log('   products:', JSON.stringify(s.products));
});
console.log('productTable cols:', h.productTable.columns.length);
h.productTable.columns.forEach(function (c) { console.log('   col:', JSON.stringify(c.title)); });
