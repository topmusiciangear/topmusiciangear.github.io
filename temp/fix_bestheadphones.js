const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-headphones');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('desde opciones económicas hasta monitores de referencia', 'desde opciones económicas hasta buques insignia');
// SEC0
swap('Evitan por completo la acústica de tu habitación, lo que los hace esenciales', 'Se saltan por completo la acústica de tu habitación, lo que los hace esenciales');
swap('La precisión supera la emoción para el trabajo de estudio', 'La precisión está por encima de la emoción para el trabajo de estudio');
swap('Una respuesta plana y neutra revela lo que hace la mezcla', 'Una respuesta plana y neutra muestra lo que hay en la mezcla');
swap('son divertidos para escuchar pero te inducen a un EQ correctivo que arruina la mezcla en otros lugares',
  'son divertidos para escuchar pero te empujan a un EQ correctivo que arruina la mezcla en otros equipos');
swap('una respuesta de frecuencia natural, ideales para mezclar', 'una respuesta en frecuencia natural, ideales para mezclar');
swap('Los modelos cerrados sellan contra el ruido exterior y evitan que tu música se filtre al micrófono',
  'Los modelos cerrados aíslan del ruido exterior e impiden que tu música se filtre al micrófono');
swap('Iguala la impedancia con lo que los alimenta', 'Adapta la impedancia a lo que los alimenta');
swap('alcanzan su nivel completo desde una interfaz de audio, portátil o teléfono', 'dan todo su volumen desde una interfaz de audio, un portátil o un teléfono');
swap('y están pensados para sistemas de auriculares serios', 'y están pensados para equipos de auriculares en condiciones');
swap('Sesiones de 6-8 horas son normales', 'Las sesiones de 6-8 horas son normales');
swap('con presión de sujeción uniforme mantienen los oídos frescos hasta el final del día',
  'con presión de sujeción uniforme evitan la fatiga hasta el final del día');
// SEC1
swap('el aislamiento es la prestación que decide si una toma sobrevive', 'el aislamiento es la característica que decide si una toma sobrevive');
swap('así el claqueta y la base no se filtran al micrófono ni aparecen como fantasmas en tu voz',
  'así la claqueta y el bombo no se filtran al micrófono ni aparecen como fantasmas en tu voz');
swap('con drivers de 80 ohmios que resuelven el detalle fino', 'con drivers de 80 ohmios que reproducen el detalle fino');
swap('así que prueba comodidad y presión en una sesión larga', 'así que comprueba ajuste y presión en una sesión larga');
swap('Hecho para cantantes e ingenieros que graban donde mismo mezclan', 'Hecho para cantantes e ingenieros que graban donde mezclan');
// SEC2
swap('Mezclar es más fácil cuando el auricular deja de adular y empieza a informar',
  'Mezclar es más fácil cuando el auricular deja de adular y empieza a decir la verdad');
swap('con un escenario amplio y con profundidad que se parece más a unos monitores que a unas copas selladas',
  'con un escenario amplio y con profundidad que se parece más a unos monitores que a unos cerrados');
swap('almohadillas intercambiables de mezcla y producción que cambian el enfoque',
  'almohadillas intercambiables de mezcla y producción que cambian el carácter');
swap('y el plugin dearVR MIX-SE para comprobar la traducción', 'y el plugin dearVR MIX-SE para comprobar cómo se trasladan');
swap('recuerda que los abiertos fugan sonido en ambas direcciones', 'recuerda que los abiertos dejan escapar sonido en ambas direcciones');
// SEC3
swap('A veces el auricular más inteligente para empezar es el que lo hace todo lo bastante bien',
  'A veces el auricular más sensato para empezar es el que lo hace todo lo bastante bien');
swap('Son adecuados para principiantes porque aguantan el trote de la mochila, sujetan bien al tocar y no resultan delicados',
  'Son adecuados para principiantes porque aguantan el maltrato de la mochila, se sujetan bien al tocar y no resultan delicados');
swap('Antes de comprar, ten claro el trato: emoción antes que neutralidad absoluta',
  'Antes de comprar, ten claras las contrapartidas: emoción antes que neutralidad absoluta');
// SEC4
swap('porque cazan lo que los equipos amables esconden', 'porque cazan lo que los equipos permisivos esconden');
swap('El MDR-7506 vive en camiones de exteriores, sets de cine y cabinas de podcast desde 1991',
  'El MDR-7506 vive en furgonetas de exteriores, sets de cine y cabinas de podcast desde 1991');
