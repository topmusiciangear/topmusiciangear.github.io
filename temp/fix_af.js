const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'ableton-vs-fl-studio');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('¿Qué DAW gana: Ableton Live 12 Suite o FL Studio All plugins Edition?', '¿Qué DAW gana: Ableton Live 12 Suite o FL Studio All Plugins Edition?');
swap('son dos de los DAWs más potentes para la producción musical',
  'son dos de los DAWs más potentes para la producción musical.');
swap('Te permite lanzar clips en tiempo real, hacer loops y arreglar música sobre la marcha',
  'Te permite lanzar clips en tiempo real, hacer loops y crear arreglos sobre la marcha');
swap('La vista Sesión (Session View) de Ableton y el enfoque de patrones de FL Studio se centran en la creación no lineal. Live fomenta',
  'Live fomenta');
swap('Ableton es superior para interpretación en vivo y jam sessions. FL Studio es más intuitivo para programación de ritmos y creación de loops. Los instrumentos de Ableton',
  'Los instrumentos de Ableton');
swap('así que elige el proceso que se sienta natural para ti.', 'así que elige el flujo que se sienta natural para ti.');
swap('piden más orden dentro de la mente de patrones.', 'piden más orden dentro de la lógica de patrones.');
swap('>guía de DAWs</a>', '>Mejor software DAW: guía completa</a>');
swap('>guía del mejor DAW para principiantes</a>', '>Mejor DAW para principiantes</a>');
swap('>Mejor Software de Producción Musical</a>', '>Mejor software DAW: guía completa</a>');
swap('>Mejores Máquinas de Batería y Producción de Beats</a>', '>Mejores cajas de ritmos y grooveboxes: guía completa</a>');
swap('>Mejor Teclado y Piano digital para Home Studio</a>', '>Mejores teclados y controladores MIDI: piano, synth y DAW</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
