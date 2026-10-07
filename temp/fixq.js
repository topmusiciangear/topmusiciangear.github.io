const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/fix_gp_all.js';
let s = fs.readFileSync(f, 'utf8');
s = s.replace("don't buy", 'doXXXnt buy');
fs.writeFileSync(f, s);
const t = fs.readFileSync(f, 'utf8');
console.log(JSON.stringify(t.split('\n')[42].slice(-60)));
