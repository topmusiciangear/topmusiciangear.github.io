const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-monitors-for-small-rooms');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO + typos globales de la guia
swap('y luego recomienda los monitores que mejor funciónan en espacios reducidos', 'y luego recomienda los monitores que mejor funcionan en espacios reducidos');
swap('Por qué funcióna en salas pequeñas', 'Por qué funciona en salas pequeñas');
swap('menos de 14 m2) tienen problemas', 'menos de 14 m²) tienen problemas');
// SEC0
swap('suenan retumbantes e imprecisos cuando se colocan cerca de paredes', 'retumban y suenan imprecisos cuando se colocan cerca de paredes');
swap('te permiten colocarlos cerca de la pared sin respuesta de graves falsa', 'te permiten colocarlos cerca de la pared sin falsos graves');
// SEC1
swap('para que tus mezclas se traduzcan bien — el monitor honesto', 'para que tus mezclas funcionen en todas partes: el monitor honesto');
swap('expone asperezas y embarramiento que los monitores complacientes esconden', 'expone asperezas y embarrado que los monitores aduladores esconden');
swap('bi-amplificados a 70W (45W + 25W)', 'biamplificados a 70 W (45 W + 25 W)');
swap('y los interruptores traseros ROOM CONTROL (-2/-4 dB bajo 500 Hz)', 'y los interruptores traseros ROOM CONTROL (-2/-4 dB por debajo de 500 Hz)');
swap('Firma sonora: Plana, directa y honesta hasta el extremo', 'Firma sonora: plana, directa y honesta hasta el límite');
swap('Los amantes de los graves notarán el suelo de 54 Hz', 'Los amantes de los graves notarán el corte en 54 Hz');
swap('es el estándar de referencia contra el que debería medirse toda sala pequeña', 'es el estándar de referencia con el que debería compararse todo monitor de sala pequeña');
// SEC2
swap('los convierten en los monitores más precisos por el par, y en la mejor relación calidad-precio', 'los convierten en los monitores más precisos de su precio, con la mejor relación calidad-precio');
swap('ofrece un punto óptimo amplio —no necesitas sentarte', 'ofrece un punto ideal amplio: no necesitas sentarte');
swap('Es crítico en salas pequeñas donde tu posición de escucha a menudo está comprometida', 'Es clave en salas pequeñas, donde tu posición de escucha a menudo no es la ideal');
swap('El puerto trasero significa que necesitan estar a 15-30 cm de la pared', 'El puerto trasero obliga a separarlos 15-30 cm de la pared');
swap('los 305P se atenúan naturalmente por debajo de 50Hz, lo que en realidad es beneficioso', 'los 305P decaen de forma natural por debajo de 50 Hz, lo cual es una ventaja');
swap('Limitaciones: Con 5 pulgadas, el woofer es pequeño', 'Limitaciones: con sus 5 pulgadas, el woofer es pequeño');
swap('consulta nuestra guía de los mejores auriculares de estudio .', 'consulta nuestra guía de los mejores auriculares de estudio.');
// SEC3
swap('Su puerto frontal de bajo ruido, el 3-D Imaging Waveguide', 'Su puerto frontal silencioso, el 3-D Imaging Waveguide');
swap('y el 3-D Imaging Waveguide ofrece un punto óptimo amplio y tolerante', 'y el 3-D Imaging Waveguide ofrece un punto ideal amplio y permisivo');
swap('amplificación Clase-D de 80W (40W + 40W) y 115 dB de salida pico', 'amplificación en Clase D de 80 W (40 W + 40 W) y 115 dB de salida pico');
swap('El woofer de 6,5 pulgadas excava notablemente más profundo que el de 5 pulgadas del 305P', 'El woofer de 6,5 pulgadas baja notablemente más que el de 5 pulgadas del 305P');
swap('Con 4.7 estrellas en más de 3,890 reseñas, es la opción de valor de 6,5 pulgadas más popular del mercado',
  'Con 4,7 estrellas en más de 3.890 reseñas, es la opción con mejor relación calidad-precio de 6,5 pulgadas del mercado');
// SEC4 + heading
swap('Adam d3v: el mejor monitor de escritorio', 'ADAM D3V: el mejor monitor de escritorio');
swap('El ADAM Audio D3V mete el característico tweeter de cinta D-ART de ADAM y un woofer de aluminio de 3,5 pulgadas con doble radiador pasivo en un par que cabe en un configuración de laptop',
  'El ADAM Audio D3V reúne el característico tweeter de cinta D-ART de ADAM y un woofer de aluminio de 3,5 pulgadas con doble radiador pasivo en un par que cabe en una configuración de portátil');
