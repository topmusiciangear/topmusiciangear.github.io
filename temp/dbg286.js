const fs = require('fs');
['guides/mics-for-creators.html', 'guides/usb-mics.html'].forEach(f => {
  const h = fs.readFileSync(f, 'utf8');
  const idxs = [];
  let i = -1;
  while ((i = h.indexOf('145.00', i + 1)) >= 0) idxs.push(i);
  console.log(f + ' occurrences of 145.00: ' + idxs.length);
  idxs.slice(0, 4).forEach(j => console.log('   ...' + h.slice(Math.max(0, j - 90), j + 20).replace(/\s+/g, ' ')));
  const k = h.indexOf('TEST_SHOP_BTN');
  console.log('   TEST_SHOP_BTN em size: ' + (k >= 0 ? 'present' : 'ABSENT'));
});
