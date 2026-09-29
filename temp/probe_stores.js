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
  var re = /data-store="([a-z0-9]+)"/g, m, list = [];
  while ((m = re.exec(h))) list.push(m[1]);
  console.log('id ' + id + ' stores rendered (' + list.length + '): ' + list.join(', '));
  console.log('   product.stores keys: ' + Object.keys(p.stores || {}).join(', '));
  var i = h.indexOf('gear4music');
  console.log('   "gear4music" text in html: ' + (i >= 0 ? 'YES' : 'NO'));
  if (i >= 0) console.log('   ctx: ...' + h.slice(Math.max(0, i - 200), i + 100).replace(/\s+/g, ' '));
});
