var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var i = s.indexOf('const order =');
console.log(s.slice(i, i + 600));
var j = s.indexOf('order.filter');
console.log('----');
console.log(s.slice(j - 200, j + 200));
