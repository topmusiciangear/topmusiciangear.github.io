var fs = require('fs');
var b = fs.readFileSync('build-guides.js', 'utf8');
var start = b.indexOf('const TEST_SHOP_BTN');
var end = b.indexOf('\n};', start);
var block = b.substring(start, end + 3);
var lines = block.split('\n');

// Check each line for structural issues
for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  // Entry lines should have pattern: NUM: { prices: { ... } } or NUM: { prices: { ... }, oos: [...] }
  if (line.match(/^\s*\d+:\s*\{/) && !line.match(/prices:\s*\{/)) {
    console.log('MISSING prices at line ' + (i + 1) + ': ' + line.substring(0, 80));
  }
  // Check for missing comma between entries (line with } at end but next line is also an entry)
  if (line.match(/\}\s*,?\s*$/) && i + 1 < lines.length && lines[i + 1].match(/^\s*\d+:\s*\{/)) {
    if (!line.match(/,\s*$/)) {
      console.log('MISSING COMMA at line ' + (i + 1) + ': ' + line.substring(0, 80));
    }
  }
}

// Try to extract the object and eval it
var objStart = b.indexOf('{', start);
var objContent = '';
var depth = 0, inStr = false, sc = '';
for (var i = objStart; i < b.length; i++) {
  var c = b[i];
  if (inStr) {
    if (c === sc && b[i-1] !== '\\') inStr = false;
  } else {
    if (c === '"' || c === "'" || c === '`') { inStr = true; sc = c; }
    else if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) {
        objContent = b.substring(objStart, i + 1);
        break;
      }
    }
  }
}

try {
  var obj = eval('(' + objContent + ')');
  console.log('Object parsed OK, keys:', Object.keys(obj).length);
} catch(e) {
  console.log('PARSE ERROR:', e.message);
  // Find line in objContent
  var match = e.message.match(/position (\d+)/);
  if (match) {
    var pos = parseInt(match[1]);
    var before = objContent.substring(Math.max(0, pos - 50), pos);
    var after = objContent.substring(pos, pos + 50);
    console.log('Context: ...' + JSON.stringify(before) + '>>>HERE<<<' + JSON.stringify(after) + '...');
  }
}
