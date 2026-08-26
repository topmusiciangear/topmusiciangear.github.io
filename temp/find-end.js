var fs = require('fs');
var b = fs.readFileSync('build-guides.js', 'utf8');
var idx = b.indexOf('const TEST_SHOP_BTN');
var depth = 0;
var inStr = false;
var sc = '';
var end = -1;
for (var i = idx + 24; i < b.length; i++) {
  var c = b[i];
  if (inStr) {
    if (c === sc && b[i-1] !== '\\') inStr = false;
  } else {
    if (c === "'" || c === '"' || c === '`') { inStr = true; sc = c; }
    else if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
}
console.log('End at char: ' + end);
console.log('After: ' + JSON.stringify(b.substring(end, end + 50)));
