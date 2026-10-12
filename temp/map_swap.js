var fs = require('fs');
var g = fs.readFileSync('temp/gen-shop-buttons.js', 'utf8');
console.log('--- gen extracts (indexOf markers) ---');
['shopButtonsTest', 'doSwap', 'newPrimary', 'tmgGeoSwap', 'gText', 'gStyle', 'SHOP_LOGO'].forEach(function (k) {
  console.log(k + ': ' + (g.indexOf(k) >= 0));
});
var s = fs.readFileSync('js/shop-buttons.js', 'utf8');
console.log('--- spa has ---');
['newPrimary', 'gText', 'gStyle'].forEach(function (k) {
  console.log(k + ': ' + (s.indexOf(k) >= 0));
});
// show gText/gStyle defs in build-guides
var b = fs.readFileSync('build-guides.js', 'utf8');
var i = b.indexOf('var gText');
console.log('--- build-guides gText/gStyle ---');
console.log(b.slice(i, i + 1200));
