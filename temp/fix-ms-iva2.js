var fs = require('fs');
var src = fs.readFileSync('build-guides.js', 'utf8');

// Fix 1: Divide all musicstore EUR prices by 1.19 (remove IVA)
// Match pattern: musicstore:"€XXX.XX" or musicstore:"€X,XXX.XX"
src = src.replace(/musicstore:"€([\d,.]+)"/g, function(match, priceStr) {
  var price = parseFloat(priceStr.replace(/,/g, ''));
  if (isNaN(price) || price <= 0) return match;
  var newPrice = price / 1.19;
  var formatted;
  if (newPrice >= 1000) {
    formatted = '€' + newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    formatted = '€' + newPrice.toFixed(2);
  }
  return 'musicstore:"' + formatted + '"';
});

// Fix 2: Change $ prices to € (products that had USD Music Store URLs)
// id 301: $903.00 -> €587.40
src = src.replace(/musicstore:"\$903\.00"/g, 'musicstore:"€587.40"');
// id 431: $95.00 -> €82.40
src = src.replace(/musicstore:"\$95\.00"/g, 'musicstore:"€82.40"');
// id 434: $88.00 -> €88.24
src = src.replace(/musicstore:"\$88\.00"/g, 'musicstore:"€88.24"');
// id 435: $29.00 -> €38.70
src = src.replace(/musicstore:"\$29\.00"/g, 'musicstore:"€38.70"');
// id 438: $65.00 -> €56.10
src = src.replace(/musicstore:"\$65\.00"/g, 'musicstore:"€56.10"');

fs.writeFileSync('build-guides.js', src, 'utf8');
console.log('Done. Verifying no $ musicstore prices remain...');
var matches = src.match(/musicstore:"\$[^"]+"/g);
if (matches) {
  console.log('WARNING: Found $ musicstore prices:');
  matches.forEach(function(m) { console.log('  ' + m); });
} else {
  console.log('OK: All musicstore prices are in EUR');
}
