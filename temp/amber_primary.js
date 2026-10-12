var fs = require('fs');
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');
function rep(a, b) {
  var n = s.split(a).length - 1;
  if (!n) { console.log('NOT FOUND: ' + a.slice(0, 70)); process.exit(1); }
  s = s.split(a).join(b);
  console.log('ok x' + n + ': ' + a.slice(0, 60));
}
rep("SHOP_LOGO_STYLE.hollyland + '\">", "SHOP_LOGO_STYLE.hollyland + ';color:#FFC107'\">");
rep("font-family:Arial,Helvetica,sans-serif;font-weight:800\\'><span", "font-family:Arial,Helvetica,sans-serif;font-weight:800;color:#FFC107\\'><span");
rep("font-weight:400\\'>Plug<span", "font-weight:400;color:#FFC107\\'>Plug<span");
rep("(SHOP_LOGO_STYLE[primaryStoreKey]||'font-weight:700') + '\">", "(SHOP_LOGO_STYLE[primaryStoreKey]||'font-weight:700') + ';color:#FFC107'\">");
rep("(gStyle[T]||'font-weight:700')+'\">", "(gStyle[T]||'font-weight:700')+';color:#FFC107'\">");
fs.writeFileSync(f, s);
console.log('done');
