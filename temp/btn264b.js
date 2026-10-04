const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const start = src.indexOf('  264: {');
console.log(JSON.stringify(src.slice(start, start + 220)));