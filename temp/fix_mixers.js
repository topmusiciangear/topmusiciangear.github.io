const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-live-sound-mixers');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('Lleves un dúo en bodas, una banda con su propio PA', 'Ya lleves un dúo en bodas, una banda con su propio PA');
swap('Esta guía cubre caballos analógicos, híbridos con grabadora', 'Esta guía cubre todoterrenos analógicos, híbridos con grabadora');
// SEC1
swap('con envíos aux para monitores y efectos para el acabado', 'con envíos aux para monitores y efectos para el acabado');
swap('Deja la actuación con la multipista completa para mezclar después, sin cargar grabadora extra',
  'Sales de la actuación con la multipista completa para mezclar después, sin cargar grabadora extra');
// SEC2
swap('este estándar compacto es la referencia a aprender', 'este estándar compacto es la referencia que hay que aprender');
swap('permite ajustar la sala desde el suelo en vez de adivinar tras la mesa', 'permite ajustar la sala desde la sala en vez de adivinar tras la mesa');
// SEC3
swap('permite manejar un procesado de canal complejo sin sacrificar nada', 'permite manejar un procesado de canal complejo sin quedarse corta');
swap('una calidad de audio prístina', 'una calidad de audio impecable');
// SEC4
swap('el Behringer X Air XR18 es la mezcladora de stagebox digital', 'el Behringer X Air XR18 es el mezclador stagebox digital');
// SEC5
swap('trabaja a 96kHz', 'trabaja a 96 kHz');
swap('con asistentes inteligentes de ganancia automática y eliminación de retroalimentación integrada',
  'con asistentes inteligentes de ganancia automática y antiaceople integrado');
swap('Va dirigido al músico tecnológico que tiene presupuesto', 'Va dirigido al músico más técnico que tiene presupuesto');
// SEC6
swap('Es la opción habitual para venues de tamaño mediano', 'Es la opción habitual para salas de tamaño mediano');
// SEC7 + heading
swap('Korg SoundLink MW-1608: faders primero, recall después', 'Korg SoundLink MW-1608: faders primero, memoria después');
swap('mientras el recuerdo digital trabaja debajo', 'mientras la memoria digital trabaja por debajo');
swap('¿El compromiso? La profundidad remota moderna', '¿La pega? La profundidad remota moderna');
// SEC9
swap('El Yamaha DM3S es el escritorio digital ultracompacto para ese mundo', 'El Yamaha DM3S es la mesa digital ultracompacta para ese mundo');
swap('mientras StageMix y MonitorMix sirven a 10 dispositivos', 'mientras StageMix y MonitorMix dan servicio a 10 dispositivos');
swap('6 Mix + 2 Matrix limitan shows con muchos monitores', '6 Mix + 2 Matrix limitan conciertos con muchos monitores');
// SEC10
swap('una tablet muerta o un WiFi saturado dejan sin superficie que agarrar',
  'una tablet sin batería o un WiFi saturado te dejan sin superficie que agarrar');
// CONCLUSION
swap('mientras el Allen & Heath SQ-5 lleva sonido pro a 96 kHz a la gira',
  'mientras el Allen & Heath SQ-5 lleva sonido profesional a 96 kHz a la gira');
swap('y el CQ-18T mezcla desde su táctil con ganancia auto y ayuda anti-feedback',
  'y el CQ-18T mezcla desde su táctil con ganancia automática y ayuda antiaceople');
swap('>Mejores sistemas PA para Bandas</a>', '>Mejores sistemas PA para sonido en vivo: guía completa</a>');
swap('>Mejores Altavoces PA Activos para Sonido en Vivo</a>', '>Mejores altavoces PA de 12 y 15 pulgadas para directo</a>');
swap('>Mejores Micrófonos Inalámbricos para Escenario</a>', '>Mejores sistemas de micrófono inalámbricos para escenario</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
