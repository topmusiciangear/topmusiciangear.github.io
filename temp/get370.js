const fs = require('fs');
const b = fs.readFileSync('build-guides.js', 'utf8');
const idx = b.indexOf('6AB8');
let start = b.lastIndexOf('"', idx - 250);
console.log(JSON.stringify(b.slice(start, idx + 10)));
