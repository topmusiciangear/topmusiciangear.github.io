const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
let i = src.indexOf('.guide-products-cards');
let count = 0;
while (i > -1 && count < 10) {
  console.log('--- at ' + i + ' ---');
  console.log(src.slice(Math.max(0, i - 200), i + 500));
  i = src.indexOf('.guide-products-cards', i + 1);
  count++;
}