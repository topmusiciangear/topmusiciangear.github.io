const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'bridge-cast-x-vs-rodecaster-pro2');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('solo la herramienta ideal para cada tipo de creador',
  'solo la herramienta ideal para cada tipo de creador.');
swap('Cuatro entradas combo Neutrik alimentan previos Revolution de 76dB que mueven',
  'Cuatro entradas combo Neutrik alimentan previos Revolution de 76 dB que mueven');
swap('ajustadas con perillas rápidas en plena partida, mientras', 'ajustadas con ruedas rápidas en plena partida, mientras');
swap('Una entrada XLR con phantom de 48V acoge un micro serio', 'Una entrada XLR con phantom de 48 V acoge un micro serio');
swap('y los previos Revolution de 76dB (-131,5dBV EIN) se mantienen silenciosos',
  'y los previos Revolution de 76 dB (-131,5 dBV EIN) se mantienen silenciosos');
swap('Los compradores lo valoran con 4.4/5 en 1,285 reseñas.', 'Los compradores lo valoran con 4,4/5 en 1.285 reseñas.');
swap('Cuatro entradas XLR, 76dB de ganancia limpia, APHEX en hardware', 'Cuatro entradas XLR, 76 dB de ganancia limpia, APHEX en hardware');
swap('En ruteo de doble PC hay empate: ambos manejan bien', 'En encaminamiento de doble PC hay empate: ambos manejan bien');
swap('cuatro entradas XLR, previos Revolution de 76dB, APHEX en hardware', 'cuatro entradas XLR, previos Revolution de 76 dB, APHEX en hardware');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
