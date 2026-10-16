const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const v = guides.find(x => x.id === 'vocal-plugins');
const s = v.sections.find(s => /Powerhouse/.test(s.heading || ''));
s.heading = 'RePitch 2 + VocAlign Pro Bundle: Pitch and Timing in One Purchase';
s.heading_es = 'RePitch 2 + VocAlign Pro Bundle: Afinación y Tiempo en Una Sola Compra';
// same fix inside conclusion/mentions if present
let str = JSON.stringify(v);
let n = 0;
[['The Complete Vocal Production Powerhouse', 'Pitch and Timing in One Purchase'],
 ['El Poder Completo de Producción Vocal', 'Afinación y Tiempo en Una Sola Compra']
].forEach(([a, b]) => { if (str.includes(a)) { str = str.split(a).join(b); n++; } });
const v2 = JSON.parse(str);
Object.keys(v).forEach(k => delete v[k]);
Object.assign(v, v2);
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('powerhouse swaps: ' + n);
