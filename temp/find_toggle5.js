const fs = require('fs');
const c = fs.readFileSync('build-guides.js','utf8');
const i = c.indexOf("var l=this.nextElementSibling");
// find next 200 chars
console.log(c.substring(i, i+200));
