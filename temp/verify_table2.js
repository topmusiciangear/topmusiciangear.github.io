var fs = require('fs');
var h = fs.readFileSync('guides/usb-mics.html', 'utf8');

var m = h.match(/<table class="guide-comp-table"[\s\S]*?<\/table>/);
if (m) {
  var rows = m[0].match(/<tr>[\s\S]*?<\/tr>/g);
  console.log('Rows:', rows ? rows.length : 0);
  rows.forEach(function(r, i) {
    var cells = r.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g);
    console.log('Row', i, ':', cells ? cells.length : 0, 'cells');
    if (cells) cells.forEach(function(c, j) {
      console.log('  Col', j, ':', c.replace(/<[^>]+>/g, '').trim().slice(0, 80));
    });
  });
} else console.log('No table');