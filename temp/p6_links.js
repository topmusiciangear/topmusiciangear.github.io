const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const p6 = products.find(y => y.id === 617);
p6.img = 'https://r2.gear4music.com/media/112/1127759/1200/preview.jpg';
p6.stores.zzounds = 'https://www.zzounds.com/item--ROLP6?siid=360113';
p6.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Roland-P-6-Creative-Sampler/art-SYN0009091-000';
p6.stores.gear4music = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FRoland-Aira-Compact-P-6-Creative-Sampler%2F6MDZ';
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));

let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const line617 = '  617: { prices: { andertons: "\\u00a3177.00", gear4music: "\\u00a3179.00", zzounds: "$269.00", musicstore: "\\u20ac199.00" }, urls: { gear4music: "https://www.gear4music.com/Recording-and-Computers/Roland-Aira-Compact-P-6-Creative-Sampler/6MDZ", zzounds: "https://www.zzounds.com/item--ROLP6?siid=360113", musicstore: "https://www.musicstore.com/en_OE/EUR/Roland-P-6-Creative-Sampler/art-SYN0009091-000" } },';
if (!/^  617:.*$/m.test(src)) throw new Error('617 missing');
src = src.replace(/^  617:.*$/m, line617);
fs.writeFileSync(DIR + 'build-guides.js', src);
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
console.log('617:', JSON.stringify(Function('return {' + m[1] + '\n}')()[617]));