swap('Los 240W de amplificación total pico y la compensación DSP de sala integrada ofrecen una respuesta de 45Hz-23,2kHz con 96dB de SPL máximo',
  'Los 240 W de amplificación total de pico y la compensación DSP de sala integrada ofrecen una respuesta de 45 Hz-23,2 kHz con 96 dB de SPL máximo');
swap('El USB-C se conecta directamente al laptop, sin interfaz — con entradas TRS dobles y salida de auriculares al frente',
  'El USB-C se conecta directamente al portátil, sin interfaz, con entradas TRS dobles y salida de auriculares en el frontal');
// SEC5 + heading
swap('Kali lP-uNF: el mejor monitor para colocar cerca de la pared', 'Kali LP-UNF: el mejor monitor para colocar cerca de la pared');
swap('es un monitor nearfield compacto construido para las dos paredes que tiene toda sala pequeña: la tuya y tu pantalla',
  'es un monitor nearfield compacto construido para las dos paredes que hay en toda sala pequeña: la de detrás y la de tu pantalla');
swap('Un woofer de 4,5 pulgadas de alta excursión y un tweeter de cúpula textil de 1 pulgada viven en un gabinete con puerto frontal',
  'Un woofer de 4,5 pulgadas de alta excursión y un tweeter de cúpula textil de 1 pulgada van montados en un gabinete con puerto frontal');
swap('con una guía de onda 3-D que amplía el punto óptimo a corta distancia', 'con una guía de onda 3-D que amplía el punto ideal a corta distancia');
swap('el puerto frontal permite colocarlo cerca de la pared sin graves falsos', 'el puerto frontal permite colocarlo cerca de la pared sin falsos graves');
swap('La respuesta de 39Hz-25kHz (-10 dB) con 103dB de SPL máximo viene de 160W Clase-D por par',
  'La respuesta de 39 Hz-25 kHz (-10 dB) con 103 dB de SPL máximo viene de 160 W en Clase D por par');
swap('y la respuesta de ±3 dB empieza en 54 Hz, así que el sub-bass profundo sigue necesitando un sub',
  'y la respuesta de ±3 dB empieza en 54 Hz, así que los subgraves profundos siguen necesitando un sub');
swap('El par cuesta menos que la mayor parte de la competencia compacta', 'El par cuesta menos que casi toda la competencia compacta');
// SEC6 + heading
swap('ILoud micro monitor pro: el sistema ultracompacto', 'iLoud Micro Monitor Pro: el sistema ultracompacto');
swap('El iLoud Micro Monitor Pro es el sistema de referencia más pequeño de esta guía', 'El iLoud Micro Monitor Pro es el equipo de referencia más pequeño de esta guía');
swap('A pesar del tamaño, llega a 60Hz a 107dB de SPL, así que escuchas los graves en vez de adivinarlos',
  'A pesar del tamaño, llega a 60 Hz con 107 dB de SPL, así que escuchas los graves en vez de adivinarlos');
swap('El nuevo sistema de corrección de sala ARC 4 sintoniza el par a tu escritorio', 'El nuevo sistema de corrección de sala ARC 4 calibra el par a tu escritorio');
// SEC7
swap('El Neumann KH 80 DSP es el monitor más inteligente de esta guía — un nearfield de 4 pulgadas con el mismo waveguide MMD',
  'El Neumann KH 80 DSP es el monitor más avanzado de esta guía: un nearfield de 4 pulgadas con la misma guía de ondas MMD');
swap('Los 90W de amplificación y la respuesta de 57Hz a 21kHz son destacables para su tamaño',
  'Los 90 W de amplificación y la respuesta de 57 Hz a 21 kHz son notables para su tamaño');
swap('El micrófono de medición MA 1 permite que los monitores se autocorrijan en minutos, aplanando la respuesta en tu posición de escucha — la solución más eficaz para los problemas de graves de salas pequeñas aparte del tratamiento acústico',
  'El micrófono de medición MA 1 permite que los monitores se calibren solos en minutos, dejando plana la respuesta en tu posición de escucha: la solución más eficaz para los graves de salas pequeñas además del tratamiento acústico');
