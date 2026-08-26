var fs = require('fs');
var b = fs.readFileSync('build-guides.js', 'utf8');
var p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Find IDs with musicstore link but no musicstore price
var lines = b.split('\n');
var pricedIds = {};
for (var i = 0; i < lines.length; i++) {
  var m = lines[i].match(/^\s*(\d+):\s*\{/);
  if (m) {
    var id = parseInt(m[1]);
    for (var j = i; j < Math.min(i + 20, lines.length); j++) {
      if (lines[j].indexOf('musicstore:') > -1) {
        var pm = lines[j].match(/musicstore:\s*["']([^"']+)["']/);
        if (pm) pricedIds[id] = true;
        break;
      }
    }
  }
}

var missing = p.filter(function(x) {
  return x.stores && x.stores.musicstore && !pricedIds[x.id];
});

// Output as tab-separated for easy searching
var output = missing.map(function(x) {
  return x.id + '\t' + x.title;
}).join('\n');

fs.writeFileSync('temp/missing-all.txt', output, 'utf8');
console.log('Total missing: ' + missing.length);
console.log('IDs: ' + missing.map(function(x) { return x.id; }).join(', '));
