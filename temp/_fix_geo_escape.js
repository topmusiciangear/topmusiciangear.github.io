const fs = require('fs');
const p = 'temp/gen-shop-buttons.js';
let s = fs.readFileSync(p, 'utf8');
function count(h) { return s.split(h).length - 1; }
const n1 = "this.style.filter=\\'brightness(1.05)\\'";
const r1 = "this.style.filter=\\\\'brightness(1.05)\\\\'";
const n2 = "this.style.filter=\\'\\'";
const r2 = "this.style.filter=\\\\'\\\\'";
console.log('n1 count:', count(n1), 'n2 count:', count(n2));
s = s.split(n1).join(r1).split(n2).join(r2);
console.log('after n1:', count(n1), 'n2:', count(n2));
fs.writeFileSync(p, s);