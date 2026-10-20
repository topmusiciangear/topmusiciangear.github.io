const fs = require('fs');
const h = fs.readFileSync('guides/best-studio-monitors-under-150.html', 'utf8');
const imgs = [...h.matchAll(/class="guide-product-card-img"[\s\S]{0,400}?<img[^>]+src="([^"]+)"/g)].map(m => m[1]);
console.log(imgs.slice(0, 8).join('\n'));
const i = h.indexOf('guide-product-card-img');
console.log('\nmarkup sample:\n' + h.slice(i - 120, i + 420));
