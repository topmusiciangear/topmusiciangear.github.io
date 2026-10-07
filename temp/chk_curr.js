const fs = require('fs');
const path = require('path');
const dir = 'guides';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let priceNoCurr = 0, checkedPages = 0;
files.forEach(f => {
  const h = fs.readFileSync(path.join(dir, f), 'utf8');
  const re = /\{\s*"@type":\s*"Offer"[^}]*\}/g;
  let m, hasOffer = false;
  while ((m = re.exec(h))) {
    hasOffer = true;
    const hasPrice = /"price"\s*:/.test(m[0]);
    const hasCurr = /"priceCurrency"\s*:/.test(m[0]);
    if (hasPrice && !hasCurr) priceNoCurr++;
  }
  if (hasOffer) checkedPages++;
});
console.log('pages with offers:', checkedPages, '| offers with price but NO currency:', priceNoCurr);
