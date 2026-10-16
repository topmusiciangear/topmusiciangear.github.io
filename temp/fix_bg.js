const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'beginner-guitar');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('acción alta significa dedos adoloridos y notas difíciles', 'acción alta significa dedos doloridos y notas difíciles');
swap('pero es confiable, se mantiene afinada y suena bien.', 'pero es fiable, se mantiene afinada y suena bien.');
swap('>Mejores guitarras acústicas para principiantes</a>', '>Mejores guitarras acústicas para principiantes: qué comprar</a>');
swap('>Guía de mejores guitarras eléctricas para principiantes</a>', '>Mejores guitarras eléctricas para principiantes: qué comprar</a>');
swap('>Player Strat vs Pacifica</a>', '>Player Strat vs Yamaha Pacifica 112V: comparativa</a>');
swap('Fender CN-60S: cuerdas de nailon en un mástil de cuerda de acero', 'Fender CN-60S: cuerdas de nailon en un mástil de guitarra de cuerdas de acero');
swap('Veintiún trastes en arce, escala de 25,5 pulgadas', 'Veintiún trastes con diapasón de arce, escala de 25,5 pulgadas');
swap('con 3,4 kilos que equilibran en correa y rodilla.', 'con 3,4 kilos que se equilibran en correa y rodilla.');
swap('Las voces dedicadas al metal o al jazz pedirán con el tiempo herraje más específico',
  'Quienes se dediquen al metal o al jazz pedirán con el tiempo herraje más específico');
swap('Mimarla en el puente compensa, porque el uso bravo de la palanca', 'Ser suave en el puente compensa, porque el uso bravo de la palanca');
swap('monta un par de humbuckers pegonas sobre un cuerpo ligero', 'monta un par de humbuckers contundentes sobre un cuerpo ligero');
swap('Los púas fuertes también notarán que desafina antes.', 'Las púas fuertes también notarán que desafina antes.');
swap('>mejores guitarras eléctricas para principiantes</a>', '>Mejores guitarras eléctricas para principiantes: qué comprar</a>');
swap('>guía de guitarras acústicas</a>', '>Mejores guitarras acústicas: Martin, Taylor y Gibson</a>');
swap('>mejores guitarras eléctricas</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
