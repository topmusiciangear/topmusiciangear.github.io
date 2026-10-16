const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-headphones');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('El HD 490 Pro Plus suma a eso drivers ultrap precisos', 'El HD 490 Pro Plus suma a eso drivers ultraprecisos');
swap('Semiabierto por cacahuetes: ¿es el Samson SR850 la mejor relación calidad-precio?',
  'Semiabierto por cuatro duros: ¿es el Samson SR850 la mejor relación calidad-precio?');
swap('href=\\"/guides/budget-headphones.html\\">Mejores auriculares menos de $150</a>',
  'href=\\"/guides/budget-headphones_es.html\\">Mejores auriculares de estudio por menos de $150</a>');
swap('href=\\"/guides/best-headphones-for-mixing.html\\">Mejores auriculares para mezclar</a>',
  'href=\\"/guides/best-headphones-for-mixing_es.html\\">Mejores auriculares para mezcla y masterización</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
