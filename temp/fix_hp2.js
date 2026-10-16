const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-headphones');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('Para quien mezcla atrapado entre los agudos fatigantes del DT 990 y el dinero insignia, el HD 600 es la referencia que terminó la búsqueda',
  'Para quien mezcla atrapado entre los agudos fatigantes del DT 990 y los presupuestos insignia, el HD 600 es la referencia que cerró la búsqueda');
swap('Entre los agudos fatigantes del DT 990 y el dinero insignia están los HD 600',
  'Entre los agudos fatigantes del DT 990 y los presupuestos insignia están los HD 600');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
