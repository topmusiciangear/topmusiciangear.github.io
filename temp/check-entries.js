var fs = require('fs');
var b = fs.readFileSync('build-guides.js', 'utf8');
var lines = b.split('\n');

// Find all entry lines and check for issues
var inBtn = false;
for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  if (line.indexOf('const TEST_SHOP_BTN') > -1) inBtn = true;
  if (!inBtn) continue;
  if (line.indexOf('};') === 0 && inBtn) { inBtn = false; break; }

  // Check if entry line has missing prices property
  if (line.match(/^\s*\d+:\s*\{/) && line.indexOf('prices:') === -1 && line.indexOf('oos:') === -1 && line.indexOf('na:') === -1) {
    console.log('LINE ' + (i+1) + ' (NO PRICES/OOS/NA): ' + line.substring(0, 100));
  }

  // Check for unbalanced braces on single line
  var depth = 0;
  for (var j = 0; j < line.length; j++) {
    if (line[j] === '{') depth++;
    if (line[j] === '}') depth--;
  }
  if (depth < 0) {
    console.log('LINE ' + (i+1) + ' (NEGATIVE BRACE DEPTH ' + depth + '): ' + line.substring(0, 100));
  }
}
