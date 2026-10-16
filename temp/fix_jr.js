const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'j48-vs-rndi');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('una DI activa es la diferencia entre un tono prístino y un sonido delgado', 'una DI activa es la diferencia entre un tono impecable y un sonido delgado');
swap('extrae el voltaje máximo de la alimentación fantasma de 48V, ofreciendo hasta 9V de headroom',
  'extrae el voltaje máximo de la alimentación fantasma de 48 V, ofreciendo hasta 9 V de headroom');
swap('El RNDI es la versión de Rupert Neve Designs de la DI activa , y no se parece', 'El RNDI es la versión de Rupert Neve Designs de la DI activa, y no se parece');
swap('>guía de Cajas DI</a>', '>Mejores cajas DI para cada instrumento</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
