const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'budget-pa-systems');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Después de años tocando en escenarios, sé qué sistemas PA ofrecen resultados profesionales', 'Después de años tocando en escenarios, está claro qué sistemas PA ofrecen resultados profesionales');
swap('Ya sea toques en bodas los fines de semana, seas una banda original de gira, o un equipo de alabanza, necesitas equipo que suene bien, sea confiable y quepa',
  'Ya toques en bodas los fines de semana, seas una banda original de gira o un equipo de alabanza, necesitas equipo que suene bien, sea fiable y quepa');
swap('El enfoque de esta guía queda en exactamente esos productos probados.', 'El enfoque de esta guía se centra en exactamente esos productos probados.');
swap('A $400 cada uno, entrega 1400W de potencia pico', 'A $400 cada uno, entrega 1.400 W de potencia pico');
swap('un driver de compresión de 1 pulgada, produciendo 132dB SPL máximo', 'un driver de compresión de 1 pulgada, produciendo 132 dB SPL máximo');
swap('un eliminador de feedback que funciona, ducking de música', 'un antiaceople que funciona, ducking de música');
swap('Entrega 2000W de potencia pico a través de un woofer de 12 pulgadas', 'Entrega 2.000 W de potencia pico a través de un woofer de 12 pulgadas');
swap('Con 2500W de potencia pico (1600W LF + 900W HF) y 132dB SPL máximo', 'Con 2.500 W de potencia pico (1.600 W LF + 900 W HF) y 132 dB SPL máximo');
swap('es el altavoz PA económico mejor valorado del mercado, y por buenas razones.', 'es el altavoz PA económico mejor valorado del mercado, y con razón.');
swap('Con una calificación de 4.8 estrellas de más de 12,000 reseñas, se ha convertido',
  'Con una calificación de 4,8 estrellas de más de 12.000 reseñas, se ha convertido');
swap('Entrega 2000W de potencia pico a través de un woofer personalizado', 'Entrega 2.000 W de potencia pico a través de un woofer personalizado');
swap('produciendo 131dB SPL con claridad notable.', 'produciendo 131 dB SPL con claridad notable.');
swap('Lo que distingue al DBR12 es el avanzado tuning FIR-X de Yamaha', 'Lo que distingue al DBR12 es el avanzado ajuste FIR-X de Yamaha');
swap('1300W de pico y 127 dB de un woofer a medida', '1.300 W de pico y 127 dB de un woofer a medida');
swap('afinados por DSP dbx DriveRack con supresión de feedback y EQ de 8 bandas', 'afinados por DSP dbx DriveRack con antiaceople y EQ de 8 bandas');
swap('Sirve como cuña a 55 grados cuando toca monitoraje.', 'Sirve como cuña a 55 grados cuando hace de monitor.');
swap('Cada banda necesita un sistema PA que suene genial, sea confiable y quepa', 'Cada banda necesita un sistema PA que suene genial, sea fiable y quepa');
swap('El Alto TS412 ofrece la mayor potencia por tu dinero con 2500W de salida.', 'El Alto TS412 ofrece la mayor potencia por tu dinero con 2.500 W de salida.');
swap('Y el nuevo JBL EON712 incluye un amplificador Clase D de 1300W, streaming Bluetooth',
  'Y el nuevo JBL EON712 incluye un amplificador en Clase D de 1.300 W, streaming Bluetooth');
swap('en una cuña compacta de 32 lb — la opción moderna más inteligente', 'en una cuña compacta de 14,5 kg (32 lb): la opción moderna más inteligente');
swap('>Mejores sistemas PA para Bandas</a>', '>Mejores sistemas PA para sonido en vivo: guía completa</a>');
swap('>Mejores Altavoces PA Activos para Sonido en Vivo</a>', '>Mejores altavoces PA de 12 y 15 pulgadas para directo</a>');
swap('>EV ZLX-12P-G2 vs QSC K12.2</a>', '>EV ZLX-12P-G2 vs QSC K12.2: ¿mejor PA activo?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
