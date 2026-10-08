const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let s = fs.readFileSync(f, 'utf8');
const i = s.indexOf('  608: {');
if (i < 0) throw new Error('608 missing');
// find prices block end: first '},' after prices start
const ps = s.indexOf('prices: {', i);
const pe = s.indexOf('},', ps);
let block = s.slice(ps, pe);
if (!block.includes('gear4music: "£252.00"') || !block.includes('andertons: "£253.00"')) throw new Error('608 prices changed: ' + block.slice(0, 200));
block = block.replace('gear4music: "£252.00"', 'gear4music: "£241.00"');
block = block.replace('andertons: "£253.00"', 'andertons: "£253.00",\n      zzounds: "$329.00",\n      musicstore: "€299.00"');
s = s.slice(0, ps) + block + s.slice(pe);
fs.writeFileSync(f, s);
console.log('608 prices updated');
