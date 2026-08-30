var fs = require('fs');
var data = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var p = data.find(function(x) { return x.id === 358; });
p.img = 'https://www.audio-technica.com/media/catalog/product/a/t/at875r_01.png';
fs.writeFileSync('data/products.json', JSON.stringify(data, null, 2) + '\n');
console.log('Done:', p.img);
