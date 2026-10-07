const fs = require('fs');
const path = require('path');
const dir = 'guides';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let badPages = [];
let totalOffers = 0, pricedOffers = 0, aggOk = 0;
files.forEach(f => {
  const h = fs.readFileSync(path.join(dir, f), 'utf8');
  // find Offer blocks without price
  const re = /\{\s*"@type":\s*"Offer"[^}]*\}/g;
  let m, bad = 0;
  while ((m = re.exec(h))) {
    totalOffers++;
    if (/"price"\s*:/.test(m[0])) pricedOffers++;
    else { bad++; }
  }
  if (bad) badPages.push(f + ':' + bad);
});
console.log('pages:', files.length, '| offers:', totalOffers, '| priced:', pricedOffers);
console.log(badPages.length ? 'BAD:\n' + badPages.join('\n') : 'ALL OFFERS HAVE PRICE');
// spot check the flagged URLs
['guides/studio-furniture.html', 'guides/daw-guide_es.html', 'guides/best-bass-home-office.html'].forEach(f => {
  const h = fs.readFileSync(f, 'utf8');
  console.log(f, '| offers w/o price:', (h.match(/\{\s*"@type":\s*"Offer"(?![\s\S]{0,400}"price"\s*:)/g) || []).length);
});
