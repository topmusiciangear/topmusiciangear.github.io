var fs = require('fs');
var c = fs.readFileSync('js/app.min.js', 'utf8');
// Search for renderGuideGrid function
var idx = c.indexOf('function renderGuideGrid');
console.log('renderGuideGrid found at:', idx);
if (idx >= 0) {
  // Get 500 chars
  var func = c.substring(idx, idx + 500);
  console.log('renderGuideGrid function:');
  console.log(func);
}
// Also look for renderGuideGrid as a variable
var idx2 = c.indexOf('renderGuideGrid=');
console.log('renderGuideGrid= found at:', idx2);