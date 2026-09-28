var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
var A = JSON.parse(fs.readFileSync(P, 'utf8'));
var T = {
  'Voz/inst con Vintage 610, streaming': 'Vocal/inst with Vintage 610, streaming',
  'Podcast/streaming Smartgain, loopback': 'Podcast/streaming Smartgain, loopback',
  'Vocal+76 compressor, MIDI': 'Vocal+76 compressor, MIDI',
  'Bajo coste alto rendimiento, ESS': 'Budget-friendly high performance, ESS',
  '2 headphone, ADAT, iD scroll': '2 headphone outputs, ADAT, iD scroll',
  'Voz/inst con Vintage 610, streaming, loopback': 'Vocal/inst with Vintage 610, streaming, loopback',
  'Bajo coste alto rendimiento, ESS, Smartgain': 'Budget-friendly high performance, ESS, Smartgain',
  'Smartgain, loopback': 'Smartgain, loopback'
};
var R = [];
var hits = 0;
function slugOf(g) { return String(g.slug || g.id || ''); }
function clean(v) {
  if (v === undefined || v === null) return '';
  return String(v);
}
A.forEach(function (g) {
  var sl = slugOf(g);
  if (sl !== 'portable-interfaces' && sl !== 'premium-interfaces') return;
  var tabKeys = [];
  Object.keys(g).forEach(function (k) {
    var v = g[k];
    if (v && typeof v === 'object' && (v.rows || v.cells) && (v.headers || v.headers_es)) tabKeys.push(k);
  });
  R.push('\n### ' + sl + ' tableKeys=[' + tabKeys.join(', ') + ']');
  tabKeys.forEach(function (k) {
    var t = g[k];
    R.push('  ' + k + ' headers=' + JSON.stringify(t.headers) + ' | headers_es=' + JSON.stringify(t.headers_es));
    var rows = t.rows || [];
    rows.forEach(function (r, ri) {
      var cells = r.cells || [];
      cells.forEach(function (c, ci) {
        var en = clean(c.value);
        var hasEs = c.value_es !== undefined && c.value_es !== null && String(c.value_es).length > 0;
        var bad = /[áéíóúñÁÉÍÓÚ¿¡]|Voz\/inst|Bajo coste|iD scroll|Smartgain|Vocal\+76|Vintage 610/i.test(en);
        if (!bad) return;
        hits++;
        var fixEn = T[en] || null;
        if (fixEn) c.value = fixEn;
        if (!hasEs) c.value_es = en;
        R.push('     CELL r[' + ri + '] c[' + ci + '] was EN=' + JSON.stringify(en) + ' (ES=' + JSON.stringify(c.value_es) + ') -> now EN=' + JSON.stringify(c.value) + (fixEn ? ' [fixed]' : ' [es-copy-only, needs manual EN]'));
      });
    });
  });
});
fs.writeFileSync(P, JSON.stringify(A, null, 2), 'utf8');
var W = 'C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/fix_out.txt';
fs.writeFileSync(W, R.join('\n'), 'utf8');
console.log('hits=' + hits + ' wrote ' + W);
