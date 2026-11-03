var fs = require('fs');
var c = fs.readFileSync('index.html', 'utf8');
// Search for the category click handler
// Look for patterns around cat-grid or cat-card clicks
var idx = c.indexOf('cat-grid');
console.log('cat-grid at:', idx);
if (idx >= 0) {
  console.log('Context:');
  console.log(c.substring(idx - 100, idx + 500));
}
// Also look for the click handler function
var patterns = ['guideCats', 'cat-carousel', 'setCurrent'];
patterns.forEach(function(p) {
  var idx2 = c.indexOf(p);
  console.log(p + ' found at:', idx2 >= 0 ? idx2 : 'NOT FOUND');
});