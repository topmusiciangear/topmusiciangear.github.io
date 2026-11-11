const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
let lines = fs.readFileSync(p, 'utf8').split('\n');
// Remove the bad line (index 36133)
lines.splice(36133, 1);
fs.writeFileSync(p, lines.join('\n'));
console.log('done');
