var fs = require('fs');
var c = fs.readFileSync('index.html', 'utf8');
var idx = c.indexOf('data-cat="accessories"');
if (idx >= 0) {
  // Get the full cat-card div
  var start = idx;
  var end = c.indexOf('</div>', start);
  // Need to find the matching closing div for the cat-card
  var depth = 0;
  for (var i = start; i < c.length; i++) {
    if (c.substring(i, i + 5) === '<div ') depth++;
    if (c.substring(i, i + 6) === '</div>') {
      depth--;
      if (depth === 0) {
        end = i + 6;
        break;
      }
    }
  }
  console.log('Accessories card:');
  console.log(c.substring(start, end));
}

// Also check All Guides count
var idx2 = c.indexOf('data-cat="all"');
if (idx2 >= 0) {
  var start2 = idx2;
  var depth2 = 0;
  for (var i = start2; i < c.length; i++) {
    if (c.substring(i, i + 5) === '<div ') depth2++;
    if (c.substring(i, i + 6) === '</div>') {
      depth2--;
      if (depth2 === 0) {
        console.log('\nAll Guides card:');
        console.log(c.substring(start2, i + 6));
        break;
      }
    }
  }
}