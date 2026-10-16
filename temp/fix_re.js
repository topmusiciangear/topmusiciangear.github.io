const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 're20-vs-sm7b');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('son los dos micrófonos dinámicos de broadcast más importantes jamás fabricados',
  'son los dos micrófonos dinámicos de broadcast más importantes jamás fabricados.');
swap('o un Cloudlifter/FetHead para obtener niveles de línea.', 'o un Cloudlifter/FetHead para alcanzar niveles de línea.');
swap('>Mejor Micrófono para Voces y Grabación Casera</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
swap('>Mejores Micrófonos de Escenario y Directo</a>', '>Mejores micrófonos de escenario y directo</a>');
swap('>SM7B vs NT1 5ª Gen</a>', '>SM7B vs NT1 5ª gen: ¿mejor micrófono de voz?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
