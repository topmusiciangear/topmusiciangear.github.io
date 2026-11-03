var fs = require('fs');
var c = fs.readFileSync('js/app.min.js', 'utf8');

// Find all occurrences of currentCategory assignment
var searchStr = 'currentCategory=';
var indices = [];
var pos = 0;
while (true) {
  pos = c.indexOf(searchStr, pos);
  if (pos < 0) break;
  indices.push(pos);
  pos++;
}

console.log('Found', indices.length, 'occurrences of "currentCategory="');
indices.forEach(function(i, idx) {
  var start = Math.max(0, i - 100);
  var end = Math.min(c.length, i + 200);
  console.log('\n--- Occurrence ' + (idx+1) + ' at position ' + i + ' ---');
  console.log(c.substring(start, end));
});