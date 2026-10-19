const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// ============================================================
// PASO 1: Cada guía ranquea sus productos de mejor a peor
// según sus veredictos y conclusiones
// ============================================================

function getRanking(g) {
  const order = [];
  
  // 1) verdictProsCons ordena por recomendación
  if (g.verdictProsCons && g.verdictProsCons.length) {
    g.verdictProsCons.forEach(v => {
      if (v.name && !order.includes(v.name)) order.push(v.name);
    });
  }
  
  // 2) productTable.columns ordena por posición en tabla
  if (g.productTable && g.productTable.columns) {
    g.productTable.columns.forEach(c => {
      const name = c.title_es || c.title;
      if (name && !order.includes(name)) order.push(name);
    });
  }
  
  return order;
}

// ============================================================
// PASO 2: Asignar scores por posición dentro de cada guía
// Mejor = 9.8, Peor = 8.7, lineal entre ambos
// ============================================================

const productScores = {}; // título -> [scores de distintas guías]

guides.forEach(g => {
  const ranking = getRanking(g);
  const n = ranking.length;
  
  ranking.forEach((name, i) => {
    const pct = i / Math.max(1, n - 1);
    const score = 9.8 - pct * 1.1; // 9.8 -> 8.7
    
    if (!productScores[name]) productScores[name] = [];
    productScores[name].push(score);
  });
});

// ============================================================
// PASO 3: Promediar scores de cada producto
// ============================================================

const finalScores = {};
Object.entries(productScores).forEach(([name, scores]) => {
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  finalScores[name] = Math.round(avg * 100) / 100;
});

// Asignar a products.json
products.forEach(p => {
  const key = p.title || p.title_es;
  if (finalScores[key]) p.score = finalScores[key];
});

// Verificar
const scores = products.map(p => p.score).filter(s => s !== undefined);
console.log('Productos con score: ' + scores.length + ' de ' + products.length);
console.log('Score mínimo: ' + Math.min(...scores));
console.log('Score máximo: ' + Math.max(...scores));

// Distribución
const dist = {};
scores.forEach(s => { dist[s] = (dist[s] || 0) + 1; });
console.log('\nDistribución:');
Object.entries(dist).sort((a, b) => b[0] - a[0]).forEach(([k, v]) => console.log('  ' + k + ': ' + v + ' productos'));

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('\nListo.');