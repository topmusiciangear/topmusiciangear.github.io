const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const g = products.find(y => y.id === 627);
g.img = 'https://r2.gear4music.com/media/64/643017/1200/preview.jpg';
g.stores.andertons = 'https://www.andertons.co.uk/fender-mustang-gtx100-modelling-combo-amp/';
g.stores.zzounds = 'https://www.zzounds.com/item--FEN2310700?siid=275184';
g.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Fender-Mustang-GTX100/art-GIT0052219-000';
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));

let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const line627 = '  627: { prices: { andertons: "\\u00a3549.00", gear4music: "\\u00a3569.00", zzounds: "$499.00", musicstore: "\\u20ac619.00" }, urls: { andertons: "https://www.andertons.co.uk/fender-mustang-gtx100-modelling-combo-amp/", zzounds: "https://www.zzounds.com/item--FEN2310700?siid=275184", musicstore: "https://www.musicstore.com/en_OE/EUR/Fender-Mustang-GTX100/art-GIT0052219-000" } },';
if (/^  627:.*$/m.test(src)) src = src.replace(/^  627:.*$/m, line627);
else {
  const anchor = src.match(/^  626:.*$/m);
  if (!anchor) throw new Error('no anchor');
  src = src.replace(anchor[0], anchor[0] + '\n' + line627);
}
fs.writeFileSync(DIR + 'build-guides.js', src);
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
const map = Function('return {' + m[1] + '\n}')();
console.log('627:', JSON.stringify(map[627]));
