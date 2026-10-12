var fs = require('fs');
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');
function rep(a, b) {
  var n = s.split(a).length - 1;
  if (!n) { console.log('NOT FOUND: ' + JSON.stringify(a.slice(0, 70))); process.exit(1); }
  s = s.split(a).join(b);
  console.log('ok x' + n);
}
var BS = String.fromCharCode(92);
rep("const SHOP_LOGO_TEXT = { gear4music: 'Gear4music', andertons: 'Andertons', musicstore: \"Music Store\", zzounds: 'zZounds', reverb: \"Reverb\", amazon: \"Amazon\", hollyland: 'Hollyland' };",
    "const SHOP_LOGO_TEXT = { gear4music: 'Gear4music', andertons: 'Andertons', musicstore: \"Music Store\", zzounds: 'zZounds', reverb: \"Reverb\", amazon: \"Amazon\", hollyland: 'Hollyland' };\r\nconst SHOP_PRIMARY_FONT = \"font-family:'Open Sans Condensed','Arial Narrow',Arial,sans-serif;font-weight:700;color:#FFC107;font-size:18px;letter-spacing:.5px\";");
rep("'<span style=\"' + SHOP_LOGO_STYLE.hollyland + ';color:#FFC107' + '\">'", "'<span style=\"' + SHOP_PRIMARY_FONT + '\">'");
rep("<span style=" + BS + "'font-family:Arial,Helvetica,sans-serif;font-weight:800;color:#FFC107" + BS + "'>Amazon</span>", "<span style=" + BS + "'\" + SHOP_PRIMARY_FONT + \"" + BS + "'>Amazon</span>");
rep("'<span style=\"' + SHOP_LOGO_STYLE.gear4music + '\">'", "'<span style=\"' + SHOP_PRIMARY_FONT + '\">'");
rep("<span style=" + BS + "'font-family:Arial,Helvetica,sans-serif;font-weight:400;color:#FFC107" + BS + "'>Plug<span style=" + BS + "'color:#FFC107" + BS + "'>in</span>Boutique</span>", "<span style=" + BS + "'\" + SHOP_PRIMARY_FONT + \"" + BS + "'>PluginBoutique</span>");
rep("'<span style=\"' + (SHOP_LOGO_STYLE[primaryStoreKey]||'font-weight:700') + ';color:#FFC107' + '\">'", "'<span style=\"' + SHOP_PRIMARY_FONT + '\">'");
rep("'+(gStyle[T]||'font-weight:700')+';color:#FFC107' + '\">'", "'+SHOP_PRIMARY_FONT+'\">'");
fs.writeFileSync(f, s);
console.log('done');
