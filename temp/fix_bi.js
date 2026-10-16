const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-interface');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// SEC0
swap('estás pagando por confiabilidad y calidad', 'estás pagando por fiabilidad y calidad');
// SEC3
swap('Grabar color analógico compromete', 'Grabar con color analógico compromete');
// SEC8
swap('El iD14 MkII pones dos previos', 'El iD14 MkII pone dos previos');
// CONCLUSION + anchors
swap('>mejores interfaces por menos de $300</a>', '>Mejores interfaces de audio por menos de $300</a>');
swap('>mejores interfaces portátiles</a>', '>Mejores interfaces de audio portátiles: guía completa</a>');
swap('>mejores interfaces para streaming</a>', '>Mejores interfaces para streaming y podcast: guía completa</a>');
swap('>comparativa Scarlett vs SSL</a>', '>Scarlett 2i2 vs SSL 2+: ¿mejores previos para voces en casa?</a>');
swap('>kit de inicio para estudio casero</a>', '>Construyendo tu home studio: 3 niveles para cada presupuesto</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
