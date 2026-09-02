const fs = require('fs');
const bg = fs.readFileSync('build-guides.js', 'utf8');
const lines = bg.split('\n');
let count = 0;
lines.forEach((l, i) => {
  // Find prices like "123.45" without currency symbol
  const matches = l.match(/:\s*"([0-9,]+\.\d+)"/g);
  if (matches) {
    matches.forEach(p => {
      if (!p.includes('$') && !p.includes('£') && !p.includes('€')) {
        console.log('Line ' + (i + 1) + ': ' + p.trim());
        count++;
      }
    });
  }
});
console.log('Total missing currency symbol: ' + count);
