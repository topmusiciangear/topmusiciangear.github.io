const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-overdrive-distortion');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Años de uso en escenarios los respaldan', 'Años de uso en escenarios los respaldan.');
swap('Para country funk, un overdrive suave con buen control de dinámica.', 'Para country funk, busca un overdrive suave con buen control de dinámica.');
swap('este clásico verde lo solucióna como pocos.', 'este clásico verde lo soluciona como pocos.');
swap('Sus tres botones son gloriosamente simples:', 'Sus tres ruedas son gloriosamente simples:');
swap('Aprieta rítmicas y levanta solos con esa caja solo jugando con el volumen de la guitarra.',
  'Aprieta rítmicas y levanta solos con esa caja jugando solo con el volumen de la guitarra.');
swap('Si tocas mucho con el pote de volumen, este es el overdrive', 'Si tocas mucho con el mando de volumen, este es el overdrive');
swap('Lo mantengo como base siempre activa porque las notas cantan', 'Se mantiene como base siempre activa porque las notas cantan');
swap('Furia del Filter: ProCo RAT 2', 'Furia del filtro: ProCo RAT 2');
swap('Ideal para guitarra alta; comprueba que te gusta su voz', 'Ideal para guitarra con presencia; comprueba que te gusta su voz');
swap('MXR Phase 95: cuatro faser donde antes cabía un pedal', 'MXR Phase 95: cuatro fases donde antes cabía un pedal');
swap('Asegúrate de que te vale el bypass hardwire sin control de tono.', 'Asegúrate de que te vale el bypass cableado sin control de tono.');
swap('el BD-2W lo reconstruye con circuitería discreta en Japón.', 'el BD-2W está reconstruido con circuitería discreta en Japón.');
swap('>Mejores Pedales de Efectos para Guitarra</a>', '>Mejores pedales de efectos para guitarra: guía completa</a>');
swap('>Mejores Pedales de Reverberación y Delay para Guitarra</a>', '>Mejores pedales de reverberación y delay para guitarra</a>');
swap('>Mejor Guitarra Eléctrica para Grabación Casera</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
