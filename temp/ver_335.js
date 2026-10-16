const fs = require('fs');
const p = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const x = p.find(y => y.id === 335);
console.log(JSON.stringify(x, null, 1).slice(0, 900));
