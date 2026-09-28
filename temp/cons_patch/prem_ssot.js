var fs = require('fs');
var path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
var data = JSON.parse(fs.readFileSync(path, 'utf8'));
var arr = Array.isArray(data) ? data : (data.guides || []);
var g = null;
arr.forEach(function (x) { if (String(x.slug || x.id || '') === 'premium-interfaces') g = x; });
var out = [];
if (!g) {
  out.push('NOT FOUND premium-interfaces. slugs containing premium/interface:');
  arr.forEach(function (x) { var s = String(x.slug || x.id || ''); if (/premium|interface/.test(s)) out.push('  - ' + s); });
  fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/prem_ssot.txt', out.join('\n'), 'utf8');
  process.exit(0);
}
out.push('title     : ' + JSON.stringify(g.title));
out.push('title_es  : ' + JSON.stringify(g.title_es));
out.push('heading   : ' + JSON.stringify(g.heading || g.h1 || ''));
out.push('heading_es: ' + JSON.stringify(g.heading_es || g.h1_es || ''));
var prods = g.products || g.productList || [];
out.push('products[' + prods.length + ']:');
prods.forEach(function (p, i) { out.push('   [' + i + '] ' + JSON.stringify(p.name) + (p.name_es ? ' | es=' + JSON.stringify(p.name_es) : '')); });
var comp = g.comparison || g.comparisonTable || g.compTable;
out.push('comparison: ' + (comp ? 'present rows=' + ((comp.rows || []).length) : 'NONE'));
if (comp) {
  (comp.headers || []).slice(0, 12).forEach(function (h, i) { out.push('   header[' + i + '] ' + JSON.stringify(h)); });
  (comp.rows || []).forEach(function (r, ri) {
    out.push('   ROW[' + ri + '] label=' + JSON.stringify(r.label) + ' | label_es=' + JSON.stringify(r.label_es) + ' | cells=' + ((r.cells || []).length));
    (r.cells || []).slice(0, 8).forEach(function (c, ci) {
      var v = String(c.value === undefined ? '' : c.value);
      var vs = c.value_es === undefined ? '' : String(c.value_es);
      var flag = /[áéíóúüñ¿¡]|Voz|Smartgain|Bajo coste|Podcast|inst\/stream|loopback|Vintage 610|headphone|iD scroll|iD14|MOTU|EVO|Volt|inst/i.test(v) ? ' <== ES-LIKE IN value' : '';
      out.push('      cell[' + ci + '] value=' + JSON.stringify(v) + ' | value_es=' + JSON.stringify(vs) + flag);
    });
  });
}
var v = g.verdicts || g.verdictProsCons || g.verdictsProsCons || [];
out.push('verdicts[' + (Array.isArray(v) ? v.length : '?') + ']');
(Array.isArray(v) ? v : []).forEach(function (p, i) {
  out.push('   verdict[' + i + '] name=' + JSON.stringify(p.name) + ' pros=' + ((p.pros || []).length) + ' cons=' + ((p.cons || []).length));
});
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/prem_ssot.txt', out.join('\n'), 'utf8');
console.log('wrote ' + out.length + ' lines');
