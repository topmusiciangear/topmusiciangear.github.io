const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-interface');
let S = JSON.stringify(gg);
let n = 0;
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 50)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
  console.log('  ok (' + (S.split(a).length - 1) + ') ' + a.slice(0, 60));
}
swap('>Mejores Interfaces Portátiles</a>', '>Mejores interfaces de audio portátiles: guía completa</a>');
swap('<strong>Conviene saber los límites.</strong> Dos entradas analógicas sin expansión ADAT descartan baterías y bandas',
  '<strong>Conoce los límites:</strong> dos entradas analógicas sin expansión ADAT descartan baterías y bandas');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
