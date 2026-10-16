const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'live-sound-pa');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('Los sistemas PA proyectan sonido a una audiencia', 'Los sistemas PA llevan sonido a una audiencia');
// SEC0
swap('solo conecta y mezcla. Sin racks', 'solo enchufa y mezcla. Sin racks');
swap('El JBL VTX A12 ($3.000/ea) con un amplificador Crown', 'El JBL VTX A12 ($3.000 por unidad) con un amplificador Crown');
// SEC1
swap('Los sistemas PA activos (con amplificador) tienen amplificadores integrados: conecta y reproduce',
  'Los sistemas PA activos tienen amplificadores integrados: enchufa y listo');
swap('La desventaja es el peso: el amplificador añade volumen y si falla', 'La desventaja es el peso: el amplificador añade peso y bulto, y si falla');
swap('pero debes hacer coincidir bien la impedancia y la potencia', 'pero debes cuadrar bien la impedancia y la potencia');
// SEC2 + heading
swap('Colocación de Altavoces y acústica de la sala', 'Colocación de altavoces y acústica de la sala');
swap('Incluso el mejor PA suena mal en un mal salón', 'Incluso el mejor PA suena mal en una mala sala');
swap('Usa un patrón de superposición de 1/3 para múltiples altavoces (cada uno cubre 1/3 del ancho del salón)',
  'Usa un patrón de superposición de 1/3 para múltiples altavoces (cada uno cubre 1/3 del ancho de la sala)');
swap('si los tweeters apuntan por encima de las cabezas, la parte de detras del salón escucha más graves que la de adelante',
  'si los tweeters apuntan por encima de las cabezas, la parte de atrás de la sala escucha más graves que la de adelante');
swap('Colócalos en el piso, cerca del frente del escenario, o usa un arreglo cardioid para reducir el derrame hacia el escenario',
  'Colócalos en el suelo, cerca del frente del escenario, o usa un arreglo cardioide para que suene menos hacia el escenario');
swap('Recorre el salón mientras reproduces tu material más fuerte y más suave',
  'Recorre la sala mientras reproduces tu material más alto y más bajo');
// SEC3
swap('Los escenarios pequeños se vuelven junglas de cable cuando se multiplican mesa, cajas y monitores',
  'Los escenarios pequeños se convierten en junglas de cable cuando se multiplican mesa, cajas y monitores');
swap('El PRX ONE pliega el equipo en una columna con sub de 12 pulgadas y seis drivers de 1,5 pulgadas en array, movida por 2000 vatios de pico hacia 131 dB',
  'El PRX ONE concentra el equipo en una columna con sub de 12 pulgadas y seis drivers de 1,5 pulgadas en array, alimentada por 2.000 vatios de pico hasta 131 dB');
swap('La respuesta abarca 38 Hz a 20 kHz en 140 por 40 grados', 'La respuesta abarca 38 Hz a 20 kHz con cobertura de 140 por 40 grados');
swap('El sistema conviene a bandas y DJs que se autoamplifican en conciertos pequeños donde el montaje rápido manda sobre la escala de line array',
  'Es el sistema para bandas y DJs que se autoamplifican en conciertos pequeños, donde el montaje rápido importa más que la escala de line array');
swap('56.6 libras piden lifts a dos manos y hueco en el coche, así que los solistas que suben escaleras quizá prefieran repartos más ligeros pese a la promesa elegante de columna única',
  'Sus 25,7 kg piden levantarlo entre dos personas y hueco en el coche, así que los solistas que suben escaleras quizá prefieran equipos más ligeros a pesar de la promesa elegante de columna única');
// SEC4
swap('Las voces al aire libre se pierden cuando las cajas comprimen pronto y las bocinas chillan bajo esfuerzo',
  'Las voces al aire libre se pierden cuando las cajas se quedan sin fuelle pronto y las bocinas rallan bajo esfuerzo');
swap('El DXR12mkII mantiene la compostura como altavoz activo de 12 pulgadas con motor de 1,75 pulgadas',
  'El DXR12mkII aguanta el tipo como altavoz activo de 12 pulgadas con motor de 1,75 pulgadas');
