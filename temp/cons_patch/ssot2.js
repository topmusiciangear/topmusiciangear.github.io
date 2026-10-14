var fs = require('fs');
var list = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
if (!Array.isArray(list)) { list = list.guides || list.data || []; }
var out = [];
out.push('TOTAL ' + list.length);
function get(slug) {
  var i;
  for (i = 0; i < list.length; i++) { var s = list[i].slug || list[i].id || ''; if (s === slug) return list[i]; }
  return null;
}
['premium-interfaces', 'portable-interfaces'].forEach(function (slug) {
  var g = get(slug);
  out.push('\n########## ' + slug + ' ' + (g ? 'FOUND' : 'NOT FOUND') + ' ##########');
  if (!g) return;
  out.push('title    : ' + JSON.stringify(g.title));
  out.push('title_es : ' + JSON.stringify(g.title_es));
  out.push('h1       : ' + JSON.stringify(g.h1 || g.heading || ''));
  out.push('keys     : ' + Object.keys(g).join(','));
  var comp = g.comparison || g.compTable || g.compareTable || null;
  out.push('COMPARISON: ' + (comp ? 'PRESENT' : 'NONE'));
  if (comp) {
    out.push('  row count: ' + (comp.rows ? comp.rows.length : 0));
    (comp.rows || []).forEach(function (r, ri) {
      out.push('  ROW[' + ri + '] label=' + JSON.stringify(r.label) + ' | label_es=' + JSON.stringify(r.label_es || ''));
      (r.cells || []).forEach(function (c, ci) {
        var bad = 0;
        if (/(Voz|inst|Smartgain|loopback|Bajo coste|Podcast|streaming|Vintage|2 headphone|iD scroll|Vocal|Vocal\+76|Vocal\+76|Smartgain|Vintage 610)/.test(String(c.value))) bad = 1;
        out.push('    c[' + ci + '] value=' + JSON.stringify(c.value) + (c.value_es !== undefined ? ' | value_es=' + JSON.stringify(c.value_es) : '') + (bad ? '   <== ES-LIKE IN EN VALUE' : ''));
      });
    });
  }
  var vd = g.verdict || g.verdicts || g.verdictProsCons || null;
  out.push('VERDICT: ' + (vd ? (Array.isArray(vd) ? 'array len=' + vd.length : 'object keys=' + Object.keys(vd).join(',')) : 'NONE'));
  var arr = Array.isArray(vd) ? vd : null;
  (arr || []).forEach(function (v, i) {
    out.push('   verdict[' + i + '] name=' + JSON.stringify(v.name) + (v.name_es ? ' | es=' + JSON.stringify(v.name_es) : '') + ' pros=' + ((v.pros || []).length) + ' cons=' + ((v.cons || []).length));
  });
  var pc = g.productCards || g.cards || null;
  out.push('PRODUCT CARDS: ' + (pc ? pc.length : ((g.products && g.products.length) || (g.productsTable && g.productsTable.length) || 'NONE')));
});
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/ssot2.txt', out.join('\n'), 'utf8');
console.log('wrote ' + out.join('\n').length);
