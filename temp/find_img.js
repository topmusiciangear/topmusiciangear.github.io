var fs = require('fs');
var raw = fs.readFileSync('data/guides.json', 'utf8');
var lines = raw.split('\n');
[31881, 61435, 100315].forEach(function (n) {
  for (var i = n - 1; i > Math.max(0, n - 80); i--) {
    var m = lines[i - 1].match(/"id": "([^"]+)"/);
    if (m) { console.log('line ' + n + ' -> guide id=' + m[1]); break; }
  }
});
