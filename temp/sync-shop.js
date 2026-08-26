var fs = require('fs');
var build = fs.readFileSync('build-guides.js', 'utf8');
var shop = fs.readFileSync('js/shop-buttons.js', 'utf8');

// Extract TEST_SHOP_BTN from build-guides.js
var bStart = build.indexOf('const TEST_SHOP_BTN = {');
var bEnd = build.indexOf('\n};', bStart) + 3;
var newBlock = build.substring(bStart, bEnd);

// Find TEST_SHOP_BTN in shop-buttons.js
var sStart = shop.indexOf('const TEST_SHOP_BTN = {');
var sEnd = shop.indexOf('\n};', sStart) + 3;

// Replace
var result = shop.substring(0, sStart) + newBlock + shop.substring(sEnd);
fs.writeFileSync('js/shop-buttons.js', result, 'utf8');
console.log('shop-buttons.js updated: ' + shop.length + ' -> ' + result.length + ' bytes');
