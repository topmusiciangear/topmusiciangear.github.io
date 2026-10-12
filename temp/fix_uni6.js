var fs = require('fs');
var BS = String.fromCharCode(92), SQ = String.fromCharCode(39);
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');
function rep(a, b, expect) {
  var n = s.split(a).length - 1;
  console.log('found x' + n + ' :: ' + JSON.stringify(a.slice(0, 60)));
  if (n !== expect) { console.log('EXPECTED x' + expect + ' -- ABORT'); process.exit(1); }
  s = s.split(a).join(b);
}
rep(" + SHOP_PRIMARY_FONT + " + BS + SQ + ">Amazon</span>", " + SHOP_PRIMARY_FONT + " + SQ + BS + SQ + ">Amazon</span>", 2);
rep(" + SHOP_PRIMARY_FONT + " + BS + SQ + ">PluginBoutique</span>", " + SHOP_PRIMARY_FONT + " + SQ + BS + SQ + ">PluginBoutique</span>", 1);
fs.writeFileSync(f, s);
console.log('quote fix OK');
