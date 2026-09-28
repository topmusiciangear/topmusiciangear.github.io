var fs = require('fs');
var arr = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
if (!Array.isArray(arr)) { console.log('NOT ARRAY keys=' + Object.keys(arr).join(',')); process.exit(1); }
var out = ['TOTAL guides: ' + arr.length];
function findG(slug) {
  for (var i = 0; i < arr.length; i++) { if (String(arr[i].slug || arr[i].id || '') === slug) return arr[i]; }
  return null;
}
['premium-interfaces', 'portable-interfaces'].forEach(function (slug) {
  var g = findG(slug);
  out.push('\n######## ' + slug + ' ' + (g ? 'FOUND' : '!!!NOT FOUND!!!') + ' ########');
  if (!g) {
    arr.forEach(function (x) { if (/interface/.test(String(x.slug || ''))) out.push('   available: ' + x.slug); });
    return;
  }
  out.push('title      : ' + JSON.stringify(g.title));
  out.push('title_es   : ' + JSON.stringify(g.title_es));
  out.push('h1         : ' + JSON.stringify(g.h1 || g.heading || ''));
  out.push('h1_es      : ' + JSON.stringify(g.h1_es || g.heading_es || ''));
  var comp = g.comparison || g.comp || g.comparisonTable || g.compTable;
  out.push('comparison : ' + (comp ? 'PRESENT' : 'NONE'));
  if (comp) {
    out.push('  headers     : ' + JSON.stringify(comp.headers || []));
    out.push('  headers_es  : ' + JSON.stringify(comp.headers_es || []));
    var rows = comp.rows || comp.compareRows || [];
    out.push('  rows        : ' + (rows ? rows.length : 0));
    (rows || []).forEach(function (r, ri) {
      out.push('    row[' + ri + '] label=' + JSON.stringify(r.label) + ' | label_es=' + JSON.stringify(r.label_es || ''));
      (r.cells || []).forEach(function (c, ci) {
        var engine = String(c.value !== undefined ? c.value : '');
        var esLike = /[áéíóúñ¿¡]|Voz|inst|Bajo coste|Smartgain|Vintage 610|Vocal|2 headphone|iD scroll|Podcast|streaming|loopback|iD scroll|ADAT/i.test(engine);
        out.push('      cell[' + ci + '] value=' + JSON.stringify(c.value) + ' | value_es=' + JSON.stringify(c.value_es !== undefined ? c.value_es : '') + (esLike ? '   <<<= ES-LIKE in EN' : ''));
      });
    });
  }
  var vd = g.verdict || g.verdicts || g.verdictProsCons || null;
  out.push('verdict  : ' + (vd ? ((Array.isArray(vd) ? 'array len=' + vd.length : 'present')) : 'NONE'));
  (Array.isArray(vd) ? vd : []).forEach(function (v, vi) {
    out.push('   verdict[' + vi + '] name=' + JSON.stringify(v.name) + ' pros=' + JSON.stringify((v.pros || []).length) + ' cons=' + JSON.stringify((v.cons || []).length));
  });
});
var tp = 'C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/ssot_prem_port.txt';
fs.writeFileSync(tp, out.join('\n'), 'utf8');
console.log('OK wrote ' + tp);
