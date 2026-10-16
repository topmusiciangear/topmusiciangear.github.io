const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'budget-usb-mics');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('selecciónado los 13 mejores', 'seleccionado los 13 mejores');
swap('por menos de $200 tienes todo lo que necesitas', 'por menos de $200 tiene todo lo que necesitas');
// SEC1
swap('La cápsula dinámica rechazan el ruido', 'La cápsula dinámica rechaza el ruido');
// SEC2
swap('la cápsula dinámico cardioide mantiene', 'la cápsula dinámica cardioide mantiene');
swap('Si el configuración de streaming vive', 'Si la configuración de streaming vive');
// SEC4
swap('un configuración de escritorio completo', 'una configuración de escritorio completo');
// SEC5
swap('La cápsula dinámico cardioide está hecha', 'La cápsula dinámica cardioide está hecha');
// SEC6
swap('mientras rechazan el ruido de la sala', 'mientras rechaza el ruido de la sala');
// SEC8
swap('la mejor opción construcción de esta lista', 'la mejor opción de construcción de esta lista');
// SEC10
swap('capta más sala than un dinámico', 'capta más sala que un dinámico');
// SEC11
swap('no pueden tocar', 'no pueden tocar');
swap('oye más sala than un dinámico', 'oye más sala que un dinámico');
// SEC13
swap('la cápsula condensadora offers voz clara', 'la cápsula condensadora ofrece voz clara');
swap('captura más ruido de sala than un dinámico', 'captura más ruido de sala que un dinámico');
// SEC14
swap('rechazan el ruido de la sala mejor than un condensador', 'rechaza el ruido de la sala mejor que un condensador');
swap('las voces bajas Pedirán subir', 'las voces bajas pedirán subir');
swap('la resolución esde utilizable', 'la resolución es de utilizable');
swap('si conserva el micrófono', 'si conservas el micrófono');
// SEC16
swap('la prueba importa más than las funciones', 'la prueba importa más que las funciones');
// SEC17
swap('la USB is la cómoda', 'la USB es la cómoda');
// SEC18
swap('controles de ganancia and mezcla', 'controles de ganancia y mezcla');
// SEC19
swap('The cápsula cardioide mantiene', 'La cápsula cardioide mantiene');
swap('The contrapartida', 'La contrapartida');
swap('monitorizas por el ordenador and pierdes', 'monitorizas por el ordenador y pierdes');
swap('un micrófono of streaming', 'un micrófono de streaming');
swap('Si tu presupuesto total es de 35 $ and quieres', 'Si tu presupuesto total es de 35 $ y quieres');
// CONCLUSION + anchors
swap('The Samson Q2U es el mejor', 'El Samson Q2U es el mejor');
swap('>Mejores Micrófonos Económicos</a>', '>Mejores micrófonos XLR económicos para estudio</a>');
swap('>Mejores Micrófonos USB y XLR para Streaming</a>', '>Mejores micrófonos USB para streaming</a>');
swap('>Mejor Micrófono para Podcasting</a>', '>Mejores micrófonos para podcast: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
