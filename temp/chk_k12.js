var prods = require('../data/products.json');
var f = prods.filter(function (v) { return /K12\.2/i.test(v.title); });
console.log(JSON.stringify(f.map(function (x) { return { id: x.id, title: x.title, zz: x.stores && x.stores.zzounds }; }), null, 1));
var s = require('fs').readFileSync('build-guides.js', 'utf8');
f.forEach(function (x) {
  var i = s.indexOf('  ' + x.id + ':');
  console.log('--- BTN ' + x.id + ' ---');
  console.log(s.slice(i, i + 400));
});
