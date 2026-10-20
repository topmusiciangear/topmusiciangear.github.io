const fs = require('fs');
const s = fs.readFileSync('guides/best-monitors.html', 'utf8');
const re = /class="guide-product-card-img[^"]*"[^>]*><img src="([^"]+)"/g;
let m, c = 0;
while ((m = re.exec(s)) && c < 8) { console.log(m[1]); c++; }
console.log('---');
const hero = s.match(/class="guide-detail-img[^"]*"[^>]*><img src="([^"]+)"/);
console.log('hero:', hero && hero[1]);
