const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// Para cada guía, asignar scores en orden descendente según posición en la tabla
// Primer producto = 9.5, último = 8.5 (con pequeñas variaciones)
guides.forEach(g => {
  if (!g.productTable) return;
  const cols = g.productTable.columns;
  const n = cols.length;

  cols.forEach((c, i) => {
    const p = products.find(x => x.title === c.title || x.title_es === c.title_es);
    if (!p) return;

    // Score basado en posición: primero = más alto
    const base = 9.5 - (i / Math.max(1, n - 1)) * 1.0; // 9.5 -> 8.5
    // Pequeña variación para que no sea perfectamente lineal
    const variation = Math.sin(i * 1.7) * 0.1;
    p.score = Math.round((base + variation) * 10) / 10;
  });
});

// Verificar
let problemas = 0;
guides.forEach(g => {
  if (!g.productTable) return;
  const cols = g.productTable.columns;
  const scores = cols.map(c => {
    const p = products.find(x => x.title === c.title || x.title_es === c.title_es);
    return p ? p.score : undefined;
  });

  let inversiones = 0;
  for (let i = 0; i < scores.length - 1; i++) {
    if (scores[i] === undefined || scores[i + 1] === undefined) continue;
    if (scores[i] < scores[i + 1] - 0.05) inversiones++;
  }

  if (inversiones > 0) {
    problemas++;
    console.log(g.id + ': ' + inversiones + ' inversiones');
  }
});

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('\n============================');
console.log('Guías con inversiones: ' + problemas + ' de ' + guides.filter(g => g.productTable).length);
console.log('Score mínimo: ' + Math.min(...products.filter(p => p.score !== undefined).map(p => p.score)));
console.log('Score máximo: ' + Math.max(...products.filter(p => p.score !== undefined).map(p => p.score)));