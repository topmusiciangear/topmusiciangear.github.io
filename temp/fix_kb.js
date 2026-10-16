const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-keyboard');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('desglosamos los mejores teclados electrónicos para músicos en 2026 según las necesidades específicas — desde pianos de escenario profesionales hasta controladores MIDI compactos y teclados electrónicos independientes con sonidos integrados',
  'desglosamos los mejores teclados electrónicos para músicos según las necesidades específicas: desde pianos de escenario profesionales hasta controladores MIDI compactos y teclados electrónicos independientes con sonidos integrados.');
swap('El Yamaha utiliza una acción GHS con peso que se siente como un piano acústico real', 'El Yamaha utiliza una acción GHC con peso que se siente como un piano acústico real');
swap('La Roland FP-30X ofrece la sensación de teclado más sensible', 'El Roland FP-30X ofrece la sensación de teclado más sensible');
swap('61 teclas sensibles a la velocidad con aftertouch polifónico, pantalla OLED, pads, knobs y faders para control completo del DAW',
  '61 teclas sensibles a la velocidad con aftertouch polifónico, pantalla OLED, pads, ruedas y faders para control completo del DAW');
swap('el Arturia KeyLab Essential 61 MkIII ofrece el mejor equilibrio de teclas, pads y perillas para producción musical',
  'el Arturia KeyLab Essential 61 MkIII ofrece el mejor equilibrio de teclas, pads y ruedas para producción musical');
swap('49 teclas semi-ponderadas, 16 pads FSR con aftertouch polifónico, 8 encoders, 9 faders',
  '49 teclas semicontrapesadas, 16 pads FSR con aftertouch polifónico, 8 codificadores, 9 faders');
swap('La pantalla OLED y los encoders infinitos te dan control táctil', 'La pantalla OLED y los codificadores infinitos te dan control táctil');
swap('y más de 1,000 sonidos incluidos de AIR, Akai Pro y Moog', 'y más de 1.000 sonidos incluidos de AIR, Akai Pro y Moog');
swap('Por alrededor de $99-130, este controlador mini cabe', 'Por alrededor de $99–$130, este controlador mini cabe');
swap('16 pads FSR sensibles a la velocidad con aftertouch polifónico, 8 encoders, pantalla OLED e integración profunda',
  '16 pads FSR sensibles a la velocidad con aftertouch polifónico, 8 codificadores, pantalla OLED e integración profunda');
swap('>Nord Stage 4 vs Montage M8x</a>', '>Nord Stage 4 vs Montage M8x: duelo de teclados insignia</a>');
swap('>Mejores Pianos Digitales</a>', '>Mejores pianos digitales para hogar y estudio</a>');
swap('>Mejores Sintetizadores</a>', '>Mejores sintetizadores para producción musical</a>');
swap('>Mejores Cajas de Ritmos y Producción de Beats</a>', '>Mejores cajas de ritmos y grooveboxes: guía completa</a>');
swap('>Mejores sintetizadores</a>', '>Mejores sintetizadores para producción musical</a>');
swap('>Mejores Máquinas de Batería</a>', '>Mejores cajas de ritmos y grooveboxes: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
