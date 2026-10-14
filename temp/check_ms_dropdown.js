const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/stream-controllers.html', 'utf8');
const idx = h.indexOf('FLOW 8: What Six Faders');
if (idx > -1) {
  const section = h.slice(idx, idx + 15000);
  // find the shop-more-list
  const moreIdx = section.indexOf('shop-more-list');
  if (moreIdx > -1) {
    // get everything from shop-more-list to closing div
    const endIdx = section.indexOf('</div>', moreIdx);
    const dropdown = section.slice(moreIdx, endIdx);
    console.log('Dropdown HTML length:', dropdown.length);
    console.log('Contains musicstore:', dropdown.indexOf('musicstore') > -1);
    console.log('Contains gear4music:', dropdown.indexOf('gear4music') > -1);
    console.log('Contains andertons:', dropdown.indexOf('andertons') > -1);
    // Show the end of dropdown
    console.log('Last 500 chars:', dropdown.slice(-500));
  }
}