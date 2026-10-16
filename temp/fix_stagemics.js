const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'stage-mics');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('mantienen la voz cortando la mezcla noche tras noche', 'mantienen la voz por encima de la mezcla noche tras noche');
// SEC0
swap('ayudan a que tu voz corte sin convertir el EQ del canal en un campo de batalla',
  'ayudan a que tu voz destaque sin que el EQ del canal se convierta en un campo de batalla');
// SEC1
swap('valorado por su fiabilidad y rechazo a la realimentación', 'valorado por su fiabilidad y su rechazo de la realimentación');
swap('Su patrón cardioide rechaza la retroalimentación de los monitores de piso que tienes detrás',
  'Su patrón cardioide rechaza la retroalimentación de los monitores de suelo que tienes detrás');
swap('y su respuesta adaptada de 50Hz–15kHz con pico de presencia', 'y su respuesta a medida de 50 Hz–15 kHz con pico de presencia');
swap('y su salida de 150Ω funcióna con cualquier mesa', 'y su salida de 150 Ω funciona con cualquier mesa');
// SEC2 + heading
swap('¿Es el Shure beta 58a el mejor micrófono de escenario para voces?', '¿Es el Shure Beta 58A el mejor micrófono de escenario para voces?');
swap('El Beta 58A es el SM58 con el volumen y el rechazo subidos', 'El Beta 58A es el SM58 con más salida y más rechazo');
swap('así que puedes subir más nivel de monitor antes de que empiece a aullar', 'así que puedes subir más los monitores antes de que empiece a aullar');
// SEC3
swap('para cantantes que quieren más presencia que un SM58', 'para cantantes que buscan más presencia que la de un SM58');
swap('Sennheiser lo construyó totalmente en metal — la cápsula amortiguada', 'Sennheiser lo construyó íntegramente metálico: la cápsula amortiguada');
swap('y el cuerpo metálico aguanta la carretera', 'y el cuerpo metálico aguanta la carretera sin quejarse');
swap('y su salida de 350Ω se acopla limpiamente con cualquier mesa', 'y su salida de 350 Ω encaja limpiamente con cualquier mesa');
// SEC4
swap('El e945 es el especialista de vocalista principal que corta las mezclas más densas',
  'El e945 es el especialista para voz principal que atraviesa las mezclas más densas');
swap('Su patrón supercardioide se enfoca con precisión en tu voz', 'Su patrón supercardioide apunta con precisión a tu voz');
swap('mientras que un realce de presencia deliberado entre 2,5kHz y 6kHz añade claridad',
  'mientras que un realce de presencia deliberado entre 2,5 kHz y 6 kHz añade claridad');
swap('La respuesta de 40Hz–18kHz es suave y llena, con salida de 2.0 mV/Pa', 'La respuesta de 40 Hz–18 kHz es suave y llena, con salida de 2,0 mV/Pa');
swap('La cápsula amortiguada y la bobina de compensación de zumbido lo hacen inmune al ruido de manejo y la interferencia eléctrica',
  'La cápsula amortiguada y la bobina de compensación de zumbido lo hacen insensible al ruido de manejo y a las interferencias eléctricas');
swap('Es la misma herencia de cápsula usada en los sistemas inalámbricos profesionales de Sennheiser',
  'Es el mismo linaje de cápsula de los sistemas inalámbricos profesionales de Sennheiser');
// SEC5 + heading
swap('¿Es el Telefunken m80 el mejor micrófono de escenario premium?', '¿Es el Telefunken M80 el mejor micrófono de escenario premium?');
swap('El M80 te da detalle tipo condensador en un dinámico que aguanta un escenario ruidoso', 'El M80 ofrece detalle tipo condensador en un dinámico que aguanta un escenario ruidoso');
swap('Ensamblado a mano en USA con transformador T80', 'Ensamblado a mano en EE. UU. con transformador T80');
swap('ofrece una respuesta de 50Hz–18kHz con claridad excepcional', 'ofrece una respuesta de 50 Hz–18 kHz con claridad excepcional');
swap('dan un tono lleno y presente que se asienta maravillosamente frente a la banda',
  'dan un tono lleno y presente que se coloca maravillosamente frente a la banda');
swap('y además funcióna de maravilla en caja y amplificadores de guitarra', 'y además funciona de maravilla en caja y amplificadores de guitarra');
swap('el clip y la funda con cremallera incluidos lo tienen listo para volar', 'el clip y la funda con cremallera incluidos lo dejan listo para volar');
swap('vale cada dólar', 'vale cada céntimo');
// SEC6 + heading
swap('¿Es el AKG d5 el mejor micrófono de escenario económico?', '¿Es el AKG D5 el mejor micrófono de escenario económico?');
swap('La respuesta de 70Hz–20kHz es clara y al frente, con salida de 2.6 mV/Pa', 'La respuesta de 70 Hz–20 kHz es clara y al frente, con salida de 2,6 mV/Pa');
swap('Un doble montaje antivibración elimina el ruido de manejo, y la pantalla antiviento integrada reduce pops y plosivas',
  'Un doble montaje antivibración elimina el ruido de manejo, y la pantalla antiviento integrada reduce el viento y las plosivas');
swap('El cuerpo de fundición y la rejilla de malla de alambre de acero están hechos para la carretera',
  'El cuerpo de fundición y la rejilla de malla de alambre de acero están pensados para la carretera');
