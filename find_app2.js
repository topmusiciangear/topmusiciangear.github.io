var fs = require('fs');
var c = fs.readFileSync('js/app.min.js', 'utf8');
// Search for category handlers
var patterns = ['guideCats', 'data-cat', 'cat-card', 'click', 'on'];
patterns.forEach(function(p) {
  var idx = c.indexOf(p);
  console.log(p + ' found at:', idx >= 0 ? idx : 'NOT FOUND');
});
// Also look for specific handler functions
var handlers = ['handleCategoryClick', 'setGuideCat', 'onCatClick'];
handlers.forEach(function(p) {
  var idx2 = c.indexOf(p);
  console.log(p + ' found at:', idx2 >= 0 ? idx2 : 'NOT FOUND');
});
// Search for the pattern that adds event listeners to cat-card
var searchStr = 'data-cat="';
var idx3 = c.indexOf(searchStr);
console.log('First data-cat at:', idx3);
if (idx3 >= 0) {
  console.log('Context:');
  console.log(c.substring(idx3, idx3 + 200));
}