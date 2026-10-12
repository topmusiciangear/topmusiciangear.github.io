var fs = require('fs');
var NEW = 'https://r2.gear4music.com/media/130/1302302/1200/preview.jpg';
var OLD = 'https://r2.gear4music.com/media/130/1302301/1200/preview.jpg';
function chk(n, c) { console.log((c ? 'PASS' : 'FAIL') + ' ' + n); }
['guides/nord-stage-4-vs-montage-m8x.html', 'guides/nord-stage-4-vs-montage-m8x_es.html'].forEach(function (f) {
  var h = fs.readFileSync(f, 'utf8');
  var hero = (h.match(/guide-detail-img"><img src="([^"]+)"/) || [])[1];
  var og = (h.match(/og:image" content="([^"]+)"/) || [])[1];
  chk(f + ' hero new', hero === NEW);
  chk(f + ' og new', og === NEW);
  chk(f + ' old gone', h.indexOf('130/1302301') === -1);
  chk(f + ' M8x card new', h.indexOf('alt="Yamaha Montage M8x"') > -1 && h.indexOf(NEW) > -1);
});
// every guide page that shows product 12 must use the new img
var files = fs.readdirSync('guides').filter(function (f) { return f.endsWith('.html'); });
var bad = [];
files.forEach(function (f) {
  var h = fs.readFileSync('guides/' + f, 'utf8');
  if (h.indexOf('130/1302301') > -1) bad.push(f);
});
chk('no old 1302301 anywhere (' + bad.length + ')', bad.length === 0);
if (bad.length) console.log('BAD: ' + bad.join(', '));
var n = 0;
files.forEach(function (f) {
  var h = fs.readFileSync('guides/' + f, 'utf8');
  if (h.indexOf('Montage M8x') > -1) n++;
});
console.log('pages mentioning Montage M8x: ' + n);
