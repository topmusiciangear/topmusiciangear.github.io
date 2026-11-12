const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// 1. Cambiar score del SM58 de 8.9 a 9.4 en guide-scores.js
const gsPath = B + 'js/guide-scores.js';
let gs = fs.readFileSync(gsPath, 'utf8');
const oldScore = '   "Shure SM58": 8.9,';
const newScore = '   "Shure SM58": 9.4,';
if (gs.includes(oldScore)) {
  gs = gs.split(oldScore).join(newScore);
  fs.writeFileSync(gsPath, gs, 'utf8');
  console.log('✓ Score SM58: 8.9 → 9.4 en guide-scores.js');
} else {
  console.log('✗ Score SM58 NOT FOUND en guide-scores.js');
}

// 2. Actualizar desc del sE7 en products.json
const prodPath = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(prodPath, 'utf8'));
const se7 = products.find(p => p.id === 227);
if (se7) {
  se7.desc = 'Small-diaphragm cardioid condenser with fast transient response, ultra-low self-noise, and natural acoustic detail — ideal for acoustic guitar, piano, and drum overheads.';
  se7.desc_es = 'Condensador cardioide de pequeño diafragma con respuesta transitoria rápida, ruido propio ultra-bajo y detalle acústico natural — ideal para guitarra acústica, piano y overheads de batería.';
  fs.writeFileSync(prodPath, JSON.stringify(products, null, 2), 'utf8');
  console.log('✓ sE7 desc actualizado en products.json');
} else {
  console.log('✗ sE7 (id 227) NOT FOUND en products.json');
}
