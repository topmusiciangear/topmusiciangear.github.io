const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'pro-basses');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('El clásico golpe P-Bass contra la articulación moderna y agresiva del StingRay.',
  'El clásico golpe P-Bass contra la articulación moderna y agresiva del StingRay.');
swap('y el puente HiMass suma sustain y una entonación rocosa.', 'y el puente HiMass suma sustain y una entonación sólida como una roca.');
swap('el mástil de arce tostado se siente estable y rodado, y la pastilla', 'el mástil de arce tostado se siente estable y suave, y la pastilla');
swap('Vigila la rutina de la pila, la ganancia del previo y el balance con correa con el cuerpo ligero.',
  'Vigila el estado de la pila, la ganancia del previo y el equilibrio con correa con el cuerpo ligero.');
swap('>Las Mejores Guitarras Fender para Cada Género</a>', '>Las mejores guitarras Fender para cada género</a>');
swap('>P-Bass vs J-Bass</a>', '>P-Bass vs J-Bass: ¿cuál bajo Fender es el tuyo?</a>');
swap('>Los Mejores Bajos Fender para Cada Género</a>', '>Los mejores bajos Fender para cada género</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
