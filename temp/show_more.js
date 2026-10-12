var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var i = -1;
while ((i = s.indexOf('more stores', i + 1)) >= 0) {
  console.log(JSON.stringify(s.slice(Math.max(0, i - 200), i + 60)));
  console.log('----');
}
