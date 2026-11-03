var fs = require('fs');
var c = fs.readFileSync('js/app.min.js', 'utf8');

console.log('Original length:', c.length);

// Fix 1: Category click handler - change guideVisibleCount=guidePageSize to guideVisibleCount=0
// Pattern: "currentCategory=a.dataset.cat,guideVisibleCount=guidePageSize"
var fix1 = c.replace(
  'currentCategory=a.dataset.cat,guideVisibleCount=guidePageSize',
  'currentCategory=a.dataset.cat,guideVisibleCount=0'
);
console.log('Fix 1 applied:', c !== fix1 ? 'YES' : 'NO (pattern not found)');

// Fix 2: filterCategory function - same pattern
var fix2 = fix1.replace(
  'currentCategory=e,guideVisibleCount=guidePageSize',
  'currentCategory=e,guideVisibleCount=0'
);
console.log('Fix 2 applied:', fix1 !== fix2 ? 'YES' : 'NO (pattern not found)');

if (c !== fix2) {
  fs.writeFileSync('js/app.min.js', fix2);
  console.log('\n✅ app.min.js FIXED and saved!');
  console.log('New length:', fix2.length);
} else {
  console.log('\n❌ No changes made - patterns not found');
  console.log('Searching for alternative patterns...');
  
  // Try alternative patterns
  var patterns = [
    'guideVisibleCount=guidePageSize',
    'guideVisibleCount = guidePageSize',
    'guideVisibleCount=20',
    'guideVisibleCount = 20'
  ];
  patterns.forEach(function(p) {
    var idx = c.indexOf(p);
    console.log('Pattern "' + p + '" found at:', idx >= 0 ? idx : 'NOT FOUND');
  });
}