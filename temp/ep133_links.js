const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const ep = products.find(y => y.id === 615);
ep.img = 'https://r2.gear4music.com/media/132/1329204/1200/preview.jpg';
ep.stores.gear4music = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FTeenage-Engineering-EP-133-128-MB-KO-II%2F7TH8';
ep.stores.zzounds = 'https://www.zzounds.com/item--TEEEP133KOII?siid=345972';
ep.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Teenage-Engineering-EP-133-K-O-II-128MB/art-SYN0009460-000';
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));

let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const line615 = '  615: { prices: { andertons: "\\u00a3289.00", gear4music: "\\u00a3289.00", zzounds: "$329.00", musicstore: "\\u20ac349.00" }, urls: { gear4music: "https://www.gear4music.com/Recording-and-Computers/Teenage-Engineering-EP-133-128-MB-KO-II/7TH8", zzounds: "https://www.zzounds.com/item--TEEEP133KOII?siid=345972", musicstore: "https://www.musicstore.com/en_OE/EUR/Teenage-Engineering-EP-133-K-O-II-128MB/art-SYN0009460-000" } },';
if (!/^  615:.*$/m.test(src)) throw new Error('615 missing');
src = src.replace(/^  615:.*$/m, line615);
fs.writeFileSync(DIR + 'build-guides.js', src);
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
console.log('615:', JSON.stringify(Function('return {' + m[1] + '\n}')()[615]));
