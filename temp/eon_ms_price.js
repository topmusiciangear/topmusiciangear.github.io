const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
src = src.replace(/^  631:.*$/m, '  631: { prices: { andertons: "\\u00a3833.00", gear4music: "\\u00a3825.00", zzounds: "$1,099.00", musicstore: "\\u20ac1,099.00" }, urls: { musicstore: "https://www.musicstore.com/en_OE/EUR/JBL-EON-718S/art-PAH0022714-000", andertons: "https://www.andertons.co.uk/jbl-eon718s-18-15kw-subwoofer-with-3-channel-mixer-dsp-bluetooth/", zzounds: "https://www.zzounds.com/item--JBLEON718S?siid=308811" } },');
fs.writeFileSync(DIR + 'build-guides.js', src);
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
const map = Function('return {' + m[1] + '\n}')();
console.log('631:', JSON.stringify(map[631]));
console.log('630:', JSON.stringify(map[630]));
