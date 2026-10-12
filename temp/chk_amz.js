var prods = require('../data/products.json');
[[26, 'B000AJIF4E'], [56, 'B0011UB9CQ'], [422, 'B00004SY4H']].forEach(function (pair) {
  var p = prods.find(function (x) { return x.id === pair[0]; });
  if (!p) { console.log('NO PRODUCT ' + pair[0]); return; }
  var ok = Object.values(p.stores || {}).some(function (u) { return String(u).indexOf(pair[1]) >= 0; });
  console.log(pair[0] + ' ' + p.title + ' | asin-match:' + ok + ' | img:' + !!p.img);
});
