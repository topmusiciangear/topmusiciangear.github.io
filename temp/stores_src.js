const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
['function getResolvedStores', 'function storeChips', 'STORE_ORDER', 'STORE_LABEL'].forEach(k => {
  const i = src.indexOf(k);
  console.log('===== ' + k + ' @' + i + ' =====');
  if (i > -1) console.log(src.slice(i, i + 1800).replace(/\n/g, '|'));
  console.log('');
});