const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'american-pro-vs-les-paul');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('proporciona sustain infinito y un tono más grueso y comprimido.</strong> El mástil atornillado de la Strat le da su característico chasquido y articulación. Las notas son definidas y separadas. El set-neck de la Les Paul le da sustain durante días y un tono más grueso y comprimido.',
  'proporciona sustain durante días y un tono más grueso y comprimido, con notas definidas y separadas.</strong>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
