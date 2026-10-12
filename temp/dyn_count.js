var fs = require('fs');
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');
function rep(a, b) {
  var n = s.split(a).length - 1;
  if (!n) { console.log('NOT FOUND: ' + a.slice(0, 70)); process.exit(1); }
  s = s.split(a).join(b);
  console.log('ok x' + n + ': ' + a.slice(0, 60));
}
rep(
  "const moreBtn =",
  "const rowCount = order.filter(k => k !== primaryStoreKey).length;\n  const moreBtn ="
);
rep(
  "t('Comparar en 5 tiendas más', 'Compare 5 more stores')",
  "t('Comparar en ' + rowCount + ' tiendas más', 'Compare ' + rowCount + ' more stores')"
);
fs.writeFileSync(f, s);
console.log('done');
