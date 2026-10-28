const fs = require('fs');
const t = fs.readFileSync('data/guides.json', 'utf8');
const i = t.indexOf('"best-nylon-guitars-for-beginners"');
const j = t.indexOf('"productTable"', i);
const k = t.indexOf('"faq"', j);
console.log(t.slice(j, k));
