var fs = require('fs');
var p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var withLink = p.filter(function(x) { return x.stores && x.stores.musicstore; });
var result = withLink.map(function(x) {
  return { id: x.id, title: x.title, url: x.stores.musicstore };
});
console.log(JSON.stringify(result, null, 2));
