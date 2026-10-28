const fs = require('fs');
const c = fs.readFileSync('build-guides.js','utf8');
const i = c.indexOf('const moreBtn');
const end = c.indexOf('const reviewRow', i);
console.log(c.substring(i, end).replace(/\n/g,' '));
