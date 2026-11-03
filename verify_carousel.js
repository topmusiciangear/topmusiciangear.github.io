var fs = require('fs');
var c = fs.readFileSync('index.html', 'utf8');
var idx = c.indexOf('data-cat="accessories"');
if (idx >= 0) {
  console.log('Accessories card:');
  console.log(c.substring(idx, idx + 500));
} else {
  console.log('Accessories NOT found');
}

// Also check All Guides count
var idx2 = c.indexOf('data-cat="all"');
if (idx2 >= 0) {
  console.log('\nAll Guides card:');
  console.log(c.substring(idx2, idx2 + 400));
}

// Check the new guide in Accessories
var idx3 = c.indexOf('afinadores-bajos-y-guitarras');
if (idx3 >= 0) {
  console.log('\nTuner guide link found in index.html (should NOT be in header):');
  console.log(c.substring(idx3 - 100, idx3 + 100));
} else {
  console.log('\nTuner guide NOT in index.html (correct - only in carousel)');
}