var fs = require('fs');
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var p = prods.find(function (x) { return x.id === 447; });
p.stores.zzounds = 'https://www.zzounds.com/item--TECBSDRV2?siid=189179';
fs.writeFileSync('data/products.json', JSON.stringify(prods, null, 2));
console.log('447 zzounds added');
