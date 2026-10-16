const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'c414-vs-u87');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('son los dos micrófonos de condensador de diafragma grande más famosos de la historia',
  'son los dos micrófonos de condensador de diafragma grande más famosos de la historia.');
swap('Para voces que deben sonar caras con el mínimo esfuerzo, el U 87 Ai sigue siendo la referencia.',
  'Para voces que deben sonar premium con el mínimo esfuerzo, el U 87 Ai sigue siendo la referencia.');
swap('Revisa que tu sala y tu previo estén a la altura y si necesitas ese pulido vocal tan característico.',
  'Revisa que tu sala y tu previo estén a la altura y valora si necesitas ese pulido vocal tan característico.');
swap('abrir a omni y figura en ocho para salas y conjuntos;', 'abrir a omni y figura de ocho para salas y conjuntos;');
swap('Ideal para project studios y multiinstrumentistas.', 'Ideal para estudios de proyecto y multiinstrumentistas.');
swap('>Mejor Micrófono para Voces y Grabación Casera</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
swap('>Mejores Micrófonos Condensadores Profesionales</a>', '>Mejores micrófonos condensadores profesionales</a>');
swap('>Mejores Micrófonos de Escenario y Directo</a>', '>Mejores micrófonos de escenario y directo</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
