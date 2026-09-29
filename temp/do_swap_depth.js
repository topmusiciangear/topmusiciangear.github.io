var fs = require('fs');
var L = fs.readFileSync('js/shop-buttons.js', 'utf8').split(/\r?\n/);
var depth = 0;
for (var i = 4741; i < L.length; i++) {
  var line = L[i];
  // crude but sufficient: strip single-quoted strings, then count
  var s = line.replace(/'[^']*'/g, "''");
  var o = (s.match(/[({]/g) || []).length, c = (s.match(/[)}]/g) || []).length;
  depth += o - c;
  if (i < 4750 || i > 4788 || depth <= 0)
    console.log((i + 1) + ' d=' + depth + '  ' + line.trim().slice(0, 95));
  if (depth === 0) { console.log('>>> CLOSED at line ' + (i + 1)); break; }
}
console.log('end depth=' + depth);
