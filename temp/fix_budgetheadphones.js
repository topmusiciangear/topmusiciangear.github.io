const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'budget-headphones');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('y lo sigo afirmando después de dos décadas de grabación profesional', 'y lo mantengo después de dos décadas de grabación profesional');
// SEC0
swap('La respuesta de frecuencia es todo el juego para uso de estudio', 'La respuesta en frecuencia lo es todo para uso de estudio');
swap('y lee reseñas que mencionen cuán fielmente reproducen los graves y los agudos', 'y lee reseñas que digan con qué fidelidad reproducen graves y agudos');
swap('Un cable extraíble significa que puedes reemplazarlo en lugar de comprar unos auriculares enteros nuevos cuando el cable se deshilacha',
  'Un cable extraíble supone que puedes reemplazarlo en lugar de comprar unos auriculares enteros nuevos cuando el cable se deshilacha');
swap('Prueba el ajuste o lee sobre la profundidad de la almohadilla y la fuerza de sujeción', 'Prueba el ajuste o infórmate sobre la profundidad de la almohadilla y la fuerza de sujeción');
// SEC1
swap('cuando el presupuesto y la precisión se cruzan', 'cuando el presupuesto y la precisión coinciden');
swap('Su diseño abierto entrega un escenario sonoro amplio y natural', 'Su diseño abierto ofrece un escenario sonoro amplio y natural');
swap('y los drivers inclinados recrean una posición de escucha real sin necesidad de tratar la sala',
  'y los drivers inclinados simulan una posición de escucha real sin necesidad de tratar la sala');
swap('la imagen y la profundidad se leen con claridad, así que las decisiones de paneo y nivel se traducen bien',
  'la imagen y la profundidad se aprecian con claridad, así que las decisiones de paneo y nivel se trasladan bien');
swap('La impedancia de 120 ohmios se maneja fácilmente desde una interfaz o un buen conector de laptop, así que no necesitas un amplificador de auriculares',
  'La impedancia de 120 ohmios va bien desde una interfaz o una salida decente de portátil, así que no necesitas un amplificador de auriculares');
// SEC2
swap('Las Sony MDR-7506 llevan siendo el estándar de transmisión desde 1991', 'Las Sony MDR-7506 son el estándar de transmisión desde 1991');
swap('más de treinta años apareciendo en sets de filmación, estaciones de radio, camiones de transmisión e innumerables estudios caseros',
  'más de treinta años dejándose ver en sets de filmación, estaciones de radio, furgonetas de transmisión e innumerables estudios caseros');
swap('escucharás ruidos de boca, clics de edición, problemas de sibilancia y distorsión de bajo nivel que otros auriculares enmascaran por completo',
  'escucharás ruidos de boca, clics de edición, sibilancias y distorsión de bajo nivel que otros auriculares enmascaran por completo');
swap('notarás fallos que quizá quieras corregir, pero no te llevarán sorpresas cuando la mezcla suene en otros sistemas',
  'notarás fallos que quizá quieras corregir, pero no habrá sorpresas cuando la mezcla suene en otros sistemas');
swap('El diseño cerrado significa que también puedes grabar voces e instrumentos con ellas', 'El diseño cerrado permite grabar voces e instrumentos con ellas');
swap('Lo que las frena son el cable fijo no desmontable, enrollado: cuando se deshilacha',
  'Sus pegas son el cable fijo no desmontable y enrollado: cuando se deshilacha');
swap('La impedancia de 63 ohmios también pide una salida de auriculares más potente que la de un móvil',
  'La impedancia de 63 ohmios también necesita una salida de auriculares más potente que la de un móvil');
// SEC3
swap('Los ATH-M40x ofrecen casi toda la tecnología de drivers de su famoso hermano mayor por menos dinero, y son la opción de valor con respuesta plana de la serie M',
  'Los ATH-M40x ofrecen casi toda la tecnología de su famoso hermano mayor por menos dinero, y son la opción con mejor relación calidad-precio y respuesta plana de la serie M');
swap('Los drivers de 40mm con imanes de tierras raras y bobinas CCAW están sintonizados de forma plana',
  'Los drivers de 40 mm con imanes de tierras raras y bobinas CCAW están ajustados de forma plana');
swap('Las copas circumaurales sellan bien para un aislamiento sólido', 'Las copas circumaurales aíslan bien para un aislamiento sólido');
swap('y las almohadillas invertidas de grado profesional siguen cómodas durante sesiones largas',
  'y las almohadillas anatómicas de grado profesional siguen cómodas durante sesiones largas');
