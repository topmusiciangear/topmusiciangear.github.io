const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const tm = products.find(y => y.id === 629);
tm.img = 'https://r2.gear4music.com/media/67/674966/1200/preview.jpg';
tm.stores.andertons = 'https://www.andertons.co.uk/fender-tone-master-deluxe-reverb-1x12-guitar-amp-combo/';
tm.stores.zzounds = 'https://www.zzounds.com/item--FEN2274100?siid=264387';
tm.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Fender-Tone-Master-Deluxe-Reverb/art-GIT0050563-000';
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));

let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const line629 = '  629: { prices: { andertons: "\\u00a31,079.00", gear4music: "\\u00a31,079.00", zzounds: "$1,199.00", musicstore: "\\u20ac1,219.00" }, urls: { andertons: "https://www.andertons.co.uk/fender-tone-master-deluxe-reverb-1x12-guitar-amp-combo/", zzounds: "https://www.zzounds.com/item--FEN2274100?siid=264387", musicstore: "https://www.musicstore.com/en_OE/EUR/Fender-Tone-Master-Deluxe-Reverb/art-GIT0050563-000" } },';
if (/^  629:.*$/m.test(src)) src = src.replace(/^  629:.*$/m, line629);
else {
  const anchor = src.match(/^  628:.*$/m);
  if (!anchor) throw new Error('no anchor');
  src = src.replace(anchor[0], anchor[0] + '\n' + line629);
}
fs.writeFileSync(DIR + 'build-guides.js', src);
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
console.log('629:', JSON.stringify(Function('return {' + m[1] + '\n}')()[629]));
