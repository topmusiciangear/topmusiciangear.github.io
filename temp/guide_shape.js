const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-piano-keyboard-vsts');
console.log('claves guia: ' + Object.keys(g).join(', '));
const dump = (label, arr) => {
  if (!Array.isArray(arr)) return;
  console.log('\n### ' + label + ' (' + arr.length + ')');
  arr.forEach(x => {
    if (typeof x === 'number') { const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8')).find(y => y.id === x); return console.log('  id ' + x + ' (numero)'); }
    console.log('  ' + JSON.stringify(x).slice(0, 260));
  });
};
dump('featuredProducts', g.featuredProducts);
dump('products', g.products);
if (g.sections) g.sections.forEach((s, i) => { if (s.products) dump('section[' + i + '] ' + (s.heading || '').slice(0, 30), s.products); });