var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var m = s.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
var T = Function('return {' + m[1] + '\n};')();
var needles = ['$50.00', '€639.00', '€529.00', '€217.60', '€1,349.00', '$1,839.99', '£1,549.00', '€66.00', '€699.00', '€1,867.23', '£112.75', '$69.00', '$73.00', '$350.00'];
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var byId = {}; prods.forEach(function (p) { byId[p.id] = p; });
needles.forEach(function (nd) {
  var hit = [];
  Object.keys(T).forEach(function (id) {
    var p = T[id].prices || {};
    Object.keys(p).forEach(function (k) { if (p[k] === nd) hit.push(id + ':' + k + '=' + p[k] + ' (' + (byId[id] ? byId[id].title.slice(0, 30) : '?') + ')'); });
  });
  console.log(nd.padEnd(14), '->', hit.length ? hit.join(' | ') : 'none');
});