const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-monitors');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// SEC0
swap('Un par elegido para el tamaño y la acústica de tu sala mezclará mejor que un par de gama alta que lucha contra la sala',
  'Un par elegido para el tamaño y la acústica de tu sala dará mejores mezclas que un par de gama alta que lucha contra la sala');
swap('6-7 pulgadas se ajustan a salas medianas; 8 pulgadas o más necesitan espacio y tratamiento para ser honestos',
  '6-7 pulgadas van bien en salas medianas; 8 pulgadas o más necesitan espacio y tratamiento para sonar honestos');
swap('Sobredimensionar es el error de monitores más común', 'Pasarse de tamaño es el error de monitores más común');
swap('Los diseños con puerto frontal son tolerantes en espacios reducidos', 'Los diseños con puerto frontal perdonan más en espacios reducidos');
swap('Los puertos de graves traseros necesitan 15-30 cm de espacio desde la pared para evitar retumbos',
  'Los puertos de graves traseros necesitan 15-30 cm libres hasta la pared para evitar rebotes de graves');
swap('lo que importa en la mayoría de los equipos caseros', 'lo que importa en la mayoría de los estudios caseros');
swap('Los monitores activos mantienen el amplificador adaptado a los transductores', 'Los monitores activos llevan el amplificador adaptado a los transductores');
swap('El amplificador incorporado está afinado específicamente para el altavoz', 'El amplificador incorporado está ajustado específicamente para el altavoz');
// SEC1
swap('La guía de onda Image Control patentada de JBL crea un punto óptimo notablemente amplio',
  'La guía de onda Image Control patentada de JBL crea un punto ideal notablemente amplio');
swap('El woofer de 5 pulgadas con puerto Slip Stream ofrece graves ajustados y precisos que desmienten su tamaño modesto',
  'El woofer de 5 pulgadas con puerto Slip Stream ofrece graves ajustados y precisos que sorprenden para su tamaño modesto');
swap('Cada uno, son inmejorables para principiantes y habitaciones pequeñas', 'Sueltos, son inmejorables para principiantes y habitaciones pequeñas');
swap('Están entre las apuestas económicas más seguras en audio de estudio', 'Están entre las opciones económicas más seguras en audio de estudio');
// SEC2
swap('Kali Audio fue fundada por antiguos ingenieros de JBL que querían llevar el monitoreo económico aún más lejos',
  'Kali Audio fue fundada por antiguos ingenieros de JBL que querían llevar la monitorización económica aún más lejos');
swap('un monitor de 6,5 pulgadas con compensación de ecualización de límites que corrige los problemas de graves',
  'un monitor de 6,5 pulgadas con ecualización Boundary que compensa los problemas de graves');
swap('Los interruptores DIP en la parte trasera te permiten decirle al altavoz dónde está colocado',
  'Los interruptores DIP en la parte trasera te permiten indicarle al altavoz dónde está colocado');
// SEC3
swap('el puerto de graves frontal respira aunque esté pegado a la pared', 'el puerto de graves frontal responde aunque esté pegado a la pared');
swap('y el ecualizador DSP con corrección de sala reajusta el altavoz a tu escritorio en vez de pelearse con él',
  'y el ecualizador DSP con corrección de sala adapta el altavoz a tu escritorio en vez de pelearse con él');
swap('Ese procesamiento interno es lo diferencial: le dices dónde está colocado y compensa en lugar de dejarte adivinando',
  'Ese procesamiento interno es lo que lo distingue: le dices dónde está colocado y compensa sin hacerte adivinar');
swap('Incluso montados a pocos centímetros de la pared de un dormitorio, permiten lograr mezclas que trasladan bien a equipos grandes',
  'Incluso montados a pocos centímetros de la pared de un dormitorio, permiten lograr mezclas que se trasladan bien a equipos grandes');
swap('Antes de comprar, aprende su grave generoso y contrasta los bajos en auriculares',
  'Antes de comprar, conoce su grave generoso y contrasta los bajos en auriculares');
