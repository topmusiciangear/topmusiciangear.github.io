const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let s = fs.readFileSync(F, 'utf8');
const i = s.indexOf('33: {');
const end = s.indexOf('},', i) + 2;
let block = s.slice(i, end);
if (!block.includes('"$749.99"') || !block.includes('"£659.00"') || !block.includes('"£656.00"')) throw new Error('anchors missing: ' + block.slice(0, 120));
block = block.replace('zzounds: "$749.99"', 'zzounds: "$899.00"')
  .replace('andertons: "£659.00"', 'andertons: "£681.00"')
  .replace('gear4music: "£656.00"', 'gear4music: "£680.00"');
s = s.slice(0, i) + block + s.slice(end);
fs.writeFileSync(F, s);
console.log('33 patched');
