const fs = require('fs');
const t = fs.readFileSync('data/guides.json', 'utf8');
const start = t.indexOf('"id": "best-nylon-guitars-for-beginners"');
const i = t.indexOf('"heading": "Taylor Academy 12e-N', start);
const j = t.indexOf('"pros": [', i);
console.log(t.slice(i, j));
