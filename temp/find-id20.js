const fs = require('fs');
const d = fs.readFileSync('data/products.json', 'utf8');
const lines = d.split('\n');
let start = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"id": 20,') || lines[i].includes('"id":20,')) {
    start = i;
    break;
  }
}
if (start === -1) { console.log('NOT FOUND'); process.exit(); }
for (let i = start; i < start + 30 && i < lines.length; i++) {
  console.log((i + 1) + ': ' + lines[i]);
}
