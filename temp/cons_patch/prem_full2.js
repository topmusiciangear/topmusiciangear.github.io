var fs = require('fs');
var arr = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var out = [];
var g = null;
for (var i = 0; i < arr.length; i++) { if (String(arr[i].slug || '') === 'premium-interfaces') { g = arr[i]; break; } }
if (!g) { out.push('premium NOT FOUND'); }
else {
  out.push('premium FOUND idx=' + i + ' keys: ' + Object.keys(g).join(','));
  var comp = g.comparison || g.comparisonTable || null;
  out.push('\n== COMPARISON (comparison) ' + (comp ? 'PRESENT' : 'NONE') + ' ==');
  if (comp) {
    out.push('  headers    : ' + JSON.stringify(comp.headers));
    out.push('  headers_es : ' + JSON.stringify(comp.headers_es));
    var rows = comp.rows || [];
    out.push('  rows       : ' + rows.length);
    rows.forEach(function (r, ri) {
      out.push('  ROW[' + ri + '] label=' + JSON.stringify(r.label) + ' | label_es=' + JSON.stringify(r.label_es || ''));
      var cells = r.cells || [];
      cells.forEach(function (c, ci) {
        var en = String(c.value === undefined ? '' : c.value);
        var es = c.value_es === undefined ? '' : String(c.value_es);
        var esLike = /[áéíóúüñ¿¡]|Voz\/inst|inst con|Bajo coste|Smartgain|Vintage 610|Vocal\+76|2 headphone|iD scroll|Podcast|Podcast\/streaming|Vocal|Bajo coste alto|loopback/i.test(en);
        out.push('      cell[' + ci + '] EN=' + JSON.stringify(en) + ' | ES=' + JSON.stringify(es) + (esLike ? '   <<<== ES-IN-EN' : ''));
      });
    });
  }
  var vsb = g.verdictSideBySide || g.verdictSidebyside || null;
  out.push('\n== verdictSideBySide ' + (vsb ? 'PRESENT' : 'NONE') + ' ==');
  if (vsb) {
    out.push('  type: ' + (Array.isArray(vsb) ? 'array len=' + vsb.length : 'object keys=' + Object.keys(vsb).join(',')));
    if (Array.isArray(vsb)) {
      vsb.forEach(function (v, vi) { out.push('   [' + vi + '] name=' + JSON.stringify(v.name) + (v.name_es ? ' | es=' + JSON.stringify(v.name_es) : '') + ' pros=' + ((v.pros || []).length) + ' cons=' + ((v.cons || []).length)); });
    } else {
      Object.keys(vsb).forEach(function (k) { var v = vsb[k]; if (v && typeof v === 'object') { out.push('   key=' + k + ' => name=' + JSON.stringify(v.name) + ' pros=' + ((v.pros || []).length) + ' cons=' + ((v.cons || []).length)); } });
    }
  }
  var v2 = g.verdict || g.verdicts || null;
  out.push('\n== verdict/verdicts ' + (v2 ? 'PRESENT' : 'NONE') + ' ==');
  if (v2) {
    if (Array.isArray(v2)) v2.forEach(function (v, vi) { out.push('   [' + vi + '] name=' + JSON.stringify(v.name) + (v.name_es ? ' | es=' + JSON.stringify(v.name_es) : '') + ' pros=' + ((v.pros || []).length) + ' cons=' + ((v.cons || []).length)); });
    else out.push('   keys=' + Object.keys(v2).join(','));
  }
}
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/prem_full2.txt', out.join('\n'), 'utf8');
console.log('wrote ' + out.length + ' lines');
