const fs = require('fs');
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
[164, 165, 163, 441, 442].forEach(id => {
  const p = arr.find(y => y.id === id);
  console.log('=== ' + id + ' === ' + (p ? p.title : 'FALTA'));
  if (!p) return;
  console.log('  price ' + p.price + ' | ' + p.category);
  console.log('  desc: ' + p.desc);
  console.log('  img: ' + p.img);
  console.log('  stores: ' + JSON.stringify(p.stores));
});
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-expensive');
console.log('\n--- SECCIONES detalle ---');
[0, 1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].forEach(i => {
  const s = g.sections[i];
  console.log('[' + i + '] ' + s.heading + '  ||  ES: ' + s.heading_es);
});
console.log('\n--- filas tabla con ES (para modelo) ---');
g.productTable.rows.forEach(r => console.log('[' + r.label + '] ES: ' + JSON.stringify(r.values[0])));
console.log('\n--- verdictProsCons presentes ---');
g.verdictProsCons.map(v => v.name).forEach(n => console.log(' * ' + n));