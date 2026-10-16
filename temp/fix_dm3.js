const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-digital-mixers');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('La diferencia está en confiabilidad, calidad de audio y cantidad de funciones.',
  'La diferencia está en fiabilidad, calidad de audio y cantidad de funciones.');
swap('<a class=\\"guide-link-btn\\" href=\\"/guides/best-compact-mixers.html\\">Mejores mezcladores económicos</a> ', '');
swap('href=\\"/guides/pro-mixers.html\\">Mejores mezcladores de estudio</a>',
  'href=\\"/guides/pro-mixers_es.html\\">Allen & Heath CQ-18T vs Midas M32R LIVE</a>');
swap('href=\\"/guides/best-compact-mixers.html\\">Mejores mezcladores por debajo de $500</a>',
  'href=\\"/guides/best-compact-mixers_es.html\\">Mejores mezcladores Digitales de rack con control tablet</a>');
swap('gracias a su interfaz USB 18x18 y Dante opciónal.', 'gracias a su interfaz USB 18x18 y Dante opcional.');
swap('El ruteo sigue flexible para bandas, teatro o instalación', 'El encaminamiento sigue flexible para bandas, teatro o instalación');
swap('expresamente sin Dante —ese protocolo queda para su hermano DM3.', 'expresamente sin Dante — ese protocolo queda para su hermano DM3.');
swap('Dieciséis efectos integrados, mezcla menos para podcast y MIDI completan', 'Dieciséis efectos integrados, mezcla mix-minus para podcast y MIDI completan');
swap('Para bandas de directo, ensayos y streams que necesitan digital diminuto con ayudas, nada empaqueta menos.',
  'Para bandas de directo, ensayos y streams que necesitan digital diminuto con ayudas, nada empaqueta más.');
swap('>Mejores mezcladores de sonido en vivo</a>', '>Mejores mezcladores de sonido para bandas y eventos</a>');
swap('>Mejores mezcladores compactos</a>', '>Mejores mezcladores Digitales de rack con control tablet</a>');
swap('>XR18 vs M32R</a>', '>Behringer XR18 vs Midas M32R LIVE: comparativa</a>');
swap('>mejores mezcladoras para sonido en vivo</a>', '>Mejores mezcladores de sonido para bandas y eventos</a>');
swap('>mejores mezcladores compactos</a>', '>Mejores mezcladores Digitales de rack con control tablet</a>');
swap('>comparativa XR18 vs M32R</a>', '>Behringer XR18 vs Midas M32R LIVE: comparativa</a>');
swap('>comparativa de mezcladores profesionales</a>', '>Allen & Heath CQ-18T vs Midas M32R LIVE</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
