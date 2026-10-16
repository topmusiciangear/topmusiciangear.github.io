const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'active-vs-passive-pa');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('Hazlo bien, y el sistema sonará claro, potente y confiable durante años',
  'Si aciertas, el sistema sonará claro, potente y fiable durante años');
// SEC0
swap('sintonizado específicamente para sus controladores', 'ajustado específicamente a sus drivers');
swap('combinaciones incorrectas de amplificador y altavoz que queman los controladores', 'combinaciones incorrectas de amplificador y altavoz que queman los drivers');
swap('La comodidad de llevar altavoz y amplificador en una sola caja no tiene precio para los músicos de directo',
  'La comodidad de llevar altavoz y amplificador en una sola caja es impagable para los músicos de directo');
swap('pero a un costo y complejidad significativamente mayores', 'pero con un coste y una complejidad significativamente mayores');
swap('a menudo prefieren pasivo', 'suelen preferir pasivo');
// SEC1
swap('El fabricante ya ha selecciónado el amplificador perfecto para cada controlador',
  'El fabricante ya ha seleccionado el amplificador perfecto para cada driver');
swap('No necesitas calcular vataje, impedancia ni valores RMS', 'No necesitas calcular vatios, impedancia ni valores RMS');
swap('Esto elimina el mayor punto de fallo en el sonido en vivo', 'Esto elimina el mayor punto de fallo en el directo');
swap('de las tarjetas de abajo lleva su propio amplificador Class-D de 1.600W',
  'de las opciones de abajo lleva su propio amplificador en Clase D de 1.600 W');
swap('Esto te da margen limpio sin arriesgar daños al controlador', 'Esto te da margen limpio sin arriesgar daños al driver');
// SEC2
swap('Esta guía compara los altavoces PA activos y pasivos lado a lado, porque cada uno funciona mejor en situaciones diferentes. Aquí tienes un desglose de por qué:',
  'Esta guía compara los altavoces PA activos y pasivos frente a frente, porque cada uno funciona mejor en situaciones distintas. Aquí va el desglose:');
swap('si falla el amp muere el altavoz', 'si falla la etapa, muere el altavoz');
swap('comprar y configurar el amp aparte', 'comprar y configurar el amplificador aparte');
// SEC3 + heading checks
swap('Obtienes 2000W de potencia máxima', 'Obtienes 2.000 W de potencia máxima');
swap('Pesa solo 30 lbs', 'Pesa solo 13,6 kg (30 lb)');
swap('una persona puede fácilmente transportar y configurar un par', 'una persona puede transportar y montar un par sin ayuda');
swap('La caja de ABS es lo suficientemente duradera para uso de fin de semana', 'La caja de ABS aguanta bien los bolos de fin de semana');
swap('el ZLX-12P-G2 es el valor más inteligente en PA activo', 'el ZLX-12P-G2 es la mejor opción en relación calidad-precio en PA activo');
// SEC4
swap('2000W de potencia máxima con amplificación Clase D ofrece margen de sobra',
  '2.000 W de potencia máxima con amplificación en Clase D ofrecen margen de sobra');
swap('El recinto de polipropileno resistente con esquinas recubiertas de goma sobrevive años de abuso en giras',
  'La caja de polipropileno resistente con esquinas recubiertas de goma sobrevive años de maltrato en giras');
// SEC5
swap('con el legendario FIR-X tuning de Yamaha y DSP D-CONTOUR para modelado automático de sonido basado en el nivel de volumen',
  'con el legendario ajuste FIR-X de Yamaha y DSP D-CONTOUR, que adapta el sonido automáticamente al nivel de volumen');
swap('entregan 131dB SPL', 'entregan 131 dB SPL');
swap('El diseño ligero (34,8 lbs) y las asas ergonómicas facilitan el transporte',
  'El diseño ligero (15,8 kg / 34,8 lb) y las asas ergonómicas facilitan el transporte');
