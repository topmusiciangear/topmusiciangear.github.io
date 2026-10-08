const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let s = fs.readFileSync(f, 'utf8');
const i = s.indexOf('  419: {');
if (i < 0) throw new Error('419 missing');
const anchor = '      musicstore: "€89.00"';
const k = s.indexOf(anchor, i);
if (k < 0) throw new Error('419 MS anchor missing');
// end of that line:
const eol = s.indexOf('\n', k);
const ins = ',\r\n      zzounds: "$99.95",\r\n      andertons: "£75.00"';
s = s.slice(0, eol) + ins + s.slice(eol);
fs.writeFileSync(f, s);
// verify
const j = s.indexOf('  420: {', i);
console.log(s.slice(i, j));
