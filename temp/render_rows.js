var fs = require('fs');
var vm = require('vm');
var src = fs.readFileSync('js/shop-buttons.js', 'utf8');
var ctx = { console: console };
ctx.window = ctx;
ctx.globalThis = ctx;
ctx.document = { documentElement: { lang: 'en' }, querySelectorAll: function () { return []; } };
vm.createContext(ctx);
try {
  vm.runInContext('(function(){' + src + '\n})()', ctx);
} catch (e) {
  console.log('PARSE ERROR: ' + e.message);
  process.exit(1);
}
var products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
process.argv.slice(2).forEach(function (id) {
  var p = products.find(function (y) { return String(y.id) === id; });
  if (!p) { console.log(id + ': NOT IN CATALOG'); return; }
  var html = ctx.tmgStoreButtons ? ctx.tmgStoreButtons(p) : '(no tmgStoreButtons)';
  console.log('===== id ' + id + ' :: ' + p.title + ' =====');
  if (!html) { console.log('  (empty)'); return; }
  var rows = html.match(/<a[^>]*data-store="[a-z]+"[\s\S]{0,600}?<\/a>/g) || [];
  rows.forEach(function (r) {
    var store = (r.match(/data-store="([a-z]+)"/) || [])[1];
    var href = (r.match(/href="([^"]*)"/) || [])[1] || '';
    var price = (r.match(/color:#fff">([^<]+)</) || [])[1] || '';
    var flag = /Out of stock|Agotado/.test(r) ? 'OOS' : (/Not Available|No disponible/.test(r) ? 'NA ' : '   ');
    console.log('  ' + String(store).padEnd(11) + flag + ' ' + price.padEnd(11) + href.slice(0, 100));
  });
  console.log('  rows=' + rows.length);
});
