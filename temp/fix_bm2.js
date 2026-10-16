const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-microphone');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('Salta a la <a class=\\"guide-link-btn\\" href=\\"/guides/sm57-vs-sm58_es.html\\">SM57 vs SM58: ¿cuál para voz y amplis? (prueba real)</a>',
  'Lee nuestra <a class=\\"guide-link-btn\\" href=\\"/guides/sm57-vs-sm58_es.html\\">comparativa SM57 vs SM58: ¿cuál para voz y amplis? (prueba real)</a>');
swap('>Guía de mejores micrófonos de instrumento</a>', '>guía de mejores micrófonos de instrumento</a>');
swap('>Guía de mejores micrófonos ribbon</a>', '>guía de mejores micrófonos ribbon</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
