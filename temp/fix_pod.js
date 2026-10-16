const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-mic-for-podcasting');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// SEC2
swap('caídas que matar a un condensador', 'caídas que matan a un condensador');
// SEC6
swap('a los cuatro horas de escuchar', 'a las cuatro horas de escuchar');
// SEC7
swap('no es el combatiente de feedback que elegiría', 'no es el combatiente de acople que elegiría');
// SEC8
swap('El beneficio de los 32 bits flotantes se aplica a la ruta USB, not a la XLR',
  'El beneficio de los 32 bits flotantes se aplica a la ruta USB, no a la XLR');
// SEC10
swap('en cuanto tengase interfaz', 'en cuanto tengas interfaz');
// SEC11
swap('con el preamplificador Revolution,OXOXperseguirás buscando volumen',
  'con el preamplificador Revolution, perseguirás buscando volumen');
// CONCLUSION + anchors
swap('>guía de mejores micrófonos</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
swap('>mejores micrófonos USB</a>', '>Mejores micrófonos USB para streaming</a>');
swap('>mejores micrófonos para creadores de contenido</a>', '>Mejores micrófonos económicos para creadores: $35 a $299</a>');
swap('>mejores interfaces de audio</a>', '>Mejor interfaz de audio: guía completa para grabación casera</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
