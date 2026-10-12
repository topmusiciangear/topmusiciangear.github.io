var fs = require('fs');
['build-guides.js', 'temp/gen-shop-buttons.js'].forEach(function (f) {
  var s = fs.readFileSync(f, 'utf8');
  var a = '>Buy at<span';
  var n = s.split(a).length - 1;
  console.log(f + ' hits: ' + n);
  if (n !== 1) return;
  s = s.split(a).join(">'+(tmgIsEsDoc()?'Comprar en':'Buy at')+'<span");
  fs.writeFileSync(f, s);
  console.log(f + ': localized OK');
});
