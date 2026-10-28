const fs = require('fs');
const c = fs.readFileSync('build-guides.js','utf8');
const i = c.indexOf('const moreBtn');
console.log(c.substring(i, i+200).replace(/\n/g,' '));
