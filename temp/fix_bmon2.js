const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'budget-monitors');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('es el monitor que recomendaría a quien dice', 'es el monitor que recomiendo a quien dice');
swap('La fundaron antiguos ingenieros de JBL, y el LP-6 V2 demuestra que aprendieron la lección que les faltaba a los monitores económicos',
  'Kali Audio la fundaron antiguos ingenieros de JBL, y el LP-6 V2 demuestra que aprendieron la lección: lo que les faltaba a los monitores económicos');
swap('Por el par, ofrecen una relación calidad-precio inmejorable', 'Por ese precio, ofrecen una relación calidad-precio inmejorable');
swap('En par, los Yamaha HS8 superan este presupuesto', 'El par de Yamaha HS8 supera este presupuesto');
swap('>guía de los mejores monitores de estudio</a>', '>Mejores monitores de estudio: guía completa para cada sala</a>');
swap('Para el escritorio de un apartamento pequeño, sin embargo, queda por debajo de casi toda la competencia compacta',
  'Para el escritorio de un apartamento pequeño, sin embargo, cuesta menos que casi toda la competencia compacta.');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