swap('La cobertura abre en 90 por 60 grados, la respuesta alcanza 52 Hz a 20 kHz, el pico roza 132 dB, y los presets DSP con voces D-XR adaptan la caja entre poste, suelo y monitor',
  'La cobertura es de 90 por 60 grados, la respuesta alcanza 52 Hz a 20 kHz, el pico llega a 132 dB, y los presets DSP adaptan la caja entre poste, suelo y monitor');
swap('El recinto se gana el jornal con bandas potentes y eventos al aire libre que piden alcance y margen sin aspereza',
  'La caja se gana el sueldo con bandas potentes y eventos al aire libre que piden alcance y margen sin aspereza');
swap('La factura del músculo es el tamaño: 41 libras y huella completa de 12 pulgadas complican coches compactos y rincones de café, donde hermanas de 10 pulgadas entran con menos negociación',
  'El precio del músculo es el tamaño: 18,6 kg y tamaño completo de 12 pulgadas complican coches compactos y rincones de café, donde sus hermanas de 10 pulgadas entran con menos problemas');
// SEC5 + heading
swap('JBL EON712: mezcladora, EQ y eliminador de feedback en una caja', 'JBL EON712: mezcladora, EQ y antiaceople en una caja');
swap('Linaje EON probado con modales DSP modernos', 'Estirpe EON probada con prestaciones DSP modernas');
swap('1300W de pico empujando un woofer a medida de 12 pulgadas hasta 127 dB', '1.300 W de pico moviendo un woofer a medida de 12 pulgadas hasta 127 dB');
swap('Reemplaza una sorprendente cantidad de cacharros: mezclador, EQ, mata-feedbacks y fuente de playback en una caja de 14,5 kg',
  'Reemplaza una sorprendente cantidad de cacharros: mezclador, EQ, antiaceople y fuente de playback en una caja de 14,5 kg');
// SEC6
swap('Cuando la sala pregunta qué traes, K12.2 termina la conversación', 'Cuando en la sala preguntan qué traes, el K12.2 termina la conversación');
swap('la referencia que bandas, DJs y rentadoras confían hace una década', 'la referencia en la que bandas, DJs y rentadoras confían hace una década');
swap('Pagas la insignia, no hay batería, y las escenas DSP hondas se esconden en menús',
  'Se paga la marca, sin opción a batería, y las escenas DSP profundas se esconden en menús');
swap('Para pros que facturan por fecha, ningún altavoz conserva valor como él',
  'Para profesionales que viven de los bolos, ningún altavoz mantiene el valor como él');
// SEC7
swap('Dos mil quinientos vatios y 132 dB por el precio de una cena', 'Dos mil quinientos vatios y 132 dB por cuatro duros');
swap('El TS412 junta streaming Bluetooth y app con mezclador de 3 canales y frío Class-D sin ventilador — la caja más fuerte por dólar en 12 pulgadas',
  'El TS412 junta streaming Bluetooth y app con mezclador de 3 canales y etapa en Clase D que no necesita ventilador: la caja con mejor relación potencia-precio en 12 pulgadas');
swap('La caja es plástico moldeado, hay una sola salida XLR, y el EQ personalizado pide la app',
  'La caja es de plástico moldeado, hay una sola salida XLR, y el EQ personalizado requiere la app');
swap('Para bandas emergentes que cuentan cada billete, nada lo toca', 'Para bandas emergentes que miran cada euro, nada lo supera');
// SEC8 + heading
swap('Sin enchufe, sin problema: EV EVERSE 12', 'Sin enchufe, sin problema: EV EVERSE 12');
swap('Doce horas de batería, 126 dB y mezclador completo donde no llega ningún cable', 'Doce horas de batería, 126 dB y mezclador completo lejos de cualquier enchufe');
swap('El EVERSE 12 corre bodas, calle y ceremonias con su pack de litio, con phantom, anti-feedback y app a bordo',
  'El EVERSE 12 cubre bodas, calle y ceremonias con su pack de litio, con phantom, antiaceople e integrados');
swap('Cuatrocientos vatios no cubren salas grandes, la libertad a batería cuesta premium, y los graves hondos piden sub',
  'Cuatrocientos vatios no cubren salas grandes, la libertad a batería se paga cara, y los graves hondos necesitan sub');
