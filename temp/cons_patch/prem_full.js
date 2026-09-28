var fs = require('fs');
var arr = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var out = [];
var g = null;
for (var i = 0; i < arr.length; i++) { if (String(arr[i].slug || '') === 'premium-interfaces') { g = arr[i]; break; } }
if (!g) { out.push('premium NOT FOUND'); } else {
  out.push('premium found');
  var comp = g.comparison || g.comparisonTable || null;
  out.push('comparison rows: ' + (comp && comp.rows ? comp.rows.length : 'NONE'));
  if (comp) {
    out.push('headers: ' + JSON.stringify(comp.headers));
    out.push('headers_es: ' + JSON.stringify(comp.headers_es));
    (comp.rows || []).forEach(function (r, ri) {
      out.push('ROW[' + ri + '] ' + JSON.stringify(r.label) + ' / ' + JSON.stringify(r.label_es));
      (r.cells || r.values || []).forEach(function (c, ci) {
        var en = String(c.value === undefined ? '' : c.value);
        var es = String(c.value_es === undefined ? '' : c.value_es);
        out.push('   c[' + ci + '] EN=' + JSON.stringify(en) + ' | ES=' + JSON.stringify(es));
      });
    });
  }
  out.push('KEYS: ' + Object.keys(g).join(' | '));
  var vsb = g.verdictSideBySide;
  out.push('verdictSideBySide: ' + (vsb ? JSON.stringify(vsb).slice(0, 800) : 'NONE'));
}
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/prem_full.txt', out.join('\n'), 'utf8');
console.log('wrote ' + out.length + ' lines');
