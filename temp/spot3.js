const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/hs8-vs-rokit-7.html', 'utf8');
const i = h.indexOf('<table class="guide-comp-table"');
const seg = h.slice(i, i + 1500).replace(/<[^>]*>/g, '|');
console.log(seg.slice(0, 600));