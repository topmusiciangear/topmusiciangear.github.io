var g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
var x = g.find(function (y) { return y.id === 'ableton-vs-logic'; });
console.log('conclusion_es: ' + JSON.stringify(x.conclusion_es));
console.log('\n--- paradigm searches ---');
g.forEach(function (y, i) {
  (function walk(o, path) {
    if (typeof o === 'string') {
      if (/R50x|R30x|ATH-R/.test(o)) console.log('[' + i + '].' + path + ' ' + JSON.stringify(o.match(/[^"<>]{0,50}(R50x|R30x|ATH-R)[^"<>]{0,30}/g)));
      return;
    }
    if (Array.isArray(o)) { o.forEach(function (v, j) { walk(v, path + '[' + j + ']'); }); return; }
    if (o && typeof o === 'object') Object.keys(o).forEach(function (k) { walk(o[k], path + '.' + k); });
  })(y, '');
});