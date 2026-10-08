const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const m = src.match(/(^|\n)  255:.*$/m);
console.log('TEST255:', m ? m[0].trim().slice(0, 400) : 'none');
