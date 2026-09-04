const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const products = JSON.parse(fs.readFileSync(path.join(root, 'data', 'products.json'), 'utf8'));
const ph = JSON.parse(fs.readFileSync(path.join(root, 'data', 'price-history.json'), 'utf8'));
const bids = fs.readFileSync(path.join(root, 'build-guides.js'), 'utf8');

const order = [103, 310, 462, 465, 466, 463, 313, 295, 464, 309];
const testBtn = bids.slice(0, bids.indexOf('function shopButtonsTest'));

function extractBtn(src, id) {
  const re = new RegExp('\\n\\s*' + id + ': \\{(.{0,400}?)\\},?\\n(?=\\s*\\d+: \\{|\\s*\\};function)', 'm');
  const m = src.match(re);
  return m ? m[0].trim() : '(no TEST_SHOP_BTN)';
}

for (const id of order) {
  const p = products.find(x => x.id === id);
  if (!p) { console.log('#' + id, 'NO EN PRODUCTS'); continue; }
  const phh = ph[id];
  console.log('=== #' + id + ' ' + p.title + ' (price normal=' + p.price + ')');
  console.log('  stores:', JSON.stringify(p.stores));
  console.log('  excludeStores:', JSON.stringify(p.excludeStores || []));
  if (phh && phh.lastPrice) console.log('  price-history lastPrice:', phh.lastPrice);
  console.log('  TEST_SHOP_BTN:', extractBtn(testBtn, id));
}