var fs = require('fs');
var s = fs.readFileSync('deals_es.html', 'utf8');
var i = -1;
while ((i = s.indexOf('musicstore-icon.png', i + 1)) >= 0) {
  console.log(JSON.stringify(s.slice(Math.max(0, i - 120), i + 60)));
  console.log('---');
}
