const fs = require('fs');
const s = fs.readFileSync('data/products.json', 'utf8');
const i = s.indexOf('"id": 163,');
console.log(JSON.stringify(s.slice(i - 80, i + 1500)).replace(/\\n/g, '\n').slice(0, 2200));
