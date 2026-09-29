var fs = require('fs');
var path = require('path');
var dir = 'guides';
var files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
var noLabel = [], missingEs = [], missingEn = [];
var total = 0;
files.forEach(function (f) {
  var s = fs.readFileSync(path.join(dir, f), 'utf8');
  var isEs = /_es\.html$/.test(f);
  var expected = isEs ? 'Verificar precio' : 'Check price';
  var re = /<a[^>]*data-store="amazon"[^>]*>[\s\S]*?<\/a>/g;
  var m;
  while ((m = re.exec(s)) !== null) {
    total++;
    if (m[0].indexOf(expected) < 0) {
      (isEs ? missingEs : missingEn).push(f + ': ' + m[0].replace(/\s+/g, ' ').slice(0, 160));
    }
  }
});
console.log('Total:', total);
console.log('EN without "Check price":', missingEn.length);
missingEn.slice(0, 5).forEach(e => console.log('  ' + e));
console.log('ES without "Verificar precio":', missingEs.length);
missingEs.slice(0, 5).forEach(e => console.log('  ' + e));