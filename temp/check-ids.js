var fs = require('fs');
var c = fs.readFileSync('data/products.json','utf8');
var lines = c.split('\n');
[415,416,417].forEach(function(id) {
  for (var i=0;i<lines.length;i++) {
    if (lines[i].indexOf('"id": ' + id) >= 0) {
      console.log('ID ' + id + ' at line ' + i + ':');
      for (var j=i;j<Math.min(i+15,lines.length);j++) {
        console.log('  ' + j + ': ' + lines[j]);
      }
      break;
    }
  }
});
