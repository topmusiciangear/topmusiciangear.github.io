const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const p626 = products.find(y => y.id === 626);
p626.stores.andertons = 'https://www.andertons.co.uk/electrovoice-everse-12-potable-speaker/';
p626.stores.zzounds = 'https://www.zzounds.com/item--ELEEVERSE12US?siid=346531';
p626.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Electro-Voice-EVERSE-12/art-PAH0023691-000';
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));

let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const line626 = '  626: { prices: { andertons: "\\u00a3866.00", gear4music: "\\u00a3866.00", zzounds: "$1,099.00", musicstore: "\\u20ac1,069.00" }, urls: { andertons: "https://www.andertons.co.uk/electrovoice-everse-12-potable-speaker/", zzounds: "https://www.zzounds.com/item--ELEEVERSE12US?siid=346531", musicstore: "https://www.musicstore.com/en_OE/EUR/Electro-Voice-EVERSE-12/art-PAH0023691-000" } },';
if (/^  626:.*$/m.test(src)) src = src.replace(/^  626:.*$/m, line626);
else {
  const anchor = src.match(/^  631:.*$/m);
  if (!anchor) throw new Error('no anchor');
  src = src.replace(anchor[0], anchor[0] + '\n' + line626);
}
fs.writeFileSync(DIR + 'build-guides.js', src);
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
const map = Function('return {' + m[1] + '\n}')();
console.log('626:', JSON.stringify(map[626]));
