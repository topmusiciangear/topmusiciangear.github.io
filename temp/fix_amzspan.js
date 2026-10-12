var fs = require('fs');
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');
function rep(a, b) {
  var n = s.split(a).length - 1;
  if (!n) { console.log('NOT FOUND: ' + a.slice(0, 70)); process.exit(1); }
  s = s.split(a).join(b);
  console.log('ok x' + n + ': ' + a.slice(0, 60));
}
// 1. close outer amber span properly (drop pointless inner inline-block span too)
rep(
  "<span style=\\'position:relative;display:inline-block\\'>Amazon</span>'",
  "Amazon</span>'"
);
fs.writeFileSync(f, s);
console.log('done');
