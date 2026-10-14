const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
const i = src.indexOf('\n  680: {');
console.log(src.slice(i, i + 1200));