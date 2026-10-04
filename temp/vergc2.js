const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/beginner-guitar.html', 'utf8');
const i = h.indexOf('Takamine GC1 (Nylon): A Closer Look');
const j = h.indexOf('guide-section-heading', i + 50);
const seg = h.slice(i, j);
const zi = seg.indexOf('data-store="zzounds"');
console.log(seg.slice(zi - 100, zi + 600));