const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-bass-under-700');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('mientras el perfil fino y el cuerpo ligero de fresno mantienen cómodos el piqueo rápido',
  'mientras el perfil fino y el cuerpo ligero de fresno mantienen cómodo el piqueo rápido');
swap('esta es tu opción tapada.', 'esta es tu opción oculta.');
swap('Con unas cinco libras y media cuelga durante horas sin cargar el hombro, y la escala corta de treinta pulgadas deja',
  'Con unos dos kilos y medio cuelga durante horas sin cargar el hombro, y la escala corta de 30 pulgadas deja');
swap('con unión de seis tornillos se siente rocoso y mantiene', 'con unión de seis tornillos se siente sólido como una roca y mantiene');
swap('Estos 8 bajos demuestran que la calidad excepcional está al alcance con calidad para directo y estudio, con construcción sólida',
  'Estos 8 bajos demuestran que la calidad excepcional está al alcance, con calidad para directo y estudio, construcción sólida');
swap('>Mejores Bajos Baratos Que Suenan Como Caros</a>', '>Bajos con mejor relación calidad-precio que suenan premium</a>');
swap('>Mejores Guitarras Acústicas</a>', '>Mejores guitarras acústicas: Martin, Taylor y Gibson</a>');
swap('>Los Mejores Bajos Fender para Cada Género</a>', '>Los mejores bajos Fender para cada género</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
