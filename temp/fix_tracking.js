const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'tracking-headphones');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO + SEC0 (seguimiento -> grabar/monitorizar)
swap('Ya estés grabando voces o monitoreando fuentes fuertes, son esenciales', 'Estés grabando voces o monitorizando fuentes fuertes, son esenciales');
swap('Qué necesitan los auriculares de seguimiento para sobrevivir una sesión', 'Qué necesitan los auriculares para grabar para sobrevivir a una sesión');
swap('Los auriculares de seguimiento existen para evitar que el sonido vaya donde no debe', 'Los auriculares para grabar existen para evitar que el sonido vaya donde no debe');
swap('El cerrado no es negociable para el seguimiento', 'El cerrado no es negociable para grabar');
swap('y las tomas repetidas que exige el seguimiento', 'y las tomas repetidas que exige grabar');
swap('Compra dos pares en lugar de uno. El seguimiento normalmente significa que varias personas monitorean a la vez',
  'Compra dos pares en lugar de uno. Grabar normalmente significa que varias personas monitorizan a la vez');
swap('Un par de cerrados económicos y bien igualados supera a un par premium', 'Un par de cerrados económicos e iguales supera a un par premium');
swap('Un auricular que ensucia la mezcla fuerza tomas que nunca encajan', 'Un auricular que emborrona la mezcla provoca tomas que nunca encajan');
// SEC1
swap('Entra en cualquier estudio profesional del mundo y encontrarás DT 770 Pros colgando junto a la consola — resultan esenciales',
  'Entra en cualquier estudio profesional del mundo y encontrarás DT 770 Pros colgando junto a la consola, y no es casualidad');
swap('El diseño cerrado proporciona un excelente aislamiento pasivo, lo que significa que el clic y la mezcla de respaldo se quedan firmemente en los auriculares sin sangrar al micrófono',
  'El diseño cerrado proporciona un excelente aislamiento pasivo, con lo que el clic y la mezcla de respaldo no salen de los auriculares ni sangran al micrófono');
swap('Yo uso la versión de 80 Ohm, que revela una resolución de detalle notable',
  'La versión de 80 ohmios ofrece una resolución de detalle notable');
swap('Las almohadillas de velour son una maravilla para sesiones de grabación maratonianas: se mantienen cómodas durante horas sin sobrecalentarse, a diferencia de las almohadillas de cuero que hacen que los oídos suden después de treinta minutos',
  'Las almohadillas de velour van de maravilla para sesiones de grabación maratonianas: se mantienen cómodas durante horas sin sobrecalentarse, a diferencia de las de cuero, con las que sudan los oídos después de treinta minutos');
swap('La calidad de construcción es legendaria — estos están hechos en Alemania y construidos para sobrevivir años de abuso de estudio',
  'La calidad de construcción es legendaria: fabricados en Alemania y construidos para sobrevivir años de abuso en estudio');
swap('y el diseño de un solo lado significa que no se enreda tan fácilmente', 'y su diseño de un solo lado hace que no se enrede tan fácilmente');
// SEC2
swap('Si necesitas auriculares cerrados que pasen desapercibidos y te dejen enfocarte completamente en la interpretación',
  'Si necesitas unos cerrados discretos que te dejen enfocarte por completo en la interpretación');
swap('La versión II actualiza la capacidad legendaria de bloqueo de ruido del HD 280 original y la combina con una respuesta de frecuencia más refinada y lineal',
  'La versión II retoma la legendaria capacidad de bloqueo de ruido del HD 280 original y la combina con una respuesta en frecuencia mejorada y lineal');
swap('El aislamiento pasivo de ruido alcanza hasta 32 dB, lo que significa que el vocalista escucha la mezcla de referencia casi sin sangrado de la sala de control o de los platillos del baterista que se filtran por la pared',
  'El aislamiento pasivo de ruido alcanza hasta 32 dB, con lo que el vocalista escucha la mezcla de referencia casi sin sangrado de la sala de control ni de los platillos del batería que se cuelan desde la pared de al lado');
swap('La impedancia de 64 ohmios se alimenta fácilmente desde cualquier salida de auriculares', 'La impedancia de 64 ohmios va bien desde cualquier salida de auriculares');
swap('El diseño plegable y la construcción ligera los hacen prácticos para grabar fuera del estudio también',
  'El diseño plegable y la construcción ligera los hacen prácticos para grabar fuera del estudio');
