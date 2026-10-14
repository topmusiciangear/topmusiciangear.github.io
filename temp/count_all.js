const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/stream-controllers.html', 'utf8');
const idx = h.indexOf('FLOW 8: What Six Faders');
const endIdx = h.indexOf('</div>', idx + 40000);
const section = h.slice(idx, endIdx);
// count ALL data-store in the whole section (including dropdown)
const stores = section.match(/data-store="[^"]+"/g);
console.log('ALL stores in section:', stores);
console.log('Total:', stores ? stores.length : 0);

// check if musicstore appears anywhere
console.log('musicstore count:', section.split('musicstore').length - 1);