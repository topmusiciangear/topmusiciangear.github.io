var fs = require('fs');
var BS = String.fromCharCode(92), SQ = String.fromCharCode(39), DQ = String.fromCharCode(34);
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');
function rep(a, b, expect) {
  var n = s.split(a).length - 1;
  console.log('found x' + n + ' for: ' + JSON.stringify(a.slice(0, 60)));
  if (n !== expect) { console.log('EXPECTED x' + expect + ' -- ABORT'); process.exit(1); }
  s = s.split(a).join(b);
}
// 1. amazon spots (dawHasAmazon + hasAmazon): broken single-string -> real concat
var oldA = "<span style=" + BS + SQ + DQ + " + SHOP_PRIMARY_FONT + " + DQ + BS + SQ + ">Amazon</span>";
var newA = "<span style=" + BS + SQ + SQ + " + SHOP_PRIMARY_FONT + " + BS + SQ + ">Amazon</span>";
rep(oldA, newA, 2);
// 2. PB spot
var oldP = "<span style=" + BS + SQ + DQ + " + SHOP_PRIMARY_FONT + " + DQ + BS + SQ + ">PluginBoutique</span>";
var newP = "<span style=" + BS + SQ + SQ + " + SHOP_PRIMARY_FONT + " + BS + SQ + ">PluginBoutique</span>";
rep(oldP, newP, 1);
// 3. inline verbatim template: use runtime vars
rep("'+SHOP_PRIMARY_FONT+'", "'+gPrimFont+'", 1);
rep("'+SHOP_ROW_FONT+'", "'+gRowFont+'", 1);
fs.writeFileSync(f, s);
console.log('patched OK');
