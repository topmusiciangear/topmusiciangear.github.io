const fs = require('fs');
const path = require('path');
const files = [];
(function walk(d) { for (const e of fs.readdirSync(d)) { const p = path.join(d, e); if (fs.statSync(p).isDirectory()) walk(p); else files.push(p); } })('guides');
let n = 0;
for (const file of files) {
  const h = fs.readFileSync(file, 'utf8');
  const re = /href="[€$£]/g;
  let m;
  while ((m = re.exec(h))) {
    n++;
    const i = m.index;
    console.log(`${path.basename(file)} @${i}: ...${h.slice(Math.max(0,i-60), i+40).replace(/\n/g,'\\n')}...`);
  }
}
console.log('total:', n);