var fs = require('fs');
var b = fs.readFileSync('build-guides.js', 'utf8');
var start = b.indexOf('const TEST_SHOP_BTN');
var content = b.substring(start);
var depth = 0, inStr = false, sc = '';
for (var i = 0; i < content.length; i++) {
  var c = content[i];
  if (inStr) {
    if (c === sc && content[i-1] !== '\\') inStr = false;
  } else {
    if (c === '"' || c === "'" || c === '`') { inStr = true; sc = c; }
    else if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) {
        console.log('Object ends at offset', start + i);
        console.log('Last 20 chars:', JSON.stringify(content.substring(i - 19, i + 1)));
        break;
      }
    }
  }
}

// Now find which line
var lines = b.substring(0, start + i + 1).split('\n');
console.log('Ends at line:', lines.length);

// Also check if there are duplicate keys or entries
var block = b.substring(start, start + i + 1);
var idMatches = block.match(/^\s*(\d+):\s*\{/gm);
console.log('Total entries:', idMatches ? idMatches.length : 0);

// Check for any empty/missing IDs
var ids = idMatches ? idMatches.map(function(m) { return parseInt(m.match(/(\d+)/)[1]); }) : [];
var missing = [];
for (var j = 1; j <= 370; j++) { if (ids.indexOf(j) === -1) missing.push(j); }
console.log('Missing IDs (1-370):', missing.length, missing.join(','));
