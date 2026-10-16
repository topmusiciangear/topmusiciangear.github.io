const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'wireless-lapel-mics');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('¿Vale la pena el dinero extra del Rode wireless PRO?', '¿Vale la pena el dinero extra del Rode Wireless PRO?');
swap('¿Es el hollyland lark m2 un rey del presupuesto?', '¿Es el Hollyland Lark M2 el rey del presupuesto?');
swap('para la mayor parte del contenido de cámara hablando:', 'para la mayor parte del contenido hablando a cámara:');
swap('un nivel medio que añade fuerte ENC y grabación de respaldo', 'un nivel medio que añade cancelación de ruido ENC y grabación de respaldo');
swap('quieres un receptor con salida de 3,5mm y, idealmente, una salida de monitor de auriculares',
  'quieres un receptor con salida de 3,5 mm y, idealmente, una salida para monitorizar con auriculares');
swap('Tanto el DJI Mic 3, el Rode Wireless PRO como el Hollyland LARK MAX 2 graban',
  'Tanto el DJI Mic 3 como el Rode Wireless PRO y el Hollyland LARK MAX 2 graban');
swap('El Hollyland Lark Max respalda cada toma con grabación de almacenamiento a bordo a 48kHz/24-bit',
  'El Hollyland Lark Max respalda cada toma con grabación de almacenamiento a bordo a 48 kHz/24 bits');
swap('La transmisión de doble banda 2.4/5GHz mantiene el enlace hasta 400m con antiinterferencia',
  'La transmisión de doble banda 2,4/5 GHz mantiene el enlace hasta 400 m con antiinterferencia');
swap('y los transmisores son más corpulentos que los rivales de clip y olvídate como la Lark M2.',
  'y los transmisores son más corpulentos que los rivales de clip y olvídate como el Lark M2.');
swap('Los compradores lo valoran con 4.5/5 en 1,287 reseñas.', 'Los compradores lo valoran con 4,5/5 en 1.287 reseñas.');
swap('Con una valoración de 4.7/5 en 3,519 reseñas, suena mejor', 'Con una valoración de 4,7/5 en 3.519 reseñas, suena mejor');
swap('y el kit logra hasta 1000 pies (300m) de alcance.', 'y el kit logra hasta 300 m (1000 pies) de alcance.');
swap('El audio es 48kHz/24-bit con una relación señal-ruido de 70dB y un SPL máximo de 115dB',
  'El audio es 48 kHz/24 bits con una relación señal-ruido de 70 dB y un SPL máximo de 115 dB');
swap('cancelación activa de ruido de dos niveles y auto-limiting mantienen limpio', 'cancelación activa de ruido de dos niveles y limitador automático mantienen limpio');
swap('Graba a 48kHz/24-bit en lugar de 32-bit float , así que', 'Graba a 48 kHz/24 bits en lugar de 32 bits flotantes, así que');
swap('no se vende en EE.&nbsp;UU. Amazon y zZounds no lo tienen', 'no se vende en EE. UU. Amazon y zZounds no lo tienen');
swap('y el alcance llega a los 400m anunciados.', 'y el alcance llega a los 400 m anunciados.');
swap('El alcance llega a 820 pies (250m) en línea de vista', 'El alcance llega a 250 m (820 pies) en línea de vista');
swap('Graba a 48kHz/24-bit con tres niveles de cancelación', 'Graba a 48 kHz/24 bits con tres niveles de cancelación');
swap('que eliminan hasta 20dB de siseo de fondo', 'que eliminan hasta 20 dB de siseo de fondo');
swap('Con 8.5g por transmisor desaparece en el cuello', 'Con 8,5 g por transmisor desaparece en el cuello');
swap('Los 200m (650 pies) anunciados de alcance cubren', 'Los 200 m (650 pies) anunciados de alcance cubren');
swap('Los transmisores de 14g combinan un alcance de 340m (1115 pies)', 'Los transmisores de 14 g combinan un alcance de 340 m (1115 pies)');
swap('y y si solo te sirve un 32-bit float que no sature', 'y si solo te sirve un 32 bits flotantes que no sature');
swap('el DJI Mic Mini 2 es la mejora segura más económica. Si quieres la gama alta', 'el DJI Mic Mini 2 es la mejora segura más económica. Si quieres la gama alta');
swap('si quieres el auto-limiting de DJI y 400m de alcance en su lugar', 'si quieres el limitador automático de DJI y 400 m de alcance en su lugar');
swap('el Lark Max es el insignia con 14h de almacenamiento a bordo', 'el Lark Max es el insignia con 14 h de almacenamiento a bordo');
swap('>Rode Wireless PRO vs DJI Mic 3</a>', '>Rode Wireless PRO vs DJI Mic 3: comparativa</a>');
swap('>Mejores Mics para Creadores</a>', '>Mejores micrófonos económicos para creadores: $35 a $299</a>');
swap('>Mejor Micrófono para Podcast</a>', '>Mejores micrófonos para podcast: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
