var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
var g = d.find(function (x) { return x.id === 'usb-mics'; });

// Exact 9 products from the table columns (in order)
g.featuredProducts = [194, 195, 286, 299, 3, 666, 253, 252, 291];

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('featuredProducts set to 9 table products:', g.featuredProducts);