const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'ableton-vs-logic');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('pero sirven flujos de trabajo, géneros y presupuestos fundamentalmente diferentes',
  'pero sirven flujos de trabajo, géneros y presupuestos fundamentalmente diferentes.');
swap('Elige Ableton Live 12 Suite si haces música electrónica, actúas en vivo, o quieres el motor',
  'Elige Ableton Live 12 Suite si haces música electrónica, actúas en vivo o quieres el motor');
swap('Ableton Live 12 Suite se vende en niveles;', 'Ableton Live 12 Suite se vende por niveles;');
swap('También obtienes más de 70 GB de sonidos incluyendo los sintetizadores Wavetable', 'También obtienes más de 70 GB de sonidos, incluidos los sintetizadores Wavetable');
swap('además de muchas drum racks, loops y muestras', 'además de muchos drum racks, loops y muestras');
swap('dispositivos creados por usuarios que puedes descargar gratuito o comprar', 'dispositivos creados por usuarios que puedes descargar gratis o comprar');
swap('Los músicos electrónicos que actúan en vivo deberían obtener Ableton Suite', 'Los músicos electrónicos que actúan en vivo deberían elegir Ableton Suite');
swap('Los artistas de grabación en Mac, compositores y productores con presupuesto limitado deberían obtener Logic Pro',
  'Los artistas de grabación en Mac, compositores y productores con presupuesto limitado deberían elegir Logic Pro');
swap('La limitación cae en la plataforma y el alcance:', 'La limitación está en la plataforma y el alcance:');
swap('El paquete encaja con la composición y la mezcla dentro de Mac que buscan fondo sin suscripciones',
  'El paquete encaja con la composición y la mezcla dentro de Mac que buscan contenido sin suscripciones');
swap('Los baterías virtuales, el contenido de bucles', 'Las baterías virtuales, el contenido de bucles');
swap('pero sirven a diferentes amos.', 'pero sirven a públicos diferentes.');
swap('>Mejor Software de Producción Musical</a>', '>Mejor software DAW: guía completa</a>');
swap('>Ableton Live vs FL Studio</a>', '>Ableton Live vs FL Studio: ¿cuál es mejor para ti?</a>');
swap('>Pro Tools vs Cubase Pro</a>', '>Pro Tools vs Cubase Pro: grabación y mezcla</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
