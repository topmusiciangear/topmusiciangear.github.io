const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'fender-bass-guide');

// ---------- VERDICT: 4 de 7 ----------
const vEn = 'Player P-Bass for rock/punk/Motown, Player J-Bass for funk/R&B/jazz, American Pro II P-Bass for country/blues/classic rock, American Pro II J-Bass for Latin/fusion/soul';
if (g.verdict !== vEn) die('veredicto EN no coincide');
g.verdict = 'American Ultra II Precision Bass for pro session and touring, American Pro II Precision Bass for country/blues/classic rock, American Pro II Jazz Bass for Latin/fusion/soul, Player Precision Bass for rock/punk/Motown, Player Jazz Bass for funk/R&B/jazz, Squier Classic Vibe \'60s Jazz Bass for the cheapest real vintage J-Bass tone, Squier Affinity PJ for the lowest-cost route to both Fender voices';

const vEs = 'Player P-Bass para rock/punk/Motown, Player J-Bass para funk/R&B/jazz, American Pro II P-Bass para country/blues/rock clásico, American Pro II J-Bass para latino/fusión/soul.';
if (g.verdict_es !== vEs) die('veredicto ES no coincide');
g.verdict_es = 'American Ultra II Precision Bass para sesiones profesionales y gira, American Pro II Precision Bass para country/blues/rock clásico, American Pro II Jazz Bass para latino/fusión/soul, Player Precision Bass para rock/punk/Motown, Player Jazz Bass para funk/R&B/jazz, Squier Classic Vibe \'60s Jazz Bass para el tono J-Bass vintage real más barato, Squier Affinity PJ para la ruta más barata a las dos voces Fender';
console.log('veredicto: 4 -> 7 productos EN/ES');

// ---------- CONCLUSION: anadir flagship + presupuesto ----------
const cEn = 'The American Professional II Jazz Bass is the go-to choice for Latin music, fusion, and soul — with the richest, most expressive J-Bass tone ever created.';
if (!g.conclusion.includes(cEn)) die('conclusion EN no coincide');
g.conclusion = g.conclusion.replace(cEn, 'The American Professional II Jazz Bass is the go-to choice for Latin music, fusion, and soul — with the richest, most expressive J-Bass tone Fender has released. Above that tier, the American Ultra II Precision Bass adds a noiseless P/J pairing, an active 3-band EQ and a compound-radius neck for players who need one instrument for every room. If budget is the constraint, the Squier Classic Vibe \'60s Jazz and the Affinity PJ deliver recognisably Fender-family tone for a fraction of the money.');

const cEs = 'El American Professional II Jazz Bass es la herramienta principal para música latina, fusión y soul — con el tono J-Bass más rico y expresivo jamás creado.';
if (!g.conclusion_es.includes(cEs)) die('conclusion ES no coincide');
g.conclusion_es = g.conclusion_es.replace(cEs, 'El American Professional II Jazz Bass es la herramienta principal para música latina, fusión y soul — con el tono J-Bass más rico y expresivo que Fender ha lanzado. Por encima de esa gama, el American Ultra II Precision Bass suma un set P/J sin ruido, una EQ activa de 3 bandas y un mástil de radio compuesto para quien necesita un solo instrumento para cualquier sala. Si el presupuesto manda, el Squier Classic Vibe \'60s Jazz y el Affinity PJ dan tono claramente familiar a una fracción del precio.');
console.log('conclusion: flagship + alternativa economica EN/ES');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

console.log('\nVERDICT: ' + g.verdict);
console.log('\nVERDICT_ES: ' + g.verdict_es);
console.log('\nCONCLUSION_EN: ' + g.conclusion.split('<p><a')[0]);
console.log('\nCONCLUSION_ES: ' + g.conclusion_es.split('<p>También')[0]);