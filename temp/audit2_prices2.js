var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/';
var guides = JSON.parse(fs.readFileSync(P + 'data/guides.json', 'utf8'));
var prods = JSON.parse(fs.readFileSync(P + 'data/products.json', 'utf8'));
function catNum(p) { var m = String(p.price || '').match(/[\d.,]+/); return m ? parseFloat(m[0].replace(/,/g, '')) : null; }
var STOP = { the: 1, and: 1, for: 1, pro: 1, plus: 1, with: 1, edition: 1, series: 1, del: 1, los: 1, las: 1, una: 1, para: 1, con: 1, gen: 1, mkii: 1, mkiii: 1 };
var prods2 = prods.map(function (p) {
  var words = (p.title || '').toLowerCase().replace(/[^a-z0-9áéíóúñ ]/gi, ' ').split(/\s+/).filter(function (w) { return w.length > 2 && !STOP[w]; });
  return { id: p.id, title: p.title, price: catNum(p), words: words };
}).filter(function (p) { return p.price && p.words.length >= 2; });
var MONEY = /([$£€])\s?(\d[\d.,]*)/g;
var out = [];
guides.forEach(function (g) {
  var name = g.slug || g.id;
  (function walk(v, path) {
    if (typeof v === 'string') {
      if (/productTable|comparison/i.test(path)) return;
      var m; MONEY.lastIndex = 0;
      while ((m = MONEY.exec(v))) {
        var num = parseFloat(m[2].replace(/,/g, ''));
        if (!(num >= 20)) continue;
        if (num % 50 === 0) continue;
        var lo = Math.max(0, m.index - 45), hi = m.index + 45;
        var win = v.slice(lo, hi), slow = win.toLowerCase();
        var isPair = /pair|\bpar\b|el par/.test(slow);
        prods2.forEach(function (p) {
          var hits = p.words.filter(function (w) { return slow.indexOf(w) >= 0; }).length;
          if (hits >= Math.min(3, p.words.length) && hits >= 2) {
            var expected = isPair ? p.price * 2 : p.price;
            if (Math.abs(expected - num) / expected > 0.06)
              out.push(name + ' :: ' + path.split('.').pop() + ' :: claimed ' + m[0] + (isPair ? '(pair)' : '') + ' vs #' + p.id + ' ' + p.title + ' cat$' + p.price + ' :: ' + win.replace(/\s+/g, ' '));
          }
        });
      }
      return;
    }
    if (Array.isArray(v)) v.forEach(function (x, i) { walk(x, path + '[' + i + ']'); });
    else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { walk(v[k], path ? path + '.' + k : k); });
  })(g, '');
});
var seen = {};
out = out.filter(function (l) { var k = l.slice(0, 110); if (seen[k]) return false; seen[k] = 1; return true; });
fs.writeFileSync(P + 'temp/audit2/price_strict.txt', out.join('\n'));
console.log('strict mismatches:' + out.length);
out.forEach(function (l) { console.log(l.slice(0, 250)); });
