const fs = require('fs');
const h = fs.readFileSync('guides/best-bass-practice-amps.html', 'utf8');
const i = h.indexOf('guide-section-mediabuy', h.indexOf('Spark MINI the Best'));
const seg = h.slice(i, i + 20000);
const j = seg.indexOf('shop-more-list');
console.log(seg.slice(j, j + 6000).replace(/<svg[\s\S]*?<\/svg>/g, '[svg]').replace(/\s+/g, ' '));