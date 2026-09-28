var fs = require('fs');
var data = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var list = data.guides || data.guide || [];
if (!Array.isArray(list)) {
  list = Object.keys(data).map(function (k) { return data[k]; });
}
var targets = ['portable-interfaces', 'premium-interfaces'];
var out = [];
out.push('TOTAL TOP-LEVEL GUIDES: ' + list.length);
if (list.length === 0) out.push('NO ARRAY FOUND — top keys: ' + Object.keys(data).slice(0, 20).join(', '));
targets.forEach(function (slug) {
  var g = null;
  for (var i = 0; i < list.length; i++) {
    var x = list[i];
    if ((x.slug === slug) || (x.id === slug) || (x.guide_id === slug)) { g = x; break; }
  }
  out.push('\n========== ' + slug + ' ' + (g ? 'FOUND index=' + i : 'NOT FOUND by slug/id') + ' ==========');
  if (!g) {
    var partial = list.filter(function (x) { return (x.slug || '').indexOf(slug.split('-')[0]) >= 0 || (x.id || '').indexOf(slug.split('-')[0]) >= 0; }).map(function (x) { return x.slug || x.id; });
    out.push('  candidates containing "' + slug.split('-')[0] + '": ' + JSON.stringify(partial));
    return;
  }
  out.push('title      : ' + g.title);
  out.push('title_es   : ' + g.title_es);
  out.push('h1         : ' + (g.h1 || g.heading || '(none)'));
  if (g.products) {
    out.push('products[' + g.products.length + ']:');
    g.products.forEach(function (p, i) {
      out.push('   [' + i + '] ' + (p.name || p.name_es || p.product || '?') + (p.name_es ? '  | es:' + p.name_es : ''));
    });
  }
  var comp = g.comparison || g.compareTable || g.compTable;
  out.push('comparison block: ' + (comp ? 'present' : 'NONE'));
  if (comp) {
    out.push('   headers(' + ((comp.headers || []).length) + '): ' + (comp.headers || []).join(' | '));
    out.push('   headers_es(' + ((comp.headers_es || []).length) + '): ' + (comp.headers_es || []).join(' | '));
    (comp.rows || []).forEach(function (r, ri) {
      out.push('   ROW[' + ri + '] label=' + r.label + (r.label_es ? ' | label_es=' + r.label_es : '') + ' cells=' + (r.cells ? r.cells.length : 0));
      (r.cells || []).forEach(function (c, ci) {
        var enc = [c.value, c.value_en, c.value_es, c.raw, c.text, c.h, c.h_es].map(function (v) { return v === undefined ? 'U' : (typeof v === 'string' ? '"' + v + '"' : v); });
        out.push('        cell[' + ci + '] value=' + enc[0] + ' value_en=' + enc[1] + ' value_es=' + enc[2] + ' raw=' + enc[3] + ' text=' + enc[4] + ' h=' + enc[5] + ' h_es=' + enc[6]);
      });
    });
  }
  out.push('verdicts: ' + (g.verdicts ? g.verdicts.length : (g.verdict ? 'object' : 'NONE')));
  (g.verdicts || []).forEach(function (v, i) {
    out.push('   verdict[' + i + '] name=' + v.name + (v.name_es ? ' | es:' + v.name_es : '') + ' pros=' + (v.pros ? v.pros.length : 0) + ' cons=' + (v.cons ? v.cons.length : 0));
  });
  if (!g.verdicts && g.verdict && typeof g.verdict === 'object') {
    Object.keys(g.verdict).forEach(function (k) {
      out.push('   verdict.' + k + ' = ' + JSON.stringify(g.verdict[k]).slice(0, 200));
    });
  }
  out.push('verdictProsCons: ' + (g.verdictProsCons ? g.verdictProsCons.length + ' items' : 'NONE'));
  (g.verdictProsCons || []).forEach(function (v, i) {
    out.push('   vpc[' + i + '] name=' + v.name + (v.name_es ? ' | es:' + v.name_es : ''));
  });
});
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/ssot_guides.txt', out.join('\n'), 'utf8');
console.log('done, wrote ' + out.length + ' lines');
