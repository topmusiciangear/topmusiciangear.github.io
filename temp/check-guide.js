const fs = require('fs');
const html = fs.readFileSync('guides/sm57-vs-sm58.html', 'utf8');

// Search for various patterns
const searches = ['shop-buttons', 'tmgStore', 'TEST_SHOP_BTN', 'storeButtons', 'SM58', 'SM 58', 'sm58'];
for (const s of searches) {
  const idx = html.indexOf(s);
  if (idx > -1) {
    console.log(s + ' found at index ' + idx);
    console.log('  Context: ...' + html.substring(Math.max(0, idx-50), idx+80) + '...');
  }
}

// Find product IDs in data attributes
const regex = /data-product[^"]*"(\d+)"/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log('data-product: ' + m[1]);
}

// Find id="product-N" patterns
const regex2 = /id="product-(\d+)"/g;
while ((m = regex2.exec(html)) !== null) {
  console.log('id=product-' + m[1]);
}
