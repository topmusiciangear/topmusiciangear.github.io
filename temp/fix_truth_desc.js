const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

const rp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(rp, 'utf8'));
const p = products.find(x => x.id === 1049);
p.desc_es = 'Woofer de 3,5 pulgadas de fibra de vidrio y seda de 1 pulgada, 64 W en Clase D, con guía de ondas avanzada y ajustes a 70 Hz y 12 kHz.';
fs.writeFileSync(rp, JSON.stringify(products, null, 2), 'utf8');
console.log('desc ES corregida: ' + p.desc_es.length + ' car. -> ' + p.desc_es);

const rb = B + 'build-guides.js';
let s = fs.readFileSync(rb, 'utf8');
if (!/^  1049: \{/m.test(s)) {
  const entrada = '  1049: {\n    prices: {\n      amazon: "$147.00"\n    }\n  },\n';
  const i = s.indexOf('const TEST_SHOP_BTN = {');
  const pos = s.indexOf('\n', i) + 1;
  s = s.slice(0, pos) + entrada + s.slice(pos);
  fs.writeFileSync(rb, s, 'utf8');
  console.log('TEST_SHOP_BTN: entrada 1049 anadida (solo Amazon por ahora)');
}

// medida final de las 6 cards
console.log('\n=== MEDIDA FINAL DE LAS 6 DESCRIPCIONES ===');
const ids = [1042, 1043, 1046, 1047, 1048, 1049];
let ok = true;
ids.forEach(id => {
  const x = products.find(y => y.id === id);
  const bien = x.desc.length <= 145 && x.desc_es.length <= 145;
  if (!bien) ok = false;
  console.log('  ' + id + ' ' + x.title.padEnd(28) + 'EN=' + String(x.desc.length).padStart(4) + ' ES=' + String(x.desc_es.length).padStart(4) + (bien ? '  OK' : '  <-- larga'));
});
console.log(ok ? '  todas caben en 3 lineas' : '  HAY DESCripciones LARGAS');
