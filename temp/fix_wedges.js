const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'stage-wedges');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('Probadas detrás de cuñas en clubes, teatros y festivales, estas cinco cuñas activas rinden ante cualquier repertorio',
  'Probados en clubes, teatros y festivales, estos cinco monitores activos rinden ante cualquier repertorio');
// SEC0
swap('es la opción económica que igual suena abierta', 'es la opción económica que aun así suena abierta');
swap('desde 2100W de margen hasta un precio de entrada que aún incluye DSP serio',
  'desde 2.100 W de margen hasta un precio de entrada que aún incluye DSP serio');
// SEC1
swap('Un amplificador Class-D de 2100W de pico mueve', 'Un amplificador en Clase D de 2.100 W de pico alimenta');
swap('Es la que eliges si tocas en escenarios que piden más volumen o necesitas margen de sobra',
  'Es la que necesitas si tocas en escenarios que piden más volumen o necesitas margen de sobra');
swap('Es la más cara de la lista, y en un directo se lo gana', 'Es la más cara de la lista, y en un directo lo amortiza');
// SEC2
swap('El conjunto coaxial de 12\"/1,75\" comparte', 'El conjunto coaxial de 12/1,75 pulgadas comparte');
swap('El amplificador Class-D de 700W fue diseñado junto a Dynacord', 'El amplificador en Clase D de 700 W, diseñado junto a Dynacord');
swap('filtro notch y emparejado de sistema desde una pantalla LCD clara', 'filtro notch y emparejamiento de sistema desde una pantalla LCD clara');
swap('mantienen el escenario ordenado y el montaje rápido', 'mantiene el escenario ordenado y el montaje rápido');
swap('y la que recomendaría la mayoría de bandas que trabajan', 'y la que recomiendo a la mayoría de bandas en activo');
// SEC3
swap('Un amplificador de 300W RMS (1200W de pico) mueve', 'Un amplificador de 300 W RMS (1.200 W de pico) alimenta');
// SEC4
swap('Un amplificador Class-D de 1000W dinámicos mueve un driver coaxial de 12\"/1,75\"',
  'Un amplificador en Clase D de 1.000 W dinámicos alimenta un driver coaxial de 12/1,75 pulgadas');
swap('y el interruptor D-CONTOUR te deja cambiar entre curvas FOH y MONITOR',
  'y el interruptor D-CONTOUR permite cambiar entre curvas FOH y MONITOR');
swap('y es la que más se siente como equipo de estudio sobre un escenario',
  'y es la que más suena a equipo de estudio sobre un escenario');
// SEC5
swap('es la cuña activa que acerca el equipamiento de un sistema profesional a un precio de entrada',
  'es la cuña activa que acerca el nivel de un sistema profesional a un precio de entrada');
swap('Un amplificador Klark Teknik Class-D entrega 1100W a un woofer', 'Un amplificador Klark Teknik en Clase D entrega 1.100 W a un woofer');
swap('y la caja de contrachapado de 15 mm la mantiene portable en 16,9 kg',
  'y la caja de contrachapado de 15 mm la mantiene manejable en 16,9 kg');
// CONCLUSION
swap('La Electro-Voice PXM-12MP es la cuña más equilibrada para la mayoría de bandas que trabajan',
  'La Electro-Voice PXM-12MP es la cuña más equilibrada para la mayoría de bandas en activo');
swap('La Yamaha DHR12M es la opción equilibrada con DSP serio', 'La Yamaha DHR12M es la opción sensata con DSP serio');
swap('es la cuña económica que igual suena llena y clara', 'es la cuña económica que aun así suena llena y clara');
swap('es la opción activa con mejor valor: una cuña coaxial de 1100W',
  'es la opción activa con mejor relación calidad-precio: una cuña coaxial de 1.100 W');
swap('potencia de sobra para presentaciones reales, un driver coaxial', 'potencia de sobra para bolos de verdad, un driver coaxial');
swap('>Mejores Altavoces PA Activos para Sonido en Vivo</a>', '>Mejores altavoces PA de 12 y 15 pulgadas para directo</a>');
swap('>Mejores sistemas PA para Bandas</a>', '>Mejores sistemas PA para sonido en vivo: guía completa</a>');
swap('>Mejores Mezcladores de Sonido en Vivo para Bandas y Eventos</a>', '>Mejores mezcladores de sonido para bandas y eventos</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
