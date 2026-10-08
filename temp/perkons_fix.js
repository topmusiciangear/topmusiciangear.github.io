const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const pk = products.find(y => y.id === 613);
console.log('old img:', pk.img);
pk.img = 'https://r2.gear4music.com/media/110/1103693/1200/preview.jpg';
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));

let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const start = src.indexOf('613: {');
let d = 0, i = src.indexOf('{', start);
for (; i < src.length; i++) {
  if (src[i] === '{') d++;
  else if (src[i] === '}') { d--; if (d === 0) break; }
}
let block = src.slice(start, i + 1);
if (!block.includes('"€1,789.00"')) throw new Error('anchor missing');
block = block.replace('musicstore: "€1,789.00"', 'musicstore: "€1,965.00"');
src = src.slice(0, start) + block + src.slice(i + 1);
fs.writeFileSync(DIR + 'build-guides.js', src);
console.log('613 patched');
