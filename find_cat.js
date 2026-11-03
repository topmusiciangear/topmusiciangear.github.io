var fs = require('fs');
var c = fs.readFileSync('js/shop-buttons.js', 'utf8');
var idx = c.indexOf('data-cat="accessories"');
console.log('Found at:', idx);
if (idx >= 0) {
  console.log('Context:');
  console.log(c.substring(idx - 50, idx + 200));
}