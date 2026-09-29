var fs = require('fs');
var path = require('path');
var list = ['deals.html', 'deals_es.html', 'index.html', 'es/index.html'];
list.forEach(function (f) {
  if (!fs.existsSync(f)) { console.log(f + ': n/a'); return; }
  var s = fs.readFileSync(f, 'utf8');
  var c = (s.split('data-store="hollyland"').length - 1);
  var cR = (s.split('data-store="reverb"').length - 1);
  console.log(f + '  hollyland x' + c + '  reverb x' + cR);
});