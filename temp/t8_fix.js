const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const t8 = products.find(y => y.id === 610);
t8.img = 'https://r2.gear4music.com/media/82/829101/1200/preview.jpg';
t8.stores.zzounds = 'https://www.zzounds.com/item--ROLT8?siid=318855';
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));

let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
// replace whole 610 block (brace-matched)
const start = src.indexOf('610: {');
if (start < 0) throw new Error('610 not found');
let d = 0, i = src.indexOf('{', start);
const beg = i;
for (; i < src.length; i++) {
  if (src[i] === '{') d++;
  else if (src[i] === '}') { d--; if (d === 0) break; }
}
const old = src.slice(start, i + 1);
const neu = '610: { prices: { andertons: "£177.00", gear4music: "£178.00", zzounds: "$249.00" }, urls: { amazon: "https://www.amazon.com/dp/B0B11K62XF", gear4music: "https://www.gear4music.com/Recording-and-Computers/Roland-Aira-Compact-T-8-Beat-Machine/4TXY", zzounds: "https://www.zzounds.com/item--ROLT8?siid=318855" } }';
src = src.replace(old, neu);
fs.writeFileSync(DIR + 'build-guides.js', src);
const m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
const map = Function('return {' + m[1] + '\n}')();
console.log('610:', JSON.stringify(map[610]));
