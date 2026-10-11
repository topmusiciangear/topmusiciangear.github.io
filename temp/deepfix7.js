var fs = require('fs');
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var fixes = 0;
function walk(o, fn) {
  if (typeof o === 'string') return fn(o);
  if (Array.isArray(o)) { for (var i = 0; i < o.length; i++) { var n = walk(o[i], fn); if (n !== o[i]) { o[i] = n; fixes++; } } return o; }
  if (o && typeof o === 'object') { for (var k in o) { var nn = walk(o[k], fn); if (nn !== o[k]) { o[k] = nn; fixes++; } } return o; }
  return o;
}
function R(s, a, b) { if (s.indexOf(a) >= 0) s = s.split(a).join(b); return s; }
function esFix(s) {
  s = R(s, 'opción opción', 'opción'); s = R(s, 'Opción opción', 'Opción');
  s = R(s, 'opción elección', 'elección'); s = R(s, 'mejor opción compra', 'mejor compra');
  s = R(s, 'mejor opción relación calidad-precio', 'mejor opción en relación calidad-precio');
  s = R(s, 'caballo de batalla', 'todoterreno'); s = R(s, 'Caballo de batalla', 'Todoterreno');
  s = R(s, 'preamps', 'previos'); s = R(s, 'una preamp', 'un previo'); s = R(s, 'preamp', 'previo');
  return s;
}
function enFix(s) {
  s = R(s, 'EMG 81/60', 'EMG 57TW/66TW');
  return s;
}
guides.forEach(function (g) { walk(g.featuredSnippet, function (s) { return enFix(esFix(s)); }); });
// EMG leftovers in 2026 guide (EN+ES sections/verdict)
guides.forEach(function (g) {
  if (g.id === 'best-electric-guitars-2026' || g.id === 'best-electric-guitar') {
    walk(g, function (s) {
      s = R(s, 'EMG 81/60', 'EMG 57TW/66TW');
      s = R(s, 'EMG 81 en el puente y 60 en el mástil', 'EMG 57TW en el puente y 66TW en el mástil');
      return s;
    });
  }
});
// drum-machine workhorse EN+ES
guides.forEach(function (g) {
  if (g.id === 'best-drum-machine') {
    walk(g, function (s) {
      s = R(s, 'workhorse', 'tour-ready powerhouse');
      s = R(s, 'caballo de batalla', 'todoterreno');
      return s;
    });
  }
});
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('part7 fixes=' + fixes);
var s = JSON.stringify(guides);
['opción opción', 'mejor opción compra', 'caballo de batalla', 'EMG 81/60'].forEach(function (t) {
  console.log(t + ': ' + (s.split(t).length - 1));
});
