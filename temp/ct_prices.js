const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let s = fs.readFileSync(F, 'utf8');
const checks = ['zzounds: "$469.99"', 'gear4music: "£314.00"', 'musicstore: "€349.00"'];
checks.forEach(c => { if (!s.includes(c)) throw new Error('missing ' + c); });
// scope to 129 block only
const i = s.indexOf('129: {');
const end = s.indexOf('},', i) + 2;
let block = s.slice(i, end);
block = block.replace('zzounds: "$469.99"', 'zzounds: "$479.00"')
  .replace('gear4music: "£314.00"', 'gear4music: "£358.00"')
  .replace('musicstore: "€349.00"', 'musicstore: "€281.00"');
s = s.slice(0, i) + block + s.slice(end);
fs.writeFileSync(F, s);
console.log('129 patched:', block.replace(/\n/g, ' ').slice(0, 220));
