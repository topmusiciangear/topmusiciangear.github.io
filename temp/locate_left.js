var fs = require('fs');
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var targets = ['opción opción', 'mejor opción compra', 'caballo de batalla', 'EMG 81/60'];
guides.forEach(function (x) {
  var s = JSON.stringify(x);
  targets.forEach(function (t) {
    var i = -1;
    while ((i = s.indexOf(t, i + 1)) >= 0) {
      // find nearest key context
      var k1 = s.lastIndexOf('"faq_', i);
      var k2 = s.lastIndexOf('"content', i);
      var k3 = s.lastIndexOf('"verdict', i);
      var k4 = s.lastIndexOf('"conclusion', i);
      var m = Math.max(k1, k2, k3, k4);
      console.log(x.id + ' :: [' + t + '] near: ' + s.slice(Math.max(0, m), m + 30));
    }
  });
});
