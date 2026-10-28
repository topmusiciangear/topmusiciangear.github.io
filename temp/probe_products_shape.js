const fs = require('fs');
const t = fs.readFileSync('data/products.json', 'utf8');
console.log(JSON.stringify(t.slice(0, 300)));
const i = t.indexOf('"id": 1058');
console.log('CTX:', JSON.stringify(t.slice(i - 150, i + 60)));
const j = t.indexOf('"id": 1059');
console.log('CTX2:', JSON.stringify(t.slice(j - 150, j + 40)));
