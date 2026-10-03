const fs = require('fs');
const h = fs.readFileSync('guides/best-bass-practice-amps.html', 'utf8');
const i = h.indexOf('Spark MINI');
console.log('idx:', i);
if (i > -1) {
  const seg = h.slice(i, i + 6000);
  const g = seg.indexOf('695I');
  console.log('695I within 6000 chars:', g > -1);
  const gm = seg.indexOf('gear4music');
  console.log('gear4music within 6000 chars:', gm > -1);
  if (gm > -1) console.log(seg.slice(Math.max(0, gm - 300), gm + 200).replace(/\s+/g, ' '));
}