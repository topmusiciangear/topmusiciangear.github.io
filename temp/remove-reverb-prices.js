var fs = require('fs');
var src = fs.readFileSync('build-guides.js', 'utf8');

// Remove all reverb:"$X.XX" entries from TEST_SHOP_BTN prices objects
// Pattern: reverb:"$...", or reverb:"$X,XXX.XX" etc.
var count = 0;
var result = src.replace(/,?\s*reverb:"[^"]*"/g, function(match) {
  count++;
  // If the reverb entry is the first in the prices object, remove leading comma context
  return '';
});

// Clean up any empty prices objects that might result: {,} -> {}
// Also clean up leading commas in prices: {,foo} -> {foo}
result = result.replace(/\{,\s*/g, '{');
result = result.replace(/\{\s*,/g, '{');

// Clean up double commas
result = result.replace(/,,+/g, ',');

// Clean up trailing commas before }
result = result.replace(/,(\s*[}\]])/g, '$1');

console.log('Removed ' + count + ' reverb price entries');
fs.writeFileSync('build-guides.js', result, 'utf8');
console.log('Done');
