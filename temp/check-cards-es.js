var fs = require('fs');
var h = fs.readFileSync('guides/best-32-channel-digital-mixers_es.html', 'utf8');
var re = /guide-product-card-desc">(.*?)<\/div>/g;
var m;
var i = 0;
while ((m = re.exec(h)) !== null) {
  console.log(i + ': ' + m[1].substring(0, 150));
  console.log('---');
  i++;
}
