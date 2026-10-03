const fs = require('fs');
const h = fs.readFileSync('guides/budget-interfaces.html', 'utf8');
['B09J1TL1B8', 'B01ET9GCGS', 'B09HL4GZF9'].forEach(asin => {
  let i = -1, n = 0, tags = 0;
  while ((i = h.indexOf(asin, i + 1)) > -1 && n < 6) {
    n++;
    const seg = h.slice(Math.max(0, i - 120), i + 60);
    const t = (seg.match(/tag=topmusicg-20/g) || []).length;
    tags += t;
    if (n === 1) console.log(asin + ' e.g. ...' + seg.replace(/\s+/g, ' ').slice(-140));
  }
  console.log(asin + ' occurrences=' + n);
});