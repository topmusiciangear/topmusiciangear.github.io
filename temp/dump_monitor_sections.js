const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'monitor-setup');

console.log('=== TABLE COMPLETA ===');
g.productTable.columns.forEach((c, i) => console.log('[' + i + '] ' + c.title + ' || ' + c.title_es));
for (const row of g.productTable.rows) {
  console.log('\nROW: ' + row.label);
  row.values.forEach((v, i) => console.log('  [' + i + '] ' + JSON.stringify(v)));
}

console.log('\n\n=== CONTENIDO DE SECCIONES ===');
for (const i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
  const s = g.sections[i];
  console.log('\n----- [' + i + '] ' + s.heading + ' -----');
  console.log('EN: ' + s.content);
  console.log('ES: ' + s.content_es);
  console.log('verdict: ' + (s.verdict || '') + ' | verdict_es: ' + (s.verdict_es || ''));
}
