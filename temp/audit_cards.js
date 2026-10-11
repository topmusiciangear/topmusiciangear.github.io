var fs = require('fs');
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var byId = {};
prods.forEach(function (p) { byId[p.id] = p; });
// extract TEST_SHOP_BTN via regex from build-guides.js
var src = fs.readFileSync('build-guides.js', 'utf8');
var m = src.match(/const TEST_SHOP_BTN = \{[\s\S]*?\n\};/);
console.log('BTN block found: ' + !!m);
var btnIds = {};
if (m) {
  var re = /^  (\d+): \{/gm, mm;
  while ((mm = re.exec(m[0]))) btnIds[+mm[1]] = true;
}
console.log('TEST_SHOP_BTN entries: ' + Object.keys(btnIds).length + ' / products: ' + prods.length);
// 1. products in guides without BTN entry
var used = {};
guides.forEach(function (g) {
  [g.featuredProducts || [], g.products || []].forEach(function (arr) { arr.forEach(function (id) { used[id] = true; }); });
  (g.sections || []).forEach(function (s) { (s.products || []).forEach(function (id) { used[id] = true; }); });
  if (g.productTable && g.productTable.columns) g.productTable.columns.forEach(function () { });
});
var noBtn = Object.keys(used).filter(function (id) { return !btnIds[id]; });
console.log('products used in guides WITHOUT BTN entry (' + noBtn.length + '): ' + noBtn.slice(0, 40).join(','));
// 2. Estimated Price vs products.json price: flag table cells contradicting catalog price wildly
var bad = [];
guides.forEach(function (g) {
  if (!g.productTable || !g.productTable.rows) return;
  var cols = g.productTable.columns;
  var row = g.productTable.rows.find(function (r) { return /price|precio/i.test(r.label + ' ' + (r.label_es || '')); });
  if (!row) return;
  // map column -> product id: match title to products.json
  cols.forEach(function (c, i) {
    var p = prods.find(function (pp) { return pp.title === c.title; });
    if (!p || !p.price) return;
    var cell = (row.values[i] || {}).value || '';
    var nums = cell.replace(/,/g, '').match(/\$?\s*(\d+(?:\.\d+)?)/g);
    if (!nums) return;
    var vals = nums.map(function (n) { return parseFloat(n.replace(/[^0-9.]/g, '')); }).filter(function (n) { return n > 0; });
    if (!vals.length) return;
    var cellMin = Math.min.apply(null, vals);
    // per-unit vs pair: allow 2x tolerance
    var ratio = cellMin / p.price;
    if (ratio < 0.4 || ratio > 2.6) bad.push(g.id + ' :: ' + c.title + ' catalog$' + p.price + ' vs table "' + cell + '"');
  });
});
console.log('PRICE MISMATCH table-vs-catalog (' + bad.length + '):');
bad.slice(0, 60).forEach(function (b) { console.log('  ' + b); });
