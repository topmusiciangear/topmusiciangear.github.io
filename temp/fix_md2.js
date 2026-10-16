const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'martin-d28-vs-taylor-314');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('cómoda para sesiones largas.</strong> La Martin D-28 es un cañón. Su cuerpo dreadnought ofrece una proyección potente y graves autoritarios que llena habitaciones sin amplificación.',
  'cómoda para sesiones largas, con un cuerpo dreadnought que ofrece una proyección potente y graves autoritarios que llena habitaciones sin amplificación.</strong>');
swap('<a href=\\"/guides/best-electric-guitar_es.html\\" class=\\"guide-link-btn\\">Mejores guitarras acústicas: Martin, Taylor y Gibson</a>',
  '<a href=\\"/guides/acoustic-guitars-guide_es.html\\" class=\\"guide-link-btn\\">Mejores guitarras acústicas: Martin, Taylor y Gibson</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
