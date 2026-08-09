const fs = require('fs');
const s = fs.readFileSync('guides/fx-plugins.html', 'utf8');
// find the product card body for Spectre: look for the HTML (not JSON-LD) card
const idx = s.indexOf('openReviewModal(239)');
console.log('modal idx (HTML card):', idx);
if (idx > -1) {
  const seg = s.substring(idx - 200, idx + 4000);
  const st = seg.indexOf('guide-product-card-stores');
  console.log('stores block found at', st);
  const sub = seg.substring(st, st + 2500);
  const urls = sub.match(/href="[^"]+"/g);
  console.log(urls ? urls.join('\n') : 'NO STORE LINKS FOUND');
  console.log('---');
  console.log(sub.substring(0, 1200));
}