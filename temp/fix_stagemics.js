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
swap('Los micros de abajo están entre los más fiables', 'Los micros de esta guía están entre los más fiables');
swap('rechazan la retroalimentación en escenarios ruidosos', 'rechazan el acople en escenarios ruidosos');
// SEC0
swap('un patrón de captación lo bastante cerrado para rechazar la retroalimentación en escenarios ruidosos',
  'un patrón de captación lo bastante cerrado para rechazar el acople en escenarios ruidosos');
swap('una salida lo bastante potente para imponerse en una mezcla densa',
  'una salida lo bastante potente para imponerse en una mezcla densa');
swap('y ganancia antes de retroalimentación, por eso la mayoría', 'y ganancia antes de acople, por eso la mayoría');
swap('ayudan a que tu voz destaque sin que el EQ del canal se convierta en un campo de batalla',
  'ayudan a que tu voz destaque sin que el ecualizador del canal se convierta en un campo de batalla');
// SEC1
swap('sigue siendo un micrófono muy usado para voces en vivo, valorado por su fiabilidad y su rechazo de la realimentación',
  'sigue siendo un micrófono muy extendido para voces en vivo, valorado por su fiabilidad y su rechazo al acople');
swap('rechaza la retroalimentación de los monitores de suelo', 'rechaza el acople de los monitores de suelo');
swap('alrededor de 5kHz', 'alrededor de 5 kHz');
swap('funciona con cualquier mesa, bodypack inalámbrico o interfaz',
  'funciona con cualquier mesa, transmisor de petaca o interfaz');
swap('No ganará concursos de belleza contra un condensador', 'No ganará concursos de belleza contra un condensador');
swap('la razón por la que ha vendido más que cualquier otro micrófono del planeta',
  'la razón por la que se ha vendido más que ningún otro micrófono del planeta');
// SEC2
swap('con más brillo en los medios para claridad vocal', 'con más brillo en los medios para claridad de voz');
// SEC3
swap('así que las voces suenan detalladas y al frente de la mezcla sin necesitar mucho EQ',
  'así que las voces suenan detalladas y al frente de la mezcla sin necesidad de mucho EQ');
// SEC4
swap('La respuesta de 40 Hz–18 kHz es suave y llena', 'La respuesta de 40 Hz a 18 kHz es suave y llena');
// SEC5
swap('dan un tono lleno y presente que se coloca maravillosamente frente a la banda',
  'dan un tono lleno y presente que se abre paso de maravilla frente a la banda');
swap('Los cabezas de cartel de giras mundiales lo usan', 'Las cabezas de cartel de giras mundiales lo usan');
swap('para un cantante cuya voz es todo el show, vale cada céntimo',
  'para un cantante cuya voz es todo el espectáculo, vale cada céntimo');
// SEC6
swap('para un gran vocal en vivo', 'para un gran micro de voz en vivo');
swap('la elección económica clásica que sigue funcionando cuando los micros baratos de marcas desconocidas ya se han deshecho',
  'la elección económica clásica que sigue funcionando cuando los micros baratos de marcas desconocidas ya han muerto');
// SEC7
swap('También es el micro más resistente al cupping: los cantantes que agarran la rejilla con ambas manos apenas cambian su respuesta',
  'También es el micro que menos sufre cuando el cantante cierra la rejilla con ambas manos: la práctica apenas altera su respuesta');
swap('para que haga de pad natural en la cápsula', 'para que actúe como pad natural en la cápsula');
// SEC8
swap('Con respuesta de 30 Hz en proximidad, captura la calidez vocal completa mientras se abre paso en la mezcla',
  'Con respuesta de 30 Hz en efecto proximidad, capta la calidez vocal completa mientras se abre paso en la mezcla');
// SEC9
swap('donde su rango medio a medida atraviesa toda una big band',
  'donde su medio a medida atraviesa toda una big band');
swap('Tener varios sale a cuenta: cuatro en el equipo de directo cubren casi cualquier duda de qué micro usar en el escenario',
  'Tener varios sale a cuenta: cuatro en el equipo de directo cubren casi cualquier duda de qué micrófono usar en el escenario');
// SEC10
swap('sin los dolores de cabeza del inalámbrico analógico', 'sin los dolores de cabeza del inalámbrico analógico');
swap('cuesta varias veces lo de un equipo SM58 con cable', 'cuesta varias veces más que un SM58 con cable');
// CONCLUSION
swap('sigue siendo la compra más inteligente del mundo del sonido en vivo',
  'sigue siendo la compra más inteligente del sonido en vivo');
swap('>Mejor micrófono para voces y grabación casera: guía completa</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
swap('href=\"/guides/best-dynamic-mics_es.html\"', 'href=\"/guides/best-mic-for-guitar-amps_es.html\"');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
