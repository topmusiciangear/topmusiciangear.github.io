var fs = require('fs');
var s = fs.readFileSync('js/translations.v4.min.js', 'utf8');
var keys = ['en', 'es'];
keys.forEach(function (k) {
  var re = new RegExp(k + ':\\{');
  var i = s.indexOf(k + ':{');
  var next = s.indexOf('},{', i);
  var seg = s.slice(i, i + (next > 0 ? next - i : 2000));
  var j = seg.indexOf('footerDisclosureText');
  console.log('--- ' + k + ' ---');
  console.log(seg.slice(j, j + 400));
  console.log('has Hollyland: ' + (seg.slice(j, j + 400).indexOf('Hollyland') > -1));
});