var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var i = s.indexOf('const naUrl');
console.log(s.slice(i, i + 1300));