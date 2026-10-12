var fs = require('fs');
var es = fs.readFileSync('guides/best-stage-keyboards_es.html', 'utf8');
var en = fs.readFileSync('guides/best-stage-keyboards.html', 'utf8');
function chk(n, c) { console.log((c ? 'PASS' : 'FAIL') + ' ' + n); }
var NEW = 'Mejores teclados para directo (pros, contras y guía de compra 2026)';
chk('ES title', es.indexOf('<title>' + NEW + '</title>') > -1);
chk('ES h1', es.indexOf('<h1 class="guide-detail-title">' + NEW + '</h1>') > -1);
chk('ES og:title', es.indexOf('og:title" content="' + NEW + ' | TopMusicianGear') > -1);
chk('ES breadcrumb', es.indexOf('/ <span>' + NEW + '</span>') > -1);
chk('ES no pianos de escenario in head', es.slice(0, 9000).indexOf('pianos de escenario') === -1);
chk('EN untouched', en.indexOf('<title>Best Stage Keyboards for Live Performance (Pros, Cons & Buying Guide 2026)</title>') > -1);
['guides/best-keyboard_es.html', 'guides/best-synthesizers_es.html', 'guides/best-digital-pianos_es.html', 'guides/nord-stage-4-vs-montage-m8x_es.html', 'guides/p225-vs-fp30x_es.html'].forEach(function (f) {
  var h = fs.readFileSync(f, 'utf8');
  chk(f + ' short label', h.indexOf('>Mejores teclados para directo</a>') > -1);
});
