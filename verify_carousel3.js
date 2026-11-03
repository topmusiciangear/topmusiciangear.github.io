var fs = require('fs');
var c = fs.readFileSync('index.html', 'utf8');
var idx = c.indexOf('data-cat="accessories"');
if (idx >= 0) {
  console.log('Accessories card (600 chars):');
  console.log(c.substring(idx, idx + 600));
}

var idx2 = c.indexOf('data-cat="all"');
if (idx2 >= 0) {
  console.log('\nAll Guides card (600 chars):');
  console.log(c.substring(idx2, idx2 + 600));
}