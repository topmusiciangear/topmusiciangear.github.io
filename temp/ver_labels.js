const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
console.log('=== etiquetas de fila (ancho de la 1ª columna) ===');
s.productTable.rows.forEach((r, i) => {
  console.log('[' + i + '] EN(' + r.label.length + '): ' + r.label);
  console.log('    ES(' + r.label_es.length + '): ' + r.label_es);
});
