var fs = require('fs');
['data/price-history.json', 'data/manual-deals.json', 'data/deals.json'].forEach(function (f) {
  if (!fs.existsSync(f)) { console.log(f, 'MISSING'); return; }
  var d = JSON.parse(fs.readFileSync(f, 'utf8'));
  var s = JSON.stringify(d);
  [66, 67, 101, 125].forEach(function (id) {
    if (s.indexOf('"' + id + '"') > -1) console.log(f, 'references', id);
  });
});
console.log('checked');