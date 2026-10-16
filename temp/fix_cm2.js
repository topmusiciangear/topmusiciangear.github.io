const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-condenser-mics');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('Rechazar los lados mientras capturas el frente y la parte trasera sirve para microfonías apretadas que necesitan control del sangrado',
  'Rechazar los lados mientras capturas el frente y la parte trasera sirve para microfonías apretadas que necesitan control de la fuga');
swap('(27,4 mV/Pa, 7 dBA de ruido, 140 dB SPL máximo)', '(27,4 mV/Pa, 7 dBA de ruido y 140 dB SPL máximo)');
swap('con realce de presencia sobre 5 kHz que adelanta las voces en la mezcla',
  'con un realce de presencia sobre 5 kHz que adelanta las voces en la mezcla');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
