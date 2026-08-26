var fs = require('fs');
var b = fs.readFileSync('build-guides.js', 'utf8');

// Find all musicstore price entries in PRICE_OVERRIDES
var lines = b.split('\n');
var ids = [];
for (var i = 0; i < lines.length; i++) {
  var m = lines[i].match(/^\s*(\d+):\s*\{/);
  if (m) {
    var id = parseInt(m[1]);
    // Look ahead for musicstore price
    for (var j = i; j < Math.min(i + 10, lines.length); j++) {
      if (lines[j].indexOf('musicstore:') > -1 && lines[j].indexOf("prices:") === -1) {
        var pm = lines[j].match(/musicstore:\s*["']([^"']+)["']/);
        if (pm) {
          ids.push({ id: id, price: pm[1] });
        }
        break;
      }
    }
  }
}
console.log('Products with musicstore price in PRICE_OVERRIDES: ' + ids.length);

// Check products with musicstore link but no price
var products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var withLink = products.filter(function(x) { return x.stores && x.stores.musicstore; });
console.log('Products with musicstore link: ' + withLink.length);

// IDs that have price
var pricedIds = {};
ids.forEach(function(x) { pricedIds[x.id] = true; });

var missing = withLink.filter(function(x) { return !pricedIds[x.id]; });
console.log('Products with link but NO price: ' + missing.length);
console.log('IDs missing prices: ' + missing.map(function(x) { return x.id; }).join(', '));
