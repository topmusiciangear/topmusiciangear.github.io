var fs = require('fs');
var p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var q = process.argv.slice(2);
q.forEach(function (name) {
  var hits = p.filter(function (x) { return (x.title || '').toLowerCase().indexOf(name.toLowerCase()) >= 0; });
  if (!hits.length) { console.log('?? no match: ' + name); return; }
  hits.forEach(function (x) {
    console.log('### id ' + x.id + ' :: ' + x.title);
    console.log('    price=' + x.price + ' exclude=' + JSON.stringify(x.excludeStores) + ' oos=' + JSON.stringify(x.oos));
    Object.keys(x.stores || {}).forEach(function (s) { console.log('    ' + s.padEnd(11) + ' ' + String(x.stores[s]).slice(0, 120)); });
  });
});
