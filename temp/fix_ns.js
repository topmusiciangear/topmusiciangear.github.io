const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'nord-stage-4-vs-montage-m8x');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('El Stage 4 cuenta con el teclado Triple Sensor de Nord con acción de martillo virtual para una sensación',
  'El Stage 4 cuenta con el teclado Triple Sensor de Nord con acción de martillo para una sensación');
swap('La pantalla táctil de 7 pulgadas ofrece un acceso intuitivo a todas las funciones. Integración total con tu DAW vía USB, MIDI y el nuevo software Montage Connect.',
  'La pantalla táctil de 7 pulgadas ofrece un acceso intuitivo a todas las funciones, con integración total con tu DAW vía USB, MIDI y el nuevo software Montage Connect.');
swap('El Nord va de sonidos de instrumentos auténticos e inmediatos; el Montage va de crear sonidos completamente nuevos',
  'El Nord apuesta por sonidos de instrumentos auténticos e inmediatos; el Montage apuesta por crear sonidos completamente nuevos');
swap('>Mejor Teclado y Piano digital para Home Studio</a>', '>Mejores teclados y controladores MIDI: piano, synth y DAW</a>');
swap('>Mejores Pianos Digitales para Hogar y estudio</a>', '>Mejores pianos digitales para hogar y estudio</a>');
swap('>Mejores Sintetizadores para Producción Musical</a>', '>Mejores sintetizadores para producción musical</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
