const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'player-strat-vs-pacifica');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('son dos de las guitarras eléctricas más vendidas para principiantes e intermedios',
  'son dos de las guitarras eléctricas más vendidas para principiantes e intermedios.');
swap('Si quieres el brillo Fender de verdad más músculo moderno en una sola guitarra', 'Si quieres el brillo Fender de verdad y músculo moderno en una sola guitarra');
swap('Ideal para indie, pop, latin y versiones versátiles.', 'Ideal para indie, pop, música latina y versiones versátiles.');
swap('La Pacifica es a menudo recomendada como la mejor guitarra económica', 'La Pacifica suele recomendarse como la mejor guitarra económica');
swap('La Player Strat cuesta más de dos veces y media lo que la Pacifica, pero ofrece pastillas de mayor calidad y esa sensación intangible de Fender, mientras que la Pacifica ofrece versatilidad HSS a una fracción del precio. La Player Strat cuesta aproximadamente dos veces y media el precio de la Pacifica, y esa diferencia se nota.',
  'La Player Strat cuesta aproximadamente dos veces y media el precio de la Pacifica, y esa diferencia se nota: pastillas de mayor calidad y esa sensación intangible de Fender, mientras que la Pacifica ofrece versatilidad HSS a una fracción del precio.');
swap('>guía de la mejor guitarra eléctrica</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
swap('>guía de la mejor guitarra para principiantes</a>', '>Mejores guitarras eléctricas para principiantes: qué comprar</a>');
swap('>Mejor Guitarra Eléctrica para Grabación Casera</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
swap('>Mejores Guitarras para Principiantes y Composición</a>', '>Mejores guitarras para principiantes: guía para empezar</a>');
swap('>American Pro II vs Les Paul \'60s</a>', '>American Pro II vs Les Paul \'60s: duelo de guitarras pro</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
