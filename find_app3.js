var fs = require('fs');
var c = fs.readFileSync('js/app.min.js', 'utf8');
// Search around data-cat
var idx = c.indexOf('data-cat');
console.log('data-cat at:', idx);
if (idx >= 0) {
  // Get 500 chars around it
  var context = c.substring(Math.max(0, idx - 200), idx + 500);
  console.log('Context:');
  console.log(context);
}
// Also search for the pattern that handles category clicks
var searchStr = 'data-cat=';
var idx2 = c.indexOf(searchStr);
console.log('First data-cat= at:', idx2);
if (idx2 >= 0) {
  console.log('Context around data-cat=:');
  console.log(c.substring(Math.max(0, idx2 - 50), idx2 + 200));
}