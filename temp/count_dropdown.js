const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/stream-controllers.html', 'utf8');
const idx = h.indexOf('FLOW 8: What Six Faders');
if (idx > -1) {
  const section = h.slice(idx, idx + 12000);
  // find the shop-more-list div and count all data-store within it
  const moreIdx = section.indexOf('shop-more-list');
  if (moreIdx > -1) {
    const dropdown = section.slice(moreIdx, moreIdx + 8000);
    const stores = dropdown.match(/data-store="[^"]+"/g);
    const prices = dropdown.match(/data-price="[^"]+"/g);
    console.log('Local dropdown stores:', stores);
    console.log('Total:', stores ? stores.length : 0);
  }
}