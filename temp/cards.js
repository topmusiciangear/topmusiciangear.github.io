const fs = require('fs');
const s = fs.readFileSync(process.argv[2], 'utf8');
const re = /<img[^>]*class="([^"]*guide-product-card-img[^"]*)"[^>]*src="([^"]+)"|<img[^>]*src="([^"]+)"[^>]*class="([^"]*guide-product-card-img[^"]*)"/g;
let m, n = 0;
while ((m = re.exec(s)) && n < 30) {
  const cls = m[1] || m[4];
  const src = m[2] || m[3];
  console.log((cls.includes('cutout') ? 'CUT  ' : 'PLAIN') + ' ' + src);
  n++;
}
console.log('total: ' + n);
