var fs = require('fs');
var BS = String.fromCharCode(92);
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');
var FONT = "font-family:'Open Sans Condensed','Arial Narrow',Arial,sans-serif;font-weight:700;color:#FFC107;font-size:18px;letter-spacing:.5px";
function rep(a, b) {
  var n = s.split(a).length - 1;
  if (!n) { console.log('NOT FOUND: ' + JSON.stringify(a.slice(0, 70))); process.exit(1); }
  s = s.split(a).join(b);
  console.log('ok x' + n);
}
// 1 holly (double-quote attrs)
rep("'<span style=\"' + SHOP_LOGO_STYLE.hollyland + ';color:#FFC107' + '\">'", "'<span style=\"' + '" + FONT + "' + '\">'");
// 2 amazon x2 (backslash-escaped single quotes in raw file)
rep("<span style=" + BS + "'font-family:Arial,Helvetica,sans-serif;font-weight:800;color:#FFC107" + BS + "'>Amazon</span>", "<span style=" + BS + "'" + FONT + BS + "'>Amazon</span>");
// 3 daw gear4music
rep("'<span style=\"' + SHOP_LOGO_STYLE.gear4music + '\">'", "'<span style=\"' + '" + FONT + "' + '\">'");
// 4 PB
rep("<span style=" + BS + "'font-family:Arial,Helvetica,sans-serif;font-weight:400;color:#FFC107" + BS + "'>Plug<span style=" + BS + "'color:#FFC107" + BS + "'>in</span>Boutique</span>", "<span style=" + BS + "'" + FONT + BS + "'>PluginBoutique</span>");
// 5 generic
rep("'<span style=\"' + (SHOP_LOGO_STYLE[primaryStoreKey]||'font-weight:700') + ';color:#FFC107' + '\">'", "'<span style=\"' + '" + FONT + "' + '\">'");
// 6 swap gStyle — already correct, skip
fs.writeFileSync(f, s);
console.log('done');
