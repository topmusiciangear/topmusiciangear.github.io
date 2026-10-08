const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let s = fs.readFileSync(F, 'utf8');
const i = s.indexOf('255: {');
const end = s.indexOf('},', i) + 2;
let block = s.slice(i, end);
if (!block.includes('"€419.33"') || !block.includes('"£549"') || !block.includes('"£452.00"')) throw new Error('anchors missing');
block = block.replace('musicstore: "€419.33"', 'musicstore: "€499.00"')
  .replace('gear4music: "£549"', 'gear4music: "£473.00"')
  .replace('andertons: "£452.00"', 'andertons: "£473.00"');
s = s.slice(0, i) + block + s.slice(end);
fs.writeFileSync(F, s);
console.log('255 patched');
