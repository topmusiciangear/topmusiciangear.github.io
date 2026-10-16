const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-acoustic-guitars-for-beginners');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('estas son las siete que merecen tu dinero en 2026 — desde la económica', 'estas son las siete que merecen tu dinero — desde la económica');
swap('con fondo y aros de caoba aportando calidez debajo.', 'con fondo y aros de caoba que aportan calidez.');
swap('pide un ajuste para que las cejillas se sientan justas desde la primera semana', 'pide un ajuste para que las cejillas se sientan fáciles desde la primera semana');
swap('Revisa el equilibrio con correa de pie y que su voz compacta', 'Revisa el equilibrio con correa tocando de pie y que su voz compacta');
swap('Lo compuesto en sofás, trenes y playas con este tamaño llega intacto a casa', 'Lo que compongas en sofás, trenes y playas con este tamaño llega intacto a casa');
swap('la AW54 da en un punto medio genial.', 'la AW54 acierta en un punto medio genial.');
swap('y prevé humidificar si tu clima se seca.', 'y prevé usar humidificador si tu clima se seca.');
swap('Para tu primera acústica en 2026, compra la mejor guitarra', 'Para tu primera acústica, compra la mejor guitarra');
swap('>Mejores Guitarras Acústicas (Pro)</a>', '>Mejores guitarras acústicas: Martin, Taylor y Gibson</a>');
swap('>Mejores Guitarras para Principiantes y Composición</a>', '>Mejores guitarras para principiantes: guía para empezar</a>');
swap('>Mejor Guitarra Eléctrica para Principiantes</a>', '>Mejores guitarras eléctricas para principiantes: qué comprar</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
