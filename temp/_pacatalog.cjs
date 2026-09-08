var P = require('../data/products.json');
console.log('=== all live_sound products ===');
P.filter(function (p) { return p.category === 'live_sound'; }).forEach(function (p) {
  console.log(p.id + ' | ' + p.title + ' | $' + p.price + ' | ' + Object.keys(p.stores).join(','));
});
console.log('\n=== any product mentioning 15, passive, column, array ===');
P.forEach(function (p) {
  var t = p.title.toLowerCase();
  if (t.indexOf('passive') >= 0 || t.indexOf('15') >= 0 || t.indexOf('column') >= 0 || t.indexOf('lobby') >= 0 || t.indexOf('sled') >= 0) {
    console.log(p.id + ' | ' + p.title + ' | cat=' + p.category);
  }
});