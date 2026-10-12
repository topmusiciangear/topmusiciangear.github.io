var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var i = s.indexOf('primaryStoreKey');
var n = 0;
while (i >= 0 && n < 8) {
  console.log(JSON.stringify(s.slice(Math.max(0, i - 60), i + 120)));
  console.log('----');
  i = s.indexOf('primaryStoreKey', i + 1);
  n++;
}
