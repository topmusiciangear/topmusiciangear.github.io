var fs = require('fs');
var b = fs.readFileSync('build-guides.js', 'utf8');
var start = b.indexOf('const TEST_SHOP_BTN');
var end = b.indexOf('\n};', start);
var block = b.substring(start, end + 3);
var lines = block.split('\n');

// Track brace depth per entry
var depth = 0;
for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  // Count braces in this line (only outside strings)
  var inStr = false, sc = '';
  var lineDepth = 0;
  for (var j = 0; j < line.length; j++) {
    var c = line[j];
    if (inStr) {
      if (c === sc && line[j-1] !== '\\') inStr = false;
    } else {
      if (c === '"' || c === "'" || c === '`') { inStr = true; sc = c; }
      else if (c === '{') lineDepth++;
      else if (c === '}') lineDepth--;
    }
  }
  depth += lineDepth;
  // After an entry line with opening brace, depth should be back to 1 or 0
  if (line.match(/^\s*\d+:\s*\{/) && depth > 1 && lineDepth >= 0) {
    console.log('Line ' + (i+1) + ' depth=' + depth + ' (should be 1): ' + line.substring(0, 80));
  }
}
console.log('Final depth:', depth);
