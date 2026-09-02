var fs = require('fs');
var h = fs.readFileSync('guides/mixing-plugins_es.html', 'utf8');

// Find the smart:EQ 4 section and its Music Store link
var idx = h.indexOf('smart-EQ-4');
if (idx >= 0) {
  // Find the shop-btn area near this product
  var section = h.substring(Math.max(0, idx - 2000), idx + 5000);
  // Find all musicstore hrefs
  var re = /href="([^"]*musicstore[^"]*)"/g;
  var m;
  while (m = re.exec(section)) {
    console.log('Music Store URL:', m[1].substring(0, 150));
  }
} else {
  console.log('smart-EQ-4 not found');
}
