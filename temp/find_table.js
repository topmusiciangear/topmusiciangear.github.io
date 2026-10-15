const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));

console.log('=== guias cuya tabla contiene ShaperBox 3 ===');
guides.forEach(g => {
  if (!g.productTable) return;
  const cols = g.productTable.columns.map(c=>c.title);
  if (cols.some(c => /ShaperBox/i.test(c))) console.log('  ' + g.id + ' (' + cols.length + ' col): ' + cols.join(' | '));
});
console.log('\n=== guias cuya tabla contiene RC-20 ===');
guides.forEach(g => {
  if (!g.productTable) return;
  const cols = g.productTable.columns.map(c=>c.title);
  if (cols.some(c => /RC-20/.test(c))) console.log('  ' + g.id + ' (' + cols.length + ' col): ' + cols.join(' | '));
});
console.log('\n=== guias cuya tabla contiene Transit 2 ===');
guides.forEach(g => {
  if (!g.productTable) return;
  const cols = g.productTable.columns.map(c=>c.title);
  if (cols.some(c => /Transit/.test(c))) console.log('  ' + g.id + ' (' + cols.length + ' col): ' + cols.join(' | '));
});
console.log('\n=== guias con tabla que mezclen ShaperBox y RC-20 ===');
guides.forEach(g => {
  if (!g.productTable) return;
  const cols = g.productTable.columns.map(c=>c.title);
  if (cols.some(c=>/ShaperBox/i.test(c)) && cols.some(c=>/RC-20/.test(c)))
    console.log('  ' + g.id + ': ' + cols.join(' | '));
});
console.log('\n=== sidechain-modulation-plugins en el JSON ===');
const sc = guides.find(g=>g.id==='sidechain-modulation-plugins');
console.log('  claves: ' + Object.keys(sc).join(', '));
console.log('  productTable: ' + (sc.productTable ? 'SI' : 'NO'));
console.log('\n=== TODAS las guias con tabla (cuenta) ===');
console.log('  ' + guides.filter(g=>g.productTable).length + ' de ' + guides.length);