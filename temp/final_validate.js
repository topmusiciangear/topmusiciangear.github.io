const d = require('../temp/_nat_chunk1.json');

// Broader cliche sweep (includes word boundary variants)
const enPatterns = [
  /\bworkhorse\b/i, /\bgold standard\b/i, /\bindustry standard\b/i, /\bbenchmark\b/i,
  /\bhassle-free\b/i, /\bpro-level\b/i, /\bstudio-grade\b/i, /\bincredible\b/i,
  /\bunmatched\b/i, /\bunrivaled\b/i, /\bsecond to none\b/i, /\bbulletproof\b/i,
  /\bultimate weapon\b/i, /\bmonster\b/i, /\bking of the budget\b/i, /\bholy grail\b/i,
  /\bdefinitive rock\b/i, /\bthe beast\b/i
];
const esPatterns = [
  /caballo de batalla/i, /todoterreno/i, /estándar de la industria/i, /sin esfuerzo/i,
  /sin complicaciones/i, /nivel profesional/i, /imprescundible/i, /máquina de/i,
  /la bestia/i, /bestia de/i, /monstruo de/i, /no tiene rival/i, /increíble/i,
  /a prueba de balas/i, /desbloquea/i, /eleva tu/i, /a otro nivel/i,
  /el rey del presupuesto/i, /arma definitiva/i, /sin igual/i, /el rey de los/i
];

let enHits = 0, esHits = 0;
const enResults = [], esResults = [];

function sweep(obj, path, isEs, re, label) {
  if (typeof obj === 'string') {
    if (re.test(obj)) {
      enResults.push(path + ': ' + obj.slice(0, 120));
      enHits++;
    }
    return;
  }
  if (Array.isArray(obj)) obj.forEach((x, i) => sweep(x, path + '[' + i + ']', isEs, re, label));
  else if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      const childIsEs = isEs || k.endsWith('_es');
      sweep(obj[k], path + '.' + k, childIsEs, re, label);
    }
  }
}

// EN patterns on non-_es fields
for (const g of d) {
  for (const re of enPatterns) {
    sweep(g, g.id, false, re, 'en');
  }
  // ES patterns on _es fields only
  for (const re of esPatterns) {
    sweep(g, g.id, false, re, 'es');
  }
}

console.log('EN hits:', enHits);
console.log('ES hits:', esHits);
console.log('\nTotal guides in output:', d.length);
console.log('Guides present:', d.map(g => g.id).join(', '));