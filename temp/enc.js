const fs = require('fs');
const b = fs.readFileSync('js/shop-buttons.js');
const s = b.toString('utf8');
const lines = s.split('\n');
console.log('L361:', JSON.stringify(lines[360]));
const bg = fs.readFileSync('build-guides.js');
console.log('build L~:', JSON.stringify(bg.toString('utf8').split('\n').filter(l => l.includes('680: {') || l.includes('\u00a3170'))[0]));
// cuantas entradas tienen pound corrupto
console.log('mojibake U+FFFD en shop-buttons:', (s.match(/\ufffd/g) || []).length);
console.log('pound ok:', (s.match(/\u00a3/g) || []).length);