var fs = require('fs');
var t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
var data = JSON.parse(t);
var list = data.guides || [];
var out = [];
function esLeak(s) {
  var dict = ['Voz/inst', 'Bajo coste', 'Podcast/streaming', 'Smartgain', 'iD scroll', 'Vocal+76', 'loopback', 'streaming', 'Solo '];
  var hit = null;
  dict.forEach(function (w) { if (s.indexOf(w) >= 0) hit = w; });
  return hit;
}
list.forEach(function (g) {
  var slug = g.slug || g.id || '';
  if (slug.indexOf('premium-interfaces') < 0 && slug.indexOf('portable-interfaces') < 0) return;
  out.push('################################ ' + slug + ' ################################');
  out.push('title   : ' + g.title);
  out.push('title_es: ' + (g.title_es || ''));
  var comp = g.comparison || g.compareTable || {};
  if (!comp.rows) comp = { rows: comp };
  out.push('COMPARISON rows: ' + (comp.rows ? comp.rows.length : 0));
  (comp.rows || []).forEach(function (r, ri) {
    var leak = esLeak(String(r.label || ''));
    out.push('  row[' + ri + '] label=' + JSON.stringify(r.label) + (r.label_es ? ' | label_es=' + JSON.stringify(r.label_es) : '') + (leak ? '  <-- ES LEAK' : ''));
    (r.cells || []).forEach(function (c, ci) {
      var v = c.value;
      var ve = c.value_es;
      var leakC = esLeak(String(v || ''));
      out.push('      cell[' + ci + '] value=' + JSON.stringify(v) + (ve !== undefined ? ' | value_es=' + JSON.stringify(ve) : '') + (leakC ? '  <-- ES IN EN value' : ''));
    });
  });
  var vt = g.verdicts || (g.verdict && g.verdict.products) || [];
  out.push('VERDICTS: ' + (vt.length || 0));
  (vt || []).forEach(function (v, i) {
    out.push('  v[' + i + '] name=' + JSON.stringify(v.name) + (v.name_es ? ' | es:' + JSON.stringify(v.name_es) : '') + (v.pros ? ' pros=' + v.pros.length : '') + (v.cons ? ' cons=' + v.cons.length : '') + (v.pros_es ? ' pros_es=' + v.pros_es.length : '') + (v.cons_es ? ' cons_es=' + v.cons_es.length : ''));
  });
  out.push('');
});
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/comp_ssot.txt', out.join('\n'), 'utf8');
console.log('OK wrote ' + out.length + ' lines');
