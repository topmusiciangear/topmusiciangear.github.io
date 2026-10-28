const fs = require('fs');
const c = fs.readFileSync('build-guides.js','utf8');
const i = c.indexOf('shop-btn-more" ');
const sub = c.substring(i, i+200);
console.log(sub);
