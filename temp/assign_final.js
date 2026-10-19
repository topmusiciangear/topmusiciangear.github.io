const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// ============================================================
// ESTRATEGIA: Asignar scores por posición dentro de cada guía
// Tier S (top 15%): 9.6-9.8
// Tier A (15-40%): 9.3-9.5
// Tier B (40-70%): 9.0-9.2
// Tier C (70-100%): 8.7-8.9
// ============================================================

const scoreByPosition = (pos, total) => {
  const pct = pos / Math.max(1, total - 1);
  let base;

  if (pct <= 0.15) base = 9.8 - (pct / 0.15) * 0.2;      // 9.8 -> 9.6
  else if (pct <= 0.40) base = 9.5 - ((pct - 0.15) / 0.25) * 0.2;  // 9.5 -> 9.3
  else if (pct <= 0.70) base = 9.2 - ((pct - 0.40) / 0.30) * 0.2;  // 9.2 -> 9.0
  else base = 8.9 - ((pct - 0.70) / 0.30) * 0.2;        // 8.9 -> 8.7

  return Math.round(base * 10) / 10;
};

// Para productos en múltiples guías, usar el score más alto
const productScores = {}; // título -> score

guides.forEach(g => {
  if (!g.productTable) return;
  const cols = g.productTable.columns;
  const n = cols.length;

  cols.forEach((c, i) => {
    const key = c.title || c.title_es;
    const score = scoreByPosition(i, n);
    if (!productScores[key] || score > productScores[key]) {
      productScores[key] = score;
    }
  });
});

// Asignar scores a todos los productos
let assigned = 0;
products.forEach(p => {
  const key = p.title || p.title_es;
  if (productScores[key]) {
    p.score = productScores[key];
    assigned++;
  } else {
    p.score = 8.7; // default para productos fuera de guías
  }
});

// Verificar
const dist = {};
products.forEach(p => { dist[p.score] = (dist[p.score] || 0) + 1; });
console.log('Distribución de scores:');
Object.entries(dist).sort((a, b) => b[0] - a[0]).forEach(([k, v]) => console.log('  ' + k + ': ' + v + ' productos'));

console.log('\nScore mínimo: ' + Math.min(...products.filter(p => p.score !== undefined).map(p => p.score)));
console.log('Score máximo: ' + Math.max(...products.filter(p => p.score !== undefined).map(p => p.score)));

// Verificar monitores clave
console.log('\nMonitores clave:');
['Yamaha HS8', 'JBL 305P MkII', 'Kali Audio LP-6 V2', 'Genelec 8010A', 'Neumann KH 80 DSP', 'Adam Audio A7V', 'Genelec 8351B SAM 3-Way Coaxial Studio Monitor'].forEach(n => {
  const x = products.find(y => y.title === n);
  if (x) console.log('  ' + n + ': ' + x.score);
});

// Verificar guitarras home office
console.log('\nGuitarras home office:');
['Donner HUSH-I EVO2', 'Taylor GS Mini-e Koa', 'Yamaha SLG200S', 'Yamaha SLG200N', 'Traveler Guitar Ultra-Light Steel', 'Traveler Guitar Ultra-Light Nylon', 'Enya Nova Go Sonic', 'Lava Music Lava ME 4'].forEach(n => {
  const x = products.find(y => y.title === n);
  if (x) console.log('  ' + n + ': ' + x.score);
});

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('\nListo.');