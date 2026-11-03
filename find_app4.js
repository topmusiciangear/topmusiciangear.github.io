var fs = require('fs');
var c = fs.readFileSync('js/app.min.js', 'utf8');
// Search for the click handler that loads guides
var idx = c.indexOf('currentCategory=a.dataset');
console.log('currentCategory=a.dataset at:', idx);
if (idx >= 0) {
  // Get 500 chars after it
  var after = c.substring(idx, idx + 500);
  console.log('After currentCategory=a.dataset:');
  console.log(after);
}
// Also look for guideVisibleCount or guidePageSize
var patterns = ['guideVisibleCount', 'guidePageSize', 'loadGuide', 'guidePage'];
patterns.forEach(function(p) {
  var idx2 = c.indexOf(p);
  console.log(p + ' found at:', idx2 >= 0 ? idx2 : 'NOT FOUND');
});