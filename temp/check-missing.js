var fs = require('fs');
var b = fs.readFileSync('build-guides.js', 'utf8');
var p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Find IDs with musicstore price in TEST_SHOP_BTN
var lines = b.split('\n');
var pricedIds = {};
for (var i = 0; i < lines.length; i++) {
  var m = lines[i].match(/^\s*(\d+):\s*\{/);
  if (m) {
    var id = parseInt(m[1]);
    for (var j = i; j < Math.min(i + 15, lines.length); j++) {
      if (lines[j].indexOf('musicstore:') > -1 && lines[j].indexOf("prices:") === -1) {
        var pm = lines[j].match(/musicstore:\s*["']([^"']+)["']/);
        if (pm) {
          pricedIds[id] = pm[1];
        }
        break;
      }
    }
  }
}

// Find IDs with musicstore link but no price
var withLink = p.filter(function(x) { return x.stores && x.stores.musicstore; });
var missing = withLink.filter(function(x) { return !pricedIds[x.id]; });

console.log('Already priced: ' + Object.keys(pricedIds).length);
console.log('Missing price: ' + missing.length);
console.log('Missing IDs: ' + missing.map(function(x) { return x.id; }).join(', '));
