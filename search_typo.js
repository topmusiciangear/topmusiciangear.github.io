var fs = require('fs');
var path = require('path');

function search(dir, pattern) {
  var files = fs.readdirSync(dir);
  files.forEach(function(f) {
    var full = path.join(dir, f);
    try {
      var stat = fs.statSync(full);
      if (stat.isDirectory() && f !== 'node_modules' && f !== '.git') {
        search(full, pattern);
      } else if (stat.isFile() && (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.json'))) {
        var c = fs.readFileSync(full, 'utf8');
        if (c.includes(pattern)) {
          console.log(full);
        }
      }
    } catch (e) {}
  });
}

search('.', 'Afiradores');