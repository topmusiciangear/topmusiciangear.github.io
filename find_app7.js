var fs = require('fs');
var c = fs.readFileSync('js/app.min.js', 'utf8');
// Search for getFilteredGuides function
var idx = c.indexOf('function getFilteredGuides');
console.log('getFilteredGuides found at:', idx);
if (idx >= 0) {
  // Get 1000 chars
  var func = c.substring(idx, idx + 1000);
  console.log('getFilteredGuides function:');
  console.log(func);
}
// Also look for getFilteredGuides as a variable
var idx2 = c.indexOf('getFilteredGuides=');
console.log('getFilteredGuides= found at:', idx2);