swap('el precio por unidad no es bajo, y además querrás el kit', 'el precio por unidad no es barato, y además querrás el kit');
swap('lo que eleva el costo final', 'lo que eleva el coste final');
swap('es el monitor más preciso y ajustable de esta guía', 'es el monitor más preciso y configurable de esta guía');
// SEC8 + heading
swap('ILoud mTM MkII: el compacto más potente', 'iLoud MTM MKII: el compacto más potente');
swap("en disposición D'Appolito (MTM) — ofreciendo una imagen de fuente puntual que un monitor de 2 vías no logra",
  'en disposición D\'Appolito (MTM), con una imagen de fuente puntual que un monitor de 2 vías no logra');
swap('La amplificación Clase-D de 100W RMS por altavoz y el DSP mejorado llegan a 36Hz-32kHz con 112,5dB de SPL máximo',
  'La amplificación en Clase D de 100 W RMS por altavoz y el DSP mejorado llegan a 36 Hz-32 kHz con 112,5 dB de SPL máximo');
swap('La auto-calibración ARC integrada con el micrófono de medición incluido sintoniza el par a tu sala en segundos',
  'La autocalibración ARC integrada, con el micrófono de medición incluido, calibra el par a tu sala en segundos');
// SEC9
swap('El Genelec 8010A demuestra que el monitoreo de referencia no necesita una caja grande', 'El Genelec 8010A demuestra que la monitorización de referencia no necesita una caja grande');
swap('entrega la misma construcción de aluminio fundido y 25W por driver', 'entrega la misma construcción de aluminio fundido y 25 W por driver');
swap('La respuesta es ±2,5dB de 74Hz a 20kHz', 'La respuesta es ±2,5 dB de 74 Hz a 20 kHz');
swap('y el gabinete de aluminio fundido mantiene las resonancias fuera del sonido', 'y el gabinete de aluminio fundido mantiene las resonancias a raya');
// SEC10
swap('El ADAM Audio T5V es la forma más barata de conseguir el característico tweeter', 'El ADAM Audio T5V es la forma más barata de tener el característico tweeter');
swap('en un configuración de sala pequeña', 'en una configuración de sala pequeña');
swap('Los amplificadores de 50W para el woofer y 20W para el tweeter entregan 106 dB SPL por par',
  'Los amplificadores de 50 W para el woofer y 20 W para el tweeter hacen que el par entregue 106 dB SPL');
swap('ofrece un punto óptimo inusualmente amplio para un monitor económico', 'ofrece un punto ideal inusualmente amplio para un monitor económico');
swap('El woofer de 5 pulgadas es del tamaño correcto para habitaciones de menos de 14 m2', 'El woofer de 5 pulgadas tiene el tamaño justo para habitaciones de menos de 14 m²');
swap('El puerto trasero lo hace menos tolerante cerca de paredes que los competidores', 'El puerto trasero lo hace menos perdonador cerca de paredes que los competidores');
swap('Y el woofer de 5 pulgadas aún cae por debajo de 45 Hz, así que las decisiones de sub-bass necesitan auriculares o un subwoofer',
  'Y el woofer de 5 pulgadas sigue cayendo por debajo de 45 Hz, así que para decidir sobre subgraves necesitarás auriculares o un subwoofer');
// SEC11
swap('cuando el espacio es ajustado pero el compromiso no — un monitor compacto', 'cuando el espacio es ajustado pero el nivel de exigencia no: un monitor compacto');
swap('Dos amplificadores Clase-D de 50W impulsan un woofer', 'Dos amplificadores en Clase D de 50 W impulsan un woofer');
swap('El soporte Iso-Pod desacopla el monitor de tu escritorio y te permite inclinarlo para un alineamiento acústico preciso',
  'El soporte Iso-Pod desacopla el monitor de tu escritorio y te permite orientarlo con precisión acústica');
swap('Los interruptores de compensación de respuesta de sala en el panel trasero (inclinación de graves, inclinación de agudos, atenuación de graves, control de escritorio)',
  'Los interruptores de compensación de respuesta de sala en el panel trasero (recorte de graves, ajuste de agudos, atenuación de graves, modo escritorio)');
swap('Si tu presupuesto lo permite, este es el monitor con el que crecerás', 'Si tu presupuesto lo permite, este es tu monitor definitivo');
// SEC12
swap('El Rokit 5 G5 junta un woofer de Kevlar de 5 pulgadas', 'El Rokit 5 G5 reúne un woofer de Kevlar de 5 pulgadas');
swap('bi-amplificados a 55W en Clase-D, entregando 54 Hz', 'biamplificados a 55 W en Clase D, entregando 54 Hz');
swap('El puerto ranurado frontal se pega a la pared sin embarrar los graves', 'El puerto ranurado frontal puede pegarse a la pared sin embarrar los graves');
swap('y 25 combinaciones Boundary/EQ más la KRK App eliminan los modos de sala sin software extra',
  'y 25 combinaciones Boundary/EQ más la KRK App corrigen la respuesta de la sala sin software extra');
