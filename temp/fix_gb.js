const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'guitar-bass-amps');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Un amplificador moldea el tono tanto como la guitarra o bajo.', 'Un amplificador moldea el tono tanto como la guitarra o el bajo.');
swap('Los combos de esta guía lo resuelven a la moderna', 'Los combos de esta guía lo resuelven a lo moderno');
swap('Los dobles altavoces de 10\\" (en el Rumble 500 y el Markbass CMD 102 P V) favorecen', 'Los dobles altavoces de 10 pulgadas (en el Rumble 500 y el Markbass CMD 102 P V) favorecen');
swap('pueden fallar con el Si grave a volumen de escenario, sonando comprimido o ahogado.',
  'pueden fallar con el Si grave a volumen de escenario, sonando comprimidos o ahogados.');
swap('El Ampeg Rocket Bass RB-115 trae el grind familia SVT', 'El Ampeg Rocket Bass RB-115 trae el grind familiar SVT');
swap('(200W con cab. de extensión / 100W solo)', '(200 W con cab. de extensión / 100 W solo)');
swap('(200W con cab. de extensión, 100W solo);', '(200 W con cab. de extensión, 100 W solo);');
swap('(500W con cab. de extensión, 350W solo).', '(500 W con cab. de extensión, 350 W solo).');
swap('(300W solo, 500W con extensión).', '(300 W solo, 500 W con extensión).');
swap('el punto débil del Katana 50 estándar era el control en escenario — el EX lo solucióna.',
  'el punto débil del Katana 50 estándar era el control en escenario: el EX lo soluciona.');
swap('mantiene la fórmula de 50W y añade', 'mantiene la fórmula de 50 W y añade');
swap('El ampli entrega 100W solo y 200W con una cabina de extensión', 'El ampli entrega 100 W solo y 200 W con una cabina de extensión');
swap('30 vatios de verdadero estéreo (15W + 15W)', '30 vatios de verdadero estéreo (15 W + 15 W)');
swap('compatible con el transmisor opciónal Line 6 G10T', 'compatible con el transmisor opcional Line 6 G10T');
swap('batería recargable opciónal y 50 vatios (frente a 40W del Spark 1)', 'batería recargable opcional y 50 vatios (frente a 40 W del Spark 1)');
swap('>Mejores amplis de práctica</a>', '>Mejores amplificadores de práctica para casa</a>');
swap('>Mejores amplis de bajo</a>', '>Mejores amplificadores de bajo para cada músico</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
