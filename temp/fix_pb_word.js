var fs = require('fs');
['build-guides.js', 'temp/_head_sb.js'].forEach(function (f) {
  var s = fs.readFileSync(f, 'utf8');
  var a = "PLUG<span style=\\'color:#000\\'>IN</span>BOUTIQUE";
  var b = "Plug<span style=\\'color:#000\\'>in</span>boutique";
  var n = s.split(a).length - 1;
  s = s.split(a).join(b);
  fs.writeFileSync(f, s);
  console.log(f + ': replaced ' + n);
});
