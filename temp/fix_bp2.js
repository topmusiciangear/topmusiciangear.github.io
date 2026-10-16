const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-bass-practice-amps');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Elegí el Positive Grid Spark MINI para la práctica portátil inteligente, el Yamaha THR30II como el amplificador',
  'Destacan el Positive Grid Spark MINI para la práctica portátil inteligente, el Yamaha THR30II como el amplificador');
swap('a través de un altavoz Special Design de 10\\" que cubre', 'a través de un altavoz Special Design de 10 pulgadas que cubre');
swap('Es el combo que recomiendo cuando un bajista quiere un solo amplificador', 'Es el combo que se recomienda cuando un bajista quiere un solo amplificador');
swap('y la salida de auriculares con respuesta con simulación de cabina cubren', 'y la salida de auriculares con respuesta y simulación de cabina cubren');
swap('y la batería integrada ofrece unas 3.5 horas de autonomía.', 'y la batería integrada ofrece unas 3,5 horas de autonomía.');
swap('40 vatios de contundencia a través de un altavoz de 10\\" con circuito', '40 vatios de contundencia a través de un altavoz de 10 pulgadas con circuito');
swap('>P-Bass vs J-Bass</a>', '>P-Bass vs J-Bass: ¿cuál bajo Fender es el tuyo?</a>');
swap('>Mejores Bajos para Principiantes</a>', '>Mejores bajos para principiantes: guía para empezar</a>');
swap('>Guía de Bajos Fender</a>', '>Los mejores bajos Fender para cada género</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
