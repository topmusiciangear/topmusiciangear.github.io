const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'acoustic-guitars-guide');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Taylor redefine cómo se siente al tocar una acústica profesional', 'Taylor redefine cómo se siente tocar una acústica profesional');
swap('Una tapamaciza de Sitka maciza con fondo y costados', 'Una tapa maciza de Sitka con fondo y costados');
swap('El ángulo de mástil, el diapasón y la forma del grave son reconociblemente Martin',
  'El ángulo de mástil, el diapasón y la forma del cuerpo son reconociblemente Martin');
swap('el graves de un dreadnought puede dominar un arreglo fingerstyle', 'el grave de un dreadnought puede dominar un arreglo fingerstyle');
swap('por unos 3.500 $ de calle, que es otra conversación', 'por unos $3.500 de precio de calle, que es otra conversación');
swap('Un truss rod de titanio bidireccional resuelve', 'Un alma de titanio bidireccional resuelve');
swap('y las clavijas de metal líquido y el encolado con cola de cuero mantienen', 'y los pines de metal líquido y el encolado con cola caliente mantienen');
swap('cola de hueso', 'cola caliente');
swap('Tapa de secoya sinker sobre palisandro hondureño', 'Tapa de secuoya sinker sobre palisandro hondureño');
swap('La secoya sinker tiene una tapa más seca', 'La secuoya sinker tiene una tapa más seca');
swap('tapa de secoya sinker, refuerzos V-Class', 'tapa de secuoya sinker, refuerzos V-Class');
swap('Por unos 6.000 $ estás comprando la consistencia', 'Por unos $6.000 estás comprando la consistencia');
swap('si una 314ce de 4.000 $ o una 000-14 bien ajustada de 2.000 $ suena', 'si una 314ce de $4.000 o una 000-14 bien ajustada de $2.000 suena');
swap('Lo que pagas a unos 9.000 $ es el distintivo', 'Lo que pagas, unos $9.000, es el distintivo');
swap('La cola de cuero significa que responde a la humedad', 'La cola caliente significa que responde a la humedad');
swap('Por unos 5.000 $ compras un tono', 'Por unos $5.000 compras un tono');
swap('con fondo y costados de arce llama entrega una voz enorme', 'con fondo y costados de arce flameado entrega una voz enorme');
swap('El arce llama de fondo y costados no es una elección neutra', 'El arce flameado de fondo y costados no es una elección neutra');
swap('A unos 5.700 $ tiene precio de pieza de colección', 'A unos $5.700 tiene precio de pieza de colección');
swap('>guía de la mejor guitarra eléctrica</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
swap('>guía de guitarras Fender </a>', '>Las mejores guitarras Fender para cada género</a>');
swap('>Martin D-28 vs Taylor 314ce: ¿mejor acústica Pro?</a>', '>Martin D-28 vs Taylor 314ce: ¿mejor acústica?</a>');
swap('>Mejores guitarras Fender: Strat, Tele y más</a>', '>Las mejores guitarras Fender para cada género</a>');
swap('>Mejor guitarra eléctrica para cada Guitarrista</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
