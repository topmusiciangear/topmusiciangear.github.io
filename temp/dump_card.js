const fs = require('fs');
const h = fs.readFileSync('guides/best-digital-pianos.html', 'utf8');
const i = h.indexOf('<h2', h.indexOf('Best Console Digital Pianos with Furniture'));
const j = h.indexOf('guide-product-card', i);
console.log('--- section container ---');
console.log(h.slice(Math.max(0, j - 900), j + 300));
console.log('\n--- first card full (to stores) ---');
const k = h.indexOf('<div class="guide-product-card-stores">', j);
console.log(h.slice(j, k + 200));
