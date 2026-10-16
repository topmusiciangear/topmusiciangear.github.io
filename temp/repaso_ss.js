const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'scarlett-vs-ssl');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('La Scarlett 2i2 te da 2 entradas, 2 salidas, y una salida de auriculares', 'La Scarlett 2i2 te da 2 entradas, 2 salidas y una salida de auriculares');
swap('Va directa a las salidas de auriculares para que puedas comunicarte', 'Va directo a las salidas de auriculares para que puedas comunicarte');
swap('Los conversores renovados de 24 bits y 192 kHz mantienen el detalle', 'Los conversores renovados de 24 bits/192 kHz mantienen el detalle');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
