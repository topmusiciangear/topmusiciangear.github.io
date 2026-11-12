const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
let t = fs.readFileSync(p, 'utf8');

// Fix EN FAQ answer
const oldEn = '"faq_a2_en": "Buy the best guitar your budget allows. A $200–$300 guitar with a professional setup will play better than a guitar straight out of the box."';
const newEn = '"faq_a2_en": "Buy the best guitar from a reputable brand that your budget allows, ideally in the $150 to $300 range. That sweet spot gives you reliable tuning, smooth frets, and comfortable playability so you stick with practice."';
if (t.includes(oldEn)) { t = t.split(oldEn).join(newEn); console.log('✓ Fix EN: FAQ answer updated'); } else console.log('✗ Fix EN NOT FOUND');

// Fix ES FAQ answer
const oldEs = '"faq_a2_es": "Compra la mejor guitarra que tu presupuesto permita. Una guitarra de $200–$300 con ajuste profesional sonará mejor que una recién sacada de la caja."';
const newEs = '"faq_a2_es": "Compra la mejor guitarra de marca reconocida que te permita tu presupuesto, idealmente entre $150 y $300. En ese rango obtienes buena afinación, trastes bien terminados y comodidad suficiente para no abandonar en los primeros meses."';
if (t.includes(oldEs)) { t = t.split(oldEs).join(newEs); console.log('✓ Fix ES: FAQ answer updated'); } else console.log('✗ Fix ES NOT FOUND');

try { JSON.parse(t); console.log('✓ JSON parse OK'); } catch(e) { console.error('✗ JSON roto: ' + e.message); process.exit(1); }
fs.writeFileSync(p, t, 'utf8');
console.log('✓ data/guides.json actualizado');
