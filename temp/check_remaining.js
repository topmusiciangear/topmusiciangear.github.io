const d = require('../temp/_nat_chunk1.json');
const cliches = ['workhorse','gold standard','industry standard','benchmark','hassle-free','pro-level','studio-grade','incredible','essential','unmatched','unrivaled','second to none','bulletproof','ultimate weapon','definitely','monster','king of the budget','holy grail'];
const esCliches = ['caballo de batalla','todoterreno','estándar de la industria','sin esfuerzo','sin complicaciones','nivel profesional','imprescindible','máquina de','la bestia','bestia de','monstruo de','no tiene rival','increíble','a prueba de balas','desbloquea','eleva tu','a otro nivel','el rey del presupuesto','arma definitiva','sin igual','el rey de los'];
let enHits = 0, esHits = 0;
for (const g of d) {
  const allEn = [g.intro, g.conclusion, g.verdict, ...(g.sections||[]).map(s=>s.body||'')].join(' ');
  const allEs = [g.intro_es, g.conclusion_es, g.verdict_es, ...(g.sections||[]).map(s=>s.body_es||'')].join(' ');
  for (const c of cliches) {
    const n = allEn.split(c).length - 1;
    if (n > 0) { console.log('EN [' + g.id + '] "' + c + '": ' + n); enHits += n; }
  }
  for (const c of esCliches) {
    const n = allEs.split(c).length - 1;
    if (n > 0) { console.log('ES [' + g.id + '] "' + c + '": ' + n); esHits += n; }
  }
}
console.log('\nRemaining EN hits: ' + enHits);
console.log('Remaining ES hits: ' + esHits);
