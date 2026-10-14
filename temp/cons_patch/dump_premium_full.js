var fs = require('fs');
var data = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var arr = Array.isArray(data) ? data : (data.guides || []);
var g = null, gi = -1;
arr.forEach(function (x, i) { var slug = String(x.slug || x.id || ''); if (slug === 'premium-interfaces') { g = x; gi = i; } });
var out = [];
out.push('array? ' + Array.isArray(data) + ' total guides ' + arr.length + ' | premium found at index ' + gi);
if (!g) {
  out.push('NOT FOUND. slugs containing "premium":');
  arr.forEach(function (x) { var s = String(x.slug || x.id || ''); if (/premium/.test(s)) out.push('  - ' + s); });
} else {
  out.push('\n########## ' + g.slug + ' ##########');
  out.push('title    : ' + JSON.stringify(g.title));
  out.push('title_es : ' + JSON.stringify(g.title_es));
  out.push('h1       : ' + JSON.stringify(g.h1 || g.heading));
  out.push('h1_es    : ' + JSON.stringify(g.h1_es || g.heading_es));
  var comp = g.comparison || g.compTable || g.comparisonTable || g.comp;
  out.push('comparison rows: ' + ((comp && comp.rows) ? comp.rows.length : 'NONE'));
  if (comp && comp.rows) {
    (comp.headers || []).forEach(function (h, i) { out.push('  header[' + i + '] = ' + JSON.stringify(h)); });
    comp.rows.forEach(function (r, ri) {
      out.push('  ROW[' + ri + '] label=' + JSON.stringify(r.label) + ' | es=' + JSON.stringify(r.label_es || ''));
      (r.cells || []).forEach(function (c, ci) {
        var eslike = /[áéíóúñ¿¡]|Voz|inst|Smartgain|Bajo coste|streaming|iD scroll|Vintage|2 headphone/.test(String(c.value || ''));
        out.push('     cell[' + ci + '] value=' + JSON.stringify(c.value) + ' | value_es=' + JSON.stringify(c.value_es || '') + (eslike ? '   <== ES-ish in EN value' : ''));
      });
    });
  }
  var vd = g.verdictProsCons || g.verdicts || g.verdict || g.verdictGrid;
  out.push('verdictProsCons: ' + (Array.isArray(vd) ? 'array len=' + vd.length : (vd ? 'object' : 'NONE')));
  (Array.isArray(vd) ? vd : []).forEach(function (v, i) {
    out.push('  verdict[' + i + '] name=' + JSON.stringify(v.name) + (v.name_es ? ' | es=' + JSON.stringify(v.name_es) : '') + ' pros=' + ((v.pros || []).length) + ' cons=' + ((v.cons || []).length));
  });
  var pc = g.verdictsProsCons || g.productVerdicts || g.verdictList;
  out.push('other verdict key (verdictsProsCons/productVerdicts/verdictList): ' + (Array.isArray(pc) ? 'array len=' + pc.length : (pc ? 'object' : 'NONE')));
  out.push('guide keys: ' + Object.keys(g).join(','));
}
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/premium_full.txt', out.join('\n'), 'utf8');
console.log('OK wrote ' + out.join('\n').length + ' chars');
