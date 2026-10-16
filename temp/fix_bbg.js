const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'beginner-bass-guitars');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Sesiones cortas en mástil cómodo ganan a peleas largas con un bate.', 'Sesiones cortas en mástil cómodo ganan a peleas largas con un mástil tronco.');
swap('>Mejores bajos por menos de 700</a>', '>Mejores bajos por menos de $700</a>');
swap('>Guía de bajos Fender </a>', '>Los mejores bajos Fender para cada género</a>');
swap('>Guía de bajos Fender</a>', '>Los mejores bajos Fender para cada género</a>');
swap('Los bordes matados (presentes en varias elecciones de abajo)', 'Los bordes redondeados (presentes en varias elecciones de abajo)');
swap('este bajo delgado lo solucióna.', 'este bajo delgado lo soluciona.');
swap('El cuerpo ligero de madera y el mástil de arce lo mantienen ágil', 'El cuerpo ligero de tilo y el mástil de arce lo mantienen ágil');
swap('Escala corta de 30 pulgadas con mástil C de maple, cejuela estrecha', 'Escala corta de 30 pulgadas con mástil C de arce, cejuela estrecha');
swap('mientras el mástil fino de maple (más delgado que BBs anteriores)', 'mientras el mástil fino de arce (más delgado que BBs anteriores)');
swap('>comparativa P-Bass vs J-Bass</a>', '>P-Bass vs J-Bass: ¿cuál bajo Fender es el tuyo?</a>');
swap('>guía de bajos Fender</a>', '>Los mejores bajos Fender para cada género</a>');
swap('>bajos económicos que suenan premium</a>', '>Bajos con mejor relación calidad-precio que suenan premium</a>');
swap('>mejores bajos por debajo de $700</a>', '>Mejores bajos por menos de $700</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
