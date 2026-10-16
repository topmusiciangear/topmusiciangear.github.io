const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'budget-mics');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('dormitorio-estudio sin tratar, sin necesidad de acondiciónamiento acústico',
  'dormitorio-estudio sin tratar y sin tratamiento acústico');
swap('<strong>Cero accesorios por comprar:</strong> la NT1 Signature se entrega',
  'Sin accesorios que comprar: la NT1 Signature se entrega');
swap('<strong>La contrapartida.</strong> En una guía sobre micrófonos económicos, un SM57 parece fuera de lugar',
  '<strong>La contrapartida:</strong> en una guía sobre micrófonos económicos, un SM57 parece fuera de lugar');
swap('<strong>La contrapartida.</strong> Para un estudio tratado no es el micrófono adecuado',
  '<strong>La contrapartida:</strong> para un estudio tratado no es el micrófono adecuado');
swap('<strong>La contrapartida.</strong> El pico de presencia es más tosco',
  '<strong>La contrapartida:</strong> el pico de presencia es más áspero');
swap('>Mejores Interfaces de Audio Económicas</a>', '>Mejores interfaces de audio por menos de $300</a>');
const idx = g.indexOf(gg);
g[idx] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('aplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
// "tosco" ya se arreglo en el paso anterior dentro de otra frase; comprobar
const t = JSON.stringify(g.find(x => x.id === 'budget-mics'));
console.log('restos "más tosco": ' + (t.match(/más tosco/g) || []).length);
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
