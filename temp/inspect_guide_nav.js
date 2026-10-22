const fs = require('fs');
const h = fs.readFileSync('guides/at2020-vs-p120_es.html', 'utf8');
const re = /<script[^>]*src="([^"]+)"/g;
let m;
console.log('--- scripts');
while ((m = re.exec(h))) console.log(m[1]);
console.log('--- nav');
const i = h.indexOf('<nav');
console.log(h.slice(i, i + 3000));
