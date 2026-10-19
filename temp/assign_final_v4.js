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

// PASO 1: Score base por mejor posición en cualquier guía
const bestPos = {};
guides.forEach(g => {
  const ranking = getRanking(g);
  ranking.forEach((name, i) => {
    if (bestPos[name] === undefined || i < bestPos[name]) bestPos[name] = i;
  });
});

// Score = 9.9 - (mejorPos * paso), con paso que garantice unicidad
const allNames = Object.keys(bestPos);
allNames.sort((a, b) => bestPos[a] - bestPos[b]);
const scoreMap = {};
allNames.forEach((name, i) => {
  scoreMap[name] = Math.round((9.9 - i * 0.01) * 100) / 100;
});

// PASO 2: Resolver colisiones dentro de cada guía
// Si dos productos tienen el mismo score en una guía, el que tiene mejor posición en esa guía gana
let ajustes = 0;
guides.forEach(g => {
  const ranking = getRanking(g);
  const seen = {};
  ranking.forEach((name, i) => {
    const s = scoreMap[name];
    if (seen[s] !== undefined) {
      // Colisión: el producto con mejor posición en esta guía se queda con el score
      // El otro se baja un poco
      const prevName = seen[s];
      const prevPos = ranking.indexOf(prevName);
      if (i > prevPos) {
        // El actual tiene peor posición, bajar su score
        scoreMap[name] = Math.round((s - 0.01) * 100) / 100;
        ajustes++;
      } else {
        // El actual tiene mejor posición, bajar el anterior
        scoreMap[prevName] = Math.round((s - 0.01) * 100) / 100;
        seen[s] = name;
        ajustes++;
      }
    } else {
      seen[s] = name;
    }
  });
});

// Asignar a products.json
products.forEach(p => {
  const key = p.title || p.title_es;
  if (scoreMap[key] !== undefined) p.score = scoreMap[key];
});

// Verificar
let duplicados = 0;
guides.forEach(g => {
  const ranking = getRanking(g);
  const seen = new Set();
  ranking.forEach(name => {
    if (seen.has(scoreMap[name])) duplicados++;
    seen.add(scoreMap[name]);
  });
});

console.log('Scores asignados: ' + Object.keys(scoreMap).length);
console.log('Ajustes por colisión: ' + ajustes);
console.log('Duplicados dentro de guías: ' + duplicados);
console.log('Score mínimo: ' + Math.min(...Object.values(scoreMap)));
console.log('Score máximo: ' + Math.max(...Object.values(scoreMap)));

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Listo.');