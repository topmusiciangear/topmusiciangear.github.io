var fs = require('fs');
var c = fs.readFileSync('js/app.min.js', 'utf8');
// Get the full renderGuideGrid function
var idx = c.indexOf('function renderGuideGrid');
var func = c.substring(idx);
// Find the end of the function (next function or end)
var endIdx = c.indexOf('function ', idx + 1);
if (endIdx >= 0) {
  func = c.substring(idx, endIdx);
}
console.log('renderGuideGrid function length:', func.length);
// Print the full function
console.log(func);