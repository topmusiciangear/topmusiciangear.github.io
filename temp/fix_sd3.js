const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'stream-deck-plus-xl-vs-razer');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Por qué el razer stream controller es la opción de valor', 'Por qué el Razer Stream Controller es la opción de valor');
swap('La respuesta rápida: stream deck + xL vs razer stream controller', 'La respuesta rápida: Stream Deck + XL vs Razer Stream Controller');
swap('El veredicto: teclas físicas vs control de adobe', 'El veredicto: teclas físicas vs control de Adobe');
swap('Uno te da 36 teclas LCD físicas más seis diales en el ecosistema', 'Uno te da 36 teclas LCD físicas más seis ruedas en el ecosistema');
swap('esto es lo que destaca de cada uno', 'esto es lo que destaca de cada uno.');
swap('una pared de teclas visibles al instante más diales reales, el Elgato', 'una pared de teclas visibles al instante más ruedas reales, el Elgato');
swap('una fila de seis diales táctiles y una tira táctil', 'una fila de seis ruedas táctiles y una tira táctil');
swap('Los diales funcionan como encoders de 360 grados con función de pulsación', 'Las ruedas funcionan como codificadores de 360 grados con función de pulsación');
swap('y Wave Link convierte los diales en una superficie de audio real.', 'y Wave Link convierte las ruedas en una superficie de audio real.');
swap('las reseñas de usuarios todavía son escasas (4.8/5 en 61 por ahora)', 'las reseñas de usuarios todavía son escasas (4,8/5 en 61 por ahora)');
swap('Su soporte integrado de la suite Adobe Creative es único a este precio, y es frecuente verlo rebajado muy por debajo del precio de lista.',
  'Su soporte integrado de la suite Adobe Creative es único a este precio, y es frecuente verlo rebajado muy por debajo del precio de lista.');
swap('seis diales analógicos táctiles que hacen clic como botones', 'seis ruedas analógicas táctiles que hacen clic como botones');
swap('Tiene 413 reseñas de usuarios con 4.2/5, y es frecuente verlo rebajado muy por debajo del precio de lista de.',
  'Tiene 413 reseñas de usuarios con 4,2/5, y es frecuente verlo rebajado muy por debajo del precio de lista.');
swap('una pared de teclas visibles al instante más diales reales, el Stream Deck', 'una pared de teclas visibles al instante más ruedas reales, el Stream Deck');
swap('El Razer Stream Controller es la opción de valor con soporte único de la suite Adobe Creative, y es frecuente verlo rebajado muy por debajo del precio de lista.',
  'El Razer Stream Controller es la opción de valor con soporte único de la suite Adobe Creative, y es frecuente verlo rebajado muy por debajo del precio de lista.');
swap('quieren 36 teclas físicas y seis diales en la biblioteca', 'quieren 36 teclas físicas y seis ruedas en la biblioteca');
swap('>duelo RØDECaster Pro II vs Mackie DLZ Creator</a>', '>RØDECaster Pro II vs DLZ Creator: ¿cuál gana?</a>');
swap('>guía de mejores controladores y mezcladores de streaming</a>', '>Alternativas a Stream Deck y mejores mezcladores</a>');
swap('>de mejores interfaces de streaming</a>', '>Mejores interfaces para streaming y podcast: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
