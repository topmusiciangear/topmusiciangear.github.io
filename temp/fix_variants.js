const fs = require('fs');
const P = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(P, 'utf8'));

// 1. studio-furniture: columna "K&M Monitor Stands (Pair)" -> titulo de catalogo/veredicto (Each)
const sf = guides.find(x => x.id === 'studio-furniture');
const col = sf.productTable.columns.find(c => c.title === 'K&M Monitor Stands (Pair)');
if (!col) { console.log('!! columna Pair no encontrada'); process.exit(1); }
col.title = 'K&M 26722 Monitor Stands (Each)';
col.title_es = 'Soportes de Monitor K&M 26722 (Unidad)';
console.log('studio-furniture: columna -> Each');

// 2. best-guitar-home-office: columna "Taylor GS Mini" -> "Taylor GS Mini-e Koa"
const bg = guides.find(x => x.id === 'best-guitar-home-office');
const col2 = bg.productTable.columns.find(c => c.title === 'Taylor GS Mini');
if (!col2) { console.log('!! columna GS Mini no encontrada'); process.exit(1); }
col2.title = 'Taylor GS Mini-e Koa';
col2.title_es = 'Taylor GS Mini-e Koa';
console.log('best-guitar-home-office: columna -> GS Mini-e Koa');

// Verificar resto de valores de esas columnas (precio etc. corresponden al producto correcto?)
const idx1 = sf.productTable.columns.indexOf(col);
console.log('studio-furniture valores col Each:');
sf.productTable.rows.forEach(r => {
  const v = r.values[idx1];
  console.log('  [' + r.label + '] ' + (v ? v.value + ' | ' + v.value_es : 'FALTA'));
});
const idx2 = bg.productTable.columns.indexOf(col2);
console.log('home-office valores col Koa:');
bg.productTable.rows.forEach(r => {
  const v = r.values[idx2];
  console.log('  [' + r.label + '] ' + (v ? v.value + ' | ' + v.value_es : 'FALTA'));
});

fs.writeFileSync(P, JSON.stringify(guides, null, 2));
console.log('guardado');