swap('El chasis plegable con copas giratorias de 90 grados es ideal para viajar y para monitoreo de un solo oído',
  'El chasis plegable con copas giratorias de 90 grados es ideal para viajar y para monitorización de un solo oído');
swap('y el sistema de cable desmontable significa que la caída de un cable no acabará con los auriculares',
  'y el sistema de cable desmontable hace que un cable roto no acabe con los auriculares');
swap('Dos cables (en espiral y liso), bolsa de transporte y adaptador de 1/4 pulgada van incluidos',
  'Dos cables (en espiral y liso), bolsa de transporte y adaptador de 1/4 de pulgada vienen incluidos');
swap('los M40x agarran con firmeza, y algunos oyentes notan el ajuste apretado al principio hasta que el chasis se ablanda',
  'los M40x agarran con firmeza, y algunos sienten el ajuste apretado al principio, hasta que el chasis cede');
// SEC4
swap('Los ATH-R30x son la puerta de entrada a la serie de referencia R de Audio-Technica', 'Los ATH-R30x son la vía de entrada a la serie de referencia R de Audio-Technica');
swap('El diseño abierto deja mover libremente a los drivers de 40mm, con poca afinación o amortiguación interpuesta',
  'El diseño abierto deja respirar a los drivers de 40 mm, con poca afinación o amortiguación de por medio');
swap('Las almohadillas de terciopelo y la diadema ajustable pesan poco sobre la cabeza para sesiones largas',
  'Las almohadillas de velour y la diadema ajustable apenas se notan en sesiones largas');
swap('y la impedancia de 36 ohmios se maneja fácilmente desde una interfaz, una laptop o incluso un teléfono',
  'y la impedancia de 36 ohmios va bien desde una interfaz, un portátil o incluso un teléfono');
swap('El adaptador de 6,3mm incluido hace que funcionen directamente con equipo de estudio',
  'El adaptador de 6,3 mm incluido sirve para conectar directos a equipo de estudio');
swap('el cable es fijo y no desmontable, así que un cable roto significa auriculares nuevos',
  'el cable es fijo y no desmontable, así que un cable roto supone auriculares nuevos');
swap('También tienen la sensibilidad más baja del grupo, 92 dB, por lo que piden un poco más de volumen que la media',
  'También tienen la sensibilidad más baja del grupo, 92 dB, por lo que necesitan un poco más de volumen que la media');
// SEC5
swap('Los Shure SRH440A son la versión moderna del clásico monitor cerrado económico, y modernizan la fórmula',
  'Los Shure SRH440A son la versión moderna del clásico monitor cerrado económico, y actualizan la fórmula');
swap('Los drivers de neodimio de 40mm están afinados para una firma transparente', 'Los drivers de neodimio de 40 mm están afinados con una firma transparente');
swap('La gran mejora frente a las 7506 es el cable recto desmontable de 3m — cuando falla, reemplazas solo el cable, más las almohadillas removibles que alargan la vida del par',
  'La gran mejora frente a las 7506 es el cable recto desmontable de 3 m: cuando falla, reemplazas solo el cable, además de unas almohadillas recambiables que alargan la vida del par');
swap('La impedancia de 40 ohmios y la potencia de manejo de 500mW los hacen fáciles de manejar desde la mayoría de dispositivos pro y de consumo',
  'La impedancia de 40 ohmios y la potencia admisible de 500 mW se alimentan fácil desde la mayoría de dispositivos pro y de consumo');
swap('y el chasis plegable se dobla plano para viajar', 'y el chasis plegable se pliega en plano para viajar');
swap('La compensación es que no tienen la pegada en los medios tan adelantada como las 7506',
  'La contrapartida es que no tienen la pegada en los medios tan adelantada como las 7506');
swap('Aun así, para un cerrado que también sirve para grabar y está pensado para ser reparable, es una decisión muy reñida a casi el mismo precio',
  'Aun así, para un cerrado que también sirve para grabar y está pensado para repararse, es una decisión muy ajustada a casi el mismo precio');
// SEC6
swap('Los grandes drivers con imanes de neodimio entregan una respuesta transparente', 'Los grandes drivers con imanes de neodimio ofrecen una respuesta transparente');
swap('y el respaldo semiabierto mantiene los graves honestos mientras abre el escenario sonoro', 'y la trasera semiabierta mantiene los graves honestos mientras abre el escenario sonoro');
swap('La diadema autoajustable y las almohadillas de terciopelo se mantienen cómodas durante sesiones largas',
  'La diadema autoajustable y las almohadillas de velour siguen cómodas durante sesiones largas');
swap('y la impedancia de 32 ohmios se maneja desde cualquier fuente, incluso un teléfono',
  'y la impedancia de 32 ohmios va bien desde cualquier fuente, incluso un teléfono');
