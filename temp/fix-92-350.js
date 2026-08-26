const fs = require('fs');
const buildPath = './build-guides.js';
let src = fs.readFileSync(buildPath, 'utf8');

// Fix id 92: add prices object with amazon
src = src.replace(
  /(92:\s*\{)\s*(oos:\s*\['zzounds',\s*'andertons'\])\s*(\})/,
  '$1 prices: { amazon: \'$849.00\' } , $2 $3'
);

// Fix id 350: remove andertons from oos since we added a price
src = src.replace(
  /(350:\s*\{[^}]*?)(oos:\s*\['andertons'\])([^}]*?\})/,
  '$1$3'
);

fs.writeFileSync(buildPath, src);
console.log('Fixed id 92 and 350');
