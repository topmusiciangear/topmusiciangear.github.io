var fs = require('fs');
var files = fs.readdirSync('guides').filter(f => f.endsWith('.html'));
var found = [];
files.forEach(function(f) {
  var h = fs.readFileSync('guides/' + f, 'utf8');
  if (h.indexOf('smart-EQ-4') >= 0 || h.indexOf('smartEQ') >= 0) {
    found.push(f);
  }
});
console.log('Files containing smart EQ 4:', found);

if (found.length > 0) {
  var h = fs.readFileSync('guides/' + found[0], 'utf8');
  var re = /href="([^"]*musicstore[^"]*smart[^"]*)"/g;
  var m;
  while (m = re.exec(h)) {
    console.log('Music Store smart link:', m[1]);
  }
  // Also check for the product card section
  var idx = h.indexOf('Sonible');
  if (idx >= 0) {
    var section = h.substring(idx, idx + 3000);
    var re2 = /href="([^"]*musicstore[^"]*)"/g;
    while (m = re2.exec(section)) {
      console.log('Near Sonible:', m[1].substring(0, 150));
    }
  }
}
