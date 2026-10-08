const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const sq = products.find(y => y.id === 621);
sq.img = 'https://r2.gear4music.com/media/103/1035415/1200/preview.jpg';
sq.stores.gear4music = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FYamaha-SEQTRAK-Black%2F66QJ';
sq.stores.zzounds = 'https://www.zzounds.com/item--YAMSEQTRAK?siid=347183';
sq.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Yamaha-SEQTRAK-ORANGE/art-SYN0008890-000';
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));

let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const line621 = '  621: { prices: { gear4music: "\\u00a3445.00", zzounds: "$299.00" }, urls: { gear4music: "https://www.gear4music.com/Recording-and-Computers/Yamaha-SEQTRAK-Black/66QJ", zzounds: "https://www.zzounds.com/item--YAMSEQTRAK?siid=347183", musicstore: "https://www.musicstore.com/en_OE/EUR/Yamaha-SEQTRAK-ORANGE/art-SYN0008890-000" } },';
if (!/^  621:.*$/m.test(src)) throw new Error('621 missing');
src = src.replace(/^  621:.*$/m, line621);
fs.writeFileSync(DIR + 'build-guides.js', src);
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
console.log('621:', JSON.stringify(Function('return {' + m[1] + '\n}')()[621]));
