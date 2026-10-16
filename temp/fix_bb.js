const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-bass-amps');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('¿Cuáles son los mejores amplificadores de bajo modernos para tocar en vivo en 2026?',
  '¿Cuáles son los mejores amplificadores de bajo modernos para tocar en vivo?');
swap('a través de dos altavoces Custom10 y un tweeter de 1\\".', 'a través de dos altavoces Custom10 y un tweeter de 1 pulgada.');
swap('comprueba que su carácter encaja con tu gusto de pantalla.', 'comprueba que su carácter encaja con tu gusto de altavoz.');
swap('recorta brillo para un thump vintage o ábrelo para un slap moderno', 'recorta brillo para una pegada vintage o ábrelo para un slap moderno');
swap('es un combo de modelado de 60W con tres voces', 'es un combo de modelado de 60 W con tres voces');
swap('mete el cabezal Microtubes 500 de 500W Clase D en un 2x10', 'mete el cabezal Microtubes 500 de 500 W en Clase D en un 2x10');
swap('Uso a diario la entrada aux y la práctica con auriculares.', 'La entrada aux se usa a diario y la práctica con auriculares.');
swap('El Ampeg RB-210 es el combo Ampeg completo — 500W de potencia', 'El Ampeg RB-210 es el combo Ampeg completo: 500 W de potencia');
swap('el Boss Katana-110 Bass es un combo de modelado de 60W con efectos Boss', 'el Boss Katana-110 Bass es un combo de modelado de 60 W con efectos Boss');
swap('>P-Bass vs J-Bass</a>', '>P-Bass vs J-Bass: ¿cuál bajo Fender es el tuyo?</a>');
swap('>Mejores Bajos para Principiantes</a>', '>Mejores bajos para principiantes: guía para empezar</a>');
swap('>Guía de Bajos Fender</a>', '>Los mejores bajos Fender para cada género</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
