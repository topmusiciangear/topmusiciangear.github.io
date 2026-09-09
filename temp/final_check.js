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

let totalHits = 0;
for (const g of d) {
  const allText = JSON.stringify(g).toLowerCase();
  for (const c of allCliches) {
    const re = new RegExp(c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = allText.match(re);
    if (matches) {
      console.log('[' + g.id + '] "' + c + '" x' + matches.length);
      totalHits += matches.length;
    }
  }
}
console.log('\nTotal remaining hits: ' + totalHits);
console.log('Total guides: ' + d.length);
