// Corrige el veredicto de best-guitar-home-office: elimina la parte de amps
// que no estan en la tabla (THR10II, Spark 2, Pacifica 112V).
// La guia es solo de guitarras silenciosas.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

fs.writeFileSync(B + 'temp/guides.before_verdict.json', JSON.stringify(guides, null, 2), 'utf8');

const g = guides.find(x => x.id === 'best-guitar-home-office');
console.log('VEREDICTO antes:\n' + g.verdict.substring(0, 350) + '...');

const nuevo = 'For most home offices, the Donner HUSH-I EVO2 is the smartest buy: full-scale, truly silent. The Taylor GS Mini-e Koa is the better choice if you want a real acoustic voice. If you want the most natural silent tone and can stretch the budget, the Yamaha SLG200S or SLG200N are the reference silent guitars, and the Traveler Ultra-Light Steel and Ultra-Light Nylon are the most portable full-scale acoustics. And if you want no amp at all, the Enya Nova Go Sonic and Lava ME 4 are the all-in-one future.';

g.verdict = nuevo;
g.verdict_es = 'Para la mayoría de los que trabajan desde casa, la Donner HUSH-I EVO2 es la compra más inteligente: escala completa, realmente silenciosa. La Taylor GS Mini-e Koa es la mejor opción si quieres una voz acústica real. Si quieres el tono silencioso más natural y puedes estirar el presupuesto, la Yamaha SLG200S o la SLG200N son las guitarras silenciosas de referencia, y la Traveler Ultra-Light Steel y la Ultra-Light Nylon son las acústicas de escala completa más portátiles. Y si no quieres ningún amplificador, la Enya Nova Go Sonic y la Lava ME 4 son el futuro todo-en-uno.';

console.log('\nVEREDICTO ahora:\n' + g.verdict);
console.log('\nVEREDICTO ES:\n' + g.verdict_es);

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nBackup: temp/guides.before_verdict.json');
console.log('data/guides.json escrito.');