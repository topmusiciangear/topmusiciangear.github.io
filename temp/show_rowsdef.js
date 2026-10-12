var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var i = s.indexOf('const moreBtn =');
var seg = s.slice(Math.max(0, i - 4500), i);
var j = seg.lastIndexOf('const rows =');
console.log(JSON.stringify(seg.slice(j, j + 400)));
