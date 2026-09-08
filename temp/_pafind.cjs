var P = require('../data/products.json');
var needles = ['EON712', 'EON 712', 'ICOA', '12A BT', 'ELX200-15', 'SRX815', 'SRX 815', 'Passive', 'Stagepas', 'K12.2', 'PRX912', 'VTX', 'DBR12', 'DBR15', 'CP8', 'CP12'];
P.forEach(function (p) {
  var t = p.title;
  if (needles.some(function (n) { return t.toLowerCase().indexOf(n.toLowerCase()) >= 0; })) {
    console.log(p.id + ' | ' + t + ' | cat=' + p.category + ' | price=' + p.price + ' | stores=' + Object.keys(p.stores || {}).join(','));
  }
});