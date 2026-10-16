const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'mics-for-creators');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// SEC0
swap('suficientes para streaming y YouTube del micrófono, suficientes para streaming y YouTube del micrófono, suficientes para streaming y YouTube del micrófono',
  'suficientes para streaming y YouTube');
swap('armar un configuración que crezca contigo', 'armar una configuración que crezca contigo');
// SEC2
swap('traes sensor de silencio de un toque', 'trae sensor de silencio de un toque');
swap('así que judged por lo que sí publica', 'así que juzga por lo que sí publica');
swap('The AM8 cuesta once dólares menos', 'El AM8 cuesta once dólares menos');
// SEC3
swap('sea el más claridad de los dos', 'sea el más claro de los dos');
swap('FIFINE tasa la cápsula en 130 dB', 'FIFINE establece la cápsula en 130 dB');
// SEC4
swap('se queden fuera de la grabación', 'se quedan fuera de la grabación');
// SEC6
swap('The cápsula cubre 50Hz–16kHz', 'La cápsula cubre 50Hz–16kHz');
swap('para USB hoy y XLR tomorrow', 'para USB hoy y XLR mañana');
// SEC8
swap('mientras este clearly quiere protagonismo', 'mientras este claramente quiere protagonismo');
swap('la lista de funciones caa justo donde debe', 'la lista de funciones caiga justo donde debe');
// SEC11
swap('migrar a una interfaz después', 'migra a una interfaz después');
// SEC13
swap('The caja trae trípode', 'La caja trae trípode');
// SEC15
swap('Tres cápsulas de 14mm offeren patrones', 'Tres cápsulas de 14mm ofrecen patrones');
// SEC16
swap('casi todos los micro USB', 'casi todos los micrófonos USB');
swap('El sensor de silencio del capacitive es el detalle', 'El sensor de silencio capacitivo es el detalle');
// CONCLUSION
swap('el FIFINE AM8 es el que te lleves', 'el FIFINE AM8 es el que te llevas');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
