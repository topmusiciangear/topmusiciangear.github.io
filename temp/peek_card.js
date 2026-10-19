const fs = require('fs');
const s = fs.readFileSync('guides/best-home-studio-speakers_es.html', 'utf8');
const i = s.indexOf('class="guide-product-card-img"');
console.log('--- PRIMER CARD (local) ---');
console.log(s.slice(i, i + 900));
