var fs = require('fs');
var html = fs.readFileSync('guides/beat-making.html', 'utf8');

// Find all div classes
var classes = html.match(/class="([^"]+)"/g);
if (classes) {
  var unique = {};
  classes.forEach(function(c) {
    c.replace(/class="([^"]+)"/g, function(m, name) {
      unique[name] = (unique[name] || 0) + 1;
    });
  });
  Object.keys(unique).sort().forEach(function(k) {
    console.log(k + ': ' + unique[k]);
  });
}
