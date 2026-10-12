var fs = require('fs');
var BS = String.fromCharCode(92); // single backslash, no quoting ambiguity
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');
function rep(a, b) {
  var n = s.split(a).length - 1;
  if (!n) { console.log('NOT FOUND: ' + JSON.stringify(a.slice(0, 80))); process.exit(1); }
  s = s.split(a).join(b);
  console.log('ok x' + n);
}
// current broken Layer-1: + ';color:#FFC107\'">'  (backslash form)
// wanted Layer-1:        + ';color:#FFC107' + '">'  (valid concat, clean HTML, valid Layer-2)
var bad = "+ ';color:#FFC107" + BS + "'\">'";
var good = "+ ';color:#FFC107' + '\">'";
var n0 = s.split(bad).length - 1;
console.log('broken spots: ' + n0);
s = s.split(bad).join(good);
fs.writeFileSync(f, s);
console.log('done');
