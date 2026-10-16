const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'pro-microphones');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Lewitt LCT 1040 sistema de micrófono ultimate', 'Lewitt LCT 1040: el sistema de micrófono definitivo');
swap('combina la calidez del tubo con la claridad FET en un solo sistema',
  'combina la calidez del tubo con la claridad FET en un solo sistema.');
swap('los patrones cambian qué lados escuchan, así que moldeas fugas', 'los patrones cambian qué lados captan, así que moldeas fugas');
swap('Cinco patrones polares selecciónables con control remoto', 'Cinco patrones polares seleccionables con control remoto');
swap('con un ruido propio ultrabajo de sólo 10 dB(A).', 'con un ruido propio ultrabajo de solo 10 dB(A).');
swap('>Mejores Micrófonos Económicos</a>', '>Mejores micrófonos XLR económicos para estudio</a>');
swap('>Mejores Micrófonos USB y XLR para Streaming</a>', '>Mejores micrófonos USB para streaming</a>');
swap('>Mejores Micrófonos de Escenario y Directo</a>', '>Mejores micrófonos de escenario y directo</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
