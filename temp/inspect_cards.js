const fs = require('fs');
const file = process.argv[2] || 'guides/at2020-vs-p120.html';
const h = fs.readFileSync(file, 'utf8');
const i = h.indexOf('<div class="guide-products-grid"');
const j = h.indexOf('</section>', i);
const seg = h.slice(i, j);
console.log('cards section length:', seg.length);
console.log(seg.replace(/<svg[\s\S]*?<\/svg>/g, ' [svg] ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 5000));
