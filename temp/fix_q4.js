var fs = require('fs');
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');
function rep(a, b) {
  var n = s.split(a).length - 1;
  if (!n) { console.log('NOT FOUND: ' + a.slice(0, 70)); process.exit(1); }
  s = s.split(a).join(b);
  console.log('ok x' + n);
}
// turn  X + ';color...' quasi-forms into valid  X + ';color:#FFC107' + '">'
rep("';color:#FFC107\\'\">'", "';color:#FFC107' + '\">'");
rep("';color:#FFC107'\">'", "';color:#FFC107' + '\">'");
fs.writeFileSync(f, s);
console.log('done');
