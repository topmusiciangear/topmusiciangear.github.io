const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// ============================================================
// PASO 1: Construir ranking por guía desde veredictos + conclusiones
// ============================================================
// Mejor = aparece primero en veredictos o se recomienda en conclusión

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
  
  // 3) conclusion menciona productos (orden de mención = preferencia)
  if (g.conclusion) {
    const productsInGuide = order.slice();
    productsInGuide.forEach(name => {
      const idx = g.conclusion.indexOf(name);
      if (idx >= 0) {
        const currentIdx = order.indexOf(name);
        if (currentIdx > 0) {
          order.splice(currentIdx, 1);
          order.splice(Math.min(idx === 0 ? 0 : currentIdx, order.length), 0, name);
        }
      }
    });
  }
  
  return order;
}

// ============================================================
// PASO 2: Asignar scores únicos por jerarquía
// S=9.5-9.9 | A=9.2-9.4 | B=9.0-9.1 | C=8.7-8.9
// ============================================================

function assignScores(guide) {
  const ranking = getRanking(guide);
  const n = ranking.length;
  const scores = {};
  
  // Tiers según posición
  const sCount = Math.max(1, Math.round(n * 0.15));
  const aCount = Math.max(1, Math.round(n * 0.25));
  const bCount = Math.max(1, Math.round(n * 0.30));
  const cCount = n - sCount - aCount - bCount;
  
  // Score ranges (con pasos de 0.05 para garantizar unicidad)
  const sStart = 9.9, sEnd = 9.5;
  const aStart = 9.4, aEnd = 9.2;
  const bStart = 9.1, bEnd = 9.0;
  const cStart = 8.9, cEnd = 8.7;
  
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

// ============================================================
// PASO 3: Aplicar scores a products.json (max score por producto)
// ============================================================

const allScores = {};

guides.forEach(g => {
  const scores = assignScores(g);
  Object.entries(scores).forEach(([name, score]) => {
    if (!allScores[name] || score > allScores[name]) {
      allScores[name] = score;
    }
  });
});

// Asignar
products.forEach(p => {
  const key = p.title || p.title_es;
  if (allScores[key]) {
    p.score = allScores[key];
  }
});

// Verificar
const scores = products.map(p => p.score).filter(s => s !== undefined);
console.log('Productos con score: ' + scores.length + ' de ' + products.length);
console.log('Score mínimo: ' + Math.min(...scores));
console.log('Score máximo: ' + Math.max(...scores));

// Verificar unicidad por guía
let duplicados = 0;
guides.forEach(g => {
  const ranking = getRanking(g);
  const seen = new Set();
  ranking.forEach(name => {
    if (seen.has(allScores[name])) {
      duplicados++;
    }
    seen.add(allScores[name]);
  });
});
console.log('Scores duplicados dentro de guías: ' + duplicados);

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Listo.');