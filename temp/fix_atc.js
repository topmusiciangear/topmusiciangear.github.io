const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'atc-vs-genelec');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('¿Es el aTC sCM25a pro mk2 el mejor en precisión y detalle de medios?', '¿Es el ATC SCM25A Pro Mk2 el mejor en precisión y detalle de medios?');
swap('¿Es el Genelec 8351b el mejor en calibración de sala e imagen coaxial?', '¿Es el Genelec 8351B el mejor en calibración de sala e imagen coaxial?');
swap('¿Qué es mejor — medio de cúpula blanda aTC o coaxial Genelec para mezclar?', '¿Qué es mejor: medio de cúpula blanda ATC o coaxial Genelec para mezclar?');
swap('Momento de decidir: ¿aTC sCM25a o Genelec 8351b para tu estudio?', 'Momento de decidir: ¿ATC SCM25A o Genelec 8351B para tu estudio?');
swap('Ambos son herramientas de referencia para la mezcla profesional',
  'Ambos son herramientas de referencia para la mezcla profesional.');
swap('es el mismo driver de losistemas de masterización insignia de ATC', 'es el mismo driver de los sistemas de masterización insignia de ATC');
swap('Mirando las especificaciones, el ATC es plano dentro de ±0,5 dB', 'Según las especificaciones, el ATC es plano dentro de ±0,5 dB');
swap('una imagen que permanece fija muevas la cabeza donde la muevas', 'una imagen que permanece fija muevas donde muevas la cabeza');
swap('ejecuta AutoCal, y el 8351B aplica hasta 20 filtros', 'ejecuta AutoCal y el 8351B aplica hasta 20 filtros');
swap('Los 550W de potencia clase D y los 113 dB', 'Los 550 W de potencia en clase D y los 113 dB');
swap('el 8351B ofrece un punto óptimo mucho más indulgente', 'el 8351B ofrece un punto óptimo mucho más tolerante');
swap('el 8351B es la opción pro pragmática', 'el 8351B es la opción profesional pragmática');
swap('la imagen de fuente puntual del Genelec es más fácil de convivir con ella', 'la imagen de fuente puntual del Genelec es más fácil para convivir');
swap('>ADAM S3H vs Focal Trio11 Be</a>', '>ADAM S3H vs Focal Trio11 Be: monitores de tres vías</a>');
swap('>Adam A7V vs Genelec 8040B</a>', '>Adam Audio vs Genelec: tweeter, sonido y valor</a>');
swap('>Mejores Monitores de estudio</a>', '>Mejores monitores de estudio: guía completa para cada sala</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
