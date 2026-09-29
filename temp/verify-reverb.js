var fs = require('fs');
var path = require('path');
var dir = 'guides';
var files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
var reverbBad = [];
var total = 0;
files.forEach(function (f) {
  var s = fs.readFileSync(path.join(dir, f), 'utf8');
  var re = /<a[^>]*data-store="reverb"[^>]*>[\s\S]*?<\/a>/g;
  var m;
  while ((m = re.exec(s)) !== null) {
    total++;
    if (/[$£€]\s?[0-9]/.test(m[0])) reverbBad.push(f);
  }
});
console.log('Total reverb buttons:', total);
console.log('Reverb with a price:', reverbBad.length);
reverbBad.slice(0, 10).forEach(f => console.log('  ' + f));