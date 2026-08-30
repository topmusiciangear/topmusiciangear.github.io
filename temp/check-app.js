var c = require('fs').readFileSync('js/app.min.js', 'utf8');
// Find where guides are loaded
var idx = c.indexOf('guides');
if (idx !== -1) {
  console.log('guides reference at:', idx);
  console.log(c.substring(Math.max(0, idx - 100), idx + 300));
}

// Find fetch or XMLHttpRequest for data
idx = c.indexOf('fetch(');
if (idx !== -1) {
  console.log('\nfetch at:', idx);
  console.log(c.substring(idx, idx + 200));
}

// Look for guides.json or data loading
idx = c.indexOf('guides.json');
if (idx !== -1) {
  console.log('\nguides.json reference at:', idx);
  console.log(c.substring(idx, idx + 200));
}

// Look for products.json
idx = c.indexOf('products.json');
if (idx !== -1) {
  console.log('\nproducts.json reference at:', idx);
  console.log(c.substring(idx, idx + 200));
}
