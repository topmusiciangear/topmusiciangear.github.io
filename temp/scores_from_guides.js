const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// ============================================================
// EXTRAER TODOS LOS PRODUCTOS DE LAS GUÍAS Y SU POSICIÓN
// ============================================================

const productPositions = {}; // title -> { guideId, position, total, verdict, isTop }

guides.forEach(g => {
  // 1) productTable rows -> cada columna es un producto
  if (g.productTable && g.productTable.columns) {
    g.productTable.columns.forEach((col, colIdx) => {
      const title = col.title || col.title_es;
      if (!title) return;
      const key = title.toLowerCase().trim();
      if (!productPositions[key]) productPositions[key] = [];
      productPositions[key].push({
        guide: g.id,
        position: colIdx + 1,
        total: g.productTable.columns.length,
        isTop: colIdx === 0
      });
    });
  }
  // 2) productTable rows -> cada fila tiene values por columna
  if (g.productTable && g.productTable.rows) {
    g.productTable.rows.forEach(row => {
      if (!row.values) return;
      row.values.forEach((val, colIdx) => {
        const title = val.label || val.label_es || val.value || val.value_es;
        if (!title) return;
        const key = title.toLowerCase().trim();
        if (!productPositions[key]) productPositions[key] = [];
        productPositions[key].push({
          guide: g.id,
          position: colIdx + 1,
          total: g.productTable.columns?.length || 0,
          rowLabel: row.label_es || row.label
        });
      });
    });
  }
  // 3) verdictProsCons
  if (g.verdictProsCons) {
    g.verdictProsCons.forEach((v, idx) => {
      const title = v.name || v.name_es;
      if (!title) return;
      const key = title.toLowerCase().trim();
      if (!productPositions[key]) productPositions[key] = [];
      productPositions[key].push({
        guide: g.id,
        position: idx + 1,
        total: g.verdictProsCons.length,
        verdict: v.name_es || v.name,
        isTop: idx === 0
      });
    });
  }
});

// ============================================================
// CALCULAR SCORE BASE POR GUÍA
// ============================================================

const guideScores = {}; // guideId -> { topScore, bottomScore }

guides.forEach(g => {
  const n = (g.productTable?.columns?.length) || (g.verdictProsCons?.length) || 0;
  if (n <= 1) return;
  // Score range: top = 9.5, bottom = 7.0 (ajustable por categoría)
  let top = 9.2, bottom = 7.2;
  // Ajustes por categoría
  if (g.id.includes('pro-')) { top = 9.5; bottom = 8.0; }
  else if (g.id.includes('budget-')) { top = 8.5; bottom = 7.0; }
  else if (g.id.includes('best-')) { top = 9.0; bottom = 7.2; }
  guideScores[g.id] = { top, bottom, n };
});

console.log('Guide score ranges:');
Object.entries(guideScores).slice(0, 20).forEach(([id, s]) => console.log(`  ${id}: ${s.top} -> ${s.bottom} (${s.n} items)`));

// ============================================================
// MAPEAR PRODUCTOS DE GUÍAS A PRODUCTOS.JSON POR TÍTULO
// ============================================================

// Primero: crear índice de productos.json por title/title_es
const productIndex = {};
products.forEach((p, idx) => {
  const keys = [p.title, p.title_es].filter(Boolean).map(k => k.toLowerCase().trim());
  keys.forEach(k => { if (!productIndex[k]) productIndex[k] = []; productIndex[k].push(idx); });
});

// Segundo: para cada entrada en productPositions, buscar match en products.json
const scoresFromGuides = {}; // productIdx -> [scores de distintas guías]

Object.entries(productPositions).forEach(([key, positions]) => {
  // Buscar en products.json
  let matches = productIndex[key];
  if (!matches) {
    // Fuzzy match
    matches = Object.keys(productIndex).filter(k => k.includes(key) || key.includes(k))
      .flatMap(k => productIndex[k]);
  }
  if (!matches || matches.length === 0) return;

  // Para cada guía donde aparece, calcular score
  positions.forEach(pos => {
    const gs = guideScores[pos.guide];
    if (!gs) return;
    const { top, bottom, n } = gs;
    const pct = (pos.position - 1) / Math.max(1, n - 1);
    const score = Math.round((top - (top - bottom) * pct) * 10) / 10;
    matches.forEach(idx => {
      if (!scoresFromGuides[idx]) scoresFromGuides[idx] = [];
      scoresFromGuides[idx].push({ score, guide: pos.guide, position: pos.position, total: n });
    });
  });
});

// ============================================================
// APLICAR: promediar scores de todas las guías donde aparece
// ============================================================

let applied = 0;
Object.entries(scoresFromGuides).forEach(([idxStr, arr]) => {
  const idx = parseInt(idxStr);
  const avg = arr.reduce((a, b) => a + b.score, 0) / arr.length;
  const rounded = Math.round(avg * 10) / 10;
  if (products[idx].score === undefined || rounded > products[idx].score) {
    products[idx].score = rounded;
    applied++;
    console.log(`  ${products[idx].id}: ${products[idx].title} -> ${rounded} (de ${arr.length} guías: ${arr.map(x=>x.score).join(', ')})`);
  }
});

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('\nScores aplicados desde guías: ' + applied);
const conScore = products.filter(p => p.score !== undefined).length;
console.log('Productos con score total: ' + conScore);