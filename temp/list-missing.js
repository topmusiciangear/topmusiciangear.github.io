var fs = require('fs');
var b = fs.readFileSync('build-guides.js', 'utf8');
var p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

var lines = b.split('\n');
var pricedIds = {};
for (var i = 0; i < lines.length; i++) {
  var m = lines[i].match(/^\s*(\d+):\s*\{/);
  if (m) {
    var id = parseInt(m[1]);
    for (var j = i; j < Math.min(i + 20, lines.length); j++) {
      if (lines[j].indexOf('musicstore:') > -1) {
        var pm = lines[j].match(/musicstore:\s*["']([^"']+)["']/);
        if (pm) {
          pricedIds[id] = pm[1];
        }
        break;
      }
    }
  }
}

var withLink = p.filter(function(x) { return x.stores && x.stores.musicstore && !pricedIds[x.id]; });

// Output as JSON array with id and title
var result = withLink.map(function(x) {
  return x.id + '|' + x.title;
});
fs.writeFileSync('temp/missing-ms.txt', result.join('\n'), 'utf8');
console.log('Written ' + result.length + ' products to missing-ms.txt');