swap('Hecho para home studios pequeños que necesitan un monitoreo flexible y tolerante',
  'Hecho para home studios pequeños que necesitan una monitorización flexible y que perdone');
// SEC4
swap('los ingenieros tiran de los honestos conos blancos', 'los ingenieros recurren a los honestos conos blancos');
swap('Su woofer de 8 pulgadas con revestimiento de Kevlar baja de verdad sin subwoofer',
  'Su woofer de 8 pulgadas con cono de Kevlar baja de verdad sin subwoofer');
swap('porque una caja de 8 pulgadas carga una sala pequeña enseguida', 'porque una caja de 8 pulgadas satura una sala pequeña enseguida');
swap('Hecho para quien mezcla y quiere confianza de traducción por encima del halago',
  'Hecho para quien mezcla y quiere que sus mezclas se trasladen antes que el halago');
// SEC5
swap('El detalle vive en los transitorios, y justo ahí es donde caza este monitor',
  'El detalle vive en los transitorios, y justo ahí es donde brilla este monitor');
swap('Debajo, el woofer de 7 pulgadas con puerto sintonizado entrega graves profundos y controlados que desmienten el tamaño de la caja',
  'Debajo, el woofer de 7 pulgadas con puerto sintonizado ofrece graves profundos y controlados que sorprenden para el tamaño de la caja');
swap('Antes de comprar, prevé una colocación cuidadosa y algo de rodaje, porque un monitor revelador castiga la mala posición',
  'Antes de comprar, cuenta con una colocación cuidadosa y algo de rodaje, porque un monitor revelador castiga la mala posición');
// SEC6
swap('Cada driver está alimentado por su propio módulo en un sistema triamplificado de 140W, lo que significa headroom limpio y respuesta ultraplana sin que ningún driver haga doble trabajo',
  'Cada driver lo alimenta su propio módulo en un sistema triamplificado de 140 W, con headroom limpio y respuesta ultraplana sin que ningún driver trabaje de más');
swap('Es el monitor más preciso de esta guía y la puerta de entrada a la verdadera precisión de referencia profesional',
  'Es el monitor más preciso de esta guía y la vía de entrada a la verdadera precisión de referencia profesional');
// SEC7
swap('El Genelec 8010A demuestra que el monitoreo de grado de referencia no necesita una caja grande',
  'El Genelec 8010A demuestra que la monitorización de grado de referencia no necesita una caja grande');
swap('este nearfield de 3 pulgadas entrega la misma construcción de aluminio fundido',
  'este nearfield de 3 pulgadas ofrece la misma construcción de aluminio fundido');
swap('en un paquete que cabe en cualquier lado', 'en un paquete que cabe en cualquier sitio');
swap('y el gabinete sellado mantiene las resonancias fuera del sonido', 'y el gabinete sellado mantiene las resonancias a raya');
swap('Por unidad también es el más caro por driver de esta guía — pagas por precisión, no por volumen',
  'Por unidad, es el más caro por driver de esta guía: pagas por precisión, no por volumen');
// SEC8
swap('un nearfield de 4 pulgadas con el waveguide MMD de la serie 800 de Neumann y DSP que te permite ajustar',
  'un nearfield de 4 pulgadas con la guía de ondas MMD de la serie 800 de Neumann y DSP que te permite ajustar');
swap('Con el micrófono de medición MA 1 se autocorrige en minutos, aplanando la respuesta en tu posición de escucha — el arreglo más efectivo para los problemas de sala aparte del tratamiento acústico',
  'Con el micrófono de medición MA 1 se calibra solo en minutos, dejando plana la respuesta en tu posición de escucha: la solución más efectiva para los problemas de sala además del tratamiento acústico');
swap('Es la compra más inteligente si la precisión y la ajustabilidad importan más que el presupuesto',
  'Es la compra más inteligente si la precisión y la versatilidad importan más que el presupuesto');
// SEC9
swap('Dos woofers acústicamente ocultos trabajan a través de ranuras en los bordes del gabinete',
  'Dos woofers acústicamente ocultos emiten a través de ranuras en los bordes del gabinete');