swap('Con 28.8 x 19.1 x 24,2 cm cabe en escritorios apretados moviendo aire suficiente para decidir graves con honestidad',
  'Con 28,8 x 19,1 x 24,2 cm cabe en escritorios apretados moviendo el aire suficiente para decidir graves con honestidad');
swap('Firma sonora: Plano y preciso en modo Mix — otra especie frente a los KRK antiguos de graves inflados',
  'Firma sonora: plano y preciso en modo Mix, otra historia frente a los KRK antiguos de graves inflados');
swap('A ~$199 cada uno (~$398 el par), ningún rival mete DSP, tres modos y puerto frontal por menos',
  'A ~$199 cada uno (~$398 el par), ningún rival ofrece DSP, tres modos y puerto frontal por menos');
// SEC13 (nuestra)
swap('negarse a esparcir por la superficie del escritorio que tiene detrás', 'negarse a esparcir contra el escritorio que tiene debajo');
swap('solo tres potenciómetros analógicos y un conmutador de tres posiciones', 'solo tres mandos analógicos y un conmutador de tres posiciones');
swap('Es menos sofisticado que el KRK Rokit 5 G5 y bastante más fácil de confiar, porque no hay nada que actualizar ni nada que mal configurar',
  'Es menos sofisticado que el KRK Rokit 5 G5 y bastante más fiable, porque no hay nada que actualizar ni nada que configurar mal');
// SEC14
swap('Por más que compres monitores, ninguna cantidad de dinero arreglará una sala completamente sin tratar',
  'Por muchos monitores que compres, ningún dinero arreglará una sala completamente sin tratar');
swap('Trampas de graves de 4 pulgadas de grosor en tantas esquinas', 'Trampas de graves de 4 pulgadas en tantas esquinas');
swap('(donde apuntan los monitores), y en el techo sobre tu posición de escucha. Esto elimina el eco de aleteo y el filtrado de peine que manchan tu imagen estéreo',
  '(en los puntos de primera reflexión), y en el techo sobre tu posición de escucha. Esto elimina el eco flotante y el filtrado de peine que emborronan tu imagen estéreo');
swap('Coloca los monitores a la altura del oído, formando un triángulo equilátero', 'Coloca los monitores a la altura de los oídos, formando un triángulo equilátero');
swap('Inclínalos hacia los oídos (no hacia el frente)', 'Inclínalos hacia los oídos (no rectos hacia delante)');
swap('Sonarworks SoundID Reference o IK Multimedia ARC miden tu sala y crean una curva de corrección que aplana la respuesta de los monitores',
  'Sonarworks SoundID Reference o IK Multimedia ARC miden tu sala y crean una curva de corrección que deja plana la respuesta de los monitores');
swap('Es lo más cercano a una sala tratada profesionalmente sin construir una', 'Es lo más cercano a una sala tratada profesionalmente sin hacer obra');
// CONCLUSION + anchors
swap('Para la referencia estándar que se traduce en todas partes, el Yamaha HS5', 'Para la referencia estándar que funciona en todas partes, el Yamaha HS5');
swap('aporta un rango medio brutalmente honesto más interruptores Room Control', 'aporta un rango medio brutalmente honesto además de interruptores Room Control');
swap('el iLoud Micro Monitor Pro es la referencia del tamaño de una mochila', 'el iLoud Micro Monitor Pro es la referencia en tamaño mochila');
swap('el ADAM T5V aporta el detalle de tweeter de cinta de ADAM al precio más asequible', 'el ADAM T5V ofrece el detalle de tweeter de cinta de ADAM al precio más asequible');
swap('invierte en trampas de graves y absorción de primeras reflexiones antes de actualizar las monitores', 'invierte en trampas de graves y absorción de primeras reflexiones antes de actualizar los monitores');
swap('>JBL 305P vs Kali LP-6</a>', '>JBL 305P vs Kali LP-6: duelo de monitores económicos</a>');
swap('>Adam A7V vs Genelec 8040B</a>', '>Adam Audio vs Genelec: tweeter, sonido y valor</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
