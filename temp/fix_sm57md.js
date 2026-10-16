const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'sm57-vs-md421');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// SEC0
swap('para bandas y home studios', 'para bandas y estudios caseros');
// SEC2
swap('graves extendidos que proporciona peso', 'graves extendidos que proporcionan peso');
swap('En la batería snare, es insustituible', 'En la caja, es insustituible');
swap('SM57 en el snare y el altavoz de guitarra', 'SM57 en la caja y el altavoz de guitarra');
// SEC3
swap('Si sólo tienes presupuesto', 'Si solo tienes presupuesto');
// CONCLUSION + anchors
swap('>Mejor Micrófono para Voces y Grabación Casera</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
swap('>Mejores Micrófonos de Escenario y Directo</a>', '>Mejores micrófonos de escenario y directo</a>');
swap('>SM57 vs M58</a>', '>SM57 vs SM58: ¿cuál para voz y amplis? (prueba real)</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
