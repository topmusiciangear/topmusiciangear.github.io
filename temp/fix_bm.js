const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-microphone');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('Esta guía desglosa las cinco categorías principales', 'Esta guía desglosa las tres categorías principales');
// SEC0 + heading
swap('Micrófonos dinámicos: los trabajadores incansables', 'Micrófonos dinámicos: los todoterrenos');
swap('así que puedes saltarte el Cloudlifter', 'así que puedes ahorrarte el Cloudlifter');
swap('Salta a la SM57 vs SM58: ¿cuál para voz y amplis? (prueba real)',
  'Lee nuestra comparativa SM57 vs SM58: ¿cuál para voz y amplis? (prueba real)');
// SEC1
swap('Consulta nuestra Guía de mejores micrófonos de instrumento o nuestra Guía de micrófonos económicos',
  'Consulta nuestra guía de mejores micrófonos de instrumento o nuestra guía de micrófonos económicos');
// SEC2
swap('Consulta nuestra Guía de mejores micrófonos ribbon', 'Consulta nuestra guía de mejores micrófonos ribbon');
// SEC4
swap('Las salas reflectantes sin tratar y el sangrado del escenario muestran el compromiso del condensador',
  'Las salas reflectantes sin tratar y lo que se cuela del escenario muestran el compromiso del condensador');
// SEC6
swap('Construcción y tolerancias de buque insignia pensado para rotación profesional diaria',
  'Construcción y tolerancias de gama alta pensado para rotación profesional diaria');
// SEC9
swap('más silenciosa que la sala en la mayoría de home studios', 'más silenciosa que la sala en la mayoría de estudios caseros');
// SEC11
swap('Pero nada por debajo de $300 pone en aprietos a los insignia como este',
  'Pero nada por debajo de $300 pone en aprietos a los de gama alta como este');
// SEC13
swap('es el sonido de élite comercial al alcance de un home studio',
  'es el sonido de gama alta al alcance de un estudio casero');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
