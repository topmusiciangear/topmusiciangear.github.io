const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = B + 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');

const pos = s.indexOf('guide-product-card-img"><img src="${(p.img||');
if (pos >= 0) {
  const chunk = s.slice(pos, pos + 500);
  fs.writeFileSync(B + 'temp/chunk.txt', chunk);
  console.log('Found at pos:', pos);
  console.log('First 200 chars:');
  console.log(chunk.slice(0, 200));
  console.log('---');
  console.log('Last 200 chars:');
  console.log(chunk.slice(-200));
} else {
  console.log('Not found');
}