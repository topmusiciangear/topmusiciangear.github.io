var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var i = s.indexOf('function geoZone');
if (i < 0) i = s.indexOf('geoZone');
console.log(s.slice(i, i + 1500));
