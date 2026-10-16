const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'ts9-vs-bd2');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('que funciona con amplis limpios y saturados.</strong> El mid-boost del Tube Screamer es más versátil',
  'que funciona con amplis limpios y saturados.</strong> El mid-boost del Tube Screamer lo hace versátil');
swap('<strong>Para principiantes,</strong> el TS9 es la mejor opción primera opción.',
  '<strong>Para principiantes,</strong> el TS9 es la mejor primera opción.');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
