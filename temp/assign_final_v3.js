const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

function getRanking(g) {
  const order = [];
  if (g.verdictProsCons && g.verdictProsCons.length) {
    g.verdictProsCons.forEach(v => {
      if (v.name && !order.includes(v.name)) order.push(v.name);
    });
  }
  if (g.productTable && g.productTable.columns) {
    g.productTable.columns.forEach(c => {
      const name = c.title_es || c.title;
      if (name && !order.includes(name)) order.push(name);
    });
  }
  return order;
}

function assignScores(guide) {
  const ranking = getRanking(guide);
  const n = ranking.length;
  const scores = {};
  // 12 pasos con precisión de 2 decimales
  const sStart = 9.9, sEnd = 9.5;
  const aStart = 9.4, aEnd = 9.2;
  const bStart = 9.1, bEnd = 9.0;
  const cStart = 8.9, cEnd = 8.7;
  
  const sCount = Math.max(1, Math.round(n * 0.15));
  const aCount = Math.max(1, Math.round(n * 0.25));
  const bCount = Math.max(1, Math.round(n * 0.30));
  const cCount = n - sCount - aCount - bCount;
  
  ranking.forEach((name, i) => {
    let score;
    if (i < sCount) {
      const pct = i / Math.max(1, sCount - 1);
      score = sStart - (sStart - sEnd) * pct;
    } else if (i < sCount + aCount) {
      const j = i - sCount;
      const pct = j / Math.max(1, aCount - 1);
      score = aStart - (aStart - aEnd) * pct;
    } else if (i < sCount + aCount + bCount) {
      const j = i - sCount - aCount;
      const pct = j / Math.max(1, bCount - 1);
      score = bStart - (bStart - bEnd) * pct;
    } else {
      const j = i - sCount - aCount - bCount;
      const pct = j / Math.max(1, cCount - 1);
      score = cStart - (cStart - cEnd) * pct;
    }
    scores[name] = Math.round(score * 100) / 100;
  });
  
  return scores;
}

const allScores = {};
guides.forEach(g => {
  const scores = assignScores(g);
  Object.entries(scores).forEach(([name, score]) => {
    if (!allScores[name] || score > allScores[name]) {
      allScores[name] = score;
    }
  });
});

products.forEach(p => {
  const key = p.title || p.title_es;
  if (allScores[key]) p.score = allScores[key];
});

// Verificar
let duplicados = 0;
guides.forEach(g => {
  const ranking = getRanking(g);
  const seen = new Set();
  ranking.forEach(name => {
    const s = allScores[name];
    if (seen.has(s)) duplicados++;
    seen.add(s);
  });
});

console.log('Productos con score: ' + products.filter(p => p.score !== undefined).length + ' de ' + products.length);
console.log('Score mínimo: ' + Math.min(...products.filter(p => p.score !== undefined).map(p => p.score)));
console.log('Score máximo: ' + Math.max(...products.filter(p => p.score !== undefined).map(p => p.score)));
console.log('Duplicados dentro de guías: ' + duplicados);

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Listo.');