swap('La garantía de 7 años de Yamaha es la mejor opción de la industria', 'La garantía de 7 años de Yamaha es la mejor de la industria');
// SEC6 + heading
swap('JBL EON712: por qué las cajas autopotenciadas ganan en gigs solistas',
  'JBL EON712: por qué las cajas autoamplificadas ganan en bolos en solitario');
swap('entrega 1300 W de pico en Clase D', 'entrega 1.300 W de pico en Clase D');
swap('El recinto encaja con presentadores móviles', 'La caja encaja para presentadores móviles');
// SEC7
swap('Dobles woofers de 15 pulgadas con bobina edgewound de 64mm mueven aire serio: 250W continuos, 1000W de pico',
  'Dos woofers de 15 pulgadas con bobina edgewound de 64 mm mueven aire de verdad: 250 W continuos, 1.000 W de pico');
swap('Suma cualquier etapa y el sistema escala añadiendo cajas', 'Añade cualquier etapa y el sistema crece sumando cajas');
swap('amplificación externa y proceso que gestionar', 'amplificación externa y procesado que gestionar');
swap('lo pasivo sigue siendo más barato por decibelio que nada con cable de corriente',
  'lo pasivo sigue siendo más barato por decibelio que cualquier caja con cable de corriente');
// SEC8
swap('mientras que el mezclador digital de cuatro canales SRT Mix Control con Bluetooth permite conectar vocales, teclados y pista',
  'mientras que el mezclador digital de cuatro canales SRT Mix Control con Bluetooth permite conectar voces, teclados y pista');
// SEC9 + heading check (keep heading, fix body)
swap('maneja 175W continuos, 350W de programa y 700W de pico en 8 ohmios', 'maneja 175 W continuos, 350 W de programa y 700 W de pico en 8 ohmios');
swap('El bocina de dispersión amplia', 'La bocina de dispersión amplia');
// SEC10 + heading
swap('EV ELX200-12: claridad pasiva con la precisión del waveguide SST',
  'EV ELX200-12: claridad pasiva con la precisión de la guía de ondas SST');
swap('entrega 300W continuos y 1.200W de pico en 8 ohmios', 'entrega 300 W continuos y 1.200 W de pico en 8 ohmios');
swap('El waveguide SST patentado produce', 'La guía de ondas SST patentada produce');
swap('o consola.', 'o mesa.');
swap('recibir una señal de línea de una etapa y llenar una sala', 'recibir la señal de una etapa y llenar una sala');
// SEC11
swap('con 1.200W de potencia pico produce', 'con 1.200 W de potencia pico produce');
swap('controla hasta seis altavozes por Bluetooth', 'controla hasta seis altavoces por Bluetooth');
swap('es más ligero que la mayoría de rivales activos de 15 pulgadas y aguelta bien el trabajo móvil',
  'es más ligero que la mayoría de rivales activos de 15 pulgadas y aguanta bien el trabajo móvil');
// CONCLUSION + anchors
swap('los altavoces activos tienen más sentido', 'los altavoces activos son la opción lógica');
swap('son nuestras opciones por su configuración simple y gran sonido', 'son nuestras favoritas por su configuración sencilla y gran sonido');
swap('demuestran que el pasivo todavía tiene su lugar: cajas más ligeras que puedes alimentar desde un único amplificador de rack si ya cuentas con un equipo de amplificadores',
  'demuestran que lo pasivo todavía tiene su lugar: cajas sin electrónica que puedes alimentar desde un único amplificador en rack si ya tienes amplificación');
swap('Si estás construyendo una instalación fija grande o girando con un ingeniero de sonido dedicado',
  'Si estás montando una instalación fija grande o girando con un ingeniero de sonido dedicado');
swap('el Mackie SRT215 es nuestra opción activa destacada aquí', 'el Mackie SRT215 es nuestra favorita activa aquí');
swap('>Mejores Altavoces PA Activos para Sonido en Vivo</a>', '>Mejores altavoces PA de 12 y 15 pulgadas para directo</a>');
swap('>Mejores Mezcladores de Sonido en Vivo para Bandas y Eventos</a>', '>Mejores mezcladores de sonido para bandas y eventos</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
