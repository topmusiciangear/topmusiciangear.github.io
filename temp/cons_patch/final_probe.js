var fs = require('fs');
var A = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
function findG(s) { for (var i = 0; i < A.length; i++) { if (String(A[i].slug || A[i].id || '') === s) return { g: A[i], i: i }; } return null; }
var L = [];
function dumpTab(slug, tag) {
  var f = findG(slug); L.push('\n### ' + slug + ' ' + (f ? 'idx=' + f.i : 'NOT FOUND') + ' ###');
  if (!f) return; var g = f.g;
  ['productTable', 'comparison', 'comparisonTable'].forEach(function (k) {
    var t = g[k]; if (!t) return;
    L.push('  <<' + k + '>>');
    L.push('    table keys: ' + Object.keys(t).join(' | '));
    L.push('    headers: ' + JSON.stringify(t.headers || []));
    L.push('    headers_es: ' + JSON.stringify(t.headers_es || []));
    var rows = t.rows || t.cells || [];
    L.push('    rows: ' + rows.length);
    rows.slice(0, 12).forEach(function (r, ri) {
      L.push('      R[' + ri + '] label=' + JSON.stringify(r.label) + ' | es=' + JSON.stringify(r.label_es || ''));
      var cs = r.cells || r.values || [];
      cs.slice(0, 9).forEach(function (c, ci) {
        var en = String(c.value === undefined ? '' : c.value);
        var es = c.value_es === undefined ? '' : String(c.value_es);
        L.push('        c[' + ci + '] EN=' + JSON.stringify(en) + ' | ES=' + JSON.stringify(es));
      });
    });
  });
  ['verdictSideBySide', 'verdicts', 'verdict', 'verdictProsCons'].forEach(function (k) {
    var v = g[k]; if (v === undefined || v === null) return;
    L.push('  <<' + k + '>> type=' + (Array.isArray(v) ? 'ARRAY len=' + v.length : (typeof v)) + (typeof v === 'object' && !Array.isArray(v) ? ' keys=' + Object.keys(v).join(' | ') : ''));
  });
}
['portable-interfaces', 'premium-interfaces'].forEach(function (s) { dumpTab(s, s); });
var p = 'C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/final_txt.txt';
fs.writeFileSync(p, L.join('\n'), 'utf8');
console.log('wrote ' + L.length);
