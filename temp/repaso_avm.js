const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'audient-vs-motu');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Lo que distingue a la iD14 es su control scroll y gestión de monitores: puedes usarlo como un controlador',
  'Lo que distingue a la iD14 es su rueda ScrollControl y la gestión de monitores: puedes usarla como un controlador');
swap('te proporciona medición en tiempo real para ambas entradas que es precisa y fácil de leer desde cualquier lugar',
  'te proporciona una medición en tiempo real precisa y fácil de leer desde cualquier lugar');
swap('lo que significa enrutamiento de latencia cero para streaming', 'lo que permite encaminar con latencia cero para streaming');
swap('un toque de riqueza armónica y unos agudos musicales que favorecen a los micrófonos',
  'un toque de riqueza armónica y unos agudos musicales que favorecen a las voces');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
