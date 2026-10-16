const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'studio-subwoofers');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Kali Audio wS-6.2: mejor para cancelar vibraciones de la caja', 'Kali Audio WS-6.2: mejor para cancelar vibraciones de la caja');
swap('IK multimedia iLoud sub: la solución precisa para salas sin tratamiento', 'IK Multimedia iLoud Sub: la solución precisa para salas sin tratamiento');
swap('Cuando mezclas música con graves pesados, no sólo necesitas volumen bruto', 'Cuando mezclas música con graves pesados, no solo necesitas volumen bruto');
swap('una respuesta plana por debajo de 40Hz.', 'una respuesta plana por debajo de 40 Hz.');
swap('revisa la respuesta plana bajo 40 Hz y las resonancias antes de comprar puede ser difícil, ya que muchas opciones',
  'revisar la respuesta plana bajo 40 Hz y las resonancias antes de comprar es clave, ya que muchas opciones');
swap('para reproducir transitorios con precisión', 'para reproducir transitorios con precisión.');
swap('La mayoría de los monitores de campo cercano empieza a perder respuesta muy por encima de 40Hz',
  'La mayoría de los monitores de campo cercano empiezan a perder respuesta muy por encima de 40 Hz');
swap('no sólo los vatios.', 'no solo los vatios.');
swap('El RCA sólo sirve para equipo de consumo.', 'El RCA solo sirve para equipo de consumo.');
swap('con un amplificador Clase-D fresco y eficiente para extender', 'con un amplificador en Clase D eficiente para extender');
swap('la extensión de graves más precisa (hasta 22Hz)', 'la extensión de graves más precisa (hasta 22 Hz)');
swap('Un amplificador Clase-D de 400W (1000W de pico) los impulsa hasta 120dB de SPL máximo con respuesta hasta 27Hz',
  'Un amplificador en Clase D de 400 W (1.000 W de pico) los impulsa hasta 120 dB de SPL máximo con respuesta hasta 27 Hz');
swap('El cruce selecciónable 80Hz / LFE / externo', 'El cruce seleccionable 80 Hz / LFE / externo');
swap('no sólo con un par de una marca.', 'no solo con un par de una marca.');
swap('llega a 25Hz con 160W RMS disponibles', 'llega a 25 Hz con 160 W RMS disponibles');
swap('y la Adam T10S es la opción que ahorra espacio', 'y el Adam T10S es la opción que ahorra espacio');
swap('>mejores monitores de estudio</a>', '>Mejores monitores de estudio: guía completa para cada sala</a>');
swap('>guía de configuración de monitores</a>', '>Cómo configurar monitores de estudio para que suene igual</a>');
swap('>mejores monitores por menos de $500</a>', '>Mejores monitores de estudio por menos de $500</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
