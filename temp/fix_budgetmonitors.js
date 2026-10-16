const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'budget-monitors');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('Estos son los mejores monitores asequibles que hacen que tu mezcla suene bien en cualquier sistema',
  'Estos son los mejores monitores asequibles con los que tu mezcla suena bien en cualquier sistema');
// SEC0
swap('Un altavoz económico con una respuesta de frecuencia honesta y uniforme te enseña a mezclar correctamente',
  'Un altavoz económico con una respuesta en frecuencia honesta y uniforme te enseña a mezclar correctamente');
swap('En una sala pequeña, un monitor de 5 pulgadas económico controlado y preciso supera a un altavoz de 7 pulgadas cuya salida no cabe en la sala',
  'En una sala pequeña, un monitor disciplinado de 5 pulgadas supera a un altavoz de 7 pulgadas cuya salida desborda la sala');
swap('Aprende los monitores con pistas de referencia', 'Conoce los monitores con pistas de referencia');
// SEC1
swap('El JBL 305P MkII (unos $298 el par) es el monitor que recomiendo cuando alguien dice \'quiero un gran sonido pero tengo un presupuesto muy ajustado. \'',
  'El JBL 305P MkII (unos $298 el par) es el monitor que recomendaría a quien dice «quiero un gran sonido pero tengo un presupuesto muy ajustado»');
swap('La guía de onda Image Control de JBL crea un punto óptimo notablemente amplio', 'La guía de onda Image Control de JBL crea un punto ideal notablemente amplio');
swap('El woofer de 5 pulgadas ofrece graves ajustados y precisos que desmienten su tamaño modesto',
  'El woofer de 5 pulgadas ofrece graves ajustados y precisos que sorprenden para su tamaño modesto');
swap('Las mezclas hechas con estos en habitaciones de hotel trasladan bien a los monitores principales',
  'Las mezclas hechas con estos en dormitorios trasladan bien a los monitores principales');
swap('Por el precio de un solo monitor de gama alta, obtienes un par estéreo que te enseñará cómo suena un buen monitoreo',
  'Por el precio de un solo monitor de gama alta, obtienes un par estéreo que te mostrará cómo suena una buena monitorización');
// SEC2
swap('Kali Audio fue fundada por antiguos ingenieros de JBL, y el LP-6 V2 demuestra que aprendieron exactamente lo que les faltaba a los monitores económicos',
  'La fundaron antiguos ingenieros de JBL, y el LP-6 V2 demuestra que aprendieron la lección que les faltaba a los monitores económicos');
swap('y los interruptores DIP de ecualización de límites compensan tu habitación — dile al altavoz si está en un escritorio',
  'y los interruptores DIP de ecualización Boundary corrigen tu habitación: indícale al altavoz si está en un escritorio');
// SEC3
swap('El KRK Rokit 7 G5 es el monitor de estudio más vendido para productores caseros, y la quinta generación es la mejor opción hasta ahora',
  'El KRK Rokit 7 G5 es el monitor de estudio más vendido para productores caseros, y la quinta generación es la mejor hasta la fecha');
swap('y — crucialmente — el ecualizador DSP incorporado con pantalla LCD te permite ajustar los altavoces para compensar tu sala',
  'y, lo más importante, el ecualizador DSP incorporado con pantalla LCD te permite ajustar los altavoces para compensar tu sala');
swap('Los graves son generosos, así que aprende su carácter y revisa las mezclas en otros sistemas',
  'Los graves son generosos, así que conoce su carácter y revisa las mezclas en otros sistemas');
// SEC4
swap('Al par, los Yamaha HS8 superan este presupuesto, pero merecen atención', 'En par, los Yamaha HS8 superan este presupuesto, pero merecen atención');
swap('Son directos de una manera que los KRK no lo son — si la mezcla suena bien en los HS8, suena bien en todas partes',
  'Son crudos de una manera que los KRK no: si la mezcla suena bien en los HS8, suena bien en todas partes');
swap('El woofer de 8 pulgadas ofrece extensión genuina de graves hasta 38Hz sin subwoofer',
  'El woofer de 8 pulgadas ofrece extensión genuina de graves hasta 38 Hz sin subwoofer');
swap('Los extra te compran un nivel de precisión que los KRK no pueden igualar del todo, y esa confianza en tu monitoreo no tiene precio',
  'Ese extra te compra un nivel de precisión que los KRK no pueden igualar del todo, y esa confianza en tu monitorización no tiene precio');
// SEC5 (= best-monitors sec6)
swap('Cada driver está alimentado por su propio módulo en un sistema triamplificado de 140W, lo que significa headroom limpio y respuesta ultraplana sin que ningún driver haga doble trabajo',
  'Cada driver lo alimenta su propio módulo en un sistema triamplificado de 140 W, con headroom limpio y respuesta ultraplana sin que ningún driver trabaje de más');
swap('Es el monitor más preciso de esta guía y la puerta de entrada a la verdadera precisión de referencia profesional',
  'Es el monitor más preciso de esta guía y la vía de entrada a la verdadera precisión de referencia profesional');
// SEC6 (= small-rooms sec5)
swap('Un woofer de 4,5 pulgadas de alta excursión y un tweeter de cúpula textil de 1 pulgada viven en un gabinete con puerto frontal',
  'Un woofer de 4,5 pulgadas de alta excursión y un tweeter de cúpula textil de 1 pulgada van montados en un gabinete con puerto frontal');
swap('con una guía de onda 3-D que amplía el punto óptimo de escucha', 'con una guía de onda 3-D que amplía el punto ideal de escucha');
swap('el puerto frontal permite colocarlo cerca de la pared sin graves falsos', 'el puerto frontal permite colocarlo cerca de la pared sin falsos graves');
swap('y la respuesta de ±3 dB empieza en 54 Hz, así que el sub-bass profundo sigue necesitando un sub',
  'y la respuesta de ±3 dB empieza en 54 Hz, así que los subgraves profundos siguen necesitando un sub');
// CONCLUSION
swap('¿Presupuesto ultra-ajustado? El JBL 305P MkII lidera su categoría de precio.¿Mejor relación calidad-precio?',
  '¿Presupuesto al límite? El JBL 305P MkII lidera su categoría de precio. ¿Mejor relación calidad-precio?');
swap('El Kali LP-6 V2 añade corrección de sala con ecualización de límites que ningún otro monitor económico ofrece',
  'El Kali LP-6 V2 trae corrección de sala con ecualización Boundary que ningún otro monitor económico ofrece');
swap('La fuente puntual coaxial del Kali IN-8 V2 te lleva hasta ahí', 'La fuente puntual coaxial del Kali IN-8 V2 te da eso');
swap('Seis monitores, seis niveles de precio — cada uno mejorará dramáticamente tus mezclas en comparación con auriculares o altavoces de consumo. Conócelos bien.',
  'Seis monitores, seis niveles de precio: cada uno mejorará notablemente tus mezclas frente a auriculares o altavoces de consumo. Dedícales tiempo.');
swap('>Mejores Monitores de estudio</a>', '>Mejores monitores de estudio: guía completa para cada sala</a>');
swap('>Mejor Configuración de Monitores y Calibración de Sala</a>', '>Cómo configurar monitores de estudio para que suene igual</a>');
swap('>HS8 vs Rokit 7 G5</a>', '>HS8 vs Rokit 7 G5: ¿cuál es honesto para mezclar?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
