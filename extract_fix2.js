var fs = require('fs');
var c = fs.readFileSync('js/app.min.js', 'utf8');

// Look at the filterCategory function at occurrence 4
var idx = c.indexOf('window.filterCategory=function');
console.log('filterCategory at:', idx);
if (idx >= 0) {
  console.log('Context:');
  console.log(c.substring(idx, idx + 500));
}

// Also look at loadMoreGuides
var idx2 = c.indexOf('function loadMoreGuides');
console.log('\n--- loadMoreGuides ---');
if (idx2 >= 0) {
  var end = c.indexOf('function ', idx2 + 1);
  var func = c.substring(idx2, end >= 0 ? end : idx2 + 500);
  console.log(func);
}

// And renderGuideGrid
var idx3 = c.indexOf('function renderGuideGrid');
console.log('\n--- renderGuideGrid ---');
if (idx3 >= 0) {
  var end3 = c.indexOf('function ', idx3 + 1);
  var func3 = c.substring(idx3, end3 >= 0 ? end3 : idx3 + 2000);
  console.log(func3.substring(0, 2000));
}