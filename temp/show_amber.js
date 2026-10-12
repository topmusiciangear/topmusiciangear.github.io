var fs = require('fs');
var s = fs.readFileSync('guides/best-plugins.html', 'utf8');
var i = -1, n = 0;
while ((i = s.indexOf('FFC107', i + 1)) >= 0 && n < 8) {
  console.log(JSON.stringify(s.slice(Math.max(0, i - 100), i + 30)));
  console.log('---');
  n++;
}
console.log('total FFC107: ' + (s.split('FFC107').length - 1));
