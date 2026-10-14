var g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
var found = [];
g.forEach(function (x, gi) {
  (function walk(o, path) {
    if (o == null) return;
    if (typeof o === 'string') {
      var m = o.match(/\bEach[,.]/g);
      if (m) found.push('[' + gi + '].' + path + ' (' + m.length + '): ' + o.match(/[^"]*Each[,][^".]{0,150}/g).join(' || '));
      return;
    }
    if (Array.isArray(o)) { o.forEach(function (v, i) { walk(v, path + '[' + i + ']'); }); return; }
    Object.keys(o).forEach(function (k) { walk(o[k], path ? path + '.' + k : k); });
  })(x, '');
});
console.log(found.length + ' matches');
found.forEach(function (f) { console.log('---\n' + f); });