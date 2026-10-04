const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/beat-making.html', 'utf8');
const i = h.indexOf('id="sec-4"');
console.log(h.slice(i, i + 2500));