var fs = require('fs');
var c = fs.readFileSync('js/shop-buttons.js', 'utf8');
var idx = c.indexOf('data-cat="accessories"');
console.log('Found data-cat="accessories" at:', idx);
if (idx < 0) {
  // Try case insensitive
  var lowerC = c.toLowerCase();
  var lowerIdx = lowerC.indexOf('data-cat="accessories"');
  console.log('Found (case-insensitive) at:', lowerIdx);
  if (lowerIdx >= 0) {
    // Get the original case context
    var start = lowerIdx;
    var end = lowerC.indexOf('"', start + 'data-cat="accessories"'.length);
    var originalSegment = c.substring(start, end);
    console.log('Original case segment:', originalSegment);
  }
}
// Also search for just "accessories" pattern
var idx2 = c.indexOf('accessories');
console.log('Found "accessories" (anywhere) at:', idx2);
if (idx2 >= 0) {
  console.log('Context around "accessories":');
  console.log(c.substring(Math.max(0, idx2 - 100), idx2 + 200));
}