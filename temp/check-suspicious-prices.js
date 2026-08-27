var fs = require('fs');
var btn = fs.readFileSync('build-guides.js', 'utf8');
var m = btn.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
if (!m) { console.log('No TEST_SHOP_BTN found'); process.exit(); }

var lines = m[1].split('\n');
var suspicious = [];

lines.forEach(function(l) {
  var idMatch = l.match(/^\s*(\d+):/);
  if (!idMatch) return;
  var id = parseInt(idMatch[1]);

  // Find all dollar prices
  var re = /\$(\d[\d,]*\.?\d*)/g;
  var pm;
  while ((pm = re.exec(l)) !== null) {
    var price = parseFloat(pm[1].replace(/,/g, ''));
    if (price > 0 && price < 10) suspicious.push(id + ': $' + pm[1] + ' (too low)');
    if (price > 6000) suspicious.push(id + ': $' + pm[1] + ' (very high)');
  }

  // Find all GBP prices
  var re2 = /\u00a3(\d[\d,]*\.?\d*)/g;
  while ((pm = re2.exec(l)) !== null) {
    var price = parseFloat(pm[1].replace(/,/g, ''));
    if (price > 0 && price < 5) suspicious.push(id + ': GBP ' + pm[1] + ' (too low)');
    if (price > 5000) suspicious.push(id + ': GBP ' + pm[1] + ' (very high)');
  }

  // Find all EUR prices
  var re3 = /\u20ac(\d[\d,]*\.?\d*)/g;
  while ((pm = re3.exec(l)) !== null) {
    var price = parseFloat(pm[1].replace(/,/g, ''));
    if (price > 0 && price < 5) suspicious.push(id + ': EUR ' + pm[1] + ' (too low)');
    if (price > 5000) suspicious.push(id + ': EUR ' + pm[1] + ' (very high)');
  }
});

suspicious.forEach(function(s) { console.log(s); });
console.log('\nTotal suspicious:', suspicious.length);
