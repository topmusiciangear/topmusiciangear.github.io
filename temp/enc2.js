const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const i = t.indexOf('"faq_a1_es": "Si compras un auricular pro');
console.log(JSON.stringify(t.slice(i, i + 260)));