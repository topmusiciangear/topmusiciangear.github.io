const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'stage-wedges');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('El conjunto coaxial de 12\\\"/1,75\\\" comparte', 'El conjunto coaxial de 12/1,75 pulgadas comparte');
swap('Un amplificador Class-D de 1000W dinámicos mueve un driver coaxial de 12\\\"/1,75\\\"',
  'Un amplificador en Clase D de 1.000 W dinámicos alimenta un driver coaxial de 12/1,75 pulgadas');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
