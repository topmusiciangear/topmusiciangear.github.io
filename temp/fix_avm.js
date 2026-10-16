const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'audient-vs-motu');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('cuando necesitan algo pequeño que suene grande',
  'cuando necesitan algo pequeño que suene grande.');
swap('un previo con 58dB de ganancia', 'un previo con 58 dB de ganancia');
swap('ofreciendo 120dB de rango dinámico en la entrada y 123dB en la salida',
  'ofreciendo 120 dB de rango dinámico en la entrada y 123 dB en la salida');
swap('en nuestra guía de la mejor interfaz de audio Ambas son opciones serias',
  'en nuestra guía de la mejor interfaz de audio. Ambas son opciones serias');
swap('>Mejor Interfaz de Audio para Grabación Casera</a>', '>Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('>Mejor Interfaz de Audio</a>', '>Mejores interfaces de audio por menos de $300</a>');
swap('>Scarlett 2i2 vs SSL 2+</a>', '>Scarlett 2i2 vs SSL 2+: ¿mejores previos para voces en casa?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
