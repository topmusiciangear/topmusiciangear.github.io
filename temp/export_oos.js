var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var m = s.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
var T = Function('return {' + m[1] + '\n};')();
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var byId = {}; prods.forEach(function (p) { byId[p.id] = p; });

var oosFlat = [];
Object.keys(T).forEach(function (id) {
  var u = T[id].urls || {}, o = T[id].oos || [], n = T[id].na || [];
  Object.keys(u).forEach(function (k) { oosFlat.push(id + ':' + k + '\t' + u[k]); });
  n.forEach(function (k) {
    var uu = T[id].urls && T[id].urls[k];
    oosFlat.push('NA ' + id + ':' + k + '\t' + (uu || '(no url for na store)'));
  });
});
console.log('total cfg.urls:', oosFlat.length);
fs.writeFileSync('temp/oos_export.txt', 'total cfg.urls: ' + oosFlat.length + '\n' + oosFlat.join('\n'), 'utf8');
oosFlat.forEach(function (l) { console.log(l); });