var fs = require('fs');
var c = fs.readFileSync('index.html', 'utf8');
// Search for click handlers related to categories
// Look for addEventListener or onclick on cat-grid or cat-card
var patterns = ['addEventListener', 'onclick', 'cat-grid', 'data-cat'];
patterns.forEach(function(p) {
  var idx = c.indexOf(p);
  console.log(p + ' found at:', idx >= 0 ? idx : 'NOT FOUND');
});
// Also search for the function that handles category clicks
var idx2 = c.indexOf('setCurrentGuideCat');
console.log('setCurrentGuideCat found at:', idx2 >= 0 ? idx2 : 'NOT FOUND');