// SEC9 + heading
swap('EV ZLX-12P-G2: el caballo de trabajo ligero con DSP', 'EV ZLX-12P-G2: el todoterreno ligero con DSP');
swap('Con 32,67 lb (14,82 kg), es la caja activa más ligera de esta guía, pero el amplificador Clase-D de 1000W que mueve un woofer',
  'Con 14,82 kg (32,67 lb), es la caja activa más ligera de esta guía, pero el amplificador en Clase D de 1.000 W que alimenta un woofer');
swap('El patrón de cobertura de 90 x 60 grados maneja voz y música con igual solvencia', 'El patrón de cobertura de 90 x 60 grados resuelve voz y música con igual solvencia');
swap('El panel de entradas — XLR mic/línea, RCA y Bluetooth — cubre fuentes con cable y sin adaptadores',
  'El panel de entradas (XLR micro/línea, RCA y Bluetooth) cubre fuentes con cable e inalámbricas');
swap('El contrapunto es el acabado y el detalle en agudos', 'La contrapartida es el acabado y el detalle en agudos');
// SEC10
swap('El ICOA 12 A BT es el único altavoz coaxial de esta guía, y eso cambia el juego de la cobertura',
  'El ICOA 12 A BT es el único altavoz coaxial de esta guía, y eso cambia las reglas de la cobertura');
swap('El woofer con carga de bocina y el cuerno CD optimizado BEM giratorio permiten usar el recinto en vertical',
  'El woofer con carga de bocina y la trompeta CD optimizada BEM giratoria permiten usar el recinto en vertical');
swap('300W RMS y 1.200W de pico producen 126 dB de SPL', '300 W RMS y 1.200 W de pico producen 126 dB de SPL');
swap('El Bluetooth 4,0 más dos entradas mic/línea y una salida de mezlo lo convierten en un pequeño PA autónomo',
  'El Bluetooth 4.0 más dos entradas micro/línea y una salida de mezcla lo convierten en un pequeño PA autónomo');
swap('Con 44 lb (19,95 kg) es uno de los activos de 12 pulgadas más pesados', 'Con 19,95 kg (44 lb) es uno de los activos de 12 pulgadas más pesados');
swap('Pero para solistas, escuelas y casas de culto que necesitan un altavoz que haga de PA y monitor sin decisiones de configuración, el diseño coaxial es genuinamente ingenioso',
  'Pero para solistas, escuelas y casas de culto que necesitan un altavoz que haga de PA y monitor sin complicaciones, el diseño coaxial es genuinamente ingenioso');
// SEC11
swap('1100W de potencia pico moviendo un subwoofer de 12 pulgadas', '1.100 W de potencia pico alimentando un subwoofer de 12 pulgadas');
swap('y un array lineal de 10 drivers da a las salas pequeñas la proyección y claridad de un sistema apilado sin el camión lleno de equipo',
  'y un array lineal de 10 drivers da a las salas pequeñas la proyección y claridad de un sistema apilado sin necesidad de furgoneta');
swap('El mezclador digital integrado de 5 canales con efectos SPX y EQ de una perilla por canal significa que un cantautor puede enchufar, tocar un perilla y tocar',
  'El mezclador digital integrado de 5 canales con efectos SPX y EQ de una rueda por canal significa que un cantautor puede enchufar, girar una rueda y tocar');
swap('La conectividad Bluetooth gestiona pistas de acompañamiento y reproducción de voz', 'La conectividad Bluetooth mueve pistas de acompañamiento y reproducción de voz');
swap('y el sistema entero pesa menos de 18 kg — carga realmente de una sola persona',
  'y el sistema entero pesa menos de 18 kg: peso real de una sola persona');
// CONCLUSION + anchors
swap('>Mejores altavoces PA</a>', '>Mejores altavoces PA de 12 y 15 pulgadas para directo</a>');
swap('>Mejores mezcladoras para sonido en vivo</a>', '>Mejores mezcladores de sonido para bandas y eventos</a>');
swap('>PA activo vs pasivo</a>', '>Altavoces activos vs pasivos: ¿cuál es mejor para ti?</a>');
swap('>mejores subwoofers en vivo</a>', '>Mejores subwoofers activos para bandas en vivo</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
