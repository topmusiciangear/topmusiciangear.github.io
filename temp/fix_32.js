const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-32-channel-digital-mixers');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('para encontrar la mejor combinación de previos, ruteo de buses, efectos, grabación',
  'para encontrar la mejor combinación de previos, encaminamiento de buses, efectos, grabación');
swap('Ten en cuenta que los modelos en rack o subcompactos (como la PreSonus 32SC o la SQ-6+) ahorran espacio',
  'Ten en cuenta que los modelos en rack o subcompactos (como la PreSonus 32SC) ahorran espacio');
swap('Se acabó eso de girar perillas para volver a dejarlas en su sitio.', 'Se acabó eso de girar ruedas para volver a dejarlas en su sitio.');
swap('gestión mejorada de escenas e Integración Acústica con altavoces Turbosound', 'gestión mejorada de escenas e integración acústica con altavoces Turbosound');
swap('más ligeras que consolas comparables mientras es más duradera.', 'más ligeras que consolas comparables y a la vez más duraderas.');
swap('tarjetas opciónales Dante/Waves/MADI y SLink la mantienen expandible', 'tarjetas opcionales Dante/Waves/MADI y SLink la mantienen expandible');
swap('y 15,15 kg la mantienen portable para una mesa de 25 faders.', 'y 15,15 kg la mantienen manejable para una mesa de 25 faders.');
swap('girando una sola perilla (1-Knob), facilitando la vida', 'girando una sola rueda (1-Knob), facilitando la vida');
swap('que necesitan mezcla confiable sin la complejidad de una consola', 'que necesitan mezcla fiable sin la complejidad de una consola');
swap('El puente AVB-D16 opciónal agrega conectividad Dante', 'El puente AVB-D16 opcional agrega conectividad Dante');
swap('chasis ligero de 9.6 libras hacen que la DL32SE sea fácil', 'chasis ligero de 4,4 kg (9,6 lb) hacen que la DL32SE sea fácil');
swap('ingenieros móviles que necesitan mezcla confiable sin la complejidad', 'ingenieros móviles que necesitan mezcla fiable sin la complejidad');
swap('>Mejores Mezcladoras Digitales</a>', '>Mejores mezcladores digitales: guía completa</a>');
swap('>Mejores Mezcladoras Analógicas</a>', '>Mejores mesas de mezcla analógicas: control directo</a>');
swap('>Mejores Mezcladoras Compactas</a>', '>Mejores mezcladores Digitales de rack con control tablet</a>');
swap('>Mejores Mezcladoras para Sonido en Vivo</a>', '>Mejores mezcladores de sonido para bandas y eventos</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
