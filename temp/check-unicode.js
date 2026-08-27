var fs = require('fs');
var c = fs.readFileSync('temp/add-3-plugin-guides.js', 'utf8');
var lines = c.split('\n');

// Find all \u sequences and check them
var re = /\\u([0-9a-fA-F]{4})/g;
for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  re.lastIndex = 0;
  var m;
  while ((m = re.exec(line)) !== null) {
    var cp = parseInt(m[1], 16);
    // Check for invalid codepoints
    if (cp > 0x10FFFF || (cp >= 0xD800 && cp <= 0xDFFF)) {
      console.log('INVALID Line ' + (i + 1) + ': \\u' + m[1] + ' (codepoint ' + cp + ')');
    }
  }
}

// Also check if there are any \u with fewer than 4 hex digits
var re2 = /\\u([0-9a-fA-F]{1,3})[^0-9a-fA-F]/g;
for (var i = 0; i < lines.length; i++) {
  re2.lastIndex = 0;
  var m;
  while ((m = re2.exec(lines[i])) !== null) {
    console.log('SHORT escape Line ' + (i + 1) + ': \\u' + m[1]);
  }
}

// Check for any actual non-ASCII chars that are NOT inside strings
// (hard to do perfectly, but let's just list them)
for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  for (var j = 0; j < line.length; j++) {
    var cp = line.charCodeAt(j);
    if (cp > 127) {
      // Check context - is this inside a string?
      // Simple heuristic: look for preceding quote
      var before = line.substring(0, j);
      var singleCount = (before.match(/'/g) || []).length;
      var doubleCount = (before.match(/"/g) || []).length;
      if (singleCount % 2 === 0 && doubleCount % 2 === 0) {
        console.log('NON-ASCII OUTSIDE STRING: Line ' + (i + 1) + ' pos ' + j + ' U+' + cp.toString(16).toUpperCase() + ' char=' + line[j]);
      }
    }
  }
}

console.log('Done checking');
