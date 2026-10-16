const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'apollo-vs-babyface');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('con el que puedes grabar con un compresor LA-2A y un EQ Pultec sin retardo audible',
  'que te permite grabar con un compresor LA-2A y un Pultec sin retardo audible');
swap('es el entorno de mezcla más potente jamás metido en una interfaz', 'es el entorno de mezcla más potente jamás integrado en una interfaz');
swap('Mientras el Apollo depende del DSP, RME depende de una arquitectura', 'Mientras que el Apollo depende del DSP, RME depende de una arquitectura');
swap('con una ruta de señal prístina con enrutamiento de software excelente pero sin procesamiento',
  'con una ruta de señal prístina y un encaminamiento por software excelente pero sin procesamiento');
swap('el encaminamiento de cualquiera de las dos unidades te darán buen servicio durante años',
  'el encaminamiento de cualquiera de las dos unidades te dará buen servicio durante años');
swap('y enrutamiento TotalMix que nada iguala', 'y encaminamiento TotalMix que nada iguala');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