swap('la elección económica clásica que sigue funciónando cuando los micros baratos de marcas desconocidas ya se han desarmado',
  'la elección económica clásica que sigue funcionando cuando los micros baratos de marcas desconocidas ya se han deshecho');
// SEC7 + heading
swap('¿Es el audix oM7 el mejor micrófono para escenarios ruidosos?', '¿Es el Audix OM7 el mejor micrófono para escenarios ruidosos?');
swap('Su patrón hipercardioide es la captación más cerrada de cualquier micro vocal del mercado',
  'Su patrón hipercardioide es el más cerrado de cualquier micro vocal del mercado');
swap('También es el micro más a prueba de \'cupping\'', 'También es el micro más resistente al cupping');
swap('Audix mantuvo deliberadamente su salida baja (0.8 mV/Pa, unos 8-10 dB por debajo de los dinámicos típicos) para que actúe como pad natural en la cápsula',
  'Audix dejó deliberadamente su salida baja (0,8 mV/Pa, unos 8-10 dB por debajo de los dinámicos típicos) para que haga de pad natural en la cápsula');
// SEC8 + heading
swap('¿Es el electro-voice ND86 el mejor micrófono para grandes recintos?', '¿Es el Electro-Voice ND86 el mejor micrófono para grandes recintos?');
swap('El ND86 está diseñado específicamente para controlar el sonido en los recintos más grandes',
  'El ND86 está diseñado específicamente para dominar el sonido en los recintos más grandes');
swap('entrega un tono vocal presente, suave y detallado con excelente control acústico — incluso en arenas, y su patrón supercardioide aísla la voz del lavado del escenario mejor que un cardioide',
  'entrega un tono vocal presente, suave y detallado con excelente comportamiento acústico: incluso en arenas, su patrón supercardioide aísla la voz de la mezcla del escenario mejor que un cardioide');
// SEC9
swap('En el escenario, el SM57 es el jugador utilitario definitivo', 'En el escenario, el SM57 es el todoterreno definitivo');
swap('Ponlos en gabinetes de guitarra para capturar el rugido de un amplificador al máximo',
  'Colócalos en pantallas de guitarra para capturar el rugido de un amplificador al máximo');
swap('Sujétalos en cajas donde manejan el pico transitorio extremo de un rim shot sin distorsionar',
  'Móntalos en cajas, donde aguantan el pico transitorio extremo de un rim shot sin distorsionar');
swap('Apúntalos a secciones de metales donde su rango medio adaptado atraviesa toda una big band',
  'Apúntalos a secciones de metales, donde su rango medio a medida atraviesa toda una big band');
swap('El patrón cardioide cerrado y el pico de presencia alrededor de 5kHz entregan', 'El patrón cardioide estrecho y el pico de presencia alrededor de 5 kHz entregan');
swap('Su respuesta de 40Hz–15kHz con salida de 1.6 mV/Pa e impedancia de 150Ω es la más flexible de cualquier micro de esta guía',
  'Su respuesta de 40 Hz–15 kHz con salida de 1,6 mV/Pa e impedancia de 150 Ω es la más flexible de esta guía');
swap('Tener varios compensa: cuatro en el equipo de directo cubren casi cualquier duda', 'Tener varios sale a cuenta: cuatro en el equipo de directo cubren casi cualquier duda');
// SEC10
swap('El Sennheiser EW-D corta el cable sin los dolores de cabeza del inalámbrico analógico',
  'El Sennheiser EW-D te libra del cable sin los dolores de cabeza del inalámbrico analógico');
swap('Este set dual combina un receptor EW-D EM con mano SKM-S de cápsula dinámica MMD 835 y petaca SK con lavalier ME 2',
  'Este set dual combina un receptor EW-D EM con transmisor de mano SKM-S de cápsula dinámica MMD 835 y petaca SK con lavalier ME 2');
swap('La transmisión digital entrega audio de 20 Hz a 20 kHz', 'La transmisión digital ofrece audio de 20 Hz a 20 kHz');
swap('y nunca ajustas ganancia en transmisores', 'sin tocar ganancias en los transmisores');
swap('cuesta múltiplos de un equipo SM58 con cable', 'cuesta varias veces lo de un equipo SM58 con cable');
// CONCLUSION + anchors
swap('Si subes mucho los monitores o cantas en escenarios grandes, sube a los supercardioides',
  'Si les das mucha caña a los monitores o cantas en escenarios grandes, pasa a los supercardioides');
swap('¿Sin cables? El Sennheiser EW-D te da mano y lavalier con claridad digital y sin ajustar ganancias',
  '¿Sin cables? El Sennheiser EW-D te da transmisor de mano y lavalier con claridad digital y sin ajustar ganancias');
swap('>Mejor Micrófono para Voces y Grabación Casera</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
swap('>Mejores sistemas PA para Bandas</a>', '>Mejores sistemas PA para sonido en vivo: guía completa</a>');
swap('>Mejor Micrófono Dinámico para Grabar Amplificadores de Guitarra en Casa</a>', '>Mejores micrófonos dinámicos para grabar amplis en casa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('restos "funcióna": ' + (JSON.stringify(g.find(x => x.id === 'stage-mics')).match(/funcióna/g) || []).length);
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
