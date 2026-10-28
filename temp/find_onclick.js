const fs = require('fs');
const c = fs.readFileSync('build-guides.js','utf8');
const i = c.indexOf("var l=this.nextElementSibling;var open");
// Get the full onclick string
const start = c.lastIndexOf("onclick=", i);
const end = c.indexOf("var s=", i);
console.log(JSON.stringify(c.substring(start, end)));
