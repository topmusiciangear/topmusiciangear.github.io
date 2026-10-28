const fs = require('fs');
const c = fs.readFileSync('build-guides.js','utf8');
// Find the toggle onclick
const i = c.indexOf('var l=this.nextElementSibling;var open');
console.log(c.substring(i-20, i+180));
