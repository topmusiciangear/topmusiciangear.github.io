const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'm50x-vs-mdr7506');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('son dos de los auriculares de estudio cerrados más populares',
  'son dos de los auriculares de estudio cerrados más populares.');
swap('Los drivers de 45mm de apertura grande entregan', 'Los drivers de 45 mm de gran diámetro entregan');
swap('Los drivers de 40mm entregan una respuesta neutral', 'Los drivers de 40 mm entregan una respuesta neutral');
swap('asi que las sibilancias y los plosivos sean notables al instante', 'así que las sibilancias y los plosivos se notan al instante');
swap('El cable enrollado no desmontable es una relación de amor-odio', 'El cable enrollado no desmontable o lo amas o lo odias');
swap('Si necesitas una referencia confiable que te diga la verdad', 'Si necesitas una referencia fiable que te diga la verdad');
swap('se pliegan con cable desmontable para fácil portabilidad', 'se pliegan con cable desmontable para una portabilidad fácil');
swap('El MDR-7506 se pliega en forma de bola con su cable enrollado adjunto', 'El MDR-7506 se pliega sobre sí mismo con su cable enrollado fijo');
swap('También merece la pena notar: las almohadillas del 7506 son más baratas y fáciles de reemplazar (en comparación con las del M50x)',
  'También conviene notar que las almohadillas del 7506 son más baratas y fáciles de reemplazar que las del M50x.');
swap('Compra el 7506 si grabas, editas diálogo, o necesitas una referencia confiable',
  'Compra el 7506 si grabas, editas diálogo o necesitas una referencia fiable');
swap('Uno es diversión, uno es trabajo.', 'Uno es diversión, el otro es trabajo.');
swap('>guía de los mejores auriculares de estudio</a>', '>Mejores auriculares de estudio: guía completa</a>');
swap('>Mejores Auriculares de estudio para Mezcla y Seguimiento</a>', '>Mejores auriculares de estudio: guía completa</a>');
swap('>Mejores Auriculares de estudio Económicos</a>', '>Mejores auriculares de estudio por menos de $150</a>');
swap('>Mejores Auriculares Cerrados para Mezcla y Grabación</a>', '>Mejores auriculares cerrados para grabar y aislar la voz</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
