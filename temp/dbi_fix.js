const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
products.find(y => y.id === 614).img = 'https://r2.gear4music.com/media/38/388616/1200/preview_1.jpg';
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));

let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const i = src.indexOf('614: {');
const end = src.indexOf('},', i) + 2;
let block = src.slice(i, end);
if (!block.includes('£256.00') || !block.includes('€255.00')) throw new Error('anchors missing');
block = block.replace('gear4music: "£256.00"', 'gear4music: "£246.00"').replace('musicstore: "€255.00"', 'musicstore: "€259.00"');
src = src.slice(0, i) + block + src.slice(end);
fs.writeFileSync(DIR + 'build-guides.js', src);
console.log('614 patched:', block.replace(/\n/g, ' ').slice(0, 300));
