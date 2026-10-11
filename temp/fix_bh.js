var fs = require('fs');
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var p = prods.find(function (x) { return x.id === 238; });
console.log('before: ' + p.price);
p.price = 99;
fs.writeFileSync('data/products.json', JSON.stringify(prods, null, 2));
console.log('after: ' + p.price);
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
guides.forEach(function (g) {
  var s = JSON.stringify(g);
  if (s.indexOf('279') >= 0 && s.toLowerCase().indexOf('blackhole') >= 0) console.log('CHECK ' + g.id);
});
