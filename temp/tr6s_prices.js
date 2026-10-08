const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let s = fs.readFileSync(F, 'utf8');
const i = s.indexOf('128: {');
const end = s.indexOf('},', i) + 2;
let block = s.slice(i, end);
if (!block.includes('"$453.99"') || !block.includes('"£345.00"')) throw new Error('anchors missing');
block = block.replace('zzounds: "$453.99"', 'zzounds: "$469.00"')
  .replace('andertons: "£345.00"', 'andertons: "£369.00"')
  .replace('gear4music: "£345.00"', 'gear4music: "£369.00"');
s = s.slice(0, i) + block + s.slice(end);
fs.writeFileSync(F, s);
console.log('128 patched');
