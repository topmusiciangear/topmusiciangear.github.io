const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'scarlett-vs-volt');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// Headings
swap('¿Es la Scarlett 2i2 4ta gen la mejor interfaz versátil?', '¿Es la Scarlett 2i2 4.ª gen la mejor interfaz versátil?');
swap('¿Qué suena mejor — Focusrite limpio o uA coloreado?', '¿Qué suena mejor: Focusrite limpio o UA con color?');
// INTRO
swap('está haciendo un serio intento por el trono con su circuitería analógica incorporada',
  'está haciendo un serio intento por el trono con su circuitería analógica incorporada.');
// SEC0
swap('que ofrecen 69dB de ganancia', 'que ofrecen 69 dB de ganancia');
swap('ofreciendo 120dB de rango dinámico', 'ofreciendo 120 dB de rango dinámico');
swap('La funcionalidad de loopback, auto-gain y inicio seguro la hacen fácil de usar',
  'La funcionalidad de loopback, auto-gain y Clip Safe la hacen fácil de usar');
// CONCLUSION + anchors
swap('>Mejor Interfaz de Audio para Grabación Casera</a>', '>Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('>Mejor Interfaz de Audio</a>', '>Mejores interfaces de audio por menos de $300</a>');
swap('>Scarlett 2i2 vs SSL 2+</a>', '>Scarlett 2i2 vs SSL 2+: ¿mejores previos para voces en casa?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
