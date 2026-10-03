const fs = require('fs');
const h = fs.readFileSync('guides/best-bass-practice-amps.html', 'utf8');
const re = /data-store="gear4music"/g;
let m, c = 0;
while ((m = re.exec(h)) !== null && c < 40) { c++; }
console.log('gear4music rows:', c);
const i = h.indexOf('Spark Mini');
console.log('Spark Mini idx:', i);
if (i > -1) console.log(h.slice(Math.max(0, i - 300), i + 300).replace(/\s+/g, ' '));