const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'mixing-plugins');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('las grandes te permiten trabajar de forma transparente y recordarlo todo después',
  'las grandes te permiten trabajar de forma transparente y recuperarlo todo después');
swap('El undo y el recall son las funciones silenciosas.', 'El undo y el recall son las funciones discretas.');
swap('La automatización sólida, el gain staging claro y el recall confiable marcan la diferencia',
  'La automatización sólida, la estructura de ganancia clara y el recall fiable marcan la diferencia');
swap('Los pre másters apagados mejoran en minutos dejando proponer al asistente y recortando sus excesos',
  'Los premásters apagados mejoran en minutos dejando que el asistente proponga y recortando sus excesos');
swap('Pro-Q 4 es el único ecualizador que uso', 'Pro-Q 4 es el único ecualizador que necesitas');
swap('es lo que da a la batería y a las voces ese punch inconfundible', 'es lo que da a la batería y a las voces esa pegada inconfundible');
swap('>Mejores Plugins de Mezcla Que Hacen una Diferencia Real</a>', '>Mejores plugins para producción musical: guía completa</a>');
swap('>Mejores Plugins de Channel Strip y Emulación de Consola</a>', '>Emulación analógica en el DAW: mejores plugins channel strip</a>');
swap('>Mejores Plugins de Efectos Creativos</a>', '>Mejores plugins de efectos creativos para producción</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
