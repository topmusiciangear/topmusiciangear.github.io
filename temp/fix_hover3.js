var fs = require('fs');
function patch(f, a, b, expect) {
  var s = fs.readFileSync(f, 'utf8');
  var n = s.split(a).length - 1;
  console.log(f + ' found x' + n + ' :: ' + a.slice(0, 60));
  if (n !== expect) { console.log('EXPECTED x' + expect + ' -- ABORT'); process.exit(1); }
  fs.writeFileSync(f, s.split(a).join(b));
}
// Row wordmarks inherit white from the row anchor; no inline color so :hover can win.
patch('build-guides.js', 'const SHOP_ROW_FONT = "font-weight:800;color:#fff";', 'const SHOP_ROW_FONT = "font-weight:800";', 1);
patch('build-guides.js', 'var gRowFont="font-weight:800;color:#fff";', 'var gRowFont="font-weight:800";', 1);
console.log('row-color fix OK');
