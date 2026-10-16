const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'fix-clipping-scarlett');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('no a un defecto del equipo', 'no a un defecto del equipo.');
swap('verde: señal limpia, amarillo indica que te estás acercando al límite, rojo significa',
  'verde: señal limpia; amarillo: indica que te estás acercando al límite; rojo: significa');
swap('1. Pon la perilla de ganancia en cero.', '1. Pon la rueda de ganancia en cero.');
swap('Un Cloudlifter CL-1 añade 20-25 dB de ganancia limpia.', 'Un Cloudlifter CL-1 añade de 20 a 25 dB de ganancia limpia.');
swap('aplica un realce en frecuencias altas (alrededor de 4-8 kHz)', 'aplica un realce en frecuencias altas (alrededor de 4–8 kHz)');
swap('añade aproximadamente 2-3 dB de ganancia.', 'añade aproximadamente 2–3 dB de ganancia.');
swap('Baja el clip gain de la pista entre 3-6 dB en el DAW', 'Baja la ganancia de clip de la pista entre 3–6 dB en el DAW');
swap('los sibilantes y los transientes suelen ser lo primero', 'los sibilantes y los transitorios suelen ser lo primero');
swap('SSL 2+ MKII : interruptor 4K Legacy.', 'SSL 2+ MKII: interruptor 4K Legacy.');
swap('frente a convertidores de 32 bits y 192 kHz hacen que las fuentes loud se capturen limpias',
  'frente a convertidores de 32 bits y 192 kHz hacen que las fuentes fuertes se capturen limpias');
swap('El clipping en la Scarlett 2i2 se solucióna ajustando la ganancia correctamente',
  'El clipping en la Scarlett 2i2 se soluciona ajustando la ganancia correctamente');
swap('>SSL 2+ MKII</a>', '>Scarlett 2i2 vs SSL 2+: ¿mejores previos para voces en casa?</a>');
swap('>guía de la mejor interfaz de audio</a>', '>Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('>Scarlett 2i2 vs SSL 2+</a>', '>Scarlett 2i2 vs SSL 2+: ¿mejores previos para voces en casa?</a>');
swap('>Mejor Interfaz de Audio para Grabación Casera</a>', '>Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('>Scarlett 2i2 vs UA Volt 2</a>', '>Scarlett 2i2 vs UA Volt 2: interfaz económica</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
