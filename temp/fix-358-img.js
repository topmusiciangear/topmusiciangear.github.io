var fs = require('fs');
var data = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var p = data.find(function(x) { return x.id === 358; });
if (p) {
  console.log('Found id 358:', p.title);
  console.log('Old img:', p.img);
  p.img = 'https://www.audio-technica.com/media/catalog/product/cache/177161fc218aa2dd413f2b73f6832b88/a/t/at875r_01.png';
  console.log('New img:', p.img);
  fs.writeFileSync('data/products.json', JSON.stringify(data, null, 2) + '\n');
  console.log('Written!');
} else {
  console.log('id 358 not found');
}
