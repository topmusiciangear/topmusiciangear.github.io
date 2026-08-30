var fs = require('fs');
var data = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var p = data.find(function(x) { return x.id === 358; });
if (p) {
  p.img = 'https://m.media-amazon.com/images/I/512MSzrXy6L._AC_SL1500_.jpg';
  console.log('New img:', p.img);
  fs.writeFileSync('data/products.json', JSON.stringify(data, null, 2) + '\n');
  console.log('Written!');
}
