var fs = require('fs');
var d = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

// Fix: Ensure all guides have category: "accessories" (English)
// This will make them match data-cat="accessories" in the home page
Object.keys(d).forEach(function(k) {
  var g = d[k];
  // If guide has category_es but not category, set category = category_es (or "accessories")
  if (g.category_es && !g.category) {
    g.category = g.category_es;
    console.log('Fixed guide ' + k + ': set category to ' + g.category_es);
  }
  // If guide has category_es "accesorios", also set category to "accessories" for consistency
  if (g.category_es === 'accesorios' && !g.category) {
    g.category = 'accessories';
    console.log('Fixed guide ' + k + ': set category to accessories (from accesorios)');
  }
  // If category is something else and category_es is accesorios, update
  if (g.category && g.category_es === 'accesorios') {
    // Keep category as is, but note the discrepancy
    console.log('Guide ' + k + ': has category=' + g.category + ' and category_es=accesorios');
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(d, null, 2));
console.log('Done! Total guides:', Object.keys(d).length);