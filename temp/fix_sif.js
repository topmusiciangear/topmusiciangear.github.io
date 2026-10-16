const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'streaming-interfaces');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('que enrute, procese y proteja', 'que encamine, procese y proteja');
// SEC0
swap('enrutar mezclas separadas', 'encaminar mezclas separadas');
swap('procesan y enrutan tu directo', 'procesan y encaminan tu directo');
// SEC2
swap('con el enrutamiento', 'con el encaminamiento');
swap('en un configuración de PlayStation', 'en una configuración de PlayStation');
// SEC4
swap('con cinco knobs corre', 'con cinco ruedas corre');
// SEC5
swap('favoreces voces y guitarra', 'favorece voces y guitarra');
// CONCLUSION
swap('para tu micófono', 'para tu micrófono');
swap('el resto del configuración', 'el resto de la configuración');
// CONCLUSION + anchors
swap('>Guía de las mejores interfaces de audio</a>', '>Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('>Mejores micrófonos USB</a>', '>Mejores micrófonos USB para streaming</a>');
swap('>Mezcladores y controladores para streaming</a>', '>Alternativas a Stream Deck y mejores mezcladores</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
