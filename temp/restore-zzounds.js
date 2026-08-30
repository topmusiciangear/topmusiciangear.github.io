var fs = require('fs');
var data = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var p = data.find(function(x) { return x.id === 358; });
if (p) {
  p.img = 'https://cf1.zzounds.com/media/productmedia/fit%2C2018by3200/quality%2C85/at875r_1_sq-d131afcabb5d59bd3eae9b9d21f98b75.jpg';
  console.log('Restored img:', p.img);
  fs.writeFileSync('data/products.json', JSON.stringify(data, null, 2) + '\n');
  console.log('Written!');
}
