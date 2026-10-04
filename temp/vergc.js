const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/beginner-guitar.html', 'utf8');
const i = h.indexOf('Takamine GC1 (Nylon): A Closer Look');
const j = h.indexOf('guide-section-heading', i + 50);
const seg = h.slice(i, j);
console.log('filas:', [...seg.matchAll(/data-store="([a-z]+)"/g)].map(m => m[1]).join(','));
console.log('MS 299:', seg.includes('299'), '| zz siid:', seg.includes('siid=178306'));