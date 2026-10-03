const fs = require('fs');
const h = fs.readFileSync('guides/budget-interfaces.html', 'utf8');
// zzounds row for UMC1820 must exist (wrapped CJ link or direct), printable check:
const hasZZ = h.indexOf('item--BEHUMC1820') > -1;
console.log('BEHUMC1820 in page:', hasZZ);
const i = h.indexOf('item--BEHUMC1820');
if (hasZZ) console.log(h.slice(Math.max(0, i - 160), i + 60).replace(/\s+/g, ' '));