swap('Un par en la bolsa sirve para comprobaciones en exteriores y pruebas rápidas junto a unos hi-fi más suaves',
  'Un par en la bolsa sirve para comprobaciones en exteriores y pruebas rápidas junto a unos hi-fi más relajados');
swap('Antes de comprar, espera revelación, no relax, y trata el cable fijo con cuidado',
  'Antes de comprar, espera que te revele, no que te relaje, y trata el cable fijo con cuidado');
// SEC5
swap('el escenario sonoro expansivo te permite colocar cada instrumento en espacio tridimensional',
  'el escenario sonoro expansivo te permite colocar cada instrumento en un espacio tridimensional');
swap('Los agudos son más presentes que en el DT 770, dándote precisión quirúrgica en colas de reverb',
  'Los agudos son más presentes que en el DT 770, con precisión quirúrgica en colas de reverb');
// SEC6
swap('El AKG K371 está sintonizado a la curva objetivo Harman — el estándar científico de referencia para respuesta de frecuencia en auriculares',
  'El AKG K371 está ajustado a la curva objetivo Harman: el estándar científico de referencia para la respuesta en frecuencia en auriculares');
swap('Esto significa que suenan naturales, balanceados y se traducen con precisión a altavoces',
  'Esto significa que suenan naturales y balanceados, y se trasladan con precisión a altavoces');
swap('Los cables desmontables (3 incluidos — en espiral, corto y largo) aguantan el ajetreo de la carretera',
  'Los cables desmontables (3 incluidos: en espiral, corto y largo) soportan el ajetreo de la carretera');
// SEC7
swap('sin el pico de agudos del DT 990 que causa fatiga y decisiones duras de EQ',
  'sin el pico de agudos del DT 990 que causa fatiga y obliga a decisiones difíciles de EQ');
swap('Las mezclas hechas en los HD 600 se traducen porque nada fue adulado desde el principio',
  'Las mezclas hechas en los HD 600 se trasladan porque nada fue adulado desde el principio');
swap('El diseño abierto respira como una buena sala', 'El diseño abierto ventila como una buena sala');
swap('y cada pieza — cable, almohadillas, diadema, drivers — es reemplazable, así pares de hace décadas siguen trabajando a diario',
  'y cada pieza (cable, almohadillas, diadema, drivers) es reemplazable: pares de hace décadas siguen trabajando a diario');
swap('Con 300 ohmios exige un amplificador de auriculares de verdad; una salida floja de laptop los deja bajos y apagados, que es el precio honesto de su escalado',
  'Con 300 ohmios exige un amplificador de auriculares en condiciones; una salida floja de portátil se queda corta y suenan apagados, que es el precio honesto de su margen de mejora');
swap('No adula, no aísla ni viaja: lo abierto significa cero uso para grabar', 'No adula, no aísla ni sirve para llevar: lo abierto significa ningún uso para grabar');
swap('Para quien mezcla atrapado entre los agudos fatigantes del DT 990 y el dinero insignia están los HD 600',
  'Para quien mezcla atrapado entre los agudos fatigantes del DT 990 y los presupuestos insignia están los HD 600');
swap('la legendaria referencia plana que corrige la fatiga de agudos sin el precio insignia',
  'la legendaria referencia plana que corrige la fatiga de agudos sin precio de insignia');
// SEC8
swap('Todo camino de estudio empieza con un primer par, y este es el más barato honesto',
  'Todo camino de estudio empieza con un primer par, y este es el más barato y honesto');
swap('Los ATH-M20x traen los fundamentos de la serie M', 'Los ATH-M20x tienen los fundamentos de la serie M');
swap('Podcasters y principiantes obtienen monitoreo vocal limpio sin fuga', 'Podcasters y principiantes tienen monitorización vocal limpia sin fuga');
swap('y la impedancia de 47 ohmios suena alto desde cualquier laptop o teléfono', 'y la impedancia de 47 ohmios da volumen de sobra desde cualquier portátil o teléfono');
swap('Las contrapartidas son el precio de entrada: cable fijo', 'Las contrapartidas son el peaje de entrada: cable fijo');
swap('Para principiantes absolutos, es el boleto de entrada', 'Para principiantes absolutos, es la entrada');
// SEC9
swap('Pero como la forma más barata de oír cómo debe sentirse un escenario sonoro, nada lo toca',
  'Pero como la forma más barata de oír cómo debe sonar un escenario sonoro, nada lo supera');
