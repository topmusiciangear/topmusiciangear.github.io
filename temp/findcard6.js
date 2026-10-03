const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-5-string-basses.html', 'utf8');
const start = 467532;
const listAt = h.indexOf('shop-more-list', start);
const seg = h.slice(listAt, listAt + 12000);
const mi = seg.indexOf('data-store="musicstore"');
// print from row start to row end (next </a>)
const rowStart = seg.lastIndexOf('<a ', mi);
const rowEnd = seg.indexOf('</a>', mi);
console.log(seg.slice(rowStart, rowEnd + 4));