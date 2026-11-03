var fs = require('fs');
var c = fs.readFileSync('index.html', 'utf8');
var idx = c.indexOf('data-cat="accessories"');
if (idx >= 0) {
  console.log('Accessories card (full):');
  console.log(c.substring(idx, idx + 1200));
}