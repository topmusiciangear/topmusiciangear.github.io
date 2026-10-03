const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-5-string-basses.html', 'utf8');
const start = 467532;
const listAt = h.indexOf('shop-more-list', start);
const seg = h.slice(listAt, listAt + 9000);
const mi = seg.indexOf('data-store="musicstore"');
console.log(seg.slice(mi, mi + 2200));