swap('todo impulsado por 550W de potencia clase D (250W + 150W + 150W)',
  'todo impulsado por 550 W de potencia en clase D (250 W + 150 W + 150 W)');
swap('La calibración GLM AutoCal ajusta la respuesta a tu espacio, entregando de 38 Hz a 20 kHz dentro de ±1,5 dB',
  'La calibración GLM AutoCal ajusta la respuesta a tu espacio, con de 38 Hz a 20 kHz dentro de ±1,5 dB');
swap('Nada aquí iguala su imagen o consistencia, pero para un dormitorio sin tratar es dinero que no podrás oír',
  'Nada aquí iguala su imagen o consistencia, pero para un dormitorio sin tratar es dinero tirado');
// SEC10
swap('El Kali WS-6.2 añade subgraves genuinos a monitores pequeños sin adueñarse de tu sala',
  'El Kali WS-6.2 añade subgraves genuinos a monitores pequeños sin comerse tu sala');
swap('Dos woofers de 6,5 pulgadas de alta excursión opuestos horizontalmente cancelan mutuamente su vibración, así que el gabinete permanece quieto mientras un amplificador clase D de 400W (1000W pico) los impulsa hasta 120 dB',
  'Dos woofers de 6,5 pulgadas de alta excursión opuestos horizontalmente se cancelan entre sí, así que el gabinete no se mueve mientras un amplificador en clase D de 400 W (1000 W de pico) los impulsa hasta 120 dB');
swap('Los modos de cruce selecciónables de 80 Hz, LFE y externo más la inversión de polaridad le permiten mezclarse con casi cualquier monitor',
  'Los modos de cruce seleccionables de 80 Hz, LFE y externo, más la inversión de polaridad, le permiten integrarse con casi cualquier monitor');
swap('y el gabinete con puerto frontal apenas supera a un altavoz de 8 pulgadas',
  'y el gabinete con puerto frontal apenas es más grande que un altavoz de 8 pulgadas');
swap('Pero si tus monitores de 5 pulgadas se quedan sin graves, este es el arreglo honesto más compacto',
  'Pero si tus monitores de 5 pulgadas se quedan sin graves, esta es la solución honesta más compacta');
// SEC11
swap('Una unidad de graves con dos woofers opuestos de 4,5 pulgadas reposa en tu escritorio',
  'Una unidad de graves con dos woofers opuestos de 4,5 pulgadas va en tu escritorio');
swap('todo alimentado por 320W de clase D (100W por canal de graves, 60W por canal de satélite)',
  'todo alimentado por 320 W en clase D (100 W por canal de graves, 60 W por canal de satélite)');
swap('El inconveniente: es un sistema de escritorio, no monitores de sala — retrocede dos metros y la magia se disipa',
  'El inconveniente: es un sistema de escritorio, no monitores de sala; siéntate dos metros más atrás y la magia se disipa');
// CONCLUSION
swap('el Kali LP-6 V2 es el valor más inteligente con boundary EQ', 'el Kali LP-6 V2 es la compra más inteligente con Boundary EQ');
swap('La cinta X-ART del Adam A7V revela cada transitorio', 'La cinta X-ART del Adam A7V resuelve cada transitorio');
swap('el Kali IN-8 V2 acerca la precisión coaxial de 3 vías', 'el Kali IN-8 V2 pone al alcance la precisión coaxial de 3 vías');
swap('y el Neumann KH 80 DSP se ajusta solo a tu sala', 'y el Neumann KH 80 DSP se calibra solo para tu sala');
swap('>Guía de monitores económicos</a>', '>Mejores monitores de estudio por menos de $500</a>');
swap('>Guía de monitores profesionales</a>', '>ADAM S3H vs Focal Trio11 Be: monitores de tres vías</a>');
swap('>Guía de configuración de monitores</a>', '>Cómo configurar monitores de estudio para que suene igual</a>');
swap('>Guía de subwoofers de estudio</a>', '>Configurar un subwoofer de estudio: posición y calibración</a>');
swap('>Comparativa HS8 vs Rokit 7</a>', '>HS8 vs Rokit 7 G5: ¿cuál es honesto para mezclar?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
