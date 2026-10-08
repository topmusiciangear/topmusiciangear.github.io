const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let s = fs.readFileSync(f, 'utf8');
const i = s.indexOf('  609: {');
if (i < 0) throw new Error('609 missing');
const j = s.indexOf('  608: {', i);
if (j < 0) throw new Error('608 anchor missing');
let block = s.slice(i, j);
if (!block.includes('"andertons"')) throw new Error('oos block changed');
// remove the oos array (andertons back in stock)
block = block.replace(/,\r?\n    oos: \[\r?\n      "andertons"\r?\n    \]/, '');
if (/oos/.test(block)) throw new Error('oos still present');
s = s.slice(0, i) + block + s.slice(j);
fs.writeFileSync(f, s);
console.log('609: andertons removed from oos');
