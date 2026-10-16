const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'sm7b-vs-nt1');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('grabación vocal en home studio', 'grabación vocal en estudio casero');
// SEC0
swap('requiriendo un previo de alta calidad', 'lo que requiere un previo de alta calidad');
// SEC1
swap('el ruido propio de sólo 4dBA', 'el ruido propio de solo 4 dBA');
// SEC3
swap('Muchos home studios terminan teniendo ambos', 'Muchos estudios caseros terminan teniendo ambos');
swap('Si sólo puedes pagar uno', 'Si solo puedes pagar uno');
swap('consulta nuestra guía del mejor micrófono guía del mejor micrófono para podcast',
  'consulta nuestra guía del mejor micrófono para podcast');
// CONCLUSION + anchors
swap('>Mejor Micrófono para Voces y Grabación Casera</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
swap('>Mejores Micrófonos Económicos</a>', '>Mejores micrófonos XLR económicos para estudio</a>');
swap('>SM57 vs SM58</a>', '>SM57 vs SM58: ¿cuál para voz y amplis? (prueba real)</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
