var fs = require('fs');
var path = require('path');
var dir = 'guides';
var files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
var totalAmazon = 0, withPrice = [], examples = [];
files.forEach(function (f) {
  var s = fs.readFileSync(path.join(dir, f), 'utf8');
  var re = /<a[^>]*data-store="amazon"[^>]*>[\s\S]*?<\/a>/g;
  var m;
  while ((m = re.exec(s)) !== null) {
    totalAmazon++;
    if (/[$£€]\s?[0-9]/.test(m[0])) {
      withPrice.push(f);
      if (examples.length < 5) examples.push(f + ': ' + m[0].replace(/\s+/g, ' ').slice(0, 220));
    }
  }
});
console.log('Total amazon buttons:', totalAmazon);
console.log('With a price:', withPrice.length);
withPrice.forEach(f => console.log('  ' + f));
examples.forEach(e => console.log('  EX: ' + e));