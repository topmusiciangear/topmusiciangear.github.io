const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// Para cada guía con productTable, verificar que los scores están en orden descendente
// (o al menos que no haya inversiones graves)
let problemas = 0;

guides.forEach(g => {
  if (!g.productTable) return;
  const cols = g.productTable.columns;
  const scores = cols.map(c => {
    const p = products.find(x => x.title === c.title || x.title_es === c.title_es);
    return p ? p.score : undefined;
  });

  // Detectar inversiones (un producto con score menor antes de uno con mayor)
  let inversiones = [];
  for (let i = 0; i < scores.length - 1; i++) {
    if (scores[i] === undefined || scores[i + 1] === undefined) continue;
    if (scores[i] < scores[i + 1] - 0.3) {
      inversiones.push({
        pos: i,
        a: cols[i].title_es + ' (' + scores[i] + ')',
        b: cols[i + 1].title_es + ' (' + scores[i + 1] + ')'
      });
    }
  }

  if (inversiones.length > 0) {
    problemas++;
    console.log('### ' + g.id + ' (' + cols.length + ' productos)');
    inversiones.forEach(inv => console.log('  ' + inv.a + '  ->  ' + inv.b));
    console.log('');
  }
});

console.log('============================');
console.log('Guías con inversiones de score: ' + problemas + ' de ' + guides.filter(g => g.productTable).length);