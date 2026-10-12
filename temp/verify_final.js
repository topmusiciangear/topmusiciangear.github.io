var fs = require('fs');
var fails = 0;
function check(f, substr, label, absent) {
  var s = fs.readFileSync(f, 'utf8');
  var n = s.split(substr).length - 1;
  var ok = absent ? n === 0 : n > 0;
  console.log(f + ' | ' + label + ': ' + n + (ok ? ' OK' : ' FAIL'));
  if (!ok) fails++;
}
// amber declarations well-formed: ;color:#FFC107"> with NO stray quote
check('guides/best-plugins.html', [";color:#FFC107\">", 'clean amber decls', 5]);
check('guides/best-plugins.html', [";color:#FFC107'\">", 'stray-quote decls', 0, true]);
check('guides/best-plugins.html', ['86 114 320 72', 'smile svg left', 0, true]);
check('guides/best-plugins_es.html', [";color:#FFC107\">", 'clean amber es', 5]);
check('js/shop-buttons.js', [";color:#FFC107\">", 'spa clean amber', 3]);
check('js/shop-buttons.js', ['86 114 320 72', 'spa smile left', 0, true]);
console.log(fails ? 'FAILURES ' + fails : 'ALL GREEN');
