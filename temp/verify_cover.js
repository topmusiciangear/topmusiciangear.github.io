var fs = require('fs');
function chk(f, want, notwant) {
  var h = fs.readFileSync(f, 'utf8');
  var hero = (h.match(/guide-detail-img"><img src="([^"]+)"/) || [])[1];
  var og = (h.match(/og:image" content="([^"]+)"/) || [])[1];
  console.log(f);
  console.log('  hero=' + hero);
  console.log('  og=' + og);
  console.log('  hero OK: ' + (hero === want) + ' | old gone from head: ' + (h.slice(0, 8000).indexOf(notwant) === -1));
}
var NEW = 'https://r2.gear4music.com/media/94/944268/1200/preview.jpg';
var OLD = 'https://r2.gear4music.com/media/90/909350/1200/preview.jpg';
chk('guides/best-keyboard.html', NEW, OLD);
chk('guides/best-keyboard_es.html', NEW, OLD);
chk('guides/best-stage-keyboards.html', OLD, NEW);
chk('guides/nord-stage-4-vs-montage-m8x.html', OLD, NEW);
