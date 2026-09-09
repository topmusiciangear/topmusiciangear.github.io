const d = require('../temp/_nat_chunk1.json');
const allCliches = [
  'workhorse','gold standard','industry standard','benchmark','hassle-free','pro-level',
  'studio-grade','incredible','unmatched','unrivaled','second to none','bulletproof',
  'ultimate weapon','monster','king of the budget','holy grail','definitive rock machine',
  'ultimate professional Strat','ultimate rock','world standard','world\'s standard',
  'the tracking standard','the beast','estándar de oro','estándar mundial',
  'caballo de batalla','todoterreno','estándar de la industria','sin esfuerzo',
  'sin complicaciones','nivel profesional','imprescundible','máquina de',
  'la bestia','bestia de','monstruo de','no tiene rival','increíble',
  'a prueba de balas','desbloquea','eleva tu','a otro nivel',
  'el rey del presupuesto','arma definitiva','sin igual','el rey de los'
];

function findHits(obj, path, cliche) {
  const results = [];
  if (typeof obj === 'string') {
    const re = new RegExp(cliche.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = obj.match(re);
    if (matches) results.push({ path, value: obj.slice(0, 200), count: matches.length });
  } else if (Array.isArray(obj)) {
    obj.forEach((item, i) => results.push(...findHits(item, path + '[' + i + ']', cliche)));
  } else if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) results.push(...findHits(obj[k], path + '.' + k, cliche));
  }
  return results;
}

for (const g of d) {
  for (const c of allCliches) {
    const hits = findHits(g, g.id, c);
    for (const h of hits) {
      console.log(h.path + ' -> "' + c + '" (' + h.count + 'x): ' + h.value.slice(0, 120));
    }
  }
}
