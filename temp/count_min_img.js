const fs = require('fs');
const s = fs.readFileSync('js/app.min.js', 'utf8');
const re = /image:t\.img/g;
let m, n = 0;
while ((m = re.exec(s))) { n++; console.log('pos', m.index, '...' + s.slice(Math.max(0, m.index - 60), m.index + 20) + '...'); }
console.log('total:', n);
