const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-analog-mixers');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('La función estrella es la interfaz USB 4x4 de 24-bit/96kHz integrada', 'La función estrella es la interfaz USB 4x4 de 24 bits/96 kHz integrada');
swap('Cuatro previos SuperAnalogue con +72dB de ganancia manejan', 'Cuatro previos SuperAnalogue con +72 dB de ganancia manejan');
swap('Es una compra de inversión - y vale cada céntimo.', 'Es una compra de inversión, y vale cada céntimo.');
swap('>Mejores Mezcladores de Sonido en Vivo para Bandas y Eventos</a>', '>Mejores mezcladores de sonido para bandas y eventos</a>');
swap('>Mejores Mezcladores Digitales para Bandas y Sonido en Vivo</a>', '>Mejores mezcladores digitales: guía completa</a>');
swap('>Mejores Mezcladores Compactos para Bandas y Home Studios</a>', '>Mejores mezcladores Digitales de rack con control tablet</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
