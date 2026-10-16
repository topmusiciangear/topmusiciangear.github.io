const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-monitors-for-small-rooms');
let S = JSON.stringify(gg);
let n = 0;
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a); n++;
  console.log('  ok ' + a.slice(0, 60));
}
swap('biamplificados a 70W (45W + 25W)', 'biamplificados a 70 W (45 W + 25 W)');
swap('Firma sonora: </strong>Plana, directa y honesta hasta el extremo', 'Firma sonora: </strong>plana, directa y honesta hasta el límite');
swap('Limitaciones: </strong>Con 5 pulgadas, el woofer es pequeño', 'Limitaciones: </strong>con sus 5 pulgadas, el woofer es pequeño');
swap('biamplificados a 55W en Clase-D, entregando 54 Hz', 'biamplificados a 55 W en Clase D, entregando 54 Hz');
swap('Firma sonora: </strong>Plano y preciso en modo Mix — otra especie frente a los KRK antiguos',
  'Firma sonora: </strong>plano y preciso en modo Mix, otra historia frente a los KRK antiguos');
swap('Coloca trampas de graves de 4 pulgadas de grosor en tantas esquinas', 'Coloca trampas de graves de 4 pulgadas en tantas esquinas');
swap('>guía de los mejores auriculares de estudio</a>', '>Mejores auriculares de estudio: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