// SEC10
swap('con honestidad extendida de 5 Hz a 40 kHz que nunca fatiga', 'con una respuesta honesta extendida de 5 Hz a 40 kHz que nunca fatiga');
swap('El cable desmontable bilateral mantiene limpia la señal por canal', 'El cable desmontable de doble entrada mantiene limpia la señal por canal');
swap('y la presión ligera va mejor a cabezas pequeñas que grandes', 'y su presión ligera va mejor en cabezas pequeñas que grandes');
swap('No aísla ni viaja', 'No aísla ni sirve para llevar');
swap('Para quien mezcla con auriculares todo el día y quiere apertura insignia sin peso insignia, es la referencia cómoda',
  'Para quien mezcla con auriculares todo el día y quiere la apertura de un insignia sin su peso, es la referencia cómoda');
// SEC11
swap('Neumann puso la afinación de sus monitores en un abierto y listo', 'Neumann metió la afinación de sus monitores en un abierto');
swap('El dinero premium exige demandas premium: quiere un buen amplificador y una sala silenciosa, con 354 g no es una pluma y el acabado plateado muestra el desgaste',
  'El precio premium pide un equipo a la altura: quiere un buen amplificador y una sala silenciosa; con 354 g no es precisamente ligero y el acabado plateado acusa el desgaste');
swap('Para ingenieros de mastering que quieren su muro de monitores en un auricular, es el abierto definitivo',
  'Para ingenieros de mastering que quieren sus monitores en un auricular, es el abierto definitivo');
// SEC12
swap('Los drivers planar magnéticos se mueven como una sola lámina — y se oye todo',
  'Los drivers planar magnéticos se mueven como una sola lámina, y se nota');
swap('El LCD-X entrega precisión transitoria y extensión de graves', 'El LCD-X entrega precisión de transitorios y extensión de graves');
swap('con un vasto diafragma de 106 x 110 mm que dibuja las mezclas con detalle de microscopio',
  'con un vasto diafragma de 106 x 110 mm que retrata las mezclas con detalle de microscopio');
swap('Los masters revisados aquí se traducen con autoridad', 'Los masters comprobados aquí se trasladan con autoridad');
swap('La factura también es física: 612 g de gimnasia cervical, un precio que compra pares de monitores y un apetito de amplificador que se ríe de las laptops',
  'El precio también se nota en lo físico: 612 g de gimnasia para el cuello, un precio con el que compras pares de monitores y un apetito de amplificador que se ríe de los portátiles');
swap('Para profesionales que facturan a clientes insignia y quieren la última palabra en un auricular, es la parada final',
  'Para profesionales que trabajan para clientes insignia y buscan la última palabra en un auricular, es la parada final');
// CONCLUSION
swap('Por menos de $60, los ATH-M20x son el boleto honesto y los SR850 el valor absurdo',
  'Por menos de $60, los ATH-M20x son la entrada honesta y los SR850 una ganga absurda');
swap('los ATH-R70xa son la referencia cómoda pluma, el NDH 30 la sala de mastering portátil y el LCD-X la última palabra planar',
  'los ATH-R70xa son la referencia cómoda y ligera, el NDH 30 la sala de mastering portátil y el LCD-X la última palabra planar');
swap('Entre los agudos fatigantes del DT 990 y el dinero insignia están los HD 600: la legendaria referencia plana que corrige la fatiga de agudos sin el precio insignia',
  'Entre los agudos fatigantes del DT 990 y los presupuestos insignia están los HD 600: la legendaria referencia plana que corrige la fatiga de agudos sin precio de insignia');
swap('>Guía de auriculares abiertos</a>', '>Mejores auriculares abiertos: guía completa</a>');
swap('>Guía de auriculares económicos</a>', '>Mejores auriculares de estudio por menos de $150</a>');
swap('>Guía de auriculares de grabación</a>', '>Mejores auriculares cerrados para grabar y aislar la voz</a>');
swap('>Comparativa DT 770 vs DT 990</a>', '>DT 770 Pro vs DT 990 Pro: ¿cerrados o abiertos para mezclar?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
