const fs = require('fs');
const sb = fs.readFileSync('js/shop-buttons.js', 'utf8');

// Find the function that maps product ID to TEST_SHOP_BTN
// Look for where product ID is used to look up TEST_SHOP_BTN
const idx1 = sb.indexOf('TEST_SHOP_BTN');
if (idx1 > -1) {
  console.log('TEST_SHOP_BTN reference at index', idx1);
  console.log(sb.substring(idx1, idx1 + 200));
}

// Find shopButtonsTest function
const idx2 = sb.indexOf('function shopButtonsTest');
if (idx2 > -1) {
  console.log('\nshopButtonsTest at index', idx2);
  console.log(sb.substring(idx2, idx2 + 300));
}

// Find where prices are looked up
const idx3 = sb.indexOf('prices:');
if (idx3 > -1) {
  console.log('\nprices: at index', idx3);
  console.log(sb.substring(Math.max(0, idx3-100), idx3 + 200));
}
