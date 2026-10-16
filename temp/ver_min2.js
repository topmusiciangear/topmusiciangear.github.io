const fs = require('fs');
const min = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/css/style.min.css', 'utf8');
const idx = [];
let i = -1;
while ((i = min.indexOf('guide-link-btn', i + 1)) > -1) idx.push(i);
console.log('apariciones: ' + idx.length);
idx.forEach(j => console.log('  ...' + min.slice(Math.max(0, j - 60), j + 200)));
