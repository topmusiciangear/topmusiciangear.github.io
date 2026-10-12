var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var i = s.indexOf('function gTrace');
console.log(JSON.stringify(s.slice(i, i + 700)));
