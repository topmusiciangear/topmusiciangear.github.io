var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
console.log('Buy at<span:', s.indexOf('Buy at<span'));
console.log('gap:10px:', s.indexOf('gap:10px'));
var i = s.indexOf('Buy at<span');
console.log(JSON.stringify(s.slice(i - 12, i)));
