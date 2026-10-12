var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var i = s.indexOf('Buy at<span');
console.log(JSON.stringify(s.slice(i - 30, i + 60)));
