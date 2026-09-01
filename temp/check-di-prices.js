var fs = require('fs');
var src = fs.readFileSync('build-guides.js', 'utf8');
var ids = [445, 446, 447, 448, 449, 450, 451];
var lines = src.split('\n');
ids.forEach(function(id) {
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.indexOf(id + ': {') === 0 || line.indexOf(id + ':{') === 0 || line.match(new RegExp('^\\s+' + id + ':\\s*\\{'))) {
      var m = line.match(/musicstore:"([^"]+)"/);
      console.log(id + ': musicstore=' + (m ? m[1] : 'NOT FOUND') + ' (line ' + (i+1) + ')');
      return;
    }
  }
  console.log(id + ': NOT FOUND in TEST_SHOP_BTN');
});