// SEC3
swap('Shure diseñó las SRH440A como una herramienta de estudio sin pretensiones, y eso es exactamente lo que son',
  'Shure diseñó los SRH440A como una herramienta de estudio sin pretensiones, y eso es exactamente lo que son');
swap('Los drivers de neodimio de 40mm entregan una respuesta relativamente plana', 'Los drivers de neodimio de 40 mm ofrecen una respuesta relativamente plana');
swap('Las copas cerradas sellan bien contra la cabeza', 'Las copas cerradas aíslan bien contra la cabeza');
swap('A su precio, las SRH440A te dan sonido honesto y aislamiento confiable que gana su lugar en el cajón de auriculares de cualquier estudio',
  'A su precio, los SRH440A te dan sonido honesto y aislamiento fiable que se gana su sitio en el cajón de auriculares de cualquier estudio');
// SEC4
swap('Focal llevó su experiencia en construcción de altavoces al mundo de los auriculares', 'Focal trajo su experiencia en construcción de altavoces al mundo de los auriculares');
swap('La tecnología exclusiva de cono ofrece un detalle y una claridad transitoria', 'La tecnología exclusiva de cono da un detalle y una claridad de transitorios');
swap('los medios son honestos y suficientes para monitoreo vocal', 'los medios son honestos y de sobra para monitorización vocal');
swap('La construcción es premium, con una banda ligera y almohadillas de espuma viscoelástica',
  'La construcción es premium, con una diadema ligera y almohadillas de espuma viscoelástica');
// SEC5
swap('Hay una razón por la que las ATH-M50x han vendido más unidades que casi cualquier otro auricular de estudio en la historia',
  'Hay una razón por la que los ATH-M50x han vendido más unidades que casi cualquier otro auricular de estudio en la historia');
swap('Los drivers de 45mm entregan un sonido ligeramente adelantado y envolvente', 'Los drivers de 45 mm dan un sonido ligeramente adelantado y envolvente');
swap('y los tres cables incluidos cubren cada escenario de conexión', 'y los tres cables incluidos valen para cada escenario de conexión');
swap('Donde las M50x ganan su lugar es en la versatilidad absoluta', 'Donde se ganan el puesto es en la versatilidad absoluta');
swap('en un estudio donde un solo par de auriculares necesita servir al vocalista, al guitarrista y al productor, las M50x hacen el trabajo sin quejarse',
  'en un estudio donde un solo par tiene que servir al vocalista, al guitarrista y al productor, los M50x hacen el trabajo sin quejarse');
// SEC6
swap('Puedes permitirte tener varios sets listos para grabar bandas completas sin romper tu presupuesto',
  'Puedes permitirte tener varios juegos listos para grabar bandas completas sin romper tu presupuesto');
swap('pueden escucharse claramente sobre una pista de respaldo densa, lo que lleva mejores tomas con menos comps necesarios en la edición',
  'pueden escucharse claramente sobre una pista de respaldo densa, con menos comps en la edición');
swap('El diseño plegable significa que se guarda fácilmente en un cajón', 'El diseño plegable hace que se guarde fácilmente en un cajón');
swap('El diseño cerrado y el marco ligero los hacen cómodos para músicos que no están acostumbrados a usar auriculares por largos períodos',
  'El diseño cerrado y la montura ligera los hacen cómodos para músicos que no están acostumbrados a usar auriculares durante mucho rato');
swap('Si estás construyendo un estudio que recibe a otros músicos, compra estos al por mayor',
  'Si estás montando un estudio que recibe a otros músicos, compra estos de cuatro en cuatro');
// SEC7
swap('Olvida la diversión — los M40x están para oír lo que hay de verdad en la pista', 'Olvídate de pasarlo bien: los M40x están para oír lo que hay de verdad en la pista');
swap('Donde su famoso hermano realza graves y agudos, los ATH-M40x se mantienen planos y honestos',
  'Mientras su famoso hermano realza graves y agudos, los ATH-M40x se mantienen planos y honestos');
swap('Los drivers de 40 mm con imanes de tierras raras y bobinas CCAW resuelven clics de edición, ruidos de boca y problemas de sala con claridad clínica',
  'Los drivers de 40 mm con imanes de tierras raras y bobinas CCAW reproducen clics de edición, ruidos de boca y problemas de sala con claridad clínica');
