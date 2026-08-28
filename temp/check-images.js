var fs = require('fs');
var h = fs.readFileSync('guides/best-32-channel-digital-mixers.html','utf8');
var re = /<img[^>]*src="([^"]+)"[^>]*>/g;
var m;
var i = 0;
while ((m = re.exec(h)) !== null) {
  if (i < 30) console.log(i + ': ' + m[1].substring(0, 120));
  i++;
}
console.log('Total images:', i);

// Also check for product card images specifically
console.log('\n--- Product card images ---');
var cardRe = /guide-product-card-img[\s\S]*?<img[^>]*src="([^"]+)"/g;
var cm;
var ci = 0;
while ((cm = cardRe.exec(h)) !== null) {
  console.log(ci + ': ' + cm[1].substring(0, 120));
  ci++;
}
console.log('Product card images:', ci);
