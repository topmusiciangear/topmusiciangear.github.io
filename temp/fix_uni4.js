var fs = require('fs');
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');
function rep(a, b, expect) {
  var n = s.split(a).length - 1;
  console.log('found x' + n + ' :: ' + a.slice(0, 60));
  if (n !== expect) { console.log('EXPECTED x' + expect + ' -- ABORT, nothing saved'); process.exit(1); }
  s = s.split(a).join(b);
}
// 1. unified size 18px -> 15px (PluginBoutique reference: inherits 15px from button)
rep('font-weight:700;color:#FFC107;font-size:18px;letter-spacing:.5px', 'font-weight:700;color:#FFC107;font-size:15px;letter-spacing:.5px', 1);
rep("font-weight:700;color:#fff;font-size:18px;letter-spacing:.5px", "font-weight:700;color:#fff;font-size:15px;letter-spacing:.5px", 1);
// 2. runtime vars for verbatim inline template (Layer-2), right after gText def
var gTextLine = "var gText={zzounds:'zZounds',gear4music:'Gear4music',musicstore:'Music Store',andertons:'Andertons',reverb:'Reverb',amazon:'Amazon'};";
var addVars = gTextLine + '\r\n  var gPrimFont="font-family:\'Open Sans Condensed\',\'Arial Narrow\',Arial,sans-serif;font-weight:700;color:#FFC107;font-size:15px;letter-spacing:.5px";var gRowFont="font-family:\'Open Sans Condensed\',\'Arial Narrow\',Arial,sans-serif;font-weight:700;color:#fff;font-size:15px;letter-spacing:.5px";';
rep(gTextLine, addVars, 1);
fs.writeFileSync(f, s);
console.log('step1 OK');
