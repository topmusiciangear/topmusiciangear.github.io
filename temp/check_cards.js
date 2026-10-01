const fs = require('fs');
const b = fs.readFileSync('guides/fx-plugins.html', 'utf8');
const matches = b.match(/class="guide-product-card"/g) || [];
console.log('Product cards in HTML:', matches.length);

const idx = b.indexOf('id="products"');
console.log('Products section:', idx);
if (idx > -1) console.log(b.slice(idx, idx+500));

// Also check for product titles
['Soundtoys', 'Blackhole', 'ShaperBox', 'RC-20', 'HalfTime', 'Transit', 'Infiltrator', 'Trash', 'Lifeline', 'Motion', 'JUN-6', 'Repeater', 'Smooth'].forEach(name => {
  const count = (b.match(new RegExp(name, 'g')) || []).length;
  console.log(name + ': ' + count + ' occurrences');
});