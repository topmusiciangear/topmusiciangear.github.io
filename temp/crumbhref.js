const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/fender-bass-guide_es.html', 'utf8');
const i = h.indexOf('guide-breadcrumb');
const seg = h.slice(i, i + 500);
const m = seg.match(/href="([^"]+)"/g) || [];
console.log(m.join(' '));