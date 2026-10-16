const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'tracking-headphones');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('<strong>Compra dos pares en lugar de uno.</strong> El seguimiento normalmente significa que varias personas monitorean a la vez',
  '<strong>Compra dos pares en lugar de uno.</strong> Grabar normalmente significa que varias personas monitorizan a la vez');
swap('</p><p>Los modales para grabar son impecables: copas giratorias 90 grados para monitoreo a una oreja',
  '</p><p>El comportamiento grabando es impecable: copas giratorias de 90 grados para monitorización a una oreja');
swap('<p><strong>El trato honesto.</strong> Los dueños reportan fallos',
  '<p><strong>Las pegas honestas:</strong> los dueños cuentan fallos');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
