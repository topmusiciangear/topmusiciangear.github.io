var fs = require('fs');
var vm = require('vm');
var ctx = { console: console, Intl: Intl, JSON: JSON, encodeURIComponent: encodeURIComponent, RegExp: RegExp, Date: Date, String: String, Object: Object, Array: Array, isNaN: isNaN, parseFloat: parseFloat, parseInt: parseInt, Math: Math, Error: Error, TypeError: TypeError };
ctx.window = ctx; ctx.globalThis = ctx;
ctx.document = { documentElement: { lang: 'en' }, querySelectorAll: function () { return []; } };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('js/shop-buttons.js', 'utf8'), ctx);
var products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
process.argv.slice(2).forEach(function (id) {
  var p = products.find(function (y) { return String(y.id) === id; });
  var h = ctx.tmgStoreButtons(p);
  var rows = h.split('<a data-store="').slice(1);
  console.log('===== id ' + id + ' :: ' + p.title + ' -> ' + rows.length + ' filas');
  rows.forEach(function (r) {
    var store = r.slice(0, r.indexOf('"'));
    var href = (r.match(/href="([^"]*)"/) || [])[1] || '';
    var price = (r.match(/color:#fff">([$£€][0-9,.]+)/) || [])[1] || '-';
    var state = /data-oos="1"|Out of stock|Agotado/.test(r) ? 'OOS/grey' : (/data-na="1"|Not Available|No disponible/.test(r) ? 'NA/grey' : 'ok/white');
    console.log('  ' + String(store).padEnd(11) + state.padEnd(10) + price.padEnd(12) + href.slice(0, 60));
  });
});
