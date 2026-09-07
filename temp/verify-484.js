const fs = require('fs');
const h = fs.readFileSync('guides/best-bass-amps.html', 'utf8');
let idx = 0, n = 0;
while ((idx = h.indexOf('B01HPGEY6W', idx)) !== -1) {
  n++;
  console.log('B01HPGEY6W occ', n, 'at', idx, ':', JSON.stringify(h.slice(idx - 80, idx + 30)));
  idx += 10;
}
console.log('---');
console.log('amazon search links for Crush (should be 0):');
let s = 0, i = 0;
while ((i = h.indexOf('s?k=Orange+Crush+Bass+50', i)) !== -1) { s++; i += 5; }
console.log(s);
console.log('--- $399.00 amazon price near 484 card:');
let p = h.indexOf('$399.00');
console.log('first $399.00 at', p, ':', JSON.stringify(h.slice(p - 30, p + 10)));