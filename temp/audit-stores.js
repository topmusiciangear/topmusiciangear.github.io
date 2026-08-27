var fs = require('fs');
var src = fs.readFileSync('build-guides.js', 'utf8');

// Extract TEST_SHOP_BTN properly using Function constructor
var start = src.indexOf('const TEST_SHOP_BTN = {');
var endMarker = '\n};';
var end = src.indexOf(endMarker, start) + 3;
var block = src.substring(start, end);

// Replace const and evaluate
var evalStr = block.replace('const TEST_SHOP_BTN = ', 'var TEST_SHOP_BTN = ');
eval(evalStr);

var products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var allStores = ['amazon', 'zzounds', 'reverb', 'andertons', 'gear4music', 'musicstore', 'pluginboutique'];

var missing = [];
var ok = 0;

products.forEach(function(prod) {
  allStores.forEach(function(s) {
    if (prod.excludeStores && prod.excludeStores.indexOf(s) !== -1) return;
    var hasUrl = prod.stores && prod.stores[s] && prod.stores[s].trim().length > 5;
    if (!hasUrl) return;
    
    var entry = TEST_SHOP_BTN[prod.id];
    var hasPrice = entry && entry.prices && entry.prices[s];
    var hasOos = entry && entry.oos && entry.oos.indexOf(s) !== -1;
    var hasNa = entry && entry.na && entry.na.indexOf(s) !== -1;
    
    if (!hasPrice && !hasOos && !hasNa) {
      missing.push({
        id: prod.id,
        title: prod.title,
        store: s,
        url: prod.stores[s]
      });
    } else {
      ok++;
    }
  });
});

console.log('=== STORE AUDIT RESULTS ===');
console.log('Products with store URL + price/oos/na:', ok);
console.log('MISSING (has URL but no price/oos/na):', missing.length);

if (missing.length > 0) {
  console.log('\n--- Missing entries by store ---');
  var byStore = {};
  missing.forEach(function(m) {
    if (!byStore[m.store]) byStore[m.store] = 0;
    byStore[m.store]++;
  });
  Object.keys(byStore).forEach(function(s) {
    console.log('  ' + s + ': ' + byStore[s]);
  });

  console.log('\n--- First 50 missing ---');
  missing.slice(0, 50).forEach(function(m) {
    console.log('  ID ' + m.id + ' | ' + m.title + ' | ' + m.store);
  });
}
