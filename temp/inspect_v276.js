const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-interface');
console.log('=== FILAS DE LA TABLA ===');
g.productTable.rows.forEach((r, i) => {
  console.log(i + '. ' + (r.label || '?') + ' / ' + (r.label_es || '?') + '  [' + (r.values || []).length + ' valores]');
  (r.values || []).forEach((v, j) => {
    if (j < 2) console.log('     col' + j + ': ' + JSON.stringify(v.value) + ' | ' + JSON.stringify(v.value_es));
  });
});
console.log('\n=== FICHA VOLT 276 (id 263) ===');
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const v276 = arr.find(p => p.id === 263);
console.log(JSON.stringify(v276, null, 1));
// Ver una entrada de veredicto como modelo
console.log('\n=== MODELO VEREDICTO (Volt 2) ===');
const vv = g.verdictProsCons.find(v => v.name === 'Universal Audio Volt 2');
console.log(JSON.stringify(vv, null, 1));