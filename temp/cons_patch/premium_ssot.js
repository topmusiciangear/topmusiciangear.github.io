var fs = require('fs');
var list = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var out = [];
out.push('guides array length = ' + list.length);

function slugOf(g) { return g.slug || g.id || g.guideId || ''; }
function isEsish(s) {
  s = String(s);
  if (/[áéíóúñ¿¡]/.test(s)) return true;
  return /Smartgain|Voz\/inst|Voz e?inst|Bajo coste|Bajo rendimiento|Podcast\/streaming|2 headphone|iD scroll|iD Scroll|loopback|Vintage 610|Variance 610|Alto rendimiento|Grabación|Oscilador|Previos|previos|Sala peque|Desplazar|Desplazar a la derecha|Vocal\+76|Vocal 76|iD \w+|con Vintage|ess/i.test(s);
}
function watchCells(rows, arr) {
  (rows || []).forEach(function (r, ri) {
    var title = String(r.label || r.title || '').trim();
    var cells = r.cells || r.values || [];
    var ci = 0;
    cells.forEach(function (c) {
      var value = c.value || c.value_en || c.text || c.en || '';
      var value_es = c.value_es || c.es || c.text_es || '';
      var esLeak = isEsish(value) && !isEsish(value_es);
      if (esLeak || ri === 0) {
        arr.push('      cell[' + ri + ':' + ci + '] label=' + JSON.stringify(title) + ' | value=' + JSON.stringify(value) + ' | value_es=' + JSON.stringify(value_es) + (esLeak ? '   <== ES-EN LEAK' : ''));
      }
      ci++;
    });
  });
}
function walkGuide(g, out) {
  var slug = slugOf(g);
  out.push('\n############ ' + slug + ' ############');
  out.push('  title    : ' + g.title);
  out.push('  title_es : ' + g.title_es);
  out.push('  h1       : ' + (g.h1 || g.heading || g.title));
  out.push('  h1_es    : ' + (g.h1_es || g.heading_es || g.title_es));
  var comp = g.comparison || g.compareTable || g.compTable || g.comparisonTable;
  out.push('  [comparison] ' + (comp ? 'present rows=' + (comp.rows ? comp.rows.length : 0) : 'NONE'));
  if (comp) {
    out.push('    headers : ' + JSON.stringify(comp.headers || []));
    watchCells(comp.rows, out);
  }
  var verdicts = g.verdictProsCons || g.verdicts || g.verdict;
  out.push('  [verdicts] ' + (verdicts ? (Array.isArray(verdicts) ? 'array length=' + verdicts.length : 'object') : 'NONE'));
  (Array.isArray(verdicts) ? verdicts : []).forEach(function (v, i) {
    out.push('    verdict[' + i + '] name=' + JSON.stringify(v.name) + (v.name_es ? ' | name_es=' + JSON.stringify(v.name_es) : '') + ' pros=' + (v.pros ? v.pros.length : 0) + ' cons=' + (v.cons ? v.cons.length : 0));
  });
}
var matching = [];
list.forEach(function (g) {
  var slug = slugOf(g);
  if (slug === 'premium-interfaces' || slug === 'portable-interfaces') matching.push(g);
});
if (matching.length === 0) {
  out.push('\nNO direct matches. Guides with "interface" in slug:');
  list.forEach(function (g) {
    var slug = slugOf(g);
    if (/interface/.test(slug)) out.push('  - ' + slug);
  });
} else {
  matching.forEach(function (g) { walkGuide(g, out); });
}
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/premium_ssot.txt', out.join('\n'), 'utf8');
console.log('OK wrote ' + out.length + ' lines -> premium_ssot.txt');
