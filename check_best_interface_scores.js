const fs = require('fs');
var r = fs.readFileSync('js/guide-scores.js','utf8');
// Find the best-interface section
var idx = r.indexOf('"best-interface"');
console.log('best-interface section at:', idx);
if (idx >= 0) {
  var section = r.substring(idx, idx+500);
  console.log('Section content:', section);
}