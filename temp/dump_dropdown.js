const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/stream-controllers.html', 'utf8');
const idx = h.indexOf('FLOW 8: What Six Faders');
if (idx > -1) {
  const section = h.slice(idx, idx + 10000);
  const moreIdx = section.indexOf('shop-more-list');
  if (moreIdx > -1) {
    const dropdown = section.slice(moreIdx, moreIdx + 5000);
    console.log(dropdown);
  }
}