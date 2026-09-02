var fs = require('fs');
var sb = fs.readFileSync('js/shop-buttons.js', 'utf8');
console.log('Has ensurePbAff:', sb.indexOf('function ensurePbAff') >= 0);
console.log('Has wrapAffiliate:', sb.indexOf('function wrapAffiliate') >= 0);
console.log('Has getResolvedStores:', sb.indexOf('function getResolvedStores') >= 0);
console.log('Has shopButtonsTest:', sb.indexOf('function shopButtonsTest') >= 0);

// Test: simulate what shopButtonsTest does for Music Store
// Find the TEST_SHOP_BTN entry for product 383
var match = sb.match(/383:\s*\{[^}]+\}/);
if (match) {
  console.log('\nTEST_SHOP_BTN[383]:', match[0].substring(0, 200));
}

// Check all musicstore URLs in the raw data (before wrapping)
var re = /"https:\/\/www\.musicstore\.com[^"]+"/g;
var m;
var total = 0;
while (m = re.exec(sb)) { total++; }
console.log('\nRaw Music Store URLs in TEST_SHOP_BTN:', total);

// The wrapping happens at runtime, so we just need to verify the function exists and is correct
// Let's test wrapAffiliate manually
var fnMatch = sb.match(/function wrapAffiliate\([\s\S]*?^}/m);
if (fnMatch) {
  console.log('\nwrapAffiliate function found (' + fnMatch[0].length + ' chars)');
}
