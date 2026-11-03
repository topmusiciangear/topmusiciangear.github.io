var fs = require('fs');
var c = fs.readFileSync('app.js', 'utf8');
var idx = c.indexOf('getFilteredGuides');
console.log('getFilteredGuides in app.js at:', idx);
if (idx >= 0) {
  var s = c.substring(idx, idx + 500);
  console.log('Found getFilteredGuides in app.js');
  console.log(s.substring(0, 300));
} else {
  console.log('NOT FOUND in app.js');
}
// Also search for category filtering
var idx2 = c.indexOf('e.category===');
console.log('e.category=== found at:', idx2);
if (idx2 >= 0) {
  console.log('Context:');
  console.log(c.substring(Math.max(0, idx2 - 50), idx2 + 100));
}