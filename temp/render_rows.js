var fs = require('fs');
var vm = require('vm');
var src = fs.readFileSync('js/shop-buttons.js', 'utf8');
var ctx = { console: console, Intl: Intl, JSON: JSON, encodeURIComponent: encodeURIComponent, RegExp: RegExp, Date: Date, String: String, Object: Object, Array: Array, isNaN: isNaN, parseFloat: parseFloat, parseInt: parseInt, Math: Math, Error: Error, TypeError: TypeError };
ctx.window = ctx; ctx.globalThis = ctx;
ctx.document = { documentElement: { lang: 'en' }, querySelectorAll: function () { return []; } };
vm.createContext(ctx);
vm.runInContext(src, ctx);
var products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
process.argv.slice(2).forEach(function (id) {
  var p = products.find(function (y) { return String(y.id) === id; });
  if (!p) { console.log(id + ': NOT IN CATALOG'); return; }
  var html = ctx.tmgStoreButtons(p);
  console.log('===== id ' + id + ' :: ' + p.title + (p.unit ? ' [unit=' + p.unit + ']' : ' [no unit]') + ' =====');
  // split on each opening <a
  var parts = html.split(/<a\b/).slice(1);
  parts.forEach(function (part) {
    var store = (part.match(/data-store="([a-z]+)"/) || [])[1];
    if (!store) return;
    var href = (part.match(/href="([^"]*)"/) || [])[1] || '';
    var isPrimary = /shop-btn-primary/.test(part.slice(0, 200));
    var price = '';
    var m = part.match(/font-weight:700[^>]*>\s*([$£€][0-9.,]+|Verificar precio|Check price)/);
    if (m) price = m[1];
    var oos = /Out of stock|Agotado/.test(part);
    var na = /Not Available|No disponible/.test(part);
    var label = oos ? 'OOS/grey' : na ? 'NA/grey' : (isPrimary ? 'primary' : 'white');
    console.log('  ' + String(store).padEnd(11) + label.padEnd(10) + price.padEnd(14) + href.slice(0, 72));
  });
  var each = /each|cada uno/.test(html);
  console.log('  -> "(each)" in render: ' + each);
});