swap('El adaptador de 1/4 pulgada incluido cubre el uso de estudio', 'El adaptador de 1/4 de pulgada incluido vale para el estudio');
swap('la construcción es mayormente de plástico y se siente más barata que las demás de aquí',
  'la construcción es casi toda de plástico y parece más barata que las demás de aquí');
// SEC7
swap('Sus copas semiabiertas parten la diferencia: un escenario más amplio', 'Sus copas semiabiertas son un término medio: un escenario más amplio');
swap('Los drivers Varimotion de 30 mm entregan medios honestos', 'Los drivers Varimotion de 30 mm ofrecen medios honestos');
swap('Los detalles pro avergüenzan a rivales más caros', 'Los detalles pro dejan en ridículo a rivales más caros');
swap('Con 55 ohmios y 104 dB de sensibilidad suenan alto desde un teléfono, una laptop o una interfaz',
  'Con 55 ohmios y 104 dB de sensibilidad dan volumen de sobra desde un teléfono, un portátil o una interfaz');
swap('graves más ligeros que los rivales sellados, las almohadillas de polipiel sudan en días calurosos',
  'graves más ligeros que los rivales cerrados, las almohadillas de polipiel dan calor en días calurosos');
swap('y el cable de 3 m está hecho para el estudio, no para la calle', 'y el cable de 3 m es para el estudio, no para la calle');
// SEC8
swap('Cuando el micrófono está abierto, el aislamiento lo es todo', 'Cuando grabas con el micro abierto, el aislamiento lo es todo');
swap('La respuesta lineal de 8 Hz a 25 kHz dice la verdad sin adornos, así lo que monitoreas es lo que grabaste',
  'La respuesta lineal de 8 Hz a 25 kHz no engaña: lo que monitorizas es lo que grabaste');
swap('Los drivers de 64 ohmios suenan alto desde cualquier interfaz, las copas plegables se pliegan planas para la mochila',
  'Los drivers de 64 ohmios dan volumen de sobra desde cualquier interfaz, las copas plegables se pliegan en plano para la mochila');
swap('Casi cada pieza es reemplazable, por eso pares de hace una década siguen ganándose el pan en cabinas pro',
  'Casi cada pieza es reemplazable, por eso pares de hace una década siguen dando guerra en cabinas pro');
swap('Advertencias honestas: los 285 g con una presión firme de 6 N agarran fuerte hasta adaptarse, y el cable en espiral pelea contigo en un escritorio',
  'Advertencias honestas: los 285 g con una presión firme de 6 N aprietan fuerte hasta adaptarse, y el cable en espiral da guerra en un escritorio');
swap('Para grabar voces, batería o podcast donde la fuga arruina tomas, esta es la póliza de seguro por menos de $100',
  'Para grabar voces, batería o podcast donde la fuga arruina tomas, este es el seguro por menos de $100');
// HEADINGS
swap('¿Son los Audio-Technica ATH-R30x la puerta de entrada abierta económica?', '¿Son los Audio-Technica ATH-R30x la vía de entrada abierta económica?');
swap('¿siguen los AKG K240 Studio siendo los $89 más inteligentes del audio?', '¿siguen los AKG K240 Studio siendo los $89 mejor gastados del audio?');
// CONCLUSION
swap('y ambos cuestan alrededor de $100', 'y ambos rondan los $100');
swap('los HD 560S son los ganadores abiertos: su afinación lineal', 'los HD 560S ganan en abierto: su afinación lineal');
swap('los convierten en el más preciso de los ocho', 'los convierten en el más preciso del grupo');
swap('y los ATH-R30x son la puerta de entrada abierta más ligera', 'y los ATH-R30x son la vía de entrada abierta más ligera');
swap('los Samson SR850 ofrecen más precisión por tu dinero que cualquier otra', 'los Samson SR850 ofrecen más precisión por tu dinero que ningún otro');
swap('Los AKG K240 Studio son el camino intermedio semiabierto: más amplios', 'Los AKG K240 Studio son el término medio semiabierto: más amplios');
swap('hasta 32 dB de control de fuga para micrófonos en vivo', 'hasta 32 dB de aislamiento para micros en vivo');
swap('>AKG K371 vs Sony MDR-7506: comparativa</a>', '>AKG K371 vs Sony MDR-7506: comparativa para home studio</a>');
swap('>Mejores auriculares de estudio para cada presupuesto</a>', '>Mejores auriculares de estudio: guía completa</a>');
swap('>Mejores auriculares abiertos para mezcla y Hi-Fi</a>', '>Mejores auriculares abiertos: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
