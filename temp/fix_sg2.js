const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'slg200s-vs-gs-mini');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Las comparé para la vida de home office: silencio, sonido, comodidad', 'Las pongo frente a frente para la vida teletrabajando: silencio, sonido, comodidad');
swap('Si solo pudiera quedarme una en el escritorio, la Mini por placer', 'Si solo cupiera una en el escritorio, la Mini por placer');
swap('>Mejores guitarras para home office</a>', '>Mejores guitarras para trabajar desde casa</a>');
swap('>Guía de guitarras acústicas</a>', '>Mejores guitarras acústicas: Martin, Taylor y Gibson</a>');
swap('>Mejores guitarras acústicas para principiantes</a>', '>Mejores guitarras acústicas para principiantes: qué comprar</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
