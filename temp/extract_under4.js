var d = require('../data/guides.json');
var out = [];
for (var k in d) {
  var g = d[k];
  if (!g || !g.id) continue;
  var vp = g.verdictProsCons || [];
  for (var j = 0; j < vp.length; j++) {
    var p = vp[j];
    var c = p.cons || [], ce = p.cons_es || [];
    if (c.length < 4) {
      out.push('# ' + g.id + ' [' + g.category + ']');
      out.push('PRODUCT: ' + p.name + '  (name_es: ' + p.name_es + ')');
      for (var i = 0; i < c.length; i++) {
        out.push('C' + (i + 1) + ' en: ' + c[i]);
        out.push('C' + (i + 1) + ' es: ' + (ce[i] || ''));
      }
      out.push('');
    }
  }
}
require('fs').writeFileSync('temp/under4_cons.txt', out.join('\n'));
console.log('total lines: ' + out.length);