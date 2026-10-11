var fs = require('fs');
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var p = prods.find(function (x) { return x.id === 390; });
p.stores.zzounds = 'https://www.zzounds.com/item--ARACHORUSJUN6?siid=351840';
p.stores.andertons = 'https://www.andertons.co.uk/arturia-chorus-jun-6/';
fs.writeFileSync('data/products.json', JSON.stringify(prods, null, 2));
console.log('390 stores: ' + Object.keys(p.stores).join(','));
