var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/';
var guides = JSON.parse(fs.readFileSync(P + 'data/guides.json', 'utf8'));
var prods = JSON.parse(fs.readFileSync(P + 'data/products.json', 'utf8'));
var byId = {};
prods.forEach(function (p) { byId[p.id] = p; });
var MONEY = /([$£€])\s?(\d[\d.,]*)/g;
var flags = [];
guides.forEach(function (g) {
  var name = g.slug || g.id;
  var featNums = (g.featuredProducts || []).map(function (id) {
    if (!byId[id]) return null;
    var m = String(byId[id].price).match(/[\d.,]+/);
    return m ? parseFloat(m[0].replace(/,/g, '')) : null;
  }).filter(function (n) { return n !== null; });
  (function walk(v, path) {
    if (typeof v === 'string') {
      if (/productTable|comparison|price/i.test(path)) return; // tables legit
      var m; MONEY.lastIndex = 0;
      while ((m = MONEY.exec(v))) {
        var num = parseFloat(m[2].replace(/,/g, ''));
        if (!(num >= 20)) continue;
        if (num % 50 === 0) continue; // round thresholds
        var ok = featNums.some(function (f) { return Math.abs(f - num) < Math.max(1, f * 0.03); });
        if (!ok) flags.push(name + ' :: ' + path + ' :: ' + m[0] + ' :: ...' + v.slice(Math.max(0, m.index - 90), m.index + 60).replace(/\s+/g, ' '));
      }
      return;
    }
    if (Array.isArray(v)) v.forEach(function (x, i) { walk(x, path + '[' + i + ']'); });
    else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { walk(v[k], path ? path + '.' + k : k); });
  })(g, '');
});
fs.writeFileSync(P + 'temp/audit2/money_prose.txt', flags.join('\n'));
console.log('prose money flags:' + flags.length);
flags.slice(0, 60).forEach(function (l) { console.log(l.slice(0, 230)); });
