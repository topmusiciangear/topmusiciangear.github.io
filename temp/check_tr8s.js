const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const i = src.indexOf('33: {');
console.log(src.slice(i, i + 500).replace(/\n/g, ' '));
