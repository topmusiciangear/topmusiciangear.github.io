const fs = require('fs');
const G = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'budget-bass-like-expensive');
console.log('--- filas problematicas ---');
G.productTable.rows.forEach(r => {
  const bad = r.values.filter(v => !v || !v.value || !v.value_es);
  if (r.values.length !== 10 || bad.length) console.log('[' + r.label + '] n=' + r.values.length + ' faltantes=' + JSON.stringify(bad));
});
console.log('\n--- SEC0 completa ---');
console.log('EN: ' + G.sections[0].content);
console.log('\nES: ' + G.sections[0].content_es);
console.log('\nheadings sin heading_es: ' + G.sections.filter(s => s.heading && !s.heading_es).length);