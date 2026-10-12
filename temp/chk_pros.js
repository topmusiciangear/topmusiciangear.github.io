var g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
var out = [];
g.forEach(function (gd) {
  var name = gd.slug || gd.id;
  var v = gd.verdictProsCons;
  if (v === undefined || v === null) { out.push(name + ' NO verdictProsCons'); return; }
  var arr = Array.isArray(v) ? v : [v];
  arr.forEach(function (it, i) {
    if (!it || typeof it !== 'object') { out.push(name + '[' + i + '] BAD-ITEM'); return; }
    [['pros', 4], ['cons', 4], ['pros_es', 4], ['cons_es', 4]].forEach(function (spec) {
      var k = spec[0], need = spec[1];
      var val = it[k];
      if (val === undefined || val === null || val === '') { out.push(name + '[' + i + '].' + k + ' MISSING'); return; }
      var n = Array.isArray(val) ? val.filter(function (x) { return String(x).trim(); }).length : String(val).split(/\n|;/).filter(function (x) { return x.trim(); }).length;
      if (n < need) out.push(name + '[' + i + '].' + k + ' has ' + n + ' (<' + need + ')');
    });
  });
});
require('fs').writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/audit2/proscons2.txt', out.join('\n'));
console.log('total:' + out.length);
var by = {};
out.forEach(function (l) { var k = l.split(' ').slice(1).join(' ').slice(0, 40); by[k] = (by[k] || 0) + 1; });
console.log(JSON.stringify(by));
out.slice(0, 40).forEach(function (l) { console.log(l); });
