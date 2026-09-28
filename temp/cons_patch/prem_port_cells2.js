var fs = require('fs');
var arr = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var out = [];
function slugOf(x) { return String(x.slug || x.id || ''); }
function findG(slug) { for (var i = 0; i < arr.length; i++) if (slugOf(arr[i]) === slug) return { g: arr[i], i: i }; return null; }

['portable-interfaces', 'premium-interfaces'].forEach(function (slug) {
  var f = findG(slug);
  out.push('\n################ ' + slug + ' ' + (f ? 'idx=' + f.i : 'NOT FOUND') + ' ################');
  if (!f) return;
  var g = f.g;
  out.push('title EN : ' + JSON.stringify(g.title));
  out.push('title ES : ' + JSON.stringify(g.title_es));
  var comp = g.comparison || g.comparisonTable || g.compTable || null;
  out.push('comparison present: ' + (comp ? 'YES rows=' + (comp.rows || []).length : 'NO'));
  if (comp) {
    out.push('  headers: ' + JSON.stringify(comp.headers || []));
    out.push('  headers_es: ' + JSON.stringify(comp.headers_es || []));
    (comp.rows || []).forEach(function (r, ri) {
      out.push('  ROW[' + ri + '] label=' + JSON.stringify(r.label) + ' | label_es=' + JSON.stringify(r.label_es || ''));
      (r.cells || r.values || []).forEach(function (c, ci) {
        var en = String(c.value === undefined ? '' : c.value);
        var es = c.value_es === undefined ? '' : String(c.value_es);
        var ESISH = /[áéíóúñ¿¡]|Voz\/inst|inst con|Bajo coste|Smartgain|Vintage 610|Vocal\+76|2 headphone|iD scroll|Podcast\/streaming|Smartgain, loopback|Vintage 76|iD14|iD scroll/i.test(en);
        out.push('     c[' + ci + '] EN=' + JSON.stringify(en) + ' | ES=' + JSON.stringify(es) + (ESISH ? '   <== ES-in-EN' : ''));
      });
    });
  }
  var vk = null, vg2 = null;
  Object.keys(g).forEach(function (k) { if (/verdict/i.test(k) && g[k]) { vk = k; vg2 = g[k]; } });
  out.push('verdict key: ' + (vk || 'NONE'));
  var vArr = Array.isArray(vg2) ? vg2 : (vg2 && vg2.products ? vg2.products : []);
  out.push('verdict count: ' + (vArr && vArr.length ? vArr.length : '0/' + (vg2 ? 'object' : 'none')));
  (vArr || []).forEach(function (v, i) {
    out.push('   v[' + i + '] name=' + JSON.stringify(v.name) + (v.name_es ? ' | es=' + JSON.stringify(v.name_es) : '') + ' pros=' + ((v.pros || []).length) + ' cons=' + ((v.cons || []).length));
  });
});
var p = 'C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/prem_port_cells2.txt';
fs.writeFileSync(p, out.join('\n'), 'utf8');
console.log('wrote ' + out.length + ' lines -> ' + p);
