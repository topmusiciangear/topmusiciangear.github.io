var fs = require('fs');
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');
function rep(a, b, expect) {
  var n = s.split(a).length - 1;
  console.log('found x' + n + ' :: ' + a.slice(0, 60));
  if (n !== expect) { console.log('EXPECTED x' + expect + ' -- ABORT, nothing saved'); process.exit(1); }
  s = s.split(a).join(b);
}
// Wordmarks inherit button font (Arial 15px, like 'Comprar en'); only color differs.
rep('const SHOP_PRIMARY_FONT = "font-family:\'Open Sans Condensed\',\'Arial Narrow\',Arial,sans-serif;font-weight:700;color:#FFC107;font-size:15px;letter-spacing:.5px";',
    'const SHOP_PRIMARY_FONT = "font-weight:800;color:#FFC107";', 1);
rep('const SHOP_ROW_FONT = "font-family:\'Open Sans Condensed\',\'Arial Narrow\',Arial,sans-serif;font-weight:700;color:#fff;font-size:15px;letter-spacing:.5px";',
    'const SHOP_ROW_FONT = "font-weight:800;color:#fff";', 1);
rep('var gPrimFont="font-family:\'Open Sans Condensed\',\'Arial Narrow\',Arial,sans-serif;font-weight:700;color:#FFC107;font-size:15px;letter-spacing:.5px";',
    'var gPrimFont="font-weight:800;color:#FFC107";', 1);
rep('var gRowFont="font-family:\'Open Sans Condensed\',\'Arial Narrow\',Arial,sans-serif;font-weight:700;color:#fff;font-size:15px;letter-spacing:.5px";',
    'var gRowFont="font-weight:800;color:#fff";', 1);
fs.writeFileSync(f, s);
console.log('font-match OK');
