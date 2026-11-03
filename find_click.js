var fs = require('fs');
var c = fs.readFileSync('index.html', 'utf8');
// Search for click handlers on cat-card elements
var idx = c.indexOf('cat-card');
console.log('cat-card found at:', idx);
if (idx >= 0) {
  // Find the click handler
  var section = c.substring(idx, idx + 2000);
  console.log('Section around cat-card:');
  console.log(section.substring(0, 1000));
}