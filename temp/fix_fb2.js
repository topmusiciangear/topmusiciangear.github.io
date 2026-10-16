const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'fender-bass-guide');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('Mejor para:</strong> Rock, punk, Motown, country, classic rock, reggae.', 'Mejor para:</strong> rock, punk, Motown, country, rock clásico, reggae.');
swap('Mejor para:</strong> Funk, R&B, Latin jazz, fusión, soul, neo-soul, gospel.', 'Mejor para:</strong> funk, R&B, latin jazz, fusión, soul, neo-soul, gospel.');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
