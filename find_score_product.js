const fs = require('fs');
var r = fs.readFileSync('guides/best-interface.html','utf8');
var idx = r.indexOf('9.3</div>');
// Find the nearest product name before this score
var products = ['RME Babyface Pro FS', 'Universal Audio Apollo Twin X Gen 2', 'Audient iD2', 'SSL 2+ MKII', 'Focusrite Scarlett 2i2 4th Gen', 'Universal Audio Volt 2 Gen 2', 'MOTU M2', 'Universal Audio Volt 276', 'IK Multimedia AXE I/O'];
var nearestProduct = '';
var nearestPos = 0;
products.forEach(function(p) {
  var pos = r.lastIndexOf(p, idx);
  if (pos > nearestPos) {
    nearestPos = pos;
    nearestProduct = p;
  }
});
console.log('Score 9.3 belongs to:', nearestProduct);
console.log('Product position:', nearestPos);
console.log('Score position:', idx);
console.log('Distance:', idx - nearestPos);