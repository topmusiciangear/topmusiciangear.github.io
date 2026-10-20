const fs = require('fs');
const h = fs.readFileSync('guides/beginner-bass-guitars_es.html', 'utf8');
const i = h.indexOf('guide-verdict-grid');
const seg = h.slice(i, i + 8000);
const names = seg.match(/verdict-product-name">([^<]+)/g) || [];
console.log('GRID ORDER:');
names.forEach((n, k) => console.log(' ' + (k + 1) + '. ' + n.split('>')[1]));
// paragraphs in verdict-text
const v = h.indexOf('verdict-text');
const vt = h.slice(v, h.indexOf('guide-verdict-grid', v));
const ps = vt.match(/<p>[\s\S]*?<\/p>/g) || [];
console.log('\nVERDICT PARAGRAPHS: ' + ps.length);
ps.forEach((p, k) => console.log(' ' + (k + 1) + '. ' + p.replace(/<[^>]+>/g, '').slice(0, 90)));
