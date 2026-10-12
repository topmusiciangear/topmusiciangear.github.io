var cp = require('child_process');
function show(rev, file) {
  var s = cp.execSync('git show ' + rev + ':' + file, { maxBuffer: 50 * 1024 * 1024 }).toString('utf8');
  return s;
}
var oldB = show('c480b4bd2b', 'build-guides.js');
var newB = require('fs').readFileSync('build-guides.js', 'utf8');
function extract(s, start, len) {
  var i = s.indexOf(start);
  return i < 0 ? 'MISSING:' + start : s.slice(i, i + (len || 3000));
}
// compare doSwap function bodies (strip string literals to compare LOGIC only)
function logicOf(s) {
  var i = s.indexOf('function doSwap');
  var depth = 0, j = i;
  // find opening brace
  j = s.indexOf('{', i);
  var start = j;
  for (; j < s.length; j++) {
    if (s[j] === '{') depth++;
    else if (s[j] === '}') { depth--; if (!depth) break; }
  }
  var body = s.slice(start, j + 1);
  // remove single/double quoted strings (naive but consistent for both versions)
  body = body.replace(/'(?:[^'\\]|\\.)*'/g, "''").replace(/"(?:[^"\\]|\\.)*"/g, '""');
  return body;
}
var fs2 = require('fs');
fs2.writeFileSync('temp/logic_old.txt', logicOf(oldB));
fs2.writeFileSync('temp/logic_new.txt', logicOf(newB));
console.log('old logic len: ' + logicOf(oldB).length + ' new: ' + logicOf(newB).length);
console.log(logicOf(oldB) === logicOf(newB) ? 'DOSWAP LOGIC IDENTICAL' : 'DOSWAP LOGIC DIFFERS');
