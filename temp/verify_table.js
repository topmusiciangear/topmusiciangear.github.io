var fs = require('fs');
var h = fs.readFileSync('guides/usb-mics.html', 'utf8');

// Check table
var m = h.match(/<table class="product-table">[\s\S]*?<\/table>/);
if (m) {
  var tbody = m[0].match(/<tbody>[\s\S]*?<\/tbody>/);
  if (tbody) {
    var rows = tbody[0].match(/<tr>[\s\S]*?<\/tr>/g);
    console.log('Table rows:', rows ? rows.length : 0);
    rows.forEach(function(r, i) {
      var tds = r.match(/<td[^>]*>([\s\S]*?)<\/td>/g);
      console.log('Row', i, ':', tds ? tds.length : 0, 'cells');
      if (tds) tds.forEach(function(td, j) {
        console.log('  Col', j, ':', td.replace(/<[^>]+>/g, '').trim().slice(0, 60));
      });
    });
  } else console.log('No tbody');
} else console.log('No table');

// Check sections visible
var visible = h.replace(/<script[\s\S]*?<\/script>/g, '');
console.log('\nVisible checks:');
console.log(' AM8:', visible.indexOf('FIFINE AmpliGame AM8') > -1 ? 'PRESENT' : 'removed');
console.log(' PM461:', visible.indexOf('Maono PM461') > -1 ? 'PRESENT' : 'removed');
console.log(' Yeti:', visible.indexOf('Blue Yeti') > -1 ? 'PRESENT' : 'removed');
console.log(' NT-USB+:', visible.indexOf('NT-USB+') > -1 ? 'present' : 'MISSING');
console.log(' MV6:', visible.indexOf('Shure MV6') > -1 ? 'present' : 'MISSING');
console.log(' AT2020USB-XP:', visible.indexOf('AT2020USB-XP') > -1 ? 'present' : 'MISSING');
console.log(' Lyra note:', visible.indexOf('AKG Lyra') > -1 ? 'present' : 'MISSING');