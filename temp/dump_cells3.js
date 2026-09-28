var fs = require('fs');
var arr = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var out = ['total: ' + arr.length];
function locate(slug) {
  for (var i = 0; i < arr.length; i++) { var s = String(arr[i].slug || arr[i].id || ''); if (s === slug) return { g: arr[i], i: i }; }
  return null;
}
['portable-interfaces', 'premium-interfaces'].forEach(function (slug) {
  var f = locate(slug);
  out.push('\n######## ' + slug + ' ' + (f ? 'idx=' + f.i : 'NOT FOUND') + ' ########');
  if (!f) return;
  var g = f.g;
  out.push('all keys: ' + Object.keys(g).join(' | '));
  var compKey = null, comp = null;
  Object.keys(g).forEach(function (k) {
    var v = g[k];
    if (v && typeof v === 'object' && (v.rows || v.headers)) { compKey = k; comp = v; }
  });
  out.push('comparison under key: ' + (compKey || 'NONE'));
  if (comp) {
    out.push('  headers    : ' + JSON.stringify(comp.headers || []));
    out.push('  headers_es : ' + JSON.stringify(comp.headers_es || []));
    var rows = comp.rows || [];
    out.push('  rows: ' + rows.length);
    rows.forEach(function (r, ri) {
      out.push('   ROW[' + ri + '] label=' + JSON.stringify(r.label) + ' | label_es=' + JSON.stringify(r.label_es || ''));
      (r.cells || r.values || []).forEach(function (c, ci) {
        var en = String(c.value === undefined ? '' : c.value);
        var es = c.value_es === undefined ? '' : String(c.value_es);
        var suspect = /[áéíóúñü¿¡]|[A-Za-z]\/inst|con Vintage|Smartgain|Bajo coste|Podcast\/streaming|iD scroll|Vocal|2 headphone|streaming|loopback|ADAT|inst, iD|ESS|Auto Smartgain|Smartgain/i.test(en);
        out.push('     c[' + ci + '] EN=' + JSON.stringify(en) + ' | ES=' + JSON.stringify(es) + (suspect ? '   <<<= SUSPECT-ES' : ''));
      });
    });
  }
  var vKey = null, verdictsObj = null;
  Object.keys(g).forEach(function (k) { if (/verdict/i.test(k) && g[k]) { vKey = k; verdictsObj = g[k]; } });
  out.push('verdict under key: ' + (vKey || 'NONE'));
  if (verdictsObj) {
    var items = Array.isArray(verdictsObj) ? verdictsObj : (verdictsObj.products || verdictsObj.items || null);
    out.push('  verdict items: ' + (items ? items.length : 'object-without-products'));
    (items || []).forEach(function (v, vi) {
      out.push('   v[' + vi + '] name=' + JSON.stringify(v.name) + (v.name_es ? ' | es=' + JSON.stringify(v.name_es) : '') + ' pros=' + JSON.stringify((v.pros || []).length) + ' cons=' + JSON.stringify((v.cons || []).length));
    });
  }
});
var dest = 'C:/Users/Daniel/projects/topmusiciangear/temp/fix_cells.txt';
fs.writeFileSync(dest, out.join('\n'), 'utf8');
console.log('lines=' + out.length + ' -> ' + dest);
