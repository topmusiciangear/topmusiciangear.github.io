var fs = require('fs');
var arr = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var out = [];
var ES_LIKE = /[áéíóúñ¿¡ÁÉÍÓÚ]|Voz\/inst|Smartgain|Bajo coste|Vintage 610|Vocal\+76|iD scroll|loopback|Podcast|streaming|2 headphone|con Vintage|alto rendimiento/;
arr.forEach(function (g, gi) {
  var slug = String(g.slug || g.id || '');
  var comp = g.comparison || g.comparisonTable || g.compTable || null;
  if (!comp) return;
  var rows = comp.rows || [];
  rows.forEach(function (r, ri) {
    (r.cells || []).forEach(function (c, ci) {
      var v = String(c.value === undefined ? '' : c.value);
      if (ES_LIKE.test(v)) {
        out.push('HIT slug=' + slug + ' | idx=' + gi + ' | ROW[' + ri + '] label=' + JSON.stringify(r.label) + ' | cell[' + ci + '] EN=' + JSON.stringify(v) + ' | ES=' + JSON.stringify(c.value_es === undefined ? '' : c.value_es));
      }
    });
  });
});
out.unshift('TOTAL HITS: ' + (out.length - 1));
var p = 'C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/whos2.txt';
fs.writeFileSync(p, out.join('\n'), 'utf8');
console.log('hits=' + (out.length - 1) + ' -> ' + p);
