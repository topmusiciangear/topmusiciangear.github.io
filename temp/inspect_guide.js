const fs = require('fs');
const file = process.argv[2] || 'guides/at2020-vs-p120.html';
const h = fs.readFileSync(file, 'utf8');
function textFrom(startMarker, len) {
  const i = h.indexOf(startMarker);
  if (i < 0) return '(not found: ' + startMarker + ')';
  return h.slice(i, i + len).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
}
console.log('--- FAQ ---');
console.log(textFrom('<h2 class="guide-faq-title"', 3000));
console.log('\n--- PRODUCT CARDS ---');
console.log(textFrom('<div class="guide-products-grid"', 3000));
console.log('\n--- BUY BUTTONS ---');
const btns = h.match(/<a[^>]*class="[^"]*shop-btn[^"]*"[^>]*>/g) || [];
console.log('shop-btn anchors:', btns.length);
console.log('href=undefined:', (h.match(/href="undefined"/g) || []).length);
console.log('AT2020 full name occurrences:', (h.match(/Audio-Technica AT2020 Studio Condenser Microphone/g) || []).length);
console.log('P120 full name occurrences:', (h.match(/AKG P120 Large-Diaphragm Condenser Microphone/g) || []).length);
console.log('\n--- RELATED ---');
console.log(textFrom('guide-related', 2000));
