var fs = require('fs');
var files = ['build-guides.js', 'js/shop-buttons.js', 'temp/gen-shop-buttons.js'];
var needle = '? t(\u0027Verificar precio\u0027, \u0027Check price\u0027)';
files.forEach(function (f) {
  var s = fs.readFileSync(f, 'utf8');
  var tmg = (s.split('tmgCheckLabel').length - 1);
  var pprice = s.indexOf(needle) > -1 ? 'YES' : 'NO';
  console.log(f + '  tmgCheckLabel x' + tmg + '  pPriceAmazonLabel=' + pprice);
});
var g = fs.readFileSync('guides/best-interface.html', 'utf8');
console.log('best-interface.html inline doSwap label:', g.indexOf('tmgCheckLabel') > -1 ? 'YES' : 'NO');
console.log('best-interface.html loads shop-buttons.js:', (g.match(/shop-buttons\.js/g) || []).length + ' times');
var gs = fs.readFileSync('guides/best-interface_es.html', 'utf8');
console.log('ES page label present:', gs.indexOf('Verificar precio') > -1 ? 'YES' : 'NO');