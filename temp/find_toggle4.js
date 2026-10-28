const fs = require('fs');
const c = fs.readFileSync('build-guides.js','utf8');
const i = c.indexOf('var l=this.nextElementSibling;var open');
// Find the end of this onclick string
const end = c.indexOf("';", i);
console.log(c.substring(i, end+2));
