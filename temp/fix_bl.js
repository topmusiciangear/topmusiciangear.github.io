const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'blx288-vs-ewd');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('mientras que el EW-D trae tecnología digital de última generación con control por app y 134 dB de rango dinámico',
  'mientras que el EW-D trae tecnología digital de última generación con control por app y 134 dB de rango dinámico.');
swap('que incluye dos transmisores PG58 handheld y un receptor doble rackable.',
  'que incluye dos transmisores PG58 de mano y un receptor doble en rack.');
swap('La banda UHF opera en bandas disponibles localmente con alcance hasta 300 pies (100 metros) en línea de vista.',
  'El UHF opera en bandas disponibles localmente con alcance hasta 100 metros (300 pies) con línea de vista.');
swap('Los PG58 son los transmisores incluidos. Tienen patrón cardioide y respuesta de frecuencia optimizada',
  'Los PG58 incluidos tienen patrón cardioide y respuesta de frecuencia optimizada');
swap('como una petaca SK con lavalier ME 2.', 'como una petaca SK con micro de solapa ME 2.');
swap('si necesitas dos micrófonos inalámbricos confiables con presupuesto ajustado.',
  'si necesitas dos micrófonos inalámbricos fiables con presupuesto ajustado.');
swap('ofrece confiabilidad analógica comprobada con simplicidad', 'ofrece fiabilidad analógica comprobada con simplicidad');
swap('>mejores sistemas de micrófonos inalámbricos</a>', '>Mejores sistemas de micrófono inalámbricos para escenario</a>');
swap('>mejores micrófonos de escenario</a>', '>Mejores micrófonos de escenario y directo</a>');
swap('>mejores micrófonos de estudio</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
