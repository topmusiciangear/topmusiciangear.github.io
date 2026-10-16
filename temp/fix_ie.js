const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'ie900-vs-se846');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('La respuesta rápida: iE 900 vs SE846 gen 2', 'La respuesta rápida: IE 900 vs SE846 Gen 2');
swap('Su único driver dinámico TrueResponse de 7mm llega 5 Hz-48 kHz con 123 dB de SPL y',
  'Su único driver dinámico TrueResponse de 7 mm llega de 5 Hz a 48 kHz con 123 dB de SPL y 0,05 % de THD.');
swap('El driver dinámico TrueResponse de 7mm cubre 5 Hz-48 kHz con 123 dB de SPL y solo 0.05% de THD',
  'El driver dinámico TrueResponse de 7 mm cubre de 5 Hz a 48 kHz con 123 dB de SPL y solo 0,05 % de THD');
swap('(3,5mm no balanceado, 2,5mm y 4,4mm balanceados)', '(3,5 mm no balanceado, 2,5 mm y 4,4 mm balanceados)');
swap('para una respuesta de 15 Hz-20 kHz, y un filtro', 'para una respuesta de 15 Hz–20 kHz, y un filtro');
swap('el THD limpio del 0.05% y la carcasa fresada', 'el THD limpio del 0,05 % y la carcasa fresada');
swap('un solo driver TrueResponse de 7mm, respuesta de 5 Hz-48 kHz, 123 dB de SPL, 0.05% de THD',
  'un solo driver TrueResponse de 7 mm, respuesta de 5 Hz–48 kHz, 123 dB de SPL, 0,05 % de THD');
swap('>guía de mejores auriculares</a>', '>Mejores auriculares de estudio: guía completa</a>');
swap('href=\\"/guides/tracking-headphones_es.html\\">de mejores auriculares de mezcla</a>',
  'href=\\"/guides/best-headphones-for-mixing_es.html\\">Mejores auriculares para mezcla y masterización</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
