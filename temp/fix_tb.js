const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'ts9-vs-bd2');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('son dos de los overdrives más icónicos. Tras usar ambos a fondo en directo y en estudio.',
  'son dos de los overdrives más icónicos, tras usar ambos a fondo en directo y en estudio.');
swap('Suelo poner poca ganancia y mucha salida, dejando que el ampli haga el trabajo',
  'Suele ponerse poca ganancia y mucha salida, dejando que el ampli haga el trabajo');
swap('El TS9 ofrece ese realce de mediosRV/Mayer que hace cantar las notas.',
  'El TS9 ofrece ese realce de medios SRV/Mayer que hace cantar las notas.');
swap('El TS9 resultó más versátil para la mayoría por su realce de medios que funciona con amplis limpios y saturados. El mid-boost del Tube Screamer es más versátil',
  'El mid-boost del Tube Screamer es más versátil');
swap('Para principiantes, el TS9 es la mejor opción primera opción.', 'Para principiantes, el TS9 es la mejor primera opción.');
swap('>Mejores Pedales de Efectos para Guitarra</a>', '>Mejores pedales de efectos para guitarra: guía completa</a>');
swap('>Mejores Pedales de Overdrive y Distorsión para Guitarra</a>', '>Mejores pedales de overdrive y distorsión para guitarra</a>');
swap('>Mejores Pedales de Reverberación y Delay para Guitarra</a>', '>Mejores pedales de reverberación y delay para guitarra</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
