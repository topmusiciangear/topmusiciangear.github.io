var fs = require('fs');
var c = fs.readFileSync('temp/add-3-plugin-guides.js', 'utf8');
var lines = c.split('\n');

// Binary search for the line causing the error
function testLines(n) {
  var chunk = '';
  for (var i = 0; i < n; i++) {
    chunk += lines[i] + '\n';
  }
  try {
    new Function(chunk);
    return true;
  } catch(e) {
    return false;
  }
}

// Find first bad line
var lo = 0, hi = lines.length;
while (lo < hi) {
  var mid = Math.floor((lo + hi) / 2);
  if (testLines(mid + 1)) {
    lo = mid + 1;
  } else {
    hi = mid;
  }
}
console.log('First failing line: ' + (lo + 1));
console.log('Content: ' + JSON.stringify(lines[lo]));

// Check all \u escapes on that line
var re = /\\u[0-9a-fA-F]*/g;
var m;
while ((m = re.exec(lines[lo])) !== null) {
  var seq = m[0];
  var hex = seq.substring(2);
  console.log('  Escape: ' + seq + ' hex digits: ' + hex.length + ' value: ' + JSON.stringify(eval("'" + seq + "'")));
}