swap('copas giratorias 90 grados para monitoreo a una oreja', 'copas giratorias de 90 grados para monitorización a una oreja');
swap('y dos cables desmontables (espiral y recto) para que un cable roto nunca mate una sesión',
  'y dos cables desmontables (espiral y recto) para que un cable roto nunca arruine una sesión');
swap('Con 35 ohmios suenan alto desde cualquier interfaz o laptop', 'Con 35 ohmios dan volumen de sobra desde cualquier interfaz o portátil');
swap('no son para disfrutar música, la presión aprieta firme hasta adaptarse y el chasis mayormente plástico se siente básico junto a rivales premium',
  'no son para disfrutar música, la presión aprieta hasta adaptarse y el chasis casi todo de plástico parece básico junto a rivales premium');
swap('Para ingenieros que graban con la vista en los medidores y la confianza en la respuesta plana, son la conciencia del estudio por menos de $120',
  'Para ingenieros que graban pendientes de los medidores y confiando en la respuesta plana, te mantienen honesto por menos de $120');
// SEC8
swap('Esto pasa cuando la marca de monitores fabrica un auricular', 'Esto es lo que pasa cuando la marca de monitores fabrica un auricular');
swap('El NDH 20 toma la afinación equilibrada y sin adornos de los monitores Neumann y la sella en un cerrado con más de 34 dB de aislamiento',
  'El NDH 20 toma la afinación equilibrada y sin adornos de los monitores Neumann y la mete en un cerrado con más de 34 dB de aislamiento');
swap('Los drivers de neodimio de 38 mm entregan resolución e imagen estéreo de grado monitor que los cerrados baratos difuminan',
  'Los drivers de neodimio de 38 mm ofrecen resolución e imagen estéreo de nivel monitor que los cerrados baratos emborronan');
swap('Controles de realidad: los 150 ohmios piden un amplificador de auriculares decente — una salida floja de laptop los deja bajos y apagados',
  'Siendo realistas: los 150 ohmios necesitan un amplificador de auriculares decente; una salida floja de portátil se queda corta y suenan apagados');
swap('Con 390 g son el par más pesado de aquí, y ese dinero insignia compra muchos micrófonos',
  'Con 390 g son el par más pesado de aquí, y por ese precio insignia compras muchos micrófonos');
swap('Para profesionales que facturan por aislamiento y precisión de traducción, es el cerrado definitivo',
  'Para profesionales que viven del aislamiento y la precisión de traslación, es el cerrado definitivo');
// SEC9
swap('Cuando la luz roja se enciende frente al público, este es el Sennheiser que usan los equipos',
  'Cuando se enciende la luz roja, este es el Sennheiser que usan los equipos técnicos');
swap('Las almohadillas viscoelásticas sellan a fondo sin puntos calientes', 'Las almohadillas viscoelásticas sellan bien sin puntos calientes');
swap('y el ruido estructural se filtra en la copa', 'y el ruido estructural se queda en la copa');
swap('Los drivers de 64 ohmios suenan alto desde cualquier mesa o equipo portátil',
  'Los drivers de 64 ohmios dan volumen de sobra desde cualquier mesa o equipo móvil');
swap('Para grabar en escenario, broadcast y monitoreo FOH donde fallar no es opción, es la elección especialista',
  'Para grabar en escenario, broadcast y monitorización FOH donde fallar no es opción, es la elección de los especialistas');
// SEC10
swap('Si los M50x son diversión, los M70x son verdad', 'Si los M50x son diversión, los M70x son la verdad');
swap('Como insignia de la serie M, cambian el famoso realce de graves por una afinación plana y forense',
  'Como insignia de la serie M, cambian el famoso realce de graves por una afinación plana y quirúrgica');
swap('para que los subgraves y los agudos aéreos informen con honestidad', 'para que los subgraves y los agudos aéreos hablen con honestidad');
swap('Los ingenieros que superaron la moda de los M50x aterrizan aquí y dejan de buscar',
  'Los ingenieros que superaron la moda de los M50x acaban aquí y dejan de buscar');
swap('Los modales para grabar son impecables: copas giratorias 90 grados para monitoreo a una oreja',
  'El comportamiento grabando es impecable: copas giratorias de 90 grados para monitorización a una oreja');
