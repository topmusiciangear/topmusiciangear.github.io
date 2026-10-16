const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'nx912-vs-pxm12mp');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('¿Es la RCF nX 912-sMA la mejor cuña para directos ruidosos?', '¿Es la RCF NX 912-SMA la mejor cuña para directos ruidosos?');
swap('¿Es la EV pXM-12mP la mejor cuña para bandas que trabajan?', '¿Es la EV PXM-12MP la mejor cuña para bandas en activo?');
swap('de cuánto aguante tu espalda a la hora de desmontar', 'de cuánto aguante tu espalda a la hora de desmontar.');
swap('El driver coaxial de 12/1,75 pulgadasitúa ambas fuentes en el mismo eje', 'El driver coaxial de 12/1,75 pulgadas sitúa ambas fuentes en el mismo eje');
swap('desde un solo punto en vez de dos fuentesuperpuestas que se filtran', 'desde un solo punto en vez de dos fuentes superpuestas que se filtran');
swap('Su amplificador Class-D de 700W fue diseñado con Dynacord', 'Su amplificador en Clase D de 700 W fue diseñado con Dynacord');
swap('te da preajustes, un filtro de muesca para el acople y emparejado de subwoofer', 'te da preajustes, un filtro notch para el acople y emparejamiento de subwoofer');
swap('Es la caja que recomendaría la mayoría de bandas que trabajan sin pensármelo.',
  'Es la caja que recomiendo a la mayoría de bandas en activo sin dudarlo.');
swap('así que la consistencia del coaxial importmás que el alcance.', 'así que la consistencia del coaxial importa más que el alcance.');
swap('La RCF te da 130 dB, 2100W y alcance de bocina', 'La RCF te da 130 dB, 2.100 W y alcance de bocina');
swap('>Mejores Monitores de Piso Activos para Directo</a>', '>Mejores monitores de piso activos para directo</a>');
swap('>Mejores Altavoces PA Activos para Sonido en Vivo</a>', '>Mejores altavoces PA de 12 y 15 pulgadas para directo</a>');
swap('>Mejores sistemas PA para Bandas</a>', '>Mejores sistemas PA para sonido en vivo: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
