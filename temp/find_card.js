const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = B + 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');

const pos = s.indexOf('guide-product-card-img"><img src="');
console.log('pos:', pos);
if (pos >= 0) {
  console.log('found:', JSON.stringify(s.slice(pos, pos + 250)));
} else {
  console.log('not found, trying alternative...');
  const pos2 = s.indexOf('guide-product-card-img');
  if (pos2 >= 0) {
    console.log('found alt:', JSON.stringify(s.slice(pos2, pos2 + 300)));
  }
}