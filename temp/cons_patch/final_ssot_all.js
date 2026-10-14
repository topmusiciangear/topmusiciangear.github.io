var fs = require('fs');
var arr = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var out = [];
function findG(slug) {
  for (var i = 0; i < arr.length; i++) {
    var s = String(arr[i].slug || arr[i].id || '');
    if (s === slug) return { g: arr[i], i: i };
  }
  return null;
}
[['portable-interfaces', 'here goes portable'], ['premium-interfaces', 'here goes premium']].forEach(function (t) {
  var slug = t[0], tag = t[1];
  var f = findG(slug);
  out.push('\n########## ' + slug + ' ' + tag + ' ' + (f ? 'idx=' + f.i : 'NOT FOUND') + ' ##########');
  if (!f) { return; }
  var g = f.g;
  out.push('ALL KEYS: ' + Object.keys(g).join(' | '));
  var tables = [];
  Object.keys(g).forEach(function (k) {
    var v = g[k];
    if (v && typeof v === 'object' && !Array.isArray(v) && (v.rows || v.headers || v.cells || v.totalColumns) && /table|compar|specs|side/i.test(k)) {
      tables.push(k);
    }
  });
  out.push('TABLE-LIKE KEYS: ' + (tables.join(' | ') || 'NONE'));
  tables.forEach(function (tk) {
    var t2 = g[tk];
    out.push('  == ' + tk + ' ==');
    out.push('    keys: ' + Object.keys(t2).join(' | '));
    out.push('    headers: ' + JSON.stringify(t2.headers || []));
    out.push('    headers_es: ' + JSON.stringify(t2.headers_es || []));
    var rows = t2.rows || t2.cells || [];
    out.push('    rows len: ' + rows.length);
    rows.forEach(function (r, ri) {
      out.push('    ROW[' + ri + '] label=' + JSON.stringify(r.label) + ' | label_es=' + JSON.stringify(r.label_es || ''));
      var cells = r.cells || r.values || [];
      cells.forEach(function (c, ci) {
        var en = String(c.value === undefined ? '' : c.value);
        var es = c.value_es === undefined ? '' : String(c.value_es);
        var bad = /[áéíóúñ¿¡]|Voz\/?inst|inst con|Bajo coste|Smartgain|Vintage 610|Vocal\+76|Vocal|2 headphone|iD scroll|Podcast|streaming|loopback|Smartgain,|Voz\/inst|alto rendimiento/i.test(en);
        out.push('      c[' + ci + '] EN=' + JSON.stringify(en) + ' | ES=' + JSON.stringify(es) + (bad ? '    <<<<<< ES-IN-EN' : ''));
      });
    });
  });
  var vKeys = [];
  Object.keys(g).forEach(function (k) { if (/verdict/i.test(k)) vKeys.push(k); });
  out.push('VERDICT KEYS: ' + vKeys.join(' | '));
  vKeys.forEach(function (vk) {
    var v = g[vk];
    out.push('  ' + vk + ': ' + (Array.isArray(v) ? 'ARRAY len=' + v.length : (v && typeof v === 'object' ? 'OBJECT keys=' + Object.keys(v).join(' | ') : 'scalar=' + JSON.stringify(v))));
  });
});
var p = 'C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/final_ssot_all.txt';
fs.writeFileSync(p, out.join('\n'), 'utf8');
console.log('wrote ' + out.length + ' lines -> ' + p);
