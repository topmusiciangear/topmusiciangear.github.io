const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'stage-wireless');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('Los sistemas inalámbricos se han vuelto suficientemente confiables para uso profesional',
  'Los sistemas inalámbricos ya son lo bastante fiables para uso profesional');
swap('Estos son los mejores sistemas de micrófonos inalámbricos para presentaciones en vivo',
  'Estos son los mejores sistemas de micrófonos inalámbricos para directo');
// SEC0
swap('no es una sola pieza de equipo', 'no es un solo aparato');
swap('Juntos, reemplazan un cable XLR físico', 'Entre los tres reemplazan un cable XLR físico');
swap('y ofrecen el mejor alcance y penetración a través de paredes', 'con el mejor alcance y la mejor penetración entre paredes');
swap('pueden experimentar cortes en entornos RF congestionados', 'pueden sufrir cortes en entornos con RF congestionada');
swap('compara constantemente ambas señales y usa la más fuerte', 'el receptor compara constantemente ambas señales y usa la más fuerte');
swap('sin recepción con diversidad para presentaciones en vivo', 'sin recepción con diversidad para directo');
swap('considera mantenerte con la misma marca', 'considera seguir con la misma marca');
swap('evita necesitar múltiples receptores', 'evita tener que usar múltiples receptores');
swap('u ofrecer solo unos pocos canales — estos pueden volverse inutilizables si aparecen interferencias',
  'u ofrecer solo unos pocos canales, que pueden quedar inutilizables si aparecen interferencias');
// SEC1
swap('es un sonido probado como estándar broadcast con excelente rechazo a la retroalimentación',
  'es un sonido consagrado como estándar de broadcast con excelente rechazo al acople');
swap('así que puedes usar varios micrófonos a la vez en cualquier lugar sin coordinación manual',
  'así que puedes usar varios micrófonos a la vez en cualquier sitio sin coordinación manual');
swap('Es el mejor sistema inalámbrico digital relación calidad-precio del mercado',
  'Es el mejor sistema inalámbrico digital en relación calidad-precio del mercado');
// SEC2
swap('es el sistema inalámbrico más popular del planeta, y por buenas razones',
  'es el sistema inalámbrico más popular del planeta, y con razón');
// SEC3
swap('es lo que encontrarás detrás del escenario en giras y festivales importantes',
  'es lo que verás en giras y festivales importantes');
swap('es una clara mejora con respecto a la e825', 'es una clara mejora respecto a la e825');
swap('es lo que muchos artistas de Broadway usan', 'es la que usan muchos artistas de Broadway');
swap('Si giras profesionalmente, este es el sistema inalámbrico que vale la pena considerar',
  'Si giras como profesional, este es el sistema que merece la pena');
// SEC4
swap('y una petaca SK con lavalier ME 2', 'y una petaca SK con micro de solapa ME 2');
swap('te permite controlar la configuración desde cualquier lugar', 'te permite controlar la configuración desde cualquier sitio');
swap('este sistema supera cualquier otro en su clase', 'este sistema supera a cualquier otro en su clase');
swap('>guía del mejor micrófono</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
// SEC5 + heading
swap('Ve inalámbrico: Shure SM58 inalámbrico', 'Pásate al inalámbrico: Shure SM58 inalámbrico');
swap('te da el icónico sonido SM58 sin el cable', 'te da el mítico sonido SM58 sin el cable');
swap('Cuenta con transmisión inalámbrica UHF confiable', 'Cuenta con transmisión inalámbrica UHF fiable');
// SEC6
swap('hasta 14 horas de batería y un rendimiento UHF fiable', 'hasta 14 horas de autonomía y un rendimiento UHF fiable');
swap('La PG58 es una cápsula de SM58, así que estás pagando por la transmisión',
  'La PG58 no es una SM58, así que pagas por la transmisión');
// SEC7 + heading
swap('Shure BLX24R/SM58: los receptores van en el rack, no en la banda',
  'Shure BLX24R/SM58: los receptores van al rack, no al suelo del escenario');
swap('pueden manejar cuatro, ocho o doce canales desde una mesa en vez de llevar receptores en una caja',
  'pueden manejar cuatro, ocho o doce canales desde una mesa en vez de llevar receptores sueltos en una caja');
swap('La búsqueda automática de frecuencias mantiene el montaje corto', 'La búsqueda automática de frecuencias mantiene el montaje rápido');
swap('y la autonomía sigue llegando a 14 horas', 'y la autonomía sigue siendo de 14 horas');
swap('sin coordinación de frecuencias entre venues', 'sin coordinación de frecuencias entre salas');
// SEC8
swap('no una antena con dos antenas fingiendo ser dos', 'no una antena con dos varillas fingiendo ser dos');
swap('La cápsula e935 da claridad vocal de difusión', 'La cápsula e935 da claridad vocal con calidad broadcast');
swap('y con 849 $ suele salir más rentable', 'y con $849 suele salir más rentable');
// SEC9
swap('La UHF digital no es una palabra de marketing aquí', 'La UHF digital no es un argumento de marketing aquí');
swap('hacen que las cuentas de coordinación de frecuencias dejen de ser estresantes',
  'hacen que los cálculos de coordinación de frecuencias dejen de ser un dolor de cabeza');
swap('El montaje automático te pone en el aire en segundos', 'El montaje automático te deja listo en segundos');
swap('o un teatro que alquila en ciudades con mucho RF', 'o un teatro que hace bolos en ciudades con mucho RF');
swap('Con 699 $ por un solo sistema de mano es caro por canal', 'Con $699 por un solo sistema de mano, sale caro por canal');
// CONCLUSION + anchors
swap('el Sennheiser EW 100 G4-935 es la opción confiable', 'el Sennheiser EW 100 G4-935 es la opción fiable');
swap('>Mejores sistemas PA para Bandas</a>', '>Mejores sistemas PA para sonido en vivo: guía completa</a>');
swap('>Mejores Micrófonos de Escenario y Directo</a>', '>Mejores micrófonos de escenario y directo</a>');
swap('>Mejor Micrófono para Voces y Grabación Casera</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
