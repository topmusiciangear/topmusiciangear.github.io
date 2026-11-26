const fs = require('fs');
var r = fs.readFileSync('guides/best-interface.html','utf8');
// Find all "Our score:" occurrences
var regex = /Our score: ([\d.]+) out of 10/g;
var matches = [];
var m;
while ((m = regex.exec(r)) !== null) {
  matches.push({ score: m[1], pos: m.index });
}
console.log('Total score occurrences:', matches.length);
// Show first 5
matches.slice(0, 5).forEach(function(x) {
  console.log('Score:', x.score, 'at pos:', x.pos);
});