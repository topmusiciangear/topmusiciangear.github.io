var fs = require('fs');
var files = ['js/shop-buttons.js', 'temp/gen-shop-buttons.js'];
files.forEach(function (f) {
  var s = fs.readFileSync(f, 'utf8');
  var orig = s;

  // 1) Primary button: Amazon shows the label instead of a price
  if (s.indexOf("const pPrice = (primaryStoreKey === 'amazon') ? '' :") > -1) {
    s = s.replace(
      "const pPrice = (primaryStoreKey === 'amazon') ? '' :",
      "const pPrice = (primaryStoreKey === 'amazon') ? t('Verificar precio', 'Check price') :"
    );
    console.log(f + ': pPrice patched');
  }

  // 2) geo swap: define the localized label inside doSwap
  if (s.indexOf('var tmgCheckLabel') < 0) {
    var anchor = /if \(curStore === T \|\| curStore === 'ms/;
    if (!anchor.test(s)) { console.error(f + ': doSwap anchor not found'); process.exit(1); }
    s = s.replace(anchor,
      "var tmgCheckLabel = (document.documentElement.lang || 'en').indexOf('es') === 0 ? 'Verificar precio' : 'Check price';\n      " + "$&");
    console.log(f + ': tmgCheckLabel added');
  }

  // 3) geo swap: new primary from a dropdown row
  var zNeedle = "if (zMatch) zPrice = zMatch[1];";
  if (s.indexOf("if (T === 'amazon') zPrice = tmgCheckLabel;") < 0) {
    if (s.indexOf(zNeedle) < 0) { console.error(f + ': zPrice anchor not found'); process.exit(1); }
    s = s.replace(zNeedle, zNeedle + "\n      if (T === 'amazon') zPrice = tmgCheckLabel;");
    console.log(f + ': zPrice patched');
  }

  // 4) geo swap: old primary back into the dropdown
  var dNeedle = "if (dispMatch) dispPrice = dispMatch[1];";
  if (s.indexOf("if (curStore === 'amazon') dispPrice = tmgCheckLabel;") < 0) {
    if (s.indexOf(dNeedle) < 0) { console.error(f + ': dispPrice anchor not found'); process.exit(1); }
    s = s.replace(dNeedle, dNeedle + "\n        if (curStore === 'amazon') dispPrice = tmgCheckLabel;");
    console.log(f + ': dispPrice patched');
  }

  if (s !== orig) fs.writeFileSync(f, s);
});
console.log('done');
