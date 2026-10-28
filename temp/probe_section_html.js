const fs = require('fs');
const h = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html', 'utf8');
const i = h.indexOf('store-buttons guide-section-buy');
console.log(h.slice(i - 200, i + 2600));
