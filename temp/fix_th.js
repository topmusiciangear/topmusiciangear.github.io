const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'tracking-headphones');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('son esenciales para cualquier estudio serio', 'son esenciales para cualquier estudio serio.');
swap('El cerrado no es negociable para grabar.', 'El cerrado es imprescindible para grabar.');
swap('ni sangran al micrófono y terminar en tu pista grabada', 'ni sangran al micrófono ni terminan en tu pista grabada');
swap('ni de los platillos del batería que se cuelan desde la pared de al lado', 'ni de los platillos de la batería que se cuelan desde la pared de al lado');
swap('La tecnología exclusiva de cono da un detalle', 'La tecnología exclusiva del cono da un detalle');
swap('>guía de los mejores auriculares de estudio</a>', '>Mejores auriculares de estudio: guía completa</a>');
swap('Pegad honestas: precio de insignia por mejoras incrementales sobre los divertidos M40x',
  'Pegas honestas: precio de insignia por mejoras incrementales sobre los planos M40x');
swap('Trátalos como herramienta de precisión, no como auriculares de batalla, y te lo devuelven con creces',
  'Trátalos como herramienta de precisión, no como auriculares de batalla, y te compensan con creces');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
