const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'pro-guitars');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Todo guitarrista necesita los dos tonos que todo guitarrista domina:', 'Todo guitarrista necesita los dos tonos que definen el instrumento:');
swap('los bloqueadores aceleran los cambios de cuerda y el talón esculpido', 'las clavijas de bloqueo aceleran los cambios de cuerda y el talón esculpido');
swap('esta es la forma que escribió el manual.', 'esta es la que escribió el manual.');
swap('los muros rítmicos con una estilo Les Paul necesitan menos capas', 'los muros rítmicos con un estilo Les Paul necesitan menos capas');
swap('>Mejor Guitarra Eléctrica para Grabación Casera</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
swap('>Mejores Guitarras para Principiantes y Composición</a>', '>Mejores guitarras para principiantes: guía para empezar</a>');
swap('>Las Mejores Guitarras Fender para Cada Género</a>', '>Las mejores guitarras Fender para cada género</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
