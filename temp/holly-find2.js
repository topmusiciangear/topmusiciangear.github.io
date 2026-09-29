var fs = require('fs');
var path = require('path');
var files = fs.readdirSync('guides').filter(function (f) { return f.endsWith('.html'); });
files.forEach(function (f) {
  var s = fs.readFileSync(path.join('guides', f), 'utf8');
  var c = (s.split('data-store="hollyland"').length - 1);
  var cR = (s.split('data-store="reverb"').length - 1);
  if (c || !cR || /holly/i.test(f)) console.log(f + ' holly=' + c + ' reverb=' + cR);
});
console.log('done');