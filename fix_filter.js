var fs = require('fs');
var c = fs.readFileSync('app.js', 'utf8');
// Search for the category filtering pattern
var idx = c.indexOf('if("all"!==currentCategory');
console.log('Found at:', idx);
if (idx >= 0) {
  console.log('Context:');
  console.log(c.substring(idx, idx + 300));
} else {
  // Try alternative pattern
  idx = c.indexOf('e.category===currentCategory');
  console.log('e.category=== found at:', idx);
  if (idx >= 0) {
    console.log('Context:');
    console.log(c.substring(idx - 50, idx + 200));
  }
}