const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/stage-wireless.html', 'utf8');
const i = h.indexOf('id="sec-2"');
const j = h.indexOf('id="sec-3"');
const seg = h.slice(i, j);
console.log('mediabuy:', seg.includes('guide-section-mediabuy'));
console.log('buy:', seg.includes('guide-section-buy'));
console.log('imgs:', seg.includes('guide-section-imgs'));
console.log('len:', seg.length);