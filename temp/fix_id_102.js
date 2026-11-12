const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
let t = fs.readFileSync(p, 'utf8');
const old = '"featuredProducts": [103, 102, 68, 310, 458, 553, 459, 295, 554, 313]';
const neu = '"featuredProducts": [103, 465, 68, 310, 458, 553, 459, 295, 554, 313]';
if (t.includes(old)) {
  t = t.split(old).join(neu);
  fs.writeFileSync(p, t, 'utf8');
  console.log('featuredProducts id 102 -> 465');
} else {
  console.log('NOT FOUND');
}
// También en best-acoustic-guitars-for-beginners
const old2 = '"featuredProducts": [102, 68, 315, 460, 314, 316, 461]';
const neu2 = '"featuredProducts": [465, 68, 315, 460, 314, 316, 461]';
if (t.includes(old2)) {
  t = t.split(old2).join(neu2);
  fs.writeFileSync(p, t, 'utf8');
  console.log('best-acoustic-guitars-for-beginners featuredProducts id 102 -> 465');
} else {
  console.log('best-acoustic-guitars-for-beginners NOT FOUND');
}
