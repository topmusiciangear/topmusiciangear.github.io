var fs = require('fs');
var es = fs.readFileSync('guides/best-stage-keyboards_es.html', 'utf8');
var en = fs.readFileSync('guides/best-stage-keyboards.html', 'utf8');
function chk(n, c) { console.log((c ? 'PASS' : 'FAIL') + ' ' + n); }
var NEW = 'Mejores teclados para directo: pianos de escenario (pros, contras y guía de compra 2026)';
chk('ES title new', es.indexOf('<title>' + NEW + '</title>') > -1);
chk('ES h1 new', es.indexOf('<h1 class="guide-detail-title">' + NEW + '</h1>') > -1);
chk('ES og:title new', es.indexOf('og:title" content="' + NEW + ' | TopMusicianGear') > -1);
chk('ES old gone', es.indexOf('escenario y sintes') === -1);
chk('EN untouched', en.indexOf('<title>Best Stage Keyboards for Live Performance (Pros, Cons & Buying Guide 2026)</title>') > -1);
// related buttons in other ES guides now use short title
['guides/best-keyboard_es.html', 'guides/best-synthesizers_es.html', 'guides/best-digital-pianos_es.html'].forEach(function (f) {
  var h = fs.readFileSync(f, 'utf8');
  chk(f + ' short label', h.indexOf('>Mejores teclados para directo: pianos de escenario</a>') > -1);
  chk(f + ' old label gone', h.indexOf('escenario y sintes</a>') === -1);
});
