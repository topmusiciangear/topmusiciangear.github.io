const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'sm57-vs-sm58');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// SEC1
swap('sin realimentación', 'sin acople');
swap('aguanta 170dB SPL', 'aguanta 170 dB SPL');
// SEC2
swap('rechaza explosivas y ruido de viento', 'rechaza plosivas y ruido de viento');
swap('un excelente rechazo a la retroalimentación', 'un excelente rechazo al acople');
// SEC3
swap('Cada uno es virtualmente indestructible, y mantienen su valor de reventa.',
  'Los dos mantienen su valor de reventa.');
// CONCLUSION
swap('Ni se te ocurra no tener el legendario sonido Shure', 'No te quedes sin el legendario sonido Shure');
swap('>Mejor Micrófono para Voces y Grabación Casera</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
swap('>Mejores Micrófonos Económicos</a>', '>Mejores micrófonos XLR económicos para estudio</a>');
swap('>SM7B vs NT1 5ª Gen</a>', '>SM7B vs NT1 5ª gen: ¿mejor micrófono de voz?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
