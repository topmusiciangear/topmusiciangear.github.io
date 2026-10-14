const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/stream-controllers.html', 'utf8');
const idx = h.indexOf('FLOW 8: What Six Faders');
if (idx > -1) {
  const section = h.slice(idx, idx + 8000);
  const moreIdx = section.indexOf('shop-more-list');
  if (moreIdx > -1) {
    const dropdown = section.slice(moreIdx, moreIdx + 3000);
    const stores = dropdown.match(/data-store="[^"]+"/g);
    const prices = dropdown.match(/data-price="[^"]+"/g);
    console.log('Dropdown stores:', stores);
    console.log('Dropdown prices:', prices);
  }
}