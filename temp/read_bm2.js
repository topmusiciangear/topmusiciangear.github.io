const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8')).find(x => x.id === 'best-microphone');
// Overviews completos
['Condenser Microphones: Studio Detail and Clarity', 'USB Microphones: Plug-and-Play for Creators', 'Live & Stage Microphones: Built for the Road', 'Ribbon Microphones: Vintage Warmth for the Modern Studio'].forEach(h => {
  const s = (g.sections || []).find(x => x && x.heading === h);
  console.log('=== ' + h + ' products=' + JSON.stringify(s ? s.products : null) + ' ===');
  console.log('EN: ' + (s ? s.content : 'FALTA'));
  console.log('ES: ' + (s ? s.content_es : 'FALTA'));
  console.log('');
});
// Tabla completa con formatos
console.log('=== TABLA (formato por fila, col SM7B) ===');
g.productTable.rows.forEach(r => {
  console.log('[' + r.label + ' / ' + r.label_es + ']');
  console.log('   EN: ' + r.values.map(v => v.value).join(' | '));
  console.log('   ES: ' + r.values.map(v => v.value_es).join(' | '));
});
// Precios catalogo
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
console.log('\n=== PRECIOS ===');
[366, 196, 672, 297, 3, 673, 652, 1, 321, 674, 4].forEach(id => {
  const p = arr.find(x => x.id === id);
  console.log(id + ' ' + (p ? p.title + ' $' + p.price : 'FALTA'));
});