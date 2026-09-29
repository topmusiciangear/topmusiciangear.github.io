var fs = require('fs');
var s = fs.readFileSync('guides/wireless-lapel-mics.html', 'utf8');
var re = /<a[^>]*data-store="reverb"[^>]*>[\s\S]*?<\/a>/g;
var m, i = 0;
while ((m = re.exec(s)) !== null) {
  var t = m[0];
  if (t.indexOf('Check price') < 0 && t.indexOf('Verificar precio') < 0) {
    i++;
    console.log('--- missing label, no ' + i + ':');
    console.log(t.replace(/\s+/g, ' ').slice(0, 400));
  }
}