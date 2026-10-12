var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var i = s.indexOf('var newPrimary=');
console.log(s.slice(i, i + 2200));
