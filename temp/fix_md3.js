const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'martin-d28-vs-taylor-314');
let S = JSON.stringify(gg);
const de = '<a href=\\"/guides/best-beginner-electric-guitar_es.html\\" class=\\"guide-link-btn\\">Mejores guitarras acústicas para principiantes: qué comprar</a>';
const a = '<a href=\\"/guides/best-acoustic-guitars-for-beginners_es.html\\" class=\\"guide-link-btn\\">Mejores guitarras acústicas para principiantes: qué comprar</a>';
if (!S.includes(de)) { console.log('FALLA'); }
else {
  S = S.split(de).join(a);
  console.log('ok');
  g[g.indexOf(gg)] = JSON.parse(S);
  fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
}
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
