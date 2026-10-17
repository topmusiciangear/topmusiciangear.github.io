const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const h = fs.readFileSync(B + 'guides/best-piano-keyboard-vsts.html', 'utf8');
// como se emite la imagen en la card
const i = h.indexOf('guide-product-card-title">MeldaProduction MeldwayGrand');
console.log('--- 1200 chars ANTES del h3 ---');
console.log(h.slice(Math.max(0, i - 1200), i).replace(/\s+/g, ' '));
console.log('\n--- bloque de datos del producto (JSON embebido) ---');
const j = h.indexOf('"id":1013');
if (j > -1) console.log(h.slice(j - 40, j + 700).replace(/\s+/g, ' '));
else {
  const k = h.indexOf('1013');
  console.log('sin bloque JSON; primeras ocurrencias de 1013:');
  let c = 0, p = -1;
  while ((p = h.indexOf('1013', p + 1)) > -1 && c < 5) { console.log('  ...' + h.slice(p - 120, p + 160).replace(/\s+/g, ' ')); c++; }
}