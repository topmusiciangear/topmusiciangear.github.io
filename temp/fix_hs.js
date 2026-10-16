const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-hardware-samplers');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('¿Es el Akai mPC sample el mejor sampler portátil?', '¿Es el Akai MPC Sample el mejor sampler portátil?');
swap('sin portátil, una de estas es tu respuesta', 'sin portátil, una de estas es tu respuesta.');
swap('el enfoque de botones y perillas del Digitakt II es más profundo', 'el enfoque de botones y ruedas del Digitakt II es más profundo');
swap('y los usuarios lo valoran con 4.8/5 en miles de reseñas', 'y los usuarios lo valoran con 4,8/5 en miles de reseñas');
swap('con más de 700 comprados el mes pasado y valoración 4.8/5 en 366 reseñas.',
  'con más de 700 comprados el mes pasado y valoración 4,8/5 en 366 reseñas.');
swap('Solo almacena 8GB internos (expandible por microSD)', 'Solo almacena 8 GB internos (expandible por microSD)');
swap('el lanzamiento #1 nuevo en su categoría, valorado con 4.9/5 en sus primeras reseñas.',
  'el lanzamiento n.º 1 nuevo en su categoría, valorado con 4,9/5 en sus primeras reseñas.');
swap('Incluye más de 20GB de contenido con ediciones MPC', 'Incluye más de 20 GB de contenido con ediciones MPC');
swap('El costo es la contra. Es la segunda máquina más cara', 'El coste es la contra. Es la segunda máquina más cara');
swap('valorado con 4.8/5 en muchas reseñas.', 'valorado con 4,8/5 en muchas reseñas.');
swap('El Roland SP-404MKII es mi mejor elección por el sonido', 'El Roland SP-404MKII es la mejor elección por el sonido');
swap('el sampler más probado de aquí con 4.8/5 en miles de reseñas.', 'el sampler más probado de aquí con 4,8/5 en miles de reseñas.');
swap('>Guía MPC</a>', '>Mejores samplers y creación de beats: guía completa</a>');
swap('>Mejores Máquinas de Ritmos</a>', '>Mejores cajas de ritmos y grooveboxes: guía completa</a>');
swap('>estudio de Beat-Making</a>', '>Mejor equipo para estudios de Beat-Making</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
