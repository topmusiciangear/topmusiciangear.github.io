const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const msTS = 'https://www.musicstore.com/en_OE/EUR/ALTO-TS18S/art-PAH0023624-003';
const msEON = 'https://www.musicstore.com/en_OE/EUR/JBL-EON-718S/art-PAH0022714-000';
products.find(y => y.id === 630).stores.musicstore = msTS;
products.find(y => y.id === 631).stores.musicstore = msEON;
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));

let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const re630 = /^  630:.*$/m;
if (re630.test(src)) src = src.replace(re630, '  630: { urls: { musicstore: "' + msTS + '" } },');
else {
  const anchor = src.match(/^  631:.*$/m);
  src = src.replace(anchor[0], '  630: { urls: { musicstore: "' + msTS + '" } },\n' + anchor[0]);
}
src = src.replace(/^  631:.*$/m, '  631: { prices: { gear4music: "£877.00" }, urls: { musicstore: "' + msEON + '" } },');
fs.writeFileSync(DIR + 'build-guides.js', src);
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
const map = Function('return {' + m[1] + '\n}')();
console.log('630:', JSON.stringify(map[630]));
console.log('631:', JSON.stringify(map[631]));
