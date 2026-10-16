const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-daw-for-beginners');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Elegir tu primer DAW (Estación de Trabajo de Audio digital) es abrumador', 'Elegir tu primer DAW (estación de trabajo de audio digital) es abrumador');
swap('Piensa en él como el estudio virtual —reemplaza la máquina de cinta', 'Piensa en él como el estudio virtual — reemplaza la máquina de cinta');
swap('Ableton Live está diseñado para producción electrónica basada en clips y actuaciones en vivo FL Studio usa un secuenciador',
  'Ableton Live está diseñado para producción electrónica basada en clips y actuaciones en vivo. FL Studio usa un secuenciador');
swap('Todos los DAWs importantes ofrecen pruebas gratuitas —descarga 2-3 que te interesen', 'Todos los DAWs importantes ofrecen pruebas gratuitas — descarga 2-3 que te interesen');
swap('o trabajando en un proceso de estudio de grabación tradicional, Ableton puede hacerlo',
  'o trabajando con un flujo de estudio de grabación tradicional, Ableton puede hacerlo');
swap('FL Studio (, actualizaciones gratuitas de por vida) es el DAW', 'FL Studio (compra única, actualizaciones gratuitas de por vida) es el DAW');
swap('Los instrumentos y efectos incorporadoson de calidad profesional.', 'Los instrumentos y efectos incorporados son de calidad profesional.');
swap('Cubase 15 ( Pro) tiene la mejor edición MIDI', 'Cubase 15 (Pro) tiene la mejor edición MIDI');
swap('es el referencia en estudios profesionales para estudios de grabación profesionales',
  'es la referencia en estudios profesionales para estudios de grabación profesionales');
swap('Hay quien aprende antes cuando el sonido parece hardware.', 'Hay quien aprende mejor cuando el sonido parece hardware.');
swap('>guía completa de estudio de beats</a>', '>Mejor equipo para estudios de Beat-Making</a>');
swap('>guía de estudio de beats</a>', '>Mejor equipo para estudios de Beat-Making</a>');
swap('>guía de DAWs</a>', '>Mejor software DAW: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
