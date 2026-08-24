var fs = require('fs');
var src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');

// Extract TEST_SHOP_BTN
var m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n  \};/);
var btnSrc = 'var TEST_SHOP_BTN = {' + m[1] + '\n};';
eval(btnSrc);

// Extract getResolvedStores
var fnM = src.match(/(function getResolvedStores[\s\S]*?^  return s;\n})/m);
eval(fnM[1]);

// Extract shopButtonsTest
var fnM2 = src.match(/(function shopButtonsTest[\s\S]*?^};)/m);
eval(fnM2[1]);

// Extract SHOP_LOGO_TEXT, SHOP_LOGO_STYLE, etc
var shopLogoM = src.match(/const SHOP_LOGO_TEXT\s*=\s*\{[^}]+\}/);
if (shopLogoM) eval(shopLogoM[0]);
var shopStyleM = src.match(/const SHOP_LOGO_STYLE\s*=\s*\{[^}]+\}/);
if (shopStyleM) eval(shopStyleM[0]);
var shopFlagM = src.match(/const SHOP_FLAG\s*=\s*\{[^}]*\}/);
if (shopFlagM) eval(shopFlagM[0]);

var prods = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
var p = prods.find(function(x) { return x.id === 323; });
var result = shopButtonsTest(p, 'en');
// Check if gear4music price appears
if (result.indexOf('91.30') >= 0) {
  console.log('SUCCESS: gear4music price £91.30 found in output');
} else {
  console.log('FAIL: gear4music price NOT found');
  // Check if gear4music is in avail
  var cfg = TEST_SHOP_BTN[323] || {};
  var prices = cfg.prices || {};
  console.log('prices:', JSON.stringify(prices));
  console.log('cfg.oos:', cfg.oos);
}
if (result.indexOf('105.00') >= 0) {
  console.log('SUCCESS: musicstore price $105.00 found in output');
} else {
  console.log('FAIL: musicstore price NOT found');
}
