const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'js/guide-scores.js';
let t = fs.readFileSync(p, 'utf8');
const old = '"Mackie CR4.5": 9.8,';
const neu = '"Mackie CR4.5": 9.7,';
if (t.includes(old)) {
  t = t.split(old).join(neu);
  fs.writeFileSync(p, t, 'utf8');
  console.log('Score Mackie CR4.5: 9.8 -> 9.7');
} else {
  console.log('NOT FOUND');
}
