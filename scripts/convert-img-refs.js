var fs = require('fs');
['js/guides.js', 'js/products.js'].forEach(function(f) {
  var c = fs.readFileSync(f, 'utf8');
  var n = c
    .replace(/"image": "img\/([^"]+)\.jpg"/g, '"image": "img/$1.webp"')
    .replace(/"img": "img\/([^"]+)\.jpg"/g, '"img": "img/$1.webp"');
  fs.writeFileSync(f, n);
  var diff = c.length - n.length;
  console.log(f + ': ' + diff + ' bytes reduction, ' + ((c.match(/\.jpg"/g) || []).length - (n.match(/\.jpg"/g) || []).length) + ' refs changed');
});
