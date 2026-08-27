var fs = require('fs');
var p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var ids = [373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394];
ids.forEach(function(id) {
  var prod = p.find(function(x) { return x.id === id; });
  if (prod) {
    console.log('\nID ' + id + ' - ' + prod.title);
    console.log('  Stores:', JSON.stringify(prod.stores));
  }
});
