const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const v = products.find(y => y.id === 624);
v.img = 'https://r2.gear4music.com/media/88/885626/1200/preview.jpg';
v.stores.gear4music = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FKorg-Volca-Sample-2-Digital-Sample-Sequencer%2F3JY6';
v.stores.zzounds = 'https://www.zzounds.com/item--KORVOLCASAMPLE2?siid=284757';
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));

let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const line624 = '  624: { prices: { andertons: "\\u00a3119.00", gear4music: "\\u00a3119.00", zzounds: "$124.00" }, urls: { gear4music: "https://www.gear4music.com/Recording-and-Computers/Korg-Volca-Sample-2-Digital-Sample-Sequencer/3JY6", zzounds: "https://www.zzounds.com/item--KORVOLCASAMPLE2?siid=284757" } },';
if (!/^  624:.*$/m.test(src)) throw new Error('624 missing');
src = src.replace(/^  624:.*$/m, line624);
fs.writeFileSync(DIR + 'build-guides.js', src);
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
console.log('624:', JSON.stringify(Function('return {' + m[1] + '\n}')()[624]));
