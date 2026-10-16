const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-practice-amps');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('El Fender Champion II 25 es un amplificador sencillo y con gran sonido con 4 voces', 'El Fender Champion II 25 es un amplificador sencillo de gran sonido con 4 voces');
swap('esta es la apuesta segura que más recomiendo.', 'esta es la apuesta segura más recomendada.');
swap('moviendo aire suficiente para zapar.', 'moviendo aire suficiente para improvisar.');
swap('Grabar ideas por USB funcionando como interfaz resulta práctico', 'Grabar ideas por USB con el ampli como interfaz resulta práctico');
swap('>Mejores Amplificadores de Guitarra y Bajo</a>', '>Mejores amplificadores de guitarra y bajo: guía completa</a>');
swap('>Mejores Amplificadores de Bajo para Cada Músico</a>', '>Mejores amplificadores de bajo para cada músico</a>');
swap('>Mejor Guitarra Eléctrica para Grabación Casera</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
