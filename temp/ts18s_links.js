const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const p630 = products.find(y => y.id === 630);
p630.stores.andertons = 'https://www.andertons.co.uk/alto-professional-ts18s-x-subwoofer/?search_query=Alto%20Professional%20TS18S';
p630.stores.gear4music = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FPA-DJ-and-Lighting%2FAlto-Professional-TS18S-18-Active-PA-Subwoofer%2F5UAD';
p630.stores.zzounds = 'https://www.zzounds.com/item--APATS18SXUS?siid=339921';
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));

let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
src = src.replace(/^  630:.*$/m, '  630: { prices: { andertons: "\\u00a3575.00", gear4music: "\\u00a3579.00", zzounds: "$799.00" }, urls: { andertons: "https://www.andertons.co.uk/alto-professional-ts18s-x-subwoofer/?search_query=Alto%20Professional%20TS18S", zzounds: "https://www.zzounds.com/item--APATS18SXUS?siid=339921" } },');
fs.writeFileSync(DIR + 'build-guides.js', src);
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
const map = Function('return {' + m[1] + '\n}')();
console.log('630:', JSON.stringify(map[630]));
