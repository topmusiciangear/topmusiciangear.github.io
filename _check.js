var h = require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/midi-keyboards.html', 'utf8');
var i = h.indexOf('MPK Mini MK4</h3>');
if (i < 0) { console.log('NOT FOUND'); process.exit(); }
var c = h.substring(i, i + 8000);
var j = c.indexOf('guide-product-card-stores>');
c = c.substring(j, j + 3000);
var re = /href="([^"]*)"[^>]*>([^<]*)/g;
var m;
while ((m = re.exec(c)) !== null) {
  console.log(m[2].trim().substring(0, 80), '->', m[1].substring(0, 80));
}
