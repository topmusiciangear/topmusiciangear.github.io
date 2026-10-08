const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
const st = products.find(y => y.id === 612);
st.img = 'https://r2.gear4music.com/media/82/825946/1200/preview.jpg';
st.stores.zzounds = 'https://www.zzounds.com/item--ELKSYNTAKT?siid=318234';
fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(products, null, 2));

let src = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const start = src.indexOf('612: {');
let d = 0, i = src.indexOf('{', start);
for (; i < src.length; i++) {
  if (src[i] === '{') d++;
  else if (src[i] === '}') { d--; if (d === 0) break; }
}
let block = src.slice(start, i + 1);
if (!block.includes('"£922.00"')) throw new Error('anchor missing');
block = block
  .replace('gear4music: "£922.00"', 'gear4music: "£920.00", zzounds: "$1,149.00"')
  .replace('zzounds: "https://www.zzounds.com/a--925521/item--ELKSYNTAKT"', 'zzounds: "https://www.zzounds.com/item--ELKSYNTAKT?siid=318234"');
src = src.slice(0, start) + block + src.slice(i + 1);
fs.writeFileSync(DIR + 'build-guides.js', src);
console.log('612 patched:', block.replace(/\n/g, ' ').slice(0, 400));
