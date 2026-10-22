const fs = require('fs');
const file = process.argv[2] || 'guides/at2020-vs-p120.html';
const h = fs.readFileSync(file, 'utf8');
const grid = h.indexOf('<div class="guide-products-grid"');
const p120 = h.indexOf('AKG P120', grid);
const seg = h.slice(p120, h.indexOf('Write a review', p120));
const i = seg.indexOf('data-store="andertons"');
console.log(seg.slice(Math.max(0, i - 400), i + 1400));
