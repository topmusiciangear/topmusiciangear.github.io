var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/';
var guides = JSON.parse(fs.readFileSync(P + 'data/guides.json', 'utf8'));
var prods = JSON.parse(fs.readFileSync(P + 'data/products.json', 'utf8'));
var byId = {};
prods.forEach(function (p) { byId[p.id] = p; });

// volume of Spanish-in-EN fields for the 2 guides
['best-drum-machine', 'compact-rhythm-devices'].forEach(function (slug) {
  var g = guides.filter(function (x) { return (x.slug || x.id) === slug; })[0];
  var words = 0, fields = [];
  (function walk(v, path) {
    if (typeof v === 'string') {
      var isESPath = /_es(\.|$|\[)/.test(path + '.') || /(^|\.)[a-z0-9_]*_es$/.test(path);
      if (!isESPath && /[áéíóúñ¿¡]/.test(v)) { words += v.split(/\s+/).length; fields.push(path + ' (' + v.split(/\s+/).length + 'w)'); }
      return;
    }
    if (Array.isArray(v)) v.forEach(function (x, i) { walk(x, path + '[' + i + ']'); });
    else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { walk(v[k], path ? path + '.' + k : k); });
  })(g, '');
  console.log(slug + ': ' + words + ' Spanish words in EN fields, ' + fields.length + ' fields');
  fields.slice(0, 40).forEach(function (f) { console.log('   ' + f); });
});

// money in prose vs featured prices per guide
var MONEY = /([$£€])\s?(\d[\d.,]*)/g;
var flags = [];
guides.forEach(function (g) {
  var name = g.slug || g.id;
  var featPrices = (g.featuredProducts || []).map(function (id) { return byId[id] ? byId[id].price : null; }).filter(Boolean);
  var featNums = featPrices.map(function (p) { var m = String(p).match(/[\d.,]+/); return m ? parseFloat(m[0].replace(/,/g, '')) : null; }).filter(function (n) { return n !== null; });
  function normNum(s) { return parseFloat(s.replace(/,/g, '')); }
  (function walk(v, path) {
    if (typeof v === 'string') {
      // skip price-table-ish structured values? keep all, filter later
      var m; MONEY.lastIndex = 0;
      while ((m = MONEY.exec(v))) {
        var raw = m[0], num = normNum(m[2]);
        var isRound = num % 50 === 0 || /^(under|around|about|up to|menos de|alrededor|hasta|por menos de)/i.test(v.slice(Math.max(0, m.index - 25), m.index));
        var matchesFeat = featNums.some(function (f) { return Math.abs(f - num) < Math.max(1, f * 0.02); });
        if (!isRound && !matchesFeat && num >= 20) {
          flags.push(name + ' :: ' + path + ' :: ' + raw + ' :: ...' + v.slice(Math.max(0, m.index - 80), m.index + 80).replace(/\s+/g, ' '));
        }
      }
      return;
    }
    if (Array.isArray(v)) v.forEach(function (x, i) { walk(x, path + '[' + i + ']'); });
    else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { walk(v[k], path ? path + '.' + k : k); });
  })(g, '');
});
fs.writeFileSync(P + 'temp/audit2/money_flags.txt', flags.join('\n'));
console.log('money flags:' + flags.length);
flags.slice(0, 40).forEach(function (l) { console.log(l.slice(0, 220)); });
