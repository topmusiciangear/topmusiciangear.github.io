const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'open-headphones');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 70));
}
swap('class=\\"guide-link-btn\\" href=\\"/guides/best-headphones-for-mixing.html\\">Mejores auriculares para mezclar</a>',
  'class=\\"guide-link-btn\\" href=\\"/guides/best-headphones-for-mixing_es.html\\">Mejores auriculares para mezcla y masterización</a>');
swap('class=\\"guide-link-btn\\" href=\\"/guides/hd490-pro-vs-dt990.html\\">HD 490 Pro vs DT 990</a>',
  'class=\\"guide-link-btn\\" href=\\"/guides/hd490-pro-vs-dt990_es.html\\">HD 490 Pro vs DT 990 Pro: ¿abiertos para mezclar?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
