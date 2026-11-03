var fs = require('fs');
var c = fs.readFileSync('index.html', 'utf8');
// Search right after guideCats
var idx = c.indexOf('guideCats');
console.log('guideCats at:', idx);
if (idx >= 0) {
  // Get 3000 chars after guideCats
  var after = c.substring(idx, idx + 3000);
  console.log('First 2000 chars after guideCats:');
  console.log(after.substring(0, 2000));
}