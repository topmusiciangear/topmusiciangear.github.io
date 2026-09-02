const fs = require('fs');
let bg = fs.readFileSync('build-guides.js', 'utf8');
bg = bg.replace(/\$1/g, '');
fs.writeFileSync('build-guides.js', bg);
console.log('Fixed $1 artifacts');
