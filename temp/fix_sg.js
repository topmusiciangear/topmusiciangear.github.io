const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-shotgun-mics');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Mejor en general: Sennheiser mKH 416', 'Mejor en general: Sennheiser MKH 416');
swap('Mejor pértina económica: Sennheiser mKE 600', 'Mejor pértiga económica: Sennheiser MKE 600');
swap('Mejor pértina ultracompacta: Audio-Technica aT875r', 'Mejor pértiga ultracompacta: Audio-Technica AT875R');
swap('Mejor pro económico: deity s-mic 3', 'Mejor pro económico: Deity S-Mic 3');
swap('Mejor on-camera: Rode videoMic NTG', 'Mejor on-camera: Rode VideoMic NTG');
swap('Mejor mejora inicial: Sennheiser mKE 400', 'Mejor mejora inicial: Sennheiser MKE 400');
swap('Mejor para diálogo en interiores: Sennheiser mKH 50', 'Mejor para diálogo en interiores: Sennheiser MKH 50');
swap('Audio-Technica AT897: once centímetros y semanas de batería', 'Audio-Technica AT897: once pulgadas y semanas de batería');
swap('para rechazar el sonido lateral , justo lo que necesitas', 'para rechazar el sonido lateral, justo lo que necesitas');
swap('Las contras: un techo de 130 dB SPL SPL da menos margen', 'Las contras: un techo de 130 dB SPL da menos margen');
swap('comprueba que tu grabadora entrega 48V limpios antes de comprar.', 'comprueba que tu grabadora entrega 48 V limpios antes de comprar.');
swap('y la doble alimentación — fantasma de 11-52V o una AA', 'y la doble alimentación: fantasma de 11-52 V o una AA');
swap('>Mejores Mics para Instrumentos</a>', '>Mejores micrófonos para grabar cada instrumento</a>');
swap('>Mejores Mics para Creadores</a>', '>Mejores micrófonos económicos para creadores: $35 a $299</a>');
swap('>Guía de Mejor Micrófono</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
