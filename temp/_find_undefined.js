const fs = require('fs');
const path = require('path');
const files = [];
(function walk(d) { for (const e of fs.readdirSync(d)) { const p = path.join(d, e); if (fs.statSync(p).isDirectory()) walk(p); else files.push(p); } })('guides');
const re = /href="([^"]*undefined[^"]*)"/g;
let n = 0;
const out = [];
for (const file of files) {
  const h = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = re.exec(h))) { n++; out.push(file + ' :: ' + m[1].replace(/\s+/g, ' ').slice(0, 200)); }
}
console.log('total:', n);
out.slice(0, 20).forEach((x) => console.log(x));