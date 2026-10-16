const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-ribbon-mics');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('desde los Beatles hasta las producciones pop y de vinilo de hoy',
  'desde los Beatles hasta las producciones pop actuales');
// SEC5
swap('Los ribbon pasivos susurran donde las etapas de ganancia modernas piden conversación, y el VR2 responde con músculo integrado',
  'Los ribbon pasivos susurran donde las etapas de ganancia modernas piden más nivel, y el VR2 responde con músculo integrado');
swap('lleva un previo interno que eleva la salida y esquiva las penurias de nivel de los diseños pasivos',
  'lleva un previo interno que eleva la salida y evita los problemas de nivel de los diseños pasivos');
swap('La voz busca respuesta extendida en agudos, dibujando un carácter ribbon más abierto y contemporáneo',
  'La respuesta en agudos es más extendida, dibujando un carácter ribbon más abierto y contemporáneo');
swap('Técnicos tras suavidad ribbon sin pelear con señales débiles o agudos apagados se adaptan rápido',
  'Los técnicos que buscan suavidad ribbon sin luchar con señales débiles o agudos apagados se adaptan rápido');
swap('Los tradicionalistas del ribbon tras dulzura vintage quizá encuentren la apertura menos crepuscular que los pasivos clásicos',
  'Los tradicionalistas del ribbon que buscan dulzura vintage quizá encuentren la apertura menos cálida que los pasivos clásicos');
// SEC6
swap('donde la captura enfocada importa más que el floreo ambiental',
  'donde la captura enfocada importa más que el ambiente de sala');
swap('Técnicos en salas modestas tras tono ribbon sin levantar tabiques ganan un aliado honesto',
  'Los técnicos en salas modestas que buscan tono ribbon sin tratamiento acústico ganan un aliado honesto');
swap('Enmarcado como soluciónador direccional de esta selección ribbon, el diseño cambia amplitud por control con plena intención',
  'Enmarcado como solución direccional de esta selección ribbon, el diseño cambia amplitud por control con plena intención');
// CONCLUSION + anchors
swap('La Beyerdynamic M 160 se destaca sola con su patrón hipercardioide, resolviendo problemas de aislamiento que los ribbon figura-8 no logran resolver',
  'La Beyerdynamic M 160 se destaca sola con su patrón hipercardioide, resolviendo problemas de aislamiento que los ribbon en figura-8 no logran resolver');
swap('>Mejores micrófonos condensadores para estudio</a>', '>Mejores micrófonos condensadores profesionales</a>');
swap('>Los 23 mejores micrófonos económicos XLR</a>', '>Mejores micrófonos XLR económicos para estudio</a>');
swap('>Mejor micrófono para voces y home studio</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
