var fs = require('fs');
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');
function rep(a, b, expect) {
  var n = s.split(a).length - 1;
  console.log('found x' + n + ' :: ' + a.slice(0, 70));
  if (n !== expect) { console.log('EXPECTED x' + expect + ' -- ABORT, nothing saved'); process.exit(1); }
  s = s.split(a).join(b);
}
rep('const SHOP_PRIMARY_FONT = "font-family:\'Open Sans Condensed\',\'Arial Narrow\',Arial,sans-serif;font-weight:700;color:#FFC107;font-size:18px;letter-spacing:.5px";',
    'const SHOP_PRIMARY_FONT = "font-family:\'Open Sans Condensed\',\'Arial Narrow\',Arial,sans-serif;font-weight:700;color:#FFC107;font-size:15px;letter-spacing:.5px";', 1);
rep('const SHOP_ROW_FONT = "font-family:\'Open Sans Condensed\',\'Arial Narrow\',Arial,sans-serif;font-weight:700;color:#fff;font-size:18px;letter-spacing:.5px";',
    'const SHOP_ROW_FONT = "font-family:\'Open Sans Condensed\',\'Arial Narrow\',Arial,sans-serif;font-weight:700;color:#fff;font-size:15px;letter-spacing:.5px";', 1);
var gTextLine = "var gText={zzounds:'zZounds',gear4music:'Gear4music',musicstore:'Music Store',andertons:'Andertons',reverb:'Reverb',amazon:'Amazon'};";
var addVars = gTextLine + '\r\n  var gPrimFont="font-family:\'Open Sans Condensed\',\'Arial Narrow\',Arial,sans-serif;font-weight:700;color:#FFC107;font-size:15px;letter-spacing:.5px";var gRowFont="font-family:\'Open Sans Condensed\',\'Arial Narrow\',Arial,sans-serif;font-weight:700;color:#fff;font-size:15px;letter-spacing:.5px";';
rep(gTextLine, addVars, 1);
fs.writeFileSync(f, s);
console.log('step1 OK');
