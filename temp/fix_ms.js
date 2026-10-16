const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'monitor-setup');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Grandes monitores en una mala habitación suenan peor que monitores decentes configurados correctamente',
  'Grandes monitores en una mala habitación suenan peor que monitores decentes configurados correctamente.');
swap('Los monitores sólo justifican su precio cuando están configurados correctamente', 'Los monitores solo justifican su precio cuando están configurados correctamente');
swap('No hay EQ de medios, y esa honestidad es la gracia', 'No hay ecualización de medios, y esa honestidad es la gracia');
swap('Por unos $159–$195 el par no son baratos, pero la mejora', 'Por unos $159–$195 el par no es barato, pero la mejora');
swap('Su compañero de medición de $79.', 'Su compañero de medición cuesta $79.');
swap('Todos los demás lo superan siempre: soportes más medición antes que cambiar de herrajes',
  'Por encima de todo: soportes más medición antes que cambiar de herrajes');
swap('no está atado a ninguna marca dealtavoz;', 'no está atado a ninguna marca de altavoz;');
swap('nunca se portará bien.', 'nunca rendirá bien.');
swap('Y la sobrecorrrección es un riesgo real', 'Y la sobrecorrección es un riesgo real');
swap('no puedes corregir el acoplamiento mecánico con EC.', 'no puedes corregir el acoplamiento mecánico con ecualización.');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
