const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-electric-guitar');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('La contrapartida.</strong> 2.299 $ es precio', 'La contrapartida.</strong> $2.299 es precio');
swap('href=\\"/guides/american-pro-vs-les-paul.html\\">American Pro II vs Les Paul \'60s</a>',
  'href=\\"/guides/american-pro-vs-les-paul_es.html\\">American Pro II vs Les Paul \'60s: duelo de guitarras pro</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
