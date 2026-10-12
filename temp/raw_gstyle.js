var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var i = s.indexOf('gStyle[T]');
console.log(JSON.stringify(s.slice(i - 40, i + 120)));
