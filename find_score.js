const fs = require('fs');
var r = fs.readFileSync('guides/best-interface.html','utf8');
var products = ['RME Babyface Pro FS', 'Universal Audio Apollo Twin X Gen 2', 'Audient iD2', 'SSL 2+ MKII', 'Focusrite Scarlett 2i2 4th Gen', 'Universal Audio Volt 2 Gen 2', 'MOTU M2', 'Universal Audio Volt 276', 'IK Multimedia AXE I/O'];
var scores = {};
products.forEach(function(p) {
  var pos = r.indexOf(p);
  var scorePos = r.indexOf('Our score:', pos);
  if (scorePos >= 0) {
    var scoreStr = r.substring(scorePos, scorePos+25);
    scores[p] = scoreStr;
  }
});
console.log(JSON.stringify(scores, null, 2));