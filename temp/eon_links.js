const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const p631 = products.find(y => y.id === 631);
p631.stores.andertons = 'https://www.andertons.co.uk/jbl-eon718s-18-15kw-subwoofer-with-3-channel-mixer-dsp-bluetooth/';
p631.stores.gear4music = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FPA-DJ-and-Lighting%2FJBL-EON718S-18-Active-PA-Subwoofer%2F4644';
p631.stores.zzounds = 'https://www.zzounds.com/item--JBLEON718S?siid=308811';
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));

let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const line631 = '  631: { prices: { andertons: "\\u00a3833.00", gear4music: "\\u00a3825.00", zzounds: "$1,099.00" }, urls: { musicstore: "https://www.musicstore.com/en_OE/EUR/JBL-EON-718S/art-PAH0022714-000", andertons: "https://www.andertons.co.uk/jbl-eon718s-18-15kw-subwoofer-with-3-channel-mixer-dsp-bluetooth/", zzounds: "https://www.zzounds.com/item--JBLEON718S?siid=308811" } },';
src = src.replace(/^  631:.*$/m, line631);
fs.writeFileSync(DIR + 'build-guides.js', src);
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
const map = Function('return {' + m[1] + '\n}')();
console.log('631:', JSON.stringify(map[631]));
