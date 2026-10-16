const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'martin-d28-vs-taylor-314');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('son las dos guitarras acústicas más icónicas del mundo',
  'son las dos guitarras acústicas más icónicas del mundo.');
swap('La Martin D-28 es un cañón dreadnought con proyección potente y graves autoritarios, mientras que la Taylor 314ce Next Generation es más refinada, equilibrada y cómoda para sesiones largas. La Martin D-28 es un cañón. Su cuerpo dreadnought ofrece una proyección potente y graves autoritarios que llena habitaciones sin amplificación.',
  'La Martin D-28 es un cañón: su cuerpo dreadnought ofrece una proyección potente y graves autoritarios que llena habitaciones sin amplificación, mientras que la Taylor 314ce Next Generation es más refinada, equilibrada y cómoda para sesiones largas.');
swap('Compara la D-28 y la 314ce Next Generation con otras acústicas top en nuestra guía de la mejor guitarra eléctrica guía de la mejor guitarra para principiantes',
  'Compara la D-28 y la 314ce Next Generation con otras acústicas top en nuestra guía de las mejores guitarras acústicas y la guía de acústicas para principiantes');
swap('>guía de la mejor guitarra eléctrica</a>', '>Mejores guitarras acústicas: Martin, Taylor y Gibson</a>');
swap('>guía de la mejor guitarra para principiantes</a>', '>Mejores guitarras acústicas para principiantes: qué comprar</a>');
swap('>Mejores Guitarras Acústicas</a>', '>Mejores guitarras acústicas: Martin, Taylor y Gibson</a>');
swap('>Mejor Guitarra Eléctrica para Grabación Casera</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
swap('>Player Strat vs Pacifica</a>', '>Player Strat vs Yamaha Pacifica 112V: comparativa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
