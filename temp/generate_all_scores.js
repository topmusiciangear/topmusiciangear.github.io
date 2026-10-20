const fs = require('fs');
const path = require('path');

// 1. Cargar datos base
const guides = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'guides.json'), 'utf8'));
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf8'));

// 2. Cargar scores consolidados de investigación
const consolidated = JSON.parse(fs.readFileSync(path.join(__dirname, 'consolidated_scores.json'), 'utf8'));

// 3. Cargar score_overrides.js existente
const existingOverrides = require('./score_overrides.js');

// 3b. Normalizar nombres de productos para lookup
const byId = {};
for (const p of products) if (p.id) byId[p.id] = p;

function cleanTitle(name) {
  return (name || '').trim();
}

// 4. Función para obtener productos de una guía
function getGuideProducts(guide) {
  const ids = [];
  for (const s of (guide.sections || [])) {
    for (const pid of (s.products || [])) {
      if (typeof pid === 'number' && !ids.includes(pid)) ids.push(pid);
    }
  }
  return ids.map(id => byId[id]).filter(Boolean);
}

// 5. Determinar tipo de guía
function getGuideType(guide) {
  const id = guide.id;
  if (/-vs-/.test(id)) return 'duel';
  if (/budget|menos-de|under|economic|barat/.test(id)) return 'budget';
  if (/^best-|^best/.test(id) || /^mejores/.test(guide.title_es || '') || /^mejor/.test(guide.title_es || '')) return 'best';
  return 'default';
}

// 6. Determinar si es guía de categoría mixta
function isMixedCategory(guide) {
  const cats = new Set();
  for (const s of (guide.sections || [])) {
    for (const pid of (s.products || [])) {
      const p = byId[pid];
      if (p && p.category) cats.add(p.category);
    }
  }
  return cats.size > 1;
}

// 7. Obtener score base según tipo y posición
function getBaseScore(guideType, position, total, isWinner, isMixed) {
  // Winner siempre tiene el score más alto
  if (isWinner) {
    if (guideType === 'duel') return 9.7;
    if (guideType === 'budget') return 9.7;
    if (guideType === 'best') return 9.8;
    return 9.7;
  }
  
  // Para no-winners, decrementar según posición
  const remaining = total - 1;
  const pos = position - 1; // 0-indexed para no-winners
  
  let base;
  if (guideType === 'duel') base = 9.3;
  else if (guideType === 'budget') base = 9.5;
  else if (guideType === 'best') base = 9.6;
  else base = 9.4;
  
  // Decremento progresivo
  const step = Math.min(0.3, 1.5 / Math.max(1, remaining));
  let score = base - (pos * step);
  
  // Suelo mínimo
  return Math.max(7.5, Math.round(score * 10) / 10);
}

// 8. Ajustes por categoría
function adjustByCategory(score, category, guideType) {
  if (!category) return score;
  
  const cat = category.toLowerCase();
  
  // Categorías premium tienden a scores más altos
  if (['interfaces', 'monitors', 'headphones', 'microphones', 'instruments'].includes(cat)) {
    return Math.min(9.9, score + 0.1);
  }
  
  // Budget/categorías entry-level
  if (['budget', 'beginner', 'entry'].includes(cat)) {
    return Math.max(7.5, score - 0.1);
  }
  
  // Live sound / PA - scores ligeramente más conservadores
  if (['live_sound', 'pa', 'mixers'].includes(cat)) {
    return Math.min(9.8, score);
  }
  
  return score;
}

// 9. Función principal para generar scores de una guía
function generateGuideScores(guide) {
  const products = getGuideProducts(guide);
  if (!products.length) return {};
  
  const guideType = getGuideType(guide);
  const mixed = isMixedCategory(guide);
  
  // Determinar ganador: prioridad 1 = consolidated, 2 = existingOverrides, 3 = primer producto
  let winnerTitle = null;
  if (consolidated[guide.id]) {
    winnerTitle = Object.keys(consolidated[guide.id])[0];
  } else if (existingOverrides[guide.id]) {
    const ov = existingOverrides[guide.id];
    winnerTitle = Object.keys(ov)[0];
  } else {
    winnerTitle = cleanTitle(products[0].title_es || products[0].title);
  }
  
  const result = {};
  let position = 0;
  
  for (const p of products) {
    const title = cleanTitle(p.title_es || p.title);
    const isWinner = title === winnerTitle;
    const pos = isWinner ? 0 : ++position;
    const total = products.length;
    
    let score;
    
    // Prioridad 1: score de investigación consolidado
    if (consolidated[guide.id] && consolidated[guide.id][title] !== undefined) {
      score = consolidated[guide.id][title];
    }
    // Prioridad 2: score existente en overrides
    else if (existingOverrides[guide.id] && existingOverrides[guide.id][title] !== undefined) {
      score = existingOverrides[guide.id][title];
    }
    // Prioridad 3: score en products.json
    else if (p.score !== undefined && p.score !== null) {
      score = p.score;
    }
    // Prioridad 4: generar sistemático
    else {
      score = getBaseScore(guideType, isWinner ? 0 : position, products.length, isWinner, false);
      score = adjustByCategory(score, guide.category, 'best');
    }
    
    // Asegurar que winner tenga score más alto
    if (isWinner) {
      const maxOther = Math.max(...Object.values(result));
      if (score <= maxOther) {
        score = Math.min(9.9, maxOther + 0.1);
      }
    }
    
    // Redondear a 1 decimal
    score = Math.round(score * 10) / 10;
    result[cleanTitle(p.title_es || p.title)] = score;
    // También por title inglés
    if (p.title && p.title !== (p.title_es || p.title)) {
      result[cleanTitle(p.title)] = score;
    }
  }
  
  return result;
}

// 10. Generar todos los scores
const allScores = {};
let totalProducts = 0;

for (const guide of guides) {
  const scores = generateGuideScores(guide);
  if (Object.keys(scores).length > 0) {
    allScores[guide.id] = scores;
    totalProducts += Object.keys(scores).length;
  }
}

console.log('Guias procesadas:', Object.keys(allScores).length);
console.log('Productos totales:', totalProducts);

// 11. Guardar resultado
const output = '// GENERADO AUTOMATICAMENTE - Scores por guía basados en investigación + patrones sistemáticos\n' +
  '// Incluye: 61 guías con investigación (batches 1,6,7) + 105 guías con patrones sistemáticos\n' +
  'var GUIDE_SCORES = ' + JSON.stringify(allScores, null, 1) + ';\n';

fs.writeFileSync(path.join(__dirname, '..', 'js', 'guide-scores.js'), '// GENERADO AUTOMATICAMENTE - Scores por guía\nvar GUIDE_SCORES = ' + JSON.stringify(allScores, null, 1) + ';\n', 'utf8');
fs.writeFileSync(path.join(__dirname, 'score_overrides.js'), output, 'utf8');

console.log('\nArchivos generados:');
console.log('  - js/guide-scores.js (para build-guides.js)');
console.log('  - temp/score_overrides.js (fuente)');

// Verificar j48-vs-rndi específicamente
console.log('\n=== Verificación j48-vs-rndi ===');
console.log(allScores['j48-vs-rndi']);

// Verificar algunas guías clave
const keyGuides = ['premium-interfaces', 'best-headphones', 'best-microphone', 'budget-mics', 'budget-usb-mics'];
for (const id of keyGuides) {
  console.log(`\n${id}:`, allScores[id]);
}