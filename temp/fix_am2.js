const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-amp-modelers');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('¿Es el headRush flex prime el mejor modelador con pantalla táctil?', '¿Es el HeadRush Flex Prime el mejor modelador con pantalla táctil?');
swap('¿Es el line 6 pOD go el mejor modelador portátil para gigs?', '¿Es el Line 6 POD Go el mejor modelador portátil para gigs?');
swap('¿Es el line 6 hX stomp el mejor modelador de amplificador en general?', '¿Es el Line 6 HX Stomp el mejor modelador de amplificador en general?');
swap('hasta el HX Stomp que se volvió un básico de estudio', 'hasta el HX Stomp que se volvió un básico de estudio.');
swap('Elige entre captures y modelado.', 'Elige entre capturas y modelado.');
swap('Un pedal basado en captures como el TONEX ONE+ carga', 'Un pedal basado en capturas como el TONEX ONE+ carga');
swap('y cuántas perillas quieres en el escenario.', 'y cuántas ruedas quieres en el escenario.');
swap('Tone Models compartidos por la comunidad ToneNET, muchos gratuito, así que', 'Tone Models compartidos por la comunidad ToneNET, muchos gratuitos, así que');
swap('valorado con 4.6/5 en más de 2,000 reseñas.', 'valorado con 4,6/5 en más de 2.000 reseñas.');
swap('valorado con 4.5/5 en más de 1,400 reseñas.', 'valorado con 4,5/5 en más de 1.400 reseñas.');
swap('En lugar de desplazarte por menús con perillas, arrastras', 'En lugar de desplazarte por menús con ruedas, arrastras');
swap('si estás acostumbrado a perillas e interruptores, y el sonido', 'si estás acostumbrado a ruedas e interruptores, y el sonido');
swap('valorado con 4.6/5 en casi 1,000 reseñas.', 'valorado con 4,6/5 en casi 1.000 reseñas.');
swap('el HX Stomp añade potencia un precio mayor.', 'el HX Stomp añade potencia a un precio mayor.');
swap('valorado con 4.7/5 en más de 3,000 reseñas.', 'valorado con 4,7/5 en más de 3.000 reseñas.');
swap('El Line 6 HX Stomp es mi mejor elección como mejor modelador', 'El Line 6 HX Stomp es la mejor elección como mejor modelador');
swap('El HeadRush Flex Prime es la mejor opción experiencia táctil,', 'El HeadRush Flex Prime es la mejor opción de experiencia táctil,');
swap('>ME-90 vs Flex Prime</a>', '>Boss ME-90 vs HeadRush Flex Prime: comparativa</a>');
swap('>Mejores Amplificadores</a>', '>Mejores amplificadores de guitarra y bajo: guía completa</a>');
swap('>Mejores Pedales</a>', '>Mejores pedales de efectos para guitarra: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
