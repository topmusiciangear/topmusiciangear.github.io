const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const a = '"faq_a1_es": "Si compras un auricular pro';
console.log('anchor con key:', t.indexOf(a));
const b = 'silenciosas.",';
console.log('cola:', t.indexOf(b));
const full = a + t.slice(t.indexOf(a) + a.length, t.indexOf(a) + a.length + 200);
console.log(JSON.stringify(full.slice(0, 120)));