var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var i = s.indexOf('naUrl');
var j = s.indexOf('naUrl', i + 5);
console.log('--- naUrl usages:');
while (i >= 0) {
  console.log('at ' + i + ': ' + s.slice(Math.max(0, i - 80), i + 60).replace(/\n/g, ' '));
  i = s.indexOf('naUrl', i + 5);
}