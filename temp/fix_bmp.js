const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'beatmaker-plugins');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('¿Es XLN audio RC-20 Retro Color el plugin', '¿Es XLN Audio RC-20 Retro Color el plugin');
swap('¿Puede Baby audio Transit 2 transformar', '¿Puede Baby Audio Transit 2 transformar');
swap('¿Añade Excite audio Lifeline Expanse espacio', '¿Añade Excite Audio Lifeline Expanse espacio');
swap('¿Puede Excite audio Motion: Harmonic añadir', '¿Puede Excite Audio Motion: Harmonic añadir');
swap('Con un solo knob, puedes crear transiciones profesionales', 'Con una sola rueda, puedes crear transiciones profesionales');
swap('solo insertas el plugin, ajustas el knob durante la transición', 'solo insertas el plugin, ajustas la rueda durante la transición');
swap('Cárgalo en un acorde, un arp o un vocal chop y las modulaciones', 'Cárgalo en un acorde, un arpegio o un chop vocal y las modulaciones');
swap('>Mejores Herramientas IA para Producción Musical</a>', '>Mejores herramientas IA para producción musical</a>');
swap('>Mejores Plugins de Sidechain y Modulación Rítmica</a>', '>Mejores plugins de sidechain y modulación rítmica</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
