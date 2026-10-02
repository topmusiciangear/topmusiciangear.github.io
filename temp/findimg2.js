const fs = require('fs');
const h = fs.readFileSync('temp/spacedout.html', 'utf8');
const re = /<img[^>]*spaced[^>]*>/gi;
let m; let n = 0;
while ((m = re.exec(h)) && n < 6) { console.log(m[0].slice(0, 600)); console.log('---'); n++; }
