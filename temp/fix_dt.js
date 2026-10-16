const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'dt770-vs-dt990');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('que todo productor debate', 'que todo productor debate.');
swap('Los drivers de 80 Ohm los mueve bien casi cualquier interfaz', 'Los drivers de 80 ohmios los mueve bien casi cualquier interfaz');
swap('cómodas durante largas sesiones de doblajes', 'cómodas durante largas sesiones de doblaje');
swap('y que tu interfaz trabaje bien con 80 Ohm', 'y que tu interfaz funcione bien con 80 ohmios');
swap('Ideales para mezclar, editar y escuchar con ojo crítico en casa', 'Ideales para mezclar, editar y escuchar con oído crítico en casa');
swap('el DT 770 Pro es no negociable para evitar sangrado', 'el DT 770 Pro es imprescindible para evitar sangrado');
swap('>guía de los mejores auriculares de estudio</a>', '>Mejores auriculares de estudio: guía completa</a>');
swap('>Mejores Auriculares de estudio para Mezcla y Seguimiento</a>', '>Mejores auriculares de estudio: guía completa</a>');
swap('>Mejores Auriculares Cerrados para Mezcla y Grabación</a>', '>Mejores auriculares cerrados para grabar y aislar la voz</a>');
swap('>HD 490 Pro Plus vs DT 990 Pro</a>', '>HD 490 Pro vs DT 990 Pro: ¿abiertos para mezclar?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
