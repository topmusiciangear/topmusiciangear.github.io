const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
// 527: PB canonical aid
P.find(x => x.id === 527).stores.pluginboutique = 'https://www.pluginboutique.com/product/2-Effects/17-Reverb/7185-Spaced-Out?a_aid=6a01e859cbe1a';
// 542: Andertons Impact (same slug)
P.find(x => x.id === 542).stores.andertons = 'https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u=https%3A%2F%2Fwww.andertons.co.uk%2Fschecter-stiletto-stealth-5-string-bass-guitar-in-satin-black%2F';
// 163: Sire V5 has no Amazon listing -> drop search URL
delete P.find(x => x.id === 163).stores.amazon;
// 516: verified ASIN B011Z6E2RY (Aurora n 16-USB exact match)
P.find(x => x.id === 516).stores.amazon = 'https://www.amazon.com/dp/B011Z6E2RY?tag=topmusicg-20';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('aff done');