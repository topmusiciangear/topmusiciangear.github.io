const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'channel-strip-plugins');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('que dio a los discos vintage su sonido', 'que dio a los discos vintage su sonido.');
swap('Una perilla con carácter vale más que muchas perillas sutiles.', 'Una rueda con carácter vale más que muchas ruedas sutiles.');
swap('y la forma en que hace que las baterías chasqueen y las voces encajen a la perfección, y lo convierten en un plugin',
  'y la forma en que hace que las baterías chasqueen y las voces encajen a la perfección lo convierten en un plugin');
swap('busca unos 4dB de reducción de ganancia', 'busca unos 4 dB de reducción de ganancia');
swap('Una sola licencia, más de treinta plug-ins, cero huecos', 'Una sola licencia, más de treinta plugins, cero huecos');
swap('Comprar el paquete para usar dos plug-ins es tirar el dinero', 'Comprar el paquete para usar dos plugins es tirar el dinero');
swap('Previolificadores y ecualizadores Neve 1073', 'Preamplificadores y ecualizadores Neve 1073');
swap('Este es el sonido de Abbey Road, Sunset Sound y Electric Lady en tu laptop.', 'Este es el sonido de Abbey Road, Sunset Sound y Electric Lady en tu portátil.');
swap('EQ, sección de dinámica y los famosos filtros pasa altos y pasa bajos.', 'EQ, sección de dinámica y los famosos filtros de paso alto y paso bajo.');
swap('>guía de los mejores plugins</a>', '>Mejores plugins para producción musical: guía completa</a>');
swap('>Mejores Plugins de Mezcla Que Hacen una Diferencia Real</a>', '>Mejores plugins para producción musical: guía completa</a>');
swap('>Mejores Plugins de Mezcla y Masterización</a>', '>Mejores plugins de mezcla y masterización</a>');
swap('>Mejores Plugins de Efectos Creativos</a>', '>Mejores plugins de efectos creativos para producción</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
