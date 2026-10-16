const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'rodecaster-pro2-vs-dlz-creator');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('porque resuelven problemas muy distintos por el mismo dinero',
  'porque resuelven problemas muy distintos por el mismo dinero.');
swap('previos Revolution de 76dB que mueven un SM7B sin booster', 'previos Revolution de 76 dB que mueven un SM7B sin booster');
swap('Su pantalla táctil de 5,5 pulgadas con retroalimentación háptica y encoder rotatorio se siente rápida',
  'Su pantalla táctil de 5,5 pulgadas con retroalimentación háptica y codificador rotatorio se siente rápida');
swap('Los compradores lo valoran con 4.4/5 en 1,285 reseñas, y la comunidad de RØDE es ruidosa por una razón.',
  'Los compradores lo valoran con 4,4/5 en 1.285 reseñas, y la comunidad de RØDE es activa por una razón.');
swap('cuatro previos Onyx80 con hasta 80dB de ganancia, nueve faders profesionales de 100mm,',
  'cuatro previos Onyx80 con hasta 80 dB de ganancia, nueve faders profesionales de 100 mm,');
swap('el RØDECaster Pro II es el cerebro más seguro y fiable gracias a su diseño hardware-first y su ruteo de doble PC.',
  'el RØDECaster Pro II es el cerebro más seguro y fiable gracias a su diseño que prioriza el hardware y su encaminamiento de doble PC.');
swap('El RØDECaster Pro II gana si la fiabilidad y el ruteo de doble PC no son negociables',
  'El RØDECaster Pro II gana si la fiabilidad y el encaminamiento de doble PC son imprescindibles');
swap('>duelo Elgato Stream Deck + XL vs Razer Stream Controller</a>', '>Elgato Stream Deck vs Razer Stream Controller</a>');
swap('>guía de mejores controladores y mezcladores de streaming</a>', '>Alternativas a Stream Deck y mejores mezcladores</a>');
swap('>de mejores mezcladores digitales</a>', '>Mejores mezcladores digitales: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
