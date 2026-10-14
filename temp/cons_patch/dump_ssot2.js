var fs = require('fs');
var arr = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var out = ['total array len: ' + arr.length];

function findG(slug) {
  for (var i = 0; i < arr.length; i++) {
    var s = String(arr[i] && (arr[i].slug || arr[i].id || ''));
    if (s === slug) return { g: arr[i], idx: i };
  }
  return null;
}

var slugs = ['premium-interfaces', 'portable-interfaces'];
slugs.forEach(function (slug) {
  var f = findG(slug);
  out.push('\n############ ' + slug + ' ############');
  if (!f) {
    out.push('  NOT FOUND. candidates containing "interface":');
    arr.forEach(function (x) { var s = String(x && (x.slug || x.id || '')); if (/interface/.test(s)) out.push('    - ' + s); });
    return;
  }
  var g = f.g;
  out.push('  idx       : ' + f.idx);
  out.push('  title     : ' + JSON.stringify(g.title));
  out.push('  title_es  : ' + JSON.stringify(g.title_es));
  out.push('  h1        : ' + JSON.stringify(g.h1 || g.heading || g.guideTitle || '(none)'));
  out.push('  h1_es     : ' + JSON.stringify(g.h1_es || g.heading_es || g.guideTitle_es || '(none)'));
  var prods = g.products || [];
  out.push('  products  : ' + prods.length);
  prods.forEach(function (p, i) { out.push('     [' + i + '] ' + JSON.stringify(p.name) + (p.name_es ? ' | es=' + JSON.stringify(p.name_es) : '')); });

  var compKey = null;
  var comp = null;
  Object.keys(g).forEach(function (k) { if (/comp|compare|table/i.test(k) && g[k] && g[k].rows) { compKey = k; comp = g[k]; } });
  out.push('  comparison key: ' + (compKey || 'NONE'));
  if (comp) {
    out.push('    headers  : ' + JSON.stringify(comp.headers || []));
    out.push('    headers_es: ' + JSON.stringify(comp.headers_es || []));
    (comp.rows || []).forEach(function (r, ri) {
      out.push('    ROW[' + ri + '] label=' + JSON.stringify(r.label) + ' | label_es=' + JSON.stringify(r.label_es));
      (r.cells || []).forEach(function (c, ci) {
        var sVe = String(c.value === undefined ? '' : c.value);
        var sVes = String(c.value_es === undefined ? '' : c.value_es);
        var leak = /[áéíóúñ¿¡]|Voz\/inst|\binst\b|Smartgain|Bajo coste|Vocal|Podcast|streaming|Vintage 610|Vintage\b|Smartgain|loopback|2 headphone|iD scroll|iD scroll\b|Smartgain, loopback/i.test(sVe) ? '   <== ES-LIKE IN EN value' : '';
        out.push('       cell[' + ci + '] value=' + JSON.stringify(sVe) + ' | value_es=' + JSON.stringify(sVes) + leak);
      });
    });
  }
  var penKey = null, pen = null;
  Object.keys(g).forEach(function (k) { if (/verdict|proscons|prosCons|judgment/i.test(k) && g[k]) { penKey = k; pen = g[k]; } });
  out.push('  verdict key: ' + (penKey || 'NONE'));
  var list = Array.isArray(pen) ? pen : (pen && (pen.products || pen.items) || []);
  out.push('  verdict count: ' + list.length);
  (Array.isArray(list) ? list : []).forEach(function (v, i) {
    out.push('    verdict[' + i + '] name=' + JSON.stringify(v.name) + (v.name_es ? ' | es=' + JSON.stringify(v.name_es) : '') + ' pros=' + JSON.stringify((v.pros || []).length) + ' cons=' + JSON.stringify((v.cons || []).length));
  });
});

var sp = 'C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/prem_port_ssot.txt';
fs.writeFileSync(sp, out.join('\n'), 'utf8');
console.log('OK ' + out.length + ' lines -> ' + sp);
