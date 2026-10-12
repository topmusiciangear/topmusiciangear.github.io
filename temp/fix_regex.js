var fs = require('fs');
var BS = String.fromCharCode(92);
['build-guides.js', 'temp/gen-shop-buttons.js'].forEach(function (f) {
  var s = fs.readFileSync(f, 'utf8');
  // current Layer-1 bytes: /^Europe\//  -> must become /^Europe\\// so Layer-2 gets /^Europe\//
  var a = '/^Europe' + BS + '//';
  var b = '/^Europe' + BS + BS + '//';
  var n = s.split(a).length - 1;
  console.log(f + ' regex spots: ' + n);
  s = s.split(a).join(b);
  fs.writeFileSync(f, s);
});
console.log('done');
