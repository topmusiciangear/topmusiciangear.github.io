const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
products.find(y => y.id === 256).img = 'https://r2.gear4music.com/media/138/1389725/1200/preview.jpg';
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));

let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const start = src.indexOf('256: {');
let d = 0, i = src.indexOf('{', start);
for (; i < src.length; i++) {
  if (src[i] === '{') d++;
  else if (src[i] === '}') { d--; if (d === 0) break; }
}
let block = src.slice(start, i + 1);
if (!block.includes('"£829"') || !block.includes('"€849.00"')) throw new Error('anchors missing');
block = block.replace('gear4music: "£829"', 'gear4music: "£719.00"').replace('musicstore: "€849.00"', 'musicstore: "€829.00"');
src = src.slice(0, start) + block + src.slice(i + 1);
fs.writeFileSync(DIR + 'build-guides.js', src);
console.log('256 patched');
