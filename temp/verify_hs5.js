const fs = require('fs');
['guides/best-monitors-for-small-rooms.html', 'guides/best-monitors-for-small-rooms_es.html'].forEach(f => {
  const h = fs.readFileSync(f, 'utf8');
  const rokit = (h.split('Rokit').length - 1);
  const hs5 = (h.split('Yamaha HS5').length - 1);
  const img = h.includes('media/26/265478/1200/preview.jpg');
  const g4m = h.includes('Yamaha-HS5-Active-Studio-Monitor/QSS');
  const zz = h.includes('item--YAMHS5');
  const ms = h.includes('Yamaha-HS-5-5-');
  const andt = h.includes('yamaha-hs5-active-studio-monitor-single-unit');
  console.log(f);
  console.log('  Rokit mentions: ' + rokit + ' | HS5 mentions: ' + hs5);
  console.log('  img265478: ' + img + ' | g4m: ' + g4m + ' | zzounds: ' + zz + ' | musicstore: ' + ms + ' | andertons: ' + andt);
});
// sanity: hs8-vs-rokit-7 guide still intact (product 20 untouched)
const h2 = fs.readFileSync('guides/hs8-vs-rokit-7.html', 'utf8');
console.log('hs8-vs-rokit-7.html Rokit mentions: ' + (h2.split('Rokit').length - 1));
// shop-buttons has 632
const sb = fs.readFileSync('js/shop-buttons.js', 'utf8');
console.log('shop-buttons has 632 entry: ' + /^\s*632:\s*\{/m.test(sb));
