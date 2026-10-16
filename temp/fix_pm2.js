const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'pro-mixers');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('contra la legendaria consola de sonido en vivo de Midas',
  'contra la legendaria consola de sonido en vivo de Midas.');
swap('con pantalla táctil de 7 pulgadas, procesamiento FPGA de 96kHz y funciones', 'con pantalla táctil de 7 pulgadas, procesamiento FPGA de 96 kHz y funciones');
swap('12 salidas, pantalla táctil de 7 pulgadas, procesamiento FPGA de 96kHz.', '12 salidas, pantalla táctil de 7 pulgadas, procesamiento FPGA de 96 kHz.');
swap('Gain Assistant establece niveles óptimos automáticamente y Feedback Assistant identifica y elimina feedback.',
  'Gain Assistant establece niveles óptimos automáticamente y Feedback Assistant identifica y elimina acoples.');
swap('40 canales de entrada, 17 faders motorizados de 100mm, 16 previos', '40 canales de entrada, 17 faders motorizados de 100 mm, 16 previos');
swap('>Mejores Mezcladores Analógicos para Bandas y Sonido en Vivo</a>', '>Mejores mesas de mezcla analógicas: control directo</a>');
swap('>Mejores Mezcladores Digitales para Bandas y Sonido en Vivo</a>', '>Mejores mezcladores digitales: guía completa</a>');
swap('>Mejores Mezcladores Compactos para Bandas y Home Studios</a>', '>Mejores mezcladores Digitales de rack con control tablet</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
