var fs = require('fs');
var files = ['temp/audit_prices.js', 'temp/oos_patch.js', 'temp/apply_patch.js', '_test_btn.js'];
var bad = '\\\\n *\\\\};';
var good = '\\n *\\};';
files.forEach(function (f) {
  var s = fs.readFileSync(f, 'utf8');
  var n = 0;
  while (s.indexOf(bad) !== -1) { s = s.replace(bad, good); n++; }
  fs.writeFileSync(f, s);
  console.log(f, 'fixes:', n);
});