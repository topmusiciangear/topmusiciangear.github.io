const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-samplers-drum-computers');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('<strong>Autónomo o conectado, pads o teclas, con pantalla o sin ella — el sampler bueno se funde con tus hábitos.</strong>',
  '<strong>El sampler bueno se funde con tus hábitos.</strong>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
