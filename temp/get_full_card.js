const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = B + 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');

const pos = s.indexOf('guide-product-card-img"><img src="${(p.img||');
const endPos = s.indexOf('</div>', pos);
console.log('pos:', pos, 'endPos:', endPos);
if (pos >= 0 && endPos >= 0) {
  const full = s.slice(pos, endPos + 6);
  fs.writeFileSync(B + 'temp/full_card.txt', full);
  console.log('Length:', full.length);
  console.log(full);
}