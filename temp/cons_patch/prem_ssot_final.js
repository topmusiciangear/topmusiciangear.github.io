var fs = require('fs');
var t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
var arr = JSON.parse(t);
if (!Array.isArray(arr)) { console.log('NOT ARRAY, keys=' + Object.keys(arr).join(',')); process.exit(1); }
var out = ['TOTAL guides in array: ' + arr.length];
function find(slug) {
  for (var i = 0; i < arr.length; i++) { var s = arr[i].slug || arr[i].id || ''; if (s === slug) return { g: arr[i], i: i }; }
  return null;
}
['premium-interfaces', 'portable-interfaces'].forEach(function (slug) {
  var f = find(slug);
  out.push('\n\n=========================== ' + slug + ' ===========================');
  if (!f) {
    out.push('  NOT FOUND by slug/id. Candidate slugs matching "interface":');
    arr.forEach(function (x) { var s = String(x.slug || x.id || ''); if (/interface/.test(s)) out.push('    - ' + s); });
    return;
  }
  var g = f.g;
  out.push('  [index ' + f.i + ']');
  out.push('  title     : ' + JSON.stringify(g.title));
  out.push('  title_es  : ' + JSON.stringify(g.title_es));
  out.push('  h1        : ' + JSON.stringify(g.h1 || g.heading || g.heroTitle || '(none)'));
  out.push('  h1_es     : ' + JSON.stringify(g.h1_es || g.heading_es || String(g.h1 || g.heading || 'es-unknown')));
  out.push('  keys      : ' + Object.keys(g).join(','));
  var prods = g.products || g.productsTable || [];
  out.push('  PRODUCTS[' + (Array.isArray(prods) ? prods.length : 'N/A') + ']:');
  (Array.isArray(prods) ? prods : []).forEach(function (p, i) {
    out.push('     [' + i + '] ' + JSON.stringify(p.name) + (p.name_es ? ' | name_es=' + JSON.stringify(p.name_es) : ''));
  });
  var comp = g.comparison || g.comparisonTable || g.compareTable || g.compTable;
  out.push('  COMPARISON: ' + (comp ? 'present' : 'NONE'));
  if (comp) {
    out.push('     headers: ' + JSON.stringify((comp.headers || []).slice(0, 30)));
    out.push('     headers_es: ' + JSON.stringify((comp.headers_es || []).slice(0, 30)));
    var rows = comp.rows || [];
    out.push('     rows: ' + rows.length);
    rows.forEach(function (r, ri) {
      out.push('       ROW[' + ri + '] label=' + JSON.stringify(r.label) + ' | label_es=' + JSON.stringify(r.label_es));
      var cells = r.cells || r.values || [];
      cells.forEach(function (c, ci) {
        var v = String(c.value === undefined ? '' : c.value);
        var ve = String(c.value_es === undefined ? '' : c.value_es);
        var suspect = /[áéíóúñ¿¡]|Voz|inst|Bajo coste|Smartgain|Vintage 610|Podcast|streaming|loopback|iD scroll|Bajo coste alto|2 headphone|iD13|iD14|scroll|inst\.|Smartgain, loopback/i.test(v);
        out.push('          cell[' + ci + '] value=' + JSON.stringify(v) + ' | value_es=' + JSON.stringify(ve) + (suspect ? '   <==== suspect ES-in-EN' : ''));
      });
    });
  }
  var verdicts = g.verdicts || g.verdict || g.verdictProsCons || g.verdictGrid || [];
  out.push('  VERDICTS: ' + (Array.isArray(verdicts) ? verdicts.length + ' (array)' : JSON.stringify(Object.keys(verdicts || {}))));
  (Array.isArray(verdicts) ? verdicts : []).forEach(function (v, i) {
    out.push('     verdict[' + i + '] name=' + JSON.stringify(v.name) + (v.name_es ? ' | es=' + JSON.stringify(v.name_es) : '') + ' pros=' + JSON.stringify((v.pros || []).length) + ' cons=' + JSON.stringify((v.cons || []).length));
  });
});
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/prem_ssot_final.txt', out.join('\n'), 'utf8');
console.log('WROTE ' + out.length + ' lines');
