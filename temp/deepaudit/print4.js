var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
function byId(id) { return g.find(function (x) { return x.id === id; }); }

var gd = byId('best-monitors');
gd.verdictProsCons.forEach(function (v, i) {
  console.log('\n## [best-monitors][' + i + '] ' + JSON.stringify(v.name) + ' / ' + JSON.stringify(v.name_es));
  (v.pros || []).forEach(function (p, j) { console.log('  pros[' + j + '] EN=' + JSON.stringify(p)); });
  (v.pros_es || []).forEach(function (p, j) { console.log('  pros_es[' + j + '] ES=' + JSON.stringify(p)); });
  // cons adjacent not needed fully
});

var gd2 = byId('best-live-sound-mixers');
console.log('\n== best-live-sound-mixers verdictProsCons[1] ==');
console.log(JSON.stringify(gd2.verdictProsCons[1], null, 1));

var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
['LP-UNF', 'LP-6 V2', 'T5V', 'ELX200', 'ZLX-12P-G2', 'EVOX', 'DBR12', 'EVO 4'].forEach(function (q) {
  prods.forEach(function (x) {
    if (x.title && x.title.toLowerCase().indexOf(q.toLowerCase()) >= 0) console.log(q + ' => id ' + x.id + ' | ' + x.title + ' | $' + x.price);
  });
});