const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const cr = products.find(y => y.id === 618);
cr.img = 'https://r2.gear4music.com/media/68/681637/1200/preview.jpg';
cr.stores.zzounds = 'https://www.zzounds.com/item--NOVCIRCUITRHYTHM?siid=298357';
cr.stores.gear4music = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FNovation-Circuit-Rhythm%2F3V5S';
cr.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Novation-Circuit-Rhythm/art-SYN0007908-000';
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));

let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const line618 = '  618: { prices: { andertons: "\\u00a3342.00", gear4music: "\\u00a3360.00", zzounds: "$430.00", musicstore: "\\u20ac375.00" }, urls: { gear4music: "https://www.gear4music.com/Recording-and-Computers/Novation-Circuit-Rhythm/3V5S", zzounds: "https://www.zzounds.com/item--NOVCIRCUITRHYTHM?siid=298357", musicstore: "https://www.musicstore.com/en_OE/EUR/Novation-Circuit-Rhythm/art-SYN0007908-000" } },';
if (!/^  618:.*$/m.test(src)) throw new Error('618 missing');
src = src.replace(/^  618:.*$/m, line618);
fs.writeFileSync(DIR + 'build-guides.js', src);
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
console.log('618:', JSON.stringify(Function('return {' + m[1] + '\n}')()[618]));
