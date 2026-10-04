const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/hs8-vs-rokit-7.html', 'utf8');
const i = h.indexOf('guide-comp-table');
const seg = h.slice(i, i + 2500).replace(/<[^>]*>/g, '|');
console.log(seg.slice(0, 900));