var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var i = s.indexOf('gStyle[T]');
var seg = s.slice(i - 20, i + 90);
console.log(JSON.stringify(seg));
