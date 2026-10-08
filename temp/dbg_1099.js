const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-live-subwoofers.html', 'utf8');
const i = h.indexOf('data-store="musicstore"');
let n = 0, j = -1;
const hits = [];
while ((j = h.indexOf('1,099', j + 1)) >= 0 && n < 10) { hits.push(h.slice(Math.max(0, j - 200), j + 20).replace(/\n/g, ' ')); n++; }
console.log('1,099 hits:', n);
hits.forEach(x => console.log(' -', x.slice(0, 220)));
