const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-mic-for-guitar-amps');
let S = JSON.stringify(gg);
const de = 'el <a href=\\"/guides/best-microphone_es.html\\" class=\\"guide-link-btn\\">SM57 se convirtió en el estándar para guitarra</a>';
const a = 'el SM57 se convirtió en el estándar para guitarra. Lee nuestra <a href=\\"/guides/best-microphone_es.html\\" class=\\"guide-link-btn\\">Mejor micrófono para voces y grabación casera: guía completa</a>';
if (!S.includes(de)) { console.log('FALLA'); }
else {
  S = S.split(de).join(a);
  console.log('ok');
  g[g.indexOf(gg)] = JSON.parse(S);
  fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
}
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
