const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'beat-making');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('El clip launching lo convierte en una rejilla para ordenar en directo', 'El lanzamiento de clips lo convierte en una rejilla para ordenar en directo');
swap('así que lo único que aún te pediría es un enchufe.', 'así que lo único que aún te pide es un enchufe.');
swap('así que una idea capturada en la calle es el mismo proyecto cuando te sientes.', 'así que una idea capturada en la calle es el mismo proyecto cuando te sientas.');
swap('mientras faders, knobs y botones de pasos hacen que retocar patrones', 'mientras faders, ruedas y botones de pasos hacen que retocar patrones');
swap('Comprueba las voces simultáneas, el ruteo de salidas y si quieres pads', 'Comprueba las voces simultáneas, el encaminamiento de salidas y si quieres pads');
swap('y cuartos pequeños que necesitan una sola placa.', 'y cuartos pequeños que necesitan un solo teclado.');
swap('El Shure SM7B es el micrófono en el que confío para grabar voz sobre beats', 'El Shure SM7B es el micrófono en el que confían los profesionales para grabar voz sobre beats');
swap('sin booster en la mayoría de home studios, y el loopback', 'sin booster en la mayoría de estudios caseros, y el loopback');
swap('junto a refs abiertos mantiene sólidas las decisiones', 'junto a referencias abiertas mantiene sólidas las decisiones');
swap('>Mejores Máquinas de Batería y Producción de Beats</a>', '>Mejores cajas de ritmos y grooveboxes: guía completa</a>');
swap('>Mejor Software de Producción Musical</a>', '>Mejor software DAW: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
