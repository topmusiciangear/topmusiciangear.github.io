const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// Primer paso: para cada guía, asignar scores en orden descendente
// basado en posición, con mínimo 8.5 y máximo 9.5
const productBestScore = {}; // título -> mejor score

guides.forEach(g => {
  if (!g.productTable) return;
  const cols = g.productTable.columns;
  const n = cols.length;

  cols.forEach((c, i) => {
    const base = 9.5 - (i / Math.max(1, n - 1)) * 1.0; // 9.5 -> 8.5
    const variation = Math.sin(i * 1.7) * 0.1;
    const score = Math.round((base + variation) * 10) / 10;

    const key = c.title || c.title_es;
    if (!productBestScore[key] || score > productBestScore[key]) {
      productBestScore[key] = score;
    }
  });
});

// Segundo paso: asignar el mejor score a cada producto
products.forEach(p => {
  const key = p.title || p.title_es;
  if (productBestScore[key]) {
    p.score = productBestScore[key];
  }
});

// Verificar inversiones
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

// Verificar monitores clave
console.log('\nMonitores clave:');
['Yamaha HS8', 'JBL 305P MkII', 'Kali Audio LP-6 V2', 'Genelec 8010A', 'Neumann KH 80 DSP', 'Adam Audio A7V'].forEach(n => {
  const x = products.find(y => y.title === n);
  if (x) console.log('  ' + n + ': ' + x.score);
});