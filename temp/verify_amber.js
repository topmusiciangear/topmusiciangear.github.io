var fs = require('fs');
var fails = 0;
function check(f, patterns) {
  var s = fs.readFileSync(f, 'utf8');
  patterns.forEach(function (p) {
    var n = s.split(p[0]).length - 1;
    var ok = p[2] ? n >= p[2] : n > 0;
    if (p[3] === 'absent') ok = n === 0;
    console.log(f + ' | ' + p[1] + ': ' + n + (ok ? ' OK' : ' FAIL'));
    if (!ok) fails++;
  });
}
// must exist: amber in primaries
check('guides/best-plugins.html', [
  ['color:#FFC107', 'amber hits', 5],
  ['Plug<span', 'pb wordmark', 1],
  ["color:#000'>in<", 'black in', 1]
]);
check('guides/best-plugins_es.html', [
  ['color:#FFC107', 'amber hits es', 5]
]);
// must NOT exist: leaked builder code or backslash artifacts in HTML
check('guides/best-plugins.html', [
  ['SHOP_LOGO', 'leaked code', 0, 'absent'],
  ['gStyle', 'leaked code', 0, 'absent'],
  ['\\\'', 'stray backslash-quote', 0, 'absent']
]);
check('js/shop-buttons.js', [
  ['color:#FFC107', 'spa amber', 3]
]);
console.log(fails ? 'FAILURES: ' + fails : 'ALL GREEN');
