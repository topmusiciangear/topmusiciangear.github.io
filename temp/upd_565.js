var fs = require('fs');
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var p = prods.find(function (x) { return x.id === 565; });
p.stores.zzounds = 'https://www.zzounds.com/item--ROLRP107?siid=326723';
fs.writeFileSync('data/products.json', JSON.stringify(prods, null, 2));
console.log('565 zzounds -> ' + p.stores.zzounds);