swap('Construcción metálica y 35 ohmios que suenan alto desde todo completan la ficha de todoterreno',
  'Construcción metálica y 35 ohmios que dan volumen de sobra con todo redondean la ficha de todoterreno');
swap('Costes honestos: dinero insignia por mejoras incrementales sobre los brillantes M40x, 280 g que se notan hacia la hora seis',
  'Pegad honestas: precio de insignia por mejoras incrementales sobre los divertidos M40x, 280 g que se notan a la sexta hora');
// SEC11
swap('Afinación neutra que se pliega a la mochila', 'Afinación neutra que se pliega para la mochila');
swap('El AKG K371 combina drivers de 50 mm con titanio', 'El AKG K371 combina drivers de 50 mm revestidos de titanio');
swap('y con 255 g se pliegan planos para el viaje, con respuesta 5 Hz–40 kHz en chasis de 32 ohmios que mueve cualquier interfaz',
  'y con 255 g se pliegan en plano para el viaje, con respuesta de 5 Hz–40 kHz y drivers de 32 ohmios que alimentan cualquier interfaz');
swap('El trato honesto. Los dueños reportan fallos de bisagras y deslizadores más de lo que sugiere el marketing con refuerzo metálico — trata las articulaciones con cuidado',
  'Las pegas honestas: los dueños cuentan más fallos de bisagras y deslizadores de lo que sugiere el marketing con refuerzo metálico; trata las articulaciones con cuidado');
swap('Trátalos como herramienta de precisión, no como auriculares de batalla, y lo devuelven',
  'Trátalos como herramienta de precisión, no como auriculares de batalla, y te lo devuelven con creces');
// CONCLUSION
swap('El mercado de auriculares cerrados te ofrece opciones reales según el aislamiento y la comodidad: revisa el velour y la construcción antes de comprar',
  'El mercado de auriculares cerrados te ofrece opciones reales según aislamiento y comodidad: fíjate en el velour y la construcción antes de comprar');
swap('La DT 770 Pro sigue siendo la opción de los profesionales para grabación — la comodidad del velour y la construcción alemana han ganado su reputación en más de treinta años',
  'El DT 770 Pro sigue siendo la opción de los profesionales para grabación: la comodidad del velour y la construcción alemana se han ganado su reputación en más de treinta años');
swap('El Sennheiser HD 280 PRO II es tu mejor opción cuando el aislamiento puro importa más: por menos de $100, nada bloquea el ruido exterior con más eficacia',
  'El Sennheiser HD 280 PRO II es tu mejor opción cuando el aislamiento puro importa más: por menos de $100, nada bloquea el ruido exterior con más eficacia');
swap('Las Shure SRH440A entregan sonido honesto y transparente con un cable desmontable que extiende su vida en un estudio ocupado',
  'Los Shure SRH440A entregan sonido honesto y transparente, con un cable desmontable que extiende su vida en un estudio ocupado');
swap('Las ATH-M50x son la opción versátil para grabación, edición y escucha casual sin quejarse',
  'Los ATH-M50x son la opción versátil para grabación, edición y escucha casual sin complicaciones');
swap('Las AKG K371 ofrecen la afinación Harman que se traduce perfectamente a cualquier sistema',
  'Los AKG K371 ofrecen la afinación Harman que se traslada perfectamente a cualquier sistema');
swap('Y las MDR-7506 siguen siendo la compra inteligente para equipar un estudio con varios pares para sesiones de banda',
  'Y los MDR-7506 siguen siendo la compra inteligente para equipar un estudio con varios pares para sesiones de banda');
swap('Los Audio-Technica ATH-M70x son el insignia obligatorio de la serie M: honestidad plana de 45 mm que caza lo que los divertidos M50x esconden',
  'Los Audio-Technica ATH-M70x son el insignia obligatorio de la serie M: honestidad plana de 45 mm que caza lo que los divertidos M50x esconden');
swap('Juntos, estos once auriculares cubren cada escenario de grabación', 'Juntos, estos once auriculares cubren cada situación de grabación');
swap('>Mejores Auriculares de estudio para Mezcla y Seguimiento</a>', '>Mejores auriculares de estudio: guía completa</a>');
swap('>Mejores Auriculares de estudio Económicos</a>', '>Mejores auriculares de estudio por menos de $150</a>');
swap('>Mejores Auriculares Abiertos para Mezcla</a>', '>Mejores auriculares abiertos: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
