const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-looper-pedals');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('La grabación estéreo larga en coma flotante de alta resolución mantiene las capas limpias y con deshacer amable.',
  'La grabación estéreo larga en coma flotante de alta resolución mantiene las capas limpias y con función de deshacer accesible.');
swap('Si los knobs y menús te sacan de tocar, este looper', 'Si las ruedas y menús te sacan de tocar, este looper');
swap('Funciona con 4xAA o adaptador a 240 mA.', 'Funciona con 4 pilas AA o adaptador a 240 mA.');
swap('Solo ten en cuenta más menús que el simple RC-5.', 'Solo ten en cuenta que tiene más menús que el sencillo RC-5.');
swap('con audio 24 bits, control ampliable por footswitch, pila 9V o adaptador incluido.',
  'con audio de 24 bits, control ampliable por footswitch, pila de 9 V o adaptador incluido.');
swap('Las pedaleras donde cada centímetro cuenta lo necesitan. con el límite de una pista frente a estaciones multipista.',
  'Las pedaleras donde cada centímetro cuenta lo necesitan, con el límite de una pista frente a estaciones multipista.');
swap('AC a 1,1 A y 2,4 kg de estación pro.', 'Alimentación de 1,1 A y 2,4 kg de estación pro.');
swap('>Mejores Pedales de Efectos para Guitarra</a>', '>Mejores pedales de efectos para guitarra: guía completa</a>');
swap('>Mejores Pedales de Reverberación y Delay para Guitarra</a>', '>Mejores pedales de reverberación y delay para guitarra</a>');
swap('>Mejores Pedales Multiefectos para Guitarra</a>', '>Mejores pedales Multi-Efectos para guitarra</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
