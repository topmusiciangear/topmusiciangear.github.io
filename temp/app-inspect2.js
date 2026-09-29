var fs = require('fs');
var s = fs.readFileSync('js/app.js', 'utf8');
var i = s.indexOf('window.tmgStoreButtons');
console.log('window.tmgStoreButtons at', i);
console.log(s.slice(i - 40, i + 120));
// find all occurrences of tmgStoreButtons occurrences
var idx = 0;
while ((idx = s.indexOf('tmgStoreButtons', idx)) >= 0) {
  console.log('--- at ' + idx + ' ---');
  console.log(s.slice(Math.max(0, idx - 90), idx + 80).replace(/\n/g, ' '));
  idx += 5;
}